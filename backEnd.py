import os
import io
import json
from flask import Flask, render_template
from flask import jsonify
from flask_socketio import SocketIO
import webbrowser

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkbjafhknrl1532#'
socketio = SocketIO(app)

global FILENAME
global REQUEST_CODES
global PLAYER_LIST
global PLAYER_IP_LIST

@app.route('/')
def mainDisplay():
    return render_template('frontEnd.html', initial = None)

@app.route('/getAllLocalDecks')
def getAllLocalDecks():
    global REQUEST_CODES

    mypath = os.listdir('decks/')
    files = {}
    for item in mypath:
        if (item.split('.')[1] == "json"):
            with open('decks/'+item) as json_file:
                data = json.load(json_file)
                files[item.split('.')[0]] = data
    return jsonify(code=REQUEST_CODES["ALL_LOCAL_DECKS"], files=files)

@app.route('/saveDeck/<deck_name>;<deck_json>')
def downloadDeck(deck_name, deck_json):
    global REQUEST_CODES   

    trimmed = deck_name.split('\"')[1]
    PATH = 'decks/'+trimmed+".json"
    print(json.loads(deck_json))
    with open(PATH, 'w+') as outfile:
        deck = json.loads(deck_json)
        json.dump(deck, outfile)
    
    return jsonify(code=REQUEST_CODES["DECK_SAVED"], files=None)










@app.route('/savePlayerName/<player_name>')
def savePlayerName(player_name):
    global REQUEST_CODES   
    global PLAYER_LIST
    
    playerNames = PLAYER_LIST.keys()
    if player_name in playerNames:
        return jsonify(code=REQUEST_CODES["REGISTER_PLAYER_FAIL"], files=None)
    else:   
        PLAYER_LIST[player_name] = {}
        return jsonify(code=REQUEST_CODES["REGISTER_PLAYER_SUCESS"], files=None)   

@app.route('/getListofPlayers')
def getListofPlayers():
    global REQUEST_CODES   
    global PLAYER_LIST

    files = list(PLAYER_LIST.keys())
    return jsonify(code=REQUEST_CODES["GET_PLAYER_LIST"], files=files)   
        
@socketio.on('askPermissionForDuel')
def askPermissionForDuel(json, methods=['GET', 'POST']):
    socketio.emit('askPermissionForDuel', json)

@socketio.on('broadcastPlayer')
def broadcastPlayer(json, methods=['GET', 'POST']):
    socketio.emit('broadcastPlayer', json)

@socketio.on('challengeResponse')
def challengeResponse(json, methods=['GET', 'POST']):
    socketio.emit('challengeResponse', json)

@socketio.on('prepareDuel')
def prepareDuel(json, methods=['GET', 'POST']):
    socketio.emit('duelInterfaceResponse', json)

if __name__ == '__main__':
    global FILENAME
    global REQUEST_CODES
    global PLAYER_LIST

    PLAYER_LIST = {}
    PLAYER_IP_LIST = {}

    REQUEST_CODES = {
        "ALL_LOCAL_DECKS" : 100,
        "DECK_SAVED" : 101,

        "REGISTER_PLAYER_SUCESS": 300,
        "REGISTER_PLAYER_FAIL": 301,
        "GET_PLAYER_LIST": 302,
    }
    print()
    # FILENAME = "http://localhost:5000/"
    # webbrowser.open_new_tab(FILENAME)
    socketio.run(app, debug=True)
