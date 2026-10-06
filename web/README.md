# web — 화면 효과 예제 사이트

Vite + React 19 + TypeScript. 사내 가이드 "클로드 코드로 비싼 사이트 화면 효과 내는 4가지"의 라이브러리를 설치하고 예제를 붙여 둔 상태입니다.

## 실행

```bash
cd web
npm install
npm run dev
```

| 주소 | 효과 | 라이브러리 |
|---|---|---|
| `/` | 히어로 뒤 은은한 그러데이션 | [shadergradient](https://github.com/ruucm/shadergradient) |
| `/?effect=3d` | 첫 화면 3D 도형 하나 | [react-three-fiber](https://github.com/pmndrs/react-three-fiber) |
| `/glass-demo.html` | 상단 유리 내비게이션 (순수 HTML) | [liquid-glass-js](https://github.com/dashersw/liquid-glass-js) |

리퀴드 로고는 설치가 필요 없습니다. [liquid.paper.design](https://liquid.paper.design/)에 투명 배경 로고 PNG를 올리고 화면을 녹화해서 씁니다 (라이선스: PolyForm Shield 1.0.0).

## 파일

- `src/effects/GradientBackground.tsx`: 그러데이션 배경. `colors`, `speed`로 조절
- `src/effects/Hero3D.tsx`: 3D 도형. 탭이 안 보이거나 움직임 줄이기 설정이면 멈춤
- `src/effects/usePrefersReducedMotion.ts`: 움직임 줄이기 설정 감지
- `public/vendor/liquid-glass-js/`: liquid-glass-js 원본 파일(78cb6cc)과 html2canvas 1.4.1

## 버전 (2026-10-06 설치)

three 0.186.1 · @react-three/fiber 9.8.1 · @shadergradient/react 2.4.20
