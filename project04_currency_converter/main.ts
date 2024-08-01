#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Print welcome message
console.log(chalk.bold.rgb(204, 204, 204)(`\n  \t\t <<<============================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.bold.hex('#9999FF')('Welcome To \'Jawaria Exchange Service\' - Currency Converter')}  <<<===========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<============================================>>>\n`));

// Define the list of currencies and their exchange rates
let exchange_rate: any = {
    "USD $": 1,             // United States (Dollor)  // Base currency
    "EUR £": 0.88,         // European (Euro)
    "JPY ¥": 113.32,      // Japanese (Yen)
    "CAD $": 1.29,       // Canadian (Dollar)
    "AUD $": 1.44,      // Australian (Dollar)
    "PKR Rs": 277.70,  // Pakistani (Rupee)
};

// Prompt the user to select currencies to convert from and to
let user_answer = await inquirer.prompt([
    {
        name: "from_currency",
        type: "list",
        message: "Select the currency you want to convert from:",
        choices: ["USD $", "EUR £", "JPY ¥", "CAD $", "AUD $", "PKR Rs"],
    },
    {
        name: "to_currency",
        type: "list",
        message: "Select the currency you want to convert into:",
        choices: ["USD $", "EUR £", "JPY ¥", "CAD $", "AUD $", "PKR Rs"],
    },
    {
        name: "amount",
        type: "input",
        message: "Enter the amount you want to convert:",
    }
]);

// Perform currency conversions
let from_amount = exchange_rate[user_answer.from_currency];
let to_amount = exchange_rate[user_answer.to_currency];
let amount = user_answer.amount;
let base_amount = amount / from_amount; // USD Base Currency //
let converted_amount = base_amount * to_amount;

// Display the converted amount
console.log(chalk.bold(`\n \t ${user_answer.from_currency}:${chalk.greenBright(amount)}  converted amount in  ${user_answer.to_currency}:${chalk.greenBright(converted_amount.toFixed(2))}`));