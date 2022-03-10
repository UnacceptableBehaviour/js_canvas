// algos support module
// helpers
const cl = (str) => {
  console.log(str);
};

function algoInfo() {
  cl('[algos] Hello!');
};
// use export built in to export interface - shortcut for module.export
exports.algoInfo = algoInfo;

cl('FROM MODULE: algos_sftest');
