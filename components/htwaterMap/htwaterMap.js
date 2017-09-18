/**
 * @author chenchu
 * @description 封装地图组件
 */
define([
    "htwater/HTMap",
    "htwater/MapConfig",
    "esri/geometry/Extent"
], function(HTMap, MapConfig, Extent){
    return {
        template: "<div id='map'></div>",
        ready: function(){
            this.createMap()
        },
        beforeDestroy: function(){
            this.htMap && this.htMap.destroy()  
        },
        methods: {
            createMap: function(){
                this.htMap = new HTMap("map", {
                    baseLayers: MapConfig.layers,
                    extent: new Extent(MapConfig.extent),
                    zoom: MapConfig.zoom,
                    minZoom: MapConfig.minZoom,
                    globalQueryUrl: MapConfig.globalQueryUrl,
                    countyUrl: MapConfig.countyUrl,
                    countyField: MapConfig.countyField,
                    slider: true,
                    logo: false
                })
            }
        }
    }
})