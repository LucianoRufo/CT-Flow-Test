const {
  FinishHotFixByIdAndName,
  CreateHotFixAndPushItToRemote,
  FinishCurrentHotfix,
} = require("./helpers/hotfixFunctions");
const { HandleErrorDisplay } = require("./helpers/hotfixDisplayer");

async function start(argv) {
  if (argv.name && argv.jiraId) {
    CreateHotFixAndPushItToRemote(argv);
  }
}

async function finish(argv) {
  const { name, jiraId } = argv;
  if (name && jiraId) {
    FinishHotFixByIdAndName(argv);
  } else if (!name && !jiraId) {
    FinishCurrentHotfix(argv);
  }
}

async function handleError() {
  HandleErrorDisplay();
}

module.exports = {
  hotfixStart: start,
  hotfixFinish: finish,
  hotfixHandleError: handleError,
};
