// eslint-disable-next-line
/* eslint-disable */
/*
 * @Author: svt.dzc 
 * @Date: 2018-11-30 11:09:01 
 * @Last Modified by: svt.dzc
 * @Last Modified time: 2019-02-18 17:08:37
 */
L.Photo = L.FeatureGroup.extend({
	options: {
		icon: {						
			iconSize: [40, 40]
		}
	},

	initialize: function (photos, options) {
		L.setOptions(this, options);
		L.FeatureGroup.prototype.initialize.call(this, photos);
	},

	addLayers: function (photos) {
		if (photos) {
			for (var i = 0, len = photos.length; i < len; i++) {
				this.addLayer(photos[i]);
			}
		}
		return this;
	},

	addLayer: function (photo) {	
		L.FeatureGroup.prototype.addLayer.call(this, this.createMarker(photo));
	},

	createMarker: function (photo) {
		// {
		// 	html: '<div class="photo-img" style="background: url(' + photo.thumbnail + ') center;"></div>​<p class="photo-caption">' + photo.caption + '</p>',
		// 	className: 'leaflet-marker-photo'
		// }
		var marker = L.marker(photo, {
			icon: L.divIcon(L.extend({
				html: photo.html,
				className: photo.className
			}, photo, this.options.icon)),
			title: photo.caption || ''
		});		
		marker.photo = photo;
		// marker.fragment = fragment;
		return marker;
	}
});

L.photo = function (photos, options) {
	return new L.Photo(photos, options);
};
if (L.MarkerClusterGroup) {

	L.Photo.Cluster = L.MarkerClusterGroup.extend({
		// {
		// 	className: 'leaflet-marker-photo', 
		// 	html: '<div class="photo-img" style="background: url(' + cluster.getAllChildMarkers()[0].photo.thumbnail + ') center;"></div>​<p class="photo-caption">' + cluster.getAllChildMarkers()[0].photo.caption + '</p><b class="photo-num">' + cluster.getChildCount() + '</b>'
		// }
		options: {
			featureGroup: L.photo,		
			maxClusterRadius: 100,		
			showCoverageOnHover: false,
			iconCreateFunction: function(cluster) {
				return new L.DivIcon(L.extend({
					className: cluster.getAllChildMarkers()[0].photo.className, 
					html: cluster.getAllChildMarkers()[0].photo.html + '<b class="photo-num">' + cluster.getChildCount() + '</b>'
				}, this.icon));
		   	},	
			icon: {						
				iconSize: [40, 40]
			}		   		
		},

		initialize: function (options) {	
			options = L.Util.setOptions(this, options);
			L.MarkerClusterGroup.prototype.initialize.call(this);
			this._photos = options.featureGroup(null, options);
		},

		add: function (photos) {
			this.addLayer(this._photos.addLayers(photos));
			return this;
		},

		clear: function () {
			this._photos.clearLayers();
			this.clearLayers();
		}

	});

	L.photo.cluster = function (options) {
		return new L.Photo.Cluster(options);	
	};
}
