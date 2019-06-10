var generateVisual = function(lotsize, density) {
  var homeIcon = '\
    <svg id="i-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
      <path d="M12 20 L12 30 4 30 4 12 16 2 28 12 28 30 20 30 20 20 Z" />\
    </svg>';

  var homes = homeIcon.trim().repeat(parseInt(density))
  var homesText = density == '' ? 'no data on max density' : ' max <b>' + density + '</b> units per acre'
  if (density === '') {
    homes = '<span class="light-gray">' + homeIcon + '</span>'
  } else if (parseFloat(density) - parseInt(density) > 0.05) {
    homes = homes + '<span class="black-50">' + homeIcon.trim() + '</span>'
  }
  homes += ' '


  var lotsizeFull = parseInt(lotsize)
  var lotsizePart = parseFloat(lotsize) - parseInt(lotsize)
  var acresText = lotsize === '' ? 'no data on min lot size' : 'min <b>' + lotsize + '</b> acres'
  acresText = '<div class="fl mt1 f6 black-80">' + acresText + '</div>'
  
  var lotsizePartWidth = ''
  if (lotsizePart > 0.05) {
    lotsizePartWidth = lotsizePart <= 0.30 ? 'w1'
      : lotsizePart <= 0.60 ? 'w2'
      : lotsizePart <= 0.90 ? 'w3'
      : 'w4'
  }

  var acreIconFull = '<div class="bg-green fl mr1 mt1 pl1 w4 white">&nbsp;</div>'
  var acreIconPart = '<div class="' + (lotsize === '' ? 'bg-light-gray' : 'bg-light-green') + ' fl mr1 mt1 pl1 ' + lotsizePartWidth + '">&nbsp;</div>'
  var acres = acreIconFull.repeat(lotsizeFull) + (lotsizePartWidth === '' && lotsizeFull > 0 ? '' : acreIconPart)

  return [
    '<div class="pv1 cf"><div class="w-100">',
    homes,
    '<span class="black-80 f6 dib v-mid pb2">' + homesText + '</span>',
    '</div> <div class="w-100">',
    acres,
    acresText,
    '</div></div>'
  ].join('')

}

var generateLotSizeTable = function(data) {
  for (var town in data) {
    $('#lotSizes').append('<h4 class="f4 mb0">' + town + '</h4>')
    $('#lotSizes').append(generateVisual(
      data[town]['Minimum Lot Size in Acres: Multi-family'],
      data[town]['Maximum Density (units per acre): Multifamily'],
    ))
  }
  $('#lotSizes').append('<br><br><br>')
}