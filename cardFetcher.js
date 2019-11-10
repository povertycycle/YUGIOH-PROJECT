function processCard(card)
{
    var cardData = 
    {
        "attr": card["attribute"],
        "level": card["level"],
        "image": card["card_images"][0]["image_url"],
        "archetype": card["archetype"],
        "race": card["race"],
        "type": card["type"],
        "desc": card["desc"],
        "atk": card["atk"],
        "def": card["def"]
    }
    return cardData;
}


request.open('GET', 'https://db.ygoprodeck.com/api/v5/cardinfo.php', true);

request.onload = function() 
{
    if (request.response) 
    {
        var data = JSON.parse(this.response);
        for(item of data)
        {
            CARD_LIST[item.name] = processCard(item);
        }
        PROCESS_DONE = true;
    }
};

request.send();
