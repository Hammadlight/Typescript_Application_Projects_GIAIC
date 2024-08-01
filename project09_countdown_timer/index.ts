#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Function to display the countdown timer
const displayTimer = function(timeLeft: number) {
    // Clear the current line in the terminal
    process.stdout.clearLine(0);

    // Move the cursor to the beginning of the line
    process.stdout.cursorTo(0);

    // Write the updated timer value
    process.stdout.write(chalk.blue.bold(`\t   Time Left: ${timeLeft}s`));
};

// Function to start the countdown timer
const startTimer = function(duration: number) {
    let timeLeft = duration;

    // Display the heading message
    console.log(chalk.bold("-".repeat(40)));
    console.log(chalk.yellow.bold("\tCountdown Timer Started"));
    console.log(chalk.bold("-".repeat(40)));

    // Display the initial timer
    displayTimer(timeLeft);

    // Update the timer every second
    const timerInterval = setInterval(function() {
        timeLeft--;

        // Display the updated timer
        displayTimer(timeLeft);

        // Check if the timer has reached 0
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            console.log('\n' + chalk.green.bold(`\n\t    Time is up!`));
            console.log(chalk.bold("-".repeat(40)));``
        }
    }, 1000);
};

// Main function to prompt the user and start the timer
const main = async function() {
    // Prompt the user to enter the duration of the countdown timer
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'duration',
            message: 'Enter the duration of the countdown timer (in seconds):',
            // Validate the user input
            validate: function(value: string) {
                // Parse the input value to an integer
                const duration = parseInt(value);
                // Check if the input is a valid positive number
                return !isNaN(duration) && duration > 0 ? true : 'Please enter a valid positive number.';
            }
        }
    ]);

    // Parse the duration entered by the user
    const duration = parseInt(answers.duration);
    // Start the countdown timer
    startTimer(duration);
};

// Call the main function to start the program
main();
