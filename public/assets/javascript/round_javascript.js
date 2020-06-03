$('#submitAddRound').click(event => {
  event.preventDefault()
  let type = $('#type').val()
  let amount = $('#amount').val()
  let dateRaised = $('#dateRaised').val()

  let newRound = { type amount dateRaised }

  axios.post('/addOneRound',newRound)
})