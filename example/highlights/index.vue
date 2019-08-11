/*
 * @Author: infinityboy
 * @Date: 2019-02-15 13:18:43
 * @Last Modified by: infinityboy
 * @Last Modified time: 2019-03-12 10:13:11
 */
<template>
  <view-main>
    <template slot="example">
      <div class="area-highlights">
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
import { createMap, createBaseTileLayer } from "@/components/gis/layers/index";
import { getBounds, getGeoJson } from "@/components/gis/utils/index";
import { plottingCcale } from "@/components/gis/parts/index";
import viewMain from "@/views/common/main";
export default {
  name: "Jump",
  data() {
    return {
      data: {
        msg: "Welcome to Your Highlights Panel",
        mapBaseOptions: null,
        baseTileLayerOptions: null,
        maps: null,
        highlightsLayer: null
      }
    };
  },
  created() {
    this.data.bounds = getBounds([90, 180], [-90, -180]);
    this.data.mapBaseOptions = {
      center: [47.3622, -122.1955],
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
    this.$ajax.get("../static/data/gis/us-states.json").then(data => {  
      this.data.highlightsLayer = getGeoJson(data.data, {
        style: function(feature) {
          return { color: 'rgba(255,0,0,1)' };
        },
        onEachFeature:  (feature, layer) => {
            let _self = null;
            layer.on('mouseover', function () {
                _self = this;
                this.setStyle({
                    color: 'rgba(110,0,0,1)'
                });
            });
            layer.on('mouseout', () => {
                this.data.highlightsLayer.resetStyle(_self);
            });
            layer.on('click', function () {
              alert('响应点击事件')
            });
        }
      }).addTo(this.data.map);
    });
    plottingCcale().addTo(this.data.map);
  },
  destroyed() {
    this.data = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.area-highlights {
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
