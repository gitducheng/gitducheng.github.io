---
title: Vue2.x的生命周期详解
date: 2022-06-17 19:31:36
tags: Vue
categories: Vue
---

使用`Vue`开发已经有一段时间了。但发现自己对`vue`的理解还是不深刻。于是想着从观看`Vue`文档开始。在阅读文档之前，觉得需要先了解整个`Vue`的生命周期，清楚的认识到`Vue`在每个阶段的钩子函数没这样才能更好的让我们去使用`Vue`。

我们先来看一张图，上面解释每个步骤是做什么的。可以只看这一张图就可以明白Vue实例的整个流程。

{% asset_img 3.png %}

每个`Vue`实例在被创建之前都要经历过一系列的初始化过程，这个过程就是`Vue`的生命周期。浅显的来说，生命周期的钩子函数就是回调函数，在不同的阶段有不同的回调函数供用户处理自定义的事件。也可以说生命周期是一套流程，而这套流程里面的方法会有先后顺序的执行（调用就执行，不调用就不执行）。

# 生命周期钩子

从上面的图中会看到生个`vue`的生命周期钩子：

- beforeCreate

- created

- beforeMount

- mounted

- beforeUpdate

- updated

- beforeDestroy

- destroyed

  

当然除了实例的生命周期，还有其他的：

- activated： keep-alive 缓存组件激活时使用
- deactivated： keep-alice 缓存组件停用时使用
- errorCaptured： 捕获一个来自子孙组件的错误时调用



## beforeCreate 之前

在`beforeCreate`生命周期之前。首先是使用`new Vue`来开始创建一个`Vue`实例、接下来会初始化这个实例的生命周期事件。如下图：

{% asset_img 1.png %}

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>vue2.x生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app"> <h1>{{message}}</h1></div></body>
 <script>
   var vm = new Vue({
     el: '#app',
      data: {
        message: "Pydc"
      },
      methods: {
        getMessage() { 
          return `方法返回：${this.message}`;
        }
    	},
      beforeCreate () {
        console.log("------beforeCreate------");
        console.log("el:", this.$el);
        console.log("data:", this.$data);
        console.log("methods:", this.getMessage);
      },
   })
</script>
</html>
```

打印结果：

```
------beforeCreate------
el: undefined
data: undefined
methods: undefined
```



## beforeCreate 和 created 之间

在这个生命周期之前，会初始化当前实例上的`data` 和`methods`。说明`created`的时候数据已经绑定，是可以访问到了。在这里可以做`ajax`请求了。

**注意：**这里还没有 `el` 选项。

{% asset_img 2.png %}

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>vue2.x生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app"> <h1>{{message}}</h1></div></body>
 <script>
   var vm = new Vue({
    	el: '#app',
      data: {
        message: "Pydc"
      },
      methods: {
        getMessage() { 
          return `方法返回：${this.message}`;
        }
    	},
      beforeCreate () {
        console.log("------beforeCreate------");
        console.log("el:", this.$el);
        console.log("data:", this.$data);
        console.log("methods:", this.getMessage);
    	},
      created () {
      	console.log("------created------");
        console.log("el:", this.$el);
        console.log("data:", this.$data.message);
        console.log("methods:", this.getMessage());
      }
   })
</script>
</html>
```

结果打印：

```
------beforeCreate------
el: undefined
data: undefined
methods: undefined
------created------
el: undefined
data: Pydc
methods: 方法返回：Pydc
```

可以看出，`created`可以获取`data`和`methods`

## created 和 beforeMount 之间的生命周期

{% asset_img 5.png %}

这阶段里面首先会判断是否有`el`选项。如果有的话，那么继续往下编译，如果没有`el`选项。则停止编辑。也就意味停止了生命周期。直到该`Vue`实例上调用了`Vm.$mount(el)`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>vue2.x生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app"> <h1>{{message}}</h1></div></body>
 <script>
   var vm = new Vue({
    	// el: '#app', // 被注释掉了
      data: {
        message: "Pydc"
      },
      methods: {
        getMessage() { 
          return `方法返回：${this.message}`;
        }
    	},
      created() {
        console.log("------created--------")
      },
      beforeMount() {
        console.log("------beforeMount------");
        console.log("el:", this.$el);
        console.log("data:", this.$data.message)
        console.log("methods:", this.getMessage());
      },
   })
