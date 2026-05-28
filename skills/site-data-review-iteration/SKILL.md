---
name: site-data-review-iteration
title: 数据复盘与迭代决策
description: 上线后按固定口径做日报/周报/月报，判断 Kill / Iterate / Scale，并把经验回流到 Skills。
version: 2.2.0
owner: ShipSolo
agent: moxi
category: 做站全流程
stage: 12-data-review
updated: 2026-05-26
student_level: beginner
source: internal-site-building-flow-publicized
---

# 数据复盘与迭代决策

上线后按固定口径做日报/周报/月报，判断 Kill / Iterate / Scale，并把经验回流到 Skills。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`12-data-review`
- 角色：上线后按固定口径做日报/周报/月报，判断 Kill / Iterate / Scale，并把经验回流到 Skills。
- 上游：上线 URL、analytics、GSC、渠道记录、用户反馈、错误日志。
- 下游：迭代任务、内容计划、下一轮做站流程。

## 什么时候使用

- 站点上线后要复盘
- 要判断该加码、迭代还是放弃
- 要把 QA/SEO/增长反馈合成下一步
- 要沉淀可复用做站经验

## 输入契约

开始前尽量准备：

- 上线日期和渠道记录
- PV/UV/来源/事件/转化
- GSC impressions/clicks/query
- 错误日志和用户反馈
- 成本和维护投入

缺信息时按这个规则处理：

- 影响结论、上线安全、生产数据或真实部署：输出 `[BLOCKED]`，列出缺失项和获取方式。
- 不影响当前阶段 v0 推进：标 `[待确认]`，继续产出可复核草案。
- 没有证据的数据、价格、趋势、法律结论、部署结果：不要编造。
- 密钥、Cookie、Token、支付后台、生产数据库、私有路径：只写变量名或 `[REDACTED]`。

## 开始前检查 / Preflight

先检查账号、Token、浏览器登录态。缺关键权限时要阻断提醒用户，不要假装完成。

### 需要准备
- 新手难度：medium
- 账号/后台：
- GA4/Clarity/Bing/GSC/Plausible 等分析后台
- 环境变量 / Token：
- 无硬性要求；按项目资料推进。
- 浏览器登录态：
- 分析后台登录态

### 缺失处理
- 缺数据源不能做结论性 Kill/Iterate/Scale
- 不能编造转化/流量数据

### 可以降级继续
- 可先生成数据需求清单和复盘模板

### 安全索要话术
```text
[BLOCKED: SETUP_REQUIRED]

当前阶段缺少必要账号、Token 或浏览器登录态。
请不要把完整 token、密码、验证码、Cookie 直接发到聊天里。

推荐处理方式：
1. Token / API Key：写入本机 .env 或对应平台的 Secrets，只回复“已配置”。
2. 浏览器登录态：在当前可见浏览器完成登录并保持页面打开，只回复“已登录”。
3. 如果你不确定在哪里配置，把平台名称告诉 AI，让 AI 给你逐步指引。
```

## 一键启动 Prompt

