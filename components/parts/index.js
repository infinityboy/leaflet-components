// eslint-disable-next-line
/* eslint-disable */

/*
 * @Author: svt.dzc 
 * @Date: 2019-03-04 10:46:20 
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-03-06 15:23:55
 */


/**
 * 
 * @param {Array: <[lat, lng]>} coord 
 * @param {String: <html>} html 
 * @return {Object} 
 */
const designPopup = function (coord, html) {
    const popup = L.popup()
    .setLatLng(L.latLng(coord[1], coord[0]))
    .setContent(html)
    return popup
}

/**
 * 
 * @param {{Array: <[lat, lng]>}} latlng 
 * @param {Object} options 
 */
const createMaker = function (latlng, options) {
    return new L.marker(latlng, options);
}

/**
 * 
 * @param {Object} options 
 */
const createIcon = function (options) {
    return L.icon(options)
}

/**
 * 
 * @param {String} htmlStr 
 */
const createDivIcon = function (htmlStr) {
    return L.divIcon({html: htmlStr})
}

/**
 * 
 * @param {{Array: <[lat, lng]>}} latlng 
 * @param {Object} options 
 */
const createCircleMarker = function (latlng, options) {
    return new L.CircleMarker(latlng, options)
}

/**
 * 
 * @param {Object} options 
 */
const plottingCcale = function (options) {
    return L.control.scale(options)
}

/**
  * 
  * @param {obj} obj 
  */
const controlLayers = function (obj) {
    return L.control.layers(obj)
}
export {
    designPopup,
    createMaker,
    createIcon,
    createDivIcon,
    createCircleMarker,
    plottingCcale,
    controlLayers
 }