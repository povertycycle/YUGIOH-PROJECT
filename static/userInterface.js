function openDeckMenu(e) {
    DECK_MENU.style.display = "unset";
    DECK_MENU.style.top = e.clientY + "px";
    DECK_MENU.style.left = e.clientX + "px";
}









function initPlayerList(name) {
    var label = document.createElement("div");
    label.innerText = name;
    label.style.width = OPTION_LIST_WIDTH + "px";
    label.style.borderRadius = BORDER_RADIUS + "px";
    label.style.border = "white";
    label.onmouseenter = function () {
        label.style.borderStyle = "solid";
    }
    label.onmouseout = function () {
        label.style.borderStyle = "";
    }
    label.onclick = function () {
        TARGET_DUELIST = name;
        askDuelPermission();
    }
    return label;
}

DUEL_REQUEST.onload = async function () {
    if (DUEL_REQUEST.response) {
        var json = JSON.parse(DUEL_REQUEST.response);
        if (json["code"] == REGISTER_PLAYER_SUCESS) {
            alert("Player registered successfully, Welcome " + PLAYER_NAME_INPUT_TEXT.value)
            PLAYER_NAME = PLAYER_NAME_INPUT_TEXT.value;
            SAVE_PLAYER_MENU.style.display = "none";
            DUEL_REQUEST.open('GET', '/getListofPlayers');
            DUEL_REQUEST.send();
        } else if (json["code"] == REGISTER_PLAYER_FAIL) {
            alert("Player did not successfully registered. Please try another name.")
        } else if (json["code"] == GET_PLAYER_LIST) {
            DUELISTS = json["files"];
            for (i = 0; i < DUELISTS.length; i++) {
                if (PLAYER_NAME !== DUELISTS[i]) {
                    var d = initPlayerList(DUELISTS[i]);
                    PLAYER_LIST.appendChild(d);
                }
            }
        } else if (json["code"] == ASK_DUEL_PERMISSION_REQUEST) {

        } else if (json["code"] == DUELIST_NOT_FOUND) {
            alert("Duelist may have logged off");
        }
    }
}

function searchPlayer() {
    DUEL_MENU.style.display = "unset";
    SAVE_PLAYER_MENU.style.display = "unset";
    goToDuelInterface();
}

function closePlayerSearch() {
    DUEL_MENU.style.display = "none";
}

async function savePlayerName() {
    DUEL_REQUEST.open('GET', '/savePlayerName/' + PLAYER_NAME_INPUT_TEXT.value);
    DUEL_REQUEST.send();
    alert("Registering player " + PLAYER_NAME_INPUT_TEXT.value + "...");
    SOCKET.emit('broadcastPlayer', {
        user_name: PLAYER_NAME,
        message: "New challenger approaches. "
    })
}

function refreshPlayerList() {
    while (PLAYER_LIST.firstChild) {
        PLAYER_LIST.removeChild(PLAYER_LIST.firstChild);
    }
    DUEL_REQUEST.open('GET', '/getListofPlayers');
    DUEL_REQUEST.send();
}

function askDuelPermission() {
    QUESTION_TEXT.innerText = "Ask for duel?"
    POPUP_PERMISSION.style.display = "unset";
    BUTTON_YES.onclick = async function () {
        SOCKET.emit('askPermissionForDuel', {
            challenger: PLAYER_NAME,
            target_duelist: TARGET_DUELIST
        })
        POPUP_PERMISSION.style.display = "none";
    }
    BUTTON_NO.onclick = function () {
        POPUP_PERMISSION.style.display = "none";
    }
}

function goToDuelInterface() {
    SOCKET.on('askPermissionForDuel', function (msg) {
        if (typeof msg.challenger !== 'undefined' && typeof msg.target_duelist !== 'undefined') {
            if (msg.challenger !== PLAYER_NAME && PLAYER_NAME === msg.target_duelist) {
                alert(msg.challenger + " challenged " + msg.target_duelist + " to duel!");
                QUESTION_TEXT.innerText = msg.challenger + " challenged you to duel!. Accept?"
                POPUP_PERMISSION.style.display = "unset";
                BUTTON_YES.onclick = async function () {
                    SOCKET.emit('challengeResponse', {
                        target_duelist: PLAYER_NAME,
                        challenger: msg.challenger,
                        action: 1,
                    })
                    POPUP_PERMISSION.style.display = "none";
                }
                BUTTON_NO.onclick = async function () {
                    SOCKET.emit('challengeResponse', {
                        target_duelist: PLAYER_NAME,
                        challenger: msg.challenger,
                        action: 0,
                    })
                    POPUP_PERMISSION.style.display = "none";
                }
            }
        }
    })



    SOCKET.on('challengeResponse', function (msg) {
        if (typeof msg.target_duelist !== 'undefined' && typeof msg.challenger !== 'undefined' && typeof msg.action !== 'undefined') {
            if (msg.challenger === PLAYER_NAME && msg.action === 1) {
                SOCKET.emit('prepareDuel', {
                    duelist_A: msg.challenger,
                    duelist_B: msg.target_duelist
                })
            } else if (msg.challenger === PLAYER_NAME && action === 0)
                alert(msg.target_duelist + " declined.")
        }
    })
}

SOCKET.on('broadcastPlayer', function (msg) {
    if (typeof msg.user_name !== 'undefined' && typeof msg.message !== 'undefined') {
        if (msg.user_name !== PLAYER_NAME)
            alert(msg.message + msg.user_name + " is now connected! Be wary!");
    }
})

SOCKET.on('duelInterfaceResponse', function (msg) {
    if (typeof msg.duelist_A !== 'undefined' && typeof msg.duelist_A !== 'undefined') {
        if (msg.duelist_A === PLAYER_NAME || msg.duelist_B === PLAYER_NAME) {
            alert("Select a deck");
            var decks = DECK_LIST.children;
            for (var i = 0; i < decks.length; i++) {
                var deckname = decks[i].innerText;
                var d = document.createElement('div');
                d.innerText = deckname;
                d.onclick = function () {
                    goToDuelField();
                };
                DECK_LIST_FOR_DUEL.appendChild(d);
            }
        }
    }
})

function goToDuelField() {
    DUEL_FIELD.style.display = "unset";
}