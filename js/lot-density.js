// SVG of Home icon
const homeIcon = '<svg id="i-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentcolor" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 20 L12 30 4 30 4 12 16 2 28 12 28 30 20 30 20 20 Z" /></svg>';

let updateLotDensityVisuals = function(data, town, lotID, densityID) {
  // Get numbers for lot size, number of units
  let minLotSize = parseFloat(data[town]['Minimum Lot Size in Acres: Multi-family']);
  let maxDensity = parseFloat(data[town]['Maximum Density (units per acre): Multifamily']);

  // Generate Lot Size icons
  let lotHTML = '';
  for (var i = 0; i < minLotSize; i++) {
    lotHTML += '<span class="dib h1 w1 bg-green mt1 mr1"></span>';
  }
  lotHTML += '<br>(Minimum ' + minLotSize + ' acres)';
  $(lotID).html(lotHTML);

  // Generate Maximum Density using home icons
  let densityHTML = '';
  for (var i = 0; i < maxDensity; i++) {
    densityHTML += '<span class="blue">' + homeIcon + '</span>';
  }
  densityHTML += '<br>(Maximum ' + maxDensity + ' units per acre)';
  $(densityID).html(densityHTML);
}

let populateLotDensity = function(data) {
  // Add town names to the dropdown
  for (var town in data) {
    $('#lot-density-selector-1, #lot-density-selector-2').append('<option name="' + town + '">' + town + '</option>');
  }

  // Add event listeners to both dropdowns
  $('#lot-density-selector-1').change(function() {
    updateLotDensityVisuals(data, $(this).val(), '#lot-1', '#density-1');
  });
  $('#lot-density-selector-2').change(function() {
    updateLotDensityVisuals(data, $(this).val(), '#lot-2', '#density-2');
  });

  // Set default values for dropdowns
  $('#lot-density-selector-1').val('Hartford').trigger('change');
  $('#lot-density-selector-2').val('Monroe').trigger('change');

}