/**
 * @author chenchu
 * @description 封装bootstrap-table为组件
 */
define(["require", "../util", "bootstrap-table"], function(require, Util){
    return {
        template: "<div><table class='table table-striped table-condense table-bordered' :id='tableId'></table></div>",
        props: {
            tableId: {
                type: String,
                default: "bsTable"
            },
            options: {
                type: Object,
                required: true
            }
        },
        events: {
            tabShow: function(tabPane){
                if(Util.isDescendant(tabPane, this.$el)){
                    this.$emit("resize")
                }
            },
            resize: function(){
                this.bsTable && this.bsTable.bootstrapTable("resetView", {height: this.$el.offsetHeight})
            }
        },
        ready: function(){
            if(this.options.fixedColumns && this.options.editable){
                require(["bootstrap-table-fixed-columns", "bootstrap-table-editable"], function(){
                    this.bsTable = $(this.$el.children[0]).bootstrapTable($.extend({}, this.options, {height: this.$el.offsetHeight}))
                }.bind(this))
            }else if(this.options.fixedColumns && !this.options.editable){
                require(["bootstrap-table-fixed-columns"], function(){
                    this.bsTable = $(this.$el.children[0]).bootstrapTable($.extend({}, this.options, {height: this.$el.offsetHeight}))
                }.bind(this))
            }else if(!this.options.fixedColumns && this.options.editable){
                require(["bootstrap-table-editable"], function(){
                    this.bsTable = $(this.$el.children[0]).bootstrapTable($.extend({}, this.options, {height: this.$el.offsetHeight}))
                }.bind(this))
            }else{
                this.bsTable = $(this.$el.children[0]).bootstrapTable($.extend({}, this.options, {height: this.$el.offsetHeight}))
            }
        },
        beforeDestroy: function(){
            this.bsTable && this.bsTable.bootstrapTable("destroy")
        }
    }
})