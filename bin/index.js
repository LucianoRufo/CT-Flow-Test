#! /usr/bin/env node
const yargs = require("yargs");
const init = require("./init");
const {
  epicStart,
  epicPublish,
  epicFinish,
  epicHandleError,
} = require("./epic");

const { pepitoStart, pepitoFinish, pepitoHandleError } = require("./pepito");

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
          command: "start <jiraId>",
          describe: "Starts an epic branch based on develop.",
          handler: epicStart,
        })
        .command({
          command: "finish [jiraId]",
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
          command: "finish [name]",
          describe:
            "Merges the indicated pepito branch to develop and deletes it.",
          handler: pepitoFinish,
        });
    },
    handler: pepitoHandleError,
  })
  .command({
    command: "hotfix",
    describe: "Manage your hotfix branches. #TODO",
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
