#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

// Class to represent a Customer
class Customer {
    constructor(
        public firstName: string,
        public lastName: string,
        public gender: string,
        public age: number,
        public mobileNo: string
    ) {}
}

// Class to represent a Bank Account
class BankAccount {
    private static accountCounter = 101; // Static counter to generate unique account numbers
    private balance: number = 0; // Initial balance of the account
    accountNumber: number; // Unique account number

    constructor(public customer: Customer) {
        this.accountNumber = BankAccount.accountCounter++; // Assign a unique account number
    }

    // Getter method for account number
    getAccountNumber(): number {
        return this.accountNumber;
    }

    // Method to deposit money into the account
    deposit(amount: number): void {
        if (amount > 100) {
            this.balance += amount - 1; // Deduct $1 fee 
            headingFunction(50, `${chalk.magentaBright("Thanks")} for making Deposit !`);
            console.log(chalk.bold(`Deposited: ${chalk.green("$")+(amount-1)} ${chalk.greenBright("Successfully!")} (${chalk.red("-$1")} fee deducted for depositing more than ${chalk.green("+$")}100.)\n`));
            console.log(chalk.bold(`New Bank Balance: ${chalk.bold.green("$")}${this.balance}`));
            dashesFunction(50);
        } else {
            this.balance += amount;
            headingFunction(50, `${chalk.magentaBright("Thanks")} for making Deposit !`);
            console.log(chalk.bold(`Deposited: ${chalk.green("$")+amount} ${chalk.greenBright("Successfully!")}\n`));
            console.log(chalk.bold(`New Bank Balance: ${chalk.bold.green("$")}${this.balance}`));
            dashesFunction(50);
        }
    }

    // Method to withdraw money from the account
    withdraw(amount: number): void {
        if (this.balance < amount) {
            dashesFunction(46);
            console.log(chalk.bold(`Transaction Cancelled: ${chalk.red("Insufficient Balance !!")}`)); // Check for sufficient balance
            dashesFunction(46);
        } else {
            this.balance -= amount;
            headingFunction(47, `${chalk.magentaBright("Thank You")} for Withdrawal !`);
            console.log(chalk.bold(`Withdraw Amount: ${chalk.green("$")+amount} ${chalk.greenBright("Successfully!")}\n`));
            console.log(chalk.bold(`New Bank Balance: ${chalk.bold.green("$")}${this.balance}`));
            console.log("-".repeat(47));
        }
    }

    // Getter method for balance
    getBalance(): number {
        return this.balance;
    }

    // Method to display account details
    getAccountDetails(): void {
        headingFunction(45, `${chalk.magentaBright("Bank Account")} Details !`)
        console.log(chalk.bold(`Account No: ${this.accountNumber}`));
        console.log(chalk.bold(`Name: ${this.customer.firstName} ${this.customer.lastName}`));
        console.log(chalk.bold(`Gender: ${this.customer.gender}`));
        console.log(chalk.bold(`Age: ${this.customer.age}`));
        console.log(chalk.bold(`Mobile No: ${this.customer.mobileNo}`));
        console.log(chalk.bold(`Bank Balance: ${chalk.green("$")}${this.balance}`));
        dashesFunction(45);
    }
}

// Array to store all bank accounts
let accounts: BankAccount[] = [];


// Main menu function for user interaction
const mainMenu = async (): Promise<void> => {
    const answer = await inquirer.prompt({
        name: 'option',
        type: 'list',
        message: 'Select an option:',
        choices: [
            'Create Account',
            'Deposit Money',
            'Withdraw Money',
            'Check Balance',
            'View Account Details',
            'Exit'
        ]
    });

    // Switch case to handle user selection
    switch (answer.option) {
        case 'Create Account':
            await createAccount();
            break;
        case 'Deposit Money':
            await depositMoney();
            break;
        case 'Withdraw Money':
            await withdrawMoney();
            break;
        case 'Check Balance':
            await checkBalance();
            break;
        case 'View Account Details':
            await viewAccountDetails();
            break;
        case 'Exit':
            dashesFunction(50);
            console.log(chalk.bold(`\t${chalk.magentaBright("Goodbye")}, See You Soon !!`));
            dashesFunction(50);
            console.log(`  Thanks for using ${chalk.bold("'Jawaria Noor'")} Bank.`)
            process.exit(); // Exit the application
    }
};

