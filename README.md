# 个人电子书单项目

这是一个基于React和Tailwind CSS开发的个人电子书单网站，用于展示和管理个人阅读书单。

## 快速访问

扫描下方二维码访问电子书单网站：

<img src="./QR.png" alt="电子书单二维码" width="12.5%" />

## 项目功能

- 📚 展示书籍列表，支持响应式布局
- 📖 查看书籍详细信息
- 🏷️ 按分类筛选书籍
- 🔍 搜索功能（基础版）
- 📱 适配手机、平板和桌面设备

## 项目结构

```
book_list/
├── src/               # 源代码目录
│   ├── components/    # 组件目录
│   │   ├── Header.jsx     # 头部导航组件
│   │   ├── Footer.jsx     # 页脚组件
│   │   └── BookCard.jsx   # 书籍卡片组件
│   ├── pages/         # 页面目录
│   │   ├── Home.jsx       # 首页（书籍列表）
│   │   ├── BookDetail.jsx # 书籍详情页
│   │   └── Category.jsx   # 分类页
│   ├── App.jsx        # 应用主组件（路由配置）
│   ├── main.jsx       # React应用入口
│   └── index.css      # 全局样式（Tailwind CSS配置）
├── public/            # 静态资源目录
│   └── data/          # 数据目录
│       └── books.json # 解析后的书籍数据
├── scripts/           # 脚本目录
│   └── parseExcel.cjs # Excel解析脚本
├── dist/              # 构建产物目录
├── 书单.xlsx          # 原始书单数据
├── package.json       # 项目配置和依赖管理
└── vite.config.js     # Vite构建工具配置
```

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite 3.2.0
- **样式方案**：Tailwind CSS 3
- **路由管理**：React Router 6
- **数据处理**：xlsx 库（Excel解析）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 解析Excel数据

将你的书单以Excel格式保存为 `书单.xlsx`，然后运行：

```bash
npm run parse
```

这会生成 `public/data/books.json` 文件。

### 3. 开发模式运行

```bash
npm run dev
```

然后在浏览器中访问 http://localhost:5173

### 4. 构建生产版本

```bash
npm run build
```

构建产物将在 `dist` 目录中。

## 部署

### Netlify部署（推荐）

1. **登录Netlify**：访问 [https://www.netlify.com](https://www.netlify.com) 并登录
2. **连接GitHub仓库**：
   - 点击「Add new site」→「Import an existing project」
   - 选择「GitHub」作为Git provider
   - 授权Netlify访问你的GitHub账号
   - 在仓库列表中找到并选择 `book_list` 仓库
3. **配置部署设置**：
   - **Build command**：输入 `npm run build`
   - **Publish directory**：输入 `dist`
   - 点击「Deploy site」按钮
4. **获取访问链接**：部署完成后，Netlify会生成一个访问链接

### GitHub Pages

1. 将 `dist` 目录内容推送到GitHub仓库
2. 在仓库设置中启用Pages功能
3. 选择 `dist` 目录作为部署源

### 其他静态托管服务

- **Vercel**：直接导入GitHub仓库，自动部署
- **AWS S3**：上传 `dist` 目录内容到S3存储桶，启用静态网站托管
- **阿里云OSS**：创建存储桶并开启静态网站托管，上传 `dist` 目录内容

## 数据更新

1. 修改 `书单.xlsx` 文件
2. 运行 `npm run parse` 重新生成数据
3. 重新构建并部署

## 注意事项

- 项目支持处理中文字段名，Excel文件中的字段名可以使用中文（如"书名"、"作者"）
- 书籍详情页的ISBN处理逻辑已优化，支持不同格式的ISBN字段
- 分类页支持按分类筛选书籍

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT
