
//Define map start up options, here defined to center on Italy
		var mapOptions = {
			center: [41.8875, 12.72], //set center
			zoom: 7 , //set initial zoom
			maxZoom : 10,  //set max zoom
			}

//Creates Map according to map options
		var map = new L.map('map', mapOptions);


//Examples of an externally called tiled basemap
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}).addTo(map);


//Example of a localled called tiled basemap created from a .geotiff  using gdal2tiles (workflow available)


			var backgroundMap = L.tileLayer('./QTiler_test/TabulaItaliae/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 0, maxZoom: 10}).addTo(map);

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

					} //allows for link to external URL via attribute in .geoJson table

					l.bindPopup(out.join("<br />"));
				};
