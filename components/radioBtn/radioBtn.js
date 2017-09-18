/**
 * @author chenchu
 * @description radio component
 */
define(["text!./radioBtn.html"], function(tpl){
    return {
        template: tpl,
        props: {
            value: {
                type: String
            },
            checked: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            type: function(){
                return this.$parent.type
            },
            active: function(){
                return this.$parent.value === this.value
            }
        },
        methods: {
            handleClick: function(){
                this.$parent.value = this.value
            }
        },
        created: function(){
            if(this.$parent.value === this.value) {
                this.checked = true
            }else if(!this.$parent.value.length && this.checked){
                this.$parent.value = this.value
            }
        }
    }
})