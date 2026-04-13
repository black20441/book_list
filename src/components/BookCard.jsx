import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  // 处理中文字段名
  const title = book.title || book['书名'];
  const author = book.author || book['作者'];
  const publisher = book.publisher || book['出版社（日期）'];
  const publishDate = book.publishDate || book['出版社（日期）'];
  const isbn = book.isbn || book.ISBN || book['ISBN'] || Math.random().toString(36).substr(2, 9);
  
  // 封面图片路径
  const coverImage = `/images/${isbn}.jpg`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=暂无封面';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">作者：{author}</p>
        <p className="text-sm text-gray-600 mt-1">出版社：{publisher}</p>
        <div className="mt-4">
          <Link 
            to={`/book/${isbn}`} 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;