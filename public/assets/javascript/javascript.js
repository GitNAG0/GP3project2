// Load google charts
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Round', 'Funding (in k$)'],
    ['Pre-Seed', 400],
    ['Seed', 1000],
    ['Series A', 2000],
    ['Series B', 5000],
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = { 'title': 'Total Funding by Round'};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('charts'));
  chart.draw(data, options);
}