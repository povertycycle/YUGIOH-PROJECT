function setPlayerListUI(row, i) {
  var playerListContainer = row.insertCell(i);
  playerListContainer.style.verticalAlign = "bottom";
  DIV_PLAYER_LIST_DISPLAY = document.createElement("div");
  DIV_PLAYER_LIST_DISPLAY.style.width = DIV_PLAYER_LIST_WIDTH + "px";
  DIV_PLAYER_LIST_DISPLAY.style.height = DIV_PLAYER_LIST_HEIGHT + "px";
  DIV_PLAYER_LIST_DISPLAY.style.background = "white";
  if (NAME_CURRENT_PLAYER === "") {
    var textForm = document.createElement("form");
    textForm.setAttribute("action", "");
    textForm.setAttribute("method", "POST");
    var registerNewPlayer = document.createElement("input");
    registerNewPlayer.setAttribute("type", "text");
    registerNewPlayer.className = "register_input";
    registerNewPlayer.setAttribute("placeholder", "Enter your name");
    registerNewPlayer.style.width = DIV_PLAYER_LIST_WIDTH + "px";
    registerNewPlayer.style.height = INPUT_CHAT_HEIGHT + "px";
    textForm.appendChild(registerNewPlayer);
    playerListContainer.appendChild(textForm);
    textForm.onsubmit = function (e) {
      e.preventDefault();
      var validName = e.target.elements[0].value;
      PLAYER_REQUEST.open('GET', '/registerNewPlayer/' + validName);
      PLAYER_REQUEST.send();
    };
    DIV_PLAYER_LIST_DISPLAY.style.opacity = "75%";
  }
  playerListContainer.appendChild(DIV_PLAYER_LIST_DISPLAY);
  // getAllPlayersList();
}

function setChatUI(row, i) {
  var chatList = row.insertCell(i);
  // chatList.style.color = "Black";
  DIV_CHAT_LIST_DISPLAY = document.createElement("div");
  // DIV_CHAT_LIST_DISPLAY.style.height =
  //   window.innerHeight - INPUT_CHAT_HEIGHT - GAP_WIDTH + "px";
  // DIV_CHAT_LIST_DISPLAY.style.width = INPUT_CHAT_WIDTH + "px";
  // DIV_CHAT_LIST_DISPLAY.style.background = "white";
  DIV_CHAT_LIST_DISPLAY.className = "message_holder";
  // DIV_CHAT_LIST_DISPLAY.setAttribute("autocomplete", "off");
  chatList.appendChild(DIV_CHAT_LIST_DISPLAY);
  $('div.message_holder').css({
    background: 'White',
    overflow: 'hidden scroll',
    width: INPUT_CHAT_WIDTH + "px",
    height: window.innerHeight - INPUT_CHAT_HEIGHT - GAP_WIDTH + "px",
    color: "Black",
    autocomplete: 'off'
  });
  DIV_CARD_LIST_DISPLAY.setAttribute("style", "overflow: hidden scroll");

  var textForm = document.createElement("form");
  textForm.setAttribute("action", "");
  textForm.setAttribute("method", "POST");
  var chatInput = document.createElement("input");
  chatInput.setAttribute("type", "text");
  chatInput.className = "message";
  chatInput.setAttribute("placeholder", "Type your message here...");
  chatInput.style.width = INPUT_CHAT_WIDTH + "px";
  chatInput.style.height = INPUT_CHAT_HEIGHT + "px";
  textForm.appendChild(chatInput);
  chatList.appendChild(textForm);
  textForm.onsubmit = function (e) {
    e.preventDefault();
    SOCKET.emit('send_message', {
      sender: NAME_CURRENT_PLAYER,
      message: $('input.message').val()
    })
    $('input.message').val('').focus()
  };
  if (NAME_CURRENT_PLAYER === "") {
    chatInput.disabled = true;
  }
}

function freeDuelDisplay() {
  var t = document.createElement("table");
  DIV_FREE_DUEL_LOBBY.appendChild(t);
  var row = t.insertRow(0);
  setChatUI(row, 0);
  setPlayerListUI(row, 1);

  // setThirdColumn(row, 2);
  // setFourthColumn(row, 3);
  // displayDatabaseLetters();
}

PLAYER_REQUEST.onload = function () {
  if (PLAYER_REQUEST.response) {
    var json = JSON.parse(PLAYER_REQUEST.response)
    if (json["code"] == REGISTER_PLAYER_SUCCESS) {
      NAME_CURRENT_PLAYER = json["files"];
      DIV_PLAYER_LIST_DISPLAY.style.opacity = "100%";
      $('input.message').prop("disabled", false);
      $('input.register_input').prop("disabled", true);
      DIV_NOTIFICATION.style.animation = "fadeIn " + BUTTON_FADE_TIME + "s";
      DIV_NOTIFICATION.innerText = "Welcome " + NAME_CURRENT_PLAYER;
      DIV_NOTIFICATION.style.display = "unset";
      DIV_NOTIFICATION.style.animation = "fadeInOut " + NOTIFICATION_FADE_TIME + "s";
      SOCKET.emit('broadcast_player', {
        new_player: NAME_CURRENT_PLAYER
      })
    } else if (json["code"] == REGISTER_PLAYER_DUPLiCATE_NAME) {
      DIV_NOTIFICATION.style.animation = "fadeIn " + BUTTON_FADE_TIME + "s";
      DIV_NOTIFICATION.innerText = "Duplicate name detected: " + json["files"];
      DIV_NOTIFICATION.style.display = "unset";
      DIV_NOTIFICATION.style.animation = "fadeInOut " + NOTIFICATION_FADE_TIME + "s";
    }
  }
}

SOCKET.on('send_message_client', function (msg) {
  if ($('div.message_holder').children().length >= 75) {
    $('div.message_holder').empty();
  }
  console.log($('div.message_holder').children().length)
  if (typeof msg.sender !== 'undefined' && typeof msg.message !== 'undefined') {
    $('div.message_holder').append('<div><b style="color: #000">' + msg.sender + ":" + '</b> ' + msg.message + '</div>')
  }
});

SOCKET.on('new_player_joined', function (msg) {
  if (typeof msg.new_player !== 'undefined') {
    $('div.message_holder').append('<div><b style="color: #000">' + msg.new_player + " has joined the lobby." + '</b></div>')
  }
});