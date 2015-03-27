/**
 * Review контроллер
 *
 * @module      Hosts.Base.Controller.Review
 * @class				Controller.Review
 * @namespace   Hosts.Base
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */
 

// Объявление модулей
var http        = require('http'),
    urlencode   = require("urlencode"),
    validator   = require('validator'),
    crypto      = require('crypto');

//---------------------- HTTP запросы ----------------------//


/**
 * Рендеринг виджета
 *
 * @method widget
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.widget = function(req, res){

  if(!validator.isLength(req.params.text, 3)){
    throw new Error('Validate error - text is invalid');
  }

  if(!validator.isLength(req.params.hash, 3)){
    throw new Error('Validate error - hash is invalid');
  }

  var hash = crypto.createHash('sha1').update('53f72f62cc66010267000006'+req.params.text).digest('hex');

  if(hash == req.params.hash){
    var request = http.request({
      host:     'localhost',
      port:     3000,
      path:     '/v1/search.json?text='+urlencode(req.params.text)+'&count=1',
      method:   'GET',
      headers: {
        'Host':               'market.icsystem.ru',
        'X-Forwarded-Proto':  'http',
        'X-Forwarded-For':    '78.24.219.141'
      }
    }, function(response){
      var data = '';

      response.on('data', function(chunk){
        data += chunk.toString();
      });

      response.on('end', function(){
        var result = JSON.parse(data);
        if(result.searchResult.results.length > 0 && 'model' in result.searchResult.results[0]){
          req.local.modelId = result.searchResult.results[0].model.id;
          req.local.hash    = req.params.hash;
          req.local.text    = req.params.text;
        }

        res.render(__dirname+'/../view', 'widget');
      });
    });

    request.end();
  }else{
    res.render(__dirname+'/../view', 'widget');
  }
};


/**
 * Список отзывов
 *
 * @method list
 * @param {Object} req Объект запроса сервера
 * @param {Object} res Объект ответа сервера
 */
exports.list = function(req, res){
  if(!validator.isInt(req.params.modelId)){
    throw new Error('Validate error - modelId is invalid');
  }

  if(!validator.isLength(req.params.text, 3)){
    throw new Error('Validate error - text is invalid');
  }

  if(!validator.isLength(req.params.hash, 3)){
    throw new Error('Validate error - hash is invalid');
  }

  if(!validator.isInt(req.params.page)){
    throw new Error('Validate error - page is invalid');
  }

  var hash = crypto.createHash('sha1').update('53f72f62cc66010267000006'+req.params.text).digest('hex');

  if(hash !== req.params.hash){
    throw new Error('Auth error - key is invalid');
  }

  var request = http.request({
    host:     'localhost',
    port:     3000,
    path:     '/v1/model/'+req.params.modelId+'/opinion.json?page='+req.params.page,
    method:   'GET',
    headers: {
      'Host':               'market.icsystem.ru',
      'X-Forwarded-Proto':  'http',
      'X-Forwarded-For':    '78.24.219.141'
    }
  }, function(response){

    response.setEncoding('utf8');
    var data = '';

    response.on('data', function(chunk){
      data += chunk.toString();
    });

    response.on('end', function(){
      var result = JSON.parse(data);

      var reviews = [];
      for (var i = 0; i < result.modelOpinions.opinion.length; i++){
        reviews.push({
          _id:    result.modelOpinions.opinion[i].id,
          author: result.modelOpinions.opinion[i].author ? result.modelOpinions.opinion[i].author : '',
          grade:  result.modelOpinions.opinion[i].grade,
          contra: result.modelOpinions.opinion[i].contra,
          pro:    result.modelOpinions.opinion[i].pro,
          text:   result.modelOpinions.opinion[i].text ? result.modelOpinions.opinion[i].text : '',
          date:   result.modelOpinions.opinion[i].date,
        });
      };

      var response = {
        success: true,
        reviews: reviews,
        count: result.modelOpinions.count,
        total: result.modelOpinions.total
      };

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf-8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();

    });
  });

  request.end();
};