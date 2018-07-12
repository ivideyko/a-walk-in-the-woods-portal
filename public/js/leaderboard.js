$(document).ready(function() {

  var leaderboardContainer = $("#leaderboard");
  var users;
  var count = 0;

  function getHighScores() {
    $.get("/api/highscores/", function(data) {
        console.log("User", data);
        users = data;
        initializeRows();
    });
  }

  getHighScores();

  function initializeRows() {
    var usersToAdd = [];
    // sort users by highscore
    users.sort(function(a, b){
        var one = parseInt(a.highscore);
        var two = parseInt(b.highscore);
        return two - one;
    })

    for (var i = 0; i < users.length; i++) {
      usersToAdd.push(createNewRow(users[i]));
    }
    leaderboardContainer.append(usersToAdd);
  }

  function createNewRow(user) {
    count++;

    var newRow = $("<div class='row'>");

    var newRank = $("<div class='col-md-1'>");
    newRank.text(count);

    var newUsername = $("<div class='col-md-4'>");
    newUsername.text(user.username);

    var newLastPlayed = $("<div class='col-md-5'>");
    var formattedDate = new Date(user.updatedAt);
    formattedDate = moment(formattedDate).format("MM/DD/YY, h:mm a");
    newLastPlayed.text(formattedDate);

    var newScore = $("<div class='col-md-2'>");
    newScore.text(user.highscore);

    newRow.append(newRank);
    newRow.append(newUsername);
    newRow.append(newLastPlayed);
    newRow.append(newScore);

    return newRow;
  }
});