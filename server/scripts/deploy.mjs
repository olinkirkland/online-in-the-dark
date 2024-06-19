import { exec } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';

let newVersionToPrint;

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

const deploy = async () => {
  try {
    console.log('Switching to the production branch...');
    await runCommand('git checkout production');

    console.log('Merging the main branch into the production branch...');
    await runCommand('git merge main');

    console.log('Pushing the production branch to the remote repository...');
    await runCommand('git push origin production');

    console.log('Switching back to the main branch...');
    await runCommand('git checkout main');

    console.log('Pushing main');
    await runCommand('git push');

    console.log(chalk.bgBlue(`Server version: ${newVersionToPrint}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

async function checkAndIncrement() {
  try {
    const gitStatus = await runCommand('git status');
    const gitStatusLines = gitStatus.split('\n').filter((str) => str.length);

    if (!gitStatusLines.some((line) => line.includes('On branch main'))) {
      console.log(chalk.bgRed('Not on main branch'));
      return false;
    }

    if (gitStatusLines.some((line) => line.includes('not staged for commit'))) {
      console.log(
        chalk.bgRed('Cannot have uncommitted changes on main branch')
      );
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const oldVersion = packageJson.version;
    const versionArray = oldVersion.split('.');
    versionArray[versionArray.length - 1] = (
      parseInt(versionArray[versionArray.length - 1]) + 1
    ).toString();
    const newVersion = versionArray.join('.');
    newVersionToPrint = newVersion;
    packageJson.version = newVersion;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    // Write the version to version.json in ./src
    fs.writeFileSync(
      './src/version.json',
      JSON.stringify({
        version: newVersion
      })
    );

    await runCommand(
      `git commit -am "Increment server version in package.json from ${oldVersion} to ${newVersion}"`
    );

    return true;
  } catch (error) {
    console.error('Error incrementing server version:', error);
    return false;
  }
}

if (await checkAndIncrement()) deploy();
