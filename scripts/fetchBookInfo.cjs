const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 读取books.json文件
const booksPath = path.join(__dirname, '../public/data/books.json');
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

// 豆瓣图书API地址（使用第三方API）
const DOUBAN_API = 'https://book.feelyou.top/isbn/';

// 延迟函数，避免请求过于频繁
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取书籍信息
async function fetchBookInfo(isbn) {
  try {
    // 构建API请求URL
    const url = `${DOUBAN_API}${isbn}`;
    console.log(`发送请求: ${url}`);
    
    // 发送请求，设置超时时间
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000 // 10秒超时
    });
    
    console.log(`请求成功，状态码: ${response.status}`);
    
    // 处理API响应
    const data = response.data;
    console.log(`获取到数据:`, JSON.stringify(data, null, 2));
    
    // 返回书籍信息
    return {
      summary: data.summary || data.desc || '暂无简介',
      author_intro: data.author_intro || data.author || '暂无作者简介',
      tags: data.tags ? data.tags.map(tag => tag.name) : [],
      catalog: data.catalog || '暂无目录'
    };
  } catch (error) {
    console.error(`获取书籍信息失败 (ISBN: ${isbn}):`, error.message);
    if (error.response) {
      console.error('响应数据:', error.response.data);
      console.error('响应状态:', error.response.status);
    }
    return {
      summary: '暂无简介',
      author_intro: '暂无作者简介',
      tags: [],
      catalog: '暂无目录'
    };
  }
}

// 为所有书籍添加简介
async function addBookInfo() {
  console.log('开始获取书籍简介...');
  
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const isbn = book.isbn || book.ISBN || book['ISBN'];
    
    if (isbn) {
      console.log(`正在获取第 ${i + 1}/${books.length} 本书的信息: ${book.title || book['书名']} (ISBN: ${isbn})`);
      
      // 获取书籍信息
      const bookInfo = await fetchBookInfo(isbn);
      
      // 添加简介信息
      book.summary = bookInfo.summary;
      book.author_intro = bookInfo.author_intro;
      book.tags = bookInfo.tags;
      book.catalog = bookInfo.catalog;
      
      // 延迟2秒，避免请求过于频繁
      await delay(2000);
    } else {
      console.log(`第 ${i + 1}/${books.length} 本书缺少ISBN号: ${book.title || book['书名']}`);
      book.summary = '暂无简介';
      book.author_intro = '暂无作者简介';
      book.tags = [];
      book.catalog = '暂无目录';
    }
  }
  
  // 保存更新后的数据
  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  console.log('书籍简介获取完成，已更新books.json文件');
}

// 运行脚本
addBookInfo();
