$(document).ready(function() {

  var url = window.location.search;

  var username = $("#username");
  var password = $("#password");
  var addUserForm = $("#sign-up-form");

  $(addUserForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();

    if (!username.val().trim() || !password.val().trim()) {
      return;
    }

    var newUser = {
      username: username.val().trim(),
      password: password.val().trim(),
    };

    console.log(newUser);
    
    submitPost(newUser);
  });

  function submitPost(User) {
    $.post("/api/users", User, function() {
      window.location.href = "/";
    });
  }
});
