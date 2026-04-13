import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">我的电子书单</h2>
            <p className="text-gray-400 mt-2">记录和分享我的阅读之旅</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">关于</a>
            <a href="#" className="text-gray-400 hover:text-white">联系我们</a>
            <a href="#" className="text-gray-400 hover:text-white">隐私政策</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>© 2026 我的电子书单. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;