define([
    "text!./tabset.html", 
    "css!./tabset.css"
], function(tpl){
    return {
        template: tpl,
        data: function(){
            return {
                renderData: [],
                activeIndex: 0,
                contentHeight: "auto"
            }
        },
        props: {
            //tab是否充满父容器高度
            fit: {
                type: Boolean,
                default: false  
            },
            effect: {
                type: String,
                default: "fade"
            }
        },
        ready: function(){
            if(this.fit){
                //一开始renderData为空，导致tabHeader高度计算不正确，watch一下
                var unwatch = this.$watch("renderData", function(){
                    unwatch()
                    this.$nextTick(function(){
                        this.$emit("resize")
                    })
                })               
                
                this.$on("resize", function(){
                    this.contentHeight = this.$el.offsetHeight - this.$els.tabHeader.offsetHeight + "px"
                    this.$nextTick(function(){
                        this.$broadcast("resize")
                    })
                })
            }
        },
        beforeDestroy: function(){
            this.$off("resize")  
        },
        methods: {
            handleTabListClick: function(index,tab){
                if(!tab.disabled){
                    this.activeIndex = index
                    this.$nextTick(function(){
                    	this.$dispatch("tabShow", this.$els.tabContent.children[index],index)
                        this.$broadcast("tabShow", this.$els.tabContent.children[index], index)
                    })
                }
            }
        }
    }
})