import SerialPort from 'serialport';
import os from 'os';
import { Monitor, MonitoreoPaciente } from '../sqldb';
import ArduinoScanner from '../scanner';
import moment from 'moment';
import isNil from 'lodash/isNil';

const MIN_WARNING = 0;
const MIN_DANGER = 1;

export default function(socketio, cache) {
  const arduinoScanner = new ArduinoScanner();
  console.log('inicia arduino scanner');
  arduinoScanner.start(10000);
  const isWin = os.platform() === 'win32';
  const prefix = isWin ? '\\\\.\\' : '';
  let pacientes = cache.getCurrentPatients();
  let sp = {};
  let monitorData = {};
  let monitoresActivos = {};
  cache.emitter.on('update-patients', (pacientesActualizados) => {
    pacientes = pacientesActualizados;
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

    const status = calcularStatus(data, paciente.especie);

    let estado = 'ok';

    if (status.margen > MIN_DANGER) { // TODO definir el porcentaje
      estado = 'danger';
    } else if (status.margen > MIN_WARNING){
      estado = 'warning';
    }

    monitor.estado = estado;
    data.estado = estado;
    let mensajes = getMensaje(status);
    console.log(mensajes);
    if (mensajes.length) {
      let alerta = monitor.alerta || {};
      let actualizarAlerta = isNil(alerta.fechaAlerta) || moment().diff(moment(alerta.fecha), 'minutes') > 5;
      let fecha = new Date();
      monitor.alerta = actualizarAlerta ? {
        id: `${monitor.id}${monitor.paciente.id}${fecha.getTime()}`,
        fecha,
        mensajes,
        tipo: estado
      } : alerta;
      // TODO aca deberia mandar notificacion
    }
    data.alerta = monitor.alerta;
    data.idPaciente = paciente.id;
    data.promedioTemp = monitor.promedioTemp;
    data.promedioPpm = monitor.promedioPpm;
    socketio.sockets.emit('data', data);
  };

  const getMonitor = (data) => {
    let monitor;
    if (monitorData[data.idMonitor]) {
      monitor = monitorData[data.idMonitor];
      monitor.data.push(data);
      if (monitor.data.length >= 20) {
        const promedios = calcularPromedio(monitor.data);
        monitor = Object.assign({}, monitor, promedios);
        monitor.data = [];
        MonitoreoPaciente.create({
          promedioTemperatura: promedios.promedioTemp,
          promedioPpm: promedios.promedioPpm,
          promedioMovHora: 0,
          estadoTemperatura: data.temperatura,
          estadoMovimiento: data.latidos,
          estadoPaciente: monitor.estado,
          id_paciente: monitor.paciente.id
        });
      }
    } else {
      let paciente = pacientes.find(p => {
        return p.monitor.id === data.idMonitor
      });
      monitorData[data.idMonitor] = {
        id: data.idMonitor,
        paciente: paciente,
        data: [data],
        promedioTemp: data.temperatura,
        promedioPpm: data.latidos
      };
      monitor = monitorData[data.idMonitor];
    }
    return monitor
  };

  const calcularPromedio = (data) => {
    let totalLatidos = data
      .map(d => d.latidos)
      .reduce((a, b) => a + b, 0);
    let totalTemperatura = data
      .map(d => d.temperatura)
      .reduce((a, b) => a + b, 0);
    return {
      promedioTemp: totalTemperatura / data.length,
      promedioPpm: totalLatidos / data.length
    };
  };

  const calcularStatus = (data, especie) => {
    const { temperatura, latidos } = data;
    const { maxTemp, minTemp, maxPpm, minPpm } = especie;
    let porcentajeTemperatura = 0;
    let porcentajeLatidos = 0;
    if (temperatura > maxTemp) {
      porcentajeTemperatura = (temperatura * 100 / maxTemp) - 100;
    } else if (temperatura < minTemp) {
      porcentajeTemperatura = (temperatura * 100 / minTemp) - 100;
    }

    if (latidos > maxPpm) {
      porcentajeLatidos = (latidos * 100 / maxPpm) - 100;
    } else if (latidos < minPpm) {
      porcentajeLatidos = (latidos * 100 / minPpm) - 100;
    }
    return  {
      porcentajeLatidos,
      porcentajeTemperatura,
      margen: Math.abs(porcentajeLatidos) + Math.abs(porcentajeTemperatura)
    };
  };

  const getMensaje = (status) => {
    let mensajes = []
    if (status.porcentajeLatidos !== 0) {
      let mensaje = status.porcentajeLatidos > 0 ? 'Ritmo cardiaco elevado' : 'Ritmo cardiaco bajo';
      mensajes.push(mensaje);
    }
    if (status.porcentajeTemperatura !== 0) {
      let mensaje = status.porcentajeTemperatura > 0 ? 'Temperatura del paciente elevada' : 'Temperatura del paciente baja'
      mensajes.push(mensaje);
    }
    return mensajes;
  };



  arduinoScanner.on('arduinoFound', function (response) {
    console.log('arduinoFound');
    arduinoScanner.stop();
    if (sp[response.serialNumber]) {
      return;
    }
    // connectToArduino(response.port);
    sp[response.serialNumber] = new SerialPort(`${prefix}${response.port}`, {
      baudrate: 9600,
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
        // console.error('data incorrect received');
      }
    });
  });

}


