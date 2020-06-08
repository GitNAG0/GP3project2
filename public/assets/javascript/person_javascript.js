$(document).ready(function () {
  //autopopulate the fields if we're modifying
  console.log('get ready boi')
  if(localStorage.getItem('action') == 'modify'){
    let personToModify = JSON.parse(localStorage.getItem('currentPerson'));
    console.log(personToModify)
    $(`#firstName`).val(personToModify.firstName);
    $(`#lastName`).val(personToModify.lastName);
    $(`#role`).val(personToModify.role);
    $(`#experience`).val(personToModify.experience);

  };
});


$('#submitAddPerson').click(event => {
  event.preventDefault();
  //create person
  let newPerson = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
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
      axios.put(`/api/people/${JSON.parse(localStorage.getItem('currentPerson')).id}`,newPerson)
        .then(() => {
          window.location = 'info'
        });
      break;

    default:
      break;
  }
})