# Pixijs - Zombie Game

## Description


TODO:
我打算写个末世生存类游戏，
1. 这个游戏是一个 2D， 用 pixijs 和 ts 写的游戏
2. 游戏的主要玩法是生存、种地类型，玩家需要在一个末世世界中生存下去
3. 我需要一个完整的架构目录，包括游戏的各个模块，最好是做成预制体，比如角色、物品、地图等等
4. 最好是标准化，写成 class 的形式，方便引入运用和后期扩展。 目前写的不是很好，还可以进行优化


目录结构：
.
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── src
│   ├── App.tsx
│   ├── assets
│   │   ├── images
│   │   └── sounds
│   ├── components
│   ├── core
│   │   └── PixiComponent.ts
│   ├── interfaces
│   │   └── IComponent.ts
│   ├── main.tsx
│   ├── scenes
│   ├── styles
│   │   ├── App.css
│   │   └── index.css
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

9 directories, 16 files