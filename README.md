<p align='center'><img width="100px" style="display:block; margin:0 auto;" src="https://cdn.jsdelivr.net/gh/daidr/truth-table@main/public/icons/android-chrome-192x192.png" alt="Truth Table">
</p>

# 真值表

> 一个心血来潮的小项目

示例地址：[https://tb.daidr.me](https://tb.daidr.me)

## 功能

通过给定的逻辑表达式来生成真值表，并且能够给出中间过程。lexer与parser的部分使用antlr编写。

## 一些说明

变元应由字母和数字组成，支持单个字符（如`p` `q`）或多个字符（如`ab` `ac` `a1` `a2`）
大小写不一致的变元被视为不同的变元，如 `A` `a` 为两个不同的变元。
必须由字母开头，如 `a5` `b6` 合法，而 `5a` `5` 不合法

目前支持下面这些逻辑：

* 合取 (∧) (conjunction)
* 非 (¬) (negation)
* 析取 (∨) (disjunction)
* 蕴涵 (→) (implication)
* 等值于 (⇔) (equivalence)

由于这些符号普遍较难输入，所以提供了一些常见符号用于代换，使用的时候软件会自动帮你将下面这些符号替换为对应的逻辑符号：

* 合取 `&` `^`
* 非 `！` `!`
* 析取 `|`
* 蕴涵 `>` `》`
* 等值于 `=`

运算优先级(由高到低递减)： `¬` `∧` `∨` `→` `⇔`，其中连续的蕴涵运算由右向左合并（例如 `a→b→c` 等价于 `a→(b→c)`）

可以使用括号修改运算的优先级。

> 由于这个小项目是一天时间糊出来的，代码写的非常乱，之后有时间再整理吧🥱


## 开发

### 安装依赖

```
pnpm
```

or 

```
yarn
```

### 启动项目

```
pnpm dev
```

or

```
yarn dev
```

vite调试服务会在 [http://localhost:4000](http://localhost:4000) 启动

### 构建

```
pnpm build
```

or

```
yarn build
```

构建的结果会输出到 `dist` 目录下

## 为我投票

<a href="https://www.producthunt.com/posts/truth-table?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-truth&#0045;table" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=349421&theme=light" alt="Truth&#0032;Table - Generate&#0032;corresponding&#0032;truth&#0032;table&#0032;from&#0032;logical&#0032;expression | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
