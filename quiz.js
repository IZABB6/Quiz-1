const prompt = require("readline-sync");
const { TFquestion, FBquestion } = require("./questions");
const emoji = ("node-emoji");


// ~ initialise variables ~
let totalPoints = 0;
let userAnswers = [];
let quizHistory = [];
let totalPossiblePoints = 0;
let playerName = "";

function multipleChoice(){
    //point set up//---------------------------
    let points = 0;
    //Questions//---------------------------
    let questions = [
        {
            text: "In The Vampire Diaries, who is Elena's main love interest?",
            options: ["Stefan", "Damon", "Matt", "Tyler"],
            correct: 2,
            answers: { correct: "slayyyy Damon was Elena's main love interest." }
        },
        {
            text: " Who sings 'Good Luck Babe'?",
            options: ["Chappell Roan", "Taylor Swift", "Billie Eilish", "Ariana Grande"],
            correct: 1,
            answers: { correct: "Correct! Chappell Roan" }
        },
        {
            text: " in Desperate Housewives what is that name of the woman who shoots herself at start of the show?",
            options: ["Susan", "Lynette", "Mary-Alice", "Gabrielle, Bree"],
            correct: 3,
            answers: { correct: "Correct, it was Mary-Alice who blow her brains out" }
        },
        {
            text: " in Gilmore Girls what is the main character (Lorelai) favorite drink",
            options: ["Hot-Chocolate", "Tea", "Vodka", "Coffee"],
            correct: 4,
            answers: { correct: "Correct! Coffee Coffee Coffee." }
        },
        {
            text: "What uni does Rory Gilmore end up attending",
            options: ["Harvard", "Yale", "Oxford", "MIT"],
            correct: 2,
            answers: { correct: "Correct! She changed her mind and went to Yale." }
        }
    ];

    for (let i = 0; i < questions.length; i++) {
        let q = questions[i];
        let attempts = 3;

        while (attempts > 0) {
            console.log("\n" + (i + 1) + ". " + q.text + "\n");

            let count = 1;
            for (let option of q.options) {
                console.log(" " + count + ". " + option);
                count++;
            }

            let answer = Number(prompt.question("\nPlease choose a number: "));
            console.log("");

            if (answer == q.correct) {
                console.log(q.answers.correct);
                points++;
                break;
            } else if (answer >= 1 && answer <= q.options.length) {
                attempts--;
                console.log("Wrong ");
                if (attempts > 0) console.log("You have " + attempts + " attempts left.");
            } else {
                console.log("Dumbass");
            }
        }
    }
    return points;
}

// True/False function
// ~ ~ functions ~ ~
function trueOrFalse(currenrQuestion){
    //setting the variables so they reset each time the module is called
    let attempts = 3;
    let correct = false;

    //printing the question and options
    console.log(currentQuestion[0]);
    console.log(currentQuestion[1]);

    //loop to get user input if they havent run out of attempts and havent correctly answered
    do {
        userInput = prompt.question("Enter your answer (1 or 2): ");
        if (userInput == currentQuestion[2]){
            console.log ("Correct!");
            //<--add point/s to total--> call a function for this?
            correct=true;
        }else {
            attempts=(attempts-1);
            console.log("Incorrect, you have "+attempts+" attempts remaining");

        }
    }while(attempts>0 && correct==false);
return attempts
return points;
}


   

// Fill in the blank function
function fillBlank() {
    let points = 0;
    
    // Get one random question
    const randomIndex = Math.floor(Math.random() * FBquestion.length);
    let q = FBquestion[randomIndex];
    
    let attempts = 3;
    let correct = false;
    
    console.log("\n" + q.question);
    
    do {
        let userInput = prompt.question("Your answer: ");
        
        for (let i = 0; i < q.answer.length; i++) {
            if (userInput.toLowerCase() == q.answer[i].toLowerCase()) {
                correct = true;
                break;
            }
        }
        
        if (correct == true) {
            console.log("Correct! Well done!");
            points++;
        } else {
            attempts = (attempts - 1);
            if (attempts > 0) {
                console.log("Incorrect! You have " + attempts + " attempts left");
            }
        }
        
    } while (attempts > 0 && correct == false);
    
    return points;
}

function startQuiz(name) {
    playerName = name;
    showMainMenu();
}

