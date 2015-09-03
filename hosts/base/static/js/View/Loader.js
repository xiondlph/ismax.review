/**
 * Модуль представления индикатора загрузки
 *
 * @module      View.Loader
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone'
], function (Backbone) {


    /**
     * Представление индикатора загрузки
     *
     * @class       Loader
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Loader = Backbone.View.extend({
        className: 'b-loader',

        initialize: function () {
            var me = this,
                _orgAjax = $.ajaxSettings.xhr;

            $.ajaxSettings.xhr = function () {
                var xhr = _orgAjax();
                xhr.onprogress = function (e) {
                    console.log(e.loaded);
                };

                xhr.upload.onprogress = function (e) {
                    console.log(e.loaded);
                };

                xhr.onreadystatechange = function () {

                    me.loader.stop().animate({
                        width: (xhr.readyState * 100) + '%'
                    }, 100);
                };

                return xhr;
            };


            $(document).ajaxStart(function () {
                if ($('.b-loader__holder').length) {
                    $('.b-loader__holder').append(me.loader);
                } else {
                    me.$el.append(me.loader);
                }
                me.loader.css('width', '0%');
                me.$el.fadeIn(function () {
                    me.loader.show();
                });
            });

            $(document).ajaxStop(function () {
                setTimeout(function () {
                    me.$el.fadeOut();
                    me.loader.fadeOut(function () {
                        this.remove();
                    });
                }, 100);
            });

            $(document).ajaxError(function (event, request, settings) {
                setTimeout(function () {
                    me.$el.fadeOut();
                    if (request.status === 401) {
                        me.unauthorized();
                    }
                }, 100);
            });
        },

        render: function () {
            this.loader = $('<div class="b-loader__line"></div>');
            this.options.obj.append(this.$el);

            return this.$el;
        }
    });


    return Loader;
});