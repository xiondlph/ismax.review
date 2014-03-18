App.Review.Templates.Index = {
	List: [
    '<div class="ismaxReviewList">',
    '</div>'
  ].join("\n"),

  Item: [
    '<%= name %>',
    '<p><%= text %></p>'
  ].join("\n"),

  Form: [
    '<form action="#">',
    '  <input type="text" name="name" placeholder="Имя"/>',
    '  <input type="text" name="email" placeholder="Email"/>',
    '	 <textarea name="text" placeholder="Ваш отзыв..."></textarea>',
    '	 <input type="submit" value="Отправить"/>',
    '</form>',
  ].join("\n"),
}