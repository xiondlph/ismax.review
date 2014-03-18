document.write(unescape("%3Cscript src='/js/lib/jquery-1.10.2.min.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='/js/lib/jquery-ui-1.10.3.custom.min.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='/js/lib/backbone/underscore.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='/js/lib/backbone/backbone.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='/js/common.js' type='text/javascript'%3E%3C/script%3E"));

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
      'index':  'index',
    },
    
    index: function(){
      App.Review.Apps.List.render();
      App.Review.Apps.Form.render();
    }
  });

  $(document).ready(function(){
    App.Review.Apps.List = new App.Review.View.Index.List({obj: $('#main')});
    App.Review.Apps.Form = new App.Review.View.Index.Form({obj: $('#main')});

    var route = new Route();
    Backbone.history.start();
  });
}
