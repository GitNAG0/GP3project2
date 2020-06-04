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
    firstname: $('#firstname').val()
    lastname: $('#lastname').val()
    role: $('#role').val()
    experience: $('#experience').val()
    company_id: JSON.parse(localStorage.getItem('currentCompany')).id
  };
  
  let temp;

  temp.newPerson = newPerson;

  switch (localStorage.getItem('action')) {
    case 'add':
      axios.post('/api/createOnePerson',temp)
        .then(() => {
          window.location = 'home'
        });
      break;
    case 'modify':
        let reqBody = {
          id: JSON.parse(localStorage.getItem('currentPerson')).id
          person: newPerson
        };
        axios.put('/api/updateOnePerson',reqBody)
        .then(() => {
          window.location = 'home'
        });
      break;

    default:
      break;
  }
})