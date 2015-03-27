/**
 * Модуль шаблонов стр. отзывов
 *
 * @module      Templates.Widget
 * @category    Client side
 * @main        Yandex.Market API
 * @author      Ismax <admin@ismax.ru>
 */


define(function(){


  var List = [
    '<div class="ismaxReviewList">',
    '</div>',
    '<div class="ismaxMoreBtn">Предыдущие отзывы &darr;</div>',
    '<div class="ismaxLoader"><img src="/images/loader.gif" /></div>'
  ].join("\n");

  var Item = [
    '<% for(var i=0; i <= reviews.length -1; i++){ %>',
    '<div class="ismaxReviewItem">',
    '  <div class="ismaxReviewItemAuthor field"><% reviews[i].author.length > 0 ? print(reviews[i].author) : print("Гость") %></div>',
    '  <div class="ismaxReviewItemDate field"><%= dateParse(reviews[i].date) %></div>',
    '  <div class="ismaxReviewItemGrade field" grade="<%= reviews[i].grade %>">',
    '    <ul>',
    '      <li grade="-2"></li>',
    '      <li grade="-1"></li>',
    '      <li grade="0"></li>',
    '      <li grade="1"></li>',
    '      <li grade="2"></li>', 
    '    </ul>', 
    '  </div>',
    '  <div class="ismaxReviewItemProLabel label">Достоинства:</div>',
    '  <div class="ismaxReviewItemPro field"><%= reviews[i].pro %></div>',
    '  <div class="ismaxReviewItemContraLabel label">Недостатки:</div>',
    '  <div class="ismaxReviewItemContra field"><%= reviews[i].contra %></div>',
    '  <div class="ismaxReviewItemTextLabel label">Комментарий:</div>',
    '  <div class="ismaxReviewItemText field"><%= reviews[i].text %></div>',
    '</div>',
    '<% } %>'
  ].join("\n");


  /**
   * Шаблоноы стр. отзывов
   *
   * @class       Widget
   * @namespace   Templates
   * @static
   */
  return {
    List: List,
    Item: Item
	};
});