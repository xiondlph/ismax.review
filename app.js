/**!
 * Main App
 *
 * @package    ismax.review
 * @subpackage Main Application
 * @author     Ismax <admin@ismax.ru>
 **/

/**!
 * Главный модуль приложения,
 * - точка входа
 **/

// Подключение сервера
var server        = require('./server');

// Подключение хостов
var index         = require('./hosts/base');

// Запуск сервера
server.start();