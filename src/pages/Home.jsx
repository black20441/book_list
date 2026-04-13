import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 读取静态JSON数据
    const fetchBooks = async () => {
      try {
        const response = await fetch('/data/books.json');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        // 处理中文字段名，转换为统一的字段名
        const processedBooks = data.map(book => ({
          title: book.title || book['书名'],
          author: book.author || book['作者'],
          publisher: book.publisher || book['出版社（日期）'],
          publishDate: book.publishDate || book['出版社（日期）'],
          isbn: book.isbn || book.ISBN || book['ISBN'] || Math.random().toString(36).substr(2, 9),
          category: book.category || book['分类']
        }));
        setBooks(processedBooks);
      } catch (err) {
        setError(err.message);
        // 使用模拟数据作为后备
        setBooks([
          {
            title: 'JavaScript高级程序设计',
            author: 'Nicholas C. Zakas',
            publisher: '人民邮电出版社',
            publishDate: '2020-01-01',
            isbn: '9787115521647',
            category: '技术'
          },
          {
            title: '百年孤独',
            author: '加西亚·马尔克斯',
            publisher: '南海出版公司',
            publishDate: '2011-06-01',
            isbn: '9787544253994',
            category: '文学'
          },
          {
            title: '人类简史',
            author: '尤瓦尔·赫拉利',
            publisher: '中信出版社',
            publishDate: '2014-11-01',
            isbn: '9787508645160',
            category: '历史'
          },
          {
            title: 'Python编程：从入门到实践',
            author: 'Eric Matthes',
            publisher: '人民邮电出版社',
            publishDate: '2016-07-01',
            isbn: '9787115428028',
            category: '技术'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">错误：{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">我的电子书单</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;