DIV_MAIN_TITLE.style.width = window.innerWidth + "px";
DIV_MAIN_TITLE.style.height = window.innerHeight + "px";
DIV_MAIN_TITLE.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
DIV_MAIN_TITLE.style.padding = window.innerHeight / 2 + "px 0px";
DIV_MAIN_TITLE.style.color = "#ffffff";
DIV_MAIN_TITLE.style.textAlign = "center";
DIV_MAIN_TITLE.style.fontSize = MAIN_TITLE_FONT_SIZE + "px";
DIV_MAIN_TITLE.style.animation = "fadeInOut " + MAIN_TITLE_FADE_TIME + "s linear forwards";
DIV_MAIN_TITLE.innerText = "YUGIOH PROJECT";
DIV_MAIN_MENU.style.animation = "fadeIn " + MAIN_TITLE_FADE_TIME + "s";
DIV_MAIN_MENU.style.animationDelay = MAIN_TITLE_FADE_TIME + "s";

DIV_MAIN_TITLE.addEventListener('animationend', function () {
    initializeMainMenu();
})

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

