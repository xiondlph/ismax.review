<# if (this.data.hasOwnProperty('reviews')){ #>
(function () {
    function createElement(name, attrs, style, inner) {
        var el = document.createElement(name);
        if (attrs) {
            for (key in attrs) {
                if (key == 'class') {
                    el.className = attrs[key];
                } else if (key == 'id') {
                    el.id = attrs[key];
                } else {
                    el.setAttribute(key, attrs[key]);
                }
            }
        }

        if (style) {
            for (key in style) {
                el.style[key] = style[key];
            }
        }

        if (inner) {
            el.innerHTML = inner;
        }

        return el;
    }

    var index,
        reviews         = [
<# for(index=0; index <= reviews.modelOpinions.opinion.length -1; index++) { #>
            '<div class="ismaxReviewItem">',
            '  <div class="ismaxReviewItemAuthor field"><#= reviews.modelOpinions.opinion[index].author ? reviews.modelOpinions.opinion[index].author : "Гость" #></div>',
            '  <div class="ismaxReviewItemDate field"><#= reviews.modelOpinions.opinion[index].date #></div>',
            '  <div class="ismaxReviewItemGrade field" grade="<#= reviews.modelOpinions.opinion[index].grade #>">',
            '    <ul>',
            '      <li grade="-2"></li>',
            '      <li grade="-1"></li>',
            '      <li grade="0"></li>',
            '      <li grade="1"></li>',
            '      <li grade="2"></li>', 
            '    </ul>', 
            '  </div>',
            '  <div class="ismaxReviewItemProLabel label">Достоинства:</div>',
            '  <div class="ismaxReviewItemPro field"><#= reviews.modelOpinions.opinion[index].pro #></div>',
            '  <div class="ismaxReviewItemContraLabel label">Недостатки:</div>',
            '  <div class="ismaxReviewItemContra field"><#= reviews.modelOpinions.opinion[index].contra #></div>',
            '  <div class="ismaxReviewItemTextLabel label">Комментарий:</div>',
            '  <div class="ismaxReviewItemText field"><#= reviews.modelOpinions.opinion[index].text #></div>',
            '</div>',
<# } #>
        ].join("\n"),
        modelId         = <#= modelId #>,
        text            = '<#= text #>',
        head            = document.getElementsByTagName('HEAD')[0],
        body            = document.getElementsByTagName('BODY')[0];

    ismaxReviewList = createElement('div', {class: 'ismaxReviewList'}, null);
    ismaxMoreBtn    = createElement('div', {class: 'ismaxMoreBtn'}, null, 'Предыдущие отзывы &darr;');
    ismaxLoader     = createElement('div', {class: 'ismaxLoader'}, null, '<img src="/images/loader.gif" />');

    body.appendChild(ismaxReviewList);
    body.appendChild(ismaxMoreBtn);
    body.appendChild(ismaxLoader);
}());
<# } else { #>
({})
<# } #>