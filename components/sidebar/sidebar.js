/**
 * @author chenchu
 * @description 悬浮侧边栏组件
 */
define([
    "../util",
    "text!./sidebar.html",
    "css!./sidebar.css"
], function(Util, tpl){
    return {
        template: tpl,
        props: {
            show: {
                type: Boolean,
                default: true
            },
            placement: {
                type: String,
                default: "right"
            },
            hasHeader: {
                type: Boolean,
                default: true
            },
            header: {
                type: String,
                default: ""
            },
            width: {
                type: Number,
                default: 350
            }
        },
        data: function(){
            return {
                bodyHeight: 0
            }  
        },
        ready: function(){
            this._resizeHandler = Util.listen(window, "resize", function(){
                this.bodyHeight = this.$el.offsetHeight - this.$els.header.offsetHeight - this.$els.footer.offsetHeight
                this.$nextTick(function(){
                    this.$broadcast("resize")
                })
            }.bind(this))
            this.bodyHeight = this.$el.offsetHeight - this.$els.header.offsetHeight - this.$els.footer.offsetHeight
            this.$nextTick(function(){
                this.$broadcast("resize")
            })
        },
        beforeDestroy: function(){
            this._resizeHandler && this._resizeHandler.remove()
        },
        computed: {
            sidebarWidth: function(){
                return typeof this.width === 'number' ? this.width + 'px' : this.width
            },
            asideClass: function(){
                return {
                    left: this.placement === "left",
                    right: this.placement === "right",
                    out: !this.show
                }
            },
            arrowClass: function(){
                return {
                    "glyphicon-triangle-right": this.placement === "right" ? (this.show ? true : false) : (this.show ? false : true),
                    "glyphicon-triangle-left": this.placement === "right" ? (this.show ? false : true) : (this.show ? true : false)
                }
            }
        },
        methods: {
            toggle: function(){
                this.show = !this.show
            }
        }
    }
})