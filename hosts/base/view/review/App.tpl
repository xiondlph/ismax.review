document.write(unescape("%3Clink rel='stylesheet' type='text/css' href='http://e-ismax.ru/css/smoothness/jquery-ui.min.css' %3E"));
document.write(unescape("%3Clink rel='stylesheet' type='text/css' href='http://e-ismax.ru/css/review.css' %3E"));
document.write(unescape("%3Cscript src='http://e-ismax.ru/js/lib/jquery-1.10.2.min.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='http://e-ismax.ru/js/lib/jquery-ui-1.10.3.custom.min.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='http://e-ismax.ru/js/lib/backbone/underscore.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='http://e-ismax.ru/js/lib/backbone/backbone.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cdiv id='ismax'%3E%3C/div%3E"));

window.onload = function(){
  App = {
    Review: {
      Collection: {},
      Model: {},
      View: {},
      Templates: {},
      Apps: {}
    }
  }

  <#@ /Model/review #>
  <#@ /Collection/review #>
  <#@ /Tpl/index #>
  <#@ /Presenter/index #>

  // Маршрутизатор
  var Route = Backbone.Router.extend({
    routes: {
      '':       'index',
      'index':  'index'
    },
    
    index: function(){
      App.Review.Apps.List.render();
      App.Review.Apps.Form.render();
    }
  });

  $(function(){
    var collection = new App.Review.Collection.Review();

    App.Review.Apps.List = new App.Review.View.Index.List({collection: collection, obj: $('#ismax')});
    App.Review.Apps.Form = new App.Review.View.Index.Form({collection: collection, obj: $('#ismax')});

    var route = new Route();
    Backbone.history.start();
  });  
}


