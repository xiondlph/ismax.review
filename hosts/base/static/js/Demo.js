/**
 * Модуль инициализации главной стр.
 *
 * @module      Index
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */

require.config({
    baseUrl: 'js',
    paths: {
        text            : '../lib/requirejs/text',
        jquery          : '../lib/jquery/jquery-2.1.1.min',
        validator       : '../lib/validator.min',
        autocomplete    : '../lib/autocomplete.min',
        underscore      : '../lib/underscore/underscore-min',
        backbone        : '../lib/backbone/backbone-min',

        Templates       : '../Templates'
    },

    shim: {
        'backbone': {
            deps    : ['underscore', 'jquery'],
            exports : 'Backbone'
        }
    }
});

require([
    'jquery',
    'View/Menu',
    'View/Demo',
    'View/Loader'
], function ($, MenuView, DemoView, LoaderView) {

    $(function () {
        var demo    = new DemoView({el: $('.b-form')}),
            menu    = new MenuView({el: $('.b-menu')}),
            loader  = new LoaderView({obj: $('body')});

        menu.render();
        demo.render();
        loader.render();

        Backbone.history.start();
    });
});