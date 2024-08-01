#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

// 
class Student {
    // Static variable to generate unique student IDs
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    // Constructor to initialize student properties
    constructor(name: string) {
        // Assigning a unique ID to each student by incrementing the counter every time
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initializing an empty array for enrolled courses
        this.balance = 1000; // Initializing balance to zero
    }

    // Method to enroll a student in a course
    enrollCourse(course: string) {
        this.courses.push(course);
    }

    // Method to view the balance of a student
    viewBalance() {
        console.log(chalk.bold('-'.repeat(60)));
        console.log(chalk.bold.white(`Balance for ${this.name}: $ ${chalk.bold.greenBright(this.balance)}`));
        console.log(chalk.bold('-'.repeat(60)));
    }

    // Method to pay tuition fees
    payTuition(amount: number) {
        this.balance -= amount;
        console.log(chalk.bold('------------------------------------'));
        console.log(`$ ${chalk.bold.greenBright(amount)} has been paid for, ${chalk.bold(this.name)}.`);
        console.log(`Remaining balance: $ ${chalk.bold.green(this.balance)}`);
        console.log(chalk.bold('------------------------------------'));
    }

    // Method to display the status of a student
    showStatus() {
        console.log(chalk.bold('-'.repeat(60)));
        console.log(chalk.bold.blue(`\t\t Student Status`));
        console.log(chalk.bold('-'.repeat(60)));
        console.log(chalk.bold.white(`  ID:  ${chalk.yellow(this.id)}`));
        console.log(chalk.bold.white(`  Name:  ${chalk.bold.magentaBright(this.name)}`));
        console.log(chalk.bold.white(`  Balance:  $ ${chalk.bold.greenBright(this.balance)}`));
        console.log(chalk.bold.white(`  Enrolled courses:  [${chalk.bold.cyanBright(this.courses.join(', '))}]`));
        console.log(chalk.bold('-'.repeat(60)));
    }
}

// Defining a class to manage the collection of students
class StudentManager {
    students: Student[];

    constructor() {
        this.students = []; // Initializing an empty array to store students
    }

    // Method to add a new student
    addStudent(name: string) {
        const student = new Student(name);
        this.students.push(student);
        console.log(chalk.bold('-'.repeat(60)));
        console.log(`'${chalk.bold.blueBright(name)}' added successfully. Student ID: ${chalk.greenBright(student.id)}`);
        console.log(chalk.bold('-'.repeat(60)));
    }

    // Method to enroll a student in a course
    enrollStudent(studentId: number, course: string) {
        const student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(chalk.bold('-'.repeat(60)));
            console.log(`'${chalk.bold(student.name)}' enrolled in '${chalk.bold.blueBright(course)}' course successfully.`);
            console.log(chalk.bold('-'.repeat(60)));
        } else {
            console.log(chalk.red(`Student with 'ID: ${studentId}' not found.`));
        }
    }

    // Method to view the balance of a student
    viewStudentBalance(studentId: number) {
        const student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        } else {
            console.log(chalk.red(`Student with 'ID: ${studentId}' not found.`));
        }
    }

    // Method to pay tuition fees
    payStudentTuition(studentId: number, amount: number) {
        const student = this.findStudent(studentId);
        if (student) {
            student.payTuition(amount);
        } else {
            console.log(chalk.red(`Student with 'ID: ${studentId}' not found.`));
        }
    }

    // Method to display the status of a student
    showStudentStatus(studentId: number) {
        const student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        } else {
            console.log(chalk.redBright(`Student with 'ID: ${studentId}' not found.`));
        }
    }

    // Private method to find a student by ID
    private findStudent(studentId: number): Student | undefined {
        return this.students.find(student => student.id === studentId);
    }
}

// Main function to run the program
async function main() {
    console.log(chalk.bold.blueBright('\n\tJawaria Tech - Student Management System'));
    console.log(chalk.bold('-'.repeat(60)));

    // Creating an instance of StudentManager
    const studentManager = new StudentManager();

    // Infinite loop to prompt the user for options
    while (true) {
        // Prompting the user to choose an option
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: chalk.bold.yellowBright('Choose an option:'),
                choices: [
                    'Add Student',
                    'Enroll Student',
                    'View Student Balance',
                    'Pay Student Fees',
                    'Show Student Status',
                    'Exit'
                ]
            }
        ]);

        // Switch statement to perform actions based on user choice
        switch (choice) {
            case 'Add Student':
                // Prompting for student name and adding the student
                const { name } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter student name:'
                    }
                ]);
                studentManager.addStudent(name);
                break;
            case 'Enroll Student':
                // Prompting for student ID and course name to enroll
                const { studentId, course } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentId',
                        message: 'Enter student ID:'
                    },
                    {
                        type: 'input',
                        name: 'course',
                        message: 'Enter course name:'
                    }
                ]);
                studentManager.enrollStudent(parseInt(studentId), course);
                break;
            case 'View Student Balance':
                // Prompting for student ID to view balance
                const userInput = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentId',
                        message: 'Enter student ID:'
                    }
                ]);
                studentManager.viewStudentBalance(parseInt(userInput.studentId));
                break;
            case 'Pay Student Fees':
                // Prompting for student ID and amount to pay
                const amountInput = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentId',
                        message: 'Enter student ID:'
                    },
                    {
                        type: 'input',
                        name: 'amount',
                        message: 'Enter amount to pay:'
                    }
                ]);
                studentManager.payStudentTuition(parseInt(amountInput.studentId), parseInt(amountInput.amount));
                break;
            case 'Show Student Status':
                // Prompting for student ID to show status
                const { studentId: showStatusId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentId',
                        message: 'Enter student ID:'
                    }
                ]);
                studentManager.showStudentStatus(parseInt(showStatusId));
                break;
            case 'Exit':
                // Exiting the program
                console.log(chalk.red('Exiting...'));
                process.exit();
                break;
        }
    }
}

// Invoking the main function to start the program
main();
