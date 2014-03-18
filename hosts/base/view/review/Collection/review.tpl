App.Review.Collection.Review = Backbone.Collection.extend({
  model: App.Review.Model.Review,
  url: 'http://e-ismax.ru/review/list/',
  parse: function(data, options){
    return data.reviews;
  }
});