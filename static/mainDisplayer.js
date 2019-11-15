CARD_LIST_DISPLAYER.style.width = CARD_LIST_DISPLAYER_WIDTH + "px";
CARD_LIST_DISPLAYER.style.height = CARD_LIST_DISPLAYER_HEIGHT + "px";
CARD_LIST_DISPLAYER.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
CARD_LIST_DISPLAYER.style.overflow = "hidden scroll";

SEARCHBAR.style.width = CARD_LIST_DISPLAYER_WIDTH - BUTTON_HEIGHT + "px";
SEARCHBAR.style.height = SEARCHBAR_HEIGHT + "px";
BUTTON_SEARCHBAR.style.width = BUTTON_SEARCHBAR.style.height = BUTTON_HEIGHT + "px";
BUTTON_SEARCHBAR.style.padding = "0px";

CARD_IMAGE.style.width = DECK_CARD_IMAGE.style.width = CARD_DISPLAY_WIDTH + "px";
CARD_IMAGE.style.height = DECK_CARD_IMAGE.style.height = CARD_DISPLAY_HEIGHT + "px";

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

OPTION_LIST.style.width = BUTTON_UPLOADDECK.style.width = BUTTON_SEARCHPLAYER.style.width = BUTTON_MAKEDECK.style.width = BUTTON_SAVEDECK.style.width = BUTTON_DOWNLOADDECK.style.width = OPTION_LIST_WIDTH + "px";

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
POPUP_PERMISSION.style.left = window.innerWidth/2 - POPUP_HEIGHT/2 + "px";
POPUP_PERMISSION.style.top = window.innerHeight/2 - POPUP_HEIGHT/2 + "px";

