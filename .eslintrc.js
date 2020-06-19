module.exports = {
  root: true,
  env: {
      node: true
  },
  extends: [
      'plugin:vue/essential',
  ],
  parserOptions: {
      parser: 'babel-eslint'
  },
  rules: {
      'lintOnSave': 'off',
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'indent': 'off',
      'no-unused-vars': 'off',
      // 关闭语句强制分号结尾
      "semi": [0],
      "eol-last": 0, //文件以单一的换行符结束
  },
}