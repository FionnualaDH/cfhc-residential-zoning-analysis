$(document).ready(function() {

  $.getJSON('data/ct.geojson', function(geojson) {

    var parse = function(res) {
      return Papa.parse(Papa.unparse(res[0].values), {header: true} ).data;
    }
  
    var apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/'
    var spreadsheetId = '1k34JgjzB44APwU4iDwtb0Rv2T8goYRbsrkBll5K--38'
    var k = 'AIzaSyCRir9fvPmi-ys_IbtHz7DCGxeXP9Kg0G8'

    $.when(
      $.getJSON(apiUrl + spreadsheetId + '/values/Zoning%20Regulations?key=' + k),
      $.getJSON(apiUrl + spreadsheetId + '/values/Definitions&Sources?key=' + k),
    ).then(function(regulations, definitions) {

      // Create a data object where key = Municipality
      var zoningRegs = {};
      parse(regulations).map(function(el) {
        zoningRegs[el.Municipality] = el;
      });

      addDefinitions(parse(definitions));
      populateLotDensity(zoningRegs);

      var map1 = populateMap('map1', zoningRegs, geojson);
      var map2 = populateMap('map2', zoningRegs, geojson);

      map1.sync(map2);
      map2.sync(map1);

      populateExplore(zoningRegs);
      populateScatterplot(zoningRegs);

      $('#toggleDefinitions').click(function() {
        if ( $('dl').hasClass('dn') ) {
          $('#toggleDefinitions').text('Hide definitions');
          $('dl').removeClass('dn').addClass('db');
        } else {
          $('#toggleDefinitions').text('Show definitions');
          $('dl').removeClass('db').addClass('dn');
        }
      });

      var headroom  = new Headroom(document.querySelector('nav'));
      headroom.init(); 

    })

  });

});