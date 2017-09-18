/**
 * @author chenchu
 * @description: accordion component
 */
define([], function(){
    return {
        template: "<div class='panel-group'><slot></slot></div>",
        props: {
            oneAtATime: {
                type: Boolean,
                default: true
            }
        },
        created: function(){
            this.$on("togglePanel", function(panel){
                if(this.oneAtATime){
                    this.$children.forEach(function(item){
                        if(panel !== item){
                            item.isOpen = false
                        }
                    })
                }
            })
        }
    }
})