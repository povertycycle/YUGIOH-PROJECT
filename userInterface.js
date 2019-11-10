function displayCard(imageURL)
{
    CARD_IMAGE.src = imageURL;
}

function openCardMenu(e)
{
    CARD_MENU.style.display = "unset";
    CARD_MENU.style.top = e.clientY + "px";
    CARD_MENU.style.left = e.clientX + "px";
}

function makeLabel(cardName, imageURL, type)
{
    var label = document.createElement("div");
    label.innerHTML = cardName;
    label.style.color = "white";
    label.style.marginBottom = "2px";
    label.style.overflow = "hidden";
    label.style.whiteSpace = "nowrap";
    label.style.height = LABEL_HEIGHT + "px";
    label.style.backgroundColor = TYPES[type];
    label.onclick = function(e)
    {
        openCardMenu(e);
    }
    label.onmouseenter = function()
    {
        SELECTED_CARD = cardName;
        displayCard(imageURL);
    }
    label.style.width = cardListDisplayer.style.width;
    return label;
}

var interval = window.setInterval(function()
{    
    console.log("Looking for cards...");
    if (CARD_LIST)
    {
        var cardNames = Object.keys(CARD_LIST);
        for (i = 0; i < cardNames.length; i++)
        {
            var name = cardNames[i];
            var cardLabel = makeLabel(name, CARD_LIST[name]["image"], CARD_LIST[name]["type"]);
            CARD_LIST_DISPLAYER.appendChild(cardLabel);
        }
    }
    if (PROCESS_DONE) window.clearInterval(interval);
}, 1000);

function searchCards()
{
    var regexMatch = SEARCHBAR.value;
    var regex = new RegExp(regexMatch, "gi");
    while (CARD_LIST_DISPLAYER.firstChild)
    {
        CARD_LIST_DISPLAYER.removeChild(CARD_LIST_DISPLAYER.firstChild);
    }
    if (CARD_LIST)
    {
        var cardNames = Object.keys(CARD_LIST);
        for (i = 0; i < cardNames.length; i++)
        {
            var name = cardNames[i];
            if (name.match(regex) != null)
            {
                var cardLabel = makeLabel(name, CARD_LIST[name]["image"], CARD_LIST[name]["type"]);
                CARD_LIST_DISPLAYER.appendChild(cardLabel);
            }
        }
    }
}

function initDeck(deckEl, text)
{
    deckEl.innerText = text;
    deckEl.style.width = DECK_LIST_WIDTH;
    deckEl.style.height = NEW_DECK_HEIGHT;
    deckEl.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
    deckEl.onclick = function()
    {
        openDeck(text);
    }
}

function makeDeck()
{
    var numOfDecks = DECK_LIST.children.length;
    var deckName = "Deck " + (numOfDecks+1);
    var newDeck = document.createElement("div");
    LOCAL_DECKS[deckName] = {};
    initDeck(newDeck, deckName);
    DECK_LIST.appendChild(newDeck);
}

function openDeck(name)
{
    console.log("Opening deck " + name + " ...")
    while(DECK_CONTENT.firstChild)
    {
        DECK_CONTENT.removeChild(DECK_CONTENT.firstChild);
    }
    SELECTED_DECK = LOCAL_DECKS[name];
    SELECTED_DECK_NAME = name;
    console.log(SELECTED_DECK);
    var l = Object.keys(SELECTED_DECK);
    for (item of l)
    {
        for (i = 0; i < SELECTED_DECK[item]; i++)
        {
            var card = document.createElement("div");
            initializeCardDiv(card, item);
            DECK_CONTENT.appendChild(card);
        }
    }
}

function handleFile(file)
{
    console.log(json);
}

function initializeCardDiv(card, text)
{
    card.style.width = DECK_CONTENT.style.width;
    card.style.height = DECK_CARD_LIST_HEIGHT + "px";
    card.style.backgroundColor = TYPES[CARD_LIST[text]["type"]];
    card.innerText = text;
}

function addToDeck()
{
    SELECTED_DECK[SELECTED_CARD] ? SELECTED_DECK[SELECTED_CARD] += 1 : SELECTED_DECK[SELECTED_CARD] = 1;
    console.log(SELECTED_DECK);
    var card = document.createElement("div");
    initializeCardDiv(card, SELECTED_CARD);    
    DECK_CONTENT.appendChild(card);
}

function saveDeck()
{
    LOCAL_DECKS[SELECTED_DECK_NAME] = SELECTED_DECK;
    console.log(LOCAL_DECKS);
}

function downloadDeck()
{
    
}