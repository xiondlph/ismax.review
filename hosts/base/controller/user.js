/**!
 * User controller
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * User контроллер
 **/

// Объявление модулей
var crypto        		= require('crypto'),
    nodemailer    		= require("nodemailer"),
    validator 				= require('validator'),
    generatePassword 	= require('password-generator');

//---------------------- HTTP запросы ----------------------//

// Создание пользователя
exports.create = function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://ismax.ru');
  if(req.params){
		if(!validator.isEmail(req.params.email)){
		  throw new Error('Validate error - email is invalid');
		}

    req.model.isExistByEmail(req.params.email, function(count){
      if(count > 0){
        var response = {
          exist: true
        };
    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
      }else{
      	var _password 	= generatePassword(12, false);
      	var data = {
      		email: req.params.email,
      		active: false
      	};

        // Шифрование
        data.password  	= crypto.createHmac('sha256', _password).digest('hex');
        data.salt      	= crypto.createHmac('sha256', req.params.email).digest('hex');

        req.model.create(data, function(user){
          var smtpTransport = nodemailer.createTransport("SMTP",{
            service: 'Gmail',
            auth: {
              user: 'admin@ismax.ru',
              pass: '474484237QwErT'
            }
          });
        
          smtpTransport.sendMail({
            from: 'Shukhrat <admin@ismax.ru',
            to: data.email,
            subject: 'Регистрация в сервисе ISMAX',
            text: 'Email: '+data.email+'<br />'+'Пароль: '+_password
          }, function(error, response){
            if(error){
              var response = {
                success: false
              }
            }else{
              var response = {
                success: true
              }
            }
              
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=utf8');
            res.write(JSON.stringify(response, null, "\t"));
            res.end();
          });
        });
      }
    });
  }else{
    var response = {
      success: false
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
};

// Генирация нового паролья (востановления доступа)
exports.forgot = function(req, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://ismax.ru');
  if(req.params){ 
    if(!validator.isEmail(req.params.email)){
      throw new Error('Validate error - email is invalid');
    }

    req.model.getUserByEmail(req.params.email, function(user){
      if(!user){
        var response = {
          success: false
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
  
        return;
      }
      var _password = generatePassword(12, false);
      var password  = crypto.createHmac('sha256', _password).digest('hex');

      req.model.setPasswordByEmail(req.params.email, password, function(result){
        var smtpTransport = nodemailer.createTransport("SMTP",{
          service: 'Gmail',
          auth: {
            user: 'admin@ismax.ru',
            pass: '474484237QwErT'
          }
        });
      
        smtpTransport.sendMail({
          from: "Shukhrat <admin@ismax.ru",
          to: user.email,
          subject: 'Востановления доступа к сервису ISMAX',
          text: 'Ваш новый пароль: '+_password
        }, function(error, response){
          if(error){
            var response = {
              success: false
            }
          }else{
            var response = {
              success: true
            }
          }
            
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application-json; charset=utf8');
          res.write(JSON.stringify(response, null, "\t"));
          res.end();
        });
      });
    });
  }
};