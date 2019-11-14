function displayCard(imageURL)
{
    CARD_IMAGE.src = imageURL;
}

function displayDeckCard(url)
{
    DECK_CARD_IMAGE.src = url;
}

function openDeckMenu(e)
{
    DECK_MENU.style.display = "unset";
    DECK_MENU.style.top = e.clientY + "px";
    DECK_MENU.style.left = e.clientX + "px";
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
    label.style.borderRadius = BORDER_RADIUS + "px";
    label.style.border = "white";
    label.onclick = function(e)
    {
        openCardMenu(e);
    }
    label.onmouseenter = function()
    {
        SELECTED_CARD = cardName.replace(/\"/g, "\'");
        displayCard(imageURL);
        label.style.borderStyle = "solid";
    }
    label.onmouseout = function ()
    {
        label.style.borderStyle = "";
    }
    label.style.width = cardListDisplayer.style.width;
    return label;
}

var interval = window.setInterval(function()
{    
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
    deckEl.style.borderRadius = BORDER_RADIUS + "px";
    deckEl.style.border = "white";
    deckEl.onmouseenter = function ()
    {
        deckEl.style.borderStyle = "solid";
    }
    deckEl.onmouseout = function()
    {
        deckEl.style.borderStyle = "";
    }
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
    var l = Object.keys(SELECTED_DECK);
    for (item of l)
    {
        for (i = 0; i < SELECTED_DECK[item]; i++)
        {
            var card = document.createElement("div");
            initializeCardDiv(card, item);
            var id = document.createAttribute("id");
            id.value = item;
            card.setAttributeNode(id);
            DECK_CONTENT.appendChild(card);
        }
    }
}

function initializeCardDiv(card, text)
{
    card.style.width = DECK_CONTENT.style.width;
    card.style.height = DECK_CARD_LIST_HEIGHT + "px";
    card.style.backgroundColor = TYPES[CARD_LIST[text.replace(/\'/g, "\"")]["type"]];
    card.innerText = text;
    card.style.borderRadius = BORDER_RADIUS + "px";
    card.style.border = "white";
    
    card.onmouseenter = function()
    {
        SELECTED_DECK_CARD = text;
        displayDeckCard(CARD_LIST[text.replace(/\'/g, "\"")]["image"]);
        card.style.borderStyle = "solid";
    }
    card.onmouseout = function()
    {
        card.style.borderStyle = "";
    }
    card.onclick = function(e)
    {
        openDeckMenu(e);
    }
}

function addToDeck()
{
    SELECTED_DECK[SELECTED_CARD] ? SELECTED_DECK[SELECTED_CARD] += 1 : SELECTED_DECK[SELECTED_CARD] = 1;
    var card = document.createElement("div");
    var id = document.createAttribute("id");
    id.value = SELECTED_CARD;
    card.setAttributeNode(id);
    initializeCardDiv(card, SELECTED_CARD);    
    DECK_CONTENT.appendChild(card);
}

function removeFromDeck()
{
    console.log(SELECTED_DECK_CARD);
    SELECTED_DECK[SELECTED_DECK_CARD] - 1 == 0 ? delete SELECTED_DECK[SELECTED_DECK_CARD] : SELECTED_DECK[SELECTED_DECK_CARD] -= 1;
    DECK_CONTENT.removeChild(document.getElementById(SELECTED_DECK_CARD))
}

function saveDeck()
{
    LOCAL_DECKS[SELECTED_DECK_NAME] = SELECTED_DECK;
}

function downloadDeck()
{
    DECK_REQUEST.open('GET', 'downloadDeck/'+JSON.stringify(SELECTED_DECK_NAME)+";"+JSON.stringify(SELECTED_DECK))
    DECK_REQUEST.send();
}

DECK_REQUEST.open('GET', '/requestResponse/'+ALL_LOCAL_DECKS+";NONE");
DECK_REQUEST.send();

DECK_REQUEST.onload = async function() 
{
    if (DECK_REQUEST.response) 
    {
        var json = JSON.parse(DECK_REQUEST.response)
        if (json["code"]==ALL_LOCAL_DECKS)
        {
            var JSON_DECKS = json["files"];
            for (item of Object.keys(JSON_DECKS))
            {
                var deckName =  JSON_DECKS[item];
                LOCAL_DECKS[deckName] = {};                
                DECK_REQUEST.open('GET', '/requestResponse/'+LOCAL_DECK+';'+deckName);
                DECK_REQUEST.send();         
            }
        }
        else if (json["code"]==LOCAL_DECK)
        {
            var deckName = json["files"][0].split('.')[0];
            LOCAL_DECKS[deckName] = json["files"][1];
            var newDeck = document.createElement("div");
            initDeck(newDeck, deckName);
            DECK_LIST.appendChild(newDeck);
        }
        else if (json["code"]==DOWNLOAD_DECK)
        {
            alert("Deck has been saved...")
        }
    }
};

function searchPlayer()
{
    PLAYER_LIST.style.display = "unset";
}

function closePlayerSearch()
{
    PLAYER_LIST.style.display = "none";
}