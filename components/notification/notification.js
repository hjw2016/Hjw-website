define([
    "text!./notification.html",
    "css!./notification.css"
], function (tpl) {
    return {
        template: tpl,
        props: {
            show: {
                type: Boolean,
                default: true
            },
            content: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: "info"
            },
            dismissable: {
                type: Boolean,
                default: false
            },
            onClose: {
                type: Function,
                default: function(){}
            }
        },
        methods: {
            close: function(){
                this.show = false
                this.onClose && this.onClose()                
            }
        }
    }
})