/**
 * @author chenchu
 * @description panel component
 */
define([
    "text!./panel.html",
    "css!./panel.css"
], function(tpl){
    return {
        template: tpl,
        data: function(){
            return {
                bodyHeight: "auto"
            }
        },
        props: {
            type: {
                type: String,
                default: "default"
            },
            dismissable: {
                type: Boolean,
                default: false
            },
            header: {
                type: String,
                default: ""
            },
            show: {
                type: Boolean,
                default: true
            },
            halign: {
                type: String,
                default: "left"
            },
            canCollapse: {
                type: Boolean,
                default: true
            },
            isOpen: {
                type: Boolean,
                default: false
            },
            fit: {
                type: Boolean,
                default: false
            }
        },
        ready: function(){
            this.reflow()
        },
        methods: {
            toggleOpen: function(){
                if(this.canCollapse){
                    this.isOpen = !this.isOpen
                    this.$dispatch("togglePanel", this)
                }
            },
            reflow: function(){
                if(this.fit){
                    this.bodyHeight = (this.$el.offsetHeight - this.$els.panelHeader.offsetHeight - 2) + "px"
                }
            },
            close: function(){
                this.show = false
                this.$dispatch("closePanel")
            }
        },
        transitions: {
            collapse: {
                afterEnter: function(el){
                    el.style.maxHeight = ""
                },
                beforeLeave: function(el){
                    el.style.maxHeight = el.offsetHeight + "px"
                    return el.offsetHeight
                }
            }
        }
    }
})