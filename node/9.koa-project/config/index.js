module.exports = {
  /** mongoDB 链接地址 */
  mongoDBUrl: 'mongodb://127.0.0.1:27017/nodeTest',
  /** json-web-token 私钥 */
  jwtPrivateKey: '8441be5e-bd98-4a61-9395-ff7315334c28',
  redisConfig: {
    path: '127.0.0.1',
    port: 6379,
    options: { password: '12345' },
  },
}
