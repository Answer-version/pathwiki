# PathWiki - 全球学习路线平台

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=flat-square&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Platform-Vercel-black?style=flat-square&logo=vercel" alt="Platform">
</p>

> 🧭 **任何人都能在这里找到从零到精通的成长路线图**

PathWiki 是一个免费、开源的学习路线平台，覆盖技术、产品、设计、商业等多个领域。我们为每个职业方向精心设计了完整的学习路径，帮助你系统化提升专业能力。

---

## ✨ 特性

### 🎯 完整的学习路线
- 精心编排的阶段式学习路径
- 每个节点标注推荐资源、学习时长、核心技能点
- 覆盖 10+ 个职业方向，持续更新中

### 📱 移动端优先
- 专为手机浏览优化，随时随地学习
- 流畅的响应式设计，桌面/平板/手机体验一致
- 支持暗色模式

### 📊 进度追踪
- 记录每个节点的学习状态
- 笔记功能，保存你的学习心得
- 进度自动同步到浏览器

### 🔍 智能筛选
- 按行业分类浏览
- 关键词搜索
- 多维度筛选（难度、时长、学习形式）

### 🚀 开箱即用
- 纯静态页面，部署简单
- SEO 友好，搜索友好
- 持续更新内容

---

## 🛤️ 支持的学习路线

| 路线 | 难度 | 预计时长 | 分类 |
|------|------|---------|------|
| 大模型应用开发 | 进阶 | 120h | 技术 |
| Java 后端开发 | 入门→进阶 | 300h | 技术 |
| 前端开发 | 入门→进阶 | 250h | 技术 |
| Python 数据分析 | 入门→进阶 | 200h | 技术 |
| 产品经理 | 入门→进阶 | 180h | 产品 |
| UI 设计师 | 入门→进阶 | 200h | 设计 |
| 市场营销 | 入门→进阶 | 150h | 商业 |
| 心理咨询师 | 入门→进阶 | 200h | 成长 |
| 金融分析师 | 入门→进阶 | 220h | 商业 |
| 英语学习 | 入门→进阶 | 300h | 成长 |

---

## 🏗️ 技术栈

| 技术 | 用途 |
|------|------|
| **Next.js 16** | React 框架，App Router |
| **TypeScript** | 类型安全 |
| **Tailwind CSS** | 原子化样式方案 |
| **Vercel** | 部署与 CDN |
| **localStorage** | 进度与笔记持久化 |

---

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/Answer-version/pathwiki.git
cd pathwiki/frontend
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看项目。

### 4. 构建生产版本

```bash
npm run build
```

---

## 🌐 部署

### Vercel（推荐）

1. Fork 本项目或导入到 GitHub
2. 在 [Vercel](https://vercel.com) 创建新项目
3. 导入 `frontend` 目录
4. 点击 Deploy

### 其他平台

```bash
npm run build
```

构建产物在 `.next` 目录，可部署到任意静态托管平台（Netlify、Cloudflare Pages、阿里云 OSS 等）。

---

## 🤝 如何贡献

我们欢迎任何形式的贡献！

### 📝 添加新路线

1. 在 `src/data/roadmaps/` 目录下创建新的 JSON 文件
2. 参考现有路线的结构
3. 提交 Pull Request

### 🐛 反馈问题

如果你发现任何问题或有功能建议，请提交 [Issue](https://github.com/Answer-version/pathwiki/issues)。

### 💡 功能建议

我们正在规划以下功能：
- [ ] 用户系统（登录、收藏夹云同步）
- [ ] 学习路线订阅
- [ ] 社区点评与评分
- [ ] 更多职业路线
- [ ] 多语言支持

---

## 📖 路线数据格式

每条路线包含以下结构：

```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "title": "路线名称",
  "category": {
    "id": "category-id",
    "slug": "category-slug",
    "name": "分类名称"
  },
  "difficulty": "beginner | intermediate | advanced",
  "estimatedTime": {
    "value": 120,
    "unit": "hours",
    "note": "每天3小时，约40天"
  },
  "nodes": [
    {
      "id": "node-id",
      "title": "阶段名称",
      "description": "阶段描述",
      "icon": "🎯",
      "estimatedTime": { "value": 20, "unit": "hours" },
      "resources": [
        {
          "title": "资源名称",
          "type": "article | video | course | book | project",
          "url": "https://...",
          "platform": "平台名称",
          "duration": "2h",
          "isFree": true
        }
      ]
    }
  ]
}
```

---

## 📄 License

本项目基于 [MIT License](LICENSE) 开源。

---

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式方案
- [Lucide](https://lucide.dev/) - 图标库
- [Vercel](https://vercel.com/) - 部署平台

---

<p align="center">
  <strong>🧭 学习路上，与你同行</strong>
  <br>
  <sub>如果你觉得这个项目有帮助，请点一个 ⭐</sub>
</p>
