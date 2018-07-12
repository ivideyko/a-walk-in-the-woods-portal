$(document).ready(function() {

  var url = window.location.search;

  var username = $("#username");
  var password = $("#password");
  var signInForm = $("#sign-in-form");

  $(signInForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();

    if (!username.val().trim() || !password.val().trim()) {
      return;
    }

    var userSignIn = {
      username: username.val().trim(),
      password: password.val().trim(),
    };

    console.log(userSignIn);
    
    submitLogin(userSignIn.username);
  });

  function submitLogin(username) {
    console.log(username);
    $.get("/api/users/login/" + username, function(data) {
      window.location.href = "../profile.html?id=" + data.id;
    });
  }
});
