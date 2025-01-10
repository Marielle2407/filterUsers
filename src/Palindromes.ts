function findPalindromes(text: string): string[] {
    
    let palindromes: string[] = [];
    let words : string[] = text.toUpperCase().split(" ");
    for (let i = 0; i < words.length; i++) {
        console.log(words[i]);
        if (words[i].length >=1) {
            let word :string = words[i];
            let wordReversed = words[i].split("").reverse().join("");
            if (word === wordReversed) {
                if (!palindromes.includes(word)) {
                    palindromes.push(word);
                }
            }
        }
    }
    return palindromes;
}

const text = "Le radar a vu Anna avec un kayak et un autre radar.";

console.log(findPalindromes(text));