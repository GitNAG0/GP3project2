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
  let options = { 'title': 'Total Funding by Round (in k$)'};

  // Display the chart inside the <div> element with id="piechart"
  //only if we're on the correct page
  console.log(window.location);
  if(window.location.pathname == '/info'){
    var chart = new google.visualization.PieChart(document.getElementById('charts'));
    chart.draw(data, options);
  }
}

$(window).resize(function () { location.reload(); });

//from https://stackoverflow.com/questions/14915653/refresh-page-on-resize-with-javascript-or-jquery
//reloads the page on resize in order to resize the google chart

//Function to get all companies on pageload
function getCompanies(user_id,cb) {
  axios.get(`/api/companies/${user_id}`)
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
    let newListItem = $('<button></button>').text(element.companyName);
    newListItem.addClass("list-group-item companyBtn");
    newListItem.attr('id',element.id);
    $('#companies').append(newListItem);
  });

  //re-add event listeners
  $('.companyBtn').click(function (event) {
    event.preventDefault;
    axios.get(`/api/getOneCompany/${this.id}`)
      .then(({ data }) => {
        generateCompanyProfile(data);
      });
  });
};

$(document).ready(function () {
  getCompanies(localStorage.getItem('userID'),createCompanyList);
  getPeople(JSON.parse(localStorage.getItem('currentCompany')).id,createPeopleList)
  // uncomment when sign-in and routes get built
  addAddModifyDeleteListeners();
});


//Function to get all people from a company
function getPeople(company_id, cb) {
  console.log(`companie id`,company_id)
  axios.get(`/api/getOneCompanyPeople/${company_id}`)
  .then(({ data }) => {
    console.log(`getPeople axios data`,data)
    cb(data);
  });
};


//Function to create a Bootstrap list from an array of people objects
function createPeopleList(data) {
  //clear people list
  $('#people').html('');

  console.log(`createPeopleList data`,data)
  //Create new elements for each item in the people list, and add them to the page
  data.forEach(element => {
    let name = element.firstName+' '+element.lastName
    //<button class="list-group-item list-group-item-action">Apple Inc.</button>
    let newListItem = $('<button></button>').text(name);
    newListItem.addClass("list-group-item peopleBtn");
    newListItem.attr('id', element.id);
    $('#people').append(newListItem);
  });
};

//Need to call getPeople when a new company is selected

//Select a new company
//IMPORTANT: the definition HAS to stay a regular function, not an arrow function. We need this to 
//be the button so we get the appropriate ID. An arrow function will skip a this context.
$('.companyBtn').click(function (event) {
  event.preventDefault;
  axios.get(`/api/getOneCompany/${this.id}`)
  .then(({data}) => {
    generateCompanyProfile(data)
  });
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
  let { companyName, id } = anObject;
  localStorage.setItem('currentCompany', JSON.stringify(anObject));
  console.log('generating company prof')
  console.log(companyName,id)
  //get last round data
  axios.get(`/api/getLastRound/${id}`)
  .then(({data}) => {
    console.log('got last round')
    console.log(data)
    //render page with last round data
    let myObject = { companyName, lastRoundType: data.type, lastRoundAmount: data.amount }
    console.log(myObject)
    $('#companyName').text(myObject.companyName)
    $('#lastRoundType').text(myObject.lastRoundType)
    $('#lastRoundAmount').text(myObject.lastRoundAmount)
      getPeople(id,createPeopleList); //create people list
      //add event listener to people buttons
      $('.peopleBtn').click(function (event) {
        event.preventDefault;
        axios.get(`/api/people/${this.id}`)
          .then(({ data }) => {
            generatePersonProfile(data);
          })
      });
      //clear person div
      $('#person').html('');
      //we can put a person in there when they select a person from the list
  });
};

//add event listener to people buttons
$('.peopleBtn').click(function (event) {
  event.preventDefault;
  axios.get(`/api/people/${this.id}`)
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
    axios.delete(`/api/people/${JSON.parse(localStorage.getItem('currentPerson')).id}`);
  });
}

//delete round evenet listener to fill out the modal
$('#deleteRound').click(event => {
  event.preventDefault();
  generateDeleteRoundList((string) => {
    $('#deleteRoundList').html('string');
    $('.deleteRoundListBtn').click(function (event) {
      event.preventDefault();
      axios.delete(`/api/rounds/${this.id}`).then(generateDeleteRoundList(doTheThing)); //regenerate list
    });
  })
});

{/* <button type="button" class="list-group-item list-group-item-action active">
  Cras justo odio
          </button>
  <button type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
  <button type="button" class="list-group-item list-group-item-action">Morbi leo risus</button>
  <button type="button" class="list-group-item list-group-item-action">Porta ac consectetur ac</button>
  <button type="button" class="list-group-item list-group-item-action" disabled>Vestibulum at eros</button> */}
  
function doTheThing(data) {
  $("#deleteRoundList").html(data)
}

function generateDeleteRoundList(cb){
  let myArr = [];
  axios.get(`/api/getOneCompanyRounds/${JSON.parse(localStorage.getItem('currentCompany')).id}`)
  .then(({data}) => {
    data.forEach(element => {
      let newString = ` <button type="button" class="list-group-item list-group-item-action deleteRoundListBtn" id = "${element.id}">Type: ${element.type} Amount: ${element.amount}</button>`;
      myArr.push(newString);
    });

    cb(myArr.join('\n'))
  });
};

//modify round evenet listener to fill out the modal
$('#modifyRound').click(event => {
  event.preventDefault();
  generateModifyRoundList((string) => {
    $('#modifyRoundList').html(string);
    $('.modifyRoundListBtn').click(function (event) {
      event.preventDefault();
      localStorage.setItem('action','modify');
      axios.get(`/api/getOneRound/${this.id}`).then(({data}) => {
        localStorage.setItem('currentRound',JSON.stringify(data));
        window.location = roundForm
      });
    });
  })
});

{/* <button type="button" class="list-group-item list-group-item-action active">
  Cras justo odio
          </button>
  <button type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
  <button type="button" class="list-group-item list-group-item-action">Morbi leo risus</button>
  <button type="button" class="list-group-item list-group-item-action">Porta ac consectetur ac</button>
  <button type="button" class="list-group-item list-group-item-action" disabled>Vestibulum at eros</button> */}

function generateModifyRoundList(cb) {
  let myArr = [];
  axios.get(`/api/getOneCompanyRounds/${JSON.parse(localStorage.getItem('currentCompany')).id}`)
    .then(({ data }) => {
      data.forEach(element => {
        let newString = ` <button type="button" class="list-group-item list-group-item-action modifyRoundListBtn" id = "${element.id}">Type: ${element.type} Amount: ${element.amount}</button>`;
        myArr.push(newString);
      });

      cb(myArr.join('\n'));
    });
};

//Add a new company
$('#addCompany').click((event) => {
  window.location = 'companyForm';
});

//delete a company
$('#deleteCompany').click((event) => {
  axios.delete(`/api/deleteOneCompany/${JSON.parse(localStorage.getItem('currentCompany')).id}`);
});


$('#logOut').click(event =>  {
  event.preventDefault()
  window.location = '/'
  localStorage.setItem('userID','null')
})