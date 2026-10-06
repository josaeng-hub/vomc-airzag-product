---
name: web-effects
description: 웹사이트에 움직이는 화면 효과(그러데이션 배경, 3D, 유리 패널, 리퀴드 로고)를 넣을 때 사용. shadergradient, react-three-fiber, liquid-glass-js, liquid-logo 중 사이트 종류에 맞는 하나를 고르고, 위치·색·세기를 정해 한 곳에만 적용한다. "배경 효과", "3D 넣어줘", "글래스모피즘", "비싸 보이는 효과", "히어로 애니메이션" 요청에 사용.
---

# 웹 화면 효과 (사내 가이드: "클로드 코드로 비싼 사이트 화면 효과 내는 4가지")

## 1. 사이트 종류부터 확인

```bash
cat package.json | grep -E '"(react|next)"'
```

| 상황 | 쓸 것 | 이 저장소 위치 |
|---|---|---|
| 로고 이미지만 있음 | liquid-logo (웹 도구 liquid.paper.design 에 투명 PNG 업로드 → 화면 녹화) | 코드 없음 |
| 순수 HTML 페이지 | liquid-glass-js | `web/public/vendor/liquid-glass-js/`, 예제 `web/public/glass-demo.html` |
| React / Next | shadergradient | `web/src/effects/GradientBackground.tsx` |
| React / Next + 3D | react-three-fiber | `web/src/effects/Hero3D.tsx` |

`web/`에는 three, @react-three/fiber, @shadergradient/react, three-stdlib, camera-controls, html2canvas가 이미 설치돼 있다. 다시 설치하지 말고 `web/package.json`에서 버전만 확인한다.

Next 15 App Router라면 React ^19 + @react-three/fiber ^9 + three >=0.158 조합만 쓴다.

## 2. 반드시 지킬 규칙

- 한 페이지에 효과는 하나만 넣는다. 여러 개 넣으면 느려지고 휴대폰 배터리가 빨리 닳는다.
- 기존 파일을 덮어쓰거나 지우지 않는다. 이미 설치된 패키지는 중복 설치하지 않는다.
- `prefers-reduced-motion`을 켠 방문자에게는 움직임을 멈춘다 (`web/src/effects/usePrefersReducedMotion.ts`).
- 탭이 안 보일 때는 렌더링을 멈춘다 (`Hero3D.tsx`의 visibilitychange 처리 참고).
- 글자가 얹히는 자리는 효과 세기를 낮추거나 비워 둔다.
- 사용자가 위치·색·세기를 정하지 않았으면 기본 예제를 그대로 붙이지 말고 먼저 물어본다.
  좋은 요청 예: "히어로 배경에만 느리고 은은한 그러데이션. 크림 #FAF7F2 → 주황 #D97757, 입자감 약하게"
- 수정은 한 번에 하나씩 한다 (더 느리게 / 더 은은하게 / 색 대비 낮춰 / 히어로 뒤에만 남기기).
- 외부 CDN에서 HDR·텍스처를 불러오는 기능(drei `Environment preset` 등)은 쓰지 않는다. 조명은 직접 둔다.

## 3. 검증

```bash
cd web && npm run dev
```

- 개발 서버 주소에서 지정한 위치에 효과가 보이는지 확인한다.
- 브라우저 콘솔에 WebGL 오류가 없는지 확인한다 (three의 `THREE.Clock deprecated` 경고는 shadergradient 내부에서 나는 것이라 무시해도 된다).
- 휴대폰 화면 폭(390px)에서도 확인한다.
- 하나라도 실패하면 완료로 보고하지 말고 실패한 명령, 원인, 다음 조치를 알린다.
- liquid-glass-js 페이지는 파일을 더블클릭해서 열면 동작하지 않는다. 반드시 서버(`npm run dev` 또는 `npx serve .`)로 연다.

## 4. 라이선스·주의

- react-three-fiber, shadergradient, liquid-glass-js: MIT.
- liquid-logo: PolyForm Shield 1.0.0. 회사 사이트에 쓰는 건 되지만 이 도구와 경쟁하는 제품을 만들어 파는 용도는 안 된다.
- liquid-glass-js: npm 배포가 없고 커밋이 1개라 유지보수를 기대하기 어렵다. 파일을 직접 받아 둔 상태(`web/public/vendor/`)로 쓴다.
- 모두 방문자 기기에서 그래픽을 돌리므로 오래된 휴대폰에서는 느려질 수 있다.

## 공식 자료

- https://github.com/pmndrs/react-three-fiber · https://docs.pmnd.rs/react-three-fiber
- https://github.com/ruucm/shadergradient · https://shadergradient.co/customize (설정을 만든 뒤 URL을 `urlString`으로 넘길 수 있음)
- https://github.com/dashersw/liquid-glass-js · https://dashersw.github.io/liquid-glass-js/
- https://github.com/paper-design/liquid-logo · https://liquid.paper.design/
