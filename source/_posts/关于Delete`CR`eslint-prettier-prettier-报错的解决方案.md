---
title: 关于Delete`CR`eslint(prettier/prettier) 报错的解决方案
date: 2020-06-06 20:47:09
tags: JavaScript
categories: JavaScript
---

## 问题的提出

由于之前是一直使用 `mac` 笔记本开发，突然使用 `windows` 开发，发现拉完代码之后， 发现在`npm run dev` 运行代码之后。发现有如下的问题

```javascript
Delete `CR`eslint(prettier/prettier)
```

 <!--more-->

{% asset_img 1.png %}

## 问题的根源

出现的问题的原因到底是什么呢？

根据调查发现出问题 : **windows下和linux下的文本文件的换行符不一致。**

- `Windows`在换行的时候，同时使用了回车符`CR(carriage-return character)和换行符LF(linefeed character)`
- 而`Mac`和`Linux`系统，仅仅使用了换行符`LF`
- 老版本的`Mac`系统使用的是回车符`CR`

表格解释如下：

| **Windows** | **Linux/Mac** | **Old Mac(pre-OSX)** |
| ----------- | ------------- | -------------------- |
| CRLF        | LF            | CR                   |
| '\n\r'      | '\n'          | '\r'                 |

因此，文本文件在不同系统下创建和使用时就会出现不兼容的问题。

所以出现上面的报错是因为我的同事是在mac环境下提交的代码。文件默认是以LF结尾的。

当我使用 `Windows` 电脑`git clone`代码的时候， 若我的`autocrlf`(在`windows`下安装`git`，该选项默认为`true`)为true，那么文件每行会被自动转成以CRLF结尾，若对文件不做任何修改，pre-commit执行eslint的时候就会提示你删除CR。

## 问题的解决

下面是上网查到的各种解决办法以及他们的优缺点。

### Crtl+S保存文件

按Crtl+S保存当前报错文件，eslint错误消失，但是Git暂存区多了个文件改动记录，对比Working tree没发现任何不同。

缺点：你不可能一一保存所有文件，麻烦，还要commit，多余。

### yarn run lint --fix

比上面省事，eslint错误消失，但暂存区多了n个文件改动记录，对比Working tree也没发现任何不同。

缺点：需要commit所有文件，多余。

[参考的资料："error Delete `⏎` prettier/prettier" in .vue files](https://github.com/prettier/eslint-plugin-prettier/issues/114)

### 配置.prettierrc 文件

在项目的根目录的`.prettierrc`文件中写入即可。其实就是不让prettier检测文件每行结束的格式.

```javascript
"endOfLine": "auto"
```

缺点：不能兼容跨平台开发，从前端工程化上讲没有做到尽善尽美。

[参考的资料：Why do I keep getting Delete 'cr' [prettier/prettier]?](https://stackoverflow.com/questions/53516594/why-do-i-keep-getting-delete-cr-prettier-prettier)

### core.autocrlf配置

使用git 的一个配置属性： core.autocrlf 

* Git 可以在你提交的时候自动的把行结束符CRLF转换成LF，而在签出代码时把LF转换成CRLF。用`core.autocrlf`来打开此项功能。如果是在Windows 系统上，把它设置为true。这样当签出代码时。LF会被转换成CRLF。

  ```javascript
  $ git config --global core.autocrlf true
  ```

* mac 系统使用LF作为行结束符， 因此你不想Git在签出文件时进行自动的转换；当一个CRLF为行结束符的文件不小心被引入时你想修正，把core.autocrlf 设置为input 来告诉Git 在提交的时候把CRLF 转成LF。签出时不转换；

  ```javascript
  $ git config --global core.autocrlf input
  ```

  这样会在Windows系统上的签出文件中保留CRLF，会在Mac和Linux系统上，包括仓库中保留LF。

* 如果你是Windows程序员，且正在开发仅运行在Windows上的项目，可以设置false取消此功能，把回车符记录在库中：

  ```
  $ git config --global core.autocrlf false
  ```

  

## 总结

遇到问题的时候查找了很多的资料。但是结局的办法都不是很尽美 如方法1，方法 2，方法 3，都存在一定的缺点。 最后一个解决办法才是从灵魂上解决了问题。 所以在解决的问题还是追其根源。从根本上解决问题。