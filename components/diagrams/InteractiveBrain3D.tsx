"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import type { HeroInteractiveNodeId } from "@/lib/neurosports-hero-interactive-content";

type InteractiveBrain3DProps = {
  activeNodeId: HeroInteractiveNodeId | null;
  className?: string;
};

type BrainState = {
  nodeIndices: number[];
  linkIndices: number[];
  primaryColor: number;
  secondaryColor?: number;
};

const brainStates: Record<"neutral" | HeroInteractiveNodeId, BrainState> = {
  neutral: { nodeIndices: [], linkIndices: [], primaryColor: 0x627567 },
  "functional-evaluation": { nodeIndices: [], linkIndices: [], primaryColor: 0x718879 },
  rsfn: { nodeIndices: [0, 1, 2, 3, 4, 5, 6], linkIndices: [0, 1, 2, 3, 4, 5], primaryColor: 0x627567, secondaryColor: 0xc89a4b },
  "mnsi-core": { nodeIndices: [1, 2, 3, 4, 5, 6], linkIndices: [0, 2, 3, 4, 5], primaryColor: 0x627567, secondaryColor: 0xc89a4b },
  "clinical-neuroscience": { nodeIndices: [], linkIndices: [], primaryColor: 0x627567 },
  neuroperformance: { nodeIndices: [], linkIndices: [], primaryColor: 0xc89a4b },
  "functional-outcomes": { nodeIndices: [], linkIndices: [], primaryColor: 0x718879 },
};

export function InteractiveBrain3D({ activeNodeId, className }: InteractiveBrain3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const stateKey = activeNodeId ?? "neutral";

  useEffect(() => {
    let disposed = false;
    let animationFrame = 0;
    let cleanup: (() => void) | undefined;
    const mount = mountRef.current;
    if (!mount) return;

    const initialize = async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        if (disposed || !mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 100);
        camera.position.set(4.1, 1.1, 4.1);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.AgXToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.setClearColor(0xf6f0e4, 1);
        renderer.domElement.className = "h-full w-full";
        renderer.domElement.setAttribute("aria-hidden", "true");
        mount.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.minAzimuthAngle = -Math.PI * 0.8;
        controls.maxAzimuthAngle = Math.PI * 0.8;
        controls.minPolarAngle = Math.PI * 0.2;
        controls.maxPolarAngle = Math.PI * 0.78;
        controls.rotateSpeed = 0.22;

        scene.add(new THREE.HemisphereLight(0xfffbf3, 0x8f887c, 1.15));
        const keyLight = new THREE.DirectionalLight(0xfff0d6, 3.8);
        keyLight.position.set(4.5, 6, 4.5);
        scene.add(keyLight);
        const fillLight = new THREE.DirectionalLight(0xf0e7da, 0.85);
        fillLight.position.set(-4.5, 1.6, 3);
        scene.add(fillLight);
        const contourLight = new THREE.DirectionalLight(0xfff8ee, 1.35);
        contourLight.position.set(-3, 3.5, -5);
        scene.add(contourLight);

        const brainRoot = new THREE.Group();
        scene.add(brainRoot);

        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync("/models/nih-brain/original/brain-human.glb");
        if (disposed) return;
        const anatomicalBrain = gltf.scene;
        const sourceBounds = new THREE.Box3().setFromObject(anatomicalBrain);
        const sourceCenter = sourceBounds.getCenter(new THREE.Vector3());
        const sourceSize = sourceBounds.getSize(new THREE.Vector3());
        const fitScale = 2.18 / Math.max(sourceSize.x, sourceSize.y, sourceSize.z);
        anatomicalBrain.scale.setScalar(fitScale);
        anatomicalBrain.position.copy(sourceCenter).multiplyScalar(-fitScale);
        anatomicalBrain.traverse((object) => {
          const mesh = object as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.castShadow = false;
          mesh.receiveShadow = false;
          mesh.material = new THREE.MeshStandardMaterial({ color: 0xeadfc9, roughness: 0.64, metalness: 0 });
        });
        brainRoot.add(anatomicalBrain);

        const networkGroup = new THREE.Group();
        brainRoot.add(networkGroup);
        const points = [
          new THREE.Vector3(-0.7, 0.48, 0.68),
          new THREE.Vector3(0.68, 0.5, 0.68),
          new THREE.Vector3(-0.78, -0.02, 0.72),
          new THREE.Vector3(0.78, -0.02, 0.72),
          new THREE.Vector3(-0.5, -0.48, 0.62),
          new THREE.Vector3(0.52, -0.48, 0.62),
          new THREE.Vector3(0, 0.12, 0.82),
        ];
        points.forEach((point, index) => {
          const node = new THREE.Mesh(new THREE.SphereGeometry(0.033, 12, 8), new THREE.MeshBasicMaterial({ transparent: true }));
          node.userData.networkIndex = index;
          node.position.copy(point);
          networkGroup.add(node);
        });
        for (let index = 0; index < points.length - 1; index += 1) {
          const midpoint = points[index].clone().lerp(points[index + 1], 0.5);
          const curve = new THREE.CatmullRomCurve3([points[index], midpoint, points[index + 1]]);
          const connection = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.006, 5, false), new THREE.MeshBasicMaterial({ transparent: true }));
          connection.userData.networkLinkIndex = index;
          networkGroup.add(connection);
        }

        const updateState = () => {
          const state = brainStates[stateKey];
          anatomicalBrain.scale.setScalar(fitScale);
          networkGroup.visible = stateKey === "rsfn" || stateKey === "mnsi-core";
          networkGroup.traverse((object) => {
            const mesh = object as THREE.Mesh;
            if (!mesh.isMesh) return;
            const material = mesh.material as THREE.MeshBasicMaterial;
            const nodeIndex = mesh.userData.networkIndex as number | undefined;
            const linkIndex = mesh.userData.networkLinkIndex as number | undefined;
            const visible = nodeIndex !== undefined
              ? state.nodeIndices.includes(nodeIndex)
              : linkIndex !== undefined && state.linkIndices.includes(linkIndex);
            mesh.visible = visible;
            material.color.setHex(state.secondaryColor && (nodeIndex === 3 || nodeIndex === 5 || linkIndex === 4) ? state.secondaryColor : state.primaryColor);
            material.opacity = linkIndex === undefined ? 0.68 : 0.46;
          });
        };
        updateState();

        const resize = () => {
          const width = Math.max(1, mount.clientWidth);
          const height = Math.max(1, mount.clientHeight);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        controls.autoRotate = !reducedMotion;
        controls.autoRotateSpeed = 0.06;
        controls.addEventListener("start", () => { controls.autoRotate = false; });
        const render = () => {
          if (disposed) return;
          controls.update();
          renderer.render(scene, camera);
          animationFrame = window.requestAnimationFrame(render);
        };
        setStatus("ready");
        render();

        cleanup = () => {
          resizeObserver.disconnect();
          window.cancelAnimationFrame(animationFrame);
          controls.dispose();
          renderer.dispose();
          scene.traverse((object) => {
            const mesh = object as THREE.Mesh;
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
