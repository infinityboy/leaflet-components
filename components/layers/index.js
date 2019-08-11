// eslint-disable-next-line
/* eslint-disable */
/*
 * @Author: infinityboy 
 * @Date: 2019-02-21 10:38:03 
 * @Last Modified by: infinityboy
 * @Last Modified time: 2019-03-11 13:54:26
 */

import { L, createMap } from './base-map'
import { createBaseTileLayer, createColorTileLayer } from './base-tile-layer'
import { createPhotoLayer } from './photo-layer'
import { creatHeatLayer } from './heat-layer'
import { drawStraightLines, createStraightLinesLayerGroup } from './straight-lines-layer'
import { createSmallTilesLayer, createMiniMap } from './eagle-eye'
    

export {
    L,
    createMap,
    createBaseTileLayer,
    createColorTileLayer,
    createPhotoLayer,
    creatHeatLayer,
    drawStraightLines,
    createStraightLinesLayerGroup,
    createSmallTilesLayer,
    createMiniMap,
}