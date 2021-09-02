
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

		var italianCitiesJSON = {
			"type": "FeatureCollection",
			"name": "italianCities",
			"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::900913" } },
			"features": [
			{ "type": "Feature", "properties": { "id": 1, "Name": "Rome", "URL": "https://library.bc.edu/commedia/rome" }, "geometry": { "type": "Point", "coordinates": [ 1380689.930153855588287, 5159564.977365796454251 ] } },
			{ "type": "Feature", "properties": { "id": 2, "Name": "Ferrara", "URL": "https://library.bc.edu/commedia/ferrara" }, "geometry": { "type": "Point", "coordinates": [ 1256886.210492046782747, 5558615.072752060368657 ] } },
			{ "type": "Feature", "properties": { "id": 3, "Name": "Padua-Venice", "URL": "https://library.bc.edu/commedia/padua-venice" }, "geometry": { "type": "Point", "coordinates": [ 1322544.38202468235977, 5632545.139910855330527 ] } },
			{ "type": "Feature", "properties": { "id": 4, "Name": "Florence", "URL": "https://library.bc.edu/commedia/florence" }, "geometry": { "type": "Point", "coordinates": [ 1253983.51551561220549, 5403891.751440595835447 ] } },
			{ "type": "Feature", "properties": { "id": 5, "Name": "Siena", "URL": "https://library.bc.edu/commedia/siena" }, "geometry": { "type": "Point", "coordinates": [ 1257903.471273115603253, 5335572.522524106316268 ] } },
			{ "type": "Feature", "properties": { "id": 6, "Name": "Mantua", "URL": "https://library.bc.edu/commedia/mantua" }, "geometry": { "type": "Point", "coordinates": [ 1182750.944869787665084, 5608073.891245156526566 ] } },
			{ "type": "Feature", "properties": { "id": 7, "Name": "Urbino", "URL": "https://library.bc.edu/commedia/urbino" }, "geometry": { "type": "Point", "coordinates": [ 1405665.627055709483102, 5384617.960758712142706 ] } }
			]
			};


//Example of a localled called tiled basemap created from a .geotiff  using gdal2tiles (workflow available)
			var tabulaItaliae = L.tileLayer('./QTiler_test/TabulaItaliae/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 0, maxZoom: 10}).addTo(map);
			var cities = L.geoJSON(italianCitiesJSON, {
				onEachFeature: popUp
			}).addTo(map);





			var baseLayers = {
				"Satellite Imagery" : Esri_WorldImagery,
				};

			var overlayMaps = {
				"Tabula Italiae" : tabulaItaliae,
				"Cities" : cities
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
