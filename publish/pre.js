/*
 * @Description:
 * @Date: 2022-07-10 01:35:07
 */
const { writeFileSync } = require('fs');
const version = require('./version.json');
const npmName = process.argv[2];

if (version[npmName]) {
  const package = require('../package.json');
  if (npmName == 'fishdesign-ui') {
    // 正式包更新package.json的版本信息
    package.version = version[npmName];
  }
  writeFileSync('package-copy.json', JSON.stringify(package, null, 2));
  package.name = npmName;
  package.version = version[npmName];
  delete package.scripts;
  writeFileSync('package.json', JSON.stringify(package, null, 2));
} else {
  console.warn(`不存在${npmName}版本信息`);
}
