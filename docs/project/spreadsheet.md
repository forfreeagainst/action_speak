# 电子表格

## 依赖

* xlsx

## 代码实现

### 导出功能

```js
<script setup lang="ts">
import { ref } from 'vue';
import * as XLSX from 'xlsx';
interface TableData {
  name: string;
  age: number;
}

const tableData = ref<TableData[]>([
  { name: '张三', age: 25 },
  { name: '李四', age: 30 }
]);
// console.log(XLSX)
const tableDataObj = ref();
const exportExcel = () => {
    // ref.value	组件实例	需要调用组件方法
    // ref.value?.$el	组件根 DOM	推荐用于导出 Excel

    // 获取 Dom元素
    const table = tableDataObj.value.$el;
    console.log("🚀 ~ exportExcel ~ table:", table)
    // const table = document.getElementById('export-table') as HTMLTableElement;
    // 2. 转换为工作表(注意：tableDataObj1.value.$el 才等于 document.getElementById('export-table'))
    const ws = XLSX.utils.table_to_sheet(table);
    // console.log("🚀 ~ exportExcel ~ ws:", ws)
    // 3. 创建工作簿并导出
    const wb = XLSX.utils.book_new();
    // console.log("🚀 ~ exportExcel ~ wb:", wb)
    // Sheet8表名
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet8');
    XLSX.writeFile(wb, '导出数据.xlsx');
}
</script>

<template>
  <el-button @click="exportExcel">导出 Excel</el-button>
  <el-table :data="tableData" id="export-table" ref="tableDataObj">
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
  </el-table>
</template>

<style lang="scss" scoped>

</style>
```

### 导入与导出

```js
<script setup lang="ts">
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { ElMessage } from 'element-plus';
interface TableData {
  name: string;
  age: number;
}

const tableData = ref<TableData[]>([
//   { name: '张三', age: 25 },
//   { name: '李四', age: 30 }
]);
// console.log(XLSX)
const tableDataObj = ref();
const exportExcel = () => {
    // ref.value	组件实例	需要调用组件方法
    // ref.value?.$el	组件根 DOM	推荐用于导出 Excel

    // 获取 Dom元素
    const table = tableDataObj.value.$el;
    console.log("🚀 ~ exportExcel ~ table:", table)
    // const table = document.getElementById('export-table') as HTMLTableElement;
    // 2. 转换为工作表(注意：tableDataObj1.value.$el 才等于 document.getElementById('export-table'))
    const ws = XLSX.utils.table_to_sheet(table);
    // console.log("🚀 ~ exportExcel ~ ws:", ws)
    // 3. 创建工作簿并导出
    const wb = XLSX.utils.book_new();
    // console.log("🚀 ~ exportExcel ~ wb:", wb)
    // Sheet8表名
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet8');
    XLSX.writeFile(wb, '导出数据.xlsx');
}
// 导入表格
const importExcel = (file: File) => {
//   console.log("🚀 ~ importExcel ~ file:", file)
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    try {
      // 1. 读取 Excel 数据
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      // 2. 获取第一张表的数据
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        // 取的是 excel的 第一行： 姓名和 年龄， 而姓名和年龄来自 表格的 label="姓名"
      const jsonData = XLSX.utils.sheet_to_json<TableData>(firstSheet);
      console.log("🚀 ~ importExcel ~ jsonData:", jsonData)

      // 3. 更新表格（可做数据校验）
      tableData.value = jsonData.map(row => ({
        name: row.name || '未知',
        age: Number(row.age) || 0,
      }));

      ElMessage.success('导入成功！');
    } catch (error) {
      ElMessage.error('文件解析失败');
    }
  };
  reader.readAsArrayBuffer(file);
  return false; // 阻止默认上传
};
</script>

<template>
      <el-upload
    accept=".xlsx, .xls"
    :show-file-list="false"
    :before-upload="importExcel"
  >
    <el-button>导入 Excel</el-button>
  </el-upload>
  <el-button @click="exportExcel">导出 Excel</el-button>
  <el-table :data="tableData" id="export-table" ref="tableDataObj">
    <el-table-column prop="name" label="name" />
    <el-table-column prop="age" label="age" />
  </el-table>
</template>

<style lang="scss" scoped>

</style>
```

## 参考

* https://docs.sheetjs.com/docs/demos/frontend/vue/
* https://sheetjs.com/
* https://sheetjs.com/demo/table