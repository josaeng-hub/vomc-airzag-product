# vomc-airzag-product

웹사이트 구축용 Claude Code 작업 환경입니다. 이 저장소를 열면 웹 디자인 스킬과 MCP 서버가 자동으로 잡힙니다.

## 설치된 스킬 (`.claude/skills/`)

| 스킬 | 용도 | 출처 (커밋) | 라이선스 |
|---|---|---|---|
| `frontend-design` | 뻔한 AI 디자인을 피하고 완성도 높은 UI 생성 | [anthropics/skills](https://github.com/anthropics/skills) (683bc88) | Apache-2.0 |
| `web-artifacts-builder` | React + Tailwind + shadcn/ui 기반 웹 결과물 생성·번들 | 〃 | 〃 |
| `theme-factory` | 컬러·폰트 테마 프리셋 적용 | 〃 | 〃 |
| `brand-guidelines` | 브랜드 가이드 적용 (예시가 Anthropic 브랜드라 자사 브랜드로 교체해서 쓰기) | 〃 | 〃 |
| `canvas-design` | 포스터·비주얼 그래픽 제작 | 〃 | 〃 |
| `webapp-testing` | Playwright로 로컬 웹사이트 확인·스크린샷 | 〃 | 〃 |
| `impeccable` | 디자인 감사·다듬기 (`/impeccable audit`, `polish` 등 명령 23개) | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (f676fb4) | Apache-2.0 |
| `ui-ux-pro-max` | 스타일·팔레트·폰트 조합·UX 규칙 DB 검색, 디자인 시스템 추천 | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (477bcb2) | MIT |
| `taste-skill` | 랜딩페이지·포트폴리오에서 템플릿처럼 보이지 않게 | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (ce26fc2) | MIT |
| `redesign-skill` | 기존 사이트 진단 후 리디자인 | 〃 | 〃 |
| `web-design-guidelines` | 웹 UI 가이드라인 기준 코드 리뷰 (접근성·UX) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (063bee9) | MIT |
| `react-best-practices` | React/Next.js 성능 최적화 규칙 | 〃 | 〃 |

## MCP 서버 (`.mcp.json`)

- **playwright**: 브라우저를 열어 만든 페이지를 직접 보고 확인합니다 (`@playwright/mcp`).
- **shadcn**: shadcn/ui 컴포넌트를 검색하고 설치합니다.

처음 열 때 Claude Code가 이 서버들을 승인할지 묻습니다.

## 사용 예시

```
ui-ux-pro-max로 라이트형제 캠핑러그 랜딩페이지 디자인 시스템 추천해줘
frontend-design 스킬로 히어로 섹션 만들어줘
/impeccable audit src/
web-design-guidelines로 이 페이지 리뷰해줘
```

`ui-ux-pro-max` 검색 스크립트는 저장소 루트에서 실행합니다 (Python 3 필요):

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "premium camping fabric" --design-system -p "라이트형제"
```

## 업데이트

```
bash scripts/sync-skills.sh
```

## 참고

- `impeccable`의 일부 명령(`detect`, `live` 등)은 처음 실행할 때 원본 프로젝트의 실행 파일을 내려받습니다. 원본 저장소의 자동 훅(편집할 때마다 검사)은 넣지 않았습니다.
- `web-design-guidelines`는 리뷰할 때마다 GitHub에서 최신 규칙을 가져옵니다.
