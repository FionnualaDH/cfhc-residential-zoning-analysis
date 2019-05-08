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

  // Use Stamen's Toner Background as basemap
  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map)


  // Geojson Layer: Multifamily Housing Permitted
  var mfHousingPermittedKey = 'Multifamily Housing Permitted?'
  var mfHousingPermittedValues = ['No', 'By special permit', 'Allowed by right', 'n/a']
  var mfHousingPermittedColors = ['#fc8d62', '#ffffb3', '#8dd3c7', '#cccccc']

  var mfHousingPermittedColor = function(town) {
    var val = data[town][mfHousingPermittedKey]

    for (var i in mfHousingPermittedValues) {
      if (mfHousingPermittedValues[i] == val) {
        return mfHousingPermittedColors[i]
      }
    }

    return '#cccccc'
  }
  var mfHousingPermitted = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      layer
        .bindTooltip([
          '<b>' + town + '</b>',
          data[town][mfHousingPermittedKey]
        ].join('<br>'))
    },
    style: function(feature) {
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 0.95,
        fillColor: mfHousingPermittedColor(feature.properties.Town)
      }
    }
  })

  const jenksColors = ['#fc8d62', '#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837']

  // Geojson Layer: % Zones Allowing Multifamily Housing
  var mfHousingZonesKey = 'Percentage of Total Number Zones Allowing Multifamily'
  var mfHousingZonesValues = Object.values(data)
    .map(function(a) {return parseFloat(a[mfHousingZonesKey]) || 0})
  var mfHousingZonesJenks = new geostats(mfHousingZonesValues).getClassJenks(5)

  var mfHousingZonesColor = function(town) {
    var val = parseFloat(data[town][mfHousingZonesKey])
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
        .bindTooltip([
          '<b>' + town + '</b>',
          data[town][mfHousingZonesKey] ? data[town][mfHousingZonesKey] + '%' : 'No data'
        ].join('<br>'))
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


  // Geojson Layer: % Affordable Housing
  var affordableHousingKey = 'Town: Percent of Housing Stock Considered Affordable, 8-30g (2011)'
  var affordableHousingValues = Object.values(data)
    .map(function(a) {return parseFloat(a[affordableHousingKey]) || 0})
  var affordableHousingJenks = new geostats(affordableHousingValues).getClassJenks(5)

  var affordableHousingColor = function(town) {
    var val = parseFloat(data[town][affordableHousingKey])
    for (var i in affordableHousingJenks) {
      if (val <= affordableHousingJenks[i]) {
        return jenksColors[i]
      }
    }
    return '#cccccc'
  }
  var affordableHousing = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      layer
        .bindTooltip([
          '<b>' + town + '</b>',
          data[town][affordableHousingKey] + '%'
        ].join('<br>'))
    },
    style: function(feature) {
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 0.95,
        fillColor: affordableHousingColor(feature.properties.Town)
      }
    }
  })

  // Geojson Layer: Median Home Value (ACS2017)
  var medianHomeValueKey = 'Median Home Value (ACS2017)'
  var medianHomeValueValues = Object.values(data)
    .map(function(a) {return parseFloat(a[medianHomeValueKey]) || 0})
  var medianHomeValueJenks = new geostats(medianHomeValueValues).getClassJenks(5)

  var medianHomeValueColor = function(town) {
    var val = parseFloat(data[town][medianHomeValueKey])
    for (var i in medianHomeValueJenks) {
      if (i == 0) continue
      if (val <= medianHomeValueJenks[i]) {
        return jenksColors[i]
      }
    }
    return '#cccccc'
  }
  var medianHomeValue = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      layer
        .bindTooltip([
          '<b>' + town + '</b>',
          data[town][medianHomeValueKey] ? '$' + parseInt(data[town][medianHomeValueKey]).toLocaleString() : 'No data'
        ].join('<br>'))
    },
    style: function(feature) {
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 0.95,
        fillColor: medianHomeValueColor(feature.properties.Town)
      }
    }
  })


  // Geojson Layer: Median Rent (ACS2017)
  var medianRentKey = 'Median Rent (ACS2017)'
  var medianRentValues = Object.values(data)
    .map(function(a) {return parseFloat(a[medianRentKey]) || 0})
  var medianRentJenks = new geostats(medianRentValues).getClassJenks(5)

  var medianRentColor = function(town) {
    var val = parseFloat(data[town][medianRentKey])
    for (var i in medianRentJenks) {
      if (i == 0) continue
      if (val <= medianRentJenks[i]) {
        return jenksColors[i]
      }
    }
    return '#cccccc'
  }
  var medianRent = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      layer
        .bindTooltip([
          '<b>' + town + '</b>',
          data[town][medianRentKey] ? '$' + parseInt(data[town][medianRentKey]).toLocaleString() : 'No data'
        ].join('<br>'))
    },
    style: function(feature) {
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 0.95,
        fillColor: medianRentColor(feature.properties.Town)
      }
    }
  })


  // Geojson Layer: Median Household Income (ACS2017)
  var medianHouseholdIncomeKey = 'Median Household Income (ACS2017)'
  var medianHouseholdIncomeValues = Object.values(data)
    .map(function(a) {return parseFloat(a[medianHouseholdIncomeKey]) || 0})
  var medianHouseholdIncomeJenks = new geostats(medianHouseholdIncomeValues).getClassJenks(5)

  var medianHouseholdIncomeColor = function(town) {
    var val = parseFloat(data[town][medianHouseholdIncomeKey])
    for (var i in medianHouseholdIncomeJenks) {
      if (i == 0) continue
      if (val <= medianHouseholdIncomeJenks[i]) {
        return jenksColors[i]
      }
    }
    return '#cccccc'
  }
  var medianHouseholdIncome = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      layer
        .bindTooltip([
          '<b>' + town + '</b>',
          data[town][medianHouseholdIncomeKey] ? '$' + parseInt(data[town][medianHouseholdIncomeKey]).toLocaleString() : 'No data'
        ].join('<br>'))
    },
    style: function(feature) {
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 0.95,
        fillColor: medianHouseholdIncomeColor(feature.properties.Town)
      }
    }
  })

  // Geojson Layer: % Nonwhite Population (ACS2017)
  var nonwhiteKey = 'Nonwhite Population (ACS2017)'
  var nonwhiteValues = Object.values(data)
    .map(function(a) {return parseFloat(a[nonwhiteKey]) || 0})
  var nonwhiteJenks = new geostats(nonwhiteValues).getClassJenks(5)

  var nonwhiteColor = function(town) {
    var val = parseFloat(data[town][nonwhiteKey])
    for (var i in nonwhiteJenks) {
      if (i == 0) continue
      if (val <= nonwhiteJenks[i]) {
        return jenksColors[i]
      }
    }
    return '#cccccc'
  }
  var nonwhite = L.geoJSON(geojson, {
    onEachFeature: function(feature, layer) {
      var town = feature.properties.Town
      layer
        .bindTooltip([
          '<b>' + town + '</b>',
          data[town][nonwhiteKey] ? parseInt(data[town][nonwhiteKey]).toLocaleString() + '%' : 'No data'
        ].join('<br>'))
    },
    style: function(feature) {
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 0.95,
        fillColor: nonwhiteColor(feature.properties.Town)
      }
    }
  })

  // Add Layers control 
  var layersControl = L.control.layers(
    {
      'Multifamily Housing Permitted': mfHousingPermitted,
      '% Zones Allowing Multifamily Housing': mfHousingZones,
      '% Affordable Housing': affordableHousing,
      'Median Household Income, $': medianHouseholdIncome,
      'Median Home Value, $': medianHomeValue,
      'Median Rent, $': medianRent,
      'Nonwhite Population, %': nonwhite,
    }, {}, {
      collapsed: false,
      position: 'topleft',
    }).addTo(map)

    $('#map1 input[name="leaflet-base-layers"]').attr('name', 'leaflet-base-layers-map1')

  // Center map
  var centerMap = function() {
    map.fitBounds(mfHousingPermitted.getBounds())
  }

  var legend = L.control({position: 'topleft'})
  legend.onAdd = function(map) {
    return L.DomUtil.create('div', 'legend bg-white outline black-70 pa1 ' + mapid)
  }

  legend.addTo(map)

  map.on('baselayerchange', function(e) {

    var breakpoints
    var colors = jenksColors
    var prefixes = true
    var prefixFirst = ''

    switch (e.name) {
      case 'Multifamily Housing Permitted':
        breakpoints = mfHousingPermittedValues
        colors = mfHousingPermittedColors
        prefixes = false
        break
      case '% Zones Allowing Multifamily Housing':
        breakpoints = mfHousingZonesJenks
        prefixFirst = '='
        break
      case '% Affordable Housing':
        breakpoints = affordableHousingJenks
        prefixFirst = '='
        break
      case 'Median Home Value, $':
        breakpoints = medianHomeValueJenks.slice(1)
        colors = jenksColors.slice(1)
        prefixFirst = '&leq;'
        break
      case 'Median Rent, $':
        breakpoints = medianRentJenks.slice(1)
        colors = jenksColors.slice(1)
        prefixFirst = '&leq;'
        break
      case 'Median Household Income, $':
        breakpoints = medianHouseholdIncomeJenks.slice(1)
        colors = jenksColors.slice(1)
        prefixFirst = '&leq;'
        break
      case 'Nonwhite Population, %':
        breakpoints = nonwhiteJenks.slice(1)
        colors = jenksColors.slice(1)
        prefixFirst = '&leq;'
        break
    }
    
    var classes = breakpoints.map(function(el, i) {
      return '<div class="dib w1" style="background-color: '
        + colors[i]
        + '">&nbsp;</div> '
        + (prefixes ? (i == 0 ? prefixFirst : '&leq;') : '')
        + el.toLocaleString()
    })

    $('.legend.' + mapid).html(classes.join('<br>'))
  })

  if (mapid === 'map1') {
    mfHousingPermitted.addTo(map)
  } else {
    mfHousingZones.addTo(map)
  }

  centerMap()

  return map

}