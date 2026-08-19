"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroInteractiveNodeId } from "@/lib/neurosports-hero-interactive-content";

type InteractiveBrain3DProps = {
  activeNodeId: HeroInteractiveNodeId | null;
  className?: string;
};

type BrainState = {
  networkColor: number;
  networkOpacity: number;
  nodeScale: number;
};

const brainStates: Record<"neutral" | HeroInteractiveNodeId, BrainState> = {
  neutral: { networkColor: 0xc89a4b, networkOpacity: 0.38, nodeScale: 0.85 },
  "functional-evaluation": { networkColor: 0xc89a4b, networkOpacity: 0.48, nodeScale: 0.95 },
  rsfn: { networkColor: 0x627567, networkOpacity: 0.9, nodeScale: 1.2 },
  "mnsi-core": { networkColor: 0x9b8450, networkOpacity: 0.68, nodeScale: 1.05 },
  "clinical-neuroscience": { networkColor: 0x758c7a, networkOpacity: 0.62, nodeScale: 1 },
  neuroperformance: { networkColor: 0xb58c4a, networkOpacity: 0.64, nodeScale: 1 },
  "functional-outcomes": { networkColor: 0x6f8172, networkOpacity: 0.72, nodeScale: 1.1 },
};

function makeGyrusCurve(THREE: typeof import("three"), side: number, row: number, phase: number) {
  const points = [];
  for (let index = 0; index < 15; index += 1) {
    const t = index / 14;
    const x = side * (0.23 + t * 0.48);
    const y = -0.52 + row * 0.2 + Math.sin(t * Math.PI * 3 + phase) * 0.075;
    const z = 0.54 + Math.cos(t * Math.PI * 2 + phase) * 0.045;
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points);
}

function makeNetworkCurve(THREE: typeof import("three"), from: { x: number; y: number; z: number }, to: { x: number; y: number; z: number }) {
  const midpoint = new THREE.Vector3(
    (from.x + to.x) / 2,
    Math.max(from.y, to.y) + 0.22,
    (from.z + to.z) / 2 + 0.12,
  );
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(from.x, from.y, from.z),
    midpoint,
    new THREE.Vector3(to.x, to.y, to.z),
  ]);
}

