// eslint-disable-next-line
/* eslint-disable */

/*
 * @Author: infinityboy 
 * @Date: 2019-02-21 10:39:59 
 * @Last Modified by: infinityboy
 * @Last Modified time: 2019-03-04 11:16:22
 */

import L from "leaflet"
import 'leaflet/dist/leaflet.css' 
import '../../parts/full-screen/Control.FullScreen.js'
import '../../parts/full-screen/Control.FullScreen.css'

/**
 * 
 * @param {HTMLElement} el 
 * @param {Object} options 
 * @return {Object} 
 */
const createMap = function (el, options) {
    return L.map(el, options)
}


export {
    L,
    createMap,
}