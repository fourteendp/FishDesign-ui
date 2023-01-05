/*
 * @Description:
 * @Date: 2022-07-10 01:35:16
 */
const { writeFileSync, unlink } = require('fs');
const https = require('https');
const npmName = process.argv[2];
const axios = require('axios');

const getLogId = async npmName => {
  const { data } = await axios.put(
    `https://registry-direct.npmmirror.com/${npmName}/sync`,
    {
      sync_upstream: true
    }
  );
  const getRes = async () => {
    const {
      data: { syncDone }
    } = await axios.get(
      `https://registry-direct.npmmirror.com/${npmName}/sync/log/${data.logId}`
    );
    console.log(`${npmName}是否同步成功：${syncDone}`);
    if (!syncDone) {
      await new Promise(r => {
        setTimeout(r, 2000);
      });
      await getRes();
    }
  };
  await getRes();
};

const package = require('../package-copy.json');
package.name = 'fishdesign-ui';
writeFileSync('package.json', JSON.stringify(package, null, 2));
unlink('package-copy.json', () => {
  getLogId(npmName);
});
