$('#submitAddCompany').click(event => {
  //autopopulate the fields if we're modifying
  event.preventDefault()
  let name = $('#name').val()

  let newCompany = { name, user_id: localStorage.getItem('userID')}

  let temp;
  temp.newCompany = newCompany;
      axios.post('/companies', temp)
        .then(() => {
          window.location = 'home'
        });
})