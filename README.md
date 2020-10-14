# vue3-study

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

// 网络请求库
yarn add axios -S
yarn add qs -S

// mock 数据
yarn add mockjs -D
yarn add @types/mockjs -D

// 加密库
yarn add crypto-js -S

yarn add moment -S

yarn add lodash -D

## Store

mapState 后可以使用 this

computed: {
localComputed () {
return this.count + 10;
},
...mapState({
count: "count"
}

// state 名称和计算属性一样可使用数组
computed: mapState([ // 数组
"count"
])
