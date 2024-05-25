module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "unused-imports",
    "prettier",
    "unicorn",
    "import",
  ],
  extends: [
    "plugin:prettier/recommended", 
    "plugin:import/recommended",
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": ["error", { "ignoreRestSiblings": true }],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin", // Built-in types
          "external", // external types
          "internal",
          ["sibling", "parent"], // Then sibling and parent types. They can be mingled together
          "index", // Then the index file
          "object" // Then the rest: internal and external type
        ],
        "pathGroups": [
          {
            "pattern": "@arcave/**",
            "group": "internal",
          },
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc", // sort in ascending order. Options: ["ignore", "asc", "desc"]
          "caseInsensitive": true // ignore case. Options: [true, false]
        }
      }
    ],
  },
  ignorePatterns: ["node_modules"],
  settings: {
    "import/resolver": {
      // typescript: {
      //   directory: "/apps/web/src/tsconfig.json"
      // },
      // "node": {
      //   "paths": ["/apps/web/src"],
      //   "extensions": ["*", ".js", ".jsx", ".ts", ".tsx"]
      // },
      "alias": {
        map: [
          ["@arcave", "./src"],
        ],
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
      }
    },
  }
};
