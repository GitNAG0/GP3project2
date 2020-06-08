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
  event.preventDefault();
  let type = $('#type').val();
  let amount = $('#amount').val();
  let dateRaised = $('#dateRaised').val();

  let newRound = { type, amount, dateRaised, CompanieId: JSON.parse(localStorage.getItem('currentCompany')).id};

  switch (localStorage.getItem('action')) {
    case 'add':
      axios.post('/api/rounds', newRound)
        .then(() => {
          window.location = 'info';
        });
      break;
    case 'modify':
      axios.put(`/api/rounds/${JSON.parse(localStorage.getItem('currentRound')).id}`, newRound)
          .then(() => {
            window.location = 'info';
          });
      break;

    default:
      break;
        }
})
