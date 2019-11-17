function goToBuildDeck() {
    BUTTON_STORY_MODE = document.getElementById("storyMode");
    BUTTON_FREE_DUEL = document.getElementById("freeDuel");
    BUTTON_BUILD_DECK = document.getElementById("buildDeck");
    BUTTON_OPTION = document.getElementById("option");
    BUTTON_GALLERY = document.getElementById("gallery");
    BUTTON_BUILD_DECK.style.animation = "buttonBlinking 1s";
    BUTTON_BUILD_DECK.style.animationPlayState = "running";
    DIV_BUILD_DECK_MENU.style.width = window.innerWidth + "px";
    DIV_BUILD_DECK_MENU.style.height = window.innerHeight + "px";
    DIV_MAIN_MENU.style.animation = "fadeOut " + MAIN_TITLE_FADE_TIME + "s";
    DIV_MAIN_MENU.style.animationPlayState = "running";
    DIV_MAIN_MENU.addEventListener('animationend', function (e) {
        if (e.target.nodeName === "DIV") {
            DIV_MAIN_MENU.style.display = "none";
            DIV_BUILD_DECK_MENU.style.animation = "fadeIn " + MAIN_TITLE_FADE_TIME + "s";
            DIV_BUILD_DECK_MENU.style.display = "";
            buildDeckDisplay();
        }
    })
}

function setFirstColumn(row, i) {
    var cardDatabase = row.insertCell(i);
    var form = document.createElement("form");
    form.className = "example";
    form.onsubmit = "return false";
    cardDatabase.appendChild(form);
    INPUT_SEARCH_BAR = document.createElement("input");
    INPUT_SEARCH_BAR.setAttribute("type", "text");
    INPUT_SEARCH_BAR.id = "searchBar";
    INPUT_SEARCH_BAR.setAttribute("name", "search");
    form.appendChild(INPUT_SEARCH_BAR);
    BUTTON_SEARCH_BAR = document.createElement("button");
    BUTTON_SEARCH_BAR.setAttribute("type", "submit");
    BUTTON_SEARCH_BAR.id = "searchCard";
    BUTTON_SEARCH_BAR.onclick = searchCards;
    BUTTON_SEARCH_BAR.innerHTML = "<i class='fa fa-search'></i>";
    form.appendChild(BUTTON_SEARCH_BAR);
    DIV_CARD_LIST_DISPLAY = document.createElement("div");
    DIV_CARD_LIST_DISPLAY.id = "cardlistDisplay";
    DIV_CARD_LIST_DISPLAY.className = "scrollbar";
    cardDatabase.appendChild(DIV_CARD_LIST_DISPLAY);

    INPUT_SEARCH_BAR.style.width = DIV_CARD_LIST_WIDTH - BUTTON_SEARCH_DIMENSION + "px";
    INPUT_SEARCH_BAR.style.height = BUTTON_SEARCH_BAR.style.width = BUTTON_SEARCH_BAR.style.height = BUTTON_SEARCH_DIMENSION + "px";
    BUTTON_SEARCH_BAR.style.padding = "0px";
    DIV_CARD_LIST_DISPLAY.style.width = DIV_CARD_LIST_WIDTH + "px";
    DIV_CARD_LIST_DISPLAY.style.height = DIV_CARD_LIST_HEIGHT + "px";
    DIV_CARD_LIST_DISPLAY.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
}

function setSecondColumn(row, i) {
    var col = row.insertCell(i);
    col.style.display = "block";
    var display = document.createElement("div");
    display.style.display = "grid";
    IMAGE_CARD_DATABASE_DISPLAY = document.createElement("img");
    IMAGE_CARD_DECK_DISPLAY = document.createElement("img");
    IMAGE_CARD_DATABASE_DISPLAY.id = "databaseCardDisplay";
    IMAGE_CARD_DECK_DISPLAY.id = "deckCardDisplay";
    col.appendChild(display);
    display.appendChild(IMAGE_CARD_DATABASE_DISPLAY);
    display.appendChild(IMAGE_CARD_DECK_DISPLAY);

    IMAGE_CARD_DATABASE_DISPLAY.style.width = IMAGE_CARD_DECK_DISPLAY.style.width = CARD_DISPLAY_WIDTH + "px";
    IMAGE_CARD_DATABASE_DISPLAY.style.height = IMAGE_CARD_DECK_DISPLAY.style.height = CARD_DISPLAY_HEIGHT + "px";
}

function buildMenuOptionButton(btn, id, func, text)
{
    btn = document.createElement("button");
    btn.className = "btn";
    btn.id = id;
    btn.onclick = func;
    btn.innerText = text;
    DIV_BUILD_DECK_OPTIONS.appendChild(btn);
    btn.style.width = BUTTON_BUILD_MENU_WIDTH + "px";
}

