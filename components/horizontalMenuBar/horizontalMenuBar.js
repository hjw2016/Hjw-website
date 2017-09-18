/**
 * @author chenchu
 * @description 首页上快捷方式工具条
 */
define([
    "../util",
    "views/hierarchy",
    "text!./horizontalMenuBar.html",
    "css!./horizontalMenuBar.css"
], function (Util, Hierarchy, tpl) {
    return {
        template: tpl,
        data: function () {
            return {
                headerIndex: 0,
                activeCategoryIndex: 0,
                tempShortcuts: [],
                tempPlugins: [],
                settingMode: "shortcut",
                offsetLeft: 0,
                prevHidden: true,
                shortcutSortHandle: { handle: ".shortcut" }
            }
        },
        props: {
            totalShortcuts: {
                type: Array
            },
            selectedShortcuts: {
                type: Array,
                default: []
            },
            totalPlugins: {
                type: Array
            },
            selectedPlugins: {
                type: Array,
                default: []
            }
        },
        ready: function () {
            this.$nextTick(this.calcPrevHidden)

            this._resizeHandler = Util.listen(window, "resize", this.calcPrevHidden.bind(this))
        },
        beforeDestroy: function () {
            this._resizeHandler && this._resizeHandler.remove()
        },
        watch: {
            selectedShortcuts: function(){
                this.$nextTick(this.calcPrevHidden)
            },
            headerIndex: function (newVal, oldVal) {
                this.slide(newVal, oldVal)
            }
        },
        computed: {
            leafOfCategory: function () {
                var total = []
                var category = this.totalShortcuts[this.activeCategoryIndex]
                Hierarchy.levelOrderTraverse([category], function (item) {
                    if (!item.children || item.children.length === 0) {
                        if (!item.icon) {
                            item.icon = "shortcut-" + item.link.substr(1)
                        }
                        total.push(item)
                    }
                })
                return total
            },
            totalLeaf: function () {
                var leafComponents = []
                Hierarchy.levelOrderTraverse(this.totalShortcuts, function (item) {
                    if (!item.children || item.children.length === 0) {
                        leafComponents.push(item)
                    }
                })
                return leafComponents
            },
            prevHiddenClass: function () {
                return {
                    hidden: this.prevHidden
                }
            },
            nextHiddenClass: function () {
                return {
                    hidden: this.headerIndex === 0
                }
            },
            shortcuts: function () {
                var shortcuts = []
                var totalLeafIds = this.totalLeaf.map(function(item){
                    return item.id
                })
                for(var i = 0, len = this.selectedShortcuts.length; i < len; i++){
                    var index = totalLeafIds.indexOf(this.selectedShortcuts[i])
                    if(index > -1){
                        var leaf = this.totalLeaf[index]
                        shortcuts.push({
                            id: leaf.id,
                            pid: leaf.pid,
                            name: leaf.name,
                            link: this.getShortcutPath(leaf),
                            type: leaf.type,
                            component: leaf.component,
                            icon: leaf.icon || "shortcut-" + leaf.link.substr(1)
                        })
                    }
                }

                return shortcuts
            }
        },
        events: {
            slideShow: function (slideEl) {
                if (Util.isDescendant(slideEl, this.$el)) {
                    this.calcPrevHidden()
                }
            }
        },
        methods: {
            getShortcutPath: function (shortcut) {
                var path = shortcut.link
                var parent = Hierarchy.depthOrderTraverse(this.totalShortcuts, function (item) {
                    return shortcut.pid === item.id
                })
                while (parent) {
                    path = parent.link + path
                    parent = Hierarchy.depthOrderTraverse(this.totalShortcuts, function (item) {
                        return item.id === parent.pid
                    })
                }
                return path
            },
            calcPrevHidden: function(){
                var containerWidth = this.$els.container.offsetWidth
                var listWidth = this.$els.list.offsetWidth
                this.prevHidden = ((listWidth - this.offsetLeft) < containerWidth)
            },
            prev: function () {
                var containerWidth = this.$els.container.offsetWidth
                var listWidth = this.$els.list.offsetWidth
                if (this.headerIndex < this.shortcuts.length - 1 && (listWidth - this.offsetLeft) > containerWidth) {
                    this.headerIndex = this.headerIndex + 1
                } else {
                    this.prevHidden = true
                }
            },
            next: function () {
                if (this.headerIndex > 0) {
                    this.headerIndex = this.headerIndex - 1
                    this.prevHidden = false
                }
            },
            slide: function (newVal, oldVal) {
                var offsetWidth = this.$els.list.children[oldVal].offsetWidth
                if (newVal > oldVal) {
                    this.offsetLeft = this.offsetLeft + offsetWidth
                } else {
                    this.offsetLeft = this.offsetLeft - offsetWidth
                }
            },
            showModal: function () {
                this.tempShortcuts = this.selectedShortcuts.slice()
                this.tempPlugins = this.selectedPlugins.slice()
                this.$refs.modal.show = true
            },
            cancelCallback: function () {
                this.tempShortcuts = []
                this.tempPlugins = []
                this.$refs.modal.show = false
            },
            okCallback: function () {
                this.$dispatch("modifyShortcutsAndPlugins", this.tempShortcuts.slice(), this.tempPlugins.slice())

                this.tempShortcuts = []
                this.tempPlugins = []
                this.$refs.modal.show = false

                this.$nextTick(this.calcPrevHidden)
            }
        },
        components: {
            modal: function (resolve) {
                require(["components/modal/modal"], resolve)
            },
            radioGroup: function (resolve) {
                require(["components/radioGroup/radioGroup"], resolve)
            },
            radioBtn: function (resolve) {
                require(["components/radioBtn/radioBtn"], resolve)
            }
        }
    }
})