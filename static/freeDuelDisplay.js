function setChatUI(row, i) {
    var chatList = row.insertCell(i);
    DIV_CHAT_LIST_DISPLAY = document.createElement("div");
    DIV_CHAT_LIST_DISPLAY.style.height = window.innerHeight - INPUT_CHAT_HEIGHT + "px";
    DIV_CHAT_LIST_DISPLAY.style.width = INPUT_CHAT_WIDTH + "px";
    DIV_CHAT_LIST_DISPLAY.style.background = "white";
    chatList.appendChild(DIV_CHAT_LIST_DISPLAY);

    var textForm = document.createElement("form");
    textForm.setAttribute("action", "");
    textForm.setAttribute("method", "POST");
    var chatInput = document.createElement("input");
    chatInput.setAttribute("type", "text")
    chatInput.className = "message";
    chatInput.setAttribute("placeholder", "Type your message here...");
    chatInput.style.width = INPUT_CHAT_WIDTH + "px";
    chatInput.style.height = INPUT_CHAT_HEIGHT + "px";
    textForm.appendChild(chatInput);
    chatList.appendChild(textForm);
    textForm.onsubmit = function (e) {
        e.preventDefault();
    }
}

function freeDuelDisplay() {
    var t = document.createElement("table");
    DIV_FREE_DUEL_LOBBY.appendChild(t);
    var row = t.insertRow(0);
    setChatUI(row, 0);

    // setFirstColumn(row, 0);
    // setSecondColumn(row, 1);
    // setThirdColumn(row, 2);
    // setFourthColumn(row, 3);
    // displayDatabaseLetters();
}