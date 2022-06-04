let fName = $('#name'),
  password = $('#password'),
  email = $('#email'),
  phoneNumber = $('#phone'),

  regUserBtn= $('#regUserBtn'),
  updateUserForm=$("#updateUserForm"),
  userIndex,
  users = [],
  globalIpAddress="http://159.65.21.42:9000";

  updateUserForm.hide()
loadUsersData();
//Events in jquery
regUserBtn.on('click', function () {
  let userObj = {
    "name": fName.val(),
    "phone": phoneNumber.val(),
    "email": email.val(),
    "password": password.val()
};

  if (userIndex == null) {
  
    $.ajax({
      type: 'POST',
      url: `${globalIpAddress}/register`,
      data: userObj,
      success: function (response) {
          //Authenticating a user
          if(response.error){
            alert(`Registration Failed, ${response.error}`);
          }else{
            alert(`Registration successful, welcome ${response.name}`);
            window.location.href = 'allusers.html';
          }
        
      },
      error: function (err) {
        console.log(err.statusText);
      },
    });
  } else {

    let updateId = users[userIndex]['_id'];
    $.ajax({
      type: 'PUT',
      url: `${globalIpAddress}/user/${updateId}`,
      data: userObj,
      success: function (response) {
        if(response.error){
            alert(`Registration Failed, ${response.error}`);
          }else{
            alert(`Update successful, at ${response.success}`);
            loadUsersData();
          }
        
      },
      error: function (err) {
        alert(err.statusText);
        console.log();
      },
    });
    userIndex = null;
    regUserBtn.html('Add Data');
  }

  clearForm();
  loadUsersData();
});

//Assign event to a tag which is editBtn
$('#userDataView').on('click', '.editBtn', function () {
    updateUserForm.show()
  userIndex = $(this).attr('indexData');

  fName.val(users[userIndex]['name']);
  password.val(users[userIndex]['password']);
  email.val(users[userIndex]['email']);
  phoneNumber.val(users[userIndex]['phone']);
  regUserBtn.html('Update Data');
});

$('#userDataView').on('click', '.deleteBtn', function () {
  let shouldDelete = confirm('Do you want to delete this record?');

  if (shouldDelete) {
    let deleteIndex = $(this).attr('indexData');

    let deleteId = users[deleteIndex]['_id'];

    $.ajax({
      type: 'DELETE',
      url: `${globalIpAddress}/user/${deleteId}`,
      success: function (response) {
        console.log(response);
        alert('User Deleted');
        loadUsersData(); 
      },
      error: function (err) {
        console.log(err.statusText);
      },
    });

   
    
  }
});

function loadUsersData() {
  $.ajax({
    type: 'GET',
    url: `${globalIpAddress}/users`,
    success: function (response) {
      users = response;
      let rows = '';
      
      for (let index = 0; index < users.length; index++) {
        rows+=`
     <tr>
        <th>${index+1}</th>
        <th>${users[index]["name"]}</th>
        <th>${users[index]["email"]}</th>
        <th>${users[index]["phone"]}</th>
        <th><a href="#" class="editBtn" indexData="${index}" >Edit</a> | <a href="#" indexData="${index}" class="deleteBtn">Delete</a></th>
      </tr>`
      }

      $('#userDataView').html(rows)
    },
    error: function (err) {
      console.log(err);
    },
  });

}

function clearForm() {
    updateUserForm.hide()
  fName.val('');
  password.val('');
  email.val('');
  phoneNumber.val('');
}