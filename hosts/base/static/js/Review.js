/**
 * Модуль инициализации стр. отзывов
 *
 * @module      Index
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */

require.config({
  baseUrl: '/js',
  paths: {
    jquery:     'lib/jquery-1.11.1.min',
    ui:         'lib/jquery-ui-1.10.4.custom.min',
    validator:  'lib/validator.min',
    underscore: 'lib/backbone/underscore-min',
    backbone:   'lib/backbone/backbone-min'
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'ui': ['jquery']
  }
});

require([
  'jquery',
  'View/Widget'
], function($, Widget){
  $(window).resize(function(){
    top.postMessage({action: 'ismaxSetHeight', height: $('body').height()+10},'*');
  });

  var list = new Widget.List({obj: $('#ismax')});
  list.render();
});