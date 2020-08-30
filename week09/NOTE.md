学习笔记

## TicTacToe
## async异步编程
* 小节中接触到generator函数，之前都是简单看没有实际使用，这是第一次进行使用
```
function* start(){
  light();
  yield sleep();
  light();
  yield sleep();
  light();
  yield sleep();
}
```
使用yield作为点，使用迭代器的next()方法执行下一步，具体看代码

### todo：五子棋、二叉堆