App = {
  Index: {
    Collection: {},
    Model: {},
    View: {},
    Templates: {},
    Apps: {}
  }
}

// Маршрутизатор
var Route = Backbone.Router.extend({
  routes: {
    '':       'index',
    'index':  'index',
  },
  
  index: function(){
    App.Index.Apps.Form.render();
  }
});

$(document).ready(function(){
  App.Index.Apps.Form = new App.Index.View.Index.Form({obj: $('body')});

  var route = new Route();
  Backbone.history.start();
});
