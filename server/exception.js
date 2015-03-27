/**
 * Модуль перехвата и обработки исключений
 *
 * @module      Server.Exception
 * @class       Exception
 * @namespace   Server
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var cluster       = require('cluster'),
    domain        = require('domain'),
    fs            = require('fs');


// Установка количества элементов в стеке исключений = 5
Error.stackTraceLimit = 5;


// Перехват формирования стека ошибок
Error.prepareStackTrace = function(err, stack){
  var log = {
    message:err.message,
    stack:[]
  }

  stack.forEach(function(frame){
    log.stack.push({
      time:     (new Date).toUTCString(),
      file:     frame.getFileName(),
      line:     frame.getLineNumber(),
      column:   frame.getColumnNumber(),
      func:     frame.getFunctionName()
    });
  });

  return JSON.stringify(log, null, "\t");
}


// Перехват брошенного исключения
process.on('uncaughtException', function(err){
  // Вывод стека ошибок в stderr
  if(process.env.NODE_ENV == 'debug') console.error('uncaughtException: ', err.stack);

  // Запись стека ошибки в лог файл
  fs.open(__dirname+'/../log/error.log', 'a', 0666, function(e, id){
    fs.write(id, err.stack+"\n", null, 'utf8', function(){
      fs.close(id, function(){
        // Завершение текущего процесса
        cluster.worker.disconnect();
        process.exit(1);
      });
    });
  });
});


/**
 * Экспорт объекта перехвата HTTP исключений
 *
 * @method httpErr
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 * @return {Object} errHandler
 */
exports.httpErr = function(req, res){

  // Объект обработки http исключений
  var errHandler = domain.create();
  
  // Добавления объектов запроса и ответа
  // в объект обработки исключения
  errHandler.add(req);
  errHandler.add(res);

  // Обработка ответ на брошенное http исключение
  errHandler.on('error', function(err){

    // Вывод стека ошибок в stderr
    if(process.env.NODE_ENV == 'debug') console.error('httpErr', err.stack);

    try{
      if(req.headers['x-requested-with'] && req.headers['x-requested-with'] == 'XMLHttpRequest'){
        var response = {
          success: false
        }

        res.statusCode = 500;
        res.setHeader('Content-Type', 'application-json; charset=UTF-8');
        res.end(JSON.stringify(response, null, "\t"));
      }else{
        res.statusCode = 500;
        res.setHeader('Content-Type','text/html; charset=UTF-8');
        res.end('Internal server error');
      }

      // Запись стека ошибки в лог файл
      fs.open(__dirname+'/../log/error.log', 'a', 0666, function(e, id){
        fs.write(id, err.stack+"\n", null, 'utf8', function(){
          fs.close(id, function(){
            // Завершение текущего процесса
            cluster.worker.disconnect();
            process.exit(1);
          });
        });
      });

    }catch(er){
      // Вывод стека ошибок в stderr
      if(process.env.NODE_ENV == 'debug') console.error('Error sending HTTP response', er, req.url);

      // Запись стека ошибки в лог файл
      fs.open(__dirname+'/../log/error.log', 'a', 0666, function(e, id){
        fs.write(id, er.stack+"\n", null, 'utf8', function(){
          fs.close(id, function(){
            // Завершение текущего процесса
            cluster.worker.disconnect();
            process.exit(1);
          });
        });
      });
    }
  });
  
  return errHandler;
};


/**
 * Экспорт объекта перехвата сокет исключений
 *
 * @method socketErr
 * @param {Object} socket Объект сокета
 * @return {Object} errHandler
 */
exports.socketErr = function(socket){

  // Объект обработки сокет исключений
  errHandler = domain.create();

  // Добавления объектов сокета
  // в объект обработки исключения
  errHandler.add(socket);

  // Обработка и ответ на брошенное сокет исключение
  errHandler.on('error', function(err){

    // Запись стека ошибки в лог файл
    fs.open(__dirname+'/../log/error.log', 'a', 0666, function(e, id){
      fs.write(id, err.stack+"\n", null, 'utf8', function(){
        fs.close(id, function(){});
      });
    });

    // Вывод стека ошибок в stderr
    if(process.env.NODE_ENV == 'debug') console.error('socketErr', err.stack);

    try{
      socket.emit('command', {command: 'error'});
      socket.disconnect();
    }catch(er){
      // Вывод стека ошибок в stderr
      if(process.env.NODE_ENV == 'debug') console.error('Error sending socket command', er);

      // Запись стека ошибки в лог файл
      fs.open(__dirname+'/../log/error.log', 'a', 0666, function(e, id){
        fs.write(id, er.stack+"\n", null, 'utf8', function(){
          fs.close(id, function(){
            process.exit(1);
          });
        });
      });
    }
  });
  
  return errHandler;
};