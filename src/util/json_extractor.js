export default function jsonExtractor(text) {
    if (!text) return null;

    // 1. Remove markdown fences
    text = text.replace(/```[\s\S]*?```/g, m => m.replace(/```/g, ''));

    // 2. Remove invisible Unicode characters (CRITICAL)
    text = text.replace(/[\u200B-\u200D\uFEFF]/g, '');

    // 3. Find first JSON start
    const startObj = text.indexOf('{');
    const startArr = text.indexOf('[');

    let start;
    if (startObj === -1 && startArr === -1) return null;
    if (startObj === -1) start = startArr;
    else if (startArr === -1) start = startObj;
    else start = Math.min(startObj, startArr);

    // 4. Bracket balancing
    const openChar = text[start];
    const closeChar = openChar === '{' ? '}' : ']';

    let depth = 0;
    let end = -1;

    for (let i = start; i < text.length; i++) {
        if (text[i] === openChar) depth++;
        if (text[i] === closeChar) depth--;
        if (depth === 0) {
            end = i + 1;
            break;
        }
    }

    if (end === -1) return null;

    const jsonStr = text.slice(start, end);

    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        throw new Error("Extracted content is not valid JSON after cleanup");
    }
}