// Show main menu
function showMainMenu() {
    let choice;
    do {
        console.log("\n" + "=".repeat(30));
        console.log("QUIZ MENU");
        console.log("=".repeat(30));
        console.log("1. Start Linear Quiz");
        console.log("2. Multiple Choice Only");
        console.log("3. True/False Only");
        console.log("4. Fill in the Blank Only");
        console.log("5. View Quiz History");
        console.log("6. View Statistics");
        console.log("7. Exit");
        
        choice = Number(prompt.question("\nSelect an option (1-7): "));
        
        switch(choice) {
            case 1:
                startLinearQuiz();
                break;
            case 2:
                console.log("\n=== MULTIPLE CHOICE SECTION ===");
                let mcScore = multipleChoice();
                showQuickResults("Multiple Choice", mcScore, 5);
                saveToHistory("Multiple Choice", 5, mcScore);
                break;
            case 3:
                console.log("\n=== TRUE/FALSE SECTION ===");
                let tfScore = trueFalse();
                showQuickResults("True/False", tfScore, TFquestion.length);
                saveToHistory("True/False", TFquestion.length, tfScore);
                break;
            case 4:
                console.log("\n=== FILL IN THE BLANK SECTION ===");
                let fbScore = fillBlank();
                showQuickResults("Fill in the Blank", fbScore, 1);
                saveToHistory("Fill in the Blank", 1, fbScore);
                break;
            case 5:
                viewHistory();
                break;
            case 6:
                viewStatistics();
                break;
            case 7:
                console.log("\nThank you for playing, " + playerName + "!");
                console.log("🎬 Come back soon for more movie trivia! 🎬");
                break;
            default:
                console.log("Invalid choice. Please select 1-7.");
        }
    } while(choice !== 7);
}

// Linear quiz
function startLinearQuiz() {
    console.log("\n" + "=".repeat(40));
    console.log("STARTING LINEAR QUIZ");
    console.log("=".repeat(40) + "\n");
    
    // Multiple choice section
    console.log("=== MULTIPLE CHOICE SECTION ===");
    let mcScore = multipleChoice();
    
    // True/False section  
    console.log("\n=== TRUE/FALSE SECTION ===");
    let tfScore = trueFalse();
    
    // Fill in the blank section
    console.log("\n=== FILL IN THE BLANK SECTION ===");
    let fbScore = fillBlank();
    
    let finalScore = mcScore + tfScore + fbScore;
    let totalQuestions = 5 + TFquestion.length + 1; // 5 MC + TF questions + 1 FB
    
    showResults("Linear Quiz", finalScore, totalQuestions);
    saveToHistory("Linear Quiz", totalQuestions, finalScore);
}

function showQuickResults(quizType, points, totalQuestions) {
    const percentage = Math.round((points / totalQuestions) * 100);
    
    console.log("\n" + "=".repeat(40));
    console.log("🎉 " + quizType.toUpperCase() + " COMPLETED! 🎉");
    console.log("=".repeat(40));
    console.log("Score: " + points + "/" + totalQuestions + " (" + percentage + "%)");
    
    if (percentage >= 80) {
        console.log("🌟 Excellent work!");
    } else if (percentage >= 60) {
        console.log("👍 Good job!");
    } else {
        console.log("👌 Keep practicing!");
    }
}

// Show results with performance feedback
function showResults(quizType, finalScore, totalQuestions) {
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    
    console.log("\n" + "=".repeat(50));
    console.log("🎉 QUIZ COMPLETED! 🎉");
    console.log("=".repeat(50));
    console.log("Quiz Type: " + quizType);
    console.log("Player: " + playerName);
    console.log("Score: " + finalScore + "/" + totalQuestions + " (" + percentage + "%)");
    
    // Performance feedback
    if (percentage >= 90) {
        console.log("🌟 Excellent! You're a movie expert!");
    } else if (percentage >= 70) {
        console.log("👍 Great job! You know your movies!");
    } else if (percentage >= 50) {
        console.log("👌 Not bad! Keep watching more movies!");
    } else {
        console.log("📚 Time to binge-watch some classics!");
    }
    
    console.log("=".repeat(50));
}

// Quiz history tracking
function saveToHistory(quizType, questionsCount, finalScore) {
    const quizResult = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        quizType: quizType,
        score: finalScore,
        totalQuestions: questionsCount,
        percentage: Math.round((finalScore / questionsCount) * 100)
    };
    
    quizHistory.push(quizResult);
}

function viewHistory() {
    if (quizHistory.length === 0) {
        console.log("\nNo quiz history available. Take a quiz first!");
        return;
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("QUIZ HISTORY");
    console.log("=".repeat(50));
    
    for (let i = 0; i < quizHistory.length; i++) {
        const quiz = quizHistory[i];
        console.log((i + 1) + ". " + quiz.date + " " + quiz.time);
        console.log("   Type: " + quiz.quizType);
        console.log("   Score: " + quiz.score + "/" + quiz.totalQuestions + " (" + quiz.percentage + "%)");
        console.log("");
    }
}

// Statistics and analytics
function viewStatistics() {
    if (quizHistory.length === 0) {
        console.log("\nNo statistics available. Take a quiz first!");
        return;
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("QUIZ STATISTICS");
    console.log("=".repeat(50));
    
    const totalQuizzes = quizHistory.length;
    const averageScore = quizHistory.reduce((sum, quiz) => sum + quiz.percentage, 0) / totalQuizzes;
    const bestScore = Math.max(...quizHistory.map(quiz => quiz.percentage));
    
    console.log("Player: " + playerName);
    console.log("Total Quizzes Taken: " + totalQuizzes);
    console.log("Average Score: " + Math.round(averageScore) + "%");
    console.log("Best Score: " + bestScore + "%");
}

module.exports = {
    startQuiz
};