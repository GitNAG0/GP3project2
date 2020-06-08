$(document).ready(function () {
  //autopopulate the fields if we're modifying
  if(localStorage.getItem('action') === 'modify'){
    let personToModify = JSON.parse(localStorage.getItem('currentPerson'));
    for(let property in personToModify){
      $(`#${property}`).val(personToModify.property);
    };
  };
});


$('#submitAddPerson').click(event => {
  event.preventDefault();
  //create person
  let newPerson = {
    firstname: $('#firstname').val(),
    lastname: $('#lastname').val(),
    role: $('#role').val(),
    experience: $('#experience').val(),
    CompanieId: JSON.parse(localStorage.getItem('currentCompany')).id
  };

  switch (localStorage.getItem('action')) {
    case 'add':
      axios.post('/api/people',newPerson)
        .then(() => {
          window.location = 'info'
        });
      break;
    case 'modify':
      axios.put(`/api/person/${JSON.parse(localStorage.getItem('currentPerson')).id}`,newPerson)
        .then(() => {
          window.location = 'info'
        });
      break;

    default:
      break;
  }
})