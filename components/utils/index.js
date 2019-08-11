// eslint-disable-next-line
/* eslint-disable */

/*
 * @Author: svt.dzc 
 * @Date: 2019-03-04 10:45:39 
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-03-06 15:24:21
 */


 /**
 * 
 * @param {Array: <[lat, lng]>} ws 
 * @param {Array: <[lat, lng]>} en 
 * @return {Object} 
 */
const getBounds = function (ws, en) {
    return L.latLngBounds(L.latLng(ws), L.latLng(en))
}

/**
 * 
 * @param {JSON Object} data 
 * @param {Object} options 
 */
const getGeoJson = function (data, options) {
    return L.geoJson(data, options)
}

/**
  * 
  * @param {Array} arr 
  */
const layersGroup = function (arr) {
    return new L.LayerGroup(arr);
}

export {
    getBounds,
    getGeoJson,
    layersGroup
 }