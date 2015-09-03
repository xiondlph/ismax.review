/**
 * Модуль представления демо виджета
 *
 * @module      View.Demo
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'validator',
    'View/Popup',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, PopupView, successTpl, errorTpl) {


    /**
     * Представление формы регистрации
     *
     * @class       Demo
     * @namespace   View
     * @constructor
     * @extends     Backbone.View
     */
    var Demo = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form b-switch b-switch_animate',

        events: {
            'input input': 'input'
        },

        render: function () {
            var me = this;

            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            me.$el.find('.j-form__field__input').trigger('input');

            return this.$el;
        },

        input: function (e) {
            if ($(e.currentTarget).val().length > 0) {
                $(e.currentTarget).addClass('b-form__field__input_fill');
                $(e.currentTarget).removeClass('b-form__field__input_invalid');
            } else {
                $(e.currentTarget).removeClass('b-form__field__input_fill');
            }
        }
    });

    return Demo;
});