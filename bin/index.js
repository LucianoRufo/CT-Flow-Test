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
const { storyStart, storyFinish, storyHandleError } = require("./story");
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
    command: "story",
    describe: "Manage your story branches.",
    builder: (yargs) => {
      yargs
        .command({
          command: "start <jiraId> <name>",
          describe: "Starts a story branch based on an indicated epic.",
          handler: storyStart,
        })
        .command({
          command: "finish",
          describe:
            "Merges the indicated story branch to develop and deletes it.",
          handler: storyFinish,
        });
    },
    handler: storyHandleError,
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
          handler: async (argv) => {
            if (argv.name && argv.jiraId) {
              console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
              shell.exec(
                `git checkout -b hotfix/CTDEV-${argv.jiraId}_${argv.name} master`
              );

              console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
              console.log(
                "\x1b[33m",
                `\ngit checkout -b hotfix/CTDEV-${argv.jiraId}_${argv.name} master`
              );
            }
          },
        })
        .command({
          command: "publish <jiraId> <name>",
          describe: "Pushes the hotfix branch to origin.",
          handler: async (argv) => {
            if (argv.name && argv.jiraId) {
              console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
              shell.exec(
                `git checkout hotfix/CTDEV-${argv.jiraId}_${argv.name}`
              );
              shell.exec(
                `git push origin hotfix/CTDEV-${argv.jiraId}_${argv.name}`
              );

              console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
              console.log(
                "\x1b[33m",
                `\ngit checkout hotfix/CTDEV-${argv.jiraId}_${argv.name}`
              );
              console.log(
                "\x1b[33m",
                `git push origin hotfix/CTDEV-${argv.jiraId}_${argv.name}`
              );
            }
          },
        })
        .command({
          command: "finish [jiraId] [name]",
          describe:
            "Merges the indicated hotfix branch to master and deletes it.",
          handler: async (argv) => {
            if (argv.name && argv.jiraId) {
              console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
              shell.exec(`git checkout master`);
              shell.exec(
                `git merge --no-ff hotfix/CTDEV-${argv.jiraId}_${argv.name}`
              );
              shell.exec(
                `git branch -d hotfix/CTDEV-${argv.jiraId}_${argv.name}`
              );

              console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
              console.log("\x1b[33m", `\ngit checkout master`);
              console.log(
                "\x1b[33m",
                `git merge --no-ff hotfix/CTDEV-${argv.jiraId}_${argv.name}`
              );
              console.log(
                "\x1b[33m",
                `git branch -d hotfix/CTDEV-${argv.jiraId}_${argv.name}`
              );
            } else if (!argv.name && !argv.jiraId) {
              console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:\n");
              var output = shell.exec(`git branch --show-current`);

              if (output.toString().startsWith("hotfix/CTDEV-", 0)) {
                shell.exec(`git checkout master`);
                shell.exec(`git merge --no-ff ${output}`);
                shell.exec(`git branch -d ${output}`);
                console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
                console.log("\x1b[33m", `\ngit branch --show-current`);
                console.log("\x1b[33m", `\ngit checkout master`);
                console.log("\x1b[33m", `git merge --no-ff ${output}`);
                console.log("\x1b[33m", `git branch -d ${output}`);
              } else {
                console.log(
                  "\x1b[31m",
                  "\nERROR: YOU ARE NOT ON A HOTFIX BRANCH"
                );
              }
            }
          },
        });
    },
    handler: async (argv) => {
      console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
      console.log("\x1b[37m", "\nusage: ctflow hotfix start");
      console.log("or: ctflow hotfix finish");
      console.log("or: ctflow hotfix publish");
      console.log("\nManage your hotfix branches.");
      console.log("For more specific help type the command followed by --help");
    },
  })
  .command({
    command: "release",
    describe: "Manage your release branches. #TODO",
  })
  .epilogue("Try 'ctflow <subcommand> --help' for details.")
  .help(true).argv;
