/**
 * Модуль представления стр. профиля
 *
 * @module      View.Profile
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


define([
    'backbone',
    'ace',
    'validator',
    'View/Popup',
    'text!Templates/Profile/Form.tpl',
    'text!Templates/Profile/Password.tpl',
    'text!Templates/Profile/Settings.tpl',
    'text!Templates/Profile/Code.tpl',
    'text!Templates/Profile/Advanced.tpl',
    'text!Templates/Popup/Success.tpl',
    'text!Templates/Popup/Error.tpl'
], function (Backbone, Ace, Validator, PopupView, formTpl, passwordTpl, settingsTpl, codeTpl, advancedTpl, successTpl, errorTpl) {
    var Form,
        Password,
        Settings,
        Code,
        Advanced;


    /**
     * Представление формы профиля
     *
     * @class       Form
     * @namespace   Profile
     * @constructor
     * @extends     Backbone.View
     */
    Form = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form  b-switch b-switch_animate',

        events: {
            'input .j-form__field__input':      'input',
            'focus .j-form__field__input':      'focus',
            'blur .j-form__field__input':       'blur',
            'submit':                           'submit'
        },

        render: function () {
            var me = this,
                popup;

            me.$el.html(_.template(formTpl));

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);

            me.$el.find('.b-form__hint:not(".j-form__hint")').hide();

            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();


                $.ajax({
                    url         : '/profile/get/',
                    type        : 'GET',
                    dataType    : 'json'
                }).done(function (data) {
                    var period = '--.--.----';
                    if (data.profile.hasOwnProperty('period') && data.profile.period) {
                        period = (new Date(data.profile.period)).toLocaleDateString();
                    }

                    if (data.profile.hasOwnProperty('_active') && data.profile._active) {
                        me.$el.find('.j-steps__pay').addClass('b-steps__item_active').find('.j-steps__item__round').addClass('icon-ok');
                    }


                    if (data.profile.hasOwnProperty('active') && data.profile.active) {
                        me.$el.find('.j-steps__code').addClass('b-steps__item_active').find('.j-steps__item__round').addClass('icon-ok');
                    }

                    me.$el.find('input[name="email"]').val(data.profile.email);

                    if (data.profile.hasOwnProperty('domain') && data.profile.domain) {
                        me.$el.find('.j-domain').text(data.profile.domain);
                        me.$el.find('.j-steps__domain').addClass('b-steps__item_active').find('.j-steps__item__round').addClass('icon-ok');
                    } else {
                        me.$el.find('.j-domain').html('<a href="#settings">Указать</a>');
                    }

                    if (data.profile.hasOwnProperty('_active') && data.profile._active) {
                        me.$el.find('.j-state').addClass('b-form__state_green');
                        me.$el.find('.j-state').text('Активен');
                        me.$el.find('.j-period').text(period);
                    } else {
                        me.$el.find('.j-state').addClass('b-form__state_red');
                        me.$el.find('.j-state').text('Заблокирован');
                        me.$el.find('.j-period').text(period);
                    }

                    me.$el.find('.j-form__field__input').trigger('input');
                    if (me.$el.find('.b-steps__item_active').length < 3) {
                        if (!me.$el.find('.j-steps__code').hasClass('b-steps__item_active')) {
                            me.$el.find('.j-form__hint').text('Выполняется автоматическое обнаружение виджета на вашем сайте и его настройка. Это может занять некоторое время.');
                        }

                        if (!me.$el.find('.j-steps__domain').hasClass('b-steps__item_active')) {
                            me.$el.find('.j-form__hint').text('Для работы виджета следует выполнить привязку вашего сайта.');
                        }

                        if (!me.$el.find('.j-steps__pay').hasClass('b-steps__item_active')) {
                            me.$el.find('.j-form__hint').text('Для работы виджета вам необходимо оплатить услугу.');
                        }

                    } else {
                        me.$el.find('.j-form__hint').text('Ваш профиль полностью настроен для работы виджета');

                        setTimeout(function () {
                            if (!me.$el.find('input[name="email"]').is(':focus')) {
                                me.$el.find('input[name="email"]').trigger('focus');
                            }
                        }, 2000);

                    }
                }).fail(function () {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });



            }, 200);

            return me.$el;
        },

        input: function (e) {
            if ($(e.currentTarget).val().length > 0) {
                $(e.currentTarget).addClass('b-form__field__input_fill');
                $(e.currentTarget).removeClass('b-form__field__input_invalid');
            } else {
                $(e.currentTarget).removeClass('b-form__field__input_fill');
            }
        },

        focus: function (e) {
            var me = this;

            me.$el.find('.b-form__hint').hide();

            me.$el.find('.j-form__hint_' + e.currentTarget.id).stop().fadeIn();
        },

        blur: function (e) {
            var me = this;

            me.$el.find('.j-form__hint_' + e.currentTarget.id).stop().fadeOut();

            setTimeout(function () {
                if (!me.$el.find('.b-form__hint:visible').length && me.$el.find('.j-form__hint').length) {
                    me.$el.find('.j-form__hint').stop().fadeIn();
                }
            }, 500);
        },

        submit: function (e) {
            var me      = this,
                valid   = true,
                popup;

            e.preventDefault();

            if (!Validator.isLength(this.$el.find('input[name="email"]').val(), 1, 255)) {
                this.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Необходимо ввести Email');
                valid = false;
            } else {
                if (!Validator.isEmail(this.$el.find('input[name="email"]').val())) {
                    this.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                    this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Неверный формат Email');
                    valid = false;
                } else {
                    this.$el.find('input[name="email"]').removeClass('invalid');
                    this.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
                }
            }

            if (valid) {
                $.ajax({
                    url         : '/profile/email',
                    type        : 'POST',
                    dataType    : 'json',
                    data: JSON.stringify({
                        email: this.$el.find('input[name="email"]').val()
                    })
                }).done(function (data) {
                    if (data.exist) {
                        me.$el.find('input[name="email"]').addClass('b-form__field__input_invalid');
                        me.$el.find('input[name="email"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Пользователь с таким Email уже существует');
                    } else {
                        popup = new PopupView({content: $(_.template(successTpl)({message: 'Данные сохранены'}))});
                        popup.render();
                    }
                }).fail(function (data) {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }

            return false;
        }
    });


    /**
     * Представление формы смены пароля
     *
     * @class       Password
     * @namespace   Profile
     * @constructor
     * @extends     Backbone.View
     */
    Password = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form  b-switch b-switch_animate',

        events: {
            'input input':                      'input',
            'focus .j-form__field__input':      'focus',
            'blur .j-form__field__input':       'blur',
            'submit':                           'submit'
        },

        render: function () {
            var me = this;
            me.$el.html(_.template(passwordTpl));

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);

            me.$el.find('.b-form__hint:not(".j-form__hint")').hide();

            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();
            }, 200);

            setTimeout(function () {
                if (!me.$el.find('input[name="password"]').is(':focus')) {
                    me.$el.find('input[name="password"]').trigger('focus');
                }
            }, 2000);

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
        },

        focus: function (e) {
            var me = this;

            me.$el.find('.b-form__hint').hide();

            me.$el.find('.j-form__hint_' + e.currentTarget.id).stop().fadeIn();
        },

        blur: function (e) {
            var me = this;

            me.$el.find('.j-form__hint_' + e.currentTarget.id).stop().fadeOut();

            setTimeout(function () {
                if (!me.$el.find('.b-form__hint:visible').length && me.$el.find('.j-form__hint').length) {
                    me.$el.find('.j-form__hint').stop().fadeIn();
                }
            }, 500);
        },

        submit: function (e) {
            var valid   = true,
                popup;

            e.preventDefault();

            if (!Validator.isLength(this.$el.find('input[name="password"]').val(), 1, 255)) {
                this.$el.find('input[name="password"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="password"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Необходимо ввести новый пароль');
                valid = false;
            } else {
                this.$el.find('input[name="password"]').removeClass('invalid');
                this.$el.find('input[name="password"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
            }

            if (!Validator.isLength(this.$el.find('input[name="confirm"]').val(), 1, 255)) {
                this.$el.find('input[name="confirm"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="confirm"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Необходимо подтвердить новый пароль');
                valid = false;
            } else {
                this.$el.find('input[name="confirm"]').removeClass('invalid');
                this.$el.find('input[name="confirm"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
            }

            if (this.$el.find('input[name="confirm"]').val() !== this.$el.find('input[name="password"]').val()) {
                this.$el.find('input[name="confirm"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="confirm"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Пароли не совпадают');
                valid = false;
            } else {
                this.$el.find('input[name="confirm"]').removeClass('invalid');
                this.$el.find('input[name="confirm"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
            }

            if (valid) {
                $.ajax({
                    url         : '/profile/pass',
                    type        : 'POST',
                    dataType    : 'json',
                    data: JSON.stringify({
                        password: this.$el.find('input[name="password"]').val()
                    })
                }).done(function (data) {
                    popup = new PopupView({content: $(_.template(successTpl)({message: 'Пароль обновлен'}))});
                    popup.render();
                }).fail(function (data) {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }

            return false;
        }
    });


    /**
     * Представление формы базовых настроек
     *
     * @class       Settings
     * @namespace   Profile
     * @constructor
     * @extends     Backbone.View
     */
    Settings = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form  b-switch b-switch_animate',

        events: {
            'input input':                      'input',
            'input textarea':                   'input',
            'focus .j-form__field__input':      'focus',
            'blur .j-form__field__input':       'blur',
            'submit':                           'submit'
        },

        render: function () {
            var me = this,
                popup;

            me.$el.html(_.template(settingsTpl));

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);

            me.$el.find('.b-form__hint:not(".j-form__hint")').hide();

            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();

                $.ajax({
                    url         : '/profile/settings/',
                    type        : 'GET',
                    dataType    : 'json'
                }).done(function (data) {
                    me.$el.find('input[name="domain"]').val(data.settings.domain);
                    me.$el.find('.j-form__field__input').trigger('input');
                }).fail(function () {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }, 200);

            return this.$el;
        },

        input: function (e) {
            if ($(e.currentTarget).val().length > 0) {
                $(e.currentTarget).addClass('b-form__field__input_fill');
                $(e.currentTarget).removeClass('b-form__field__input_invalid');
            } else {
                $(e.currentTarget).removeClass('b-form__field__input_fill');
            }
        },

        focus: function (e) {
            var me = this;

            me.$el.find('.b-form__hint').hide();

            me.$el.find('.j-form__hint_' + e.currentTarget.id).stop().fadeIn();
        },

        blur: function (e) {
            var me = this;

            me.$el.find('.j-form__hint_' + e.currentTarget.id).stop().fadeOut();

            setTimeout(function () {
                if (!me.$el.find('.b-form__hint:visible').length && me.$el.find('.j-form__hint').length) {
                    me.$el.find('.j-form__hint').stop().fadeIn();
                }
            }, 500);
        },

        submit: function (e) {
            var valid   = true,
                popup;

            e.preventDefault();

            if (this.$el.find('input[name="domain"]').val().length && !Validator.isURL(this.$el.find('input[name="domain"]').val())) {
                this.$el.find('input[name="domain"]').addClass('b-form__field__input_invalid');
                this.$el.find('input[name="domain"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('Некорректный домен');
                valid = false;
            } else {
                this.$el.find('input[name="domain"]').removeClass('invalid');
                this.$el.find('input[name="domain"]').next('.b-form__field__label').find('.b-form__field__label__invalid').text('');
            }

            if (valid) {
                $.ajax({
                    url         : '/profile/settings',
                    type        : 'POST',
                    dataType    : 'json',
                    data: JSON.stringify({
                        domain: this.$el.find('input[name="domain"]').val()
                    })
                }).done(function (data) {
                    popup = new PopupView({content: $(_.template(successTpl)({message: 'Данные сохранены'}))});
                    popup.render();
                }).fail(function (data) {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }

            return false;
        }
    });


    /**
     * Представление формы кода виджета
     *
     * @class       Code
     * @namespace   Profile
     * @constructor
     * @extends     Backbone.View
     */
    Code = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form  b-switch b-switch_animate',

        events: {

        },

        render: function () {
            var me = this;

            me.$el.html(_.template(codeTpl));

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);
            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();
            }, 200);

            return this.$el;
        }
    });

    /**
     * Представление формы расширенных настроек
     *
     * @class       Advanced
     * @namespace   Profile
     * @constructor
     * @extends     Backbone.View
     */
    Advanced = Backbone.View.extend({
        tagName:    'form',
        className:  'b-form  b-switch b-switch_animate',

        events: {
            'input input':                              'input',
            'input textarea':                           'input',
            'submit':                                   'submit'
        },

        render: function () {
            var me = this,
                popup;

            me.$el.html(_.template(advancedTpl));

            me.options.obj.find('.b-switch').addClass('b-switch_animate');
            me.options.obj.append(me.$el);
            setTimeout(function () {
                me.$el.removeClass('b-switch_animate');
            });

            setTimeout(function () {
                me.options.obj.find('.b-switch_animate').remove();

                $.ajax({
                    url         : '/profile/settings/',
                    type        : 'GET',
                    dataType    : 'json'
                }).done(function (data) {
                    me.$el.find('#script').text(data.settings.script);

                    me.scriptEditor = ace.edit("script");
                    //me.scriptEditor.setTheme("ace/theme/twilight");
                    me.scriptEditor.getSession().setMode("ace/mode/javascript");
                    me.scriptEditor.setReadOnly(true);
                    window._scriptEditor = me.scriptEditor;
                }).fail(function () {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }, 200);

            return this.$el;
        },

        submit: function (e) {
            var valid   = true,
                popup;

            e.preventDefault();

            if (valid) {
                $.ajax({
                    url         : '/profile/settings',
                    type        : 'POST',
                    dataType    : 'json',
                    data: JSON.stringify({
                        script: this.scriptEditor.getValue()
                    })
                }).done(function (data) {
                    popup = new PopupView({content: $(_.template(successTpl)({message: 'Данные сохранены'}))});
                    popup.render();
                }).fail(function (data) {
                    popup = new PopupView({content: $(errorTpl)});
                    popup.render();
                });
            }

            return false;
        }
    });

    return {
        Form        : Form,
        Password    : Password,
        Settings    : Settings,
        Code        : Code,
        Advanced    : Advanced
    };
});