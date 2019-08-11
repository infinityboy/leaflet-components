/*
 * @Author: svt.dzc
 * @Date: 2019-02-15 13:18:48
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-03-12 09:55:28
 */
<template>
  <view-main>
    <template slot="example">
      <div class="map-style">
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
      </div>
    </template>
  </view-main>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import {
  createMap,
  createColorTileLayer,
  drawStraightLines,
  createStraightLinesLayerGroup
} from "@/components/gis/layers/index";
import { getBounds } from '@/components/gis/utils/index'
import viewMain from "@/views/common/main";
export default {
  name: "MapStyle",
  data() {
    return {
      data: {
        msg: "Welcome to Your MapStyle Panel",
        mapBaseOptions: null,
        baseTileLayerOptions: null,
        straightLines: null,
        map: null,
        baseTileLayer: null,
        bounds: null
      }
    };
  },
  components: {
    viewMain
  },
  created() {
    this.data.bounds = getBounds([90, 180], [-90, -180]);
    this.data.mapBaseOptions = {
      center: [29.64415, 91.1145],
      zoom: 3,
      minZoom: 1,
      attributionControl: true,
      maxBounds: this.data.bounds,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: "topleft"
      }
    };
    this.data.baseTileLayerOptions1 = {
      minZoom: 1,
      colorize: function(pixel) {
        // console.log(pixel)
    	// pixel is an object with red, green, blue and alpha channel like this {r, g, b, a}.
    	return { r: pixel.r, g: pixel.b };      // for example, to swap the red and green channel
      }
    };
    this.data.baseTileLayerOptions2 = {
      minZoom: 1,
      colorize: function(pixel) {
        // console.log(pixel)
    	// pixel is an object with red, green, blue and alpha channel like this {r, g, b, a}.
    	return { r: 0, g: 0 };      // for example, to swap the red and green channel
      }
    };
    this.data.baseTileLayerOptions3 = {
      minZoom: 1,
      colorize: function(pixel) {
        // console.log(pixel)
    	// pixel is an object with red, green, blue and alpha channel like this {r, g, b, a}.
    	return { r: pixel.b, g: pixel.r };      // for example, to swap the red and green channel
      }
    };
    this.data.baseTileLayerOptions4 = {
      minZoom: 1,
      colorize: function(pixel) {
        // console.log(pixel)
    	// pixel is an object with red, green, blue and alpha channel like this {r, g, b, a}.
    	return { r: 100, g: 22 };      // for example, to swap the red and green channel
      }
    };
    var dataArr = [
      {
        coord: [113.760234, 23.048884],
        weight: 1
      }
    ];
    var centerCoord = [113.543873, 22.198745];
    this.data.straightLines = drawStraightLines(dataArr, "red", centerCoord);
  },
  methods: {},
  mounted() {
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
    this.data.baseTileLayer1 = createColorTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions1
    );
    this.data.baseTileLayer2 = createColorTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions2
    );
    this.data.baseTileLayer3 = createColorTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions3
    );
    this.data.baseTileLayer4 = createColorTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions4
    );
    this.data.straightLinesLayerGroup = createStraightLinesLayerGroup(
      this.data.straightLines
    );
    this.data.baseTileLayer1.addTo(this.data.map1);
    this.data.straightLinesLayerGroup.addTo(this.data.map1);
    this.data.baseTileLayer2.addTo(this.data.map2);
    this.data.baseTileLayer3.addTo(this.data.map3);
    this.data.baseTileLayer4.addTo(this.data.map4);
  },
  destroyed() {
    this.data = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.map-style {
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
