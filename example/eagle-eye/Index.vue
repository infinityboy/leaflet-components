/*
 * @Author: svt.dzc
 * @Date: 2019-02-15 13:18:32
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-03-06 15:27:10
 */
<template>
  <view-main>
    <template slot="example">
      <div class="eagle-eye">
        <h1 class="welcome-text">{{ data.msg }}</h1>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple" id="leaflet-container1"></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" id="leaflet-container2"></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" id="leaflet-container3"></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" id="leaflet-container4"></div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <button>基础版</button>
          </el-col>
          <el-col :span="6">
            <button>交互版</button>
          </el-col>
          <el-col :span="6">
            <button>图层版</button>
          </el-col>
          <el-col :span="6">
            <button>marker版</button>
          </el-col>
        </el-row>
      </div>
    </template>
  </view-main>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import {
  createMap,
  createBaseTileLayer,
  createSmallTilesLayer,
  createMiniMap
} from "@/components/gis/layers/index";
import { getBounds, getGeoJson, layersGroup } from '@/components/gis/utils/index'
import { designPopup, createMaker, createIcon, createDivIcon, createCircleMarker, controlLayers } from '@/components/gis/parts/index'
import viewMain from "@/views/common/main";
import { pubsGeoJSON } from "./local_pubs_restaurant_norway.js";
export default {
  name: "EagleEye",
  data() {
    return {
      data: {
        msg: "Welcome to Your EagleEye Panel",
        map1: null,
        map2: null,
        map3: null,
        map4: null,
        baseTileLayer1: null,
        baseTileLayer2: null,
        baseTileLayer3: null,
        baseTileLayer4: null,
        bounds: null,
        mapBaseOptions: null,
        baseTileLayerOptions: null,
        smallTilesLayer1: null,
        smallTilesLayer2: null,
        smallTilesLayer3: null,
        smallTilesLayer4: null,
        miniMap1: null,
        miniMap2: null,
        miniMap3: null,
        miniMap4: null,
        aimingRectOptions: { color: "#ff1100", weight: 3 },
        shadowRectOptions: {
          color: "#0000AA",
          weight: 1,
          opacity: 0,
          fillOpacity: 0
        },
        baseLayers: null,
        baseLayersCopy: null
      }
    };
  },
  created() {
    this.data.bounds = getBounds([90, 180], [-90, -180]);
    this.data.mapBaseOptions = {
      center: [29.64415, 91.1145],
      zoom: 3,
      minZoom: 1,
      attributionControl: true,
      maxBounds: this.bounds,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: "topleft"
      }
    };
    this.data.baseTileLayerOptions = {
      minZoom: 1
    };
    this.data.baseLayers = {
      google: createSmallTilesLayer(
        "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
        { minZoom: 0, maxZoom: 13, attribution: "" }
      ),
      DarkMap: createSmallTilesLayer(
        "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        { minZoom: 0, maxZoom: 13, attribution: "" }
      )
    };
    this.data.baseLayersCopy = {
      google: createSmallTilesLayer(
        "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
        { minZoom: 0, maxZoom: 13, attribution: "" }
      ),
      DarkMap: createSmallTilesLayer(
        "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        { minZoom: 0, maxZoom: 13, attribution: "" }
      )
    };
    //pubsGeoJSON 包含 1314 个marker
    const icon = createIcon({
      iconUrl: "https://unpkg.com/leaflet@1.0.1/dist/images/marker-icon.png",
      iconSize: [20, 30],
      iconAnchor: [10, 0],
      popupAnchor: [0, 0],
      shadowUrl:
        "https://unpkg.com/leaflet@1.0.1/dist/images/marker-shadow.png",
      shadowSize: [22, 32]
    });
    this.data.pubs1 = getGeoJson(pubsGeoJSON, {
      onEachFeature: this.createPopUp,
      pointToLayer: function(featuredata, latlng) {
        return createMaker(latlng, {
          icon: icon
        });
      }
      //自定义标记DOM
      // pointToLayer: function (featuredata, latlng) {
      //   return createMaker(latlng, {icon: createDivIcon('<div>自定义html</div>')});
      // }
    });
    var pubs2 = getGeoJson(pubsGeoJSON, {
      pointToLayer: function(featuredata, latlng) {
        return createCircleMarker(latlng, { radius: 2 });
      }
    });
    this.data.layers = controlLayers(this.data.baseLayers);
    this.data.smallTilesLayer1 = createSmallTilesLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      { minZoom: 0, maxZoom: 13, attribution: "" }
    );
    this.data.miniMap1 = createMiniMap(this.data.smallTilesLayer1, {
      position: "bottomleft",
      toggleDisplay: true,
      aimingRectOptions: this.data.aimingRectOptions,
      shadowRectOptions: this.data.shadowRectOptions
    });
    this.data.smallTilesLayer2 = createSmallTilesLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      { minZoom: 0, maxZoom: 13, attribution: "" }
    );
    this.data.miniMap2 = createMiniMap(this.data.smallTilesLayer2, {
      position: "bottomright",
      toggleDisplay: true,
      aimingRectOptions: this.data.aimingRectOptions,
      shadowRectOptions: this.data.shadowRectOptions
    });
    this.data.smallTilesLayer3 = createSmallTilesLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      { minZoom: 0, maxZoom: 13, attribution: "" }
    );
    this.data.miniMap3 = createMiniMap(this.data.smallTilesLayer3, {
      toggleDisplay: true
    });
    this.data.smallTilesLayer4 = createSmallTilesLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      { minZoom: 0, maxZoom: 13, attribution: "" }
    );
    const layersGroupxx = layersGroup([this.data.smallTilesLayer4, pubs2]);
    this.data.miniMap4 = createMiniMap(layersGroupxx, {
      position: "topright",
      toggleDisplay: true
    });
  },
  components: {
    viewMain
  },
  methods: {
    createPopUp(feature, layer) {
      var string = "";
      for (var k in feature.properties) {
        string += k + " : " + feature.properties[k] + "<br>";
      }
      layer.bindPopup(string);
    }
  },
  mounted() {
    // 把大象塞进冰箱
    this.data.map1 = createMap(
      document.getElementById("leaflet-container1"),
      this.data.mapBaseOptions
    );
    this.data.map2 = createMap(
      document.getElementById("leaflet-container2"),
      this.data.mapBaseOptions
    );
    this.data.map3 = createMap(
      document.getElementById("leaflet-container3"),
      this.data.mapBaseOptions
    );
    this.data.map4 = createMap(
      document.getElementById("leaflet-container4"),
      this.data.mapBaseOptions
    );
    this.data.baseTileLayer1 = createBaseTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions
    );
    this.data.baseTileLayer2 = createBaseTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions
    );
    this.data.baseTileLayer3 = createBaseTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions
    );
    this.data.baseTileLayer4 = createBaseTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions
    );
    this.data.baseTileLayer1.addTo(this.data.map1);
    this.data.baseTileLayer2.addTo(this.data.map2);
    this.data.layers.addTo(this.data.map3);
    this.data.baseTileLayer3.addTo(this.data.map3);
    this.data.baseTileLayer4.addTo(this.data.map4);
    this.data.miniMap1.addTo(this.data.map1);
    this.data.miniMap2.addTo(this.data.map2);
    this.data.miniMap3.addTo(this.data.map3);
    this.data.miniMap4.addTo(this.data.map4);
    this.data.map4.addLayer(this.data.pubs1);
    this.data.map1.on("click", ev => {
      let newPopup = designPopup(
        [ev.latlng.lng, ev.latlng.lat],
        "<p>Hello world!<br />This is a nice popup.</p>"
      );
      this.data.map1.openPopup(newPopup);
    });
    this.data.map2.on("click", ev => {
      let newPopup = designPopup(
        [ev.latlng.lng, ev.latlng.lat],
        "<p>Hello world!<br />This is a nice popup.</p>"
      );
      this.data.map2.openPopup(newPopup);
    });
    this.data.miniMap2.on("toggle", function(data) {
      console.log(
        "Listen for `toggle` event: miniMap is " +
          (data.minimized ? "minimize" : "restore")
      );
    });
    this.data.miniMap2.on("minimize", function() {
      console.log("Listen for `minimize` event");
      alert("minimize");
    });
    this.data.miniMap2.on("restore", function() {
      console.log("Listen for `restore` event");
      alert("restore");
    });
    this.data.map3.on("baselayerchange", e => {
      console.log(e)
      this.data.miniMap3.changeLayer(this.data.baseLayersCopy[e.name]);
    });
  },
  destroyed() {
    this.data = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.eagle-eye {
  width: 100%;
  height: 100%;
  .el-row {
    padding: 0 40px;
    .grid-content {
      min-height: 40vh;
    }
  }
}
</style>

