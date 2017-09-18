define(["../util", "text!./multiSelect.html", "css!./multiSelect.css"], function (Util, tpl) {
    return {
        template: tpl,
        props: {
            options: {
                type: Array,
                default: [],
            },
            value: {
                twoWay: true
            },
            placeholder: {
                type: String,
                default: '没有选中项'
            },
            multiple: {
                type: Boolean,
                default: false
            },
            search: {
                type: Boolean,
                default: false
            },
            maxLimit: {
                type: Number,
                default: 1024
            },
            minLimit: {
                type: Number,
                default: 0
            },
            closeOnSelect: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        ready: function () {
            if (this.value.constructor !== Array) {
                if (this.value.length === 0) {
                    this.value = []
                } else {
                    this.value = [this.value]
                }
            } else {
                if (!this.multiple && this.value.length > 1) {
                    this.value = this.value.slice(0, 1)
                } else if (this.multiple && this.value.length > this.maxLimit) {
                    this.value = this.value.slice(0, this.maxLimit)
                } 
            }
        },
        attached: function(){
            this._docClick = Util.listen(document.body, "click", function(event){
               if(this.show && !Util.isDescendant(this.$el, event.target)){
                   this.show = false
               }
            }.bind(this))
        },
        detached: function(){
        	if(this._docClick){
        		this._docClick.remove()
        	}
        },
        data: function () {
            return {
                searchText: null,
                show: false,
                showMinNotify: false,
                showMaxNotify: false
            }
        },
        computed: {
            selectedItemLabels: function () {
                return "站点类型选择"
                // var foundItems = []
                // if (this.value.length) {
                //     for (var i = 0, len = this.options.length; i < len; i++) {
                //         var item = this.options[i]
                //         if (this.value.indexOf(item.value) > -1) {
                //             foundItems.push(item.label)
                //         }
                //     }
                //     return foundItems.join(', ')
                // }
            },
            showPlaceholder: function () {
                return this.value.length === 0
            }
        },
        watch: {
            value: function (val) {
                if (val.length > this.maxLimit) {
                    this.showMaxNotify = true
                    this.value.pop()
                    setTimeout(function () {
                        this.showMaxNotify = false
                    }.bind(this), 1000)
                }
            }
        },
        methods: {
            select: function (v) {
                if (this.value.indexOf(v) === -1) {
                    if (this.multiple) {
                        this.value.push(v)
                    } else {
                        this.value = [v]
                    }
                } else {
                    if (this.multiple) {
                        if (this.value.length > this.minLimit) {
                            this.value.$remove(v)
                        } else {
                            this.showMinNotify = true
                            setTimeout(function () {
                                this.showMinNotify = false
                            }.bind(this), 1000)
                        }
                    }
                }
                if (this.closeOnSelect) {
                    this.toggleDropdown()
                }
            },
            toggleDropdown: function () {
                this.show = !this.show
            }
        }
    }
})