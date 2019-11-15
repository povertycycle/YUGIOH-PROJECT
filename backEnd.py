import os
import io
import json
from flask import Flask, render_template
from flask import jsonify
import webbrowser
import socket    
app = Flask(__name__)

global FILENAME
global REQUEST_CODES
global PLAYER_LIST
global PLAYER_IP_LIST

@app.route('/')
def mainDisplay():
    return render_template('mainDisplay.html', initial = None)

@app.route('/requestResponse/<response_code>;<deck_name>')
def requestResponse(response_code, deck_name):
    global REQUEST_CODES

    if (int(response_code)==REQUEST_CODES["ALL_LOCAL_DECKS"]):
        mypath = os.listdir('decks/')
        i = 0
        files = {}
        for item in mypath:
            files[str(i)] = item
            i += 1
        return jsonify(code=REQUEST_CODES["ALL_LOCAL_DECKS"], files=files)
    elif (int(response_code)==REQUEST_CODES["LOCAL_DECK"]):
        with open('decks/'+deck_name) as json_file:
            data = json.load(json_file)
            deck = [deck_name, data]
        return jsonify(code=REQUEST_CODES["LOCAL_DECK"], files=deck)
    else:
        return "ERROR_REQUEST_CODE_NOT_FOUND"

@app.route('/downloadDeck/<deck_name>;<deck_json>')
def downloadDeck(deck_name, deck_json):
    global REQUEST_CODES   

    trimmed = deck_name.split('\"')[1]
    PATH = 'decks/'+trimmed+".json"
    print(json.loads(deck_json))
    with open(PATH, 'w+') as outfile:
        deck = json.loads(deck_json)
        json.dump(deck, outfile)
    
    return jsonify(code=REQUEST_CODES["DOWNLOAD_DECK"], files=None)

@app.route('/savePlayerName/<player_name>')
def savePlayerName(player_name):
    global REQUEST_CODES   
    global PLAYER_LIST
    
    playerNames = PLAYER_LIST.keys()
    if player_name in playerNames:
        return jsonify(code=REQUEST_CODES["REGISTER_PLAYER_FAIL"], files=None)
    else:   
        PLAYER_LIST[player_name] = {}
        PLAYER_IP_LIST[player_name] = socket.gethostbyname(socket.gethostname())
        return jsonify(code=REQUEST_CODES["REGISTER_PLAYER_SUCESS"], files=None)   

@app.route('/getListofPlayers')
def getListofPlayers():
    global REQUEST_CODES   
    global PLAYER_LIST

    files = list(PLAYER_LIST.keys())
    return jsonify(code=REQUEST_CODES["GET_PLAYER_LIST"], files=files)   
        
@app.route('/askPermissionForDuel/<target_duelist>')
def askPermissionForDuel(target_duelist):
    global REQUEST_CODES   
    global PLAYER_LIST

    playerNames = PLAYER_LIST.keys()
    if target_duelist in playerNames:
        return jsonify(code=REQUEST_CODES["ASK_DUEL_PERMISSION_REQUEST"], files=target_duelist) 
    else:
        return jsonify(code=REQUEST_CODES["DUELIST_NOT_FOUND"], files=target_duelist) 



if __name__ == '__main__':
    global FILENAME
    global REQUEST_CODES
    global PLAYER_LIST

    PLAYER_LIST = {}
    PLAYER_IP_LIST = {}

    REQUEST_CODES = {
        "ALL_LOCAL_DECKS" : 100,
        "LOCAL_DECK" : 101,
        "DOWNLOAD_DECK" : 200,
        "REGISTER_PLAYER_SUCESS": 300,
        "REGISTER_PLAYER_FAIL": 301,
        "GET_PLAYER_LIST": 302,
        "ASK_DUEL_PERMISSION_REQUEST": 303,
        "DUELIST_NOT_FOUND": 400,
    }
    print()
    # FILENAME = "http://localhost:5000/"
    # webbrowser.open_new_tab(FILENAME)
    app.run(host='https://yugiohproject.hopto.org/')
