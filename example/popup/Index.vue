/*
 * @Author: infinityboy
 * @Date: 2019-02-15 13:18:52
 * @Last Modified by: infinityboy
 * @Last Modified time: 2019-03-04 10:59:17
 */
<template>
  <view-main>
    <template slot="example">
      <div class="popup">
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
  createBaseTileLayer
} from "@/components/gis/layers/index";
import { getBounds } from '@/components/gis/utils/index'
import { designPopup } from '@/components/gis/parts/index'
import viewMain from "@/views/common/main";
export default {
  name: "Tooltip",
  data() {
    return {
      data: {
        msg: "Welcome to Your Tooltip Panel",
        popup: null,
        map: null,
        baseTileLayer: null,
        bounds: null,
        mapBaseOptions: null,
        baseTileLayerOptions: null
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
    this.data.popup = designPopup(
      [91.1145, 29.64415],
      "<p>Hello world!<br />This is a nice popup.</p>"
    );
  },
  components: {
    viewMain
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
    this.data.baseTileLayer.addTo(this.data.map);
    this.data.map.openPopup(this.data.popup);
    this.data.map.on("click", ev => {
      let newPopup = designPopup(
        [ev.latlng.lng, ev.latlng.lat],
        "<p>Hello world!<br />This is a nice popup.</p>"
      );
      this.data.map.openPopup(newPopup);
    });
  },
  destroyed() {
    this.data = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.popup {
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
