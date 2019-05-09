var addDefinitions = function(data) {

  data.map(function(el) {
    $('dl').append(
      [
        '<dt class="b">',
        el[Object.keys(el)[0]],
        '</dt><dd class="mb2">',
        el[Object.keys(el)[1]],
        '</dd>'
      ].join('')
    )
  })
  
}