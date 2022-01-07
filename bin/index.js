#! /usr/bin/env node
const yargs = require("yargs");
const init = require("./init");
const {
  epicStart,
  epicPublish,
  epicFinish,
  epicHandleError,
} = require("./epic");

var shell = require("shelljs");
const { pepitoStart, pepitoFinish, pepitoHandleError } = require("./pepito");
const {
  bugfixStart,
  bugfixPublish,
  bugfixFinish,
  bugfixHandleError,
} = require("./bugfix");
const {
  singleHandleError,
  singleFinish,
  singlePublish,
  singleStart,
} = require("./single");
const {
  hotfixStart,
  hotfixPublish,
  hotfixFinish,
  hotfixHandleError,
} = require("./hotfix");
const usage = "\nUsage: ctflow <subcommand>";

const options = yargs
  .usage(usage)
  .scriptName("ctflow")
  .command({
    command: "init",
    describe: "Initialize a new git repo with CT-FLOW support.",
    handler: init,
  })
  .command({
    command: "epic",
    describe: "Manage your epic branches",
    builder: (yargs) => {
      yargs
        .command({
          command: "start <jiraId> <name>",
          describe: "Starts an epic branch based on develop.",
          handler: epicStart,
        })
        .command({
          command: "publish <jiraId> <name>",
          describe: "Pushes the epic branch to origin.",
          handler: epicPublish,
        })
        .command({
          command: "finish [jiraId] [name]",
          describe:
            "Merges the indicated epic branch to develop and deletes it.",
          handler: epicFinish,
        });
    },
    handler: epicHandleError,
  })
  .command({
    command: "pepito",
    describe: "Manage your pepito branches.",
    builder: (yargs) => {
      yargs
        .command({
          command: "start <jiraId> <name>",
          describe:
            "Starts a pepito branch based on an indicated epic or a single pepito from develop",
          handler: pepitoStart,
        })
        .option("e", {
          alias: "epic",
          describe: "Indicates that the pepito starts from an epic branch.",
          default: false,
          type: "boolean",
        })
        .command({
          command: "finish",
          describe:
            "Merges the indicated pepito branch to develop and deletes it.",
          handler: pepitoFinish,
        });
    },
    handler: pepitoHandleError,
  })
  .command({
    command: "bugfix",
    describe: "Manage your bugfix branches.",
    builder: (yargs) => {
      yargs
        .command({
          command: "start <jiraId> <name>",
          describe: "Starts an bugfix branch based on develop.",
          handler: bugfixStart,
        })
        .command({
          command: "publish <jiraId> <name>",
          describe: "Pushes the bugfix branch to origin.",
          handler: bugfixPublish,
        })
        .command({
          command: "finish [jiraId] [name]",
          describe:
            "Merges the indicated bugfix branch to develop and deletes it.",
          handler: bugfixFinish,
        });
    },
    handler: bugfixHandleError,
  })
  .command({
    command: "single",
    describe: "Manage your single branches.",
    builder: (yargs) => {
      yargs
        .command({
          command: "start <jiraId> <name>",
          describe: "Starts an single branch based on develop.",
          handler: singleStart,
        })
        .command({
          command: "publish <jiraId> <name>",
          describe: "Pushes the single branch to origin.",
          handler: singlePublish,
        })
        .command({
          command: "finish [jiraId] [name]",
          describe:
            "Merges the indicated single branch to develop and deletes it.",
          handler: singleFinish,
        });
    },
    handler: singleHandleError,
  })
  .command({
    command: "hotfix",
    describe: "Manage your hotfix branches.",
    builder: (yargs) => {
      yargs
        .command({
          command: "start <jiraId> <name>",
          describe: "Starts an hotfix branch based on master.",
          handler: hotfixStart,
        })
        .command({
          command: "publish <jiraId> <name>",
          describe: "Pushes the hotfix branch to origin.",
          handler: hotfixPublish,
        })
        .command({
          command: "finish [jiraId] [name]",
          describe:
            "Merges the indicated hotfix branch to master and deletes it.",
          handler: hotfixFinish,
        });
    },
    handler: hotfixHandleError,
  })
  .command({
    command: "release",
    describe: "Manage your release branches. #TODO",
  })
  .epilogue("Try 'ctflow <subcommand> --help' for details.")
  .help(true).argv;
