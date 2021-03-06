// "lint-staged": {
//     "src/**/*.{js,jsx}": [
//         "prettier --tab-width 4 --write",
//         "eslint --fix",
//         "git add"
//     ]
//   }

// 如果想要跳过 Lint 程序，可以使用 git commit --no-verify 进行提交。
// npx -p node@6 npm run test

module.exports = {
  parser:  '@typescript-eslint/parser',
  // parser: 'typescript-eslint-parser',
  // parser:  'babel-eslint',
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'standard', //使用standard做代码规范
    'react-app',
    "prettier",
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值
    "jQuery": false,
    "$": false,
    "window": true
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'typescript',
    'prettier'
  ],
  'rules': {
    "prettier/prettier": "error",
    'no-tabs': 0,
    "no-undef": 0,
    'no-mixed-spaces-and-tabs': 0,
    'indent': ["off", "tab"],
    'no-trailing-spaces': 0,
    'no-irregular-whitespace': 0,

    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    'eqeqeq': [
      'error',
      'always',
      {
          null: 'ignore'
      }
    ],
    // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
    'typescript/class-name-casing': 'error'
  }
}
