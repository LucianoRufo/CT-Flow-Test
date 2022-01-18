function IsFromEpic(params) {
  params.toString().startsWith("pepito/epic-");
}

module.exports = {
  IsFromEpic: IsFromEpic,
};
