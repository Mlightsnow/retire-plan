# 退休规划助手

面向 45-62 岁人群的个人退休资产管理与政策导航工具。将复杂的延迟退休政策转化为直观的时间表，将晦涩的社保条文转化为结构化的行动建议。

## 功能

- **延迟退休精准计算器** — 基于出生年月、性别、身份类型计算原/新退休日期、延迟月数、退休倒计时
- **政策知识库** — 养老金、医保、办理流程分类浏览，支持关键词搜索和置顶收藏
- **个人退休"三步走"计划** — 筹备期/办理期/领取期行动清单，进度跟踪持久化

## 特性

- 隐私第一：数据本地存储（LocalStorage），无需注册登录
- 双主题支持：亮色/暗色自动切换
- 适老化设计：18px+ 字号、52px 按钮热区、WCAG AA 对比度
- 墨金美学：传统水墨与金箔质感界面

## 技术栈

Next.js 15 (App Router) · Tailwind CSS v4 · Zustand · Radix UI · Vitest · TypeScript

## 开发

```bash
npm install
npm run dev        # http://localhost:3000
npm run test:run   # 运行测试
npm run build      # 生产构建
```

## 项目结构

```
src/
├── app/           # Next.js 页面
├── components/
│   ├── calculator/  # 退休计算器
│   ├── policy/      # 政策知识库
│   ├── plan/        # 个人计划
│   └── ui/          # 基础组件
├── lib/           # 计算逻辑、工具函数
├── store/         # Zustand 状态管理
├── data/          # 政策示例数据
├── types/         # TypeScript 类型
└── __tests__/     # 测试
```
