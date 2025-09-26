const prompt = require("readline-sync");
const { startQuiz } = require("./quiz");



function startScreen() {
    console.log("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ");
    console.log("   ✧     ⁺₊     ✧   ✧ ⁺₊");
    console.log("✩      Girlypoppyquizzy   ✩");
    console.log("  ✧  ⁺₊        ✧     ✩     ✧");
    console.log("      by the quiz mummies    ⁺₊");
    console.log("✩       ✧       ⁺₊      ✧");
    console.log("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ");
    console.log(" ");
    
    let willNotUseThis = prompt.question("Press enter to start\n");
    console.log("");
    
    let playerName = prompt.question("Enter your name: ");
    console.log("\nHello " + playerName + "! Let's start the quiz.\n");
    
    return playerName;
}

function main() {
    let playerName = startScreen();
    startQuiz(playerName);
}

// Start the application
main();