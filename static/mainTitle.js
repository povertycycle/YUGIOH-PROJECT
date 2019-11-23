DIV_MAIN_TITLE.style.width = window.innerWidth + "px";
DIV_MAIN_TITLE.style.height = window.innerHeight + "px";
DIV_MAIN_TITLE.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
DIV_MAIN_TITLE.style.padding = window.innerHeight / 2 + "px 0px";
DIV_MAIN_TITLE.style.color = "#ffffff";
DIV_MAIN_TITLE.style.textAlign = "center";
DIV_MAIN_TITLE.style.fontSize = MAIN_TITLE_FONT_SIZE + "px";
DIV_MAIN_TITLE.style.animation = "fadeInOut " + MAIN_TITLE_FADE_TIME + "s linear forwards";
DIV_MAIN_TITLE.innerText = "YUGIOH PROJECT";

DIV_POPUP_PERMISSION.style.position = "absolute";
DIV_POPUP_PERMISSION.style.display = "none";
DIV_POPUP_PERMISSION.style.zIndex = 100;
DIV_POPUP_PERMISSION.style.width = DIV_POPUP_WIDTH + "px";
DIV_POPUP_PERMISSION.style.height = DIV_POPUP_HEIGHT + "px";
DIV_POPUP_PERMISSION.style.left = window.innerWidth / 2 - DIV_POPUP_WIDTH / 2 + "px";
DIV_POPUP_PERMISSION.style.top = window.innerHeight / 2 - DIV_POPUP_HEIGHT / 2 + "px";
DIV_POPUP_PERMISSION.style.background = DEFAULT_BACKGROUND_COLOR;
DIV_POPUP_PERMISSION.style.border = "white";
DIV_POPUP_PERMISSION.style.borderRadius = LETTER_DROP_DOWN_BORDER_RADIUS + "px";
DIV_POPUP_PERMISSION.style.borderStyle = "solid";
DIV_TEXT_QUESTION = document.createElement("div");
DIV_TEXT_QUESTION.style.width = DIV_POPUP_WIDTH + "px";
DIV_TEXT_QUESTION.style.height = DIV_POPUP_HEIGHT / 2 + "px";
DIV_TEXT_QUESTION.style.marginLeft = "-" + BORDER_RADIUS * 2 + "px";
DIV_TEXT_QUESTION.style.marginTop = "-" + BORDER_RADIUS * 2 + "px";
DIV_TEXT_QUESTION.style.borderStyle = "solid";
DIV_TEXT_QUESTION.style.borderRadius = LETTER_DROP_DOWN_BORDER_RADIUS + "px";    
DIV_POPUP_PERMISSION.appendChild(DIV_TEXT_QUESTION);
BUTTON_YES = document.createElement("button");
var bdiv = document.createElement("div");
bdiv.style.display = "flex";
BUTTON_YES.style.width = DIV_POPUP_WIDTH / 2 + "px";
BUTTON_YES.style.height = DIV_POPUP_HEIGHT / 2 + "px";
BUTTON_YES.innerText = "YES";
bdiv.appendChild(BUTTON_YES);
BUTTON_NO = document.createElement("button");
bdiv.appendChild(BUTTON_NO);
BUTTON_NO.style.width = DIV_POPUP_WIDTH / 2 + "px";
BUTTON_NO.style.height = DIV_POPUP_HEIGHT / 2 + "px";
BUTTON_NO.innerText = "NO";
BUTTON_YES.style.fontSize = BUTTON_NO.style.fontSize = LETTER_DROP_DOWN_FONT_SIZE + "px";
BUTTON_YES.style.borderRadius = BUTTON_NO.style.borderRadius = LETTER_DROP_DOWN_BORDER_RADIUS + "px";
DIV_POPUP_PERMISSION.appendChild(bdiv);

