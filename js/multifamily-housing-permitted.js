// Map 1
function multifamilyHousingPermitted(data, geojson) {

  var map = L.map('multifamily-housing-permitted', {
    center: [41.50, -72.68],
    zoom: 9,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false,
    preferCanvas: true,
  })

  var Stamen_TonerBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

  var getColor = function(town) {
    console.log(town)
    var val2color = {
      'No': '#fc8d62',
      'By special permit': '#ffffb3',
      'Allowed by right': '#8dd3c7'
    }

    return data[town] && val2color[data[town]['Multifamily Housing Permitted?']]
      ? val2color[data[town]['Multifamily Housing Permitted?']]
      : '#cccccc'
  }

  var geojsonLayer = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      
      layer
        .bindPopup(
          [
            '<b>' + town + '</b>',
            'Multifamily Housing: ' + data[town]['Multifamily Housing Permitted?'],
            data[town]['Notes (data reviewed May 2013)']
          ].join('<br>')
        )
        .on('mouseover', function(e) {
          this.openPopup()
          this.setStyle({'fillOpacity': 0.5})
        })
        .on('mouseout', function(e) {
          this.closePopup()
          this.setStyle({'fillOpacity': 0.95})
        })
    },
    style: function(feature) {
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 0.95,
        fillColor: getColor(feature.properties.Town)
      }
    }
  }).addTo(map);

  map.fitBounds(geojsonLayer.getBounds())

  console.log(data)

}