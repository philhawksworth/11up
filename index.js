#!/usr/bin/env node

const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');


// normalise up any complex URLs
function urlify(str) {
  var url = new URL(str);
  return `https://${url.hostname}${url.pathname}`;
}

// Assemble a list of template options
const templatesRoot = `${__dirname}/templates`
let templates = [];
const templateDirs = fs.readdirSync(templatesRoot);
templateDirs.forEach(folder => {
  let package = require(`${templatesRoot}/${folder}/package.json`);
  templates.push({
    "name": `${package.name} (v${package.version})`,
    "url": urlify(package.repository.url),
    "description": package.description,
    "version": package.version,
    "value": folder
  });
});


// do the right thing
const argument = process.argv[2];
const listFlags = ["l", "ls", "list"]
if(listFlags.includes(argument)) {
  templateDetails();
  return;
}

console.log('');
console.log(`🎈 ${chalk.green("11up will create a new Eleventy website...")}`);
console.log('');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'working_dir',
      message: "Specify a directory for your new site",
      default: function () {
        return '.';
      },
    },
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template',
      choices: templates.concat({
        "name": "(or show more info about the templates instead)",
        "value": "list"
      }),
      filter: function (val) {
        return val.toLowerCase();
      },
    },
  ])
  .then((answers) => {
    if(answers.template == "list") {
      templateDetails();
      return;
    } else {
      copyTemplate(answers.template, answers.working_dir);
    }
  });


// Put things where they belong
async function copyTemplate(template, dir) {
  const targetDir =`${process.cwd()}/${dir}`
  const greenCheck = chalk.green("✓");
  
  // Copy the template
  console.log('');
  console.log(chalk.green(`✨ Creating a new Eleventy website in ${process.cwd()}/${dir}`));
  await fs.ensureDir(targetDir);
  await fs.copy(`${templatesRoot}/${template}`, targetDir);
  await fs.copy(`${templatesRoot}/${template}/.gitignore`, targetDir);
  
  // Credit the original
  const { repository } = require(`${targetDir}/package.json`);
  const repoURL = urlify(repository.url);
  console.log(chalk.green(`✨ Template sourced from ${repoURL}`));
  console.log('');
  
  // Inform of some file arrivals
  console.log(`${greenCheck} template files copied`);
  console.log(`${greenCheck} package.json copied`);
  console.log(`${greenCheck} .gitignore copied`);
  console.log(chalk.green("✓ Done-zo!"));
  
  // Giddy up
  console.log('');
  console.log(`To get started...`);
  console.log('');
  console.log(`👉 cd ${targetDir}`);
  console.log(`👉 npm i`);
  console.log(`👉 npm start`);
};


// Show information about the available templates
function templateDetails() {
  console.log('');
  console.log(chalk.green("Available template details:"), chalk.grey("(npx 11up list)"));
  templates.forEach(template => {
    console.log("");
    console.log(`🎈 ${chalk.green(template.name)}`);
    console.log(template.description);
    console.log(template.url);
  });
}; 


