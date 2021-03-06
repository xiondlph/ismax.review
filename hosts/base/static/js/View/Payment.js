/**
 * Модуль представления стр. оплаты
 *
 * @module      View.Payment
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'validator',
    'View/Popup',
    'text!Templates/Payment/Form.tpl',
    'text!Templates/Payment/Last.tpl',
    'text!Templates/Payment/History.tpl',
    'text!Templates/Payment/Item.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Validator, PopupView, formTpl, lastTpl, historyTpl, itemTpl, successTpl, errorTpl) {
    var Form,
        History;


    /**
     * Представление формы приемы оплаты
     *
     * @class       Form
     * @namespace   View.Payment
     * @constructor
     * @extends     Backbone.View
     */
    Form = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form  b-switch b-switch_animate',
        attributes: {
            action: 'https://money.yandex.ru/quickpay/confirm.xml'
        },

        events: {
            'change .j-form__field__input':         'change',
            'submit':                               'submit'
        },


        /**
         * Рендеринг формы приемы оплаты
         *
         * @method render
         * @return {HTMLElement} el
         */
        render: function () {
            var me = this,
                popup;

            me.$el.html(_.template(formTpl));

            me.$el.find('input[name="label"]').val($('header').attr('auth'));
            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);
            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();

                $.ajax({
                    url         : '/payment/last',
                    type        : 'GET',
                    dataType    : 'json'
                }).done(function (data) {
                    if (data.hasOwnProperty('payment')) {
                        var last = $(_.template(lastTpl)(data.payment)).hide();
                        me.$el.find('.j-last-payment').html(last);
                        setTimeout(function () {
                            last.fadeIn();
                        }, 500);
                    } else {
                        me.$el.find('.j-last-payment').remove();
                    }
                }).fail(function () {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }, 200);

            return me.$el;
        },

        change: function (e) {
            var sum = +$(e.currentTarget).val();
            switch (sum) {
            case 100:
                this.$el.find('input[name="formcomment"], input[name="short-dest"], input[name="targets"]').val('Shareview - Продление услуги на сутки');
                break;

            case 3000:
                this.$el.find('input[name="formcomment"], input[name="short-dest"], input[name="targets"]').val('Shareview - Продление услуги на 1 месяц');
                break;

            case 6000:
                this.$el.find('input[name="formcomment"], input[name="short-dest"], input[name="targets"]').val('Shareview - Продление услуги на 2 месяц');
                break;
            }
        },

        submit: function (e) {
            var me      = this,
                valid   = true;

            e.preventDefault();

            // Валидация ...

            if (valid) {
                me.$el.get(0).submit();
            }

            return false;
        }
    });



    /**
     * Представление журнала платежных операций
     *
     * @class       History
     * @namespace   View.Payment
     * @constructor
     * @extends     Backbone.View
     */
    History = Backbone.View.extend({
        className   : 'b-history b-switch b-switch_animate',

        events: {
            'click .j-more': 'more'
        },


        /**
         * Рендеринг журнала платежных операций
         *
         * @method render
         * @return {HTMLElement} el
         */
        render: function () {
            var me      = this,
                popup;

            me.$el.html(_.template(historyTpl));
            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);
            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();

                $.ajax({
                    url: '/payment/list',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        skip: 0
                    }
                }).done(function (data) {
                    me.$el.find('.b-grid').append(_.template(itemTpl)(data));
                    if (me.$el.find('.b-grid__row').length - 1 < data.total) {
                        me.$el.find('.b-pagination').css({visibility: 'visible'});
                    }
                }).fail(function () {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }, 200);

            return me.$el;
        },

        more: function (event) {
            var me = this,
                popup;

            $.ajax({
                url: '/payment/list',
                type: 'GET',
                dataType: 'json',
                data: {
                    skip: me.$el.find('.b-grid__row').length - 1
                }
            }).done(function (data) {
                me.$el.find('.b-grid').append(_.template(itemTpl)(data));
                if (me.$el.find('.b-grid__row').length - 1 === data.total) {
                    me.$el.find('.b-pagination').css({visibility: 'hidden'});
                }
            }).fail(function () {
                popup = new PopupView({content: $(errorTpl)});
                popup.render();
            });

            return false;
        }
    });

    return {
        Form    : Form,
        History : History
    };
});