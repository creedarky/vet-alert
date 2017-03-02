import SerialPort from 'serialport';
import os from 'os';
import { Monitor, MonitoreoPaciente } from '../sqldb';
import ArduinoScanner from '../scanner';
import moment from 'moment';
import isNil from 'lodash/isNil';

const MIN_WARNING = 0;
const MIN_DANGER = 1;
const MAX_LENGTH = 250;
const ESTADOS = {
  OK: 'ok',
  WARNING: 'warning',
  DANGER: 'danger'
};

export default function(socketio, cache) {
  const arduinoScanner = new ArduinoScanner();
  console.log('inicia arduino scanner');
  arduinoScanner.start(10000);
  const isWin = os.platform() === 'win32';
  const prefix = isWin ? '\\\\.\\' : '';
  let pacientes = cache.getCurrentPatients();
  let sp = {}; //Serial port
  let monitorData = {};
  let monitoresActivos = {};
  cache.emitter.on('update-patients', (pacientesActualizados) => {
    pacientes = pacientesActualizados;
    pacientes.forEach(p => {
      const currentMonitor = monitorData[p.monitor.id];
      if (currentMonitor && currentMonitor.paciente.id !== p.id) {
        monitorData[p.monitor.id] = null;
      }
    });
    socketio.sockets.emit('updated-patients', pacientesActualizados);
  });

  const createMonitor = (idMonitor) => {
    if (monitoresActivos[idMonitor]) {
      return;
    }
    Monitor.upsert(
      {
        id: idMonitor,
        activo: true
      }
    );
    monitoresActivos[idMonitor] = idMonitor
  };

  const addData = (data) => {
    if (data.tipo !== 'estado') {
      socketio.sockets.emit('data', data);
      return;
    }
    let monitor = getMonitor(data);
    let paciente = monitor.paciente;

    const status = calcularStatus(monitor, paciente.especie);

    let estado = ESTADOS.OK;

    if (status.margen > MIN_DANGER) { // TODO definir el porcentaje
      estado = ESTADOS.DANGER;
    } else if (status.margen > MIN_WARNING){
      estado = ESTADOS.WARNING;
    }

    monitor.estado = estado;
    data.estado = estado;
    let mensajes = getMensaje(status);
    if (mensajes.length) {
      let alerta = monitor.alerta || {};
      let actualizarAlerta = isNil(alerta.fecha) || moment().diff(moment(alerta.fecha), 'minutes') >= 5 || (estado !== alerta.tipo && estado === ESTADOS.DANGER);
      let fecha = new Date();
      monitor.alerta = actualizarAlerta ? {
        id: `${monitor.id}${monitor.paciente.id}${fecha.getTime()}`,
        fecha,
        mensajes,
        tipo: estado
      } : alerta;
      setMonitor(monitor);
      // TODO aca deberia mandar notificacion
    }
    data.alerta = monitor.alerta;
    data.idPaciente = paciente.id;
    data.promedioTemp = monitor.promedioTemp;
    data.promedioPpm = monitor.promedioPpm;
    // console.log('to emit', data);
    socketio.sockets.emit('data', data);
  };

  const getMonitor = (data) => {
    let monitor;
    if (monitorData[data.idMonitor]) {
      monitor = monitorData[data.idMonitor];
    } else {
      let paciente = pacientes.find(p => {
        return p.monitor.id === data.idMonitor
      });
      monitorData[data.idMonitor] = {
        id: data.idMonitor,
        paciente: paciente,
        latidos: [],
        temperaturas: [],
        promedioTemp: 0,
        promedioPpm: 0,
        latido: null,
        temperatura: null,
        movimiento: null
      };

      monitor = monitorData[data.idMonitor];
    }

    if (data.latidos) {
      monitor.latidos.push(data.latidos);
      monitor.latido = data.latidos;
    }

    if (data.temperatura) {
      monitor.temperaturas.push(data.temperatura);
      monitor.temperatura = data.temperatura;
      monitor.movimiento = data.movimiento;
    }

    if (monitor.latidos.length >= MAX_LENGTH || monitor.temperaturas.length >= MAX_LENGTH) {
      const promedios = calcularPromedio(monitor.latidos, monitor.temperaturas);
      monitor = Object.assign({}, monitor, promedios);
      monitor.latidos = [];
      monitor.temperaturas = [];

      MonitoreoPaciente.create({
        promedioTemperatura: promedios.promedioTemp,
        promedioPpm: promedios.promedioPpm,
        estadoMovimiento: monitor.movimiento,
        estadoTemperatura: monitor.temperatura,
        estadoPaciente: monitor.estado,
        estadoPpm: monitor.latido,
        id_paciente: monitor.paciente.id
      });
    }

    setMonitor(monitor);

    return monitor
  };

  const setMonitor = (monitor) => {
    monitorData[monitor.id] = monitor;
  };

  const calcularPromedio = (latidos, temperaturas) => {
    let totalLatidos = latidos
      .reduce((a, b) => a + b, 0);
    let totalTemperatura = temperaturas
      .reduce((a, b) => a + b, 0);

    return {
      promedioTemp: totalTemperatura / temperaturas.length,
      promedioPpm: totalLatidos / latidos.length
    };
  };

  const calcularStatus = (monitor, especie) => {
    const { temperatura, latido } = monitor;
    const { maxTemp, minTemp, maxPpm, minPpm } = especie;
    let porcentajeTemperatura = 0;
    let porcentajeLatidos = 0;
    if (temperatura > maxTemp) {
      porcentajeTemperatura = (temperatura * 100 / maxTemp) - 100;
    } else if (temperatura < minTemp) {
      porcentajeTemperatura = (temperatura * 100 / minTemp) - 100;
    }

    if (latido > maxPpm) {
      porcentajeLatidos = (latido * 100 / maxPpm) - 100;
    } else if (latido < minPpm) {
      porcentajeLatidos = (latido * 100 / minPpm) - 100;
    }
    return  {
      porcentajeLatidos,
      porcentajeTemperatura,
      margen: Math.abs(porcentajeLatidos) + Math.abs(porcentajeTemperatura)
    };
  };

  const getMensaje = (status) => {
    let mensajes = [];
    if (status.porcentajeLatidos !== 0) {
      let mensaje = status.porcentajeLatidos > 0 ? 'Ritmo cardiaco elevado' : 'Ritmo cardiaco bajo';
      mensajes.push(mensaje);
    }
    if (status.porcentajeTemperatura !== 0) {
      let mensaje = status.porcentajeTemperatura > 0 ? 'Temperatura del paciente elevada' : 'Temperatura del paciente baja';
      mensajes.push(mensaje);
    }
    return mensajes;
  };



  arduinoScanner.on('arduinoFound', function (response) {
    // arduinoScanner.stop();
    if (sp[response.serialNumber]) {
      return;
    }

    // connectToArduino(response.port);
    sp[response.serialNumber] = new SerialPort(`${prefix}${response.port}`, {
      baudrate: 115200,
      parser: SerialPort.parsers.readline('\n')
    }, e => console.log(e));

    sp[response.serialNumber].on('open', function () {
      console.log('open');
    });
    sp[response.serialNumber].on('data', function (data) {
      // console.log(data);
      let parsedData = null;
      try {
        parsedData = JSON.parse(data);
        createMonitor(parsedData.idMonitor);
        addData(parsedData);

      } catch (e) {
        console.log(e);
      }
    });
  });

}


