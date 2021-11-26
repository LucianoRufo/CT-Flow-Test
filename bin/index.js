#! /usr/bin/env node
const yargs = require("yargs");

const usage = "\nUsage: git ctflow <subcommand>";

const options = yargs
  .usage(usage)
  .option("epic", {
    describe: "Manage your epic branches. #TODO",
    demandOption: false,
  })
  .option("story", {
    describe: "Manage your story branches. #TODO",
    demandOption: false,
  })
  .option("release", {
    describe: "Manage your release branches. #TODO",
    demandOption: false,
  })
  .option("bugfix", {
    describe: "Manage your story branches. #TODO",
    demandOption: false,
  })
  .option("single", {
    describe: "Manage your single branches. #TODO",
    demandOption: false,
  })
  .option("hotfix", {
    describe: "Manage your hotfix branches. #TODO",
    demandOption: false,
  })
  .epilogue("Try 'git ctflow <subcommand> help' for details.")
  .help(true).argv;
