$(document).ready(function() {
    // blogContainer hol
    var url = window.location.search;
    var userId;
    var user;
    var startGame = $("#start-game");

    if (url.indexOf("?id=") !== -1) {
        userId = url.split("=")[1];
        getUserProfile(userId);
    }
  
    function getUserProfile() {
      $.get("/api/users/" + userId, function(data) {

        user = data;
        
        $("#username").text(data.username);
        var formattedDate = new Date(data.updatedAt);
        formattedDate = moment(formattedDate).format("MM/DD/YY, h:mm a");
        $("#lastplayed").text(formattedDate);
        $("#highscore").text(data.highscore);
      });
    }
  
    $(startGame).on("submit", function handleFormSubmit(event) {
        event.preventDefault();

        // Ajax call to start game
        // Send user JSON object

        return true;
    });
  });