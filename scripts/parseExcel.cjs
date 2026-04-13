const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// 读取Excel文件
const workbook = XLSX.readFile('书单.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 转换为JSON
const books = XLSX.utils.sheet_to_json(worksheet);

// 确保数据目录存在
const dataDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 写入JSON文件
fs.writeFileSync(
  path.join(dataDir, 'books.json'),
  JSON.stringify(books, null, 2)
);

console.log('Excel数据解析完成，已生成books.json文件');
console.log(`共解析了 ${books.length} 本书籍`);
console.log('前5本书籍：');
console.log(JSON.stringify(books.slice(0, 5), null, 2));