var BODY = document.getElementsByTagName("body");
var CARD_LIST_DISPLAYER = document.getElementById("cardListDisplayer");
var BUTTON_SEARCHBAR = document.getElementById("searchBarButton");
var BUTTON_UPLOADDECK = document.getElementById("uploadDeck");
var BUTTON_SAVEDECK = document.getElementById("saveDeck");
var BUTTON_DOWNLOADDECK = document.getElementById("downloadDeck");
var BUTTON_MAKEDECK = document.getElementById("makeNewDeckButton");
var BUTTON_SEARCHPLAYER = document.getElementById("searchPlayer");
var BUTTON_CLOSEMENU = document.getElementById("closeMenu");
var BUTTON_REFRESH_LIST = document.getElementById("refreshPlayerList");
var BUTTON_YES = document.getElementById("yesButton");
var BUTTON_NO = document.getElementById("noButton");
var CARD_IMAGE = document.getElementById("cardDisplayer");
var SEARCHBAR = document.getElementById("searchBar");
var DECK_LIST = document.getElementById("deckList");
var DECK_CONTENT = document.getElementById("deckContent");
var DECK_CONTENT_CONTAINER = document.getElementById("deckContentContainer");
var CARD_MENU = document.getElementById("cardMenu");
var DECK_MENU = document.getElementById("deckMenu");
var OPTION_LIST = document.getElementById("optionList");
var DECK_CARD_IMAGE = document.getElementById("deckCardDisplayer");
var DUEL_MENU = document.getElementById("duelMenu");
var PLAYER_LIST = document.getElementById("playerList");
var PLAYER_NAME_INPUT_TEXT = document.getElementById("inputPlayerName");
var SAVE_PLAYER_MENU = document.getElementById("savePlayerMenu");
var POPUP_PERMISSION = document.getElementById("popupPermission");

var PLAYER_NAME;
var TARGET_DUELIST;
var SELECTED_DECK;
var SELECTED_DECK_NAME;
var SELECTED_CARD;
var CARD_LIST = {};
var LOCAL_DECKS = {};
var DUELISTS = [];

var TYPES = 
{
    "Spell Card" : "#5D9F44",
    "Normal Monster" : "#DBD27A",
    "Effect Monster" : "#B57F22",
    "Flip Effect Monster" : "#B57F22",
    "Trap Card" : "#BE0A76",
    "Union Effect Monster" : "#B57F22",
    "Fusion Monster" : "#9F24D8",
    "Pendulum Effect Monster" : "72624F",
    "XYZ Monster" : "#9F24D8",
    "Synchro Tuner Monster" : "#EDE7F0",
    "Link Monster" : "#3662E4",
    "Tuner Monster" : "#B57F22",
    "Gemini Monster" : "#B57F22",
    "Normal Tuner Monster" : "#DBD27A",
    "Synchro Monster" : "#EDE7F0",
    "Spirit Monster" : "#B57F22",
    "Ritual Effect Monster" : "#3662E4",
    "Token" : "#7A7E88", 
    "Skill Card" : "#324992",
    "Ritual Monster" : "#3662E4",
    "Toon Monster" : "#B57F22",
    "Pendulum Normal Monster" : "#DBD27A",
    "Synchro Pendulum Effect Monster" : "#EDE7F0",
    "Pendulum Tuner Effect Monster" : "72624F",
    "XYZ Pendulum Effect Monster" : "72624F",
    "Pendulum Effect Fusion Monster" : "#9F24D8",
    "Pendulum Flip Effect Monster" : "72624F",
};

var BUTTON_HEIGHT = 25;
var SEARCHBAR_HEIGHT = 25;
var GAP_WIDTH = 5;
var CARD_LIST_DISPLAYER_WIDTH = 300;
var CARD_RATIO = 614/421;
var CARD_DISPLAY_WIDTH = 200;
var CARD_DISPLAY_HEIGHT = CARD_DISPLAY_WIDTH * CARD_RATIO;
var LABEL_HEIGHT = 20;
var DECK_LIST_WIDTH = 150;
var DECK_CARD_LIST_HEIGHT = 25;
var NEW_DECK_HEIGHT = 25;
var DECK_LIST_HEIGHT = 1000;
var OPTION_LIST_WIDTH = 100;
var CARD_LIST_DISPLAYER_HEIGHT = window.innerHeight - 30;
var DECK_CONTENT_WIDTH = 600;
var DECK_CONTENT_HEIGHT = 2000;
var BORDER_RADIUS = 1;
var POPUP_HEIGHT = 100;

var DEFAULT_BACKGROUND_COLOR = "#191919";

var request = new XMLHttpRequest();
var DECK_REQUEST = new XMLHttpRequest();
var DUEL_REQUEST = new XMLHttpRequest();
var SOCKET = io.connect('http://' + document.domain + ':' + location.port);

var ALL_LOCAL_DECKS = 100;
var LOCAL_DECK = 101;
var DOWNLOAD_DECK = 200;
var REGISTER_PLAYER_SUCESS = 300;
var REGISTER_PLAYER_FAIL = 301;
var GET_PLAYER_LIST = 302;
var ASK_DUEL_PERMISSION_REQUEST = 303;
var DUELIST_NOT_FOUND = 400;

var PROCESS_DONE = false;
