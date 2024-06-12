// Used the js-pixel-fonts libary for a lot of this
// https://github.com/hgcummings/pixel-fonts

const renderLine  = (text, font) => {
    const letters = text.split("");
    const characters = [];
    let maxHeight = 0;
    for (let letter of letters) {
        let glyph = font.glyphs[""];
        if (font.glyphs[letter]) {
            glyph = font.glyphs[letter]
        } else {
            log.warn(`Missing letter ${letter}`)
        }
        let newCharacter = [];
        glyph.pixels.forEach((row, index) => {
            newCharacter[index + glyph.offset] = row;
        });
        maxHeight = Math.max(maxHeight, newCharacter.length);
        if (font.isFixedWidth ||
            (characters.length && areTouching(characters[characters.length-1], newCharacter))) {
            characters.push(gap);
        }
        characters.push(newCharacter);
    }
    return characters.reduce((acc, cur) => {
        const blankRow = Array(cur[cur.length - 1].length).fill(0);
        for (let i = 0; i < maxHeight; ++i) {
            const row = cur[i] || blankRow;
            acc[i].push(...row);
        }
        return acc;
    }, Array(maxHeight).fill(0).map(_ => []));
}

const renderPixels = (text, font) => {
    const lines = text.split("\n").map(line => [[0]].concat(renderLine(line, font)));
    lines[0].shift();
    return [].concat(...lines);
};