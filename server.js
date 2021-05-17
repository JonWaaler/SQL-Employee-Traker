require("dotenv").config();
const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

// For viewing a database table
printFullTable = (table_name) => {
  db.query(`SELECT * FROM ${table_name}`, function (err, results, fields) {
    //console.log(results);
    //console.log(fields);

    console.log(`--- ${table_name} ---`);
    console.table(results);

    if (err) {
      console.log("err at printFullTable():" + err);
    }

    collectInputs();
  });
};

// TODO
addToTable = () => {};

const init_options = [
  // Get choice
  {
    type: "list",
    name: "initialOptions",
    message: "What do you want to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
      /* 
            Bonus options
                 -Update employee managers
                 -View employees by manager
                 -View employees by department
                 -Delete departments, roles, and employees
                 -View the total utilized budget of a department
          */
    ],
  },
];

const collectInputs = async () => {
  let questionLoop = await inquirer
    .prompt(init_options)
    .then((firstAnswer) => {
      // view tables + recursive call inside printFullTable("");
      if (firstAnswer.initialOptions == "view all departments") {
        printFullTable("departments");
      } else if (firstAnswer.initialOptions == "view all roles") {
        printFullTable("roles");
      } else if (firstAnswer.initialOptions == "view all employees") {
        printFullTable("employees");
      }

      // add to tables
      else if (firstAnswer.initialOptions == "add a department") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "dept_name",
              message: "What is the name our your new department?",
            },
          ])
          .then((answer) => {
            db.query(
              `INSERT INTO departments (name) VALUES ('${answer.dept_name}')`,
              function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                collectInputs();
              }
            );
          });
      } else if (firstAnswer.initialOptions == "add a role") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "role_name",
              message: "What is the name of your new role?",
            },
            {
              type: "input",
              name: "salary",
              message: "What is the new roles salary? (max 6 figures)",
            },
            {
              type: "input",
              name: "dept_index",
              message: "What department id does this new role fit under?",
            },
          ])
          .then((answer) => {
            db.query(
              `INSERT INTO roles (title, salary, department_id) VALUES ('${answer.role_name}', ${answer.salary}, ${answer.dept_index})`,
              function (err, result) {
                if (err) throw err;
                console.log(result);
                collectInputs();
              }
            );
          });
      } else if (firstAnswer.initialOptions == "add an employee") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "emp_f_name",
              message: "What is the new employees first name?",
            },
            {
              type: "input",
              name: "emp_l_name",
              message: "What is the new employees last name?",
            },
            {
              type: "input",
              name: "role_id",
              message: "What department id does this new role fit under?",
            },
            {
              type: "input",
              name: "mngr_id",
              message: "Manager id? ",
            },
          ])
          .then((answer) => {
            db.query(
              `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.emp_f_name}", "${answer.emp_l_name}", ${answer.role_id}, ${answer.mngr_id})`,
              function (err, result) {
                if (err) throw err;
                console.log(result);
                collectInputs();
              }
            );
          });
      }

      // update table
      else if (firstAnswer.initialOptions == "update an employee role") {
        //
        inquirer
          .prompt([
            {
              type: "text",
              name: "id",
              message:
                "What is the ID of the employee that you want to update?",
            },
          ])
          .then((answer_id) => {
            inquirer
              .prompt([
                {
                  type: "text",
                  name: "newfname",
                  message: `What is employee ${answer_id.id} new first name?`,
                },
                {
                  type: "text",
                  name: "newlname",
                  message: `What is ${answer_id.id} new last name?`,
                },
                {
                  type: "text",
                  name: "newRole",
                  message: `What is ${answer_id.id} new Role ID?`,
                },
                {
                  type: "text",
                  name: "newMngr",
                  message: `What is ${answer_id.id} new Manager ID?`,
                },
              ])
              .then((newData) => {
                // UPDATE THE DATABASE TABLE
                db.query(
                  `UPDATE employees SET first_name='${newData.newfname}', last_name='${newData.newlname}', role_id=${newData.newRole}, manager_id=${newData.newMngr} WHERE id=${answer_id.id}`,
                  function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    collectInputs();
                  }
                );
              });
          });
      }

      // for prompting another question
      //inquirer.prompt({}).then((answer) => {});
    })
    .catch((err) => {
      if (err) console.log(err);
    });

  // see the inquirer prompt loop returns
  //   let result = await questionLoop;
  //   console.log("End result: " + result);
};

main = () => {
  collectInputs();
};
main();
