<script lang="ts" name="javascriptMap" setup>
import {ref} from 'vue';
interface Tree {
  label: string,
  children?: Tree[]
}
const data: Tree[] = [
  {
    label: "数组的方法(查找符合条件8,遍历是否数组连接7,增删截取排序9,扁平累加填充6,of和keys4)",
    children: [
      {
        label: "indexOf",
        children: [
          {label: "返回指定元素在数组中的索引，若无指定元素，返回-1"},
          {label: "从第一个元素开始查找，开始出现指定元素的下标"},
          {label: "参数1:必须，查找的元素值。参数2:可选，默认为下标0，支持负数"},
          {label: "数组和字符串皆可用，字符串indexOf(2)和indexOf('2')一样，数组则不一样"},
          {label: "findIndex传入一个回调函数作为参数，indexOf传入查找元素作为参数"},
          {label: "findIndex传入一个回调函数作为参数，indexOf传入查找元素作为参数"},
          {label: "findIndex传入一个回调函数作为参数，indexOf传入查找元素作为参数"},
          {label: "eg: [33,'333'].indexOf('33');"}
        ]
      },
      {
        label: "lastIndexOf",
        children: [
          {label: "跟indexOf区别：一个是开始出现指定元素的下标，一个是最后出现指定元素的下标"},
          {label: "参数1:必须，查找的元素值。参数2:可选，默认为下标0，支持负数"},
        ]
      },
      {
        label: "includes",
        children: [
          {"label": "判断一个数组是否包含一个指定的元素，返回布尔值true或false"},
          {"label": "参数1:必须，查找的元素值。参数2:可选，默认为下标0，支持负数"},
          {"label": "eg: console.log([3,333,66].includes(3,-3));"}
        ]
      },
      {
        label: "map",
        children: [
          {"label": "对数组的元素进行操作，返回一个新的数组"},
          {"label": "回调函数callback,参数1：成员，参数2：下标，参数3：数组本身"},
          {"label": "eg: const newArr = arr.map(item => item.sum = item.add1 + item.add2);//注意返回的是item.sum，不是item"}
        ]
      },
      {
        label: "forEach",
        children: [
          {"label": "可以对原数组的元素进行操作，改变原数组，没有返回值(返回undefined)"},
          {"label": "eg: const arr2 = arr1.forEach(item => {if (item.name === 'klein') {item.name = 'ccc';}})"}
        ]
      },
      {
        label: "isArray",
        children: [
          {"label": "判断一个变量是否为数组,返回布尔值true或者false"},
          {"label": "eg: console.log(Array.isArray(变量))"}
        ]
      },
      {
        label: 'from',
        children: [
          {"label": "把拥有length属性的对象或可迭代对象来返回一个数组。(类数组变数组)"},
          {"label": "eg: log(Array.from('2323'));log(Array.from(new Set([23,2323,23])));log(Array.from(new Set('23332224444')));"}
        ]
      },
      {
        label: "join",
        children: [
          {"label": "把数组的每个元素拼接成字符串，默认以逗号相隔，可传入分隔的元素"},
          {"label": "不会改变原数组"}
        ]
      },
      {
        label: "toString",
        children: [
          {"label": "把数组的每个元素拼接成字符串，用逗号相隔，不需要传入参数"},
          {"label": "join可以控制更多的分隔符号，toString可以支持更多的数据类型使用(数字,对象等)"},
          {"label": "const obj = {a:33};log(obj.toString() === '[object Object]');//结果true"},
          {"label": "const num = 2233;log(num.toString());//数字使用toString,要用变量"},
          {"label": "eg: log([23,77].toString())"}
        ]
      },
      {
        label: "concat",
        children: [
          {"label": "连接两个或者多个数组，不会改变原数组，返回一个新数组"},
          {"label": "eg: const arr1 = [2];const arr2 = [3];const arr3 = [333];log(arr1.concat(arr2, arr3));"},
          {"label": "扩展运算符...，也可以连接两个或者多个数组，不会改变原数组，返回一个新数组，更常用"}
        ]
      },
      {
        label: "unshift",
        children: [
          {"label": "数组的开头添加一个元素或者多个元素"},
          {"label": "返回新数组的长度"},
          {"label": "eg: const arr = []; arr.unshift(3);"}
        ]
      },
      {
        label: "push",
        children: [
          {"label": "数组的末尾添加一个元素或者多个元素"},
          {"label": "返回新数组的长度"},
          {"label": "eg: const arr = []; arr.push(3);"}
        ]
      },
      {
        label: "shift",
        children: [
          {"label": "删除数组开头第一个元素，没有第一个元素，不删除"},
          {"label": "返回被删除的元素，没有被删除元素，返回undefined"},
          {"label": "eg: const arr = [3]; arr.shift();"}
        ]
      },
      {
        label: "pop",
        children: [
          {"label": "删除数组末尾最后一个元素，没有最后一个元素，不删除"},
          {"label": "返回被删除的元素，没有被删除元素，返回undefined"},
          {"label": "eg: const arr = [3]; arr.pop();"}
        ]
      },
      {
        label: "splice",
        children: [
          {"label": "数组添加或删除元素"},
          {"label": "splice会改变原数组"},
          {"label": "返回一个数组(包含删除的元素)，没有删除元素，返回空数组"}
        ]
      },
      {
        label: "slice",
        children: [
          {"label": "返回截取数组中被选中的元素,不会改变原数组"},
          {"label": "参数1:开始下标，可选，可以负数;参数2:结束下标，可选，可以负数"},
          {"label": "数组(字符串)的方法，没有选中的元素，数组返回空数组，字符串返回空串"},
          {"label": "eg: log([2444,349].slice(-3, -5));"}
        ]
      },
      {
        label: "at",
        children: [
          {"label": "匹配给定索引的元素，如果找不到指定索引返回undefined"},
          {"label": "at比数组[0]更简洁，且支持负数"},
          {"label": "eg: log([2,3,4,6].at(-2), [3].at(3));const arr1 = [5,6,7,8];log(arr1[3],arr1[-1],arr1[4]);"}
        ]
      },
      
      {
        label: "reverse",
        children: [
          {"label": "颠倒数组元素的顺序,字符串无此方法"},
          {"label": "eg: console.log([369].reverse());"}
        ]
      },
      {
        label: "sort",
        children: [
          {"label": "对数组进行排序,会改变原数组"},
          {"label": "可选参数，参数为回调函数。"},
          {"label": "eg: const ff = ['33',5,7];log(ff.sort((a, b) => a-b));"},
          {"label": "eg: const ff1= ['33',7];log(ff1.sort());//'注意是数字1,还是字符串1'"}
        ]
      },
      {
        label: "reduce",
        children: [
          {"label": "可以接收一个函数作为累加器(从左到右)，空数组不能执行reduce"},
          {"label": "不改变原数组"},
          {"label": "参数1：必须，函数，参数2：可选，初始值"},
          {"label": "eg: const arr1 = [100, 10, 5];const arr2 = arr1.reduce((a, b) => a - b);console.log(arr1, arr2);"}
        ]
      },
      {
        label: "reduceRight",
        children: [
          {"label": "可以接收一个函数作为累加器(从右到左)，空数组不能执行reduce"},
          {"label": "不改变原数组"},
          {"label": "参数1：必须，函数，参数2：可选，初始值"},
          {"label": "eg: const arr1 = [100, 10, 5];const arr2 = arr1.reduceRight((a, b) => a - b);console.log(arr1, arr2);"}
        ]
      },
      { 
        label: "flat",
        children: [
          {"label": "将多维数组降维,默认参数为1,最大为Infinity,不改变原数组"},
          {"label": "const myArr = [3,33,[6,88,[999]]];log(myArr.flat(Infinity), myArr,myArr.flat(2));"}
        ]
      },
      {
        label: "flatMap",
        children: [
          {"label": "先map,再flat(depth为1),不会改变原数组"},
          {"label": "const arr2 = [[3,4],[5,6]];log(arr2.flatMap((val,ind,list) => {console.log(val,ind,list);const [xx,xxx] = val;return [xx*2, xxx*5];}));"}
        ]
      },
      {
        label: 'fill',
        children: [
          {"label": "使用一个固定值替换数组的元素，会改变原数组"},
          {"label": "参数1:固定值,必填,参数2:非必填，下标,可负数，参数3:同参数2"},
          {"label": "eg: const arr = [33,66,99];log(arr.fill(88),arr,arr.fill(99,-3,-2));"}
        ]
      },
      {
        label: 'copyWithin',
        children: [
          {"label": "会改变原数组,替换复制的元素(替换长度不会超过复制元素的长度),不会改变数组的长度"},
          {"label": "参数1:必填，指定索引;参数2:复制开始索引,可选;参数3:复制结束索引,可选"},
          {"label": "3个参数都可以为负数"},
          {"label": "eg: const aa = [3,4,5,6,99,7,8,9];log(aa.copyWithin(3,0),aa);"}
        ]
      },
      {
        label: "valueOf",
        children: [
          {"label": "返回Array对象的原始值(官方解释，eg对不上，不知如何理解)"},
          {"label": "eg:const arr1 = [333];arr1.splice(0,0,666);console.log(arr1, arr1.valueOf());//结果一样"}
        ]
      },
      {
        label: 'of',
        children: [
          {"label": "将一组值转换为数组，不考虑参数的数量或类型"},
          {"label": "Array.of()和Array()构造函数之间的区别在于对单个函数的处理"},
          {"label": "Array.of(7)创建一个具有单个元素7的数组，而Array(7)创建一个length为7的数组"},
          {"label": "eg: log(Array.of(33,455,'333'));"}
        ]
      },
      { 
        label: 'keys',
        children: []
      },
      {
        label: 'entries',
        children: []
      }
    ]
  },
  {
    label: "字符串的方法(截取,包含)",
    children: [
      {
        label: "slice",
        children: [
          {label: "截取两个指定下标的字符,没有返回空串"},
          {label: "参数1:必填,下标,可负数;参数2:非必填,下标,可负数,默认到结束处字符"},
          {label: "eg: log('2345'.slice(-3,-2));"},
          {label: "区别：ECMAscript 没有对该substr方法进行标准化，因此反对使用它。"},
          {label: "substr是开始下标和截取长度"},
          {label: "slice不能颠倒参数顺序，substring始终会按大小颠倒参数顺序(负数下标转换为0)"},
          {label: "log('34567'.slice(3,-1),'34567'.substring(3,-1));"},
          {label: "charAt是指定下标的元素，不是两个下标之间的元素"}
        ]
      },
      {
        label: "substr",
        children: [
          {label: "截取开始下标n个长度的字符,没有返回空串"},
          {label: "参数1:必填，下标，可负数，参数2：非必填，长度，超出和不填默认到结束处字符"},
          {label: "eg: log('56789'.substr(-3,6));//start,length"}
        ]
      },
      {
        label: "substring",
        children: [
          {label: "截取两个指定下标的字符,没有返回空串"},
          {label: "参数1:必填,下标,负数会变0;参数2:非必填,下标,负数会变0,默认到结束处字符,会根据大小颠倒参数顺序"},
          {label: "log('34567'.substring(2,-5));"}
        ]
      },
      {
        label: "charAt",
        children: [
          {label: "返回指定下标的元素，负数或者超出字符串长度，返回空串"},
          {label: "eg: log('2356'.charAt(6), '56'.charAt(0));"}
        ]
      },
      {
        label: "charCodeAt",
        children: [
          {label: "返回指定下标的元素的Unicode编码，负数或者超出字符串长度，返回NaN"},
          {label: "eg: log('789'.charCodeAt(8), '32'.charCodeAt(0));"},
          {label: "NaN == NaN为false,'33'.charCodeAt(33))为真"}
        ]
      },
      {
        label: 'fromCharCode',
        children: [
          {label: "将拥有unicode的一个值，转换成一个字符串,参数非数字，ts会有警告"},
          {label: "log(String.fromCharCode(55))"}
        ]
      },
      {
        label: "startsWith",
        children: [
          {label: "以指定的子字符串开头，返回true,否则false"},
          {label: "参数1:必填,查找字符串，参数2：选填，不支持负数查找"},
          {label: "对大小写敏感，对数字或字符串不敏感，建议写成字符串，数字会冒红"},
          {label: "eg: log('4567aA'.startsWith('4',0));"}
        ]
      },
      {
        label: "endsWith",
        children: [
          {label: "以指定的子字符串结尾，返回true,否则false"},
          {label: "参数1:必填,查找字符串，参数2：选填，不支持负数查找"},
          {label: "对大小写敏感，对数字或字符串不敏感，建议写成字符串，数字会冒红"},
          {label: "eg: log('4567aA'.endsWith('7',4));"}
        ]
      },
      {
        label: "indexOf",
        children: [
          {label: "返回指定字符串首次出现的位置,没有匹配返回-1"},
          {label: "参数1:必填,查找字符串，参数2：选填，不支持负数查找"},
          {label: "对大小写敏感，对数字或字符串不敏感，建议写成字符串，数字会冒红"},
          {label: "eg: log('4567aA'.indexOf('7',-8));"}
        ]
      },
      {
        label: "lastIndexOf",
        children: [
          {label: "返回指定字符串最后出现的位置,没有匹配返回-1"},
          {label: "对大小写敏感，对数字或字符串不敏感，建议写成字符串，数字会冒红"},
          {label: "参数1:必填,查找字符串，参数2：怎么填都有问题的样子"},
          {label: "第二个参数有问题,匹配不到"},
          {label: "eg: log('456788a7A'.lastIndexOf('8',2));"}
        ]
      },
      {
        label: "includes",
        children: [
          {label: "包含指定字符串，返回true，否则false"},
          {label: "对大小写敏感，对数字或字符串不敏感，建议写成字符串，数字会冒红"},
          {label: "参数1:必填,查找字符串，参数2：选填,开始下标，负数会转换为0(数组不会)"},
          {label: "eg: log('456788b7A'.includes('4',-1));"}
        ]
      },
      {
        label: "split",
        children: [
          {label: "把一个字符串分割成数组"},
          {label: "参数1：可选，默认空串，全部分割；参数2：可选，数字(限制)，根据前面的分割规则，控制数组的长度"},
          {label: "eg: log('asdfads'.split('',3));"}
        ]
      },
      {
        label: "toString",
        children: [
          {label: "将字符串转为字符串，等于没变"},
          {label: "eg: log('adsa 33'.toString());"}
        ]
      },
      {
        label: "valueOf",
        children: [
          {label: "返回字符串的原始值"},
          {label: "数组也有这个方法，属实不知道怎么理解"}
        ]
      },
      {
        label: "concat",
        children: [
          {label: "用于连接两个字符串或者多个字符串，不会改变原字符串"},
          {label: "+和concat的空格，在js不会被省略，在Html,多个就会被省略成一个"},
          {label: "eg: const str1 = '23 33';const str2 = '  dd3         ';const str3 = 'adsfa W 3';log(str1.concat(str2, str3));log(str1+str2+str3);"}
        ]
      },
      {
        label: "toLowerCase",
        children: [
          {label: "把字符串(中的所有大写字母)转换为小写"},
          {label: "eg: log('aAAAdfad33'.toLowerCase());"}
        ]
      },
      {
        label: 'toUpperCase',
        children: [
          {label: "把字符串(中的所有小写字母)转为大写"},
          {label: "eg: log('asd33ww'.toUpperCase());"}
        ]
      },
      {
        label: "toLocaleLowerCase",
        children: [
          {label: "根据本地主机的语言环境把字符串转换为小写"},
          {label: "本地是根据浏览器的语言设置来判断的"},
          {label: "eg: log('adf33hWFH'.toLocaleLowerCase());"}
        ]
      },
      {
        label: "toLocaleUpperCase",
        children: [
          {label: "根据本地主机的语言环境把字符串转换为小写"},
          {label: "本地是根据浏览器的语言设置来判断的"},
          {label: "eg: log('adf33hWFH'.toLocaleUpperCase());"}
        ]
      },
      {
        label: "trim",
        children: [
          {label: "删除字符串的头尾空白符(空白符包括:空格、制表符tab、换行符等其他空白符等)"},
          {label: "不会改变原始字符串"},
          {label: "eg: log(str.trim(), str, str.trim() === str);"}
        ]
      },
      {
        label: "trimLeft",
        children: [
          {label: "替代品咋写"},
          {label: "deprecated强类反对"}
        ]
      },
      {
        label: "trimRight",
        children: [
          {label: "替代品咋写"},
          {label: "deprecated强烈反对"}
        ]
      }
    ]
  }
]
const handleNodeClick = () => {

}
const {log} = console;  
log(data[0]);
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// console.log(fruits.keys(),fruits.entries())
// const aa = [3,4,5,6,99,7,8,9];
// log(aa.copyWithin(-5,-3),aa);
log('adf33hWFH'.toLocaleUpperCase());
const temp ='54';
log('asdfads'.split('',3));
log('adsa 33'.toString());
</script>
