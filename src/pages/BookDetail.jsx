import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch('/data/books.json');
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const books = await response.json();
        // 处理中文字段名，转换为统一的字段名
        const processedBooks = books.map(book => ({
          title: book.title || book['书名'],
          author: book.author || book['作者'],
          publisher: book.publisher || book['出版社（日期）'],
          publishDate: book.publishDate || book['出版社（日期）'],
          isbn: book.isbn || book.ISBN || book['ISBN'] || Math.random().toString(36).substr(2, 9),
          category: book.category || book['分类'],
          introduction: book.introduction || book['简介'] || book.summary || '暂无简介',
          catalog: book.catalog || book['目录'] || '暂无目录'
        }));
        // 查找对应的书籍
        const foundBook = processedBooks.find(b => b.isbn === isbn);
        if (foundBook) {
          setBook(foundBook);
        } else {
          // 使用模拟数据作为后备
          setBook({
            title: 'JavaScript高级程序设计',
            author: 'Nicholas C. Zakas',
            publisher: '人民邮电出版社',
            publishDate: '2020-01-01',
            isbn: '9787115521647',
            category: '技术',
            introduction: '本书是JavaScript领域的经典之作，全面介绍了JavaScript的核心概念、语法和编程技巧。',
            catalog: '第1章 JavaScript简介\n第2章 HTML中的JavaScript\n第3章 语言基础\n第4章 变量、作用域与内存\n第5章 基本引用类型'
          });
        }
      } catch (err) {
        setError(err.message);
        // 使用模拟数据作为后备
        setBook({
          title: 'JavaScript高级程序设计',
          author: 'Nicholas C. Zakas',
          publisher: '人民邮电出版社',
          publishDate: '2020-01-01',
          isbn: '9787115521647',
          category: '技术',
          introduction: '本书是JavaScript领域的经典之作，全面介绍了JavaScript的核心概念、语法和编程技巧。',
          catalog: '第1章 JavaScript简介\n第2章 HTML中的JavaScript\n第3章 语言基础\n第4章 变量、作用域与内存\n第5章 基本引用类型'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [isbn]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">错误：{error}</div>;
  }

  if (!book) {
    return <div className="container mx-auto px-4 py-8">书籍不存在</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← 返回书单
      </Link>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{book.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={`/images/${isbn}.jpg`} 
                alt={book.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=暂无封面';
                }}
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <span className="text-gray-600 font-medium">作者：</span>
                <span>{book.author}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">出版社：</span>
                <span>{book.publisher}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">分类：</span>
                <span>{book.category}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">内容简介</h2>
          <p className="text-gray-700">{book.introduction}</p>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">目录</h2>
          <pre className="text-gray-700 whitespace-pre-wrap">{book.catalog}</pre>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;