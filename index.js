const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// bc of emoji's being multi-character stuff, I need an array not a string
const emojis = [..."🍉🍊🍇🍈🍋🍌🍍🥭🍎🍏🍐🍑🍒🍓🥝🍅🥥🥑🍆🥔🥕🌽🌶🥒🥬🥦🍄🥜🌰🍞🥐🥖🥨🥯🥞🧀🍖🍗🥩🍔🍟🍕🌭🥪🌮🌯🥙🥚🍳🥘🍲🥗🍿🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🥮🍡🥟🥠🥡🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯🍼🥛🍾🍷🍸🍹🍺🍻🥂🥃🥤"]
console.log(emojis);

// I chose to do query params in a stupid way bc its funny lol
// ....?K=🍓   means that the initial K owes you a strawberry
function getInitialAndEmoji() {
    try {
        const queryParams = new URLSearchParams(location.search);
        for (const [key, val] of queryParams.entries()) {
            const initial = key[0];
            // not gonna bother dealing with validating emojis, its too much work
            const emoji = val;

            // clear query params so if link is shared, its random again
            // + I can hide the fact that I can game the url lmao
            history.replaceState(null, '', location.pathname);

            return [initial, emoji];
        }

        // If there's no query params then throw to use defaults
        throw new Exception();

    } catch {
        console.log("Couldn't parse query params, using random initial & emoji.")
        const initial = getRandomFromCollection(letters);
        const emoji = getRandomFromCollection(emojis);
        return [initial, emoji];
    }
}

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
    const [initial, emoji] = getInitialAndEmoji();
    const pixelsArr = renderPixels(initial, font_sevenPlus);
    const emojiStr = convertPixelsToEmojiString(pixelsArr, emoji);

    document.getElementById('emoji').innerHTML = emoji;
    document.getElementById('drawing').innerHTML = emojiStr;
}

getNewCombo();