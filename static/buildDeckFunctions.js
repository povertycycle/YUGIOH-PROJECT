function displayDatabaseLetters() {
    for (var i = 0; i < 27; i++)
    {
        
    }
}

function cardLabel(name, url, type) {
    var label = document.createElement("div");
    label.innerHTML = name;
    label.style.color = "white";
    label.style.marginBottom = "2px";
    label.style.overflow = "hidden";
    label.style.whiteSpace = "nowrap";
    label.style.height = CARD_LIST_HEIGHT + "px";
    label.style.background = TYPES[type];
    label.style.borderRadius = BORDER_RADIUS + "px";
    label.style.border = "white";
    label.onmouseenter = function () {
        IMAGE_CARD_DATABASE_DISPLAY.src = url
        label.style.borderStyle = "solid";
    }
    label.onmouseout = function () {
        label.style.borderStyle = "";
    }
    label.style.width = DIV_CARD_LIST_WIDTH + "px";
    return label;
}

function displayCardDatabase() {
    if (CARD_DATABASE) {
        console.log("INSIDE");
        var c = Object.keys(CARD_DATABASE);
        for (i = 0; i < c.length; i++) {
            var name = c[i];
            var l = cardLabel(name, CARD_DATABASE[name]["image"], CARD_DATABASE[name]["type"]);
            DIV_CARD_LIST_DISPLAY.appendChild(l);
        }
    }
}

function searchCards() {
    var regexMatch = INPUT_SEARCH_BAR.value;
    var regex = new RegExp(regexMatch, "gi");
    while (IMAGE_CARD_DATABASE_DISPLAY.firstChild) {
        IMAGE_CARD_DATABASE_DISPLAY.removeChild(IMAGE_CARD_DATABASE_DISPLAY.firstChild);
    }
    if (CARD_CARD_DATABASELIST) {
        var c = Object.keys(CARD_DATABASE);
        for (var i = 0; i < c.length; i++) {
            var name = c[i];
            if (name.match(regex) != null) {
                var l = cardLabel(name, CARD_DATABASE[name]["image"], CARD_DATABASE[name]["type"]);
                IMAGE_CARD_DATABASE_DISPLAY.appendChild(l);
            }
        }
    }
}

function initDeck(d, text) {
    d.innerText = text;
    d.style.width = BUTTON_BUILD_MENU_WIDTH;
    d.style.height = BUTOTN_BUILD_MENU_HEIGHT;
    d.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
    d.style.borderRadius = BORDER_RADIUS + "px";
    d.style.border = "white";
    d.onmouseenter = function () {
        d.style.borderStyle = "solid";
    }
    d.onmouseout = function () {
        d.style.borderStyle = "";
    }
    d.onclick = function () {
        openDeck(text);
    }
}

function makeDeck() {
    var numOfDecks = DIV_DECK_LIST.children.length;
    var deckName = "Deck " + (numOfDecks + 1);
    var newDeck = document.createElement("div");
    LOCAL_DECKS[deckName] = {};
    initDeck(newDeck, deckName);
    DIV_DECK_LIST.appendChild(newDeck);
}

function getLocalDecks() {

}