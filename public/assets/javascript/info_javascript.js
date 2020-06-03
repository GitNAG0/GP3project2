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
  var options = { 'title': 'Total Funding by Round (in k$)'};

  // Display the chart inside the <div> element with id="piechart"
  //only if we're on the correct page
  console.log(window.location)
  if(window.location.pathname == '/'){
    var chart = new google.visualization.PieChart(document.getElementById('charts'));
    chart.draw(data, options);
  }
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
    newListItem.addClass("list-group-item companyBtn");
    newListItem.attr('id',element.name);
    $('#companies').append(newListItem);
  });

  //re-add event listeners
  $('.companyBtn').click(function (event) {
    event.preventDefault;
    axios.get('/getOneCompany', { name: this.id })
      .then(({ data }) => {
        generateCompanyProfile(data)
      })
  });
};

$(document).ready(function () {
  // getCompanies(localStorage.getItem('username'),createCompanyList);
  // uncomment when sign-in and routes get built
  addAddModifyDeleteListeners()
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
    newListItem.addClass("list-group-item peopleBtn");
    newListItem.attr('id', name);
    $('#people').append(newListItem);
  });
};

//Need to call getPeople when a new company is selected

//Select a new company
//IMPORTANT: the definition HAS to stay a regular function, not an arrow function. We need this to 
//be the button so we get the appropriate ID. An arrow function will skip a this context.
$('.companyBtn').click(function (event) {
  event.preventDefault;
  axios.get('/getOneCompany',{name: this.id})
  .then(({data}) => {
    generateCompanyProfile(data)
  })
});

//generate company profile given a company object

{/* 
<div class="row text-center mb-2">
  <div class="col">
    <h1>{{ companyName }}</h1>
  </div>
</div>
<div class="row">
  <div class="col-md-6">
    <div id="charts" class="chart mt-3"></div>
  </div>
  <div class="col-md-6">
    <div id="lastRound" class="m-3">
      <h4>Last Round Raised</h4>
        <p>Type: {{ lastRoundType }}</p>
        <p>Amount: {{ lastRoundAmount }}</p>
        <button class="btn btn-success" id="addRound">Add round</button>
        <button class="btn btn-warning" id="modifyRound">Modify round</button>
        <button class="btn btn-danger" id="deleteRound">Delete round</button>
      </div>
      <div id="team" class="m-3">
        <h4>Selected Person</h4>
        <div id="person">
          <h6>Josh Joshisson</h6>
          <p>Role: CEO</p>
          <p>Experience: Business, Marketing</p>
          <button class="btn btn-success" id="addPerson">Add person</button>
          <button class="btn btn-warning" id="modifyPerson">Modify person</button>
          <button class="btn btn-danger" id="deletePerson">Delete person</button>
        </div>
      </div>
    </div>
  </div> */}
function generateCompanyProfile(anObject) {
  //we can do this intelligently!
  //with handlebars templating!
  let { name } = anObject;
  localStorage.setItem('currentCompany', JSON.stringify(anObject));

  //get last round data
  axios.get('/getLastRound',name)
  .then(({data}) => {
    //render page with last round data
    axios.get('/', { companyName: name, lastRoundType: data.type, lastRoundAmount: data.amount })
    .then(junk => {
      getPeople(name,createPeopleList); //create people list
      //add event listener to people buttons
      $('.peopleBtn').click(function (event) {
        event.preventDefault;
        let lastname = this.id.split(' ')[1];
        axios.get('/getOnePerson', { lastname })
          .then(({ data }) => {
            generatePersonProfile(data);
          })
      });
      //clear person div
      $('#person').html('');
      //we can put a person in there when they select a person from the list
    });
  });
};

//add event listener to people buttons
$('.peopleBtn').click(function (event) {
  event.preventDefault;
  let lastname = this.id.split(' ')[1];
  axios.get('/getOnePerson', { lastname })
    .then(({ data }) => {
      generatePersonProfile(data);
    })
});

function generatePersonProfile(anObject) {
  $('#person').html(`
    <h6>${anObject.firstname} ${anObject.lastname}</h6>
    <p>Role: ${anObject.role}</p>
    <p>Experience: ${anObject.experience}</p>
    <button class="btn btn-success" id="addPerson">Add person</button>
    <button class="btn btn-warning" id="modifyPerson">Modify person</button>
    <button class="btn btn-danger" id="deletePerson">Delete person</button>
    `);
  localStorage.setItem('currentPerson',JSON.stringify(anObject));
}

function addAddModifyDeleteListeners(){
  $('#addRound').click((event) => {
    window.location = 'roundForm';
  });
  // $('#modifyRound')
  // $('#deleteRound')
  $('#addPerson').click((event) => {
    window.location = 'personForm';
    localStorage.setItem('action', 'add');
  });
  $('#modifyPerson').click((event) => {
    window.location = 'personForm';
    localStorage.setItem('action', 'modify');
  });
  $('#deletePerson').click((event) => {
    axios.delete('/deleteOnePerson',JSON.parse(localStorage.getItem('currentPerson')).lastname);
  });
}