#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Player {
    name: string;
    health: number;
    energy_drinks: number;

    constructor(name: string) {
        this.name = name;
        this.health = 100;
        this.energy_drinks = 3;
    }

    attack() {
        return Math.floor(Math.random() * 15);
    }

    drinkEnergyDrink() {
        const increaseHealth = 30;
        this.energy_drinks -= 1;
        this.health += increaseHealth;
        console.log(`Your Health increased: +${chalk.bold.green(increaseHealth)}.  Total Health: ${chalk.bold.yellow(this.health)}`);
        console.log(`Remaining drinks: ${chalk.yellow.bold(this.energy_drinks)}`);
    }

    decreaseHealth(attackPower: number) {
        this.health -= attackPower;
        return this.health;
    }
}

class Enemy {
    name: string;
    health: number;

    constructor(name: string) {
        this.name = name;
        this.health = 0;
    }

    setHealthBasedOnType() {
        if (this.name === "Zombie") {
            this.health = 50;
        } else if (this.name === "Dragon") {
            this.health = 70;
        } else if (this.name === "Monster") {
            this.health = 100;
        }
    }

    attack() {
        return Math.floor(Math.random() * 15);
    }

    decreaseHealth(attackPower: number) {
        this.health -= attackPower;
        return this.health;
    }

    showHealth(playerName: string, playerHealth: number, enemyHealth: number) {
        console.log(`${chalk.blue.bold(playerName)} Health: ${chalk.yellow(playerHealth)} | ${chalk.red.bold(this.name)} Health: ${chalk.yellow(enemyHealth)} \n`);
    }
}

async function main() {
    const playerResponse = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is your name?"
        }
    ]);
    const player = new Player(playerResponse.name);

    const enemyResponse = await inquirer.prompt([
        {
            name: "name",
            type: "list",
            message: "Select your opponent enemy?",
            choices: ["Zombie", "Dragon", "Monster"]
        }
    ]);
    const enemy = new Enemy(enemyResponse.name);
    enemy.setHealthBasedOnType();

    console.log(chalk.bold(`\t ${player.name}   vs   ${enemy.name}`));
    enemy.showHealth(player.name, player.health, enemy.health);
    while (true) {
        const choice = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "What do you want to do?",
                choices: ["Attack", "Energy Drink", "Run"]
            }
        ]);

        if (choice.action === "Attack") {
            const playerAttack = player.attack();
            const enemyAttack = enemy.attack();
            enemy.health = enemy.decreaseHealth(playerAttack);
            player.health = player.decreaseHealth(enemyAttack);
            console.log(`${player.name} Attack ${chalk.bold.green(playerAttack)}  |  ${enemy.name} Attack ${chalk.bold.redBright(enemyAttack)}`);
            if (enemy.health > 0 && player.health > 0){
                enemy.showHealth(player.name, player.health, enemy.health);
            }
            
        }

        if (choice.action === "Energy Drink") {
            console.log(`Energy Drink will boost Health: ${chalk.bold.green("+30")} \nRemaining drinks: ${chalk.bold.yellow(player.energy_drinks)}`);
            const ask = await inquirer.prompt([
                {
                    name: "drink",
                    type: "confirm",
                    message: "Want to use an energy drink?"
                }
            ]);
            if (ask.drink) {
                player.drinkEnergyDrink();
            }
        }

        if (choice.action === "Run") {
            console.log(`${chalk.bold.blue(player.name)} ${chalk.red("ran away!")}`);
            break;
        }

        if (enemy.health <= 0) {
            console.log(`\t ${chalk.bold.blue(player.name)} ${chalk.greenBright.bold("Wins!")} \n\nYour health is ${chalk.bold.green(player.health)} and ${enemy.name} health is ${chalk.bold.red(0)}.`);
            console.log(`\tYou Killed ${chalk.red(enemy.name)}`);
            break;
        }

        if (player.health <= 0) {
            console.log(`You loose. ${chalk.bold.red(enemy.name)} Wins!`);
            console.log(`your health is ${chalk.bold.red(0)} and ${enemy.name} health is ${chalk.bold.green(enemy.health)}.`);
            break;
        }
    }
}

main();
