学习笔记

### HTML 相关
* 必会的转义：\&quot;双引号  \&amp;&符 \&lt;小于号  \&gt;大于号  这些是可以用于属性值的

### DOM API
* DOM树
#### Node
##### Element 元素型节点，跟标签相对应
###### HTMLElement
* HTMLAnchoElement  html的a标签
* HTMLAreaElement
* HTMLBaseElement
* ...
###### SVGElement 
* SVGAElement  svg的a标签
* SVGAltGlyphElement
* ...
##### Documnet 文档根节点
##### CharacterData 字符数据
###### Text:文本节点
###### Comment:注释
###### ProcessingInstruction:处理信息
##### DocumentFragment 文档片段
##### DocumentType 文档类型

#### 导航类操作
* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling
* parentElement
* children
* firstElementChild
* lastElementChild
* nextElementSibling
* previousElementSibling

#### 修改操作
* appendChild
* insertBefore
* removeChild
* replaceChild

#### 高级操作

* compareDocumentPosition 用于比较两个节点中关系的函数
* contains 检查一个节点是否包含另一个节点函数
* isEqualNode 检查两个节点是否完全相同，检查树结构
* isSameNode 检查两个节点是否是同一个节点，在js中使用===就可以判断，但其他语言可能会用到
* cloneNode 复制一个节点，如果传入参数true，则会连同子元素进行深拷贝

#### Range API
##### 创建Range
* var range = new Range();
* range.setStart(element,9);
* range.setEnd(element,4);
* var range = document.getSelection().getRangeAt(0);
##### API
* range.setStartBefore
* range.setEndBefore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents

* 将选取的内容取下(删)： 
var fragment = range.extractContents();
* 插入 
range.insertNode(document.createTextNode('aaaa'));
* 一个问题：把一个元素所有的子元素进行逆序排列，123->321
* 相关知识点：1.获取到的元素会根据操作实时变化的 2.对元素进行insert操作，如果元素已经在dom树，是会被自动remove再insert的，无需手动remove
* 使用insert是最简单的方式，但也可以使用Range API进行进行高效操作实现完美答案
* 一个基础的比较好的答案
``` 
let element = document.getElementById("a")
function reverseChildren(element){
  var l = element.childNodes.length;
  while(l-- > 0){
    element.appendChild(element.childNodes[l]);
  }
}
reverseChildren(element);
 ```
 * 使用Range API 的答案
 ``` 
let element = document.getElementById("a");

function reverseChildren(element){
  let range = new Range();
  range.selectNodeContents(element);

  let fragment = range.extractContents();
  var l = fragment.childNodes.length;
  while(l-- > 0){
    fragment.appendChild(fragment.childNodes[l]);
  }
  element.appendChild(fragment);
}
reverseChildren(element);
 ```

### CSSOM

#### Rules
* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule('p{color:pink;}',0)
* document.styleSheets[0].removeRule(0)

#### getComputedStyle
* window.getComputedStyle(elt,pseudoElt);
  * elt 想要获取的元素
  * pseudoElt 可选，伪元素
#### window 

* window.innerHeight,window.innerWidth  //显示
* window.outerWidth,window.outerWidth  //浏览器完整
* window.devicePixelRatio  // 屏幕物理像素和代码逻辑像素比值
* window.screen
  * window.screen.width
  * window.screen.height
  * window.screen.availWidth
  * window.screen.availHeight

* window.open('about:blank','_blank','width=100,height=100,left=100,right=100')
* moveTo(x,y)
* moveBy(x,y)
* resizeTo(x,y)
* resizeBy(x,y)

#### scroll

* scrollTop   //当前滚动到的位置
* scrollLeft
* scrollWidth   //可滚动内容的最大高度和宽度
* scrollHeight
* scroll(x,y)   //滚动到
* scrollBy(x,y)  //滚动指定
* scrollIntoView()  //滚动到可见位置

* window
  * scrollX
  * scrollY
  * scroll(x,y)
  * scrollBy(x,y)

* layout
  * getClientRects()  //所有的盒
  * getBoundingClientRect()  // 生成外层包裹的盒

### 其他
  
  #### 标准化
  * khronos
    * WebGL
  * ECMA
    * ECMAscript
  * WHATWG
    * HTML
  * W3C
    * webaudio 
    * CG/WG

* 9节中讲述获取浏览器api方法

let names = Object.getOwnPropertyNames(window);

let js = new Set();
let objects = ['globalThis','console','BigInt','BigInt64Array'...];
objects.forEach(o=>js.add(o));
names = names.filter(e=>!js.has(e));