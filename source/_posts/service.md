---
title: Vue2.x的生命周期详解
date: 2022-06-17 19:31:36
tags: JavaScript
categories: JavaScript
---

# 什么是service worker

一句话概括就是：独立于网页运行在浏览器后台的 js 脚本，可以用来监听页面的 fetch 事件并针对 request/response 进行资源缓存。

## 可以做什么？

- 本质上充当Web应用程序（服务器）与浏览器之间的代理服务器（可以拦截全站的请求，并作出相应的动作->由开发者指定的动作）
- 创建有效的离线体验（将一些不常更新的内容缓存在浏览器，提高访问体验）
- 可以访问cache和indexDB
- 支持推送
- 可以让开发者自己控制管理缓存的内容以及版本

## 注册
提前准备好一个js文件（sw.js），内容如下
```js
console.log('sw.js')
```

在html中进行service worker注册
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>service worker register demo</h1>
<script>
  window.onload = function () {
    navigator.serviceWorker.register('/sw.js')
  }
</script>
</body>
</html>
```
以上简单的代码就完成了service worker的注册。

## 监听fetch
将以下代码写入 sw.js 文件中，重新注册 service worker
```js
self.addEventListener('fetch', (event) => {
  console.log('event',event)
})
```

向html里面增加发送请求的代码，如下
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
<h1>service worker fetch event demo</h1>

<div>
    <button id="request">get user info</button>
    <pre id="pre"></pre>
</div>

<script>
  const request = document.getElementById('request')
  const pre = document.getElementById('pre')
  window.onload = function () {
    navigator.serviceWorker.register('/sw.js')
  }

  request.addEventListener('click', () => {
    axios.get('/api/user').then(response => {
      pre.innerHTML = JSON.stringify(response.data)
    })
  })
</script>
</body>
</html>
```

同时我们在本地起一个node服务，用于接收请求
```js
const express = require('express');
const app = express();

app.get('/sw.js', function (request, response) {
  response.sendFile(__dirname + '/sw.js');
});

app.get('/api/user', function (_, response) {
  response.json({
    username: 'xx',
    age: 18
  })
})

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

```
启动服务之后，点击button发送请求，可以看到控制台会打印event对象。

{% asset 3.png %}

在这个 request 对象中，咱们是能拿到 request 相关信息以及更多事件相关信息，根据这些信息咱们就能进行请求的改写及其他各种操作。

## 修改fetch返回值
fetch event 对象提供了 respondWith api 允许在 service worker 中修改 response。
```js
// 修改sw.js中的fetch处理
self.addEventListener('fetch',(event) => {
  if(event.request.url.endsWith('/api/user')){
    event.respondWith(new Response(JSON.stringify({
      username: '我固定了'
    })))
  }
})
```

**异步修改**
respondWith 还可以接受 Promise 实例用于异步返回 response，比如说在我们需要拦截并发送新的请求时需要等待 service worker 中新请求的数据返回又或者说其他场景。

以下模拟了，延迟 3s 后返回篡改的 response。
```js
function sleep(rtn, ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(rtn)
    }, ms)
  })
}

self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('/api/user')) {
    event.respondWith(
      sleep(
          new Response(JSON.stringify({
            username: '我固定了'
          })),
        3000
      ),
    )
  }
})
```







# 注意事项

## 支持service worker的浏览器
{% asset_img 1.png %}

## 支持https或本地开发

注册 service worker 需要使用到 navigator.serviceWorker api，但是会发现在使用 http 协议打开页面的时候该 api 变成了 undefined。

{% asset_img 2.png %}

这对开发调试的时候并不是太友好，所以在除了 https 的场景外，浏览器在 localhost 以及 127.0.0.1:port 这两个场景下保留了 navigator.serviceWorker api 方便开发阶段的 debug。
