function showCardList(p, letter) {
    if (letter !== "0-9 ~ #") {
        displayCardDatabase(p, letter.toLowerCase());
    }
    else {
        displayCardDatabase(p, /[^a-zA-Z\s:]/)
    }
}

function makeLetter(alp) {
    var letter = document.createElement("div");
    letter.style.width = DIV_CARD_LIST_WIDTH - 2 * GAP_WIDTH + "px";
    letter.style.height = LETTER_DROP_DOWN_HEIGHT + "px";
    letter.style.fontSize = LETTER_DROP_DOWN_FONT_SIZE + "px";
    letter.style.borderRadius = LETTER_DROP_DOWN_BORDER_RADIUS + "px";
    letter.style.borderStyle = "inset";
    letter.style.display = "inline-table"
    letter.style.background = "#444444";
    letter.id = alp;
    var p = document.createElement("div");
    p.innerText = alp;
    p.style.margin = "0px 0px 0px " + LETTER_DROP_DOWN_BORDER_RADIUS + "px";
    letter.appendChild(p);
    p.onmouseenter = function () {
        letter.style.width = DIV_CARD_LIST_WIDTH - 4 * GAP_WIDTH + "px";
        letter.style.opacity = "75%";
    }
    p.onmouseout = function () {
        letter.style.width = DIV_CARD_LIST_WIDTH - 2 * GAP_WIDTH + "px";
        letter.style.opacity = "100%";
    }
    p.onclick = function () {
        while (OPENED_CARD_LIST && OPENED_CARD_LIST.childNodes.length > 1) {
            OPENED_CARD_LIST.removeChild(OPENED_CARD_LIST.lastChild);
        }
        if (OPENED_CARD_LIST && OPENED_CARD_LIST.id !== alp) {

            showCardList(letter, alp);
            DIV_CARD_LIST_DISPLAY.scrollTop = (alp.charCodeAt(0) - 64) * (LETTER_DROP_DOWN_HEIGHT + GAP_WIDTH + BORDER_RADIUS);

        }
        if (!OPENED_CARD_LIST) {
            showCardList(letter, alp);
            DIV_CARD_LIST_DISPLAY.scrollTop = (alp.charCodeAt(0) - 64) * (LETTER_DROP_DOWN_HEIGHT + GAP_WIDTH + BORDER_RADIUS);
        }
        OPENED_CARD_LIST = letter;
    }
    return letter;
}

function displayDatabaseLetters() {
    var letter = makeLetter("0-9 ~ #");
    DIV_CARD_LIST_DISPLAY.appendChild(letter);
    for (var i = 0; i < 26; i++) {
        var letter = makeLetter(String.fromCharCode(i + 65));
        DIV_CARD_LIST_DISPLAY.appendChild(letter);
    }
}

function cardLabel(name, type) {
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
    label.style.fontSize = LETTER_DROP_DOWN_FONT_SIZE / 2 + "px";
    label.className = "cardDB";
    label.style.width = DIV_CARD_LIST_WIDTH + "px";
    return label;
}

