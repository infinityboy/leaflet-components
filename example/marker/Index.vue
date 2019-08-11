/*
 * @Author: svt.dzc
 * @Date: 2019-02-15 13:18:05
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-03-04 10:56:46
 */
<template>
  <view-main>
    <template slot="example">
      <div class="marker">
        <h1 class="welcome-text">{{ data.msg }}</h1>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple" id="leaflet-container1"></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" id="leaflet-container2"></div>
          </el-col>
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
  createPhotoLayer,
} from "@/components/gis/layers/index";
import { getBounds } from '@/components/gis/utils/index'
import { designPopup } from '@/components/gis/parts/index'
import viewMain from "@/views/common/main";
export default {
  name: "Mark",
  data() {
    return {
      data: {
        msg: "Welcome to Your Marker Panel",
        mapBaseOptions: {},
        baseTileLayerOptions: {},
        simplePhotos: [],
        simpleRes: null,
        multiplePhotos: [],
        multipleRes: null,
        bounds: null,
        popup1: null,
        popup2: null,
        Level1Url: "../static/images/gis/dq.png",
        Level2Url: "../static/images/gis/qy.png",
        Level3Url: "../static/images/gis/dw.png",
        Level4Url: "../static/images/gis/ly.png",
        swzxIcon: "../static/images/gis/swzx.png",
        hydwIcon: "../static/images/gis/hydw.png",
        afxtIcon: "../static/images/gis/afxt.png",
        protectedIcon: "../static/images/gis/afxt.png",
        ready: false,
        map1: null,
        map2: null,
        baseTileLayer1: null,
        baseTileLayer2: null,
        photoLayer1: null,
        photoLayer2: null
      }
    };
  },
  created() {
    this.data.bounds = getBounds([90, 180], [-90, -180]);
    this.data.mapBaseOptions = {
      center: [29.64415, 91.1145],
      zoom: 3,
      minZoom: 1,
      maxZoom: 18,
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
    this.data.popup1 = designPopup(
      [91.1145, 29.64415],
      "<p>Hello world!<br />This is a nice popup.</p>"
    );
    this.data.popup2 = designPopup(
      [91.1145, 29.64415],
      "<p>Hello world!<br />This is a nice popup.</p>"
    );
    this.data.baseTileLayer1 = createBaseTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.baseTileLayerOptions
    );
    this.data.baseTileLayer2 = createBaseTileLayer(
      "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
      this.baseTileLayerOptions
    );
    this.data.photoLayer1 = createPhotoLayer();
    this.data.photoLayer2 = createPhotoLayer([50, 50]);
  },
  components: {
    viewMain
  },
  methods: {
    initSimpleMakers(res) {
      if (res.status === 200 && res.data.length > 0) {
        for (let i = 0; i <= res.data.length - 1; i++) {
          this.data.simplePhotos.push({
            // （把原数据经纬度转换）=> 纬度在前 经度在后
            lat: res.data[i].coord[1],
            lng: res.data[i].coord[0],
            htmlStr: "<div>哈哈哈</div>",
            url: "../static/images/gis/afxt.png",
            html:
              '<div class="simple-photo" style="background-image: url(../static/images/gis/' +
              res.data[i].type +
              '.png);"></div>​',
            lines: res.data[i].lines,
            // （把原数据经纬度转换）=> 纬度在前 经度在后
            coord: [res.data[i].coord[1], res.data[i].coord[0]],
            type: res.data[i].type,
            width: 24,
            height: 24,
            className: "leaflet-marker-simple-photo"
          });
        }
      }
    },
    initMultiplePhotos(res) {
      if (res.status === 200 && res.data.length > 0) {
        for (let i = 0; i <= res.data.length - 1; i++) {
          if (res.data[i].coord.length > 0) {
            if (res.data[i].type === "zdkh") {
              this.data.multiplePhotos.push({
                type: res.data[i].type,
                lat: res.data[i].coord[1],
                lng: res.data[i].coord[0],
                url: "../static/images/gis/afxt.png",
                htmlStr: "<div>哈哈哈</div>",
                // thumbnail: '../../static/images/unit/menu-custom2.png',
                caption: res.data[i].label,
                id: res.data[i].id,
                html:
                  '<div class="photo-' +
                  res.data[i].type +
                  "-img photo-" +
                  res.data[i].type +
                  "-img" +
                  res.data[i].id +
                  '" style="background-image:url(' +
                  this.importClient +
                  ');"></div>​<p class="photo-caption photo-caption' +
                  res.data[i].id +
                  '">' +
                  res.data[i].label +
                  "</p>",
                className: "leaflet-marker-photo",
                width: 40,
                height: 40
              });
            } else {
              if (res.data[i].type !== "protected") {
                if (Number(res.data[i].hasAFXT) > 0) {
                  if (res.data.length > 1) {
                    let arr = res.data.filter(d => {
                      let state = false;
                      if (res.data[i].relatedId) {
                        res.data[i].relatedId.forEach(d2 => {
                          if (String(d2) === String(d.id)) state = true;
                        });
                      }
                      return state;
                    });
                    if (arr.length > 0) {
                      this.data.multiplePhotos.push({
                        type: res.data[i].type,
                        lat: res.data[i].coord[1],
                        lng: res.data[i].coord[0],
                        url: "../static/images/gis/afxt.png",
                        htmlStr: "<div>嘻嘻嘻</div>",
                        // thumbnail: '../../static/images/unit/menu-custom2.png',
                        caption: res.data[i].label,
                        id: res.data[i].id,
                        html:
                          '<div class="photo-' +
                          res.data[i].type +
                          "-img photo-" +
                          res.data[i].type +
                          "-img" +
                          res.data[i].id +
                          '" style="background-image:url(' +
                          this["Level" + res.data[i].level + "Url"] +
                          "),url(" +
                          this[res.data[i].type + "Icon"] +
                          ');"><img class="afxt-img afxt-img' +
                          res.data[i].id +
                          '" src="' +
                          this.afxtIcon +
                          '"></div>​<p class="photo-caption photo-caption' +
                          res.data[i].id +
                          '">' +
                          res.data[i].label +
                          "</p>",
                        className: "leaflet-marker-photo",
                        width: 40,
                        height: 40
                      });
                    } else {
                      this.multiplePhotos.push({
                        type: res.data[i].type,
                        lat: res.data[i].coord[1],
                        lng: res.data[i].coord[0],
                        url: "../static/images/gis/afxt.png",
                        htmlStr: "<div>嘻嘻嘻</div>",
                        // thumbnail: '../../static/images/unit/menu-custom2.png',
                        caption: res.data[i].label,
                        id: res.data[i].id,
                        html:
                          '<div class="photo-' +
                          res.data[i].type +
                          "-img photo-" +
                          res.data[i].type +
                          "-img" +
                          res.data[i].id +
                          '" style="background-image:url(' +
                          this["Level" + res.data[i].level + "Url"] +
                          "),url(" +
                          this[res.data[i].type + "Icon"] +
                          ');"></div>​<p class="photo-caption photo-caption' +
                          res.data[i].id +
                          '">' +
                          res.data[i].label +
                          "</p>",
                        className: "leaflet-marker-photo",
                        width: 40,
                        height: 40
                      });
                    }
                  } else {
                    this.multiplePhotos.push({
                      type: res.data[i].type,
                      lat: res.data[i].coord[1],
                      lng: res.data[i].coord[0],
                      url: "../static/images/gis/afxt.png",
                      htmlStr: "<div>嘻嘻嘻</div>",
                      // thumbnail: '../../static/images/unit/menu-custom2.png',
                      caption: res.data[i].label,
                      id: res.data[i].id,
                      html:
                        '<div class="photo-' +
                        res.data[i].type +
                        "-img photo-" +
                        res.data[i].type +
                        "-img" +
                        res.data[i].id +
                        '" style="background-image:url(' +
                        this.data["Level" + res.data[i].level + "Url"] +
                        "),url(" +
                        this.data[res.data[i].type + "Icon"] +
                        ');"><img class="afxt-img afxt-img' +
                        res.data[i].id +
                        '" src="' +
                        this.afxtIcon +
                        '"></div>​<p class="photo-caption photo-caption' +
                        res.data[i].id +
                        '">' +
                        res.data[i].label +
                        "</p>",
                      className: "leaflet-marker-photo",
                      width: 40,
                      height: 40
                    });
                  }
                } else {
                  this.data.multiplePhotos.push({
                    type: res.data[i].type,
                    lat: res.data[i].coord[1],
                    lng: res.data[i].coord[0],
                    url: "../static/images/gis/afxt.png",
                    htmlStr: "<div>嘻嘻嘻</div>",
                    // thumbnail: '../../static/images/unit/menu-custom2.png',
                    caption: res.data[i].label,
                    id: res.data[i].id,
                    html:
                      '<div class="photo-' +
                      res.data[i].type +
                      "-img photo-" +
                      res.data[i].type +
                      "-img" +
                      res.data[i].id +
                      '" style="background-image:url(' +
                      this.data["Level" + res.data[i].level + "Url"] +
                      "),url(" +
                      this.data[res.data[i].type + "Icon"] +
                      ');"></div>​<p class="photo-caption photo-caption' +
                      res.data[i].id +
                      '">' +
                      res.data[i].label +
                      "</p>",
                    className: "leaflet-marker-photo",
                    width: 40,
                    height: 40
                  });
                }
              }
            }
          }
        }
      }
    }
  },
  async mounted() {
    // 把大象塞进冰箱
    this.data.map1 = createMap(
      document.getElementById("leaflet-container1"),
      this.data.mapBaseOptions
    );
    this.data.map2 = createMap(
      document.getElementById("leaflet-container2"),
      this.data.mapBaseOptions
    );
    this.data.baseTileLayer1.addTo(this.data.map1);
    this.data.baseTileLayer2.addTo(this.data.map2);
    this.data.map1.openPopup(this.data.popup1);
    this.data.map2.openPopup(this.data.popup2);
    this.data.simpleRes = await this.$ajax.get("../static/data/gis/as.json");
    this.data.multipleRes = await this.$ajax.get(
      "../static/data/gis/unit.json"
    );
    await this.initSimpleMakers(this.data.simpleRes);
    await this.initMultiplePhotos(this.data.multipleRes);
    await this.data.photoLayer1
      .add(this.data.simplePhotos)
      .addTo(this.data.map1);
    await this.data.photoLayer2
      .add(this.data.multiplePhotos)
      .addTo(this.data.map2);
    this.data.map1.on("click", ev => {
      let newPopup1 = designPopup(
        [ev.latlng.lng, ev.latlng.lat],
        "<p>Hello world!<br />This is a nice popup.</p>"
      );
      this.data.map1.openPopup(newPopup1);
    });
    this.data.map2.on("click", ev => {
      let newPopup2 = designPopup(
        [ev.latlng.lng, ev.latlng.lat],
        "<p>Hello world!<br />This is a nice popup.</p>"
      );
      this.data.map2.openPopup(newPopup2);
    });
    this.data.photoLayer1.on("click", ev => {
      var templateStr1 =
        '<a class="popup-img" href="javascript:;"><img src="{url}"/></a><p style="display:none;">{htmlStr}<div class="parent"><div class="child"></div></div>';
      ev.layer
        .bindPopup(L.Util.template(templateStr1, ev.layer.photo), {
          className: "leaflet-popup-photo",
          minWidth: 400
        })
        .openPopup();
    });
    this.data.photoLayer2.on("click", ev => {
      var templateStr2 =
        '<a class="popup-img" href="javascript:;"><img src="{url}"/></a><p style="display:none;">{htmlStr}<div class="parent"><div class="child"></div></div>';
      ev.layer
        .bindPopup(L.Util.template(templateStr2, ev.layer.photo), {
          className: "leaflet-popup-photo",
          minWidth: 400
        })
        .openPopup();
    });
  },
  destroyed() {
    this.data = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.marker {
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
<style lang="scss">
#leaflet-container1 {
  .leaflet-marker-simple-photo {
    width: 24px !important;
    height: 24px !important;
    .simple-photo {
      width: 100%;
      height: 100%;
    }
  }
}

#leaflet-container2 {
  .leaflet-marker-pane {
    .leaflet-marker-photo {
      .photo-zdkh-img {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
      }
      .photo-swzx-img,
      .photo-hydw-img,
      .photo-protected-img {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        background-blend-mode: color;
        position: relative;
        .afxt-img {
          position: absolute;
          bottom: -10px;
          right: -10px;
        }
      }
      .photo-caption {
        font-size: 15px;
        // border: 1px solid #81d4fa;
        line-height: 20px;
        color: #fff;
        background-color: #0a2542e6;
        // background: -webkit-linear-gradient(#1884ac, #00244e);
        text-align: center;
        width: 160px;
        margin-top: -20px;
        margin-left: -52px;
      }
      .photo-num {
        color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 14px;
        background-color: red;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 1.5;
        border-radius: 50%;
        font-weight: normal;
        z-index: 9999999;
      }
    }
  }
}
</style>

