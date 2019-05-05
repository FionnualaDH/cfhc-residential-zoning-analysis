// Map with all layers
function populateMap(mapid, data, geojson) {

  var map = L.map(mapid, {
    center: [41.50, -72.68],
    zoom: 9,
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false,
  })

  L.control.zoom({position: 'topright'}).addTo(map)

  var Stamen_TonerBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  var mfHousingPermittedColor = function(town) {
    var val2color = {
      'No': '#fc8d62',
      'By special permit': '#ffffb3',
      'Allowed by right': '#8dd3c7'
    }

    return data[town] && val2color[data[town]['Multifamily Housing Permitted?']]
      ? val2color[data[town]['Multifamily Housing Permitted?']]
      : '#cccccc'
  }

  // Multifamily Housing Permitted
  var mfHousingPermitted = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      layer
        .bindTooltip(town)
    },
    style: function(feature) {
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 0.95,
        fillColor: mfHousingPermittedColor(feature.properties.Town)
      }
    }
  }).addTo(map);

  const jenksColors = ['#fc8d62', '#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837']

  // % Zones Allowing Multifamily Housing
  var mfHousingZonesValues = Object.values(data)
    .map(function(a) {return parseFloat(a['Percentage of Total Number Zones Allowing Multifamily']) || 0})
  var mfHousingZonesJenks = new geostats(mfHousingZonesValues).getClassJenks(5)

  var mfHousingZonesColor = function(town) {
    var val = parseInt(data[town]['Percentage of Total Number Zones Allowing Multifamily'])

    for (var i in mfHousingZonesJenks) {
      if (val <= mfHousingZonesJenks[i]) {
        return jenksColors[i]
      }
    }

    return '#cccccc'
  }
  var mfHousingZones = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      layer
        .bindTooltip(town)
    },
    style: function(feature) {
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 0.95,
        fillColor: mfHousingZonesColor(feature.properties.Town)
      }
    }
  })

  // Add Layers control 
  L.control.layers(
    {
      "Multifamily Housing Permitted": mfHousingPermitted,
      "% Zones Allowing Multifamily Housing": mfHousingZones
    }, {}, {
      collapsed: false,
      position: 'topleft',
    }).addTo(map)

  // Center map
  map.fitBounds(mfHousingPermitted.getBounds())

  return map;

}