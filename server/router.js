/**
 * Модуль маршрутизатор по url
 *
 * @module      Server.Routing
 * @class       Routing
 * @namespace   Server
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


// Объявление модулей
var url         = require('url'),
    fs          = require('fs');


// Объекты набора маршрутов
var handle            = [];
    handle['GET']     = [];
    handle['POST']    = [];
    handle['PUT']     = [];
    handle['DELETE']  = [];


// Проверка соответствия запроса маршруту
var match = function(elem){
  var reg = new RegExp(elem.path);
  return reg.test(this.proto+this.host+this.pathname);
}


// Назначение функций контроллеров маршрутам
var setRoute = function(){
  var funcs = new Array();

  for(var i=2;i<arguments.length;i++){
    if(Array.isArray(arguments[i])){
      arguments[i].forEach(function(func){
        if(typeof func !== 'function'){
          throw new Error('Argumet id not a function on ['+arguments[1]+']');
        }
      },this);
      funcs = funcs.concat(arguments[i]);
    }else if(typeof arguments[i] !== 'function'){
      throw new Error('Argumet id not a function on ['+arguments[1]+']');
    }else{
      funcs = funcs.concat(arguments[i]);
    }
  }

  handle[arguments[0]].push({
    path: arguments[1],
    funcs: funcs
  });
}


/**
 * Назначение обработчика GET запроса
 *
 * @method get
 */
this.get = function(){
  var _arguments = [].slice.call(arguments);
  _arguments.unshift('GET');
  setRoute.apply(this, _arguments);
}


/**
 * Назначение обработчика POST запроса
 *
 * @method post
 */
this.post = function(){
  var _arguments = [].slice.call(arguments);
  _arguments.unshift('POST');
  setRoute.apply(this, _arguments);
}


/**
 * Назначение обработчика PUT запроса
 *
 * @method put
 */
this.put = function(){
  var _arguments = [].slice.call(arguments);
  _arguments.unshift('PUT');
  setRoute.apply(this, _arguments);
}


/**
 * Назначение обработчика DELETE запроса
 *
 * @method delete
 */
this.delete = function(){
  var _arguments = [].slice.call(arguments);
  _arguments.unshift('DELETE');
  setRoute.apply(this, _arguments);
}


/**
 * Маршрутизация по хосту
 *
 * @method route
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
this.route = function(req, res){
  var _caller = arguments.callee;
  var _method = req.method;
  var _funcs  = [];


  // Функция контроля последовательности
  // выполнения функций связанных с маршрутом
  var next = function(caller){
    var index = _funcs.indexOf(caller);

    if(typeof _funcs[index] === 'function'){
      _funcs[index](req, res, function(){
        next(_funcs[index+1]);
      });
    }else{
      notfound();
    }
  }


  // Обработчик ошибки 404
  var notfound = function(){
    if(handle[_method] !== undefined && (_route = handle[_method].filter(match, {proto: req.headers['x-forwarded-proto']+'://', host: req.headers.host, pathname: '/404'})).length){
      // формирования массива обработчиков маршрута
      var funcs = [];
      _route.forEach(function(elem){
        funcs = funcs.concat(elem.funcs);
      },this);

      _funcs = funcs.filter(function(elem, index){return _funcs.indexOf(elem) == -1}, this);

      next(_funcs[0]);
    // В случае отсудсвия маршрута 404, вывод ошибки 404
    }else{
      res.statusCode = 404;
      res.setHeader('Content-Type','text/html; charset=UTF-8');
      res.end('<h1>Page not found</h1>');
    }
  }

  // Определения наличия марщрута в списке
  if(handle[_method] !== undefined && (_route = handle[_method].filter(match, {proto: req.headers['x-forwarded-proto']+'://', host: req.headers.host, pathname: url.parse(req.url).pathname})).length){
    // формирования массива обработчиков маршрута
    _route.forEach(function(elem){
      _funcs = _funcs.concat(elem.funcs);
    },this);

    
    next(_funcs[0]);
  // В случае отсудсвия маршрута, диспетчеризация маршрута 404
  }else{
    notfound();
  }
}