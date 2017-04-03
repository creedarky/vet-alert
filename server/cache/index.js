import {EventEmitter} from 'events';

const emitter = new EventEmitter();
let currentData = {};
const getCurrentPatients = () => {
  return currentData;
};

const setCurrentPatients = (data) => {
  currentData = data;
  emitter.emit('update-patients', data);
};

const setPatient = (data) => {
  const index = currentData.findIndex((d) => {
    return d.monitor.idMonitor === data.monitor.idMonitor
  });
  if (index < 0) {
    return;
  }
  currentData[index] = data;
  emitter.emit('update-patients', currentData);
};


export default {
  emitter,
  getCurrentPatients,
  setCurrentPatients,
  setPatient,
}