function displayCardDatabase(p, regex) {
    if (CARD_DATABASE) {
        var c = Object.keys(CARD_DATABASE);
        for (i = 0; i < c.length; i++) {
            if (c[i].charAt(0).toLowerCase().match(regex)) {
                var l = cardLabel(c[i], CARD_DATABASE[c[i]]["type"]);
                p.appendChild(l);
            }
        }
        $('.cardDB').on('mouseenter mouseout', function (e) {
            if (e.type === "mouseenter") {
                var txt = e.target.innerText;
                SELECTED_CARD = txt.replace(/\"/g, "\'");
                e.target.style.borderStyle = "solid";
                openCardMenu(e);
                IMAGE_CARD_DATABASE_DISPLAY.src = CARD_DATABASE[txt]["image"];
            }
            else if (e.type === "mouseout") {
                e.target.style.borderStyle = "";
            }
        })
    }
}

function searchCards() {
    var regexMatch = INPUT_SEARCH_BAR.value;
    var regex = new RegExp(regexMatch, "gi");

    while (OPENED_CARD_LIST && OPENED_CARD_LIST.childNodes.length > 1) {
        OPENED_CARD_LIST.removeChild(OPENED_CARD_LIST.lastChild);
    }
    if (OPENED_CARD_LIST) {
        var alp = OPENED_CARD_LIST.id.toLowerCase();
        if (CARD_DATABASE) {
            var c = Object.keys(CARD_DATABASE);
            for (i = 0; i < c.length; i++) {
                if (c[i].charAt(0).toLowerCase().match(alp) && c[i].match(regex) != null) {
                    var l = cardLabel(c[i], CARD_DATABASE[c[i]]["image"], CARD_DATABASE[c[i]]["type"]);
                    OPENED_CARD_LIST.appendChild(l);
                }
            }
        }
    }
    DIV_CARD_LIST_DISPLAY.scrollTop = (alp.charCodeAt(0) - 96) * (LETTER_DROP_DOWN_HEIGHT + GAP_WIDTH + BORDER_RADIUS);
}

function initDeck(d, text) {
    d.innerText = text;
    d.style.width = BUTTON_BUILD_MENU_WIDTH + "px";
    d.style.height = BUTTON_BUILD_MENU_HEIGHT + "px";
    d.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
    d.style.borderRadius = BORDER_RADIUS + "px";
    d.style.padding = GAP_WIDTH + "px";
    d.style.border = "white";
    d.onmouseenter = function () {
        d.style.borderStyle = "solid";
    }
    d.onmouseout = function () {
        d.style.borderStyle = "";
    }
    d.onclick = function () {
        openDeck(d.innerText);
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
    DECK_REQUEST.open('GET', '/getAllLocalDecks');
    DECK_REQUEST.send();
}

async function getAllLocalDecks(name, deck) {
    return new Promise(resolve => {
        if (LOCAL_DECKS[name]) {
            DIV_TEXT_QUESTION.innerText = "Do you want to replace Deck: " + name + " with a local deck with the same name?";
            DIV_POPUP_PERMISSION.style.display = "unset";
            BUTTON_YES.onclick = function () {
                LOCAL_DECKS[name] = deck;
                DIV_POPUP_PERMISSION.style.display = "none";
                resolve('y');

            };
            BUTTON_NO.onclick = function () {
                DIV_POPUP_PERMISSION.style.display = "none";
                resolve('n');
            };
        }
        else {
            LOCAL_DECKS[name] = deck;
            resolve('n.a.');
        }
    });

}

function initCardDiv(card, text) {
    var cType = CARD_DATABASE[text]["type"];
    card.style.width = DIV_DECK_CONTENT.style.width;
    card.style.height = CARD_LIST_HEIGHT + "px";
    card.style.background = TYPES[cType];
    card.style.borderRadius = BORDER_RADIUS + "px";
    card.style.border = "white";
    card.style.display = "flex";
    card.style.borderRadius = BORDER_RADIUS + "px";
    card.style.border = "white";
    card.style.fontSize = LETTER_DROP_DOWN_FONT_SIZE / 2 + "px";
    var cardName = document.createElement("div");
    cardName.style.width = DIV_CARD_LIST_WIDTH + "px";
    cardName.innerText = text;
    cardName.style.overflow = "hidden";
    card.appendChild(cardName);
    var cardType = document.createElement("div");
    cardType.style.width = CARD_TYPE_WIDTH + "px";
    cardType.innerText = cType;
    card.appendChild(cardType);
}

function openDeck(name) {
    while (DIV_DECK_CONTENT.firstChild) {
        DIV_DECK_CONTENT.removeChild(DIV_DECK_CONTENT.firstChild);
    }
    SELECTED_DECK = LOCAL_DECKS[name];
    SELECTED_DECK_NAME = name;
    var l = Object.keys(SELECTED_DECK);
    for (item of l) {
        for (i = 0; i < SELECTED_DECK[item]; i++) {
            var card = document.createElement("div");
            initCardDiv(card, item.replace(/\'/g, "\""));
            card.className = "card";
            card.id = item;
            DIV_DECK_CONTENT.appendChild(card);
        }
    }
    $('.card').on('mouseenter mouseout', function (e) {
        if (e.type === "mouseenter") {
            var txt = e.currentTarget.id;
            SELECTED_CARD = txt;
            IMAGE_CARD_DECK_DISPLAY.src = CARD_DATABASE[txt.replace(/\'/g, "\"")]["image"];
            e.currentTarget.style.borderStyle = "solid";
            openCardMenu(e);
        }
        else if (e.type === "mouseout") {
            e.currentTarget.style.borderStyle = "";
        }
    })
}

function openCardMenu(e) {
    var targetPool = e.currentTarget.parentNode.id;
    if (targetPool === "deckContent") {
        MENU_CARD.style.left = DIV_CARD_LIST_WIDTH + CARD_DISPLAY_WIDTH + BUTTON_BUILD_MENU_WIDTH - MENU_WIDTH + GAP_WIDTH + "px";
    }
    else {
        MENU_CARD.style.left = DIV_CARD_LIST_WIDTH - SCROLL_BAR_WIDTH - MENU_WIDTH + 3 * GAP_WIDTH + "px";
    }
    MENU_CARD.style.display = "unset";
    MENU_CARD.style.top = e.pageY + "px";
}
function hideCardMenu() {
    MENU_CARD.style.display = "unset";
}

function addToDeck() {
    SELECTED_DECK[SELECTED_CARD] ? SELECTED_DECK[SELECTED_CARD] += 1 : SELECTED_DECK[SELECTED_CARD] = 1;
    var card = document.createElement("div");
    initCardDiv(card, SELECTED_CARD.replace(/\'/g, "\""));
    card.id = SELECTED_CARD;
    DIV_DECK_CONTENT.appendChild(card);
}

function removeFromDeck() {
    SELECTED_DECK[SELECTED_CARD] - 1 == 0 ? delete SELECTED_DECK[SELECTED_CARD] : SELECTED_DECK[SELECTED_CARD] -= 1;
    DIV_DECK_CONTENT.removeChild(document.getElementById(SELECTED_CARD))
}

function saveDeck() {
    LOCAL_DECKS[SELECTED_DECK_NAME] = SELECTED_DECK;
    DECK_REQUEST.open('GET', '/saveDeck/' + JSON.stringify(SELECTED_DECK_NAME) + ";" + JSON.stringify(SELECTED_DECK));
    DECK_REQUEST.send();
}

function renameDeck() {
    DIV_INPUT_PROMPT.innerText = "Enter name:"
    DIV_INPUT_MENU.style.display = "unset";
    
}

function backToMainMenu() {
    DIV_BUILD_DECK_MENU.style.animation = "fadeOut " + MAIN_TITLE_FADE_TIME + "s";
}

DECK_REQUEST.onload = async function () {
    if (DECK_REQUEST.response) {
        var json = JSON.parse(DECK_REQUEST.response)
        if (json["code"] == REQUEST_ALL_LOCAL_DECKS) {
            var decks = json["files"];
            var deckNames = Object.keys(decks);
            for (item of deckNames) {
                var res = await getAllLocalDecks(item, decks[item]);
                if (res == 'n.a.') {
                    var d = document.createElement("div");
                    initDeck(d, item);
                    DIV_DECK_LIST.appendChild(d);
                }
            }
        }
        else if (json["code"] == REQUEST_DECK_SAVED) {

            DIV_NOTIFICATION.style.animation = "fadeIn " + BUTTON_FADE_TIME + "s";
            DIV_NOTIFICATION.innerText = "Deck Saved";
            DIV_NOTIFICATION.style.display = "unset";
            DIV_NOTIFICATION.style.animation = "fadeInOut " + NOTIFICATION_FADE_TIME + "s";
            
        }
        else if (json["code"] == REQUEST_DECK_RENAMED) {
            DIV_NOTIFICATION.style.animation = "fadeIn " + BUTTON_FADE_TIME + "s";
            DIV_NOTIFICATION.innerText = "Deck Renamed";
            DIV_NOTIFICATION.style.display = "unset";
            DIV_NOTIFICATION.style.animation = "fadeInOut " + NOTIFICATION_FADE_TIME + "s";
        }
    }
};