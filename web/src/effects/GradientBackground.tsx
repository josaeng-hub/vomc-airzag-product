import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Props = {
  colors?: [string, string, string]
  speed?: number
}

// 히어로 뒤에 까는 은은한 그러데이션 배경 (ruucm/shadergradient).
// 색·속도는 props로만 조절하고, 글자가 얹히는 영역은 세기를 낮게 유지한다.
export function GradientBackground({
  colors = ['#FAF7F2', '#D97757', '#F2D6C9'],
  speed = 0.15,
}: Props) {
  const reduced = usePrefersReducedMotion()

  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      pixelDensity={1}
      fov={45}
      lazyLoad
    >
      <ShaderGradient
        type="waterPlane"
        animate={reduced ? 'off' : 'on'}
        uSpeed={speed}
        uStrength={1.5}
        uDensity={1.2}
        uFrequency={3}
        cDistance={3.6}
        cPolarAngle={90}
        color1={colors[0]}
        color2={colors[1]}
        color3={colors[2]}
        lightType="3d"
        brightness={1.1}
        grain="off"
      />
    </ShaderGradientCanvas>
  )
}