```text
你现在执行 ShipSolo 做站流水线的「数据复盘与迭代决策」阶段。

项目：[项目名称]
当前阶段：12-data-review
目标市场：[默认 US / English，可修改]
上游输入：[粘贴调研报告 / PRD / 定价 / 合规 / 文案 / 设计 / 代码 / 线上 URL / 数据截图]
限制条件：[时间、预算、技术栈、不能做什么]

请严格按这个 Skill 执行：
1. 先执行“开始前检查 / Preflight”和“输入契约”，缺关键账号、Token、浏览器登录态或关键资料就输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。
2. 如果可以推进，按“阶段流程”逐步产出。
3. 每个重要判断都写依据；没有依据就标 [待确认]。
4. 输出“交付物 + 验收清单自检 + 下游交接摘要”。
5. 涉及公开发布、生产部署、支付、真实用户数据时，先列确认项，不要擅自执行。
6. 最后一行只能是：[DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 阶段流程

### 1. 数据可信度
先确认埋点是否真实上报；数据缺失时先修监控，不做伪复盘。

### 2. 日报
上线前 7 天看可用性、错误、来源、首批反馈和 P0。

### 3. 周报
看流量结构、关键词曝光、事件漏斗、渠道效果、内容缺口。

### 4. 月报
用 Kill/Iterate/Scale：访客、排名、工具使用率、转化、反馈、维护成本。

### 5. 决策
Kill：停止投入；Iterate：列 1-3 个高 ROI 改动；Scale：扩页面/外链/产品功能。

### 6. 回流
把可复用教训写入学员作业/团队复盘，不记录短期流水号和过时细节。


## 交付物

- 日报/周报/月报
- 指标口径说明
- Kill/Iterate/Scale 决策
- 迭代 backlog
- 经验回流摘要

## 验收清单 / 质量门槛

- [ ] 复盘基于真实数据，不是感觉
- [ ] 指标口径前后一致
- [ ] 能区分渠道问题、产品问题、SEO 时间滞后
- [ ] 决策有下一步 owner 和验收点

## 下游交接格式

```markdown
# 数据复盘与迭代决策交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：12-data-review
- 上游资料：

## 本阶段交付物
- 文件/内容：
- 核心判断：
- 已确认项：
- 待确认项：

## 质量门槛自检
- 通过项：
- 未通过项：

## 风险
- P0：
- P1：
- P2：

## 给下游的最小必要信息
- 下一阶段：迭代任务、内容计划、下一轮做站流程。
- 必须读取：
- 不能假设：
- 建议启动 Prompt：
```

## 学员怎么用

优先用自然语言，不要求会脚本：

1. 打开 `SKILL.md`。
2. 复制“一键启动 Prompt”。
3. 把你的项目资料填进方括号。
4. 发给 Hermes、OpenClaw、Claude、ChatGPT、Gemini、Cursor 等 AI 工具。
5. 让 AI 按“交付物”和“验收清单”输出，再把交接摘要交给下一阶段。

如果你使用 ShipSolo 一键安装包，安装后在新会话里直接说：

```text
请加载 ShipSolo Skill：site-data-review-iteration，按我的项目资料执行。
```

## 常见坑

- 埋点坏了还分析转化
- 只看 PV 不看工具使用/转化
- 一个负面反馈就 Kill
- 没有把复盘反馈给 PRD/文案/SEO

## 标准包内容

- `SKILL.md`：阶段入口、输入契约、一键启动 Prompt、流程与验收清单。
- `references/USAGE.md`：学员使用说明，主路径是复制 Prompt 给 AI。
- `requirements.json`：本阶段需要的账号、Token、浏览器登录态和阻断规则。
- `CHANGELOG.md`：本 Skill 独立版本说明。
- `references/stage-rubric.md`：本阶段脱敏判断规则。
- `templates/stage-handoff-template.md`：交给下游的统一摘要模板。
- `scripts/validate_handoff.py`：可选交接完整性检查脚本。
- `scripts/check_setup.py`：可选环境检查脚本，只检查变量是否存在，不打印 secret。

## 更新记录

### 2.2.0 — 2026-05-26
- 新增 Preflight：账号、Token、浏览器登录态、缺失阻断和安全索要话术。
- 更新一键启动 Prompt，要求先检查环境再执行，避免新手在无权限状态下误判 DONE。

### 2.1.0 — 2026-05-23
- 基于最新内部一键做站与数据复盘流水线重写学员版。
- 补齐新词硬闸、SEO-Copy Freeze、Route/Data Contract、PM Gate、QA_GO、Crawler Hints、上线后复盘等关键闸门。
- 保持 Prompt-first 使用方式，脚本仅作为可选辅助。

### 1.2.1 — 2026-05-18
- 标准包结构版本，包含使用说明、模板和辅助脚本。
