/**!
 * Market controller
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Market контроллер
 **/

// Объявление модулей
var request 			= require('request'),
		url         	= require('url'),
		querystring 	= require('querystring');

//---------------------- HTTP запросы ----------------------//

// Страница контроллера
exports.index = function(req, res, next){
	req.params.lac 						= '20000';
	req.params.cellid 				= '22579';
	req.params.operatorid 		= '3';
	req.params.countrycode 		= '436';
	req.params.signalstrength = '68';
	req.params.wifinetworks 	= '188796B4C044:-36,14D64D35AC72:-91,00272298CCD0:-93';
	req.params.uuid 					= '1522a764fd610a93091de3494626a844';
	req.params.clid 					= '1866931';

  request({
    url: 'http://mobile.market.yandex.net/market/content'+req._path+'?'+querystring.stringify(req.params),
    headers: {
    	'Accept': 		'text/xml', 
			'User-Agent': 'Yandex.Market/0.1 (Android/4.1.1; ALCATEL ONE TOUCH 5020D/TCT)'
    }
  }, function(err, response, body){
  	if(err){
      throw new Error('Marke request error - '+err.message);
  	}else{
      /*** Заголовки ***/
      res.setHeader("Content-Type", response.headers['content-type']);

  		res.end(body);
  	}
  });
};