学习笔记

一、运算符和表达式
优先级：
1.Member（成员）    a.b   a[b] foo`string`   super.b  super[b]  new.target new Foo()
2.New  new Foo

∴ new a()()先运算new a()  再执行new a()的结果
   new new a()  也是先执行new a() 在执行 最前的new
这一小部分两个内容没见过，foo`string` 和 new.target
经过测试，函数名后加模板字符串，会把字符串作为数组传入，数组中的内容由${}进行分割，其中内容并不不会被传入
例如foo2`我今年${b}岁，来这里${a}年`，最终传入的参数为["我今年", "岁，来这里", "年"]
new.target是用于检测函数是否被new调用的，需要在函数内使用，当函数直接调用返回undefined，使用new时返回被执行的函数。

运行时：Reference, a.b访问属性，取出的是b的引用
分为Object和key两个部分，也就会存储下a和b两个部分，当直接使用时，就会进行解引用，直接拿到b的值进行操作，而当使用delete或者assign时就需要知道是哪个对象的那个属性，这个时候其实就不怎么关心值
这个点解答了我一直对delete和正常使用的区别上的困惑。

3.Call(函数调用)   foo() super() foo().b foo()['b'] foo()`abc`
由此也看到出现变化，当Member在()后使用是会被降级为Call Exp，先执行函数调用
例子：new a()['b'],括号会先和结合，然后按照优先级先执行new再执行Call

左手和右手运算
a.b=c  可  a.b是Left Handside
a+b=c  不可  a+b是Right Handside
不能在等号左边的就是Right Handside,Left 一定是Rigt
4. Update Expression :a++   a-- --a ++a，
++ a ++ 会先和后面的结合  这是不合法的

5.Unary（单目运算符）
