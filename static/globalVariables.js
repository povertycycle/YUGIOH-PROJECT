let BODY = document.getElementsByTagName("body")[0];
let DIV_MAIN_TITLE = document.getElementById("mainTitle");
let DIV_MAIN_MENU = document.getElementById("mainMenu");
let DIV_BUILD_DECK_MENU = document.getElementById("buildDeckMenu");
let DIV_FREE_DUEL_LOBBY = document.getElementById("freeDuelLobby");
let DIV_POPUP_PERMISSION = document.getElementById("popupPermission");
let DIV_NOTIFICATION = document.getElementById("notification");
let DIV_INPUT_MENU = document.getElementById("inputMenu");
let DIV_INPUT_PROMPT;
let DIV_CARD_LIST_DISPLAY;
let DIV_DECK_CONTAINER;
let DIV_DECK_CONTENT;
let DIV_DECK_LIST;
let DIV_TEXT_QUESTION;
let DIV_CHAT_LIST_DISPLAY;
let BUTTON_STORY_MODE;
let BUTTON_FREE_DUEL;
let BUTTON_BUILD_DECK;
let BUTTON_OPTION;
let BUTTON_GALLERY;
let BUTTON_SEARCH_BAR;
let BUTTON_NEW_DECK;
let BUTTON_GET_LOCAL_DECKS;
let BUTTON_SAVE_DECK;
let BUTTON_RENAME_DECK;
let BUTTON_YES;
let BUTTON_NO;
let BUTTON_BACK_TO_MAIN_MENU;
let INPUT_SEARCH_BAR;
let INPUT_PROMPT;
let IMAGE_CARD_DATABASE_DISPLAY;
let IMAGE_CARD_DECK_DISPLAY;
let DIV_BUILD_DECK_OPTIONS;
let OPENED_CARD_LIST;
let MENU_CARD = document.getElementById("cardMenu");

let DEFAULT_BACKGROUND_COLOR = "#191919";
let DEFAULT_SETTINGS_COLOR = "#BDBDBD";

let GAP_WIDTH = 5;
let BORDER_RADIUS = 1;
let MAIN_TITLE_FONT_SIZE = 40;
let MAIN_TITLE_FADE_TIME = 1;
let MAIN_MENU_FONT_SIZE = 20;
let BUTTON_FADE_TIME = 0.25;
let NOTIFICATION_FADE_TIME = 5;
let BUTTON_SEARCH_DIMENSION = 25;
let BUTTON_BUILD_MENU_WIDTH = 100;
let BUTTON_BUILD_MENU_HEIGHT = 25;
let DIV_CARD_LIST_WIDTH = 300;
let DIV_CARD_LIST_HEIGHT = window.innerHeight - BUTTON_SEARCH_DIMENSION - 2 * GAP_WIDTH;
let DIV_POPUP_HEIGHT = 100;
let DIV_POPUP_WIDTH = 200;
let CARD_LIST_HEIGHT = 20;
let CARD_RATIO = 421 / 614;
let CARD_DISPLAY_HEIGHT = window.innerHeight / 2 - 4 * BORDER_RADIUS;
let CARD_DISPLAY_WIDTH = CARD_RATIO * CARD_DISPLAY_HEIGHT;
let CARD_TYPE_WIDTH = 100;
let DIV_DECK_CONTENT_WIDTH = window.innerWidth - BUTTON_BUILD_MENU_WIDTH - CARD_DISPLAY_WIDTH - DIV_CARD_LIST_WIDTH - GAP_WIDTH * 4;
let DIV_PLAYER_LIST_WIDTH = 200;
let DIV_PLAYER_LIST_HEIGHT = 400;
let DIV_DUEL_SETTINGS_WIDTH = 400;
let LETTER_DROP_DOWN_HEIGHT = 30;
let LETTER_DROP_DOWN_FONT_SIZE = 19;
let LETTER_DROP_DOWN_BORDER_RADIUS = 10;
let MENU_WIDTH = 20;
let MENU_LEFT_DECK_CONTENT =
    DIV_CARD_LIST_WIDTH +
    CARD_DISPLAY_WIDTH +
    BUTTON_BUILD_MENU_WIDTH +
    2 * GAP_WIDTH +
    5 * BORDER_RADIUS -
    MENU_WIDTH;
let SCROLL_BAR_WIDTH = 10;
let INPUT_CHAT_HEIGHT = 30;
let INPUT_CHAT_WIDTH = 200;

