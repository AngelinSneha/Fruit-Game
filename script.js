var playing = false;
var score;
var trialsleft;
var step;
var action;
var fruits = ['apple', 'banana', 'cherry', 'grapes', 'jackfruit', 'orange', 'pear', 'pineapple', 'watermelon'];
$(function() {
  $("#startreset").click(function() {
    if (playing == true) {
      location.reload();
    } else {
      playing = true;
      score = 0;
      $("#scoreValue").html(score);
      $("#trialsleft").show();
      trialsleft = 3;
      addHearts();
      $("#gameOver").hide();
      $("#startreset").html("Reset Game");
      $("#startreset").css("font-size", "1.5rem");
      startAction();
    }
  });
$("#fruit1").mouseover(function() {
  score++;
  $("#scoreValue").html(score);

  $("#slicesound")[0].play();
  //stop fruit
  clearInterval(action);

  //hide fruit
  $("#fruit1").hide("explode", 500); //slice fruit

  //send new fruit
  setTimeout(startAction, 800);
});


function addHearts() {
  $("#trialsleft").empty();
  for (var i = 0; i < trialsleft; i++) {
    $("#trialsleft").append('<img src="img/heart.png" class="img">');
  }
}

function startAction() {
  $("#fruit1").show();
  chooseFruits();
  $("#fruit1").css({
    'left': Math.round(750 * Math.random()),
    'top': -50
  });
  //steps
  step = 1 + Math.round(Math.random() * 5);
  action = setInterval(function() {
    $("#fruit1").css('top', $("#fruit1").position().top + step);
    if ($("#fruit1").position().top > $(".container").height()) {
      if (trialsleft > 1) {
        $("#fruit1").show();
        chooseFruits();
        $("#fruit1").css({
          'left': Math.round(750 * Math.random()),
          'top': -50
        });
        //steps
        step = 1 + Math.round(Math.random() * 5);

        trialsleft--;
        addHearts();
      } else {
playing = false;

$("#startreset").html("Play");
$("#gameOver").show();
$("#gameOver").html("<p>Game Over!</p><p>your score is "+score+"</p>");
$("#trialsleft").hide();
stopAction();
      }
    }

  }, 10);

}

function chooseFruits() {
  $("#fruit1").attr("src", 'img/' + fruits[Math.round(8 * Math.random())] + '.png');
}
function stopAction() {
  clearInterval(action);
  $("#fruit1").hide();
}
});
