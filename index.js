const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// bc of emoji's being multi-character stuff, I need an array not a string
const emojis = [..."🍉🍊🍇🍈🍋🍌🍍🥭🍎🍏🍐🍑🍒🍓🥝🍅🥥🥑🍆🥔🥕🌽🌶️🥒🥬🥦🍄🥜🌰🍞🥐🥖🥨🥯🥞🧀🍖🍗🥩🍔🍟🍕🌭🥪🌮🌯🥙🥚🍳🥘🍲🥗🍿🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🥮🍡🥟🥠🥡🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯🍼🥛🍾🍷🍸🍹🍺🍻🥂🥃🥤"];

function getRandomFromCollection(collection) {
    const randomIndex = Math.floor(Math.random() * collection.length);
    return collection[randomIndex];
}

function convertPixelsToEmojiString(pixelsArr, emoji) {
    let str = "";
    for (const row of pixelsArr) {
        for (const number of row) {
            if (number === 1) { str += emoji }
            // use this to make the letter shape pop out more
            else { str += "⬛️" }
        }
        str += '<br>';
    }
    return str.trim();
}

function getNewCombo() {
    const initial = getRandomFromCollection(letters);
    const emoji = getRandomFromCollection(emojis);

    const pixelsArr = renderPixels(initial, font_sevenPlus);
    const emojiStr = convertPixelsToEmojiString(pixelsArr, emoji);

    document.getElementById('emoji').innerHTML = emoji;
    document.getElementById('drawing').innerHTML = emojiStr;
}

getNewCombo();