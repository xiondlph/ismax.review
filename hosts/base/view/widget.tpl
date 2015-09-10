<# if (this.data.hasOwnProperty('reviews')) { #>
<#     if (isFirst) { #>
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

function removeClass(obj, cls) {
    var classes = obj.className.split(' ');

    for (i = 0; i < classes.length; i++) {
        if (classes[i] == cls) {
            classes.splice(i, 1); // удалить класс  
            i--;
        }
    }
    obj.className = classes.join(' ');
}

(function () {
    var modelId         = <#= modelId #>,
        text            = '<#= text #>',
        head            = document.getElementsByTagName('HEAD')[0],
        body            = document.getElementsByTagName('BODY')[0];

    head.appendChild(createElement('style', null, null, [
        'html{',
        '    padding: 0;',
        '    margin: 0;',
        '}',
        '',
        'body{',
        '    margin: 8px;',
        '    padding: 0;',
        '}',
        '._<#= ('shareviewReviewItem' + text).fnv32a() #> {',
        '    -webkit-transition: opacity .3s ease;',
        '    -moz-transition: opacity .3s ease;',
        '    -o-transition: opacity .3s ease;',
        '    transition: opacity .3s ease;',
        '    margin: 10px 0 0 0;',
        '    opacity: 1;',
        '}',
        '._<#= ('shareviewReviewItemAnimate' + text).fnv32a() #> {',
        '    opacity: 0;',
        '}',
        '._<#= ('shareviewReviewItemLabel' + text).fnv32a() #> {',
        '    font-weight: bold;',
        '    padding: 10px 10px 0% 10px;',
        '}',
        '._<#= ('shareviewReviewItemField' + text).fnv32a() #> {',
        '    -webkit-box-sizing: border-box;',
        '    -moz-box-sizing: border-box;',
        '    box-sizing: border-box;',
        '    padding: 0% 10px 10px 10px;',
        '}',
        '._<#= ('shareviewReviewItemAuthor' + text).fnv32a() #> {',
        '    background-color: #f6f5f3;',
        '    padding: 10px 10px 10px 10px;',
        '    white-space: nowrap;',
        '    float: left;',
        '    width: 50%;',
        '}',
        '._<#= ('shareviewReviewItemDate' + text).fnv32a() #> {',
        '    background-color: #f6f5f3;',
        '    padding: 10px 10px 10px 10px;',
        '    text-align: right;',
        '    float: right;',
        '    width: 50%;',
        '}',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #> {',
        '    padding: 10px 10px 0% 10px;',
        '    clear: both;',
        '}',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #> ul {',
        '    list-style: none;',
        '    padding: 0;',
        '    margin: 0;',
        '}',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #> ul li {',
        '    background-image: url(../images/stars.png);',
        '    background-position: -49px 0px;',
        '    background-repeat: no-repeat;',
        '    display: inline-block;',
        '    height: 15px;',
        '    width: 15px;',
        '}',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="-2"] ul li[_<#= ('grade' + text).fnv32a() #>="-2"] {',
        '    background-position: -49px -15px;',
        '}',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="-1"] ul li[_<#= ('grade' + text).fnv32a() #>="-2"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="-1"] ul li[_<#= ('grade' + text).fnv32a() #>="-1"] {',
        '    background-position: -49px -15px;',
        '}',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="0"] ul li[_<#= ('grade' + text).fnv32a() #>="-2"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="0"] ul li[_<#= ('grade' + text).fnv32a() #>="-1"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="0"] ul li[_<#= ('grade' + text).fnv32a() #>="0"] {',
        '    background-position: -49px -15px;',
        '}',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="1"] ul li[_<#= ('grade' + text).fnv32a() #>="-2"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="1"] ul li[_<#= ('grade' + text).fnv32a() #>="-1"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="1"] ul li[_<#= ('grade' + text).fnv32a() #>="0"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="1"] ul li[_<#= ('grade' + text).fnv32a() #>="1"] {',
        '    background-position: -49px -15px;',
        '}',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="2"] ul li[_<#= ('grade' + text).fnv32a() #>="-2"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="2"] ul li[_<#= ('grade' + text).fnv32a() #>="-1"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="2"] ul li[_<#= ('grade' + text).fnv32a() #>="0"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="2"] ul li[_<#= ('grade' + text).fnv32a() #>="1"],',
        '._<#= ('shareviewReviewItemGrade' + text).fnv32a() #>[_<#= ('grade' + text).fnv32a() #>="2"] ul li[_<#= ('grade' + text).fnv32a() #>="2"] {',
        '    background-position: -49px -15px;',
        '}',
        '._<#= ('shareviewMoreBtn' + text).fnv32a() #> {',
        '    text-align: center;',
        '    line-height: 30px;',
        '    cursor: pointer;',
        '    margin: 0 auto;',
        '    height: 30px;',
        '    color: #ccc;',
        '}',
        '._<#= ('shareviewLoader' + text).fnv32a() #> {',
        '    text-align: center;',
        '    line-height: 30px;',
        '    cursor: pointer;',
        '    display: none;',
        '    margin: 0 auto;',
        '    height: 30px;',
        '    color: #ccc;',
        '}'
    ].join('\n')));
    body.appendChild(createElement('div', {class: '_<#= ('shareviewReviewList' + text).fnv32a() #>', id: '_<#= ('shareviewReviewList' + text).fnv32a() #>'}));
    body.appendChild(createElement('div', {class: '_<#= ('shareviewMoreBtn' + text).fnv32a() #>', id: <#= ('shareviewMoreBtn' + text).fnv32a() #>}, null, 'Предыдущие отзывы &darr;'));
    body.appendChild(createElement('div', {class: '_<#= ('shareviewLoader' + text).fnv32a() #>', id: <#= ('shareviewLoader' + text).fnv32a() #>}, null, '<img src="/images/loader.gif" />'));

    Event.add(document.getElementById(<#= ('shareviewMoreBtn' + text).fnv32a() #>), 'click', function () {
        var page = document.getElementsByClassName('_<#= ('shareviewReviewItem' + text).fnv32a() #>').length / 10 + 1;
        document.getElementById('<#= ('shareviewMoreBtn' + text).fnv32a() #>').style.display = 'none';
        document.getElementById('<#= ('shareviewLoader' + text).fnv32a() #>').style.display = 'block';
        body.insertBefore(createElement('script', {src: '/widget?text=<#= text #>&page=' + page}), this);
    });

}());
<#     } #>

(function () {

<# for(var index=0; index <= reviews.modelOpinions.opinion.length -1; index++) { #>
    _<#= ('shareviewReviewList' + text).fnv32a() #>.appendChild(createElement('div', {class: '_<#= ('shareviewReviewItem' + text).fnv32a() #> _<#= ('shareviewReviewItemAnimate' + text).fnv32a() #>'}, null));
    _<#= ('shareviewReviewList' + text).fnv32a() #>.lastChild.appendChild( createElement('div', {class: '_<#= ('shareviewReviewItemAuthor' + text).fnv32a() #> _<#= ('shareviewReviewItemField' + text).fnv32a() #>'}, null, '<#= reviews.modelOpinions.opinion[index].author ? reviews.modelOpinions.opinion[index].author : "Гость" #>') );
    _<#= ('shareviewReviewList' + text).fnv32a() #>.lastChild.appendChild( createElement('div', {class: '_<#= ('shareviewReviewItemDate' + text).fnv32a() #> _<#= ('shareviewReviewItemField' + text).fnv32a() #>'}, null, '<#= new Date(reviews.modelOpinions.opinion[index].date).dateParse() #>') );
    _<#= ('shareviewReviewList' + text).fnv32a() #>.lastChild.appendChild( createElement('div', {class: '_<#= ('shareviewReviewItemGrade' + text).fnv32a() #> _<#= ('shareviewReviewItemField' + text).fnv32a() #>', _<#= ('grade' + text).fnv32a() #>: <#= reviews.modelOpinions.opinion[index].grade #>}, null, [
        '    <ul>',
        '      <li _<#= ('grade' + text).fnv32a() #>="-2"></li>',
        '      <li _<#= ('grade' + text).fnv32a() #>="-1"></li>',
        '      <li _<#= ('grade' + text).fnv32a() #>="0"></li>',
        '      <li _<#= ('grade' + text).fnv32a() #>="1"></li>',
        '      <li _<#= ('grade' + text).fnv32a() #>="2"></li>', 
        '    </ul>'
    ].join('\n')) );
<#     if (reviews.modelOpinions.opinion[index].hasOwnProperty('pro')) { #>
    _<#= ('shareviewReviewList' + text).fnv32a() #>.lastChild.appendChild( createElement('div', {class: '_<#= ('shareviewReviewItemProLabel' + text).fnv32a() #> _<#= ('shareviewReviewItemLabel' + text).fnv32a() #>'}, null, "Достоинства:") );
    _<#= ('shareviewReviewList' + text).fnv32a() #>.lastChild.appendChild( createElement('div', {class: '_<#= ('shareviewReviewItemPro' + text).fnv32a() #> _<#= ('shareviewReviewItemField' + text).fnv32a() #>'}, null, <#= JSON.stringify(reviews.modelOpinions.opinion[index].pro) #>) );
<#     }  #>
<#     if (reviews.modelOpinions.opinion[index].hasOwnProperty('contra')) { #>
    _<#= ('shareviewReviewList' + text).fnv32a() #>.lastChild.appendChild( createElement('div', {class: '_<#= ('shareviewReviewItemContraLabel' + text).fnv32a() #> _<#= ('shareviewReviewItemLabel' + text).fnv32a() #>'}, null, "Недостатки:") );
    _<#= ('shareviewReviewList' + text).fnv32a() #>.lastChild.appendChild( createElement('div', {class: '_<#= ('shareviewReviewItemContra' + text).fnv32a() #> _<#= ('shareviewReviewItemField' + text).fnv32a() #>'}, null, <#= JSON.stringify(reviews.modelOpinions.opinion[index].contra) #>) );
<#     }  #>
<#     if (reviews.modelOpinions.opinion[index].hasOwnProperty('text')) { #>
    _<#= ('shareviewReviewList' + text).fnv32a() #>.lastChild.appendChild( createElement('div', {class: '_<#= ('shareviewReviewItemTextLabel' + text).fnv32a() #> _<#= ('shareviewReviewItemLabel' + text).fnv32a() #>'}, null, "Комментарий:") );
    _<#= ('shareviewReviewList' + text).fnv32a() #>.lastChild.appendChild( createElement('div', {class: '_<#= ('shareviewReviewItemText' + text).fnv32a() #> _<#= ('shareviewReviewItemField' + text).fnv32a() #>'}, null, <#= JSON.stringify(reviews.modelOpinions.opinion[index].text) #>) );
<#     }  #>
<# }  #>
    setTimeout(function () {
        var items = document.getElementsByClassName('_<#= ('shareviewReviewItemAnimate' + text).fnv32a() #>');

        while(items.length > 0) {
           removeClass(items[0], '_<#= ('shareviewReviewItemAnimate' + text).fnv32a() #>'); 
        }

        top.postMessage({action: 'shareviewSetHeight', height: document.body.clientHeight + 10}, '*');
    }, 10);
    if (document.getElementsByClassName('_<#= ('shareviewReviewItem' + text).fnv32a() #>').length < <#= reviews.modelOpinions.total #>) {
        document.getElementById('<#= ('shareviewMoreBtn' + text).fnv32a() #>').style.display = 'block';
        document.getElementById('<#= ('shareviewLoader' + text).fnv32a() #>').style.display = 'none';
    } else {
        document.getElementById('<#= ('shareviewMoreBtn' + text).fnv32a() #>').style.display = 'none';
        document.getElementById('<#= ('shareviewLoader' + text).fnv32a() #>').style.display = 'none';
    }
}());
<# } else { #>
({})
<# } #>