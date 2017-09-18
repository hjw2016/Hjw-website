define(["../util", "text!./marqueeSlide.html"], function(Util, tpl){
    return {
        template: tpl,
        props: {
            lists: {
                type: Array,
                default: []
            },
            mousePause: {
                type: Boolean,
                default: true
            },
            speed: {
                type: Number,
                default: 700  
            },
            pause: {
                type: Number,
                default: 3000
            },
            showItems: {
                type: Number,
                default: 5
            },
            immediate: {
                type: Boolean,
                default: true
            }
        },
        data: function(){
            return {
                isPaused: false
            }
        },
        ready: function(){
            this.immediate && this.slideUp()
            clearInterval(this._intervalHandler)
            this._intervalHandler = null
            this._intervalHandler = setInterval(this.slideUp.bind(this), this.pause)
        },
        beforeDestroy: function(){
            clearInterval(this._intervalHandler)
            this._intervalHandler = null
        },
        events: {
            slideShow: function(slideEl){
                if(Util.isDescendant(slideEl, this.$el)){
                    this.resetHeight()
                    
                    this.immediate && this.slideUp()
                    clearInterval(this._intervalHandler)
                    this._intervalHandler = null
                    this._intervalHandler = setInterval(this.slideUp.bind(this), this.pause)
                }else{
                    clearInterval(this._intervalHandler)
                    this._intervalHandler = null
                }
            }  
        },
        watch: {
            lists: function(){
                if(!this.init){
                    this.resetHeight()
                    this.init = true
                }
            }
        },
        methods: {
            resetHeight: function(){
                var height = 0
                Array.prototype.slice.apply(this.$els.ol.children).forEach(function(item, index){
                    if(index < this.showItems){
                        height += item.offsetHeight || 28
                    }
                }.bind(this))    
                this.$el.style.height = height + "px"
            },
            slideUp: function(){
                if(this.isPaused || this.lists.length < this.showItems){
                    return 
                }

                if(this.lists.length){
                    var height = this.$els.ol.children[0].offsetHeight
                    
                    $(this.$els.ol).animate({top: - height + "px"}, this.speed, function(){
                        var first = this.lists.shift()
                        this.$els.ol.style.top = "0px"
                        this.lists.push(first)
                    }.bind(this))
                }
            }
        }
    }
})