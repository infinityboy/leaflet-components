// eslint-disable-next-line
/* eslint-disable */
/*
 * @Author: svt.dzc 
 * @Date: 2019-02-21 10:44:07 
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-02-21 14:28:28
 */

 import './leaflet.markercluster'
 import './L.Photo'
 
/**
 * 
 * @param {Array: <[宽， 高]>} iconSize 
 * @return {Object} 
 */
 const createPhotoLayer = function (iconSize = [40, 40]) {
     return L.photo.cluster({
        icon: {
          iconSize: iconSize
        }
      })
 }

 export {
    createPhotoLayer
 }
