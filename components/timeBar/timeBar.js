/**
 * @author chenchu
 * @description timebar component
 */
define(["text!./timeBar.html"], function (tpl) {
    return {
        template: tpl,
        data: function () {
            return {
                start: 0,
                end: 0,
                activeIndex: 5,
                customTimeMode: "day",
                shortcuts: [
                    { name: "1小时", gap: 1, type: "1h"},
                    { name: "3小时", gap: 3, type: "3h"},
                    { name: "12小时", gap: 12, type: "12h"},
                    { name: "24小时", gap: 24, type: "24h"},
                    { name: "1天", gap: 1 * 24, type: "1d"},
                    { name: "3天", gap: 3 * 24, type: "3d"},
                    { name: "7天", gap: 7 * 24, type: "7d" }
                ]
            }
        },
        events: {
            popoverShown: function () {
                this.tempTimeCache.start = this.start
                this.tempTimeCache.end = this.end
            }
        },
        created: function () {
            this.customTimeMode = this.activeIndex >= 4 ? "day" : "hour"
            
            this.createStartEndTime()
            this.tempTimeCache = {}

            this.$dispatch("changeDate", this.start, this.end, false, this.shortcuts[this.activeIndex].type)
        },
        methods: {
            handleShortcutClick: function (index) {
                this.activeIndex = index
                this.customTimeMode = this.activeIndex >= 4 ? "day" : "hour"
                
                this.createStartEndTime()
                /** 因为点雨量模块查询雨量的时候在自定义时间和快捷时间选择的时候分别用的自己的服务和大禹的服务
                 *  所以多传递了后面两个参数，表示是否是自定义时间和类型
                 *  类型参数在大禹的服务里面要用到
                */
                this.$dispatch("changeDate", this.start, this.end, false, this.shortcuts[index].type)
            },
            handleConfirmClick: function () {
                this.$dispatch("changeDate", this.start, this.end, true)
                this.$refs.popover.show = false
            },
            handleCancelClick: function () {
                Object.keys(this.tempTimeCache).forEach(function (key) {
                    this.$set(key, this.tempTimeCache[key])
                }.bind(this))

                this.$refs.popover.show = false
            },
            createStartEndTime: function(){
                var endTime = new Date()
                var minutes = endTime.getMinutes()
                endTime.setMinutes(~~(minutes / 5) * 5, 0, 0)
                this.end = endTime.getTime()
                if(this.customTimeMode === "day"){
                    var eightTime = new Date(this.end)
                    eightTime.setHours(8, 0, 0, 0)
                    if(endTime.getHours() >= 8){
                        this.start = eightTime.getTime() - (this.shortcuts[this.activeIndex].gap - 24) * 3600 * 1000
                    }else{
                        this.start = eightTime.getTime() - this.shortcuts[this.activeIndex].gap * 3600 * 1000
                    }
                }else{
                    this.start = this.end - this.shortcuts[this.activeIndex].gap * 3600 * 1000
                }
            }
        },
        components: {
            popover: function (resolve) {
                require(["components/popover/popover"], resolve)
            },
            radioBtn: function (resolve) {
                require(["components/radioBtn/radioBtn"], resolve)
            },
            radioGroup: function (resolve) {
                require(["components/radioGroup/radioGroup"], resolve)
            }
        }
    }
})