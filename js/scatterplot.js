let populateScatterplot = function(data) {

  // Populate dropdowns
  let parameters = {
    '% Zones Allowing Multifamily Housing': 'Percentage of Total Number Zones Allowing Multifamily',
    '% Affordable Housing': 'Town: Percent of Housing Stock Considered Affordable, 8-30g (2011)',
    'Median Household Income, $': 'Median Household Income (ACS2017)',
    'Median Home Value, $': 'Median Home Value (ACS2017)',
    'Median Rent, $': 'Median Rent (ACS2017)',
    'Nonwhite Population, %': 'Nonwhite Population (ACS2017)'
  }

  for (var p in parameters) {
    $('#scatterplot-dropdown-1, #scatterplot-dropdown-2').append('<option name="' + parameters[p] + '">' + p + '</option>');
  }

  // Initialize Chart.js scatterplot
  Chart.defaults.scale.gridLines.color = 'rgba(0,0,0,0)';
  var ctx = document.getElementById('scatterplot').getContext('2d');

  var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        data: [],
        backgroundColor: 'rgba(0,0,0,0.8)'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
          },
          gridLines: {
            zeroLineColor: 'black',
            zeroLineWidth: 1,
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
          },
          gridLines: {
            zeroLineColor: 'black',
            zeroLineWidth: 1,
          }
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function(item, data) {
            return [
              data.datasets[0].data[item.index].name,
              data.datasets[0].data[item.index].yNice + ': ' + item.yLabel,
              data.datasets[0].data[item.index].xNice + ': ' + item.xLabel,
            ];
          }
        }
      }
    },
  });

  // Add event listeners for the dropdowns
  $('#scatterplot-dropdown-1, #scatterplot-dropdown-2').change(function() {
    let val1 = $('#scatterplot-dropdown-1 option:selected').attr('name');
    let val2 = $('#scatterplot-dropdown-2 option:selected').attr('name');
    let val1Nice = $('#scatterplot-dropdown-1').val();
    let val2Nice = $('#scatterplot-dropdown-2').val();

    let series = [];
    for (var town in data) {
      series.push({
        y: data[town][val1] === '' ? null : data[town][val1],
        x: data[town][val2] === '' ? null : data[town][val2],
        name: town,
        yNice: val1Nice,
        xNice: val2Nice,
      })
    }

    scatterChart.data.datasets[0].data = series;
    scatterChart.options.scales.xAxes[0].scaleLabel.labelString = val2Nice;
    scatterChart.options.scales.yAxes[0].scaleLabel.labelString = val1Nice;
    scatterChart.update();

  });

  $('#scatterplot-dropdown-2').val('% Affordable Housing').trigger('change');

  

}