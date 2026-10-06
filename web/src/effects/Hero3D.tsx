import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function SpinningShape({ color, paused }: { color: string; paused: boolean }) {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (paused || !ref.current) return
    ref.current.rotation.x += delta * 0.15
    ref.current.rotation.y += delta * 0.25
  })
  return (
    <mesh ref={ref} position={[0, 1.25, 0]}>
      <torusKnotGeometry args={[0.4, 0.13, 160, 32]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
    </mesh>
  )
}

// 첫 화면에 3D 도형 하나만 넣는 예제 (pmndrs/react-three-fiber).
// 탭이 안 보이거나 움직임 줄이기 설정이면 렌더링을 멈춘다.
export function Hero3D({ color = '#D97757' }: { color?: string }) {
  const reduced = usePrefersReducedMotion()
  const [hidden, setHidden] = useState(document.hidden)

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const paused = reduced || hidden

  return (
    <Canvas
      frameloop={paused ? 'demand' : 'always'}
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <SpinningShape color={color} paused={paused} />
    </Canvas>
  )
}
