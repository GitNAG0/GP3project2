const Joi = require('@hapi/joi');

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})

$('#signIn').click(event => {
  event.preventDefault();
  axios.get('/api/users/all')
    .then(({ data }) => {
      let userToVerify = { username: $('#username').val(), password: $('#password').val() };
      $('#username').val('');
      $('#password').val('');
      $('#errDiv').text('');
      let userFound = data.find(element => element.username == userToVerify.username);
      if (userFound) {
        if (userFound.password == userToVerify.password) {
          localStorage.setItem('userID', userFound.id);
          window.location = 'info';
        };
        else {
          $('#errDiv').text('Incorrect password.')
        };
      };
      else {
        $('#errDiv').text('User not found.')
      };
    });
  //verify sign in route
  //use local storage to store active user
  //look in hw14 for passport authentication code
  // goto home
})

$('#signUp').click(event => {
  event.preventDefault();
  axios.get('/api/users/all')
    .then(({ data }) => {
      let userToVerify = { username: $('#username').val(), password: $('#password').val() };
      $('#errDiv').text('');
      let userFound = data.find(element => element.username == userToVerify.username);
      const { error, value } = schema.validate(userToVerify);
      if(error){
        $('#errDiv').text('Invalid username or password.');
      }
      else{

      }
      if (userFound) {
        $('#errDiv').text('That username already exists - please choose another one.');
      }
      else {
        if ((!userToVerify.username) || (!userToVerify.password)) {
          $('#errDiv').text('Username and password fields cannot be empty.');
        }
        else {
          axios.post('/api/users/create', { newUser: { username: $('#username').val(), password: $('#password').val() } })
            .then(({ data }) => {
              localStorage.setItem('userID', data.id);
              $('#username').val('');
              $('#password').val('');
              window.location = 'info';
            }
            )
            .catch(err => console.log(err));
        }
      }
    })
})
