$(document).ready(function() {

  $.getJSON('data/ct.geojson', function(geojson) {

    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1k34JgjzB44APwU4iDwtb0Rv2T8goYRbsrkBll5K--38/edit?usp=sharing',
      simpleSheet: false,
      callback: function(data, tabletop) {

        // Create a data object where key = Municipality
        var zoningRegs = {};
        data['Zoning Regulations'].elements.map(function(el) {
          zoningRegs[el.Municipality] = el;
        });

        addDefinitions(data['Definitions&Sources'].elements);
        //generateLotSizeTable(zoningRegs);
        populateLotDensity(zoningRegs);

        var map1 = populateMap('map1', zoningRegs, geojson);
        var map2 = populateMap('map2', zoningRegs, geojson);

        map1.sync(map2);
        map2.sync(map1);

        populateExplore(zoningRegs);
      }

    });

  });

});