// eslint-disable-next-line
/* eslint-disable */
/*
 * @Author: svt.dzc 
 * @Date: 2019-02-21 10:41:29 
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-03-11 13:53:53
 */
import './leaflet-tilelayer-colorizr'
 /**
  * 
  * @param {String: <string>} url 
  * @param {Object: <{}>} options 
  * @return {Object} 
  */
const createBaseTileLayer = function (url, options) {
    return L.tileLayer(
        url,
        options
    )
}

/**
  * 
  * @param {String: <string>} url 
  * @param {Object: <{}>} options 
  * @return {Object} 
  */
const createColorTileLayer = function (url, options) {
    return L.tileLayer.colorizr(
        url,
        options
    )
}

export {
    createBaseTileLayer,
    createColorTileLayer
}