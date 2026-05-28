#!/usr/bin/env python3
"""数据复盘与迭代决策 最小校验脚本。用法：python scripts/detect_anomalies.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['无数据链路不复盘', '指标必须有公式', '结论必须能回流到阶段', 'Kill/Iterate/Scale 必须有证据']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 数据复盘与迭代决策 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
