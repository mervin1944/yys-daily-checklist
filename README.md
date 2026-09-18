# 阴阳师每日待办 (yys-daily-checklist)

一个纯前端的阴阳师每日 / 每周任务清单工具。数据只存在你自己的浏览器里(IndexedDB),没有账号、没有后端、没有服务器成本,支持离线使用,可以"添加到主屏幕"当 App 用。

## 功能

- **每日任务** / **每周任务** / **限时活动** 三个分类,各自独立勾选
- 顶部实时倒计时,显示距离下一次每日(5:00)/ 每周(周一 5:00)重置还有多久
- 跨过重置时间点后,已勾选的每日/每周任务会自动恢复为未完成
- 任务可以自由增删改、上下调整顺序——游戏版本更新加了新副本也能随时改
- 内置常见任务模板(探索、御魂、御灵、契灵、悬赏封印、结界卡、寮任务、斗技等),仅作为初始参考,可自行调整
- PWA:支持离线打开、添加到手机主屏幕

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

1. 将本仓库 push 到你自己的 GitHub 仓库(建议仓库名保持 `yys-daily-checklist`,否则需要同步修改 `vite.config.ts` 里的 `base`)。
2. 在仓库 Settings → Pages 中,将 Source 设置为 **GitHub Actions**。
3. push 到 `main` 分支后,`.github/workflows/deploy.yml` 会自动构建并发布,几分钟后即可通过
   `https://<你的用户名>.github.io/yys-daily-checklist/` 访问。

如果你 fork 后想用不同的仓库名,记得同步修改:
- `vite.config.ts` 中的 `base`、`manifest.start_url`、`manifest.scope`

## 关于数据

所有任务和勾选状态都保存在浏览器本地(IndexedDB),清除浏览器数据会导致记录丢失,换设备/换浏览器不会自动同步——这是本项目"零服务器成本"的设计取舍。如果后续需要多端同步,可以在此基础上接入你自己的云存储方案。

## 图标

`public/icons/` 下目前是占位图标,欢迎替换成更好看的式神主题图标。

## License

MIT,详见 [LICENSE](./LICENSE)。
