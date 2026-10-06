import { GradientBackground } from './effects/GradientBackground'
import { Hero3D } from './effects/Hero3D'

// 한 페이지에 효과는 하나만: ?effect=3d 로 3D 예제, 기본은 그러데이션 배경.
const effect = new URLSearchParams(window.location.search).get('effect')

export default function App() {
  return (
    <main>
      <section className="hero">
        {effect === '3d' ? <Hero3D /> : <GradientBackground />}
        <div className="hero-copy">
          <p className="eyebrow">VOMC Web Effects</p>
          <h1>화면 효과 예제</h1>
          <p>
            {effect === '3d'
              ? 'react-three-fiber: 첫 화면 3D 도형 하나'
              : 'shadergradient: 히어로 뒤 은은한 그러데이션'}
          </p>
          <nav className="links">
            <a href="/">그러데이션</a>
            <a href="/?effect=3d">3D</a>
            <a href="/glass-demo.html">유리 내비 (순수 HTML)</a>
          </nav>
        </div>
      </section>
    </main>
  )
}
