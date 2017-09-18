/**
 * @author chenchu
 * @description popover component
 */
define([
    "../util",
    "text!./popover.html",
    "css!./popover.css"
], function(Util, tpl){
    return {
        template: tpl,
        props: {
            trigger: {
                type: String,
                default: "click"
            },
            effect: {
                type: String,
                default: "fade"
            },
            title: {
                type: String,
                default: ""
            },
            header: {
                type: Boolean,
                default: true
            },
            placement: {
                type: String,
                default: "bottom"
            }
        },
        data: function(){
            return {
                position: {
                    top: 0,
                    left: 0
                },
                show: true
            }
        },
        watch: {
            show: function(val){
                if(val){
                    this.$dispatch("popoverShown")
                }
            }
        },
        methods: {
            toggle: function(){
                this.show = !this.show
            }
        },
        attached: function(){
            this._docClick = Util.listen(document.body, "click", function(event){
                if(this.show && event.target !== this.triggerEl && !Util.isDescendant(this.$els.popover, event.target)){
                    this.show = false
                }
            }.bind(this))
        },
        detached: function(){
        	if(this._docClick){
        		this._docClick.remove()
        	}
        },
        ready: function(){
            function previousElementSibling(el){
                do {
                    el = el.previousSibling
                } while(el && el.nodeType !== 1)
                return el
            }
            
            var popoverEl = this.$els.popover
            var triggerEl = this.triggerEl = previousElementSibling(popoverEl)
            if(!triggerEl){
                return
            }
            if(this.trigger === "hover"){
                this._mouseenterEvent = Util.listen(triggerEl, "mouseenter", function(){this.show = true}.bind(this))
                this._mouseleaveEvent = Util.listen(triggerEl, "mouseleave", function(){this.show = false}.bind(this))
            }else if(this.trigger === "focus"){
                this._focusEvent = Util.listen(triggerEl, "focus", function(){this.show = true}.bind(this))
                this._blurEvent = Util.listen(triggerEl, "blur", function(){this.show = false}.bind(this))
            }else{
                this._clickEvent = Util.listen(triggerEl, "click", this.toggle.bind(this))
            }
            
            switch(this.placement){
                case "top":
                    this.position.left = triggerEl.offsetLeft - popoverEl.offsetWidth / 2 + triggerEl.offsetWidth / 2
                    this.position.top = triggerEl.offsetTop - popoverEl.offsetHeight
                    break
                case "left":
                    this.position.left = triggerEl.offsetLeft - popoverEl.offsetWidth
                    this.position.top = triggerEl.offsetTop - popoverEl.offsetHeight / 2 + triggerEl.offsetHeight / 2
                    break
                case "right":
                    this.position.left = triggerEl.offsetLeft + triggerEl.offsetWidth
                    this.position.top = triggerEl.offsetTop - popoverEl.offsetHeight / 2 + triggerEl.offsetHeight / 2
                    break
                case "bottom":
                    this.position.left = triggerEl.offsetLeft - popoverEl.offsetWidth / 2 + triggerEl.offsetWidth / 2
                    this.position.top = triggerEl.offsetTop + triggerEl.offsetHeight
                    break
                default:
                    console.log("unknown placement")
            }
            popoverEl.style.display = "none"
            this.show = false
        },
        beforeDestroy: function(){
            if(this._blurEvent){
                this._blurEvent.remove()
                this._focusEvent.remove()
            }
            if(this._mouseenterEvent){
                this._mouseenterEvent.remove()
                this._mouseleaveEvent.remove()
            }
            if(this._clickEvent){
                this._clickEvent.remove()
            }
        }
    }
})