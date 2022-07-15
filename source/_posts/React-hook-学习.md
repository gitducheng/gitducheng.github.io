---
title: React hook 学习
date: 2021-09-14 21:27:32
tags: React
categories: React
---

又要开始抗起`React` 搬砖了，多了很多的 `hook`， 嗯 😔，先好好学学吧！做个简单的学习记录。读完本篇文章可以了解到：

- 什么是 `Hook`?
- `Hook` 解决什么问题?
- `Hook`有哪些规格？
- `React`内置了哪些 `Hook`？

<!--more-->

# 什么是 Hook？

`Hook` 是`React 16.8`的新特性。它的主要作用是让我们在不写 `class`的情况下可以使用`state`和`React`本身的一些特性。

`Hook`本质上就是一个函数， 它有自己的状态管理，生命周期管理，状态共享等；如下面的`Hook`：

- `useState`
- `useEffect`
- `useContext`
- `useReducer`

# Hook 解决什么问题

我们来看看`Hook`到底解决了什么问题。

我们首先来看 这两种组件类型有什么区别：

<iframe height="654" style="width: 100%;" scrolling="no" title="class 组件" src="https://codepen.io/shuliqi/embed/QWgJBQQ?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/QWgJBQQ">
  class 组件</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<iframe height="379" style="width: 100%;" scrolling="no" title="函数 组件" src="https://codepen.io/shuliqi/embed/eYRQPmB?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/eYRQPmB">
  函数 组件</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

由上面的例子我们可以看出：

**class 组件特点：**

- 有组件实例
- 有生命周期
- 有`state` 和 `setState`

**函数组件的特点：**

- 没有组件实例
- 没有有生命周期
- 没有`state` 和 `setState`；只能接收 `props`
- 函数组件只是一个纯函数， 执行完就会被销毁，无法存储 `state`

**`class`组件存在的问题是什么呢？**

- 大型的组件很难拆分和重构

- 相同的业务逻辑分散到各个方法中，变得混乱

- 复用的逻辑变得很复杂

  所以 `React` 更提倡函数式编程，因为函数更加灵活，更容易拆分。但是呢！！！！ 函数组件又太简单， 所以才出现了` hook`；`hook` 就是用来增强函数组件的功能的

---

# Hook 的规则

`Hook` 有两条比较重要的规则；

- **只能在最最顶层使用`Hook`**

- **只有在 React 组件中才能调用**

1. 为什么需要在最顶层使用???????

其实是为了保证多个 `hook` 的调用顺序是一致的

也就是说不要**循环，条件或者嵌套的函数中调用`hook`**。这样可以做到各个`hook` 每一次渲染中， 调用的顺序是一致的。

```js
function Name() {
  useState("1111");
  if (name === "xxx") {
    // 错误，没有在最顶层调用
    useState("22222");
  }
  // 会出现未知问题，有时候是第二次调用，有时候是第三次
  useState("3333");
}
```

