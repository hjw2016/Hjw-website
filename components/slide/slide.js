/**
 * @author chenchu
 * @description slide component，和carousel组件配合使用
 */
define(["../util"], function(Util){
    return {
        template: "<div class='item'><slot></slot></div>",
        data: function(){
            return {
                index: 0
            }
        },
        computed: {
            show: function(){
                return this.$parent.activeIndex == this.index
            }
        },
        ready: function(){
            var slides = this.$parent.$children
            for(var c in slides){
                if(slides[c].$el === this.$el){
                    this.index = parseInt(c, 10)
                    break
                }
            }
            this.$parent.indicator.push(this.index)
            if(this.index === 0){
                Util.addClass(this.$el, "active")
            }
        }
    }
})