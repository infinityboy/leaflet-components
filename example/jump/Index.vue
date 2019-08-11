/*
 * @Author: svt.dzc
 * @Date: 2019-02-15 13:18:43
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-03-11 13:50:41
 */
<template>
  <view-main>
    <template slot="example">
      <div class="jump">
        <h1 class="welcome-text">{{ data.msg }}</h1>
        <el-row :gutter="20">
          <el-col :span="24/data.maps.length" v-for="map in data.maps" :key="map.id">
            <div class="grid-content bg-purple" :id="map.id"></div>
          </el-col>
          <el-row :gutter="20">
            <el-col :span="8">
              <button @click="panTo">panTo</button>
            </el-col>
            <el-col :span="8">
              <button @click="flyTo">flyTo</button>
            </el-col>
            <el-col :span="8">
              <button @click="setView">setView</button>
            </el-col>
          </el-row>
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
import viewMain from "@/views/common/main";
import { setTimeout, clearTimeout } from "timers";
export default {
  name: "Jump",
  data() {
    return {
      data: {
        msg: "Welcome to Your Jump Panel",
        mapBaseOptions: null,
        baseTileLayerOptions: null,
        maps: [
          { id: "leaflet-container0" },
          { id: "leaflet-container1" },
          { id: "leaflet-container2" }
        ]
      },
      asd: null
    };
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
      minZoom: 1
    };
  },
  components: {
    viewMain
  },
  methods: {
    panTo() {
      this.data.map0.panTo([38.64415, 94.1145]);
    },
    flyTo() {
      this.data.map1.flyTo([38.64415, 94.1145], 6);
    },
    setView() {
      this.data.map2.setView([38.64415, 94.1145], 6);
    }
  },
  mounted() {
    for (let i = 0; i <= this.data.maps.length - 1; i++) {
      this.data["map" + i] = createMap(
        document.getElementById(this.data.maps[i].id),
        this.data.mapBaseOptions
      );
      this.data["baseTileLayer" + i] = createBaseTileLayer(
        "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
        this.data.baseTileLayerOptions
      );
      this.data["baseTileLayer" + i].addTo(this.data["map" + i]);
    }
  },
  destroyed() {
    this.data = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.jump {
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
