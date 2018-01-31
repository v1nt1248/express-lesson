const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const DELAY = 500;
let bd = [];

exports.connect = () => {
  bd = require('./data.json');
};

exports.get = (id) => {
  console.log('Get data ...');
  return new Promise((resolve, reject) => {
    if (!id) {
      setTimeout(
        resolve(createRep(false, 'Данные прочитаны успешно', bd)),
        DELAY
      );
    } else {
      setTimeout(() => {
        const rep = bd.find(item => item.id === id);
        if (!rep) {
          reject(createRep(true, `Отсутствует элемент с id ${id}`, null));
        } else {
          resolve(createRep(false, 'Данные прочитаны успешно', rep));
        }
      }, DELAY);
    }
  })
};

exports.post = (data) => {
  console.log('Create data ...');
  if (data) {
    let newId = 1;
    if (bd.length !== 0) {
      const allIds = bd.map(item => item.id);
      newId = allIds[allIds.length - 1] + 1;
    }
    const newItem = Object.assign({}, data, {id: newId});
    bd.push(newItem);
    return writeData(bd);
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(
        reject(createRep(true, 'Отсутствуют данные для сохранения', null)),
        500
      );
    });
  }
};

exports.put = (data) => {
  console.log('Update data ...');
  const allIds = bd.map(item => item.id);
  const itemIndex = allIds.indexOf(data.id);
  if (itemIndex !== -1) {
    bd[itemIndex] = data;
    return writeData(bd);
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(
        reject(createRep(true, `Отсутствует элемент с id ${data.id}`, null)),
        500
      );
    });
  }
};

exports.delete = (id) => {
  console.log('Delete data ...');
  const allIds = bd.map(item => item.id);
  const itemIndex = allIds.indexOf(data.id);
  if (itemIndex !== -1) {
    delete bd[itemIndex];
    return writeData(bd);
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(
        reject(createRep(true, `Отсутствует элемент с id ${id}`, null)),
        500
      );
    });
  }
};

function writeData(data) {
  return fs.writeFileAsync(__dirname + '/data.json', JSON.stringify(data))
    .then(rep => {
      console.log('File /bd/data.json is saved!');
      return createRep(false, 'Данные записаны успешно', null);
    })
    .catch(err => {
      console.error(err);
      return createRep(true, 'Ошибка при записи данных', null);
    })
}

function createRep(isError, message, data) {
  return {
    "isError": isError,
    "message": message,
    "data": data
  }
}
