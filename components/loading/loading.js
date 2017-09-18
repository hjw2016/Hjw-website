define(["text!./loading.html"], function(tpl){
    return {
        template: tpl,
        data: function(){
            return {
                loadingImg: require.toUrl("img/loading.gif"),
                show: true
            }
        }
    }
})