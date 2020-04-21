/**
 *  await的意思就是等待，他的后面可以跟一个表达式。如果是值（字符串，数字，普通对象）返回就是本身的值，不过
 *  最常用的是后面跟着一个promise对象,await会等待promise的状态有pedding装换为fulfilled或者rejected，在此期间他会阻塞
 * 后面的语句，如果promise的对象结果为resolve，他将会获取他的值作为await表达式的运算结果
 */