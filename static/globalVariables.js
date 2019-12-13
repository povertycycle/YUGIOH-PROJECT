var BODY = document.getElementsByTagName("body")[0];
var DIV_MAIN_TITLE = document.getElementById("mainTitle");
var DIV_MAIN_MENU = document.getElementById("mainMenu");
var DIV_BUILD_DECK_MENU = document.getElementById("buildDeckMenu");
var DIV_FREE_DUEL_LOBBY = document.getElementById("freeDuelLobby");
var DIV_POPUP_PERMISSION = document.getElementById("popupPermission");
var DIV_NOTIFICATION = document.getElementById("notification");
var DIV_INPUT_MENU = document.getElementById("inputMenu");
var DIV_INPUT_PROMPT;
var DIV_CARD_LIST_DISPLAY;
var DIV_DECK_CONTAINER;
var DIV_DECK_CONTENT;
var DIV_DECK_LIST;
var DIV_TEXT_QUESTION;
var DIV_CHAT_LIST_DISPLAY;
var BUTTON_STORY_MODE;
var BUTTON_FREE_DUEL;
var BUTTON_BUILD_DECK;
var BUTTON_OPTION;
var BUTTON_GALLERY;
var BUTTON_SEARCH_BAR;
var BUTTON_NEW_DECK;
var BUTTON_GET_LOCAL_DECKS;
var BUTTON_SAVE_DECK;
var BUTTON_RENAME_DECK;
var BUTTON_YES;
var BUTTON_NO;
var BUTTON_BACK_TO_MAIN_MENU;
var INPUT_SEARCH_BAR;
var INPUT_PROMPT;
var IMAGE_CARD_DATABASE_DISPLAY;
var IMAGE_CARD_DECK_DISPLAY;
var DIV_BUILD_DECK_OPTIONS;
var OPENED_CARD_LIST;
var MENU_CARD = document.getElementById("cardMenu");

var DEFAULT_BACKGROUND_COLOR = "#191919";
var DEFAULT_SETTINGS_COLOR = "#BDBDBD";

var GAP_WIDTH = 5;
var BORDER_RADIUS = 1;
var MAIN_TITLE_FONT_SIZE = 40;
var MAIN_TITLE_FADE_TIME = 1;
var MAIN_MENU_FONT_SIZE = 20;
var BUTTON_FADE_TIME = 0.25;
var NOTIFICATION_FADE_TIME = 5;
var BUTTON_SEARCH_DIMENSION = 25;
var BUTTON_BUILD_MENU_WIDTH = 100;
var BUTTON_BUILD_MENU_HEIGHT = 25;
var DIV_CARD_LIST_WIDTH = 300;
var DIV_CARD_LIST_HEIGHT = window.innerHeight - BUTTON_SEARCH_DIMENSION - 2 * GAP_WIDTH;
var DIV_POPUP_HEIGHT = 100;
var DIV_POPUP_WIDTH = 200;
var CARD_LIST_HEIGHT = 20;
var CARD_RATIO = 421 / 614;
var CARD_DISPLAY_HEIGHT = window.innerHeight / 2 - 4 * BORDER_RADIUS;
var CARD_DISPLAY_WIDTH = CARD_RATIO * CARD_DISPLAY_HEIGHT;
var CARD_TYPE_WIDTH = 100;
var DIV_DECK_CONTENT_WIDTH = window.innerWidth - BUTTON_BUILD_MENU_WIDTH - CARD_DISPLAY_WIDTH - DIV_CARD_LIST_WIDTH - GAP_WIDTH * 4;
var DIV_PLAYER_LIST_WIDTH = 200;
var DIV_PLAYER_LIST_HEIGHT = 400;
var DIV_DUEL_SETTINGS_WIDTH = 400;
var LETTER_DROP_DOWN_HEIGHT = 30;
var LETTER_DROP_DOWN_FONT_SIZE = 19;
var LETTER_DROP_DOWN_BORDER_RADIUS = 10;
var MENU_WIDTH = 20;
var MENU_LEFT_DECK_CONTENT =
    DIV_CARD_LIST_WIDTH +
    CARD_DISPLAY_WIDTH +
    BUTTON_BUILD_MENU_WIDTH +
    2 * GAP_WIDTH +
    5 * BORDER_RADIUS -
    MENU_WIDTH;
var SCROLL_BAR_WIDTH = 10;
var INPUT_CHAT_HEIGHT = 30;
var INPUT_CHAT_WIDTH = 200;

var API_REQUEST = new XMLHttpRequest();
var DECK_REQUEST = new XMLHttpRequest();
var PLAYER_REQUEST = new XMLHttpRequest();

var MAIN_MENU_BUTTONS = [
    "Story Mode",
    "Free Duel",
    "Build Deck",
    "Option",
    "Galery"
];

var TYPES = {
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

var CARD_DATABASE = {};
var LOCAL_DECKS = {};

var REQUEST_ALL_LOCAL_DECKS = 100;
var REQUEST_DECK_SAVED = 101;
var REQUEST_DECK_RENAMED = 102;
var REGISTER_PLAYER_SUCCESS = 300;
var REGISTER_PLAYER_DUPLiCATE_NAME = 301;
var GET_PLAYER_LIST = 302;

var SELECTED_DECK;
var SELECTED_DECK_NAME;
var SELECTED_CARD;
var SELECTED_DUELIST;
var NAME_CURRENT_PLAYER = "";

var SOCKET = io.connect("http://" + document.domain + ":" + location.port);








var BUTTON_UPLOADDECK = document.getElementById("uploadDeck");
var BUTTON_SEARCHPLAYER = document.getElementById("searchPlayer");
var BUTTON_CLOSEMENU = document.getElementById("closeMenu");
var BUTTON_REFRESH_LIST = document.getElementById("refreshPlayerList");
var DECK_MENU = document.getElementById("deckMenu");
var DUEL_MENU = document.getElementById("duelMenu");
var PLAYER_LIST = document.getElementById("playerList");
var PLAYER_NAME_INPUT_TEXT = document.getElementById("inputPlayerName");
var SAVE_PLAYER_MENU = document.getElementById("savePlayerMenu");
var DECK_LIST_FOR_DUEL = document.getElementById("deckForDuel");
var DUEL_FIELD = document.getElementById("duelField");

var TARGET_DUELIST;
var DUELISTS = [];
var DUELING_DECK;

var DECK_LIST_WIDTH = 150;
var DECK_CARD_LIST_HEIGHT = 25;
var NEW_DECK_HEIGHT = 25;
var DECK_LIST_HEIGHT = 1000;



var PROCESS_DONE = false;