let API_REQUEST = new XMLHttpRequest();
let DECK_REQUEST = new XMLHttpRequest();
let PLAYER_REQUEST = new XMLHttpRequest();

let MAIN_MENU_BUTTONS = [
    "Story Mode",
    "Free Duel",
    "Build Deck",
    "Option",
    "Galery"
];

let TYPES = {
    "Spell Card": "linear-gradient(to right, #0A6B41 35%, #1D9E74)",
    "Normal Monster": "linear-gradient(to right, #A89137 35%, #FDE68A)",
    "Effect Monster": "linear-gradient(to right, #AA360E 35%, #FF8B53)",
    "Flip Effect Monster": "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Trap Card": "linear-gradient(to right, #892751 35%, #BC5A84)",
    "Union Effect Monster": "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Fusion Monster": "linear-gradient(to right, #6D5384 35%, #A086B7)",
    "Pendulum Effect Monster": "linear-gradient(to right, #AA360E, #FF8B53 50%, #0A6B41, #1D9E74)",
    "XYZ Monster": "linear-gradient(to right, #000000 35%, #888888)",
    "Synchro Tuner Monster": "linear-gradient(to right, #777777 35%, #CCCCCC)",
    "Link Monster": "linear-gradient(to right, #00008B 35%, #4444CF)",
    "Tuner Monster": "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Gemini Monster": "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Normal Tuner Monster": "linear-gradient(to right, #A89137 35%, #FDE68A)",
    "Synchro Monster": "linear-gradient(to right, #777777 35%, #CCCCCC)",
    "Spirit Monster": "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Ritual Effect Monster": "linear-gradient(to right, #597188 35%, #9DB5CC)",
    "Token": "linear-gradient(to right, #AAAAAA 35%, #DDDDDD)",
    "Skill Card": "linear-gradient(to right, #00008B 35%, #4444CF)",
    "Ritual Monster": "linear-gradient(to right, #597188 35%, #9DB5CC)",
    "Toon Monster": "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Pendulum Normal Monster": "linear-gradient(to right, #FDE68A 35%, #1D9E74)",
    "Synchro Pendulum Effect Monster": "linear-gradient(to right, #C0C0C0 35%, #1D9E74)",
    "Pendulum Tuner Effect Monster": "linear-gradient(to right, #FF8B53 35%, #1D9E74)",
    "XYZ Pendulum Effect Monster": "linear-gradient(to right, #000000 35%, #1D9E74)",
    "Pendulum Effect Fusion Monster": "linear-gradient(to right, #A086B7 35%, #1D9E74)",
    "Pendulum Flip Effect Monster": "linear-gradient(to right, #FF8B53 35%, #1D9E74)"
};

let CARD_DATABASE = {};
let LOCAL_DECKS = {};

let REQUEST_ALL_LOCAL_DECKS = 100;
let REQUEST_DECK_SAVED = 101;
let REQUEST_DECK_RENAMED = 102;
let REGISTER_PLAYER_SUCCESS = 300;
let REGISTER_PLAYER_DUPLiCATE_NAME = 301;
let GET_PLAYER_LIST = 302;

let SELECTED_DECK;
let SELECTED_DECK_NAME;
let SELECTED_CARD;
let SELECTED_DUELIST;
let NAME_CURRENT_PLAYER = "";

let SOCKET = io.connect("http://" + document.domain + (location.port == "" ? '': ":" + location.port));








let BUTTON_UPLOADDECK = document.getElementById("uploadDeck");
let BUTTON_SEARCHPLAYER = document.getElementById("searchPlayer");
let BUTTON_CLOSEMENU = document.getElementById("closeMenu");
let BUTTON_REFRESH_LIST = document.getElementById("refreshPlayerList");
let DECK_MENU = document.getElementById("deckMenu");
let DUEL_MENU = document.getElementById("duelMenu");
let PLAYER_LIST = document.getElementById("playerList");
let PLAYER_NAME_INPUT_TEXT = document.getElementById("inputPlayerName");
let SAVE_PLAYER_MENU = document.getElementById("savePlayerMenu");
let DECK_LIST_FOR_DUEL = document.getElementById("deckForDuel");
let DUEL_FIELD = document.getElementById("duelField");

let TARGET_DUELIST;
let DUELISTS = [];
let DUELING_DECK;

let DECK_LIST_WIDTH = 150;
let DECK_CARD_LIST_HEIGHT = 25;
let NEW_DECK_HEIGHT = 25;
let DECK_LIST_HEIGHT = 1000;



let PROCESS_DONE = false;