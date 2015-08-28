/**
 * Модуль инициализации стр. профиля
 *
 * @module      Profile
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */

require.config({
    baseUrl: 'js',
    paths: {
        text        : '../lib/requirejs/text',
        jquery      : '../lib/jquery/jquery-2.1.1.min',
        validator   : '../lib/validator.min',
        underscore  : '../lib/underscore/underscore-min',
        backbone    : '../lib/backbone/backbone-min',

        Templates   : '../Templates'
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
    'View/Profile',
    'View/Loader'
], function ($, Menu, Profile, Loader) {

    // Маршруты
    function profile() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/profile#profile"]').addClass('b-menu__sub__item__link_active');
        var form = new Profile.Form({obj: $('.b-section')});
        form.render();
    }

    function password() {
        var pass = new Profile.Password({obj: $('.b-section')});
        pass.render();
    }

    function settings() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/profile#settings"]').addClass('b-menu__sub__item__link_active');
        var addr = new Profile.Settings({obj: $('.b-section')});
        addr.render();
    }

    function advanced() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/profile#advanced"]').addClass('b-menu__sub__item__link_active');
        var addr = new Profile.Advanced({obj: $('.b-section')});
        addr.render();
    }

    $(function () {
        var router  = new Backbone.Router(),
            menu    = new Menu({el: $('.b-menu')}),
            loader  = new Loader({obj: $('body')});

        menu.render();
        loader.render();

        // Маршрутизация
        router.route('*other', 'default', profile);
        router.route('profile', 'profile', profile);
        router.route('pass', 'pass', password);
        router.route('settings', 'settings', settings);
        router.route('advanced', 'advanced', advanced);

        Backbone.history.start();
    });
});