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

PLAYER_LIST.style.width = window.innerWidth + "px";
PLAYER_LIST.style.height = window.innerHeight + "px";
PLAYER_LIST.style.position = "absolute";
PLAYER_LIST.style.display = "none";
PLAYER_LIST.style.top = PLAYER_LIST.style.left = "0px";
PLAYER_LIST.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
PLAYER_LIST.style.zIndex = 5;

BUTTON_CLOSEMENU.style.width = BUTTON_CLOSEMENU.style.height = BUTTON_HEIGHT + "px";