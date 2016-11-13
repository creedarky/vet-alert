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


export default {
  emitter,
  getCurrentPatients,
  setCurrentPatients
}

