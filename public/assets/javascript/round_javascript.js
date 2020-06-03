$('#submitAddRound').click(event => {
  event.preventDefault()
  let type = $('#type').val()
  let amount = $('#amount').val()
  let dateRaised = $('#dateRaised').val()

  let newRound = { type, amount, dateRaised, company_id: JSON.parse(localStorage.getItem('currentCompany')).id}

  axios.post('/addOneRound',newRound)
})