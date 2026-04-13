import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // 搜索功能可以在后续扩展
    console.log('搜索:', searchTerm);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              我的电子书单
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">首页</Link>
            <Link to="/category/技术" className="text-gray-700 hover:text-blue-600">技术</Link>
            <Link to="/category/文学" className="text-gray-700 hover:text-blue-600">文学</Link>
            <Link to="/category/历史" className="text-gray-700 hover:text-blue-600">历史</Link>
          </div>
          
          <div className="relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="搜索书籍..."
                className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                搜索
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;