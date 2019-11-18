var BODY = document.getElementsByTagName("body")[0];
var DIV_MAIN_TITLE = document.getElementById("mainTitle");
var DIV_MAIN_MENU = document.getElementById("mainMenu");
var DIV_BUILD_DECK_MENU = document.getElementById("buildDeckMenu");
var DIV_CARD_LIST_DISPLAY;
var DIV_DECK_CONTAINER;
var DIV_DECK_CONTENT;
var DIV_DECK_LIST;
var BUTTON_STORY_MODE;
var BUTTON_FREE_DUEL;
var BUTTON_BUILD_DECK;
var BUTTON_OPTION;
var BUTTON_GALLERY;
var BUTTON_SEARCH_BAR;
var BUTTON_NEW_DECK;
var BUTTON_GET_LOCAL_DECKS;
var BUTTON_SAVE_DECK;
var INPUT_SEARCH_BAR;
var IMAGE_CARD_DATABASE_DISPLAY;
var IMAGE_CARD_DECK_DISPLAY;
var DIV_BUILD_DECK_OPTIONS;

var DEFAULT_BACKGROUND_COLOR = "#191919";

var GAP_WIDTH = 5;
var BORDER_RADIUS = 1;
var MAIN_TITLE_FONT_SIZE = 40;
var MAIN_TITLE_FADE_TIME = 1;
var MAIN_MENU_FONT_SIZE = 20;
var BUTTON_FADE_TIME = 0.25;
var BUTTON_SEARCH_DIMENSION = 25;
var BUTTON_BUILD_MENU_WIDTH = 100;
var BUTOTN_BUILD_MENU_HEIGHT = 25;
var DIV_CARD_LIST_WIDTH = 300;
var CARD_LIST_HEIGHT = 20;
var DIV_CARD_LIST_HEIGHT = window.innerHeight - BUTTON_SEARCH_DIMENSION - GAP_WIDTH;
var CARD_RATIO = 421/614;
var CARD_DISPLAY_HEIGHT = window.innerHeight/2 - 2*BORDER_RADIUS;
var CARD_DISPLAY_WIDTH = CARD_RATIO*CARD_DISPLAY_HEIGHT;
var DIV_DECK_CONTENT_WIDTH = window.innerWidth - BUTTON_BUILD_MENU_WIDTH - CARD_DISPLAY_WIDTH - DIV_CARD_LIST_WIDTH;

var API_REQUEST = new XMLHttpRequest();

var MAIN_MENU_BUTTONS = 
[
    "Story Mode",
    "Free Duel",
    "Build Deck",
    "Option",
    "Galery"
];

var TYPES = 
{
    "Spell Card" : "linear-gradient(to right, #0A6B41 35%, #1D9E74)",
    "Normal Monster" : "linear-gradient(to right, #A89137 35%, #FDE68A)",
    "Effect Monster" : "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Flip Effect Monster" : "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Trap Card" : "#BC5A84",
    "Union Effect Monster" : "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Fusion Monster" : "#A086B7",
    "Pendulum Effect Monster" : "linear-gradient(to right, #FF8B53 35%, #1D9E74)",
    "XYZ Monster" : "#000000",
    "Synchro Tuner Monster" : "#CCCCCC",
    "Link Monster" : "#00008B",
    "Tuner Monster" : "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Gemini Monster" : "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Normal Tuner Monster" : "#FDE68A",
    "Synchro Monster" : "#C0C0C0",
    "Spirit Monster" : "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Ritual Effect Monster" : "#9DB5CC",
    "Token" : "#DDDDDD", 
    "Skill Card" : "#00008B",
    "Ritual Monster" : "#9DB5CC",
    "Toon Monster" : "linear-gradient(to right, #BB471F 35%, #FF8B53)",
    "Pendulum Normal Monster" : "linear-gradient(to right, #FDE68A 35%, #1D9E74)",
    "Synchro Pendulum Effect Monster" : "linear-gradient(to right, #C0C0C0 35%, #1D9E74)",
    "Pendulum Tuner Effect Monster" : "linear-gradient(to right, #FF8B53 35%, #1D9E74)",
    "XYZ Pendulum Effect Monster" : "linear-gradient(to right, #000000 35%, #1D9E74)",
    "Pendulum Effect Fusion Monster" : "linear-gradient(to right, #A086B7 35%, #1D9E74)",
    "Pendulum Flip Effect Monster" : "linear-gradient(to right, #FF8B53 35%, #1D9E74)",
};

var CARD_DATABASE = {};
var LOCAL_DECKS = {};






var BUTTON_UPLOADDECK = document.getElementById("uploadDeck");
var BUTTON_DOWNLOADDECK = document.getElementById("downloadDeck");
var BUTTON_SEARCHPLAYER = document.getElementById("searchPlayer");
var BUTTON_CLOSEMENU = document.getElementById("closeMenu");
var BUTTON_REFRESH_LIST = document.getElementById("refreshPlayerList");
var BUTTON_YES = document.getElementById("yesButton");
var BUTTON_NO = document.getElementById("noButton");
var CARD_MENU = document.getElementById("cardMenu");
var DECK_MENU = document.getElementById("deckMenu");
var DUEL_MENU = document.getElementById("duelMenu");
var PLAYER_LIST = document.getElementById("playerList");
var PLAYER_NAME_INPUT_TEXT = document.getElementById("inputPlayerName");
var SAVE_PLAYER_MENU = document.getElementById("savePlayerMenu");
var POPUP_PERMISSION = document.getElementById("popupPermission");
var QUESTION_TEXT = document.getElementById("questionText");
var DECK_LIST_FOR_DUEL = document.getElementById('deckForDuel');
var DUEL_FIELD = document.getElementById("duelField");

var PLAYER_NAME;
var TARGET_DUELIST;
var SELECTED_DECK;
var SELECTED_DECK_NAME;
var SELECTED_CARD;
var DUELISTS = [];
var DUELING_DECK;



var DECK_LIST_WIDTH = 150;
var DECK_CARD_LIST_HEIGHT = 25;
var NEW_DECK_HEIGHT = 25;
var DECK_LIST_HEIGHT = 1000;
var POPUP_HEIGHT = 100;


var DECK_REQUEST = new XMLHttpRequest();
var DUEL_REQUEST = new XMLHttpRequest();
var SOCKET = io.connect('http://' + document.domain + ':' + location.port);

var ALL_LOCAL_DECKS = 100;
var LOCAL_DECK = 101;
var DOWNLOAD_DECK = 200;
var REGISTER_PLAYER_SUCESS = 300;
var REGISTER_PLAYER_FAIL = 301;
var GET_PLAYER_LIST = 302;

var PROCESS_DONE = false;
