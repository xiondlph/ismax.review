/**!
 * Secure controller
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Secure контроллер
 **/

// Объявление модулей
var crypto        = require('crypto'),
    nodemailer    = require("nodemailer"),
    validator 		= require('validator');

//---------------------- HTTP запросы ----------------------//

// Страница контроллера
exports.index = function(req, res){
  res.render(__dirname+'/../view/secure.jade');
};

// Получение пользователя
exports.user = function(req, res, next){
  req.model.getUserBySession(req.sissionId, function(user){
    if(!user){
      next();
      return;
    }else{
      req.user = user;
      next();
    }
  });
};

// Авторизация
exports.signin = function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://ismax.ru');

  if(req.params){

    if(!validator.isEmail(req.params.email)){
      throw new Error('Validate error - email is invalid');
    }
  
    req.model.getUserByEmail(req.params.email, function(user){
      if(!user){
        var response = {
          auth: false
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
  
        return;
      }
  
      if(crypto.createHmac('sha256', req.params.password).digest('hex') != user.password){
        var response = {
          auth: false
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
  
        return
      }

      req.model.setSession(req.params.email, req.sissionId, function(result){
        var response = {
          auth: true
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
      });
    });    
  }else{
    var response = {
      auth: false,
      success: false
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
};

// Проверка авторизации
exports.auth = function(req, res, next){
  if(!req.user){
    if(req.headers['x-requested-with'] && req.headers['x-requested-with'] == 'XMLHttpRequest'){
      var response = {
        auth: false
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();   
      return;
    }
    
    res.statusCode = 302;
    res.setHeader('Location','/user#login');
    res.end();
    return;
  }else{
    next();
  }
};
