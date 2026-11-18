# SmartAmor Admin - 晶工巧匠

> 基于AI大模型的非晶合金材料与工艺智能优化系统

[![Vue Version](https://img.shields.io/badge/Vue-3.5.21-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-purple.svg)](https://vitejs.dev/)
[![Ant Design Vue](https://img.shields.io/badge/Ant%20Design%20Vue-4.2.6-blue.svg)](https://antdv.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.14-06B6D4.svg)](https://tailwindcss.com/)

## 📋 项目概述

SmartAmor Admin是一个基于AI大模型的非晶合金材料与工艺智能优化系统的前端管理平台。项目采用现代化的技术栈构建，为研发端和生产端提供全方位的智能化解决方案。

本项目通过AI技术优化非晶合金材料的研发和生产流程，实现从材料数据库管理、智能推荐算法到生产监控的全链路智能化管理。

## ✨ 功能特性

### 🧪 研发端功能
- **非晶合金材料数据库** - 完整的材料信息管理系统
- **材料智能推荐算法** - 基于AI的智能材料推荐
- **热耦合成型工艺优化引擎** - 智能工艺参数优化

### 🏭 生产端功能
- **设备互联与实时监控** - 实时设备状态监控和管理
- **AI视觉质量检测** - 基于机器视觉的自动化质量检测
- **AI生产排程与溯源** - 智能化生产调度和全流程溯源

### 🏠 系统特性
- **响应式设计** - 适配多种设备屏幕
- **现代化UI** - 基于Ant Design Vue的美观界面
- **实时数据** - 支持实时数据更新和监控
- **AI建议系统** - 智能化的AI建议和决策支持
- **数据可视化** - 丰富的图表和数据展示

## 🛠️ 技术栈

### 前端框架
- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript超集
- **Vite** - 下一代前端构建工具

### UI组件库
- **Ant Design Vue** - 企业级UI设计语言
- **Tailwind CSS** - 实用优先的CSS框架

### 开发工具
- **Vue Router** - Vue.js官方路由管理器
- **Axios** - 基于Promise的HTTP客户端
- **ECharts** - 数据可视化图表库

### 核心依赖
- `html2canvas` - HTML转Canvas截图
- `jspdf` - JavaScript PDF生成器
- `lodash-es` - 现代JavaScript实用工具库

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐) 或 npm >= 8.0.0

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <https://github.com/265532/smart-amor-admin>
   cd smart-amor-admin
   ```

2. **安装依赖**
   ```bash
   # 使用pnpm (推荐)
   pnpm install
   
   # 或使用npm
   npm install
   ```

3. **环境配置**
   
   复制环境配置文件：
   ```bash
   cp .env.development .env.local
   ```
   
   根据需要修改环境变量：
   ```env
   VITE_API_BASE_URL=http://localhost:8001/api
   ```

4. **启动开发服务器**
   ```bash
   # 使用pnpm
   pnpm dev
   
   # 或使用npm
   npm run dev
   ```

5. **访问应用**
   
   打开浏览器访问 [http://localhost:5173](http://localhost:5173)

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 📁 项目结构

```
smart-amor-admin/
├── public/                 # 静态资源
│   ├── logo.jpg           # 应用Logo
│   ├── bg.jpg             # 背景图片
│   ├── mold_core.mp4      # 监控视频
│   └── ...
├── src/
│   ├── assets/            # 资源文件
│   │   ├── bg/            # 背景图片
│   │   ├── common.css     # 公共样式
│   │   └── theme.json     # 主题配置
│   ├── modules/           # 功能模块
│   │   ├── components/    # 通用组件
│   │   ├── product/       # 生产端模块
│   │   └── research/      # 研发端模块
│   ├── router/            # 路由配置
│   ├── types/             # 类型定义
│   ├── utils/             # 工具函数
│   ├── App.vue            # 根组件
│   └── main.ts            # 应用入口
├── .env.development       # 开发环境配置
├── .env.production        # 生产环境配置
├── package.json           # 项目配置
├── vite.config.ts         # Vite配置
├── tsconfig.json          # TypeScript配置
└── tailwind.config.js     # Tailwind CSS配置
```

## 🔧 配置说明

### 环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `VITE_API_BASE_URL` | API基础URL | `http://localhost:8001/api` |

### 主要配置文件

- **vite.config.ts** - Vite构建配置
- **tailwind.config.js** - Tailwind CSS配置
- **tsconfig.json** - TypeScript配置
- **.env.development/.env.production** - 环境变量配置

### 主题配置

项目支持主题定制，可在 `src/assets/theme.json` 中修改主题配置：

```json
{
  "token": {
    "colorPrimary": "#00bcd4",
    "borderRadius": 6,
    "wireframe": false
  }
}
```

## 📖 使用指南

### 基本导航

项目采用侧边栏导航设计，主要分为：

1. **首页** - 系统概览和实时监控
2. **研发端** - 材料研发相关功能
3. **生产端** - 生产制造相关功能

### 主要功能模块

#### 🏠 首页仪表板
- 当日完成率统计
- 计划甘特图展示
- 设备运行状态监控
- 实时监测视频流
- AI智能建议系统

#### 🔬 研发端
- **材料数据库** - 管理非晶合金材料信息
- **智能推荐** - AI驱动的材料推荐算法
- **工艺优化** - 热耦合成型工艺参数优化

#### 🏭 生产端
- **设备监控** - 设备状态实时监控
- **质量检测** - AI视觉质量检测系统
- **生产管理** - 生产排程与溯源管理

### 数据接口

项目使用Axios进行HTTP请求，配置文件位于 `src/utils/request.ts`。API响应遵循统一的数据格式：

```typescript
interface BaseResponse<T = any> {
    code: number
    data: T
    message: string
    success: boolean
}
```

## 🎨 样式指南

### 设计规范

- **主色调**: 青色 (#00bcd4)
- **字体**: 系统默认字体
- **布局**: 响应式布局，支持移动端适配

### Tailwind CSS

项目使用Tailwind CSS进行样式管理，主要实用类：

- 布局: `flex`, `grid`, `container`
- 间距: `p-*`, `m-*`, `gap-*`
- 颜色: `text-*`, `bg-*`, `border-*`
- 响应式: `sm:*`, `md:*`, `lg:*`, `xl:*`

## 🧪 开发指南

### 代码规范

- 使用TypeScript进行类型安全开发
- 遵循Vue 3 Composition API规范
- 组件命名采用PascalCase
- 文件命名采用kebab-case

### 开发命令

```bash
# 开发模式
pnpm dev

# 类型检查
pnpm type-check

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

### 组件开发

创建新组件时，建议采用以下结构：

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 组件逻辑
</script>

<style scoped>
/* 组件样式 */
</style>
```

## 🔍 故障排除

### 常见问题

1. **依赖安装失败**
   ```bash
   # 清除缓存重新安装
   pnpm store prune
   pnpm install
   ```

2. **TypeScript类型错误**
   ```bash
   # 重新生成类型文件
   pnpm type-check
   ```

3. **构建失败**
   ```bash
   # 检查并修复代码问题
   pnpm lint
   pnpm build
   ```

### 性能优化

- 使用Vue 3的Composition API优化组件性能
- 合理使用`computed`和`watch`避免不必要的重渲染
- 对大数据量场景进行虚拟滚动优化

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 贡献流程

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

### 开发规范

- 遵循项目的代码规范
- 添加必要的测试用例
- 更新相关文档
- 确保所有CI检查通过

### 提交信息规范

使用[Conventional Commits](https://www.conventionalcommits.org/)规范：

```
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加或修改测试
chore: 构建过程或辅助工具变动
```

## 📄 许可证

本项目采用 MIT 许可证。详情请查看 [LICENSE](LICENSE) 文件。

## 📞 联系我们

- 项目作者：[Leo]
- 项目地址：[https://github.com/265532/smart-amor-admin]
- 问题反馈：[Issues](https://github.com/265532/smart-amor-admin/issues)

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Ant Design Vue](https://antdv.com/) - 企业级UI组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架

---

<div align="center">
  <p>⚡ 用AI技术驱动非晶合金材料与工艺优化 ⚡</p>
  <p>SmartAmor Admin - 让材料研发更智能，让生产制造更高效</p>
</div>

## 🌐 在线演示

演示地址（GitHub Pages 纯静态托管）：**https://mllbmy.github.io/smart-amor-admin/**

- 演示版前端内置示例数据（见 `src/demo/`），**无需后端服务**即可完整浏览全部页面
- 演示数据均为构造的示例值，不代表真实检测结果或实验结论

## 🚀 本地运行

```bash
pnpm install
# 方式一：连接真实后端（读取 .env.development 中的 VITE_API_BASE_URL）
pnpm dev
# 方式二：离线演示模式（使用内置示例数据，无需后端）
pnpm dev -- --mode demo
```

> 若遇到 `ERR_PNPM_IGNORED_BUILDS`（pnpm 10+ 默认拦截依赖构建脚本），执行
> `pnpm rebuild esbuild @tailwindcss/oxide` 后重新启动即可。

## 📦 构建

```bash
pnpm build                                                   # 正式构建（读取 .env.production）
pnpm exec vite build --mode demo --base=/smart-amor-admin/   # 演示构建（GitHub Pages 子路径）
```
