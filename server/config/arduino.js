import SerialPort from 'serialport';
import os from 'os';
import { Monitor } from '../sqldb';
import ArduinoScanner from '../scanner';


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
    let paciente = {};

    if (monitorData[data.idMonitor]) {
      paciente = monitorData[data.idMonitor].paciente;
      monitorData[data.idMonitor].data.push(data);
    } else {
      paciente = pacientes.find(p => {
        console.log('### monitor#', p, p.monitor);
        return p.monitor.id === data.idMonitor
      });
      monitorData[data.idMonitor] = {
        paciente: paciente,
        data: [data]
      };
    }

    const margen = checkStatus(data, paciente.especie);

    let estado = 'ok';
    if (margen > 1) { // TODO definir el porcentaje
      estado = 'alert';
    } else if (margen > 0){
      estado = 'warning';
    }
    data.estado = estado;
    data.idPaciente = paciente.id;
    socketio.sockets.emit('data', data);
  };

  const checkStatus = (data, especie) => {
    const { temperatura, latidos } = data;
    const { maxTemp, minTemp, maxPpm, minPpm } = especie;
    let porcentajeTemperatura = 0;
    let porcentajeLatidos = 0;
    if (temperatura > maxTemp) {
      porcentajeTemperatura = Math.abs(100 - temperatura * 100 / maxTemp);
    } else if (temperatura < minTemp) {
      porcentajeTemperatura = Math.abs(100 - temperatura * 100 / minTemp);
    }

    if (latidos > maxPpm) {
      porcentajeLatidos = Math.abs(100 - latidos * 100 / maxPpm);
    } else if (latidos < minPpm) {
      porcentajeLatidos = Math.abs(100 - latidos * 100 / minPpm);
    }
    return porcentajeLatidos + porcentajeTemperatura;
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


