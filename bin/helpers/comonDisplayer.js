//#TODO: make this to receive a function as call back with te comands runned to format it like:
//       Comands run:
//           comand a
//           comand b
//           comand c
//       Output:
//           result from the function that has been runed (usually git feedback)
function BaseMessage() {
  console.log("\x1b[36m%s\x1b[0m", "OUTPUT:\n");
  console.log("\x1b[36m%s\x1b[0m", "COMMANDS RUN:");
}

function CurrentBranchMessage(currentBranch) {
  console.log("\x1b[36m%s\x1b[0m", "CURRENT BRANCH:");
  console.log(currentBranch)
}

function EpicFinishWrongBranchError() {
  console.log("\x1b[31m", "\nERROR: YOU ARE NOT ON AN EPIC BRANCH");
}

module.exports = {
  BaseMessage: BaseMessage,
  CurrentBranchMessage: CurrentBranchMessage,
  EpicFinishWrongBranchError: EpicFinishWrongBranchError,
};
