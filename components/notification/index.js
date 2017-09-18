/**
 * @author chenchu
 * @description 悬浮提示组件
 */
define(["vue", "./notification", "../util"], function(Vue, notification, Util){
    var notify = function(content, duration, type, onClose){
        var container = document.createElement("div")
        container.innerHTML = "<notification :show='show' :type='type' :on-close='onClose'>{{content}}</notification>"
        document.body.appendChild(container)
        
        var vm = new Vue({
            el: container,
            data: {
                show: true,
                content: content,
                type: type,
                onClose: onClose
            },
            components: {
                notification: notification
            }
        }).$children[0]
        
        duration = duration || 2500
        
        setTimeout(function(){
            
            var animationEl = container.querySelector(".animation")
            var eventName = Util.animationEndEventName()
            var transitionFn = function(event){
                event && event.stopPropagation()
                container.parentNode.removeChild(container)
                vm.$destroy(true)
                onClose && onClose()
            }
            if(eventName){
                Util.listen(animationEl, eventName, transitionFn)
            }else{
                setTimeout(transitionFn, 500)
            }
            
            Util.addClass(animationEl, "slide-out-down")
            
        }, duration)
    }
    
    return {
        info: function(content, duration, onClose){
            return notify(content, duration, "info", onClose)
        },
        success: function(content, duration, onClose){
            return notify(content, duration, "success", onClose)
        },
        error: function(content, duration, onClose){
            return notify(content, duration, "error", onClose)
        }
    }
})