// Function to create a new account
const createAccount = async (): Promise<void> => {
    const answers = await inquirer.prompt([
        { name: 'firstName', type: 'input', message: 'Enter first name:' },
        { name: 'lastName', type: 'input', message: 'Enter last name:' },
        { name: 'gender', type: 'list', message: 'Enter gender:', choices: ["Male", "Female"] },
        { name: 'age', type: 'input', message: 'Enter age:', validate: validateAge},
        { name: 'mobileNo', type: 'input', message: 'Enter mobile number:', validate: validateNumber}
    ]);

    const customer = new Customer(
        answers.firstName,
        answers.lastName,
        answers.gender,
        Number(answers.age),
        answers.mobileNo
    );

    const newAccount = new BankAccount(customer);
    accounts.push(newAccount); // Add new account to the accounts array
    headingFunction(48, `Account Created ${chalk.greenBright("Successfully!")}`);
    console.log(chalk.bold(`Account No. ${newAccount.accountNumber}`));
    console.log(chalk.bold(`Account Title: ${customer.firstName + ' ' + customer.lastName}`));
    console.log(chalk.bold(`Bank Balance: ${chalk.green("$")} 0`));
    dashesFunction(48);
    await mainMenu();
};

// Helper function to find an account by account number
const findAccount = (accountNumber: number): BankAccount | undefined => {
    return accounts.find(account => account.getAccountNumber() === accountNumber);
};

// Function to Display Headings
const headingFunction = (dash: number, heading: string): void => {
    console.log("-".repeat(dash));
    console.log(chalk.bold(`\t${heading}`));
    console.log("-".repeat(dash));
}

// Function to display dashes
const dashesFunction = (dash: number): void => {
    console.log("-".repeat(dash));
}

const notFoundFunction = (): void => {
    dashesFunction(45);
    console.log(chalk.bold.red("\t Account Not Found !!"));
    dashesFunction(45);
}

// Function to handle money deposit
const depositMoney = async (): Promise<void> => {
    const { accountNumber, amount } = await inquirer.prompt([
        { name: 'accountNumber', type: 'input', message: 'Enter account number:' },
        { name: 'amount', type: 'input', message: 'Enter amount to deposit:', validate: validateAmount  }
    ]);

    const account = findAccount(Number(accountNumber));
    if (account) {
        account.deposit(Number(amount)); // Call deposit method of BankAccount class
    } else {
        notFoundFunction();
    }
    await mainMenu();
};

// Function to handle money withdrawal
const withdrawMoney = async (): Promise<void> => {
    const { accountNumber, amount } = await inquirer.prompt([
        { name: 'accountNumber', type: 'input', message: 'Enter account number:' },
        { name: 'amount', type: 'input', message: 'Enter amount to withdraw:', validate: validateAmount }
    ]);

    const account = findAccount(Number(accountNumber));
    if (account) {
        account.withdraw(Number(amount)); // Call withdraw method of BankAccount class
    } else {
        notFoundFunction();
    }
    await mainMenu();
};

// Function to check account balance
const checkBalance = async (): Promise<void> => {
    const { accountNumber } = await inquirer.prompt({
        name: 'accountNumber',
        type: 'input',
        message: 'Enter account number:'
    });

    const account = findAccount(Number(accountNumber));
    if (account) {
        headingFunction(45, `${chalk.magentaBright("Bank Balance")} Details !`);
        console.log(chalk.bold(`Current Bank Balance: ${chalk.green("$")}${account.getBalance()}`));
        dashesFunction(45);
    } else {
        notFoundFunction();
    }
    await mainMenu();
};

// Function to view account details
const viewAccountDetails = async (): Promise<void> => {
    const { accountNumber } = await inquirer.prompt({
        name: 'accountNumber',
        type: 'input',
        message: 'Enter account number:'
    });

    const account = findAccount(Number(accountNumber));
    if (account) {
        account.getAccountDetails(); // Call getAccountDetails method of BankAccount class
    } else {
        notFoundFunction();
    }
    await mainMenu();
};

// Function to validate number
const validateNumber = (input: string): boolean | string => {
    return !isNaN(Number(input)) || 'Please enter a valid (11 digits) number';
};

// Function to validate numeric/valid age
const validateAge = (input: string): boolean | string => {
    return !isNaN(Number(input)) || `Please enter a valid/numeric age`;
};

// Function to validate numeric inputs
const validateAmount = (input: string): boolean | string => {
    return !isNaN(Number(input)) || 'Please enter a valid/numeric amount';
};



// Bank Name Heading
headingFunction(58, `Welcome to ${chalk.magentaBright(`'Jawaria Noor'`)} Bank !`);

// Start the application
mainMenu();
