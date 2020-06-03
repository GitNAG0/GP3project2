$(document).ready(function () {
  //autopopulate the fields if we're modifying
  if (localStorage.getItem('action') === 'modify') {
    let roundToModify = JSON.parse(localStorage.getItem('currentRound'));
    for (let property in roundToModify) {
      $(`#${property}`).val(roundToModify.property);
    };
  };
});

$('#submitAddRound').click(event => {
  //autopopulate the fields if we're modifying
  event.preventDefault()
  let type = $('#type').val()
  let amount = $('#amount').val()
  let dateRaised = $('#dateRaised').val()

  let newRound = { type, amount, dateRaised, company_id: JSON.parse(localStorage.getItem('currentCompany')).id}

  switch (localStorage.getItem('action')) {
    case 'add':
      axios.post('/addOneRound', newRound)
        .then(() => {
          window.location = 'home'
        })
      break;
    case 'modify':
        let reqBody = {
          id: localStorage.getItem('currentRound')).id
          person: newRound
        };
        axios.put('/updateOneRound', reqBody)
          .then(() => {
            window.location = 'home'
          });
      break;

    default:
      break;
})