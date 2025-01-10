function replaceWithDictionary(str: string, dict: { [key: string]: string }): string {
    return str.replace(/\$(\w+)\$/g, (match, key) => {
        return key in dict ? dict[key] : match;
    });
}

// Tests
console.log(replaceWithDictionary("", {})); 
// Sortie : ""

console.log(replaceWithDictionary("$temp$", { temp: "temporary" })); 
// Sortie : "temporary"

console.log(replaceWithDictionary("$temp$ here comes the name $name$", { temp: "temporary", name: "John Doe" })); 
// Sortie : "temporary here comes the name John Doe"
