var inquirer = require("inquirer");
const shell = require("shelljs");
const {
  AllEpicBranches,
  AllLocalBranches,
  NoEpics,
} = require("./helpers/epicDisplayer");
const { GetEpics, GetBranchName } = require("./helpers/gitFunctions");
const { MoveToBranch, MoveToDevelop } = require("./helpers/movers");
const {
  IsFromEpic,
  CreatpePepitosBranch,
  CreatePepitoFromEpic,
  CreatePepito,
  FinishPepito,
} = require("./helpers/pepitosFunctions");
const {
  CreateEpicAndPepitoDisplayer,
  CreatePepitoDisplayer,
  DeleteSelfBranchWarning,
  DeletingCurrentBranchDisplayer,
  ClosePepitoOnEpicDisplayer,
  ClosePepitoOnDevelopDisplayer,
  HandleErrorDysplayer,
} = require("./helpers/pepitosDisplayer");

async function chooseParentBranch(list) {
  const answer = await inquirer.prompt(
    {
      name: 'epicBranch',
      type: 'list',
      message: 'Choose a parent branch \n orphans should start from develop',
      choices: [...list, 'develop']
    }
  )

  return answer.epicBranch
}

async function start(argv) {
  const { name, jiraId, epic } = argv;
  if (argv.name && argv.jiraId) {
    let pepitoName = argv.name;
    if (name && jiraId) {
      AllEpicBranches();
      let list = await GetEpics();
      if (epic) {
        if (list.length !== 0) {
          const baseBranch = await chooseParentBranch(list)
          MoveToBranch(baseBranch);
          shell.exec(
            `git checkout -b pepito/${baseBranch}/CTDEV-${jiraId}_${pepitoName}`
          );
        } else {
          NoEpics();
        }
      } else {
        if (IsFromEpic(name)) {
          let epicName = argv.name.split("/")[1].replace("-", "/CTDEV-");
          if (list.includes(epicName)) {
            MoveToBranch(epicName);
            CreatePepitoFromEpic({ epicName, jiraId, pepitoName });
            CreateEpicAndPepitoDisplayer({ epicName, jiraId, pepitoName });
          } else {
            MoveToDevelop();
            CreatpePepitosBranch(epicName);
            CreatePepitoFromEpic({ epicName, jiraId, pepitoName });
            CreateEpicAndPepitoDisplayer({ epicName, jiraId, pepitoName });
          }
        } else {
          CreatePepito({ jiraId, name });
          CreatePepitoDisplayer({ jiraId, name });
        }
      }
    } else {
      console.log("\x1b[31m", "ERROR: Missing jiraId or name arguments.");
    }
  }
}

async function finish(argv) {
  const { name } = argv;
  let hasName = true;
  let epicName;
  let branchName = GetBranchName().toString();

  if (!argv.name) {
    DeleteSelfBranchWarning();
    hasName = false;
  }

  if (hasName) {
    MoveToBranch(name);
    branchName = name;
  } else {
    DeletingCurrentBranchDisplayer(branchName);
  }

  if (IsFromEpic(branchName)) {
    let branchNameArray = branchName.toString().split("/");
    epicName = branchNameArray[1].replace("-", "/");
    MoveToBranch(epicName);
    FinishPepito(branchName);
    ClosePepitoOnEpicDisplayer({ epicName, branchName });
  } else {
    MoveToDevelop();
    FinishPepito(branchName);
    ClosePepitoOnDevelopDisplayer(branchName);
  }
}

async function handleError() {
  HandleErrorDysplayer();
}

module.exports = {
  pepitoStart: start,
  pepitoFinish: finish,
  pepitoHandleError: handleError,
};
