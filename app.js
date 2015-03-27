/**
 * Главный модуль приложения - точка входа
 *
 * @module 			Main
 * @main        Yandex.Market API
 * @author     	Ismax <admin@ismax.ru>
 */

// Объявление модулей
var cluster       = require('cluster');

// Главный процесс
if(cluster.isMaster){
	if(process.env.NODE_ENV == 'debug') console.log('Start master');
	cluster.fork();
  
  // В случае падения процесса, запуск нового
  cluster.on('disconnect', function(worker) {
    if(process.env.NODE_ENV == 'debug') console.error('Worker disconnect!');
    cluster.fork();
  });

// Дочерний процесс
}else{
	if(process.env.NODE_ENV == 'debug') console.log('Start worker');
	// Модуль web-сервера
	var server        = require('./server');


	// Модуль виртуальных хостов
	var index         = require('./hosts/base');

	// Запуск сервера
	server.start();
}