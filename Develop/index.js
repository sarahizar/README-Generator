// TODO: Include packages needed for this application
const inquirer = require('inquirer');

// Node v10+ includes a promises module as an alternative to using callbacks with file system methods.
const { writeFile } = require('fs').promises;

function renderLicenseBadge(license) {
    return license
      ? `https://img.shields.io/badge/license-${encodeURIComponent(license)}-brightgreen`
      : '';
  }
  
  function renderLicenseLink(license) {
    return license
      ? `[${license}](https://spdx.org/licenses/${encodeURIComponent(license)}.html)`
      : '';
  }
  
  function renderLicenseSection(license) {
    return license
      ? `## License
  ${renderLicenseBadge(license)}
  This project is licensed under the ${renderLicenseLink(license)} license.`
      : '';
  }

// TODO: Create an array of questions for user input
const userQuestions = () => {
    return inquirer.prompt([
    {   
        type:'input',
        name: 'project-name',
        message: "What is your project name? ",
    },
    {   
        type:'input',
        name: 'description',
        message: "Provide a brief description of your project ",
    },
    {   
        type:'checkbox',
        name: 'table-of-contents',
        message: "Which items would you like to add to your table of contents?",
        choices: [
            'Description','Features','Installation','Technologies','Usage', 'License', 'Contributions','Test','Screenshot','Questions'
        ],
    },
    {   
        type:'input',
        name: 'installation',
        message: "Provide installation instructions for a user:" ,
    },
    {   
        type:'input',
        name: 'technologies',
        message: "What technologies did you use for this project?",
    },
    {   
        type:'input',
        name: 'usage',
        message: "Provide usage information for a user on how to properly use this project?",
    },
    {   
        type:'list',
        name: 'license',
        message: "What license did you use to create this project?",
        choices: [
            'MIT License','Apache License 2.0','Boost Software License 1.0','The Unlicense', 'Not Listed'
        ],
    },
    {   
        type:'input',
        name: 'contributions',
        message: "Did anyone contribute to your project, if so- who?",
    },
    {   
        type:'input',
        name: 'tests',
        message: "What testing did you impliment and/or how can users test this project?",
    },
    {   
        type:'input',
        name: 'screenshot',
        message: "This is where you will enter your screenshot link-(press enter to leave it blank):",
    },
    {   
        type:'input',
        name: 'github-username',
        message: "Enter your GitHub username:",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter your email address:",
      },
     ]);
    }
// Generates README w/badges, the Table of Contents answers, and the Github link
    const generateReadMe = (answers) => {
        const licenseBadgeUrl = renderLicenseBadge(answers.license);
        const licenseSection = renderLicenseSection(answers.license);

      const tableOfContents = answers['table-of-contents']
        .map((item) => `- [${item}](#${item.toLowerCase()})`)
        .join('\n');

      const githubProfileLink = answers['github-username']
        ? `[${answers['github-username']}](https://github.com/${answers['github-username']})`
        : 'GitHub profile not provided';

    return `# ${answers['project-name']}
 
## Description
${answers.description}

## Table of Contents
${answers['table-of-contents'].join('\n')}
- [Description](#description)
- [Installation](#installation)
- [Technologies](#technologies)
- [Usage](#usage)
- [License](#license)
- [Contributions](#contributions)
- [Tests](#tests)
- [Screenshot](#screenshot)
- [Questions](#github-username)

## Installation<a name="installation"></a>
${answers.installation}

## Technologies<a name="technologies"></a>
${answers.technologies}

## Usage<a name="usage"></a>
${answers.usage}

## License
${licenseBadgeUrl ? `![License Badge](${licenseBadgeUrl})` : ''}
${answers.license ? `This project is licensed under the ${answers.license} license.` : 'No license specified.'}

## Contributions<a name="contributions"></a>
${answers.contributions}

 ## Tests<a name="tests"></a>
${answers.tests}

## Screenshot<a name="screenshot"></a>
${answers.screenshot}

## Questions<a name="github-username"></a>
For additional questions, you can reach me through:
- GitHub: ${githubProfileLink}
- Email: ${answers.email || 'Not provided'}
    `;
};  

const writeToFile= async (fileName, data) => {
    try {
        await writeFile(fileName, data);
    } catch (err) {
        console.log(err);
    }
}

const init = () => {
    userQuestions()
      .then((answers) => generateReadMe(answers))
      .then((readmeContent) => writeToFile('README.md', readmeContent))
      .then(() => console.log('Successfully created a README.md'))
      .catch((err) => console.error(err));
  };
  

init();
