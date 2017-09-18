define([], function(){
    return {
        template: "<div class='tab-pane' :class='{hide: !show}' style='height: 100%;' v-show='show' :transition='transition'><slot></slot></div>",
        data: function(){
            return {
                index: 0,
                show: false
            }
        },
        props: {
            header: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            show: function(){
                return this.$parent.activeIndex == this.index
            },
            transition: function(){
                return this.$parent.effect
            }
        },
        created: function(){
            this.$parent.renderData.push({
                header: this.header,
                disabled: this.disabled
            })
        },
        ready: function(){
            for(var c in this.$parent.$children){
                if(this.$parent.$children[c].$el === this.$el){
                    this.index = parseInt(c, 10)
                    break
                }
            }
        }
    }
})