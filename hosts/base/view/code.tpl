<# if (this.data.hasOwnProperty('user')) { #>
window.ismaxWidget = {};
(function (window) {
    var text,
        code,
        frame;

<#     if (user.hasOwnProperty('script')) { #>
    <#= user.script #>
<#     } #>
<#     if (user.hasOwnProperty('eval')) { #>
    <#= user.eval #>
<#     } #>

    function addEvent(elem, event, fn) {
        // avoid memory overhead of new anonymous functions for every event handler that's installed
        // by using local functions
        function listenHandler(e) {
            var ret = fn.apply(this, arguments);
            if (ret === false) {
                e.stopPropagation();
                e.preventDefault();
            }
            return ret;
        }

        function attachHandler() {
            // set the this pointer same as addEventListener when fn is called
            // and make sure the event is passed to the fn also so that works the same too
            var ret = fn.call(elem, window.event);   
            if (ret === false) {
                window.event.returnValue = false;
                window.event.cancelBubble = true;
            }
            return ret;
        }

        if (elem.addEventListener) {
            elem.addEventListener(event, listenHandler, false);
        } else {
            elem.attachEvent("on" + event, attachHandler);
        }
    }

    addEvent(window, 'message', function (event) {
        switch (event.data.action) {
        case 'ismaxSetHeight':
            document.getElementById('ismaxFrame').setAttribute('height', event.data.height);
            break;
        }
    });
<#     if (this.data.hasOwnProperty('text') && text ) { #>
    text = '<#= text #>';
<#     } else { #>
    text = window.ismaxWidget.text || '';
<#     } #>

    code                = document.getElementById('ismaxCode');

    loader              = document.createElement('div');
    loader.id           = 'ismaxLoader';

    loader.style.height     = '30px';
    loader.style.lineHeight = '30px';
    loader.style.margin     = '0px auto';
    loader.style.textAlign  = 'center';

    loader.innerHTML    = '<img src="<#= proto #>://www.<#= process.env.HOST || 'shareview' #>.ru/images/loader.gif" />';

    frame               = document.createElement('iframe');
    frame.src           = '<#= proto #>://www.<#= process.env.HOST || 'shareview' #>.ru/iframe?text=' + text;
    frame.scrolling     = 'no';
    frame.frameBorder   = 'no';
    frame.width         = '100%';
    frame.height        = '0';
    frame.id            = 'ismaxFrame';

    frame.onload        = function () {
        loader.parentNode.removeChild(loader);
    }


    code.parentNode.insertBefore(loader, code);

    window.onload = function () {
        code.parentNode.insertBefore(frame, code);
    }
}(window));
<# } else { #>
({})
<# } #>
