#! /usr/bin/env node
const yargs = require("yargs");
const init = require("./init");
const shell = require("shelljs");

const { epicStart, epicFinish, epicHandleError } = require("./epic");
const { pepitoStart, pepitoFinish, pepitoHandleError } = require("./pepito");
const { hotfixStart, hotfixFinish, hotfixHandleError } = require("./hotfix");
const {
  releaseStart,
  releaseFinish,
  releaseHandleError,
} = require("./release");

const usage = "\nUsage: ctflow <subcommand>";

yargs
  .usage(usage)
  .scriptName("ctflow")
  .command({
    command: "init",
    describe: "Initialize a new git repo with CT-FLOW support.", // #TODO refactor and make CTDEV- prefix a custom setting, also be careful with master/main, should cover both scenarios
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
    describe: "Manage your hotfix branches. #WIP",
    builder: (yargs) => {
      yargs
        .command({
          command: "start <jiraId> <name>",
          describe: "Starts an hotfix branch based on master.",
          handler: hotfixStart,
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
    describe: "Manage your release branches. #WIP",
    builder: (yargs) => {
      yargs
        .command({
          command: "start <tag>",
          describe: "Starts an release branch based on master.",
          handler: releaseStart,
        })
        .command({
          command: "finish [tag]",
          describe:
            "Merges the indicated release branch to master and deletes it.",
          handler: releaseFinish,
        });
    },
    handler: releaseHandleError,
  })
  .command({
    command: "doc",
    describe: "Opens the ctflow doc",
    handler: () => {
      console.log("doc");
      shell.exec(`start ./images/CT_FLOW.jpg`);
    },
  })
  .epilogue("Try 'ctflow <subcommand> --help' for details.")
  .help(true).argv;
