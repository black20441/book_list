import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookCard from '../components/BookCard';

const Category = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        // 筛选指定分类的书籍
        const filteredBooks = processedBooks.filter(book => book.category === category);
        setBooks(filteredBooks);
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
  }, [category]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">错误：{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← 返回首页
      </Link>
      
      <h1 className="text-3xl font-bold text-center mb-8">{category}类书籍</h1>
      
      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">该分类下暂无书籍</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;