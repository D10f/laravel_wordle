class FrequencyMap {

    constructor(text) {
        this.map = this.generateMapFromString(text);
    }

    /**
     * A Map containing the frequency a letter is repeated in the given string.
     * @param   {string} text text to extract the letter frequency from. 
     * @return  {Map} data structure containing the frequency analysis.
     */
    generateMapFromString(text) {
        const map = new Map();

        for (let i = 0; i < text.length; i++) {
            const letter = text[i];
            map.set(letter, map.get(letter) + 1 || 1);
        }

        return map;
    }

    /**
     * Given a key, decrease its value by one or initialize at 0.
     * @param {string} key lookup value
     */
    decrease(key) {
        this.map.set(key, this.map.get(key) - 1 || 0);
    }

    /**
     * Returns a specified element from the Map object.
     * @returns Returns the element associated with the specified key.
     */
    get(key) {
        return this.map.get(key);
    }
}

export default FrequencyMap;
