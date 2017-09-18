define(["ztree"], function(){
    return {
        template: "<ul id='tree' class='ztree'></ul>",
        props: {
            setting: {
                type: Object,
                required: true
            },
            nodes: {
                default: null
            }
        },
        ready: function(){
            this.ztreeObj = $.fn.zTree.init($(this.$el), this.setting, this.nodes)
        },
        beforeDestroy: function(){
            this.ztreeObj && this.ztreeObj.destroy()
        }
    }
})