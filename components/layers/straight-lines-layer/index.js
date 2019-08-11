// eslint-disable-next-line
/* eslint-disable */

/*
 * @Author: svt.dzc 
 * @Date: 2019-02-21 10:47:40 
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-02-21 14:28:42
 */

 /**
  * 
  * @param {Array} dataArr 
  * @param {String: <string>} color 
  * @param {Array: <[lat, lng]>} centerCoord 
  * @return {Array} 
  */
const drawStraightLines = function (dataArr, color, centerCoord) {
    let lines = []
    for (let i = 0; i < dataArr.length; i++) {
        const element = dataArr[i]['coord']
        let weight = dataArr[i]['weight']
        // （把原数据经纬度转换）=> 纬度在前 经度在后
        lines[i] = L.polyline([L.latLng(centerCoord),L.latLng([element[1],element[0]])], {color: color, weight: weight});
    }
    return lines
}

/**
 * 
 * @param {Array} lines 
 * @return {Object} 
 */
const createStraightLinesLayerGroup = function (lines) {
    return L.layerGroup(lines)
}

export {
    drawStraightLines,
    createStraightLinesLayerGroup
}