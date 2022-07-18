---
title: Chrome 101新特性：fetchpriority
date: 2022-06-12 10:10:00
tags: 计算机网络
categories: 计算机网络
---

## 背景

最近发现Chrome 101版本更新了一个新特性，所以顺便学习总结了一下。

预加载可以在网页全部加载之前，对一些主要内容进行加载，以提供给用户更好的体验，减少等待的时间。但是，一些情况下，我们还需要对预加载的资源优先级进行进一步的划分。预加载对资源优先级的设置并不能满足，于是有了可以对资源优先级进行补充的fetchpriority。

## 为了解决什么问题

- 影响资源获取的优先级；
- 补充预加载后的资源加载顺序；
优先级指示资源对浏览器的相对优先级，它们可以实现最佳加载并改善Web用户体验。

## 浏览器中的资源优先级

当浏览器开始解析网页，并开始下载图片、js 以及 css 等资源的时候，浏览器会为每个资源分配一个代表资源下载优先级的 fetch priority 标志。
而资源下载的顺序就取决于这个优先级标志，这个优先级标志的计算逻辑会受很多因素的影响：
- CSS、字体、脚本、图像和第三方资源分配了不同的优先级。
- 引用文档中资源的位置或顺序也会影响资源的优先级。
- 预加载资源提示有助于浏览器更快地发现资源，从而在文档加载之前加载资源并影响优先级。
- 脚本设置async或defer影响优先级计算。
考虑以上因素，下表统计了Chrome中大多数资源的优先级和顺序：

{% asset_img 浏览器资源加载顺序.png %}

浏览器按照资源被发现的顺序下载资源，可以在 DevTools Network 下看到分配给不同资源的优先级：

{% asset_img 1.png %}
{% asset_img 2.png %}

但是并不是所有情况下默认的下载优先级都是最佳的。

## 什么时候需要优先提示

技术应用场景：
- 同时有几个首屏图像，但它们不需要具有相同的优先级。例如，在图像轮播中，只有第一个可见图像需要比其他图像更高的优先级；
- 可见区域的图像为低优先级，但布局完成后，Chrome发现它们在视图中，会自动提高它们的优先级。这时候页面会增加加载图像的延迟，使用优先级提示可以让图像以高优先级开始，并更早地开始加载。
- 将脚本声明为async或defer告诉浏览器异步加载它们，这时脚本也被分配了“低”优先级。但是希望在确保异步下载的同时提高它们的优先级，特别是对于任何对用户体验至关重要的脚本。
- 浏览器为 CSS 和字体分配了高优先级，但所有这些资源可能并不同样重要，可以使用优先级提示来降低其中一些资源的优先级。
- 使用fetch()异步获取资源或数据时，浏览器为 Fetch 分配了高优先级。在某些情况下，我们可能不希望以高优先级执行所有请求，而是使用不同的优先级提示。例如，后台 API 调用可以标记为低优先级，交互式 API 调用可以标记为高优先级。
- 在资源争夺可用网络带宽的环境中，优先级带来的显着收益将更加相关。

## 如何使用fetchpriority属性

fetchpriority 属性可以指定三个值：
- high：你认为该资源具有高优先级，并希望浏览器对其进行优先级排序；
- low：你认为该资源的优先级较低，并希望浏览器降低其优先级；
- auto：采用浏览器的默认优先级；

使用示例：

```html
<!-- We don't want a high priority for this above-the-fold image -->
<img src="/images/in_viewport_but_not_important.svg" fetchpriority="low" alt="I'm an unimportant image!">

<!-- We want to initiate an early fetch for a resource, but also deprioritize it -->
<link rel="preload" href="/js/script.js" as="script" fetchpriority="low">

<script>
  fetch('https://example.com/', {priority: 'low'})
  .then(data => {
    // Trigger a low priority fetch
  });
</script>

<!-- The third-party contents of this iframe can load with a low priority -->
<iframe src="https://example.com" width="600" height="400" fetchpriority="low"></iframe>
```

实际应用：提升 LCP 图像的优先级

比如，在 Google Flights 这个网页中，影响它 LCP 指标的主要原因是它的背景图片，现在我们用 fetchpriority 属性提升它加载的优先级：

```html
<img src="lcp-image.jpg" fetchpriority="high">
```

当优先级设置为高时，LCP从2.6秒提高到1.9秒

<video id="video" controls="" preload="none" poster="封面">
      <source id="mp4" src="4.mp4" type="video/mp4">
</videos>

### 降低首屏图片的优先级
使用 fetchpriority 属性降低可能不重要的首屏图片的优先级，比如轮播图中后面的图片：

```html
<ul class="carousel">
  <img src="img/carousel-1.jpg" fetchpriority="high">
  <img src="img/carousel-2.jpg" fetchpriority="low">
  <img src="img/carousel-3.jpg" fetchpriority="low">
  <img src="img/carousel-4.jpg" fetchpriority="low">
</ul>
```

### 降低预加载资源的优先级

想要阻止预加载资源和其他关键资源的竞争，可以降低其优先级：

```html
<!-- Lower priority only for non-critical preloaded scripts -->
<link rel="preload" as="script" href="critical-script.js">
<link rel="preload" href="/js/script.js" as="script" fetchpriority="low">

<!-- Preload CSS without blocking other resources -->
<link rel="preload" as="style" href="theme.css" fetchpriority="low" onload="this.rel='stylesheet'">
```

### 调整脚本的优先级

如果页面上有一些必要的交互脚本，但不需要阻塞其他资源，可以把它们标记为具有高优先级，同时异步加载它们：

```html
<script src="async_but_important.js" async importance="high"></script>
```

如果脚本依赖于特定的 DOM 节点，则它们不能被标记为异步加载。但是如果它们不是首屏渲染必备的，可以降低它们的优先级：

```html
<script src="blocking_but_unimportant.js" importance="low"></script>
```

### 调整fetch的优先级

浏览器默认会以高优先级执行 fetch 请求，可以降低不太关键的数据请求的优先级：

```js
// Important validation data (high by default)
let authenticate = await fetch('/user');

// Less important content data (suggested low)
let suggestedContent = await fetch('/content/suggested', {priority: 'low'});
```

## 注意事项

优先级提示可以提高特定用例中的性能，有一些事情需要注意：
- fetchpriority属性是一个提示，而不是一个指令。浏览器会尽量尊重开发者的偏好，如果发生冲突，浏览器也可能会根据需要应用其对资源优先级的偏好。
- 优先级提示不应与预加载混淆，它们都是不同的，因为：
  - 预加载是强制获取而不是提示。
  - 预加载更容易被观察和测量。
- 优先级提示可以通过增加优先级的粒度来补充预加载。如果已经在页面顶部为 LCP 图像指定了预加载，那么“高”优先级提示可能不会带来显着的收益。但是，如果预加载是在其他不太重要的资源之后，那么高优先级的提示可以提高LCP。如果关键图像是 CSS 背景图像，则应使用fetchpriority = "high"。
- CDN没有统一实现 HTTP/2 优先级。

## 补充说明

### importance

优先提示首先在 2018 年作为原始试验在 Chrome 中进行了试验，然后在 2021 年再次使用该importance属性。作为 Web 标准流程的一部分，在HTML中该属性已更改为fetchpriority，JavaScript中为priority 。

### fetchpriority 浏览器兼容性

目前，优先级提示仅在基于 Chromium 的浏览器中可用。其他浏览器引擎或早期版本的 Chromium 浏览器将忽略该属性并使用其默认的优先级启发式。

{% asset_img 3.png %}