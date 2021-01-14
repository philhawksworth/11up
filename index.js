#!/usr/bin/env node

const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');

// Assemble a list of template options
let options = [];
const templateDirs = fs.readdirSync("./templates");
templateDirs.forEach(folder => {
  let package = require(`./templates/${folder}/package.json`);
  options.push({
    "name": `${package.name} (v${package.version})`,
    "value": folder
  });
});


console.log(`Creating a new Eleventy website...`);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Choose your template',
      choices: options,
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    {
      type: 'input',
      name: 'working_dir',
      message: "Directory",
      default: function () {
        return '.';
      },
    },
  ])
  .then((answers) => {
    copyTemplate(answers.template, answers.working_dir);
  });


async function copyTemplate(template, dir) {

  const targetDir =`${process.cwd()}/${dir}`
  const blueCheck = chalk.cyan("✓");

  console.log('');
	console.log(`✨ Creating a new Eleventy website in ${process.cwd()}/${dir}`);
	await fs.ensureDir(targetDir);
  
	await fs.copy(`${__dirname}/templates/${template}`, targetDir);
  console.log(`${blueCheck} template files copied`);
  console.log(`${blueCheck} package.json copied`);
  
	await fs.move(`${targetDir}/.gitignorefile`, `${targetDir}/.gitignore`);
  console.log(`${blueCheck} .gitignore copied`);
  
  console.log(`${blueCheck} Donezo!`);
  console.log('');
	console.log(`To get started...`);
	console.log(`👉 cd ${targetDir}`);
	console.log(`👉 npm i`);
	console.log(`👉 npm start`);
};
