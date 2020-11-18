function challengeToDuel(target) {
  DIV_TEXT_QUESTION.innerText = "Do you want to challenge " + target + "?";
  DIV_POPUP_PERMISSION.style.display = "unset";
  BUTTON_YES.onclick = function () {
    DIV_POPUP_PERMISSION.style.display = "none";
  };
  BUTTON_NO.onclick = function () {
    DIV_POPUP_PERMISSION.style.display = "none";
  };
}

function setDuelSettingsUI(row, i) {
  var duelSettingsContainer = row.insertCell(i);
  duelSettingsContainer.className = "duel_settings_container";
  $('td.duel_settings_container').css({
    width: DIV_DUEL_SETTINGS_WIDTH + "px",
    height: window.innerHeight - GAP_WIDTH + "px",
    background: DEFAULT_SETTINGS_COLOR
  })


}

function refreshPlayerList() {
  $('div.player_list').empty();
  PLAYER_REQUEST.open('GET', '/getPlayerList');
  PLAYER_REQUEST.send();
}

function setPlayerListUI(row, i) {
  var playerListContainer = row.insertCell(i);
  playerListContainer.style.verticalAlign = "bottom";
  var refresh_player_button = document.createElement("button");
  refresh_player_button.style.width = DIV_PLAYER_LIST_WIDTH + "px";
  refresh_player_button.innerText = "Refresh player list";
  refresh_player_button.onclick = function () {
    refreshPlayerList()
  };
  playerListContainer.appendChild(refresh_player_button);

  DIV_PLAYER_LIST_DISPLAY = document.createElement("div");
  DIV_PLAYER_LIST_DISPLAY.className = "player_list";
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
  console.log($('div.player_list'));
  $('div.player_list').css({
    width: DIV_PLAYER_LIST_WIDTH + "px",
    height: DIV_PLAYER_LIST_HEIGHT + "px",
    background: "White",
    color: "Black",
    overflow: "hidden scroll"
  })
  refreshPlayerList();
}

function setChatUI(row, i) {
  var chatList = row.insertCell(i);
  DIV_CHAT_LIST_DISPLAY = document.createElement("div");
  DIV_CHAT_LIST_DISPLAY.className = "message_holder";
  chatList.appendChild(DIV_CHAT_LIST_DISPLAY);
  $('div.message_holder').css({
    background: 'White',
    overflow: 'hidden scroll',
    width: INPUT_CHAT_WIDTH + "px",
    height: window.innerHeight - INPUT_CHAT_HEIGHT - GAP_WIDTH + "px",
    color: "Black",
    autocomplete: 'off'
  });

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
  setDuelSettingsUI(row, 2);
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
    } else if (json["code"] == GET_PLAYER_LIST) {
      var duelists = json["files"];
      for (i = 0; i < duelists.length; i++) {
        if (NAME_CURRENT_PLAYER !== duelists[i]) {
          $('div.player_list').append('<div class="other_duelist" style="border:black; border-radius:2px;">' + duelists[i] + '</div>')
        }
      }
      $('div.other_duelist').on({
        mouseenter: function (e) {
          SELECTED_DUELIST = e.target.innerText;
          e.target.style.borderStyle = "solid";
        },
        mouseout: function (e) {
          SELECTED_DUELIST = "";
          e.target.style.borderStyle = "none";
        },
        click: function (e) {
          challengeToDuel(e.target.innerText);
        }
      })
    }
  }
}

SOCKET.on('send_message_client', function (msg) {
  if ($('div.message_holder').children().length >= 75) {
    $('div.message_holder').empty();
  }
  console.log($('div.message_holder').children().length)
  if (typeof msg.sender !== 'undefined' && typeof msg.message !== 'undefined') {
    $('div.message_holder').append('<div><b>' + msg.sender + ":" + '</b> ' + msg.message + '</div>')
  }
});

SOCKET.on('new_player_joined', function (msg) {
  if (typeof msg.new_player !== 'undefined') {
    $('div.message_holder').append('<div><b>' + msg.new_player + " has joined the lobby." + '</b></div>')
  }
});