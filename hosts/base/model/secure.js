/**
 * Secure model
 *
 * @package    ismax.review
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Модель данных
 * системой безопастности
 **/

// Объявление модулей
var mongo = require('../../../lib/db');

exports.middleware = function(req, res, next){
	req.model = {

		// Получения пользователя по индексу сессии
		getUserBySession: function(index, accept){
		  mongo.db.collection('users', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);
		      return;
		    }

		    collection.findOne({'sid': index}, function(err, user){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(user);
		      }
		    });
		  });  
		},

		// Получения пользователя по Email
		getUserByEmail: function(email, accept){
		  mongo.db.collection('users', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);
		      return;
		    }

		    collection.findOne({'email': email}, function(err, user){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(user);
		      }
		    });
		  });  
		},

		// Проверка уникальности по Email
		isExistByEmail: function(email, accept){
		  mongo.db.collection('users', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);      
		      return;
		    }

		    collection.count({'email': email}, function(err, count){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(count);
		      }
		    });
		  });
		},

		// Создание нового пользователя
		create: function(user, accept){
		  mongo.db.collection('users', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);
		      return;
		    }

		    collection.insert({
		      email     : user.email,
		      password  : user.password,
		      salt      : user.salt,
		      active    : user.active
		    }, function(err, user){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(user);
		      }
		    });
		  });
		},

		// Установка хеша текущей сессии для пользователя
		setSession: function(email, index, accept){
		  mongo.db.collection('users', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);
		      return;
		    }

		    collection.update({'email': email}, {$set: {sid: index}}, function(err, result){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(result);
		      }
		    });
		  });
		},

		// Удаление хеша текущей сессии для пользователя
		unsetSession: function(index, accept){
		  mongo.db.collection('users', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);
		      return;
		    }

		    collection.update({'sid': index}, {$unset: {sid: index}}, function(err, result){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(result);
		      }
		    });
		  });
		},

		// Установка нового пароля для пользователя
		setPassword: function(id, password, accept){
		  mongo.db.collection('users', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);
		      return;
		    }

		    collection.update({_id: id}, {$set: {password: password}}, function(err, result){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(result);
		      }
		    });
		  });
		},

		// Установка нового пароля для пользователя по Email
		setPasswordByEmail: function(email, password, accept){
		  mongo.db.collection('users', function(err, collection){
		    if(err){
		      throw new Error('Mongo error - '+err.message);
		      return;
		    }

		    collection.update({email: email}, {$set: {password: password}}, function(err, result){
		      if(err){
		        throw new Error('Mongo error - '+err.message);
		        return;
		      }

		      if(typeof accept == 'function'){
		        accept(result);
		      }
		    });
		  });
		}
	}

  next();
};