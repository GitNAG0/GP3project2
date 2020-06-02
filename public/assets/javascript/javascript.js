//Google charts stuff (copied from online)

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

$(window).resize(function () { location.reload(); });

//from https://stackoverflow.com/questions/14915653/refresh-page-on-resize-with-javascript-or-jquery
//reloads the page on resize in order to resize the google chart

//Function to get all companies on pageload
function getCompanies(username,cb) {
  axios.get('/getAllCompaniesUser',{username})
  .then(({data}) => {
    cb(data);
  });
};


//Function to create a Bootstrap list from an array of company objects
function createCompanyList(data) {
  //clear company list
  $('#companies').html('');

  //Create new elements for each item in the company list, and add them to the page
  data.forEach(element => {
      //<button class="list-group-item list-group-item-action">Apple Inc.</button>
    let newListItem = $('<button></button>').text(element.name);
    newListItem.addClass("list-group-item");
    newListItem.attr('id',element.name);
    $('#companies').append(newListItem);
  });
};

$(document).ready(function () {
  // getCompanies(localStorage.getItem('username'),createCompanyList);
  // uncomment when sign-in and routes get built
});


//Function to get all people from a company
function getPeople(company, cb) {
  axios.get('/getOneCompanyPeople', { name: company })
  .then(({ data }) => {
    cb(data);
  });
};


//Function to create a Bootstrap list from an array of people objects
function createPeopleList(data) {
  //clear people list
  $('#people').html('');

  //Create new elements for each item in the people list, and add them to the page
  data.forEach(element => {
    let name = element.firstname + ' ' + element.lastname
    //<button class="list-group-item list-group-item-action">Apple Inc.</button>
    let newListItem = $('<button></button>').text(name);
    newListItem.addClass("list-group-item");
    newListItem.attr('id', name);
    $('#people').append(newListItem);
  });
};

//Need to call getPeople when a new company is selected