DIV_NOTIFICATION.style.position = "absolute";
DIV_NOTIFICATION.style.display = "none";
DIV_NOTIFICATION.style.zIndex = 100;
DIV_NOTIFICATION.style.width = DIV_POPUP_WIDTH + "px";
DIV_NOTIFICATION.style.height = DIV_POPUP_HEIGHT + "px";
DIV_NOTIFICATION.style.left = window.innerWidth / 2 - DIV_POPUP_WIDTH / 2 + "px";
DIV_NOTIFICATION.style.top = window.innerHeight / 2 - DIV_POPUP_HEIGHT / 2 + "px";
DIV_NOTIFICATION.style.background = DEFAULT_BACKGROUND_COLOR;
DIV_NOTIFICATION.style.border = "white";
DIV_NOTIFICATION.style.borderRadius = LETTER_DROP_DOWN_BORDER_RADIUS + "px";
DIV_NOTIFICATION.style.borderStyle = "solid";
DIV_NOTIFICATION.style.lineHeight = DIV_POPUP_HEIGHT + "px";
DIV_NOTIFICATION.style.textAlign = "center";
DIV_NOTIFICATION.addEventListener('animationend', function () {
    DIV_NOTIFICATION.style.display = "none";
})

DIV_INPUT_MENU.style.position = "absolute";
DIV_INPUT_MENU.style.display = "none";
DIV_INPUT_MENU.style.zIndex = 100;
DIV_INPUT_MENU.style.width = DIV_POPUP_WIDTH + "px";
DIV_INPUT_MENU.style.height = DIV_POPUP_HEIGHT + "px";
DIV_INPUT_MENU.style.left = window.innerWidth / 2 - DIV_POPUP_WIDTH / 2 + "px";
DIV_INPUT_MENU.style.top = window.innerHeight / 2 - DIV_POPUP_HEIGHT / 2 + "px";
DIV_INPUT_MENU.style.background = DEFAULT_BACKGROUND_COLOR;
DIV_INPUT_MENU.style.border = "white";
DIV_INPUT_MENU.style.borderRadius = LETTER_DROP_DOWN_BORDER_RADIUS + "px";
DIV_INPUT_MENU.style.borderStyle = "solid";
DIV_INPUT_MENU.style.textAlign = "center";
DIV_INPUT_MENU.style.paddingTop = DIV_POPUP_HEIGHT / 4 + "px";
DIV_INPUT_PROMPT = document.createElement("div");
DIV_INPUT_MENU.appendChild(DIV_INPUT_PROMPT);
INPUT_PROMPT = document.createElement("input");
INPUT_PROMPT.style.height = MAIN_MENU_FONT_SIZE + "px";
DIV_INPUT_MENU.appendChild(INPUT_PROMPT);

DIV_MAIN_TITLE.addEventListener('animationend', function () {
    DIV_MAIN_MENU.style.animation = "fadeIn " + MAIN_TITLE_FADE_TIME + "s";
    initializeMainMenu();
})

INPUT_PROMPT.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        DIV_TEXT_QUESTION.innerText = "Are you sure you want to change the name to: " + INPUT_PROMPT.value + "?";
        DIV_INPUT_MENU.style.display = "none";
        DIV_POPUP_PERMISSION.style.display = "unset";
        DIV_POPUP_PERMISSION.style.animation = "fadeIn " + BUTTON_FADE_TIME + "s";
        BUTTON_YES.onclick = function () {
            var prevName = SELECTED_DECK_NAME;
            if (LOCAL_DECKS[SELECTED_DECK_NAME]) {
                var decklists = DIV_DECK_LIST.children;
                for (var j = 0; j < decklists.length; j++) {
                    if (decklists[j].innerText === SELECTED_DECK_NAME) {
                        decklists[j].innerText = INPUT_PROMPT.value;
                    }
                }
                var deck = LOCAL_DECKS[SELECTED_DECK_NAME];
                LOCAL_DECKS[INPUT_PROMPT.value] = deck;
                delete LOCAL_DECKS[SELECTED_DECK_NAME];
            }
            SELECTED_DECK_NAME = INPUT_PROMPT.value;
            DIV_POPUP_PERMISSION.style.display = "none";
            DECK_REQUEST.open('GET', '/renameDeck/' + JSON.stringify(prevName) + ";" + JSON.stringify(SELECTED_DECK_NAME));
            DECK_REQUEST.send();
        };
        BUTTON_NO.onclick = function () {
            DIV_INPUT_MENU.style.display = "none";
            DIV_POPUP_PERMISSION.style.display = "none";
        };
    }
});

API_REQUEST.open('GET', 'https://db.ygoprodeck.com/api/v5/cardinfo.php', true);

API_REQUEST.onload = function () {
    if (API_REQUEST.response) {
        var data = JSON.parse(this.response);
        for (item of data) {
            CARD_DATABASE[item.name] = processCard(item);
        }
    }
};

API_REQUEST.send();

