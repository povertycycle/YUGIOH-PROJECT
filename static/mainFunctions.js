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
    DIV_TEXT_QUESTION.style.marginLeft = "-" + BORDER_RADIUS*2 + "px";
    DIV_TEXT_QUESTION.style.marginTop = "-" + BORDER_RADIUS*2 + "px";
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
}