#! /usr/bin/env node
const { exec } = require("child_process");
const yargs = require("yargs");

const usage = "\nUsage: git ctflow <subcommand>";
var shell = require("shelljs");

const options = yargs
  .usage(usage)
  .command({
    command: "init",
    describe: "Initialize a new git repo with CT-FLOW support.",
    handler: ({ flag }) => {
      console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
      shell.exec("git init");
      shell.exec(
        `git commit --allow-empty -m "Initializing ctflow enabled repo...."`
      );
      shell.exec("git checkout -b develop main");
      console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
      console.log("\x1b[33m", "git init");
      console.log(
        "\x1b[33m",
        "git commit --allow-empty -m Initializing ct-flow...."
      );
      console.log("\x1b[33m", "git checkout -b develop master");
    },
  })
  .command({
    command: "epic",
    describe: "Manage your epic branches",
    builder: (yargs) => {
      yargs
        .command({
          command: "start <epicName>",
          describe: "Starts an epic branch based on develop.",
          handler: async (argv) => {
            if (argv.epicName) {
              console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
              shell.exec(`git checkout -b epic/${argv.epicName} develop`);
              console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
              console.log(
                "\x1b[33m",
                `\ngit checkout -b epic/${argv.epicName} develop`
              );
            }
          },
        })
        .command({
          command: "publish <epicName>",
          describe: "Pushes the epic branch to origin.",
          handler: async (argv) => {
            if (argv.epicName) {
              console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
              shell.exec(`git checkout epic/${argv.epicName}`);
              shell.exec(`git push origin epic/${argv.epicName}`);
              console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
              console.log("\x1b[33m", `\ngit checkout epic/${argv.epicName}`);
              console.log("\x1b[33m", `git push origin epic/${argv.epicName}`);
            }
          },
        })
        .command({
          command: "finish <epicName>",
          describe:
            "Merges the indicated epic branch to develop and deletes it.",
          handler: async (argv) => {
            if (argv.epicName) {
              console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
              shell.exec(`git checkout develop`);
              shell.exec(`git merge --no-ff epic/${argv.epicName}`);
              shell.exec(`git branch -d epic/${argv.epicName}`);
              console.log("\x1b[36m%s\x1b[0m", "\nCOMMANDS RUN:");
              console.log("\x1b[33m", `\ngit checkout develop`);
              console.log(
                "\x1b[33m",
                `git merge --no-ff epic/${argv.epicName}`
              );
              console.log("\x1b[33m", `git branch -d epic/${argv.epicName}`);
            }
          },
        });
    },
    handler: async (argv) => {
      console.log("\x1b[31m", "\nERROR: NO SUBCOMMAND SPECIFIED");
      console.log("\x1b[37m", "\nusage: ctflow epic start");
      console.log("or: ctflow epic finish");
      console.log("or: ctflow epic publish");
      console.log("\nManage your epic branches.");
      console.log("For more specific help type the command followed by --help");
    },
  })
  .command({ command: "story", describe: "Manage your story branches. #TODO" })
  .command({
    command: "release",
    describe: "Manage your release branches. #TODO",
  })
  .command({ command: "bugfix", describe: "Manage your story branches. #TODO" })
  .command({
    command: "single",
    describe: "Manage your single branches. #TODO",
  })
  .command({
    command: "hotfix",
    describe: "Manage your hotfix branches. #TODO",
  })
  .epilogue("Try 'ctflow <subcommand> --help' for details.")
  .help(true).argv;
