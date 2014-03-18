App.Review.View.Index = {
  List: Backbone.View.extend({
    tagName: 'div',
    className: 'ismaxReview',
    id: 'ismaxReview',
    events:{
    },
  
    initialize: function(){
      this.collection = new App.Review.Collection.Review();
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
        }});      
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
      this.$el.find('.ismaxReviewList').append(reviewView.render());
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
      this.$el.html(tmpl(this.model.toJSON()));
      return this.$el;
    }
  }),

	Form: Backbone.View.extend({
    tagName: 'div',
    className: 'ismaxForm',
    id: 'ismaxForm',
    events:{
    	'submit form': 'submit'
    },

    render: function(){
      var tmpl = _.template(App.Review.Templates.Index.Form);
      this.$el.append(tmpl);

      this.options.obj.append(this.$el);
      return this.$el;
    },

    submit: function(e){      
    	var me = this;
      $.ajax({
        url: 'http://e-ismax.ru/review/add/',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
          name:   me.$el.find('input[name="name"]').val(),
          email:  me.$el.find('input[name="email"]').val(),
          text:   me.$el.find('textarea[name="text"]').val()
        }),
        success: function(){
          alert('done');
        },
        complete: function(){
          //
        }
      });
      return false;
    },
	})
}