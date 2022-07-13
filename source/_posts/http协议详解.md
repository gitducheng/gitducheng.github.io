---
title: http协议详解
date: 2019-09-02 11:52:52
tags: 计算机网络
categories: 计算机网络
---

在讲`http`协议之前， 需要先了解一下基础的计算机网络相关知识。

# 计算机网络体系结构

计算机网络体系结构是**计算机网络的各层** 和 **其协议**的集合。

在计算机网络的基本概念中，分层次的体系结构是最基本的。

## 分层

相互通信的两个计算机系统必须高度协调工作才行，而这种`协调`是相当复杂的。为了设计出这样复杂的计算机网络，最初提出了分层的方法。**分层**可将庞大的而复杂的问题转化为若干较小的局部问题，而这些较小的局部问题比较容易研究和处理。

计算机网络体系结构有三种体系结构：

- `OSI体系结构`: 概念清楚，理念完整。但是复杂不实用
- `TCP/IP体系结构`：含了一系列构成互联网基础的协议，是`Internet`的核心协议。被广泛的使用。
- `五层体系结构`：融合了`OSL` 与`TCP/IP`的体系结构， 主要的目的是为了学习，讲解计算机原理。

{% asset_img 1.png %}

## 协议

在计算机网络中药做到有条不絮的交换数据，就必须遵守一些事先约定好的规则，这些规则明确了所交换的数据的格式以及有关的同步问题。为网络中的数据交换而建立的规则，标准或者约定称为**网络协议**，也可以简称为**协议**



**分层**和**协议**就构成了计算机体系结构。

## TCP/IP体系结构

由于**TCP/IP体系结构**运用广泛，所以我们详细讲解下：

| 层级       | 作用                                                         | 具体的协议                                                   |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 应用层     | 应用层是体系结构中的最高层。**应用层直接为用户的应用进程提供服务**。这里的**进程就是指正在运行的程序**。 | 1. http 协议：提供 internet网络浏览服务；<br />2.DNS 协议：负责域名和IP地址的映射<br />3.SMIP协议：提供简单的电子邮件发送服务<br />4.POP 协议：提供对邮箱服务器远程存取邮件的服务。与此功能类似的还有 IMAP 协议<br />5.FIP协议：提供应用级文件传输服务<br />6. SMB协议：提供应用级文件共享服务<br />7.Telnet协议：提供远程登录服务（明文传输）<br />8.SSH协议：提供远程登录服务（加密） |
| 传输层     | 负责向两个主机中进程之间的通信提供服务                       | 1. TCP协议：提供用户间面向链接，可靠的报文传输服务；<br />2.UDP协议：提供用户间无连接，不可靠的报文传输服务； |
| 网络层     | 负责为分组交换网上的不同主机提供通信服务                     | 1. IP协议：提供网络结点之前得报文传送服务。<br />2.ARP协议：实现IP呆滞想物理地址的映射<br />3.RARP协议：实现物理地址想IP地址的映射；<br />4.ICMP协议：探测报告传输中产生的错误；<br />5.IGMP协议：管理多波组测成员问题 |
| 网络接口层 | 负责与链路（传输媒介）的数据传输工作。                       |                                                              |

