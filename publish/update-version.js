/*
 * @Description:
 * @Date: 2022-07-10 02:01:57
 */

const { writeFileSync } = require('fs');
const npmName = process.argv[2];

const version = require('./version.json');
if (version[npmName]) {
  const [v1, v2, v3] = version[npmName].split('.');
  version[npmName] = [v1, v2, +v3 + 1].join('.');
  console.log(`${npmName}-${version[npmName]}`);
  writeFileSync('publish/version.json', JSON.stringify(version, null, 2));
}
