<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="/css/review.css"/>
	<script type="text/javascript" src="/js/lib/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="/js/lib/backbone/underscore.js"></script>
	<script type="text/javascript" src="/js/lib/backbone/backbone.js"></script>
	<script type="text/javascript">
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
	      App.Review.Apps.More.render();
	      App.Review.Apps.Form.render();
	    }
	  });

	  $(function(){
	    var collection = new App.Review.Collection.Review();

	    App.Review.Apps.List = new App.Review.View.Index.List({collection: collection, obj: $('#ismax')});
	    App.Review.Apps.More = new App.Review.View.Index.More({collection: collection, obj: $('#ismax')});
	    App.Review.Apps.Form = new App.Review.View.Index.Form({collection: collection, obj: $('#ismax')});

	    var route = new Route();
	    Backbone.history.start();
	  });
	</script>
	<title>ISMAX Widget</title>
</head>
<body id="ismax">
<h1>ISMAX Widget</h1>
</body>
</html>