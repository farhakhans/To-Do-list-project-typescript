import inquirer from 'inquirer';
import chalk from 'chalk';

console.log(chalk.yellow(`<<<<=========>>>>   Welcome to Farhana Khan's To-Do List App   <<<<========>>>>`));
let mylist: string[] = ["Ticket book", "Time flight", "books"];

async function main() {
    while (true) {
        const answer = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: ["Add task", "View list", "Delete task", "Update Task", "Exit"]
            }
        ]);

        switch (answer.choice) {
            case "View list":
                viewList();
                break;
            case "Add task":
                await addTask();
                break;
            case "Delete task":
                await deleteTask();
                break;
            case "Update Task":
                await updateTask();
                break;
            case "Exit":
                console.log(chalk.magenta("Thank you for using the to-do list app. Goodbye!"));
                return;
        }
    }
}

function viewList() {
    console.log(chalk.yellow("To-Do List:"));
    mylist.forEach((item, index) => {
        console.log(`${index + 1}: ${item}`);
    });
}

async function addTask() {
    const input = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter To-Do list Item here:"
        }
    ]);

    mylist.push(input.task);
    console.log(chalk.red("Task added successfully!"));
}

async function updateTask() {
    const input = await inquirer.prompt([
        {
            name: "update",
            type: "input",
            message: "Enter your updated task: "
        }
    ]);

    // Update the task at a specific index
    const updateIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index of the task you want to update:"
        }
    ]);

    if (updateIndex.index >= 1 && updateIndex.index <= mylist.length) {
        mylist[updateIndex.index - 1] = input.update;
        console.log(chalk.yellowBright("Task updated successfully!"));
    } else {
        console.log(chalk.red("Invalid index. Please enter a valid index."));
    }
}

async function deleteTask() {
    const deleteIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter number you want to delete:"
        }
    ]);

    if (deleteIndex.index >= 1 && deleteIndex.index <= mylist.length) {
        mylist.splice(deleteIndex.index - 1, 1);
        console.log(chalk.greenBright("Task deleted successfully!"));
    } else {
        console.log(chalk.red("Invalid index. Please enter a valid index."));
    }
}

main();