export function InteractiveBrain3D({ activeNodeId, className }: InteractiveBrain3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const stateKey = activeNodeId ?? "neutral";

  useEffect(() => {
    let disposed = false;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let controls: import("three/examples/jsm/controls/OrbitControls.js").OrbitControls | null = null;
    let animationFrame = 0;
    let cleanup: (() => void) | undefined;

    const mount = mountRef.current;
    if (!mount) return;

    const initialize = async () => {
      try {
        const THREE = await import("three");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        if (disposed || !mount) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(0, 0.05, 4.35);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.className = "h-full w-full";

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.minAzimuthAngle = -0.75;
        controls.maxAzimuthAngle = 0.75;
        controls.minPolarAngle = Math.PI * 0.38;
        controls.maxPolarAngle = Math.PI * 0.62;
        controls.rotateSpeed = 0.35;

        scene.add(new THREE.HemisphereLight(0xfdfbf7, 0x627567, 1.8));
        const keyLight = new THREE.DirectionalLight(0xfff5df, 2.4);
        keyLight.position.set(-3, 4, 5);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0xa8b19c, 1.5);
        rimLight.position.set(3, 1, -3);
        scene.add(rimLight);

        const brain = new THREE.Group();
        brain.rotation.x = -0.08;
        brain.scale.setScalar(0.72);
        scene.add(brain);

        const hemisphereMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xc8b79d,
          roughness: 0.68,
          metalness: 0,
          transmission: 0.08,
          thickness: 0.45,
          transparent: true,
          opacity: 0.46,
        });
        const grooveMaterial = new THREE.MeshBasicMaterial({
          color: 0x627567,
          transparent: true,
          opacity: 0.52,
          depthTest: false,
        });

        for (const side of [-1, 1]) {
          const hemisphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), hemisphereMaterial);
          hemisphere.scale.set(0.93, 1.05, 0.72);
          hemisphere.position.set(side * 0.45, 0, 0);
          brain.add(hemisphere);

          for (let row = 0; row < 6; row += 1) {
            const curve = makeGyrusCurve(THREE, side, row, row * 0.72 + (side === 1 ? 0.16 : 0));
            const gyrus = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.018, 6, false), grooveMaterial);
            brain.add(gyrus);
          }
        }

        const fissure = new THREE.Mesh(
          new THREE.BoxGeometry(0.045, 1.75, 0.7),
          new THREE.MeshBasicMaterial({ color: 0x4c5b50, transparent: true, opacity: 0.34 }),
        );
        fissure.position.z = 0.03;
        brain.add(fissure);

        const networkGroup = new THREE.Group();
        brain.add(networkGroup);
        const networkPoints = [
          { x: -0.74, y: 0.48, z: 0.52 },
          { x: 0.72, y: 0.5, z: 0.52 },
          { x: -0.86, y: -0.05, z: 0.56 },
          { x: 0.84, y: -0.04, z: 0.56 },
          { x: -0.56, y: -0.56, z: 0.48 },
          { x: 0.58, y: -0.56, z: 0.48 },
          { x: 0, y: 0.12, z: 0.72 },
        ];
        const networkNodes = networkPoints.map((point) => {
          const node = new THREE.Mesh(
            new THREE.SphereGeometry(0.055, 12, 8),
            new THREE.MeshBasicMaterial({ color: 0xc89a4b, transparent: true, opacity: 0.5 }),
          );
          node.position.set(point.x, point.y, point.z);
          networkGroup.add(node);
          return node;
        });
        const networkLines = [];
        for (let index = 0; index < networkPoints.length - 1; index += 1) {
          const line = new THREE.Mesh(
            new THREE.TubeGeometry(makeNetworkCurve(THREE, networkPoints[index], networkPoints[index + 1]), 16, 0.014, 5, false),
            new THREE.MeshBasicMaterial({ color: 0xc89a4b, transparent: true, opacity: 0.42 }),
          );
          networkGroup.add(line);
          networkLines.push(line);
        }
        const crossLine = new THREE.Mesh(
          new THREE.TubeGeometry(makeNetworkCurve(THREE, networkPoints[0], networkPoints[3]), 16, 0.014, 5, false),
          new THREE.MeshBasicMaterial({ color: 0xc89a4b, transparent: true, opacity: 0.38 }),
        );
        networkGroup.add(crossLine);
        networkLines.push(crossLine);

        const updateSize = () => {
          if (!renderer || !camera) return;
          const width = Math.max(1, mount.clientWidth);
          const height = Math.max(1, mount.clientHeight);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        updateSize();
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(mount);

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const orbitControls = controls;
        orbitControls.autoRotate = !reducedMotion;
        orbitControls.autoRotateSpeed = 0.28;
        const render = () => {
          if (disposed || !renderer || !scene || !camera || !controls) return;
          controls.update();
          renderer.render(scene, camera);
          animationFrame = window.requestAnimationFrame(render);
        };
        orbitControls.addEventListener("start", () => { orbitControls.autoRotate = false; });
        const state = brainStates[stateKey];
        networkGroup.scale.setScalar(state.nodeScale);
        networkNodes.forEach((node) => {
          (node.material as import("three").MeshBasicMaterial).color.setHex(state.networkColor);
          (node.material as import("three").MeshBasicMaterial).opacity = state.networkOpacity;
        });
        networkLines.forEach((line) => {
          (line.material as import("three").MeshBasicMaterial).color.setHex(state.networkColor);
          (line.material as import("three").MeshBasicMaterial).opacity = state.networkOpacity * 0.62;
        });
        setStatus("ready");
        render();
        cleanup = () => {
          resizeObserver.disconnect();
          window.cancelAnimationFrame(animationFrame);
          controls?.dispose();
          renderer?.dispose();
          scene?.traverse((object) => {
            const mesh = object as import("three").Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
            else if (mesh.material) mesh.material.dispose();
          });
          mount.replaceChildren();
        };
      } catch {
        if (!disposed) setStatus("fallback");
      }
    };

    void initialize();
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [stateKey]);

  return (
    <div
      ref={mountRef}
      className={className}
      role="img"
      aria-label="Interactive symbolic visualization of functional brain-network organization."
    >
      {status !== "ready" ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--ns-sage)_20%,transparent),transparent_58%),color-mix(in_srgb,var(--ns-ivory)_78%,transparent)] text-center text-xs text-[var(--ns-muted-text)]">
          {status === "fallback" ? "Interactive brain visualization unavailable." : "Preparing scientific visualization..."}
        </div>
      ) : null}
    </div>
  );
}
