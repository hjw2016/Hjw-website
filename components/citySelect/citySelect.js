/**
 * @author chenchu
 * @description 地市联动选择
 */
define(["text!./citySelect.html", "data/city"], function(tpl, allCities) {    
    return {
        template: tpl,
        props: {
            selectedCity: {
                type: String,
                default: "330000",
                twoWay: true
            },
            selectedCounty: {
                type: String,
                default: "330000",
                twoWay: true
            },
            hasLabels: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            return {
                cities: allCities
            }
        },
        computed: {
            counties: function() {
                return this.cities.filter(function(city){
                    return city.id == this.selectedCity
                }.bind(this))[0].children
            }
        },
        watch: {
            selectedCity: function() {
                this.selectedCounty = this.counties[0].id
            }
        }
    }
})