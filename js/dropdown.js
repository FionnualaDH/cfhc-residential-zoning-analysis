var populateDropdown = function(data) {

  for (var town in data) {
    $('select').append('<option name="' + town + '">' + town + '</option>')
  }

  $('select').on('change', function() {
    var town = $(this).val()

    $('#dropdownZoningReg').html([
      // Zones (# and %) that allow different types of housing
      '<b>Number of zones that allow</b> <br>- any residences: ',
      data[town]['Number of Zones that Allow: Any Residences'],
      ' (' + data[town]['Percentage of Total Number of Zones Allowing for Single Family Homes'] + '%)',
      '<br>- two-family housing: ',
      data[town]['Number of Zones that Allow: Two-Family Housing'],
      ' (' + data[town]['Percentage of Total Number of Zones Allowing two family homes or duplexes'] + '%)',
      '<br>- multifamily housing: ',
      data[town]['Number of Zones that Allow: Multifamily Housing'],
      ' (' + data[town]['Percentage of Total Number Zones Allowing Multifamily'] + '%)',
      '<br>- affordable housing: ',
      data[town]['Number of Zones that Allow: Affordable Housing'],
      ' (' + data[town]['Percentage of Total Number Zones Allowing For Affordable Housing for Families'] + '%)',  
      '<br>- elderly housing: ',
      data[town]['Number of Zones that Allow: Elderly Housing'],
      ' (' + data[town]['Percentage of Total Number of Zones Allowing Elderly Housing'] + '%)',
      // Minimum Lot Size
      '<br><br><b>Minimum lot size (in acres)</b>',
      '<br>- single-family: ' + data[town]['Minimum Lot Size in Acres: Single Family'],
      '<br>- two-family: ' + data[town]['Minimum Lot Size in Acres: Two Family'],
      '<br>- multifamily: ' + data[town]['Minimum Lot Size in Acres: Multi-family'],
      '<br>- affordable: ' + data[town]['Minimum Lot Size in Acres: Affordable Housing'],
      '<br>- elderly: ' + data[town]['Minimum Lot Size in Acres: Elderly Housing'],
      // Maximum density
      '<br><br><b>Maximum density (units per acre)</b>',
      '<br>- two-family: ' + data[town]['Maximum Density (units per acre): Two-Family'],
      '<br>- multifamily: ' + data[town]['Maximum Density (units per acre): Multifamily'],
      '<br>- affordable: ' + data[town]['Maximum Density (units per acre): Affordable Housing'],
      '<br>- elderly: ' + data[town]['Maximum Density (units per acre): Elderly Housing'],
      // Multifamiy Housing allowed?
      '<br><br><b>Multifamily housing permitted?</b> ' + data[town]['Multifamily Housing Permitted?'],
    ].join(''))

    $('#dropdownDemographic').html([
      '<b>Median Household Income:</b> $'
        + parseInt(data[town]['Median Household Income (ACS2017)']).toLocaleString(),
      '<b>Median Home Value:</b> $'
        + parseInt(data[town]['Median Home Value (ACS2017)']).toLocaleString(), 
      '<b>Median Rent:</b> $'
        + parseInt(data[town]['Median Rent (ACS2017)']).toLocaleString(),
      '<b>Nonwhite Population:</b> '
        + data[town]['Nonwhite Population (ACS2017)'] + '%',
    ].join('<br>'))

  })

  $('select').val('Hartford').trigger('change')

}