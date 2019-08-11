/*
 * @Author: infinityboy
 * @Date: 2019-02-15 13:18:15
 * @Last Modified by: infinityboy
 * @Last Modified time: 2019-02-21 11:29:58
 */
<template>
    <div :id="id"></div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */ 
export default {
  name: 'BaseMap',
  props: {
    id: {
      type: String,
      required: true
    },
    mapBaseOptions: Object,
    baseTileLayerUrl: {
      type: String,
      required: true
    },
    baseTileLayerOptions: Object,
    popup: Object,
    lines: {
      type: Array,
      default: function () {
        return []
      }
    },
    photos: {
      type: Array,
      default: function () {
        return []
      }
   }
  },
  data() {
    return {
			map: null,
      baseTileLayer: null,
      straightLinesLayerGroup: null,
      photoLayer: null,
      // 自定义事件后续单独提出维护
      customEvent: {
        'clickMap': 'click-map'
      },
      gisContext: {},
      straightLines: []
    }
  },
  methods: {
    _createMap () {
      this.map = L.map(this.id, this.mapBaseOptions)
    },
    _createBaseTileLayer () {
      this.baseTileLayer = L.tileLayer(
				this.baseTileLayerUrl,
				this.baseTileLayerOptions
      )
    },
    _createPhotoLayer () {
      this.photoLayer = L.photo.cluster({
          icon: {
            iconSize: [50, 50]
          }
        })
    },
    _createGisContext () {
      Object.defineProperties(this.gisContext, {
          map: {
            value: this.map,
            writable: false,
            enumerable: true,
            configurable: false
          },
          baseTileLayer: {
            value: this.baseTileLayer,
            writable: false,
            enumerable: true,
            configurable: false
          },
          straightLinesLayerGroup: {
            value: this.straightLinesLayerGroup,
            writable: false,
            enumerable: true,
            configurable: false
          },
          photoLayer: {
            value: this.photoLayer,
            writable: false,
            enumerable: true,
            configurable: false
          }
        })
    },
    _createStraightLinesLayerGroup (lines) {
      this.straightLinesLayerGroup = L.layerGroup(lines)
    },
    _initPopup () {
      if(!this.popup) return false
      this.map.openPopup(this.popup)
    },
    _addBaseTileLayer () {
      this.baseTileLayer.addTo(this.map)
    },
    _addPhotoLayer (photos) {
      this.photoLayer.add(photos).addTo(this.map)
    },
    _addStraightLinesLayerGroup () {
      this.straightLinesLayerGroup.addTo(this.map)
    },
    _listenMapClick () {
      this.map.on('click', (ev) => {
        this.gisContext.ev = ev
        this.$emit(this.customEvent.clickMap, this.gisContext)
      })
    },
    _listenBaseTileLayer () {
      this.baseTileLayer.on('load', function(ev){
        // console.log(ev)
      })
    },
    _listenPhotoLayerClick () {
      this.photoLayer.on('click', (ev) => {
        // console.log(ev)
      })
    },
		initialize () {
      this._createMap()
      this._createBaseTileLayer()
      this._createPhotoLayer()
      this._createStraightLinesLayerGroup(this.lines)
      this._addBaseTileLayer()
      this._addPhotoLayer(this.photos)
      this._addStraightLinesLayerGroup()
      this._initPopup()
      this._createGisContext()
      this._listenMapClick()
      this._listenPhotoLayerClick()
      this._listenBaseTileLayer()
    }
  },
  mounted () {
     this.initialize()
  },
  destroyed () {
    this.baseTileLayer = null
    this.photoLayer = null
    this.straightLinesLayerGroup = null
    this.gisContext = null
    this.straightLines = null
  }
  
}
</script>
<style lang="scss" scoped>
</style>
