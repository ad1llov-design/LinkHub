'use client';

import { SplineScene } from '@/components/ui/splite';

export function SplineSceneBasic() {
  return (
    <div className="pointer-events-none h-full w-full">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="h-full w-full bg-transparent"
      />
    </div>
  );
}
