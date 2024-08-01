#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize Todo-List array and conditions variable
let todoList = [];
let conditions = true;
// Print welcome message
console.log(chalk.bold.rgb(204, 204, 204)(`\n  \t\t <<<=============================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.bold.hex('#9999FF')('Welcome To \'Daily Task List\' - Updated Todo-List App')}  <<<===========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<=============================================>>>\n`));
// Main function to handle todo list operations
let main = async () => {
    while (conditions) {
        // Display options menu
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Choose an option:",
                choices: [chalk.green("Add Task"), chalk.red("Delete Task"), chalk.yellow("Update Task"), "View Todo-List", chalk.red("Exit")]
            }
        ]);
        // Call appropriate function based on user choice
        if (option.choice === chalk.green("Add Task")) {
            await addTask();
        }
        else if (option.choice === chalk.red("Delete Task")) {
            await deleteTask();
        }
        else if (option.choice === chalk.yellow("Update Task")) {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            viewTasks();
        }
        else if (option.choice === chalk.red("Exit")) {
            conditions = false;
        }
        else {
            console.log("Invalid option");
        }
    }
};
// Function to add a new task
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.green("Enter your New Task :")
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n "${chalk.cyanBright.bold(newTask.task)}" Task added successfully in Todo-List\n`);
};
// Function to delete a task
let deleteTask = async () => {
    await viewTasks();
    let deleteTaskPrompt = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index of' the task to delete:"
        }
    ]);
    let deletedTask = todoList.splice(deleteTaskPrompt.index - 1, 1);
    console.log(`\n "${chalk.cyanBright.bold(deletedTask)}" Task deleted successfully from Todo-List\n`);
};
// Function to update a task
let updateTask = async () => {
    await viewTasks();
    let updateTaskPrompt = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task to update:"
        },
        {
            name: "task",
            type: "input",
            message: "Now Enter the updated task:"
        }
    ]);
    todoList[updateTaskPrompt.index - 1] = updateTaskPrompt.task;
    console.log(`\n Task at index ${updateTaskPrompt.index} updated to "${chalk.cyanBright.bold(updateTaskPrompt.task)}" successfully [Check "View Todo-List" for updated list]\n`);
};
// Function to view all tasks
let viewTasks = () => {
    console.log(chalk.cyanBright.bold("\nYour Todo-List:\n"));
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log("\n");
};
// Run the main function
main();
