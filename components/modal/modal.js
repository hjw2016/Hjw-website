/**
 * @author chenchu
 * @description modal component
 */
define([
    "../util",
    "text!./modal.html",
    "css!./modal.css"
], function(Util, tpl){
    return {
        template: tpl,
        props: {
            effect: {
                type: String,
                default: "fade"
            },
            type: {
                type: String,
                default: "default"
            },
            width: {
                type: Number
            },
            title: {
                type: String
            },
            cancelText: {
                type: String,
                default: "取消"
            },
            okText: {
                type: String,
                default: "确定"
            },
            backdrop: {
                type: Boolean,
                default: true  
            },
            cancelCallback: {
                type: Function,
                default: function(){this.show = false}
            },
            okCallback: {
                type: Function,
                default: function(){this.show = false}
            }
        },
        data: function(){
            return {
                show: false
            }  
        },
        attached: function(){
            this._escKeyup = Util.listen(document, "keyup", function(event){
                event = event || window.event
                var keyCode = event.keyCode || event.which
                if(keyCode === 27){
                    this.show = false
                }
            }.bind(this))
        },
        detached: function(){
        	if(this._escKeyup){
        		this._escKeyup.remove()
        	}
        },
        ready: function(){
            this.$watch("show", function(val){
                var el = this.$el
                var rootEl = this.$root.$el
                var hasVScrollbar = Util.hasVScrollBar(rootEl)
                var scrollBarWidth = hasVScrollbar ? Util.getScrollBarWidth() : 0
                if(val){
                    el.style.display = "block"
                    setTimeout(function(){
                        Util.addClass(el, "in")
                    }, 0)
                    Util.addClass(rootEl, "modal-open")
                    if(scrollBarWidth !== 0){
                        rootEl.style.paddingRight = scrollBarWidth + "px"
                    }
                    if(this.backdrop){
                        this._blurModalContentevent = Util.listen(el, "click", function(event){
                            if(event.target === el){
                                this.close()
                            }
                        }.bind(this))
                    }
                }else{
                    if(this._blurModalContentevent){
                        this._blurModalContentevent.remove()
                    }
                    Util.removeClass(el, "in")
                    setTimeout(function(){
                        el.style.display = "none"
                        Util.removeClass(rootEl, "modal-open")
                        rootEl.style.paddingRight = ""
                    }, 300)
                }
            }, {immediate: true})
        },
        methods: {
            close: function(){
                this.cancelCallback()
            },
            handleConfirmClick: function(){
                this.okCallback()
            }
        }
    }
})