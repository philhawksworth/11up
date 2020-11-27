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
    const templateDir = `${process.cwd()}/templates/${template}`;

    // Specify a folder location
    let workingDirectory = flags.workingDirectory;
    if (!workingDirectory) {
      let responses = await inquirer.prompt([{
        name: 'target',
        message: 'target directory for the new site?',
        type: 'input'
      }]);
      workingDirectory = `${process.cwd()}/${responses.target}`;
    }


    const gem = chalk.green('⬥');
    const check = chalk.green('✔');

    // Copy site starter templates into place
    console.log(`${gem} Creating a new Eleventy site in`, chalk.blue(workingDirectory));
    console.log(`${gem} Copying template:`, chalk.blue(template));

    await fs.ensureDir(workingDirectory);
    await fs.copy(`${templateDir}/src`, `${workingDirectory}/src`);
    console.log(` ${check} Source files copied:`, chalk.blue(workingDirectory));

    await fs.copy(`${templateDir}/.gitignoreFile`, `${workingDirectory}/.gitignore`);
    console.log(` ${check} .gitignore file added`);
    await fs.copy(`${templateDir}/README.md`, `${workingDirectory}/README.md`);
    console.log(` ${check} README.md file added`);
    await fs.copy(`${templateDir}/package.json`, `${workingDirectory}/package.json`);
    console.log(` ${check} package.json file added`);

	console.log('🌱 All set! Let\'s get you started:');
	console.log('');
	console.log(`    cd ${responses.target}`);
	console.log('    npm run serve');


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
