import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/combineLatest';

// 如果要合并完全独立的Observable对象,使用combineLastest
// 如果把一个Observable对象的基础上映射新的Observable,
// 并且需要从其他Observable获取数据用withLatestFrom组合符
