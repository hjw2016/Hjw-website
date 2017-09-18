/**
 * @author: chenchu
 * @description: carousel component
 */
define([
    "../util",
    "text!./carousel.html",
    "css!./carousel.css"
], function(Util, tpl){
    return {
        template: tpl,
        props: {
            indicators: {
                type: Boolean,
                default: true
            },
            speed: {
                type: Number,
                default: 600
            }  
        },
        data: function(){
            return {
                indicator: [],
                activeIndex: 0,
                isAnimating: false
            }
        },
        computed: {
            slider: function(){
                return this.$els.slides.children
            }
        },
        ready: function(){
            this.$broadcast("slideShow", this.slider[this.activeIndex])
        },
        watch:{
            activeIndex: function(newVal, oldVal){
                (newVal > oldVal) ? this.slide("up", newVal, oldVal) : this.slide("down", newVal, oldVal)
                this.$nextTick(function(){
                    this.$broadcast("slideShow", this.slider[newVal])
                })
            }
        },
        methods: {
            handleIndicatorClick: function(index){
                if(this.isAnimating || this.activeIndex === index){
                    return false
                }
                this.isAnimating = true
                this.activeIndex = index
            },
            slide: function(direction, selected, prev){                
                var prevSelectedEl = this.slider[prev]
                var selectedEl = this.slider[selected]
                
                $(prevSelectedEl).removeClass("active")
                $(selectedEl).css({top: direction === "up" ? "100%" : "-100%"}).addClass("active").animate({top: 0}, this.speed, function(){
                    this.isAnimating = false
                }.bind(this))
            }
        }
    }
})