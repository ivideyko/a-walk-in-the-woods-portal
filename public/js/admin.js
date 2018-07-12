$(document).ready(function() {

  var adminContainer = $("#admin");
  var users;

  $(document).on("click", "button.delete", handleUserDelete);

  function getAllUsers() {
    $.get("/api/usersAdmin/", function(data) {
        console.log("User", data);
        users = data;
        initializeRows();
    });
  }

  getAllUsers();

  function initializeRows() {
    adminContainer.empty();

    var pageTitle = $("<h2>");
    pageTitle.text("Admin");

    var headerRow = $("<div class='row header'>");

    var idCol = $("<div class='col-md-1'>");
    idCol.text("Id");
    var usernameCol = $("<div class='col-md-2'>");
    usernameCol.text("Username");
    var passwordCol = $("<div class='col-md-2'>");
    passwordCol.text("Password");
    var createdAtCol = $("<div class='col-md-2'>");
    createdAtCol.text("Created At");
    var lastPlayedCol = $("<div class='col-md-2'>");
    lastPlayedCol.text("Last Played");
    var scoreCol = $("<div class='col-md-1'>");
    scoreCol.text("Score");
    var deleteCol = $("<div class='col-md-1'>");

    headerRow.append(idCol).append(usernameCol).append(passwordCol).append(createdAtCol).append(lastPlayedCol).append(scoreCol).append(deleteCol);

    adminContainer.append(pageTitle);
    adminContainer.append(headerRow);

    var usersToAdd = [];

    for (var i = 0; i < users.length; i++) {
      usersToAdd.push(createNewRow(users[i]));
    }
    adminContainer.append(usersToAdd);
  }

  function createNewRow(user) {

    var newRow = $("<div class='row'>");

    var newId = $("<div class='col-md-1'>");
    newId.text(user.id);

    var newUsername = $("<div class='col-md-2'>");
    newUsername.text(user.username);

    var newPassword = $("<div class='col-md-2'>");
    // newPassword.text(user.password);    
    newPassword.text("••••••••");    

    var newCreatedAt = $("<div class='col-md-2'>");
    var formattedCreatedAt = new Date(user.createdAt);
    formattedCreatedAt = moment(formattedCreatedAt).format("MM/DD/YY, HH:mm");
    newCreatedAt.text(formattedCreatedAt);

    var newLastPlayed = $("<div class='col-md-2'>");
    var formattedLastPlayed = new Date(user.updatedAt);
    formattedLastPlayed = moment(formattedLastPlayed).format("MM/DD/YY, HH:mm");
    newLastPlayed.text(formattedLastPlayed);

    var newScore = $("<div class='col-md-1'>");
    newScore.text(user.highscore);

    var newDeleteBtn = $("<div class='col-md-1'>");
    var deleteBtn = $("<button>");
    deleteBtn.text("Delete");
    deleteBtn.addClass("delete btn btn-danger");
    newDeleteBtn.append(deleteBtn);

    newRow.append(newId);
    newRow.append(newUsername);
    newRow.append(newPassword);
    newRow.append(newCreatedAt);
    newRow.append(newLastPlayed);
    newRow.append(newScore);
    newRow.append(newDeleteBtn);
    newRow.data("user", user);
    return newRow;
  }

  function deleteUser(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/usersDelete/" + id
    })
      .then(function() {
        getAllUsers();
      });
  }

  function handleUserDelete() {
    var currentUser = $(this)
      .parent()
      .parent()
      .data("user");
    console.log(currentUser.id);
    deleteUser(currentUser.id);
  }
});