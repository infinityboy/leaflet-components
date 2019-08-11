// eslint-disable-next-line
/* eslint-disable */
/*
 * @Author: svt.dzc 
 * @Date: 2019-02-22 09:50:03 
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-03-06 15:24:38
 */

 import './Control.MiniMap.min.css'
 import './Control.MiniMap.min.js'

 /**
  * 
  * @param {String} url 
  * @param {Object} options 
  */
 const createSmallTilesLayer = function (url, options) {
    return new L.TileLayer(url, options);
 }

 /**
  * 
  * @param {obj} smallTilesLayer 
  * @param {Object} options 
  */
 const createMiniMap = function (smallTilesLayer, options) {
    return new L.Control.MiniMap(smallTilesLayer, options)
 }

 export {
    createSmallTilesLayer,
    createMiniMap,
 }

