import { exec } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';

// Utility function to run a shell command and return it as a promise
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      console.log(chalk.bgWhite(` ${command} `));
      if (error) {
        console.log(chalk.bgRed(` ${error.message.trim()} `));
        reject(`Error: ${error.message}`);
      } else if (stderr) {
        console.log(chalk.bgYellow(` ${stderr.trim()} `));
        resolve(stderr);
      } else {
        console.log(chalk.bgWhite(` ${stdout.trim()} `));
        resolve(stdout);
      }
    });
  });
};

async function check() {
  const gitStatus = await runCommand('git status');
  const gitStatusLines = gitStatus.split('\n').filter((str) => str.length);

  if (!gitStatusLines.some((line) => line.includes('On branch main'))) {
    console.log(chalk.bgRed('Not on main branch'));
    return false;
  }

  if (gitStatusLines.some((line) => line.includes('not staged for commit'))) {
    console.log(chalk.bgRed('Cannot have uncommitted changes on main branch'));
    return false;
  }

  return true;
}

async function incrementVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const oldVersion = packageJson.version;
  const versionArray = oldVersion.split('.');
  versionArray[versionArray.length - 1] = (
    parseInt(versionArray[versionArray.length - 1]) + 1
  ).toString();
  const newVersion = versionArray.join('.');
  packageJson.version = newVersion;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log(
    `Incremented version in package.json from ${oldVersion} to ${newVersion}`
  );

  await runCommand(
    `git commit -am "Increment version in package.json from ${oldVersion} to ${newVersion}"`
  );

  await runCommand('git push');

  console.log(chalk.bgBlue(`Client version: ${newVersion}`));
}

if (await check()) incrementVersion();
else process.exit(1);
