
//Define map start up options, here defined to center on Italy
		var mapOptions = {
			center: [41.8875, 12.72], //set center
			zoom: 6 , //set initial zoom
			maxZoom : 12,  //set max zoom
			minZoom : 5,
			maxBounds: [ [-90, -180] , [90,180] ]
			}

//Creates Map according to map options
		var map = new L.map('map', mapOptions);


//Examples of an externally called tiled basemap
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}).addTo(map);


//Example of a localled called tiled basemap created from a .geotiff  using gdal2tiles (workflow available)
			var tabulaItaliae = L.tileLayer('./QTiler_test/TabulaItaliae/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 0, maxZoom: 10}).addTo(map);
			var cities = L.geoJson(italianCities, {
				onEachFeature: popUp
			});
			var baseLayers = {
				"Satellite Imagery" : Esri_WorldImagery,
				};

			var overlayMaps = {
				"Tabula Italiae" : tabulaItaliae,
				};
				L.control.layers(baseLayers, overlayMaps).addTo(map);

//Lets you see lat/long in the console window. Useful for placing non-georeferenced maps in the correct location or for placing markers
			map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
			});


//Specialized Function to allow for popup box containing attributes of Gabii .geojson
			function popUp(f,l){
				var out = [];
				if (f.properties){
					out.push('<b>City: </b>' + f.properties.city);
					out.push('<a href="'+ f.properties.link + '" target="_blank">Link to City Page</a>');
					} //allows for link to external URL via attribute in .geoJson table

					l.bindPopup(out.join("<br />"));
				};

				L.control.pan().addTo(map);
				L.control.scale().addTo(map);
