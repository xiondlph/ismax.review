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
    'View/Payment',
    'View/Loader'
], function ($, Menu, ProfileView, PaymentView, Loader) {

    // Маршруты
    function profile() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/profile#profile"]').addClass('b-menu__sub__item__link_active');
        var form = new ProfileView.Form({obj: $('.b-section')});
        form.render();
    }

    function password() {
        var pass = new ProfileView.Password({obj: $('.b-section')});
        pass.render();
    }

    function settings() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/profile#settings"]').addClass('b-menu__sub__item__link_active');
        var addr = new ProfileView.Settings({obj: $('.b-section')});
        addr.render();
    }

    function code() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/profile#settings"]').addClass('b-menu__sub__item__link_active');
        var addr = new ProfileView.Code({obj: $('.b-section')});
        addr.render();
    }

    function advanced() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/profile#settings"]').addClass('b-menu__sub__item__link_active');
        var addr = new ProfileView.Advanced({obj: $('.b-section')});
        addr.render();
    }

    // Оплата
    function payment() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/profile#payment"]').addClass('b-menu__sub__item__link_active');
        var Form = new PaymentView.Form({obj: $('.b-section')});
        Form.render();
    }

    function history() {
        $('.b-menu__sub__item__link_active').removeClass('b-menu__sub__item__link_active');
        $('.b-menu__sub__item__link[href="/profile#payment"]').addClass('b-menu__sub__item__link_active');
        var Form = new PaymentView.History({obj: $('.b-section')});
        Form.render();
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
        router.route('code', 'code', code);
        router.route('advanced', 'advanced', advanced);

        router.route('payment', 'payment', payment);
        router.route('history', 'history', history);

        Backbone.history.start();
    });
});