define(["../util"], function(Util){
    return {
        template: "<button class='btn btn-info' type='button' @click='table2Excel'><slot>导出为Excel</slot></button>",
        props: {
            tableId: {
                required: true
            },
            fileName: {
                type: String,
                default: "exports"
            }
        },
        methods: {
            table2Excel: function(){
                Util.table2Excel(this.tableId, "Sheet 1", this.fileName)
            }
        }
    }
})