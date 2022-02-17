const glob = require("glob");

console.log(toObject(glob.sync("src/assets/style/**/*.scss")));

function toObject(paths) {
  const ret = {};

  paths.forEach(function (path) {
    if (/\/\_.*\.scss/.test(path)) return;
    ret[path.replace(".scss", "")] = path;
  });

  return ret;
}
