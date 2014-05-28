App.Review.Templates.Index = {
  List: [
    '<div class="ismaxReviewList">',
    '</div>'
  ].join("\n"),

  Item: [
    '<div class="ismaxReviewItemAuthor field"><%= author %></div>',
    '<div class="ismaxReviewItemDate field"><%= dateParse(date) %></div>',
    '<div class="ismaxReviewItemGrade field" grade="<%= grade %>">',
    '  <ul>',
    '    <li grade="-2"></li>',
    '    <li grade="-1"></li>',
    '    <li grade="0"></li>',
    '    <li grade="1"></li>',
    '    <li grade="2"></li>', 
    '  </ul>', 
    '</div>',
    '<div class="ismaxReviewItemProLabel label">Достоинства:</div>',
    '<div class="ismaxReviewItemPro field"><%= pro %></div>',
    '<div class="ismaxReviewItemContraLabel label">Недостатки:</div>',
    '<div class="ismaxReviewItemContra field"><%= contra %></div>',
    '<div class="ismaxReviewItemTextLabel label">Комментарий:</div>',
    '<div class="ismaxReviewItemText field"><%= text %></div>'
  ].join("\n"),

  More: [
    '<a class="ismaxMoreBtn">еще отзывы...</a>'
  ].join("\n"),

  Form: [
    '<form action="#">',
    '  <input type="hidden" name="grade"/>',
    '  <div class="ismaxFormAuthor field"><input type="text" id="ismaxFormAuthor" name="author" placeholder="Имя"/></div>',
    '  <div class="ismaxFormEmail field"><input type="text" id="ismaxFormEmail" name="email" placeholder="Email"/></div>',
    '  <div class="ismaxFormPro field"><input type="text" id="ismaxFormPro" name="pro" placeholder="Достоинства"/></div>',
    '  <div class="ismaxFormContra field"><input type="text" id="ismaxFormContra" name="contra" placeholder="Недостатки"/></div>',
    '  <ul class="ismaxFormGrade">',
    '    <li grade="-2"></li>',
    '    <li grade="-1"></li>',
    '    <li grade="0"></li>',
    '    <li grade="1"></li>',
    '    <li grade="2"></li>',
    '  </ul>',
    '  <div class="ismaxFormText field"><textarea name="text" id="ismaxFormText" placeholder="Ваш отзыв"></textarea></div>',
    '  <a class="ismaxFormBtn"><span>Отправить</span></a>',
    '</form>',
    '<div class="ismaxFormNotice">Пожалуйста, оцените товар. Отзывы без оценки не принимаются.</div>',
    '<div class="ismaxFormDisabel"></div>'
  ].join("\n")
}