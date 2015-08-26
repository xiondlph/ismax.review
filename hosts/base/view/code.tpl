<# if (this.data.hasOwnProperty('user')) { #>
(function () {
    var text;

    function addEvent(elem, event, fn) {
        // avoid memory overhead of new anonymous functions for every event handler that's installed
        // by using local functions
        function listenHandler(e) {
            var ret = fn.apply(this, arguments);
            if (ret === false) {
                e.stopPropagation();
                e.preventDefault();
            }
            return(ret);
        }

        function attachHandler() {
            // set the this pointer same as addEventListener when fn is called
            // and make sure the event is passed to the fn also so that works the same too
            var ret = fn.call(elem, window.event);   
            if (ret === false) {
                window.event.returnValue = false;
                window.event.cancelBubble = true;
            }
            return(ret);
        }

        if (elem.addEventListener) {
            elem.addEventListener(event, listenHandler, false);
        } else {
            elem.attachEvent("on" + event, attachHandler);
        }
    }

    addEvent(window, 'message', function (event) {
        switch(event.data.action){
        case 'ismaxSetHeight':
          document.getElementById('ismaxFrame').setAttribute('height', event.data.height);
          break
        }
    });
<#     if (this.data.hasOwnProperty('text') && text ) { #>
    text = '<#= text #>';
<#     } else { #>
    text = <#= user.helper #>
<#     } #>
<#= user.eval #>
    document.write(unescape('%3Ciframe src="/iframe?text=' + text + '" scrolling="no" frameborder="no" width="100%" height="0" id="ismaxFrame"%3E%3C/iframe%3E'));
}());
<# } else { #>
({})
<# } #>