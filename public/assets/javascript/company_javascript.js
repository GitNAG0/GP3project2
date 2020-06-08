$('#submitAddCompany').click(event => {
  //autopopulate the fields if we're modifying
  event.preventDefault()
  let name = $('#name').val()

  let newCompany = { companyName: name, UserId: localStorage.getItem('userID')}


  // let temp;
  // temp.newCompany = newCompany;
      axios.post('/api/companies',  newCompany)
        .then(() => {
          window.location = 'info'
        });
})
