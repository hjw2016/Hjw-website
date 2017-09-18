/**
 * @author chenchu
 * @description util
 */
+function(window){
    var Util = {
        listen: function(target, eventType, callback){
            if(target.addEventListener){
                target.addEventListener(eventType, callback, false)
                return {
                    remove: function(){
                        target.removeEventListener(eventType, callback, false)
                    }
                }
            }else if(target.attachEvent){
                target.attachEvent("on" + eventType, callback)
                return {
                    remove: function(){
                        target.detachEvent("on" + eventType, callback)
                    }
                }
            }else {
            	target["on" + eventType] = callback
                return {
                    remove: function(){
                        target["on" + eventType] = null
                    }
                }
            }
        },
        transitionEndEventName: function(){
            var el = document.createElement("fakeelement")
            var transitions = {
                "transition": "transitionend",
                "MozTransition": "transitionend",
                "WebkitTransition": "webkitTransitionEnd",
                "msTransition": "MsTransitionEnd",
                "OTransition": "oTransitionEnd otransitionend"
            }
            
            for(var t in transitions){
                if(el.style[t] !== undefined){
                    return transitions[t]
                }
            }
        },
        animationEndEventName: function(){
            var el = document.createElement("fakeelement")
            var animations = {
                "animation": "animationend",
                "MozAransition": "animationend",
                "WebkitAnimation": "webkitAnimationEnd",
                "msAnimation": "MsAnimationEnd",
                "OAnimation": "oAnimationEnd oanimationend"
            }
            for(var a in animations){
                if(el.style[a] !== undefined){
                    return animations[a]
                }
            }
        },
        addClass: function(el, clazz){
            if(!el){
                return
            }
            var className
            if(el.classList){
                el.classList.add(clazz)
            }else{
                className = el.className
                if(Util.containsClass(el, clazz)){
                    return
                }
                if(className !== ""){
                    clazz = " " + clazz
                }
                el.className = className + clazz
            }
        },
        removeClass: function(el, clazz){
            if(!el){
                return
            }
            var className
            if(el.classList){
                el.classList.remove(clazz)
            }else{
                className = el.className
                if(!Util.containsClass(el, clazz)){
                    return
                }
                el.className = el.className.replace(new RegExp("(?:^|\\s)" + clazz + "(?!\\S)"), "")
            }
        },
        /**
         * (?:^|\s) # match the start of the string, or any single whitespace character
         * clazz  # the literal text for the classname to remove
         * (?!\S)   # negative lookahead to verify the above is the whole classname
         * ensures there is no non-space character following
         * (i.e. must be end of string or a space)
         */
        containsClass: function(el, clazz){
            if(!el){
                return
            }
            if(el.classList){
                return el.classList.contains(clazz)
            }else{
                return el.className.match(new RegExp("(?:^|\\s)" + clazz + "(?!\\S)"))
            }
        },
        
        /**
         * 判断child element是否是parent的后代结点
         */
        isDescendant: function(parent, child){
            if(!parent || !child){
                return false
            }
            var node = child.parentNode
            while(node != null){
                if(node === parent){
                    return true
                }
                node = node.parentNode
            }
            return false
        },
        
        getScrollBarWidth: function(){
            var outer = document.createElement("div")
            outer.style.visibility = "hidden"
            outer.style.width = "100px"
            document.body.appendChild(outer)
            
            var widthNoScroll = outer.offsetWidth
            outer.style.overflow = "scroll"
            
            var inner = document.createElement("div")
            inner.style.width = "100%"
            outer.appendChild(inner)
            
            var widthWidthScroll = inner.offsetWidth
            
            outer.parentNode.removeChild(outer)
            
            return widthNoScroll - widthWidthScroll
        },
        
        hasVScrollBar: function(el){
            if(!el || el.nodeType !== 3){
                return false
            }
            return el.scrollHeight - el.offsetHeight
        },

        table2Excel: function (table, sheetname, filename) {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><style>{style}</style><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (s) {
                    return window.btoa(unescape(encodeURIComponent(s)));
                },
                format = function (s, c) {
                    return s.replace(/{(\w+)}/g, function (m, p) {
                        return c[p];
                    });
                };

            if (!table.nodeType)
                table = document.getElementById(table);
            var ctx = {
                worksheet: sheetname || 'Worksheet',
                table: table.innerHTML,
                style: $('style').html().replace('1px','.5pt')
            };
            var el = document.getElementById("table2excel");
            if (!el) {
                el = document.createElement("a");
                el.id = "table2excel";
                el.style.display = "none;";
                document.body.appendChild(el);
            }
            el.href = uri + base64(format(template, ctx));
            el.download = filename;
            el.click();
        }
    }

    if(typeof define === "function" && define.amd){
        define([], function(){
            return Util
        })
    }else{
        window.Util = Util
    }
}(window)