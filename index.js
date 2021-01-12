#!/usr/bin/env node

const fs = require('fs-extra');
const chalk = require('chalk');
var inquirer = require('inquirer');

console.log(`Creating a new Eleventy website...`);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Choose your template',
      choices: [
        'Scaffold',
        'EleventyOne',
        'ElevenTail'
      ],
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
    copyTemplate(answers.template, answers.working_dir)
  });


async function copyTemplate(template, dir) {

  const targetDir =`${process.cwd()}/${dir}`
	console.log(`👋 Creating a new Eleventy website in ${process.cwd()}/${dir}`);
	console.log('');
	await fs.ensureDir(targetDir);
  
  console.log('◆ Copying files');
  console.log('');
	await fs.copy(`${__dirname}/templates/${template}`, targetDir);
  
	console.log('◆ Configuring .gitignore');
  console.log('');
	await fs.move(`${targetDir}/.gitignorefile`, `${targetDir}/.gitignore`);

  
  console.log('✓ Donezo!');
  console.log('');
	console.log(`To get started...`);
	console.log(`👉 cd ${targetDir}`);
	console.log(`👉 npm i`);
	console.log(`👉 ntl start`);
};
