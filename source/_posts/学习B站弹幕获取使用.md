---
title: 学习B站弹幕获取使用
date: 2022-09-13 16:17:20
tags: JavaScript
categories: JavaScript
---

# 获取弹幕

使用的库是https://github.com/HuyaAuto/bilibili-live-ws。

```JavaScript
const { LiveWS, LiveTCP, KeepLiveWS, KeepLiveTCP } = require('bilibili-live-ws')

const live = new LiveTCP(21495945) // 【直播】TI11预选赛东南亚赛区，随意填

live.on('open', () => console.log('Connection is established'))

live.on('live', () => {

  live.on('DANMU_MSG', (data) => {
    console.log(data)
  })
})
```

弹幕格式

```JavaScript
{
  cmd: 'DANMU_MSG',
  info: [
    [
      0,             1,
      25,            16777215,
      1663056337999, 1663035138,
      0,             '47b3c197',
      0,             0,
      0,             '',
      0,             '{}',
      '{}',          [Object],
      [Object]
    ],
    '这dota才接地气嘛',
    [ 30876305, '极度到死', 0, 0, 0, 10000, 1, '' ],
    [],
    [ 23, 0, 5805790, '>50000', 0 ],
    [ '', '' ],
    0,
    0,
    null,
    { ts: 1663056337, ct: '7AD0E4C2' },
    0,
    0,
    null,
    null,
    0,
    7
  ]
}
```

如果要获取其他类型信息，参考https://www.bilibili.com/read/cv13055247/。

# robotjs

官网：https://robotjs.io/docs/examples

获取到用户弹幕之后，做一下正则匹配，配合robotjs完成一些鼠标键盘的自动操作。后续结合游戏补充demo...
