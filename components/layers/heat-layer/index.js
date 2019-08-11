
// eslint-disable-next-line
/* eslint-disable */
/*
 * @Author: infinityboy 
 * @Date: 2019-03-06 11:05:13 
 * @Last Modified by: infinityboy
 * @Last Modified time: 2019-03-06 13:56:35
 */
import './leaflet-heat'

/**
 * 
 * @param {Array} dataArr 
 */
const creatHeatLayer = function (dataArr) {
    return L.heatLayer(dataArr)
}

export {
    creatHeatLayer
}