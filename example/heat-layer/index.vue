<template>
  <view-main>
    <template slot="example">
      <div class="heat-layer">
        <h1 class="welcome-text">{{ data.msg }}</h1>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple" id="leaflet-container1"></div>
          </el-col>
          <el-col :span="6">
          </el-col>
          <el-col :span="6">
          </el-col>
          <el-col :span="6">
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
  createMiniMap,
  creatHeatLayer
} from "@/components/gis/layers/index";
import { getBounds } from '@/components/gis/utils/index'
import viewMain from "@/views/common/main";
import { addressPoints } from "./realworld.10000.js";
export default {
  name: "HeatLayer",
  data() {
    return {
      data: {
        msg: "Welcome to Your HeatLayer Panel",
        map: null,
        baseTileLayer: null,
        bounds: null,
        mapBaseOptions: null,
        baseTileLayerOptions: null,
        smallTilesLayer: null,
        miniMap: null,
        aimingRectOptions: { color: "#ff1100", weight: 3 },
        shadowRectOptions: {
          color: "#0000AA",
          weight: 1,
          opacity: 0,
          fillOpacity: 0
        },
        addressPoints: null,
        heatLayer: null
      }
    };
  },
  created() {
    this.data.bounds = getBounds([90, 180], [-90, -180]);
    this.data.mapBaseOptions = {
      center: [-37.89084083855194, 175.4722595214844],
      zoom: 12,
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
    this.data.smallTilesLayer = createSmallTilesLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      { minZoom: 0, maxZoom: 13, attribution: "" }
    );
    //addressPoints 包含 10000 个point
    this.data.addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });
    this.data.miniMap = createMiniMap(this.data.smallTilesLayer, {
      position: "bottomleft",
      toggleDisplay: true,
      aimingRectOptions: this.data.aimingRectOptions,
      shadowRectOptions: this.data.shadowRectOptions
    })
  },
  components: {
    viewMain
  },
  methods: {
  },
  mounted() {
    // 把大象塞进冰箱
    this.data.map = createMap(
      document.getElementById("leaflet-container1"),
      this.data.mapBaseOptions
    );
    this.data.baseTileLayer = createBaseTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions
    );
    this.data.baseTileLayer.addTo(this.data.map);
    this.data.heatLayer = creatHeatLayer(this.data.addressPoints);
    this.data.heatLayer.addTo(this.data.map);
    this.data.miniMap.addTo(this.data.map);
  },
  destroyed() {
    this.data = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.heat-layer {
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

