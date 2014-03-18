App = {
  Secure: {
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
    'login':  'login',
    'signup': 'signup',
    'forgot': 'forgot'
  },
  
  index: function(){

  },

  login: function(){
    App.Secure.Apps.Login.render();
  },

  signup: function(){
    App.Secure.Apps.Signup.render();
  },

  forgot: function(){
    App.Secure.Apps.Forgot.render();
  }
});

$(document).ready(function(){
  App.Secure.Apps.Login   = new App.Secure.View.Login.Form({obj: $('#center')});
  App.Secure.Apps.Signup  = new App.Secure.View.Signup.Form({obj: $('#center')});
  App.Secure.Apps.Forgot  = new App.Secure.View.Login.Forgot({obj: $('#center')});

  var route = new Route();
  Backbone.history.start();
});
