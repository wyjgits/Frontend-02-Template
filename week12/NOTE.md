学习笔记

## 组件概念
对象
* Properties
* Methods
* Inherit
组件
* Properties
* Methods
* Inherit
* Attribute
* Config & State  //配置参数和状态
* Event   //事件
* Lifecycle   //生命周期
* Children   //树形结构

用户操作->影响state->影响组件Children
组件使用者向组件传递attribute,Method,Property
组件开发者使用Event向组件使用者传递信息

##### Attribute & Property

* Attribute 强调描述性
* Property  强调从属关系

```
  Attribute:
  <my-component attribute="v">
  myComponent.getAttribute("a");
  myComponent.setAttribute("a","value");

  Property:
  myComponent.a = "value"
```
```
<a href="//m.taobao.com"></a>
<script>
  var a = document.getElementByTagName('a');
  a.href  //'http://m.taobao.com',url是resolve过的结果
  a.getAttribute('href')  //'m.taobao.com' 跟HTML代码中完全一致
</script>
```

在input中的attr相当于是一个默认值，优先使用property
