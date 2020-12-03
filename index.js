#!/usr/bin/env node

const {Command, flags} = require('@oclif/command');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const chalk = require('chalk');


class ElevenUpCommand extends Command {
  async run() {

    const {flags} = this.parse(ElevenUpCommand);

    // Choose a template to use
    let template = flags.template;
    if (!template) {
      let responses = await inquirer.prompt([{
        name: 'template',
        message: 'Which site template shall we use?',
        type: 'list',
        choices: [
          {name: 'scaffold'},
          {name: 'with-sass'}
        ]
      }]);
      template = responses.template;
    }
    const templateDir = `${__dirname}/templates/${template}`;

    // Specify a folder location
    let workingDirectory = flags.workingDirectory;
    let targetDir;
    if (!workingDirectory) {
      let responses = await inquirer.prompt([{
        name: 'target',
        message: 'target directory for the new site?',
        type: 'input'
      }]);
      targetDir = responses.target;
      workingDirectory = `${process.cwd()}/${targetDir}`;
    }


    const gem = chalk.green('⬥');
    const check = chalk.green('✔');

    // Copy site starter templates into place
    console.log(`${gem} Creating a new Eleventy site in`, chalk.blue(workingDirectory));
    console.log(`${gem} Copying template:`, chalk.blue(template));

    await fs.ensureDir(workingDirectory);
    await fs.copy(`${templateDir}/src`, `${workingDirectory}/src`);
    console.log(` ${check} Template files copied`);

    await fs.copy(`${templateDir}/.gitignoreFile`, `${workingDirectory}/.gitignore`);
    console.log(` ${check} File added: .gitignore`);
    await fs.copy(`${templateDir}/README.md`, `${workingDirectory}/README.md`);
    console.log(` ${check} File added: README.md`);
    await fs.copy(`${templateDir}/package.json`, `${workingDirectory}/package.json`);
    console.log(` ${check} File added: package.json`);
    await fs.copy(`${templateDir}/.eleventy.js`, `${workingDirectory}/.eleventy.js`);
    console.log(` ${check} File added: .eleventy.js`);
    console.log('');
    console.log('✨ You\'ve got what you need. Let\'s go! ✨');
    console.log('');
    console.log(chalk.grey('   # Move to the working directory'));
    console.log(`   cd ${targetDir}`);
    console.log('');
    console.log(chalk.grey('   # Install project dependencies'));
    console.log('   npm install');
    console.log('');
    console.log(chalk.grey('   # Build, serve and watch your code'));
    console.log('   npm run start');
    console.log('');


  }
}


ElevenUpCommand.description = `Start a new 11ty site from a template
...
Let's get a running start.
`

ElevenUpCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  template: flags.string({char: 't', description: 'Starting template'}),
  directory: flags.string({char: 'd', description: 'Target directory for the new site'}),
}

module.exports = ElevenUpCommand
