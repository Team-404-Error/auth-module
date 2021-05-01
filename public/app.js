'use strict';
// console.log('can you see me?');
$('#signinForm').on('submit', function (e) {
  // console.log('hello');
  e.preventDefault;
  let username = $('#username').val();
  let password = $('#password').val();
  console.log($(this).serialize());

  $.ajax({
    beforeSend: function (xhr) {
      let base64 = 'Basic ' + btoa(username + ':' + password);
      xhr.setRequestHeader('Authorization', base64);
      // console.log('base64', base64);
    },
    type: 'POST',
    // UPDATE TO HEROKU LINK FOR 'PRODUCTION'
    url: 'http://localhost:3333/signin',
    dataType: 'text',
    data:{username: $('#username').val(), password: $('#password').val()},
    success: function (data) {
      console.log(data.user);
      location.href = '/users';
    },
  });
});