</script>
</html>
```

结果打印：

```javascript
------created--------
```

手动调用实例的`Vm。$mount(#app)`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>vue2.x生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app"> <h1>{{message}}</h1></div></body>
 <script>
   var vm = new Vue({
    	// el: '#app', // 被注释掉了
      data: {
        message: "Pydc"
      },
      methods: {
        getMessage() { 
          return `方法返回：${this.message}`;
        }
    	},
      created() {
        console.log("------created--------")
      },
      beforeMount() {
        console.log("------beforeMount------");
        console.log("el:", this.$el);
        console.log("data:", this.$data.message)
        console.log("methods:", this.getMessage());
      },
   })
   vm.$mount("#app"); // 手动调用了 Vm.$mount(el)
</script>
</html>
```

结果打印：

{% asset_img 4.png %}

然后会判断是否有`template`。有没有`template`对生命周期没有影响。

- 如果有`template`则直接作为模板编译成render函数；
- 如果没有`template`则直接将外部的`html`作为模板编译；

**注意：**`template`模板的优先级要高于外部`html`的优先级。

如下的例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>vue2.x生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app">
    <span>这是外部的html模板:{{message}}</span>
  </div>
</body>
 <script>
   var vm = new Vue({
      el: '#app',
    	data: {
        message: "Pydc"
      },
      template: "<span>这是内部的模板：{{message}}</span>",
      methods: {
        getMessage() { 
          return `方法返回：${this.message}`;
        }
      }
   })
</script>
</html>
```

打开之后，我们看到的页面文案是："这是内部的模板：Pydc"

如果我们把`template` 删除掉那么就会显示："这是外部的html模板:Pydc"6

## beforeMount 和 mounted之前的生命周期

{% asset_img 6.png %}

这期间`Vue`实例对象添加`$el`。把内存中渲染好的html 替换到页面上。覆盖`$el`指定的页面。因为在这之前的`beforeCreate`生命周期打印的`el`还是`undefined`。

## mounted生命周期

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>vue2.x生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app">
    <span>这是外部的html模板:{{message}}</span>
  </div>
</body>
 <script>
   var vm = new Vue({
      el: '#app',
    	data: {
        message: "Pydc"
      },
      template: "<span>这是内部的模板：{{message}}</span>",
      methods: {
        getMessage() { 
          return `方法返回：${this.message}`;
        }
      },
      mounted() {
        console.log("--------mounted--------");
        console.log("el:", this.$el);
      }
   })
</script>
</html>
```

打印结果为：

```
--------mounted--------
el: <span>​这是内部的模板：Pydc​</span>​
```

在这之前的`span`标签的名字是 {{message}} 占位的。这是`JavaScript`中的虚拟`DOM`形式存在的。在`mounted`之后就可以看到了内容发生了变化。

## beforeUpdate 和 updated 之间的生命周期

{% asset_img 7.png %}

从图中可以看出来， 当`data`的数据发生了变化，先会触发`beforeUpdate`钩子。注意这时候页面的视图还没更新。然后才重新渲染组件。最后调用`updated`。调用完之后。视图和`data`都是最新的。

我们看下面的例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>vue2.x生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app">
    <span>这是外部的html模板:{{message}}</span>
  </div>
</body>
 <script>
   var vm = new Vue({
      el: '#app',
    	data: {
        message: "老的数据"
      },
      beforeUpdate() {
        console.log("--------beforeUpdate--------");
        console.log("el:", this.$el);
      },
      updated() {
        console.log("--------updated--------");
        console.log("el:", this.$el);
      }
   })
   vm.message = "新的数据";
</script>
</html>
```

打印结果：

{% asset_img 8.png %}

当数据`data`有改变的（ vm.message = "新的数据"）。就会分别触发`beforeUpdate` 和 `updated`。

## beforeDestroy 和 destroyed 之间的生命周期

{% asset_img 9.png %}

**beforeDestroy** 生命周期是在实例被销毁之前调用。在这一步，实例仍然是可用的。

**destroyed**生命周期是在实例销毁之后调用。调用后。`Vue`实例所指的所有东西都会被解除绑定。所有的事件也会被移除。所有的子实例也会被销毁。

## activated

`keep-alive` 缓存组件激活的时候使用

## deactivated

 `keep-alive` 缓存组件停用时使用



## errorCaptured

捕获子孙组件的错误时调用



## 数据请求在created和mouted的区别

`created`是在组件实例一旦创建完成的时候立刻调用，这时候页面`dom`节点并未生成，`mounted`是在页面`dom`节点渲染完毕之后就立刻执行的，触发时机上`created`是比`mounted`要更早的：两者相同点：都能拿到实例对象的属性和方法；讨论这个问题本质就是触发的时机，放在`mounted`请求有可能导致页面闪动（页面`dom`结构已经生成），但如果在页面加载前完成则不会出现此情况建议：放在`create`生命周期当中



















