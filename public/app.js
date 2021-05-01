'use strict';

$('#signinForm').click(function() {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3333/signin',
    dataType: 'json',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    },
    data: '{}',
    success: function (){
      'Succesfully logged in!';
    }
  });
});
