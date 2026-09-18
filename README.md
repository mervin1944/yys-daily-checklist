# 阴阳师每日待办 (yys-daily-checklist)

纯前端的阴阳师每日 / 每周任务清单 PWA。数据只存在本机浏览器(IndexedDB),没有账号、没有后端、零服务器成本,支持离线使用,可"添加到主屏幕"当 App 用。

项目背景和设计取舍见 [docs/OVERVIEW.md](./docs/OVERVIEW.md),规划中的工作见 [TODO.md](./TODO.md)。

## 本地开发

```bash
npm install
npm run dev
```

## 构建 & 本地预览

```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages

1. push 到 `main` 分支,`.github/workflows/deploy.yml` 会自动构建并发布。
2. 仓库 Settings → Pages → Source 需要选 **GitHub Actions**(本仓库已经配置好)。
3. 几分钟后可通过 `https://<你的用户名>.github.io/yys-daily-checklist/` 访问。

如果 fork 后改用了别的仓库名,记得同步修改 `vite.config.ts` 里的 `base`、`manifest.start_url`、`manifest.scope`。

## License

MIT,详见 [LICENSE](./LICENSE)。
