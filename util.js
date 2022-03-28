async function getSong(SongName) {
    pokemonName = nameForApi(songName);
    const req = new Request('APINAME' + songName);

    const response = await fetch(req);
    if (!response.ok) {
        throw new Error(response);
    }

    return response.json();
}

function nameForDisplay(word) {
    word = megaConversion(word);
    word = capitalize(word);
    return word;
}

function nameForApi(word) {
    word = word.toLowerCase();
    word = megaconversion(word);
    word = word.replace(" ", "-");
    return word
}
function capitalize(word) {
    let allWords = word.split('-');
    let ret = "";
    for (let word of allWords) {
        ret += capitalizeWord(word) + " ";
    }
    return ret.substring(0, ret.length -1);
}

function capitalizeWord(word) {
    let wordBody = word.substing(1);
    return word[0].toUpperCase() + wordBody;
}

export { getSong, nameForDisplay };