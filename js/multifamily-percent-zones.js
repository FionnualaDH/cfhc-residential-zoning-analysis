// Map 1
function multifamilyPercentZones(data, geojson) {

  var map = L.map('multifamily-percent-zones', {
    center: [41.50, -72.68],
    zoom: 9,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false,
  })

  var Stamen_TonerBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  var info = L.control();

  info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'bg-yellow black ph2 pv1 f6 ba bw1 b--black measure-narrow')
    this.update()
    return this._div
  };

  info.update = function(town) {
    if (town && data[town]) {
      this._div.innerHTML = [
        '<b>' + town + '</b>',
        data[town]['Percentage of Total Number Zones Allowing Multifamily'] + '%',
        data[town]['Notes (data reviewed May 2013)']
      ].join('<br>')
    } else {
      this._div.innerHTML = [
        '<b>' + 'Hover over town' + '</b>',
        'to view data'
      ].join('<br>')
    }
  };

  info.addTo(map);

  var getColor = function(town) {
    var val = parseInt(data[town]['Percentage of Total Number Zones Allowing Multifamily'])

    return val == 0 ? '#fc8d62'
      : val <= 20 ? '#ffffcc'
      : val <= 40 ? '#c2e699'
      : val <= 60 ? '#78c679'
      : val <= 80 ? '#31a354'
      : '#006837'
  }

  var geojsonLayer = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      
      layer
        .on('mouseover', function(e) {
          info.update(town)
        })

          /*
      layer
        .bindPopup(
          [
            '<b>' + town + '</b>',
            '% of Zones Allowing Multifamily Housing: ' + data[town]['Percentage of Total Number Zones Allowing Multifamily'],
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
        }) */
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

  return map;

}