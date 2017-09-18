/**
 * @author chenchu
 * @description radio group 和radioBtn组件配合使用
 */
define([], function(){
    return {
        template: "<div class='btn-group' data-toggle='buttons'><slot></slot></div>",
        props: {
            value: {
                type: String,
                default: "",
                twoWay: true
            },
            type: {
                type: String,
                default: "default"
            }
        }
    }
})