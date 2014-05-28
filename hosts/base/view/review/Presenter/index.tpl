App.Review.View.Index = {
  List: Backbone.View.extend({
    tagName: 'div',
    className: 'ismaxReview',
    id: 'ismaxReview',
    events:{
    },
  
    initialize: function(){
      this.collection.bind('change', this.change, this);
      this.collection.bind('add', this.add, this);
      this.collection.bind('remove', this.remove, this);
      this.collection.bind('fetch', this.fetch, this);
      this.collection.bind('sync', this.sync, this);
    },

    add: function(model){
      var me = this;
      $('body,html').animate({"scrollTop":0},'slow',function(){
        me.renderReview(model);
      });
    },

    render: function(){
      var me = this;
      var tmpl = _.template(App.Review.Templates.Index.List);
      me.$el.html(tmpl);

      if(me.collection.length == 0){
        me.collection.fetch({success: function(collection, response, options){
          _.each(collection.models, function(item){
            me.renderReview(item);
          }, me);
        }, data: {page: 3}});      
      }else{
        _.each(me.collection.models, function(item){
          me.renderReview(item);
        }, me);
      }

      this.options.obj.html(this.$el);
      return this.$el;
    },
  
    renderReview: function(item){
      var reviewView = new App.Review.View.Index.Item({model: item});
      this.$el.find('.ismaxReviewList').prepend(reviewView.render().fadeIn());
    }
  }),

  Item: Backbone.View.extend({
    tagName: 'div',
    className: 'ismaxReviewItem',
    events:{
    },

    initialize: function(){
      this.render();
    },

    render: function(){
      var tmpl = _.template(App.Review.Templates.Index.Item);
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
  }),

  More: Backbone.View.extend({
    tagName: 'div',
    className: 'ismaxMore',
    id: 'ismaxMore',

    render: function(){
      var tmpl = _.template(App.Review.Templates.Index.More);
      this.$el.append(tmpl);

      this.options.obj.append(this.$el);
      return this.$el;
    }
  }),

	Form: Backbone.View.extend({
    tagName: 'div',
    className: 'ismaxForm',
    id: 'ismaxForm',
    events:{
    	'submit form':                    'submit',
      'click .ismaxFormBtn':            'send',
      'mouseenter .ismaxFormGrade li':  'setStar',
      'mouseleave .ismaxFormGrade li':  'usetStar',
      'click .ismaxFormGrade li':       'grade'
    },

    render: function(){
      var tmpl = _.template(App.Review.Templates.Index.Form);
      this.$el.append(tmpl);

      this.options.obj.append(this.$el);
      this.$el.fadeIn();
      return this.$el;
    },

    submit: function(e){      
      var me = this;

      if(me.$el.find('input[name="author"]').val().length === 0){
        me.notice('Представьтесь пожалуйста');
        return false;
      }

      if(me.$el.find('input[name="grade"]').val().length === 0){
        me.notice('Пожалуйста, оцените товар.<br />Отзывы без оценки не принимаются.');
        return false;
      }

      me.$el.find('.ismaxFormDisabel').fadeIn( 300 );
      $.ajax({
        url: 'http://e-ismax.ru/review/add/',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
          author: me.$el.find('input[name="author"]').val(),
          email:  me.$el.find('input[name="email"]').val(),
          grade:  me.$el.find('input[name="grade"]').val(),
          pro:    me.$el.find('input[name="pro"]').val(),
          contra: me.$el.find('input[name="contra"]').val(),
          text:   me.$el.find('textarea[name="text"]').val()
        }),
        success: function(data){
          me.collection.add(data.review);
        },
        complete: function(){
          me.$el.find('.ismaxFormDisabel').fadeOut( 300 );
        }
      });

      return false;
    },

    send: function(e){
      this.$el.find('form').submit();
    },

    setStar: function(e){
      $(e.currentTarget).parent().find('li').css({'background-position': '0px 0px'});
      $(e.currentTarget).parent().find('li:lt('+($(e.currentTarget).index()+1)+')').css({'background-position': '0px -30px'});
    },

    usetStar: function(e){
      $(e.currentTarget).parent().find('li:lt('+($(e.currentTarget).index()+1)+')').css({'background-position': '0px 0px'});
      $(e.currentTarget).parent().find('li:lt('+($(e.currentTarget).parent().find('li[grade="'+this.$el.find('input[name="grade"]').val()+'"]').index()+1)+')').css({'background-position': '0px -30px'});
    },

    grade: function(e){
      this.$el.find('input[name="grade"]').val($(e.currentTarget).attr('grade'));
    },

    notice: function(msg){
      this.$el.find('.ismaxFormNotice').html(msg);
      this.$el.find('.ismaxFormNotice').fadeIn(300).delay(5000).fadeOut(400);
    }
	})
}