关于每一层的工作职责还不是哼清楚的可以看这篇文章： [网络各层功能职责——计算机网络](https://blog.csdn.net/TommyZht/article/details/45966689)



# HTTP

从上面的内容可以看出`http协议`是在应用层的。我们先来了解HTTP的基本概念。

## HTTP的基本概念

HTPP 是超文本传输协议（**H**yperText **T**ransfer **P**rotocol）。它的名字可以拆解为3个部分：

{% asset_img 2.png %}



### 超文本

**文本**：早起的**文本** 指的是普调的文本字符，但是现在的文本的含义已经扩展为图片，水平，压缩包等。在HTTP眼里都是文本。

**超文本**：超越了普调文本的文本，它是图片，文字，视频等的混合体，具有超链接，能从一个超文本跳到另外一个超文本。

HTML 就是最常见的超文本了，它本身只是纯文字文件，但内部用很多标签定义了图片、视频等的链接，再经过浏览器的解释，呈现给我们的就是一个文字、有画面的网页了

### 传输

 即将数据由A传输到B或者由B传输到A。并且A 与 B 之间可以存放很多第三方；如：A<=>X<=>Y<=>Z<=>B

### 协议

 在计算机网络中有很多的协议，`HTTP` 也是一个协议

那么总结来说：**HTTP 是一个在计算机世界里专门在两点之前传输文字，图片， 视频，音频等超文本的数据约定和规定**

## HTTP协议的原理

HTTP协议采用 **请求/响应**的工作方式：

1. `HTTP`协议工作于客户端-服务端架构上。浏览器最为`HTTP`客户端通过`url`向`HTTP`服务端（web服务器）发送所有的请求
2. `web`服务器：`Apache`服务器，IIS服务器（Internet Information Services）等。
3. `web`服务器根据接收到的请求后， 向客户端发送响应信息。
4. `HTTP`服务器默认监听的端口号为80，但是也可以设置为其他端口。

## 一次请求流程

简单的来分析，从输入 `URL`到回车后发生的行为如下：

- URL解析
- DNS查询
- TCP连接
- HTTP请求
- 响应请求
- 页面渲染
- TCP关闭

### URL 解析

首先判断你输入的是不是一个合法的`url`，并且对你输入的内容进行解析，一个`url`解析如下：

{% asset_img 3.png %}

### DNS 查询

浏览器通过`URL`解析之后的域名，通过DNS解析出目标网页的IP地址。具体的查询如下：

{% asset_img 4.png %}

最终得到域名对应的目标服务器的`IP`地址

### TCP连接

在`HTTP`开始工作之前，客户端和服务端首先会建立连接（TCP三次握手）

### 发送HTTP请求

当建立`TCP` 连接连接之后，就可以在这基础上进行通信。浏览器发送`HTTP`请求到服务器。请求的内容包括：请求行，请求头，请求体。这些知识点我们下面会讲到。

### 响应请求

当服务器接收到请求之后，会进行逻辑操作，，处理完之后会返回一个`HTTP`响应消息，内容包括：响应行， 响应头，响应正文。下面我们会讲到。

### 页面渲染

关于页面的渲染可以看这篇文章： [浏览器的渲染流程](https://shuliqi.github.io/2018/03/24/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B/)

### TCP关闭

一旦web服务器想浏览器发送了响应数据。它就要关闭TCP连接。但是如果浏览器或者服务器在其头部加入了这行代码`Connection： keep-alive`那么TCP连接在发送响应数据之后仍然保持打开状态。

## HTTP报文详解

`HTTP`在应用层 交互的数据方式 ， 我们叫报文。

`HTTP`的报文分为：请求报文， 响应报文

{% asset_img 10.png %}

### 请求报文

请求报文的结构如下：

{% asset_img 5.png %}

一个实际的请求报文如下：

{% asset_img 7.png %}

请求报文主要由三个部分组成：请求行， 请求头， 请求体；

#### 请求行

声明 请求方法，逐级域名，资源路径&协议版

{% asset_img 6.png %}

> 注意： 空格是不能省略的

##### 请求方法

请求方法是定义对请求对象的操作的。请求方法及其解释如下：

1. GET： 向服务器请求指定URL的资源，请求参数是直接带在链接上，所以没有主体; 

   使用场景：如向数据库查询单个或list数据。

   总结来说：告诉服务器我要的东西

2. POST：用于向服务器提交数据。

   使用场景：我新增加一个数据等。

   总结来说：告诉服务器我要给的东西

3. PUT：向服务器请求修改某个已存在的资源。

   使用场景： 我要修改用户名等

   总结的来说：告诉服务器我要更新。

4. HEDA：HEAD 和 GET 是差不多的， 只是HEAD 请求的响应报文不返回响应体，只返回响应头。

   使用场景 ：某个文件是否存在，检查文件是否更新

5. DELETE： 向服务器请求删除某个已存在的文件

   使用场景: 删除 id 为 23 的的数据

6. OPTIONS：返回指定URL资源所能够支持的HTTP请求方式。

   使用场景：获取服务器支持的 http请求的方式，[CORS 中的预检请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS#cors_中的预检请求)

   > 在 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS) 中，可以使用 OPTIONS 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。预检请求报文中的 [`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method) 首部字段告知服务器实际请求所使用的 HTTP 方法；[`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers) 首部字段告知服务器实际请求所携带的自定义首部字段。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

7. CONNECT：用于代理用服务器, 具体看这篇文章：[HTTP之connect method](https://www.jianshu.com/p/54357cdd4736)

8. TRACH: 回显服务器收到的请求

##### 请求路径

请求路径就是`URL`中请求地址的部分. 如：url = http://www.baidu.com/；则请求路径为：/； url = http://www.baidu.com/20/home，则请求路径为：/20/home。

> URL: 是统一资源定位符，它的作用就是表示资源的位置，访问资源的方式。它是由：`<协议>：// <主机>:<端口>/<路径>`

##### 协议版本

定义 HTTP 的版本号。 常用的版本号为：HTTP/1.0， HTTP/1.1，HTTP/2.0,

#### 请求头

声明 客户端，报文的部分信息。所有的请求头如下：

| Header              | 解释                                                         | 示例                                                    |
| :------------------ | :----------------------------------------------------------- | :------------------------------------------------------ |
| Accept              | 指定客户端能够接收的内容类型                                 | Accept: text/plain, text/html                           |
| Accept-Charset      | 浏览器可以接受的字符编码集。                                 | Accept-Charset: iso-8859-5                              |
| Accept-Encoding     | 指定浏览器可以支持的web服务器返回内容压缩编码类型。          | Accept-Encoding: compress, gzip                         |
| Accept-Language     | 浏览器可接受的语言                                           | Accept-Language: en,zh                                  |
| Accept-Ranges       | 可以请求网页实体的一个或者多个子范围字段                     | Accept-Ranges: bytes                                    |
| Authorization       | HTTP授权的授权证书                                           | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==       |
| Cache-Control       | 指定请求和响应遵循的缓存机制                                 | Cache-Control: no-cache                                 |
| Connection          | 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）           | Connection: close                                       |
| Cookie              | HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。 | Cookie: $Version=1; Skin=new;                           |
| Content-Length      | 请求的内容长度                                               | Content-Length: 348                                     |
| Content-Type        | 请求的与实体对应的MIME信息                                   | Content-Type: application/x-www-form-urlencoded         |
| Date                | 请求发送的日期和时间                                         | Date: Tue, 15 Nov 2010 08:12:31 GMT                     |
| Expect              | 请求的特定的服务器行为                                       | Expect: 100-continue                                    |
| From                | 发出请求的用户的Email                                        | From: user@email.com                                    |
| Host                | 指定请求的服务器的域名和端口号                               | Host: www.zcmhi.com                                     |
| If-Match            | 只有请求内容与实体相匹配才有效                               | If-Match: “737060cd8c284d8af7ad3082f209582d”            |
| If-Modified-Since   | 如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码 | If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT        |
| If-None-Match       | 如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变 | If-None-Match: “737060cd8c284d8af7ad3082f209582d”       |
| If-Range            | 如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag | If-Range: “737060cd8c284d8af7ad3082f209582d”            |
| If-Unmodified-Since | 只在实体在指定时间之后未被修改才请求成功                     | If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT      |
| Max-Forwards        | 限制信息通过代理和网关传送的时间                             | Max-Forwards: 10                                        |
| Pragma              | 用来包含实现特定的指令                                       | Pragma: no-cache                                        |
| Proxy-Authorization | 连接到代理的授权证书                                         | Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ== |
| Range               | 只请求实体的一部分，指定范围                                 | Range: bytes=500-999                                    |
| Referer             | 先前网页的地址，当前请求网页紧随其后,即来路                  | Referer: http://www.zcmhi.com/archives/71.html          |
| TE                  | 客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息     | TE: trailers,deflate;q=0.5                              |
| Upgrade             | 向服务器指定某种传输协议以便服务器进行转换（如果支持）       | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11          |
| User-Agent          | User-Agent的内容包含发出请求的用户信息                       | User-Agent: Mozilla/5.0 (Linux; X11)                    |
| Via                 | 通知中间网关或代理服务器地址，通信协议                       | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)             |
| Warning             | 关于消息实体的警告信息                                       | Warn: 199 Miscellaneous warning                         |

#### 请求体

存放需要发送的信息

> 可选部分，如 `GET请求`就无请求数据

它主要有三种使用方式：

{% asset_img 8.png %}



### 响应报文

响应包问的结构如下：

{% asset_img 9.png %}

一个实际的响应报文如下：

{% asset_img 11.png %}

HTTP 响应报文包括：状态行，响应头，响应体。

#### 状态行

状态行主要的作用： 声明协议版本，状态码， 状态码描述

{% asset_img 12.png %}

> 注意： 空格不能省略

##### 协议版本

定义 HTTP 的版本号。 常用的版本号为：HTTP/1.0， HTTP/1.1，HTTP/2.0,

##### 状态码

表示服务器返回的响应状态代码，分为五大类：

- 1xx: 表示信息通知；如请求收到了， 但是还没处理
- 2xx: 表示成功。如接受或知道了
- 3xx: 表示重定向。如果要完成请求还需进一步行动
- 4xx: 表示客户端错误，请求包含语法错误导致无法实现
- 5xx: 表示服务器错误，服务器不能实现一种明显无效的请求。

- 常用的状态码如下：

| 状态码 | 状态码英文名称        | 中文描述                                                     |
| ------ | --------------------- | ------------------------------------------------------------ |
| 200    | OK                    | `请求成功`。一般用于GET与POST请求                            |
| 204    | No Content            | 无内容。`服务器成功处理，但未返回内容`。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
| 206    | Partial Content       | `是对资源某一部分的请求`，服务器成功处理了部分GET请求，响应报文中包含由Content-Range指定范围的实体内容。 |
|        |                       |                                                              |
| 301    | Moved Permanently     | `永久性重定向`。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| 302    | Found                 | `临时性重定向`。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
| 303    | See Other             | `查看其它地址`。与302类似。使用GET请求查看                   |
| 304    | Not Modified          | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 307    | Temporary Redirect    | `临时重定向`。与302类似。使用GET请求重定向，会按照浏览器标准，不会从POST变成GET。 |
|        |                       |                                                              |
| 400    | Bad Request           | `客户端请求报文中存在语法错误，服务器无法理解`。浏览器会像200 OK一样对待该状态吗 |
| 401    | Unauthorized          | `请求要求用户的身份认证`，通过HTTP认证（BASIC认证，DIGEST认证）的认证信息，若之前已进行过一次请求，则表示用户认证失败 |
| 402    | Payment Required      | 保留，将来使用                                               |
| 403    | Forbidden             | `服务器理解请求客户端的请求，但是拒绝执行此请求`             |
| 404    | Not Found             | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面。也可以在服务器拒绝请求且不想说明理由时使用 |
|        |                       |                                                              |
| 500    | Internal Server Error | `服务器内部错误，无法完成请求`，也可能是web应用存在bug或某些临时故障 |
| 501    | Not Implemented       | 服务器不支持请求的功能，无法完成请求                         |
| 503    | Service Unavailable   | `由于超载或系统维护，服务器暂时的无法处理客户端的请求`。延时的长度可包含在服务器的Retry-After头信息中 |



- 不常用的HTTP状态码列表

| 状态码 | 状态码英文名称                  | 中文描述                                                     |
| ------ | ------------------------------- | ------------------------------------------------------------ |
| 201    | Created                         | 已创建。成功请求并创建了新的资源                             |
| 202    | Accepted                        | 已接受。已经接受请求，但未处理完成                           |
| 203    | Non-Authoritative Information   | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
| 205    | Reset Content                   | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| 300    | Multiple Choices                | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| 305    | Use Proxy                       | 使用代理。所请求的资源必须通过代理访问                       |
| 306    | Unused                          | 已经被废弃的HTTP状态码                                       |
| 402    | Payment Required                | 保留，将来使用                                               |
| 405    | Method Not Allowed              | 客户端请求中的方法被禁止                                     |
| 406    | Not Acceptable                  | 服务器无法根据客户端请求的内容特性完成请求                   |
| 407    | Proxy Authentication Required   | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权 |
| 408    | Request Time-out                | 服务器等待客户端发送的请求时间过长，超时                     |
| 409    | Conflict                        | 服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突 |
| 410    | Gone                            | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
| 411    | Length Required                 | 服务器无法处理客户端发送的不带Content-Length的请求信息       |
| 412    | Precondition Failed             | 客户端请求信息的先决条件错误                                 |
| 413    | Request Entity Too Large        | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息 |
| 414    | Request-URI Too Large           | 请求的URI过长（URI通常为网址），服务器无法处理               |
| 415    | Unsupported Media Type          | 服务器无法处理请求附带的媒体格式                             |
| 416    | Requested range not satisfiable | 客户端请求的范围无效                                         |
| 417    | Expectation Failed              | 服务器无法满足Expect的请求头信息                             |
| 501    | Not Implemented                 | 服务器不支持请求的功能，无法完成请求                         |
| 502    | Bad Gateway                     | 充当网关或代理的服务器，从远端服务器接收到了一个无效的请求   |
| 504    | Gateway Time-out                | 充当网关或代理的服务器，未及时从远端服务器获取请求           |
| 505    | HTTP Version not supported      | 服务器不支持请求的HTTP协议的版本，无法完成处理               |



##### 状态码描述

当前状态码的解释消息

#### 响应头

响应头的作用：声明服务端的报文的信息

常用的`HTTP响应头`：

| 响应头                      | 说明                                                         | 示例                                                         | 状态       |
| :-------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :--------- |
| Access-Control-Allow-Origin | 指定哪些网站可以`跨域源资源共享`                             | `Access-Control-Allow-Origin: *`                             | 临时       |
| Accept-Patch                | 指定服务器所支持的文档补丁格式                               | Accept-Patch: text/example;charset=utf-8                     | 固定       |
| Accept-Ranges               | 服务器所支持的内容范围                                       | `Accept-Ranges: bytes`                                       | 固定       |
| Age                         | 响应对象在代理缓存中存在的时间，以秒为单位                   | `Age: 12`                                                    | 固定       |
| Allow                       | 对于特定资源的有效动作;                                      | `Allow: GET, HEAD`                                           | 固定       |
| Cache-Control               | 通知从服务器到客户端内的所有缓存机制，表示它们是否可以缓存这个对象及缓存有效时间。其单位为秒 | `Cache-Control: max-age=3600`                                | 固定       |
| Connection                  | 针对该连接所预期的选项                                       | `Connection: close`                                          | 固定       |
| Content-Disposition         | 对已知MIME类型资源的描述，浏览器可以根据这个响应头决定是对返回资源的动作，如：将其下载或是打开。 | Content-Disposition: attachment; filename="fname.ext"        | 固定       |
| Content-Encoding            | 响应资源所使用的编码类型。                                   | `Content-Encoding: gzip`                                     | 固定       |
| Content-Language            | 响就内容所使用的语言                                         | `Content-Language: zh-cn`                                    | 固定       |
| Content-Length              | 响应消息体的长度，用8进制字节表示                            | `Content-Length: 348`                                        | 固定       |
| Content-Location            | 所返回的数据的一个候选位置                                   | `Content-Location: /index.htm`                               | 固定       |
| Content-MD5                 | 响应内容的二进制 MD5 散列值，以 Base64 方式编码              | Content-MD5: IDK0iSsgSW50ZWd0DiJUi==                         | 已淘汰     |
| Content-Range               | 如果是响应部分消息，表示属于完整消息的哪个部分               | Content-Range: bytes 21010-47021/47022                       | 固定       |
| Content-Type                | 当前内容的`MIME`类型                                         | Content-Type: text/html; charset=utf-8                       | 固定       |
| Date                        | 此条消息被发送时的日期和时间(以[RFC 7231](http://tools.ietf.org/html/rfc7231#section-7.1.1.1)中定义的"HTTP日期"格式来表示) | Date: Tue, 15 Nov 1994 08:12:31 GMT                          | 固定       |
| ETag                        | 对于某个资源的某个特定版本的一个标识符，通常是一个 消息散列  | ETag: "737060cd8c284d8af7ad3082f209582d"                     | 固定       |
| Expires                     | 指定一个日期/时间，超过该时间则认为此回应已经过期            | Expires: Thu, 01 Dec 1994 16:00:00 GMT                       | 固定: 标准 |
| Last-Modified               | 所请求的对象的最后修改日期(按照 RFC 7231 中定义的“超文本传输协议日期”格式来表示) | Last-Modified: Dec, 26 Dec 2015 17:30:00 GMT                 | 固定       |
| Link                        | 用来表示与另一个资源之间的类型关系，此类型关系是在[RFC 5988](https://tools.ietf.org/html/rfc5988)中定义 | `Link: `; rel="alternate"                                    | 固定       |
| Location                    | 用于在进行重定向，或在创建了某个新资源时使用。               | Location: http://www.itbilu.com/nodejs                       | 固定       |
| P3P                         | P3P策略相关设置                                              | P3P: CP="This is not a P3P policy!                           | 固定       |
| Pragma                      | 与具体的实现相关，这些响应头可能在请求/回应链中的不同时候产生不同的效果 | `Pragma: no-cache`                                           | 固定       |
| Proxy-Authenticate          | 要求在访问代理时提供身份认证信息。                           | `Proxy-Authenticate: Basic`                                  | 固定       |
| Public-Key-Pins             | 用于防止中间攻击，声明网站认证中传输层安全协议的证书散列值   | Public-Key-Pins: max-age=2592000; pin-sha256="……";           | 固定       |
| Refresh                     | 用于重定向，或者当一个新的资源被创建时。默认会在5秒后刷新重定向。 | Refresh: 5; url=http://itbilu.com                            |            |
| Retry-After                 | 如果某个实体临时不可用，那么此协议头用于告知客户端稍后重试。其值可以是一个特定的时间段(以秒为单位)或一个超文本传输协议日期。 | 示例1:Retry-After: 120示例2: Retry-After: Dec, 26 Dec 2015 17:30:00 GMT | 固定       |
| Server                      | 服务器的名称                                                 | `Server: nginx/1.6.3`                                        | 固定       |
| Set-Cookie                  | 设置`HTTP cookie`                                            | Set-Cookie: UserID=itbilu; Max-Age=3600; Version=1           | 固定: 标准 |
| Status                      | 通用网关接口的响应头字段，用来说明当前HTTP连接的响应状态。   | `Status: 200 OK`                                             |            |
| Trailer                     | `Trailer`用户说明传输中分块编码的编码信息                    | `Trailer: Max-Forwards`                                      | 固定       |
| Transfer-Encoding           | 用表示实体传输给用户的编码形式。包括：`chunked`、`compress`、 `deflate`、`gzip`、`identity`。 | Transfer-Encoding: chunked                                   | 固定       |
| Upgrade                     | 要求客户端升级到另一个高版本协议。                           | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11               | 固定       |
| Vary                        | 告知下游的代理服务器，应当如何对以后的请求协议头进行匹配，以决定是否可使用已缓存的响应内容而不是重新从原服务器请求新的内容。 | `Vary: *`                                                    | 固定       |
| Via                         | 告知代理服务器的客户端，当前响应是通过什么途径发送的。       | Via: 1.0 fred, 1.1 itbilu.com (nginx/1.6.3)                  | 固定       |
| Warning                     | 一般性警告，告知在实体内容体中可能存在错误。                 | Warning: 199 Miscellaneous warning                           | 固定       |
| WWW-Authenticate            | 表示在请求获取这个实体时应当使用的认证模式。                 | `WWW-Authenticate: Basic`                                    | 固定       |

#### 响应体：

存放需返回给客户端的数据信息。 跟请求体一样同样分为：任意类型的数据交换格式、键值对形式和分部分形式

{% asset_img 13.png %}

## HTTP 协议的特点

### 支持客户端/服务端模式

先去请求的就属于客户端，响应相求的就属于服务端。也就是说：客户端用于请求资源，服务端用于提供资源。

### 无连接

​      HTTP 是无连接的，无连接的含义就是限次每一连接只能处理一个请求， 当服务器响应完客户的请求，并且得到客户端的应答之后，就断开连接。采用这种方式可以节省传输时间。

​     早期这么做的原因是 `http`协议产生与互联网，因此服务器要同时处理成千上万的客户端网页的访问。但是每个客户端与服务器之前得交换数据的间歇比较大。所以导致大部门的通道是空闲的，五段占用了资源。所以HTTP的设计者就利用这种特点将HTTP设计为**请求时建立连接，请求万释放连接。已尽快将资源释放出来服务其他客户端**。

​    随着时间的推移，网页变得复杂，如里面可能嵌入了很多的图片，这时候没访问一次图片都需要建立一个`TCP`连接。就显得很抵消。因此就出现了请求头 `Connection： keep-alive`。 用来解决这效率低的问题。

### 无状态

协议对于事物处理没有记忆能力，服务端不知道客户端是什么状态。也就是说我们可以服务器发送`HTTP`请求之后，服务端会根据请求给我们发送数据过来，但是发送完，不会记录任何的信息。

 `HTTP`是一个无状态的协议，就意味着每个请求都是独立的， `keep-alive `也无法改变这个结果。

协议没有状态带来的后果如：访问系统需要登录后才能访问，由于无状态的特点，每次跳转链接都需要重新登录。这就导致每次请求要发送大量的数据信息给服务器。 

 由于它的这个特点导致很多的问题， 那么用于保持`HTTP 有连接状态的技术就有两种：`Cookie`, `Session`；

   `Cookie：`是通过在请求头和响应头中写入 `	Cookie`来控制客户端的状态的。首次访问服务端的时候，响应头会返回`Set-Cookie`的首部字段信息，通知客户保存`Cookie`。当客户下次再向服务端发送请求的时候，客户端会自动在请求头中加入`Cookie`值发送给服务端。服务端发现客户端发送过来的`Cookie`后，会去检查究竟是哪个客户端发送过来的请求，然后对比服务器上的记录，最后得到之前得状态信息。

   `Session：`是通过服务器来保持状态的。当客户端访问服务器时候，服务器设置`Session`, 将会话信息保存在服务器上，同时将`Session`的`ID`传递给客户端浏览器，浏览器会将这个`🆔`保存在内存中。之后浏览器每次请求都会带上这个参数值，服务器根据`Session`的`ID`，就能取掉客户端的信息。

### 简单快速

客户向服务器请求服务时，只需传送请求方法和路径。每种方法规定了客户与服务器联系的类型不同。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。

### 灵活

`HTTP`允许传输任何类型的数据对象。 传输的数据类型由请求头的的`Content-type`来标记。   

   

   

