2. 为什么我们需要保证多个 `hook` 的调用顺序一致呢？

   这个就跟`React` 实现的 `hook` 的原理有关了。因为每次在渲染的时候， `React`会把所有调用的`hook` 存储起来。

   关于这一块原理感兴趣， 可以看看这篇文章 [React Hooks 原理](https://github.com/bricksp)， 写得很好。

> `React` 也发布了 `ESlint` 插件 [eslint-plugin-react-hooks](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/eslint-plugin-react-hooks)帮助我们强制执行这两条规则。
>
> ```json
> {
>   "extends": [
>     // ...
>     "plugin:react-hooks/recommended"
>   ]
> }
> ```

---

# React 内置的 Hook

我们来看看`React` 内置的`hook` 有哪些：

- `useState` 状态管理

- `useEffect` 生命周期管理

- `useContext` 共享状态数据

- `useMemo` 缓存值

- `useRef` 获取`Dom` 操作

- `useCallback` 缓存函数

- `useImperativeHandle` 子组件暴露值/方法

- `useLayoutEffect` 完成副作用操作，会阻塞浏览器绘制

- `useReducer` 与 `redux` 一样

  下面我们来分别学习一下这些内置的`Hook`

---

# useState

在` class` 组件中，我们获取 ` state` 是从`this.state` 中获取的。但是在函数组件中是没有 ` this` 的。

所以在函数组件中就可以使用`hook` 提供的` useState`来管理和维护` state`。

## 使用

```js
const [name, setName] = useState(initName);
```

- `useState`: 定义 state 变量的函数`hook`
- `name`: 定义出来的变量
- `setName`：为更新 `satate` 方法
- `initName`: `name`变量的初始值

使用`useState` 可以定义一个变量，如上我们这个变量叫`name`。`useState`有一个参数（如上`initName`），为变量的初始值。初始值可以根据我们自己的需要使用不同类型（即可以是字符串，数字， 布尔值等， 不一定是非是对象）`useState`的返回值是返回当前的`state`和更新`state`的函数。

## 举个 🌰

<iframe height="426" style="width: 100%;" scrolling="no" title="React Hook useEffect()" src="https://codepen.io/shuliqi/embed/ZEJzrby?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/ZEJzrby">
  React Hook useEffect()</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
---

# useEffect

`useEffect` 可以看作是函数式组件的生命周期管理，因为在函数式组件中无法使用生命周期。这就可以使用`useEffect`来进行管理了。

`useEffect`主要管理三个生命周期函数：

- `componentDidmount`

  组件第一次渲染完成，此时 dom 节点已经生成，可以在这里调用 ajax 请求，返回数据`setState`后组件会重新渲染

- `componentDidUpdate`

  组件更新完毕后，react 只会在第一次初始化成功会进入`componentDidmount`,之后每次重新渲染后都会进入这个生命周期，`componentDidUpdate(prevProps,prevState`这里可以拿到`prevProps`和`prevState`，即更新前的 props 和 state。

- `componentWillUnmount`

  组件销毁之后触发的生命周期。一般用来：

  > - 清除在组件中的定时器（`setTimeout`,`setInterval`）
  > - 移除组件中的监听（`removeEventListener`）
  > - 取消还没有请求结果的`ajax`请求

## 无需清除的 effect

有时候我们只希望在`React`更新`DOM`之后运行一些额外的代码，那么只需要在`class` 组件生命周期`componentDidmount`和`componentDidUpdate`中执行即可。

那么在`useEffect`中如何写呢？我们可以这么写：

```js
useEffect(() => {
  // 默认会执行这部分，相当于 class 组件的生命周期（componentDidmount， componentDidUpdate）
}, []);
```

## 需要清除 effect

当我们希望在一个组件销毁的时候执行一些逻辑处理。那么就需要在 class 组件的 `componentWillUnmount` 执行即可。

那么在`useEffect`中如何写呢？我们可以这么写：

```js
useEffect(() => {
  return () => {
    // 组件销毁时执行的函数
  };
}, []);
```

## 监听 state 的变化

当我们需要监听的`state`的变化然后做一些处理的时候,我们可以这么写：

```js
useEffect(() => {
  // 监听num，count  状态的变化， 变化了则执行里面的代码
  // 不监听时为空 [] , 或者不写
}, [num, count]);
```

## 举个 🌰

<iframe height="732" style="width: 100%;" scrolling="no" title="React Hook useEffect()" src="https://codepen.io/shuliqi/embed/RwZbQRm?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/RwZbQRm">
  React Hook useEffect()</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

# useRef

`useRef`返回一个 `ref` 对象。这个对象的`.current`属性被初始化为`useRef`传入的参数。该对象在整个生命周期内持续存在。

```
const domRef = useRef(initialValue);
```

> `ref` 对象:`ref`是`React`提供的用来操纵`React`组件实例或者`DOM`元素的接口。 回调函数就是在`dom`节点或组件上挂载函数，函数的入参是`dom`节点或组件实例，达到的效果与字符串形式是一样的， 都是获取其引用。
>
> 如果你将 `ref` 对象以 `<div ref={myRef} />` 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 `.current` 属性设置为相应的` DOM` 节点

这个 `hook`的作用：获取`Dom`操作。如获取一个`input`的焦点

## 举个 🌰

<iframe height="459" style="width: 100%;" scrolling="no" title="React Hook useEffect()" src="https://codepen.io/shuliqi/embed/oNeNeNY?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/oNeNeNY">
  React Hook useEffect()</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

---

# useContext

```react
const value = useContext(MyContext);
```

`useContext`接受以一个`context`对象（`React.createContext`的返回值）， 并返回当前 `Context`的当前值。`Context`的当前值是由上层组件中距离当前组件最近的`MyContext.Provider` 的`value`决定。

上面我们提到了 `Context`对象， 那么这个对象能帮助我们解决什么问题呢？

## Context 能解决什么问题

在平成的开发过程中，我们进行通信（父子）使用之最多的是 `props`来进行通信； 但是 跨级组件 的通信我们就不好用 `props`来通信了。那这时候我们怎么可以把组件状态共享出去呢？ `Redux`?， 或者 `Context`

> `react` 中的 `Context`: 在典型的 React 应用程序中，数据通过 props 自上而下（父到子）传递，但对于应用程序中许多组件所需的某些类型的 props（例如环境偏好,UI 主题），这可能很麻烦。 上下文(Context) 提供了在组件之间共享这些值的方法，而不必在树的每个层级显式传递一个 prop

> 注意：`Context`主要的应用场景是很多不同层级的组件需要访问同样一些数据， 谨慎使用， 因为这会让组件的复用性变差

## 创建 Context

使用 `Context`的前提，必须创建它

```react
import React from 'react';

export const MyContext = React.createContext();
```

## 使用 Context

在使用 `Context`的时候，它通常用在顶层组件上，它包裹的内部组件都可以享受到 `state`的使用和修改， 一般是通过 `Context.provider`来包裹， 通过`value`来传递。

```js
<MyContext.Provider value={{ name }}>
  <div>
    <input onChange={handleName} />
    <ComponentA />
  </div>
</MyContext.Provider>
```

## 子组件使用 context 传过来的值

子组件通过`useContext()` `Hook`就可以很方便的拿到值

```js
const { name } = React.useContext(MyContext);
```

## 完整的 🌰

<iframe height="712" style="width: 100%;" scrolling="no" title="React Hook useRef()" src="https://codepen.io/shuliqi/embed/qBXZaOM?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/qBXZaOM">
  React Hook useRef()</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

---

# useMemo

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

官网文档：`useMemo`返回的是一个`memoized`值(具有记忆的值)，`useMemo`主要是用于性能优化，通过记忆值来避免在每个渲染上进行高开销的计算。

根据官方文档的介绍，我们可以这么理解：

> 在 `a `值 ，`b`值 不变的情况下，`memoizedValue`的值不变，也就是`useMemo`的第一个入参函数不会被执行， 从而达到节省计算量的目的

有两个参数：

- 第一个是一个回调函数， 主要是暴露出来让我们自己如何去计算这个值的。
- 第二个参数是一个数组，数组中的`state` 发生改变才会重新执行回调函数。

> 注意：
>
> - 如果不传数组，则每次更新都会重新计算
> - 空数组，只会计算一次
> - 数组里面有依赖值，则当对应的值发生变化时，才会重新计算

## 举个 🌰

<iframe height="556" style="width: 100%;" scrolling="no" title="React Hook useContext()" src="https://codepen.io/shuliqi/embed/zYdqKLm?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/zYdqKLm">
  React Hook useContext()</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

上面的例子中， 我们点击**count 自增** `newValue`会发生改变； 但是我们点击**num 自增** ，`newValue`是不会发生改变的。

那是因为在`useMemo`依赖的是 `count`的变化。

> 如果没有提供依赖值， 那么`useMemo`在每次渲染的时候都会重新计算值

# useCallback

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

`useCallback`返回的是一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 回调函数(`useMemo`返回的是`memoized`值)。

官方文档：把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染

我们可以这么理解：

> 在 `a`值, `b`值不变的情况下，函数` memoizedCallback`的引用不变，也就是`useCallback`的第一个入参加函数会被缓存，从而达到渲染性能优化的目的。

不过能使用`useCallback`来实现的都能使用`useMemo`来实现： `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

有两个参数：

- 第一个是一个回调函数。
- 第二个参数是一个数组，数组中的`state` 发生改变才会重新执行回调函数。

> 注意：
>
> - 如果不传数组，则每次更新都会重新计算
> - 空数组，只会计算一次
> - 数组里面有依赖值，则当对应的值发生变化时，才会重新计算

## ## 举个 🌰

<iframe height="603" style="width: 100%;" scrolling="no" title="React Hook useMemo()" src="https://codepen.io/shuliqi/embed/XWaNzJO?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/XWaNzJO">
  React Hook useMemo()</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

整个例子跟`useMemo差不多的，只不过`useMemo` 返回的是值， 而`useCallback`返回的是一个函数。其功能都是一样的， 当前的依赖项是`count`， 当`count `发生改变时 `newValueFn` 会被触发。

关于 `useMemo`和`useCallback`的使用场景是什么？ 都有什么作用呢？能优化什么呢？ 这些问题，这篇文章文章会解答：

# useImperativeHandle

```js
useImperativeHandle(ref, createHandle, [deps]);
```

`useImperativeHandle`可以在使用`ref` 的时候自定义暴露给父组件的实例值。在大多数情况下，应当避免使用`ref`这样的命令式。`useImperativeHandle`应当与 `forwardRef`一起使用。

> 说白了就是子组件暴露给父组件实例使用

有三个参数：

- 参数 1: 子组件向父组件暴露的实例
- 参数 2：参数 2 是一个函数，传递的父组件可操作的实例和方法
- 参数 3: 监听状态， 更新的状态， 可以忽略

## 举个 🌰

<iframe height="818" style="width: 100%;" scrolling="no" title="React Hook useImperativeHandle" src="https://codepen.io/shuliqi/embed/vYJyWdx?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/vYJyWdx">
  React Hook useImperativeHandle</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

---

# useLayoutEffect

`useLayoutEffect` 与 `useEffect`是差不多的， 它们都是接受一个函数和一个数组， 只有数组里面的值发生了变化， 才会执行`effect`。

差异：

- `useEffect`是异步的，`useLayoutEffect` 是同步的
- `useEffect`的渲染时机是浏览器完成渲染之后， 而`useLayoutEffect` 是浏览器把内容真正渲染到浏览器之前，和`componentDidMount`是等价的。

## 举个 🌰

把`useEffect`替换成`useLayoutEffect`几乎是看不到任何问题的。 他们之前的区别是什么呢？ 我们来举个 🌰

- 使用 `useEffect`

  <iframe height="505" style="width: 100%;" scrolling="no" title="React Hook useState()" src="https://codepen.io/shuliqi/embed/ZEJzrby?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href="https://codepen.io/shuliqi/pen/ZEJzrby">
    React Hook useState()</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
    on <a href="https://codepen.io">CodePen</a>.
  </iframe>

上面例子中 点击 div，页面会更新一串随机数。当我们连续点击时，就会发现这串数字在发生抖动。这是因为当我们每次点击 `div`， count 会更新为 0， 之后 `useEffect` 内又把 `count `改为一串随机数。

所以页面会先渲染成 0，然后再渲染成随机数，由于更新很快，所以出现了闪烁。

> 刨根问底就是因为：`useEffect`的渲染时机是浏览器完成渲染之后

- 使用`useLayoutEffect`

  如果我们把上面的例子改用`useLayoutEffect`。 我们来看看效果：

  <iframe height="501" style="width: 100%;" scrolling="no" title="React Hook useLayoutEffect()" src="https://codepen.io/shuliqi/embed/eYEBKXj?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href="https://codepen.io/shuliqi/pen/eYEBKXj">
    React Hook useLayoutEffect()</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
    on <a href="https://codepen.io">CodePen</a>.
  </iframe>

  我们可以看出来闪烁消失了。

  相比使用 `useEffect`，当你点击 `div`，`count `更新为 0，此时页面并不会渲染，而是等待` useLayoutEffect` 内部状态修改后，才会去更新页面，所以页面不会闪烁。

  > 刨根问底就是因为：`useLayoutEffect` 是浏览器把内容真正渲染到浏览器之前。

  ## 总结

- `useLayoutEffect `相比 `useEffect`，通过同步执行状态更新可解决一些特性场景下的页面闪烁问题。

- `useEffect `可以满足百分之 99 的场景，而且`useLayoutEffect`会阻塞渲染，请谨慎使用。

---

# useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

`useReducer`是`useState`的升级版（实际上是原始版）， 可以实现复杂的逻辑修改，而不是像`useState`那样只是直接赋值修改。

> 在 `React` 源码中，实际上`useState`是由`useReducer`实现的，所以准确来说`useReducer`是`useState `的原始版

`useReducer` 通常传入两个参数：

- 第一个参数：由`dispatch`引发的数据修改的处理函数
- 第二个参数：自定义数据的默认值

## 举个 🌰

<iframe height="722" style="width: 100%;" scrolling="no" title="React Hook useReducer" src="https://codepen.io/shuliqi/embed/zYdZGON?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shuliqi/pen/zYdZGON">
  React Hook useReducer</a> by shuliqi (<a href="https://codepen.io/shuliqi">@shuliqi</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
