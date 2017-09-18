define(["text!./legend.html"], function(tpl){
    return {
        template: tpl,
        data: function(){
            return {
                isExpand: true
            }
        },
        props: {
            header: {
                type: String,
                default: "图例"
            }
        },
        methods: {
            toggleExpand: function(){
                this.isExpand = !this.isExpand
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