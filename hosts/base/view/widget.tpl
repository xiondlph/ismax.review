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

    var reviews = <#= JSON.stringify(reviews) #>,
        head            = document.getElementsByTagName('HEAD')[0],
        body            = document.getElementsByTagName('BODY')[0],
        style           = createElement('style', null, null, '.ismaxReviewList {color: red}');;
        ismaxReviewList = createElement('div', {class: 'ismaxReviewList'}, null, 'test');;

    head.appendChild(style);
    body.appendChild(ismaxReviewList);
}());
<# } else { #>
({})
<# } #>