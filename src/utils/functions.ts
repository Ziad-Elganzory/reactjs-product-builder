/**
 * Slice a given text to a maximum length, and add an ellipsis if the text was truncated.
 * @param {string} txt The text to slice.
 * @param {number} [max=50] max The maximum length of the text before truncation. Defaults to 50.
 * @returns {string} The sliced text. If the text was truncated, an ellipsis is appended if truncated.
 */
export function textSlicer(txt:string, max:number = 50): string{
    if(txt.length >= max) return `${txt.slice(0, max)} ...`;
    return txt;
}

/**
 * Format a number as a price.
 * @param {number} price The number to format as a price.
 * @returns {string} The price formatted as a string.
 */
export function priceNumberFormatter(price: string): string {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return formatter.format(Number(price));
}