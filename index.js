#!/usr/bin/env node

const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');

// Assemble a list of template options
const templatesRoot = `${__dirname}/templates`
let options = [];
const templateDirs = fs.readdirSync(templatesRoot);
templateDirs.forEach(folder => {
  let package = require(`${templatesRoot}/${folder}/package.json`);
  options.push({
    "name": `${package.name} (v${package.version})`,
    "value": folder
  });
});

console.log('');
console.log(`🎈 ${chalk.green("11up will create a new Eleventy website...")}`);
console.log('');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template',
      choices: options,
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    {
      type: 'input',
      name: 'working_dir',
      message: "Specify a directory",
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
  const greenCheck = chalk.green("✓");

  console.log('');
  console.log(chalk.green(`✨ Creating a new Eleventy website in ${process.cwd()}/${dir}`));
  console.log('');
  await fs.ensureDir(targetDir);

  await fs.copy(`${templatesRoot}/${template}`, targetDir);
  console.log(`${greenCheck} template files copied`);
  console.log(`${greenCheck} package.json copied`);
  console.log(`${greenCheck} .gitignore copied`);

  console.log(chalk.green("✓ Done-zo!"));
  console.log('');
  console.log(`To get started...`);
  console.log('');
  console.log(`👉 cd ${targetDir}`);
  console.log(`👉 npm i`);
  console.log(`👉 npm start`);
};
