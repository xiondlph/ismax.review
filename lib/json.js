/**!
 * Json module
 *
 * @package    ismax.review
 * @subpackage library
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Модуль работы с json данными
 **/

// Объявление модулей

// Преобразование строки в json
exports.parse = function(str){
  try{
    var data = JSON.parse(str);
    return data;
  }catch(e){
    return false;
  }
};