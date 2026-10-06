#!/usr/bin/env bash
# 웹사이트 디자인용 Claude Code 스킬을 각 원본 GitHub 저장소 최신본으로 다시 받아옵니다.
# 사용법: 저장소 루트에서 `bash scripts/sync-skills.sh`
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS="$ROOT/.claude/skills"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

clone() { git clone -q --depth 1 "https://github.com/$1.git" "$TMP/$2"; }

clone anthropics/skills anthropic
clone pbakaus/impeccable impeccable
clone nextlevelbuilder/ui-ux-pro-max-skill uiux
clone Leonxlnx/taste-skill taste
clone vercel-labs/agent-skills vercel

replace() { rm -rf "$SKILLS/$2"; cp -r "$1" "$SKILLS/$2"; }

for s in frontend-design web-artifacts-builder theme-factory webapp-testing brand-guidelines canvas-design; do
  replace "$TMP/anthropic/skills/$s" "$s"
done

replace "$TMP/impeccable/.claude/skills/impeccable" impeccable
cp "$TMP/impeccable/LICENSE" "$SKILLS/impeccable/LICENSE"

replace "$TMP/uiux/.claude/skills/ui-ux-pro-max" ui-ux-pro-max
rm -rf "$SKILLS/ui-ux-pro-max/scripts/tests"
cp "$TMP/uiux/LICENSE" "$SKILLS/ui-ux-pro-max/LICENSE"
# 플러그인 전용 경로(${CLAUDE_PLUGIN_ROOT})를 프로젝트 상대 경로로 변경
sed -i 's#"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/#".claude/skills/ui-ux-pro-max/#g' "$SKILLS/ui-ux-pro-max/SKILL.md"

for s in taste-skill redesign-skill; do
  replace "$TMP/taste/skills/$s" "$s"
  cp "$TMP/taste/LICENSE" "$SKILLS/$s/LICENSE"
done

for s in web-design-guidelines react-best-practices; do
  replace "$TMP/vercel/skills/$s" "$s"
done

echo "완료. 'git diff --stat'으로 변경사항을 확인하세요."
