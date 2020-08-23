学习笔记

### 伪类
#### 最早针对超链接设计的
* :any-link 所有超链接
* :link :visited
* 以上两个属性设置之后，无法再次更改文字颜色外的属性，如果允许修改透明度，文字大小等将可能导致浏览器安全问题，用户被获取访问记录
* :hover
* :active
* :focus
* target
#### 树结构
* :empty
* :nth-child()
* :nth-last-child()
* :first-child :last-child :only-child
* 以上除了nth-child和first-child，其他的都是破坏了回溯原则的，可能浏览器的实现不好或者性能不好，尽量少用
#### 逻辑型
* :not()
* :where :has

**伪类选择器比较复杂，尽量不要再更很复杂的表达式，如果在css代码中出现了较复杂的选择器通常意味着html写的是不科学的，应该通过调整html结构和添加必要的class等方式解决**

### 伪元素
* ::before
* ::after
* ::first-line
* ::first-letter
