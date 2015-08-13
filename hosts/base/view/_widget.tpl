<# if (this.data.hasOwnProperty('reviews')){ #>
(function () {

    var Event = (function() {

        var guid = 0
            
        function fixEvent(event) {
        event = event || window.event
        
            if ( event.isFixed ) {
                return event
            }
            event.isFixed = true 
        
            event.preventDefault = event.preventDefault || function(){this.returnValue = false}
            event.stopPropagation = event.stopPropagaton || function(){this.cancelBubble = true}
            
            if (!event.target) {
                    event.target = event.srcElement
            }
        
            if (!event.relatedTarget && event.fromElement) {
                    event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
            }
        
            if ( event.pageX == null && event.clientX != null ) {
                    var html = document.documentElement, body = document.body;
                    event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
                    event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
            }
        
            if ( !event.which && event.button ) {
                    event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
            }
        
        return event
        }  
        
        /* Вызывается в контексте элемента всегда this = element */
        function commonHandle(event) {
            event = fixEvent(event)
            
            var handlers = this.events[event.type]

        for ( var g in handlers ) {
                var handler = handlers[g]

                var ret = handler.call(this, event)
                if ( ret === false ) {
                        event.preventDefault()
                        event.stopPropagation()
                }
            }
        }
        
        return {
            add: function(elem, type, handler) {
                if (elem.setInterval && ( elem != window && !elem.frameElement ) ) {
                    elem = window;
                }
                
                if (!handler.guid) {
                    handler.guid = ++guid
                }
                
                if (!elem.events) {
                    elem.events = {}
            elem.handle = function(event) {
                if (typeof Event !== "undefined") {
                return commonHandle.call(elem, event)
                }
                    }
                }
            
                if (!elem.events[type]) {
                    elem.events[type] = {}        
                
                    if (elem.addEventListener)
                elem.addEventListener(type, elem.handle, false)
            else if (elem.attachEvent)
                        elem.attachEvent("on" + type, elem.handle)
                }
                
                elem.events[type][handler.guid] = handler
            },
            
            remove: function(elem, type, handler) {
                var handlers = elem.events && elem.events[type]
                
                if (!handlers) return
                
                delete handlers[handler.guid]
                
                for(var any in handlers) return 
                if (elem.removeEventListener)
                elem.removeEventListener(type, elem.handle, false)
                else if (elem.detachEvent)
                elem.detachEvent("on" + type, elem.handle)
                
                delete elem.events[type]
            
                
                for (var any in elem.events) return
                try {
                    delete elem.handle
                    delete elem.events 
                } catch(e) { // IE
                    elem.removeAttribute("handle")
                    elem.removeAttribute("events")
                }
            }
        }
    }());


    function dateParse(date){
      var _humanMonth = Array(
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декобря'
      );
      var _current    = new Date();
      var _date       = new Date(date);
      var _year       = '';
      var _month      = '';
      var _day        = '';

      if(_current.getFullYear() !== _date.getFullYear()){
        _year = ' '+_date.getFullYear();
      }

      if(_current.getMonth() !== _date.getMonth()){
        _month = ' '+_humanMonth[_date.getMonth()];
      }

      if(_current.getDate() - _date.getDate() > 1 || _month.length > 0 || _year.length > 0){
        _month = _month.length > 0 ? _month : ' '+_humanMonth[_date.getMonth()];
        _day = _date.getDate();
      }else if(_current.getDate() - _date.getDate() > 0){
        _day = 'Вчера';
      }else{
        _day = 'Сегодня';
      }

      return _day+_month+_year;
    }

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

    function createItem(opinion) {
        var ismaxReviewItem,
            ismaxReviewItemAuthor,
            ismaxReviewItemDate,
            ismaxReviewItemGrade,
            ismaxReviewItemProLabel,
            ismaxReviewItemPro,
            ismaxReviewItemContraLabel,
            ismaxReviewItemContra,
            ismaxReviewItemTextLabel,
            ismaxReviewItemText;

        ismaxReviewItem                 = createElement('div', {class: 'ismaxReviewItem'}, null);
        ismaxReviewItemAuthor           = createElement('div', {class: 'ismaxReviewItemAuthor ismaxReviewItemField'}, null, opinion.author ? opinion.author : 'Гость');
        ismaxReviewItemDate             = createElement('div', {class: 'ismaxReviewItemDate ismaxReviewItemField'}, null, dateParse(opinion.date));
        ismaxReviewItemGrade            = createElement('div', {class: 'ismaxReviewItemGrade ismaxReviewItemField', grade: opinion.grade}, null, [
            '    <ul>',
            '      <li grade="-2"></li>',
            '      <li grade="-1"></li>',
            '      <li grade="0"></li>',
            '      <li grade="1"></li>',
            '      <li grade="2"></li>', 
            '    </ul>'
        ].join('\n'));
        ismaxReviewItemProLabel         = createElement('div', {class: 'ismaxReviewItemProLabel ismaxReviewItemLabel'}, null, 'Достоинства:');
        ismaxReviewItemPro              = createElement('div', {class: 'ismaxReviewItemPro ismaxReviewItemField'}, null, opinion.pro);
        ismaxReviewItemContraLabel      = createElement('div', {class: 'ismaxReviewItemContraLabel ismaxReviewItemLabel'}, null, 'Недостатки:');
        ismaxReviewItemContra           = createElement('div', {class: 'ismaxReviewItemContra ismaxReviewItemField'}, null, opinion.contra);
        ismaxReviewItemTextLabel        = createElement('div', {class: 'ismaxReviewItemTextLabel ismaxReviewItemLabel'}, null, 'Комментарий:');
        ismaxReviewItemText             = createElement('div', {class: 'ismaxReviewItemText ismaxReviewItemField'}, null, opinion.text);


        ismaxReviewItem.appendChild(ismaxReviewItemAuthor);
        ismaxReviewItem.appendChild(ismaxReviewItemDate);
        ismaxReviewItem.appendChild(ismaxReviewItemGrade);
        ismaxReviewItem.appendChild(ismaxReviewItemProLabel);
        ismaxReviewItem.appendChild(ismaxReviewItemPro);
        ismaxReviewItem.appendChild(ismaxReviewItemContraLabel);
        ismaxReviewItem.appendChild(ismaxReviewItemContra);
        ismaxReviewItem.appendChild(ismaxReviewItemTextLabel);
        ismaxReviewItem.appendChild(ismaxReviewItemText);

        setTimeout(function () {
            ismaxReviewItem.style.opacity = 1;
        }, 100);

        return ismaxReviewItem;
    }

    var index,
        reviews         = <#= JSON.stringify(reviews) #>,
        modelId         = <#= modelId #>,
        text            = '<#= text #>',
        opinions        = reviews.modelOpinions.opinion
        head            = document.getElementsByTagName('HEAD')[0],
        body            = document.getElementsByTagName('BODY')[0],

        style           = createElement('style', null, null, [
            '.ismaxReviewItem {',
            '    -webkit-transition: opacity .3s ease;',
            '    -moz-transition: opacity .3s ease;',
            '    -o-transition: opacity .3s ease;',
            '    transition: opacity .3s ease;',
            '    margin: 10px 0 0 0;',
            '    opacity: 0;',
            '}',
            '.ismaxReviewItemLabel {',
            '    font-weight: bold;',
            '    padding: 10px 10px 0% 10px;',
            '}',
            '.ismaxReviewItemField {',
            '    -webkit-box-sizing: border-box;',
            '    -moz-box-sizing: border-box;',
            '    box-sizing: border-box;',
            '    padding: 0% 10px 10px 10px;',
            '}',
            '.ismaxReviewItemAuthor {',
            '    background-color: #f6f5f3;',
            '    padding: 10px 10px 10px 10px;',
            '    white-space: nowrap;',
            '    float: left;',
            '    width: 50%;',
            '}',
            '.ismaxReviewItemDate {',
            '    background-color: #f6f5f3;',
            '    padding: 10px 10px 10px 10px;',
            '    text-align: right;',
            '    float: right;',
            '    width: 50%;',
            '}',
            '.ismaxReviewItemGrade {',
            '    padding: 10px 10px 0% 10px;',
            '    clear: both;',
            '}',
            '.ismaxReviewItemGrade ul {',
            '    list-style: none;',
            '    padding: 0;',
            '    margin: 0;',
            '}',
            '.ismaxReviewItemGrade ul li {',
            '    background-image: url(../images/stars.png);',
            '    background-position: -49px 0px;',
            '    background-repeat: no-repeat;',
            '    display: inline-block;',
            '    height: 15px;',
            '    width: 15px;',
            '}',
            '.ismaxReviewItemGrade[grade="-2"] ul li[grade="-2"] {',
            '    background-position: -49px -15px;',
            '}',
            '.ismaxReviewItemGrade[grade="-1"] ul li[grade="-2"],',
            '.ismaxReviewItemGrade[grade="-1"] ul li[grade="-1"] {',
            '    background-position: -49px -15px;',
            '}',
            '.ismaxReviewItemGrade[grade="0"] ul li[grade="-2"],',
            '.ismaxReviewItemGrade[grade="0"] ul li[grade="-1"],',
            '.ismaxReviewItemGrade[grade="0"] ul li[grade="0"] {',
            '    background-position: -49px -15px;',
            '}',
            '.ismaxReviewItemGrade[grade="1"] ul li[grade="-2"],',
            '.ismaxReviewItemGrade[grade="1"] ul li[grade="-1"],',
            '.ismaxReviewItemGrade[grade="1"] ul li[grade="0"],',
            '.ismaxReviewItemGrade[grade="1"] ul li[grade="1"] {',
            '    background-position: -49px -15px;',
            '}',
            '.ismaxReviewItemGrade[grade="2"] ul li[grade="-2"],',
            '.ismaxReviewItemGrade[grade="2"] ul li[grade="-1"],',
            '.ismaxReviewItemGrade[grade="2"] ul li[grade="0"],',
            '.ismaxReviewItemGrade[grade="2"] ul li[grade="1"],',
            '.ismaxReviewItemGrade[grade="2"] ul li[grade="2"] {',
            '    background-position: -49px -15px;',
            '}',
            '.ismaxMoreBtn {',
            '    text-align: center;',
            '    line-height: 30px;',
            '    cursor: pointer;',
            '    margin: 0 auto;',
            '    height: 30px;',
            '    color: #ccc;',
            '}',
            '.ismaxLoader {',
            '    text-align: center;',
            '    line-height: 30px;',
            '    cursor: pointer;',
            '    display: none;',
            '    margin: 0 auto;',
            '    height: 30px;',
            '    color: #ccc;',
            '}'
        ].join('\n'));

        ismaxReviewList = createElement('div', {class: 'ismaxReviewList'}, null);
        ismaxMoreBtn    = createElement('div', {class: 'ismaxMoreBtn'}, null, 'Предыдущие отзывы &darr;');
        ismaxLoader     = createElement('div', {class: 'ismaxLoader'}, null, '<img src="/images/loader.gif" />');

    Event.add(ismaxMoreBtn, 'click', function () {
        // var more = createElement('script', null, null, 'console.log("test")');
        // body.insertBefore(more, ismaxMoreBtn);
        console.log(reviews);
    })

    head.appendChild(style);
    body.appendChild(ismaxReviewList);
    body.appendChild(ismaxMoreBtn);
    body.appendChild(ismaxLoader);
    
    for (index = 0; index < opinions.length; index++) {
        ismaxReviewList.appendChild(createItem(opinions[index]))
    };
}());
<# } else { #>
({})
<# } #>