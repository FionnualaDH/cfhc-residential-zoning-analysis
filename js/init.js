$(document).ready(function() {

  $.getJSON('data/ct.geojson', function(geojson) {

    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1k34JgjzB44APwU4iDwtb0Rv2T8goYRbsrkBll5K--38/edit?usp=sharing',
      simpleSheet: false,
      callback: function(data, tabletop) {

        // Create a data object where key = Municipality
        var zoningRegs = {}
        data['Zoning Regulations'].elements.map(function(el) {
          zoningRegs[el.Municipality] = el
        })

        /*var map1 = multifamilyHousingPermitted(zoningRegs, geojson)
        var map2 = multifamilyPercentZones(zoningRegs, geojson)

        map1.sync(map2)
        map2.sync(map1) */

        addDefinitions(data['Definitions&Sources'].elements)
        generateLotSizeTable(zoningRegs)

        var map1 = populateMap('map1', zoningRegs, geojson)
        var map2 = populateMap('map2', zoningRegs, geojson)

        map1.sync(map2)
        map2.sync(map1)

        populateDropdown(zoningRegs)

        //$('#map1 input[name="leaflet-base-layers"]').attr('name', 'leaflet-base-layers7')

      }
    })

  })

})