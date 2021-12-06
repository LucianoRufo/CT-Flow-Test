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
      shell.exec("git init");
      shell.exec(
        `git commit --allow-empty -m "Initializing ctflow enabled repo...."`
      );
      shell.exec("git checkout -b develop main");
    },
  })
  .command({
    command: "epic",
    describe: "Manage your epic branches #WIP",
    builder: (yargs) => {
      yargs
        .command({
          command: "start",
          describe: "Subcommand for starting an epic",
          handler: console.log("start"),
        })
        .command({
          command: "publish",
          handler: console.log("publish"),
          describe: "Subcommand for publishing epic",
        })
        .command({
          command: "finish",
          handler: console.log("finish"),
          describe: "Subcommand for finishing an epic",
        });
    },
    handler: async (argv) => {
      console.log(argv);

      if (argv.start) {
        console.log("start");
      }
      if (argv.publish) {
        console.log("publish");
      }
      if (argv.finish) {
        console.log("finish");
      }
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
  .epilogue("Try 'git ctflow <subcommand> help' for details.")
  .help(true).argv;
