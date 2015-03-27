/**
 * Модуль представления стр. отзывов
 *
 * @module      View.Widget
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


define([
	'backbone',
	'validator',
	'Templates/Widget'
], function(Backbone, validator, _widget){

  var List = Backbone.View.extend({
    tagName: 'div',
    className: 'ismaxReview',
    id: 'ismaxReview',
    events:{
      'click .ismaxMoreBtn': 'loadReview'
    },

    render: function(){
      var tmpl = _.template(_widget.List);
      this.$el.html(tmpl);

      this.options.obj.html(this.$el);
      this.loadReview();

      return this.$el;
    },

    dateParse: function(date){
      var _humanMonth = Array(
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декобря'
      );
      var _current    = new Date();
      var _date       = new Date(date);
      var _year       = '';
      var _month      = '';
      var _day        = '';

      if(_current.getFullYear() !== _date.getFullYear()){
        _year = ' '+_date.getFullYear();
      }

      if(_current.getMonth() !== _date.getMonth()){
        _month = ' '+_humanMonth[_date.getMonth()];
      }

      if(_current.getDate() - _date.getDate() > 1 || _month.length > 0 || _year.length > 0){
        _month = _month.length > 0 ? _month : ' '+_humanMonth[_date.getMonth()];
        _day = _date.getDate();
      }else if(_current.getDate() - _date.getDate() > 0){
        _day = 'Вчера';
      }else{
        _day = 'Сегодня';
      }

      return _day+_month+_year;
    },
  
    loadReview: function(){
      var me    = this;
      me.$el.find('.ismaxLoader').show();
      me.$el.find('.ismaxMoreBtn').hide();
      $.ajax({
        url: '/review/list/',
        type: 'GET',
        dataType: 'json',
        data: {
          modelId:  $('#ismax').attr('_modelId'),
          hash:     $('#ismax').attr('_hash'),
          text:     $('#ismax').attr('_text'),
          page:     ($('.ismaxReviewItem').length / 10) +1
        },
        success: function(data){
          _.extend(data, {dateParse: me.dateParse});
          var list = _.template(_widget.Item);
          me.$el.find('.ismaxReviewList').append(list(data));

          if($('.ismaxReviewItem').length < data.total){
            me.$el.find('.ismaxMoreBtn').show();
          }

          me.$el.find('.ismaxReviewItem').animate({opacity: 1}, 500);
          top.postMessage({action: 'ismaxSetHeight', height: $('body').height()+10},'*');
        },
        complete: function(){
          me.$el.find('.ismaxLoader').hide();
        }
      });
    }
  });


  var Item = Backbone.View.extend({
    tagName: 'div',
    className: 'ismaxReviewItem',
    events:{
    },

    initialize: function(){
      this.render();
    },

    render: function(){
      var tmpl = _.template(_widget.Item);
      var data = this.model.toJSON();
      _.extend(data, {dateParse: this.dateParse});

      this.$el.html(tmpl(data));
      return this.$el;
    },

    dateParse: function(date){
      var _humanMonth = Array(
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декобря'
      );
      var _current    = new Date();
      var _date       = new Date(date);
      var _year       = '';
      var _month      = '';
      var _day        = '';

      if(_current.getFullYear() !== _date.getFullYear()){
        _year = ' '+_date.getFullYear();
      }

      if(_current.getMonth() !== _date.getMonth()){
        _month = ' '+_humanMonth[_date.getMonth()];
      }

      if(_current.getDate() - _date.getDate() > 1 || _month.length > 0 || _year.length > 0){
        _month = _month.length > 0 ? _month : ' '+_humanMonth[_date.getMonth()];
        _day = _date.getDate();
      }else if(_current.getDate() - _date.getDate() > 0){
        _day = 'Вчера';
      }else{
        _day = 'Сегодня';
      }

      return _day+_month+_year;
    }
  })

	return {
		List: List,
		Item: Item
	};
});