function setThirdColumn(row, i)
{
    var col = row.insertCell(i);
    DIV_BUILD_DECK_OPTIONS = document.createElement("div");
    DIV_BUILD_DECK_OPTIONS.id = "buildDeckOptions";
    col.appendChild(DIV_BUILD_DECK_OPTIONS);
    DIV_BUILD_DECK_OPTIONS.style.width = BUTTON_BUILD_MENU_WIDTH + "px";
    buildMenuOptionButton(BUTTON_NEW_DECK, "makeNewDeck", makeDeck, "New Deck");
    buildMenuOptionButton(BUTTON_GET_LOCAL_DECKS, "getLocalDecks", getLocalDecks, "Get Local Decks");
    buildMenuOptionButton(BUTTON_SAVE_DECK, "saveDeck", saveDeck, "Save Deck");
}

function buildDeckDisplay() {

    var t = document.createElement("table");
    DIV_BUILD_DECK_MENU.appendChild(t);
    var row = t.insertRow(0);
    setFirstColumn(row, 0);
    setSecondColumn(row, 1);
    setThirdColumn(row, 2);

}

// ONCLICK:
// SearchCards
// MakeNewDeck
// GetLocalDecks
// Save Deck





// <td>
//     <div id="deckContentContainer">
//         <div id="deckContent"></div>
//     </div>
// </td>
// <td> 
//     <div style="position: absolute; left: 0px; top: 0px; z-index: 6; display: none" id="savePlayerMenu">
//         <button id="closeMenu" onclick="closePlayerSearch()"></button>
//         Player name: <input type="text" id="inputPlayerName"><br>
//         <input type="submit" value="Submit" onclick="savePlayerName()">
//     </div>
//     <div id="popupPermission">
//         <div id="questionText"></div>
//         <div id="yesButton">Yes</div>
//         <div id="noButton">No</div>
//     </div>
//     <div id="duelMenu">
//         <button id="refreshPlayerList" onclick="refreshPlayerList()">Refresh Player List</button>
//         <div id="playerList"></div>
//         <div id="deckForDuel"></div>
//     </div>
// </td>
// <td>
//     <div id="duelField" style="display: none; position: absolute; top:0px; left:0px; background-color: white; z-index: 50;"></div>
// </td>







DECK_LIST.style.overflow = "hidden scroll";
DECK_LIST.style.width = DECK_LIST_WIDTH + "px";
DECK_LIST.style.height = DECK_LIST_HEIGHT + "px";
DECK_LIST.style.display = "initial";

DECK_CONTENT.style.overflow = "hidden scroll";
DECK_CONTENT.style.width = DECK_CONTENT_CONTAINER.style.width = DECK_CONTENT_WIDTH + "px";
DECK_CONTENT.style.height = DECK_CONTENT_HEIGHT + "px";
DECK_CONTENT.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;

DECK_CONTENT_CONTAINER.style.height = window.innerHeight - GAP_WIDTH + "px";
DECK_CONTENT_CONTAINER.style.overflow = "hidden scroll";

BUTTON_UPLOADDECK.style.width = BUTTON_SEARCHPLAYER.style.width = BUTTON_SAVEDECK.style.width = BUTTON_DOWNLOADDECK.style.width = OPTION_LIST_WIDTH + "px";

DUEL_MENU.style.width = window.innerWidth + "px";
DUEL_MENU.style.height = window.innerHeight + "px";
DUEL_MENU.style.position = "absolute";
DUEL_MENU.style.display = "none";
DUEL_MENU.style.top = DUEL_MENU.style.left = "0px";
DUEL_MENU.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
DUEL_MENU.style.zIndex = 5;

BUTTON_CLOSEMENU.style.width = BUTTON_CLOSEMENU.style.height = BUTTON_HEIGHT + "px";
BUTTON_CLOSEMENU.style.position = "absolute";
BUTTON_CLOSEMENU.style.left = window.innerWidth - BUTTON_HEIGHT + "px";
BUTTON_CLOSEMENU.style.top = 0 + "px";

SAVE_PLAYER_MENU.style.top = BUTTON_HEIGHT + "px";

POPUP_PERMISSION.style.display = "none";
POPUP_PERMISSION.style.position = "absolute";
POPUP_PERMISSION.style.zIndex = 100;
POPUP_PERMISSION.style.width = POPUP_PERMISSION.style.height = POPUP_HEIGHT + "px";
POPUP_PERMISSION.style.left = window.innerWidth / 2 - POPUP_HEIGHT / 2 + "px";
POPUP_PERMISSION.style.top = window.innerHeight / 2 - POPUP_HEIGHT / 2 + "px";

DUEL_FIELD.style.width = window.innerWidth + "px";
DUEL_FIELD.style.height = window.innerHeight + "px";
