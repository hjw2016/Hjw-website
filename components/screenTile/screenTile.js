/**
 * @author chenchu
 * @description screenCard component
 */
define([
    "text!./screenTile.html", 
    "css!./screenTile.css"
], function(tpl){
    return {
        template: tpl,
        data: function(){
            return {
                show: true,
                contentHeight: 100
            }
        },
        props: {
            header: {
                type: String
            }
        },
        ready: function(){
            this.reflow()
        },
        methods: {
            reflow: function(){
                this.contentHeight = this.$el.offsetHeight - this.$els.tileHeader.offsetHeight
                this.$nextTick(function(){
                    this.$dispatch("screenTileReflow")
                })
            },
            close: function(){
                this.show = false
                this.$dispatch("closeScreenTile")
            }
        }
    }
})