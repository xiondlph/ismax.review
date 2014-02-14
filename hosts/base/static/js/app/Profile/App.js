App = {
  Profile: {
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

  }
});

$(document).ready(function(){

  var route = new Route();
  Backbone.history.start();
});
