/*
 * @Author: infinityboy
 * @Date: 2019-02-15 13:18:48
 * @Last Modified by: infinityboy
 * @Last Modified time: 2019-03-12 09:42:22
 */
<template>
  <view-main>
    <template slot="example">
      <div class="straight-line">
        <h1 class="welcome-text">{{ data.msg }}</h1>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple" id="leaflet-container1"></div>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
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
  createColorTileLayer,
  drawStraightLines,
  createStraightLinesLayerGroup
} from "@/components/gis/layers/index";
import { getBounds } from '@/components/gis/utils/index'
import viewMain from "@/views/common/main";
export default {
  name: "StraightLine",
  data() {
    return {
      data: {
        msg: "Welcome to Your StraightLine Panel",
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
    this.data.baseTileLayerOptions = {
      minZoom: 1,
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
    this.data.map = createMap(
      document.getElementById("leaflet-container1"),
      this.data.mapBaseOptions
    );
    this.data.baseTileLayer = createBaseTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.data.baseTileLayerOptions
    );
    this.data.straightLinesLayerGroup = createStraightLinesLayerGroup(
      this.data.straightLines
    );
    this.data.baseTileLayer.addTo(this.data.map);
    this.data.straightLinesLayerGroup.addTo(this.data.map);
  },
  destroyed() {
    this.data = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.straight-line {
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
