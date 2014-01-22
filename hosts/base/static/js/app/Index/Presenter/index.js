App.Index.View.Index = {
  Form: Backbone.View.extend({
    tagName: 'div',
    id: 'form',
    events:{
    	'submit form': 'submit'
    },

    render: function(){
      var tmpl = _.template(App.Index.Templates.Index.Form);
      this.$el.append(tmpl);

      this.options.obj.append(this.$el);
      return this.$el;
    },

    submit: function(e){
    	var text = this.$el.find('textarea[name="text"]').val();
      $.ajax({
        url: '/review',
        type: 'POST',
        dataType: 'json',
        // data: JSON.stringify({
        //   text: text,
        //   shu: 'shurik1'
        // }),
        data: {
          text: text,
          shu: 'shurik'
        },
        success: function(){
          alert('ok');
        },
        complete: function(){
        	console.log('ok');
        }
      }); 
    	return false;
    }
  })
}