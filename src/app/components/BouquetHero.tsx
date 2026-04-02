/**
 * BouquetHero — two bouquets crossfading via WebGL render-targets + shader blend.
 * No transparency on models → zero depth-sort glitches.
 * Smooth luxurious dissolve controlled by a single float uniform.
 */
import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const MODELS   = [
  '/models/bouquet_left.glb',
  '/models/fl058.glb',
  '/models/fl099.glb',
  '/models/fl123.glb',
];
const HOLD_SEC = 8;    // seconds each bouquet is held
const FADE_SEC = 3.0;  // crossfade duration — slow & elegant

function buildMaterial() {
  return new THREE.MeshStandardMaterial({
    color:               new THREE.Color('#e8d89a'),
    roughness:           0.35,
    metalness:           0.08,
    polygonOffset:       true,
    polygonOffsetFactor: 2,
    polygonOffsetUnits:  2,
  });
}

function prepareModel(model: THREE.Object3D) {
  const box    = new THREE.Box3().setFromObject(model);
  const size   = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const scale  = 2.05 / Math.max(size.x, size.y, size.z);
  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  model.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    const mat  = buildMaterial();
    mesh.material = Array.isArray(mesh.material) ? mesh.material.map(() => mat) : mat;
  });
}

// Ease in-out cubic
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface Props { className?: string }

export function BouquetHero({ className = '' }: Props) {
  const mountRef   = useRef<HTMLDivElement>(null);
  const mouseRef   = useRef({ nx: 0, ny: 0 });
  const targetRef  = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef     = useRef<number>(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      nx: (e.clientX / window.innerWidth  - 0.5) * 2,
      ny: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    renderer.setSize(W, H);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    // promote canvas to its own GPU layer — eliminates scroll-repaint flicker
    renderer.domElement.style.transform = 'translateZ(0)';
    el.appendChild(renderer.domElement);

    // ── Two render targets (one per bouquet) ──────────────────────────
    const makeRT = () => new THREE.WebGLRenderTarget(W, H, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });
    const rtA = makeRT();
    const rtB = makeRT();

    // ── Blend scene (full-screen quad) ────────────────────────────────
    const blendScene = new THREE.Scene();
    const blendCam   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const blendMat   = new THREE.ShaderMaterial({
      uniforms: {
        tA:    { value: rtA.texture },
        tB:    { value: rtB.texture },
        blend: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: `
        uniform sampler2D tA;
        uniform sampler2D tB;
        uniform float blend;
        varying vec2 vUv;
        void main() {
          vec4 a = texture2D(tA, vUv);
          vec4 b = texture2D(tB, vUv);
          gl_FragColor = mix(a, b, blend);
        }
      `,
      depthTest:  false,
      depthWrite: false,
    });
    blendScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), blendMat));

    // ── Two model scenes (A and B) ────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.5, 40);
    camera.position.set(0, 1.1, 3.45);
    camera.lookAt(0, 0.5, 0);

    function makeScene() {
      const scene = new THREE.Scene();
      // Strong top light — main source straight above
      const top = new THREE.DirectionalLight(new THREE.Color('#fff6e0'), 3.0);
      top.position.set(0.0, 8.0, 1.0); scene.add(top);
      // Soft front fill — stops underside from going pure black
      const fill = new THREE.DirectionalLight(new THREE.Color('#d4c890'), 0.5);
      fill.position.set(0.0, 1.0, 4.0); scene.add(fill);
      // Subtle rim from behind to separate bouquet from bg
      const rim = new THREE.DirectionalLight(new THREE.Color('#a09050'), 0.4);
      rim.position.set(0.0, 3.0, -4.0); scene.add(rim);
      scene.add(new THREE.HemisphereLight(new THREE.Color('#c8b870'), new THREE.Color('#1b160a'), 0.6));
      scene.add(new THREE.AmbientLight(new THREE.Color('#2a1e0a'), 0.2));
      const root = new THREE.Group();
      scene.add(root);
      return { scene, root };
    }

    const sceneA = makeScene();
    const sceneB = makeScene();
    const scenes = [sceneA, sceneB];

    // Preload both models
    const loaded: (THREE.Object3D | null)[] = [null, null];
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let destroyed = false;

    MODELS.forEach((url, i) => {
      loader.load(url, (gltf) => {
        if (destroyed) return;
        const model = gltf.scene;
        prepareModel(model);
        loaded[i] = model;
        if (scenes[i]) scenes[i].root.add(model);
      }, undefined, (err) => console.error('GLB error:', url, err));
    });

    // ── Transition state ──────────────────────────────────────────────
    // blend=0 → show A entirely; blend=1 → show B entirely; then we flip
    let activeA  = true;   // which side is currently "on"
    let timer    = 0;
    let fading   = false;
    let fadeT    = 0;

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h);
      rtA.setSize(w, h);
      rtB.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    // ── Pause during scroll to avoid GPU contention flicker ───────────
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { scrolling = false; }, 150);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Render loop ───────────────────────────────────────────────────
    let t    = 0;
    let last = performance.now();

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      if (scrolling) return; // freeze canvas while page is scrolling
      const now   = performance.now();
      const delta = (now - last) / 1000;
      last = now;
      t   += delta;

      // Mouse rotation
      targetRef.current.y = mouseRef.current.nx * 0.4;
      targetRef.current.x = mouseRef.current.ny * 0.08;
      const k = 0.045;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * k;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * k;
      const rotY = currentRef.current.y + t * 0.04;
      const rotX = currentRef.current.x;
      scenes.forEach(({ root: r }) => { r.rotation.y = rotY; r.rotation.x = rotX; });

      // Timer / fade logic
      if (!fading) {
        timer += delta;
        if (timer >= HOLD_SEC) { fading = true; fadeT = 0; timer = 0; }
      } else {
        fadeT += delta / FADE_SEC;
        const eased = easeInOut(Math.min(fadeT, 1));
        // if A is active we fade blend 0→1, if B is active we fade blend 1→0
        blendMat.uniforms.blend.value = activeA ? eased : 1 - eased;
        if (fadeT >= 1) { activeA = !activeA; fading = false; }
      }

      // Render each bouquet scene to its own target, then blend to screen
      renderer.setRenderTarget(rtA);
      renderer.render(sceneA.scene, camera);

      renderer.setRenderTarget(rtB);
      renderer.render(sceneB.scene, camera);

      renderer.setRenderTarget(null);
      renderer.render(blendScene, blendCam);
    };
    tick();

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      destroyed = true;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(scrollTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      rtA.dispose(); rtB.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [onMouseMove]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ touchAction: 'none', pointerEvents: 'none', position: 'relative', filter: 'blur(2.5px)' }}
    >
    </div>
  );
}
