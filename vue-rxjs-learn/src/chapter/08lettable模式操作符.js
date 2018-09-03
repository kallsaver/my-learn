// operators是个文件夹,所以会去查找index.js文件
// 在RxJs的架构里面,operators目录的index.js被放在operators目录同级的Operators.js
// 功能都是引入operators目录下的所有文件(所有lettable操作符)
// 有Tree Shakeing功能的打包器引入rxjs/Operators可以分析哪些函数被用了
// 当然也可以import rxjs/operators/map这种方式

// pipe操作符和let操作符一样,只是版本迭代向后兼容的原因
// RxJs给Observale的类自带了pipe操作符,这样就不用引入let操作符了
// lettable操作符和pipeable操作符是同一个东西不同阶段的称呼

// import {of} from 'rxjs/observable/of';
// import {map, filter} from 'rxjs/operators';

// const source$ = of(1, 2, 3, 4);

// const result$ = source$.pipe(
//     filter(x => x % 2 === 0),
//     map(x => x * x)
// );

// result$.subscribe(item => console.log(item));

// 使用pipeline-operator语法

import {of} from 'rxjs/observable/of';
import {map, filter} from 'rxjs/operators';

// of产生的是Cold Observale
const source$ = of(1, 2, 3, 4);

const result$ = source$
  |> filter(x => x % 2 === 0)
  |> map(x => x * x)

result$.subscribe(console.log)





