import inquirer from "inquirer";

class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    console.log("Welcome");
    const ans = await inquirer.prompt({
        name: "select",
        type: "list",
        message: "Who would you like to interact with",
        choices: ["staff", "student", "exit"],
    });
    if (ans.select == "staff") {
        console.log("Welcome to Our Origanization's staff ! Please feel free to seek our help");
    }
    else if (ans.select == "student") {
        const ans = await inquirer.prompt({
            name: "student",
            type: "input",
            message: "Enter student name you want to interact with:",
        });
        const student = persons.students.find(val => val.name == ans.student);
        if (!student) {
            const name = new Student(ans.student);
            persons.addStudent(name);
            console.log(`Hello i am ${name.name}.Nice to meet you`);
            console.log("New Student added");
            console.log("Current Student List:");
            console.log(persons.students);
        }
        else {
            console.log(`Hello i am ${Student.name}.Nice to see you again`);
            console.log("Existing Student List:");
            console.log(persons.students);
        }
    }
    else if (ans.select == "exit") {
        console.log("You have Exited");
    }
};
programStart(persons);
