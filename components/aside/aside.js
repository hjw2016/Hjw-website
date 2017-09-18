define(["text!./aside.html", "css!./aside.css"], function(tpl){
    return {
        template: tpl,
        data: function(){
            return {
                bodyHeight: "auto"
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            fit: {
                type: Boolean,
                default: false
            },
            closable: {
                type: Boolean,
                default: true,
            },
            placement: {
                type: String,
                default: "right"
            },
            header: {
                type: String,
                default: "title"
            },
            width: {
                default: 350
            }
        },
        ready: function(){
            if(this.fit){
                this.bodyHeight = this.$el.offsetHeight - this.$els.header.offsetHeight + "px"
            }
        },
        computed: {
            asideWidth: function(){
                return typeof this.width === 'number' ? this.width + 'px' : this.width
            },
            // effect: function(){
            //     //return this.placement === "left" ? "slideleft" : "slideright"
            // }
        },
        methods: {
            close: function(){
                this.show = false
            }
        }
    }
})