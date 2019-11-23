function processCard(card) {
    var cardData =
    {
        "attr": card["attribute"],
        "level": card["level"],
        "image": card["card_images"][0]["image_url"],
        "archetype": card["archetype"],
        "race": card["race"],
        "type": card["type"],
        "desc": card["desc"],
        "atk": card["atk"],
        "def": card["def"]
    }
    return cardData;
}

function addButtonFunctionality(button) {
    switch (button.id) {
        case "storyMode":
            button.style.backgroundImage = "url('/static/assets/story_mode.jpg')";
            button.onclick = function () {
                goToStoryMode();
            }
            break;
        case "freeDuel":
            button.style.backgroundImage = "url('/static/assets/free_duel.jpg')";
            button.onclick = function () {
                goToFreeDuel();
            }
            break;
        case "buildDeck":
            button.style.backgroundImage = "url('/static/assets/build_deck.jpg')";
            button.onclick = function () {
                goToBuildDeck();
            }
            break;
        case "option":
            button.style.backgroundImage = "url('/static/assets/option.jpg')";
            button.onclick = function () {
                goToOption();
            }
            break;
        case "gallery":
        default:
            button.style.backgroundImage = "url('/static/assets/story_mode.jpg')";
            button.onclick = function () {
                goToGallery();
            }
            break;
    }
}

function makeStdButton(text, divTarget) {
    var b = document.createElement("button");
    b.id = (text.charAt(0).toLowerCase() + text.substr(1)).replace(" ", "");
    addButtonFunctionality(b);
    b.className = "btn";
    b.style.width = window.innerWidth / 5 + "px";
    b.style.animation = "fadeIn " + BUTTON_FADE_TIME * 10 + "s";
    b.style.height = window.innerHeight + "px";
    b.style.backgroundSize = window.innerWidth / 5 + "px " + window.innerHeight + "px";
    b.style.fontSize = MAIN_MENU_FONT_SIZE + "px";
    b.style.color = "white";
    b.onmouseenter = function () {
        b.style.opacity = "50%";
        b.innerText = text;
        b.style.animation = "buttonMouseEnter 1s";
        b.style.animationPlayState = "running";
    }
    b.onmouseout = function () {
        b.style.opacity = "100%";
        b.innerText = "";
        b.style.animation = "buttonMouseOut 1s";
        b.style.animationPlayState = "running";
    }
    divTarget.appendChild(b);
}

function createButtons(k) {
    setTimeout(function () {
        if (k < MAIN_MENU_BUTTONS.length) {
            makeStdButton(MAIN_MENU_BUTTONS[k], DIV_MAIN_MENU);
            createButtons(k + 1);
        }
    }, BUTTON_FADE_TIME * 1000);
}

function initializeMainMenu() {
    DIV_MAIN_TITLE.style.display = "none";
    DIV_MAIN_MENU.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
    DIV_MAIN_MENU.style.width = window.innerWidth + "px";
    DIV_MAIN_MENU.style.height = window.innerHeight + "px";
    DIV_MAIN_MENU.style.display = "flex";
    createButtons(0);

    DIV_MAIN_MENU.addEventListener('animationend', function (e) {
        if (e.target.nodeName === "DIV") {

            if (e.animationName === "fadeOut") {
                DIV_MAIN_MENU.style.display = "none";
                if (e.target.id === "goToBuildDeck") {
                    DIV_BUILD_DECK_MENU.style.display = "";
                    DIV_BUILD_DECK_MENU.style.animation = "fadeIn " + MAIN_TITLE_FADE_TIME + "s";
                    DIV_BUILD_DECK_MENU.style.animationPlayState = "running";
                }
            }
        }
    })

    buildDeckDisplay();
}

DIV_BUILD_DECK_MENU.addEventListener('animationend', function (e) {
    if (e.animationName === "fadeOut") {
        DIV_BUILD_DECK_MENU.style.display = "none";
        DIV_MAIN_MENU.style.display = "flex";
        DIV_MAIN_MENU.style.animation = "fadeIn " + MAIN_TITLE_FADE_TIME + "s";
    }
})

function goToFreeDuel() {
    freeDuelDisplay();

}

function goToBuildDeck() {
    BUTTON_BUILD_DECK = document.getElementById("buildDeck");
    BUTTON_BUILD_DECK.style.animation = "buttonBlinking 0.5s";
    DIV_BUILD_DECK_MENU.style.width = window.innerWidth + "px";
    DIV_BUILD_DECK_MENU.style.height = window.innerHeight + "px";
    DIV_MAIN_MENU.id = "goToBuildDeck";
    DIV_MAIN_MENU.style.animation = "fadeOut " + MAIN_TITLE_FADE_TIME + "s";
    DIV_MAIN_MENU.style.animationDelay = "0.5s";
}