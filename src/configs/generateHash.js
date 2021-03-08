/* eslint-disable no-plusplus */
class GenerateHash {
  hash() {
    const length = 8;

    const charset = process.env.GENERATE;
    let newHash = '';

    for (let i = 0, n = charset.length; i < length; ++i) {
      newHash += charset.charAt(Math.floor(Math.random() * n));
    }
    return newHash;
  }
}
export default new GenerateHash();
