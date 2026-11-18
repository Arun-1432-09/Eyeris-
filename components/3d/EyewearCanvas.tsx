'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, ShieldCheck, Sparkles, RotateCw, Sun, Moon, Zap, Eye, Check, Sliders } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface EyewearCanvasProps {
  onOpenBooking: () => void;
}

type ViewPreset = 'assembled' | 'exploded' | 'sunlight' | 'drivesafe';
type TransitionsTint = 'emerald' | 'graphite' | 'sapphire';

export const EyewearCanvas: React.FC<EyewearCanvasProps> = ({ onOpenBooking }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Interactive Simulator State
  const [explosionProgress, setExplosionProgress] = useState<number>(0);
  const [activePreset, setActivePreset] = useState<ViewPreset>('assembled');
  const [sunlightUV, setSunlightUV] = useState<number>(0); // 0% (Indoors) to 100% (Direct UV Sun)
  const [activeTint, setActiveTint] = useState<TransitionsTint>('emerald');
  const [isBlueCutActive, setIsBlueCutActive] = useState<boolean>(true);
  const [isNightDriveActive, setIsNightDriveActive] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialsRef = useRef<{
    lensGlass?: THREE.MeshPhysicalMaterial;
    coatingShield?: THREE.MeshPhysicalMaterial;
    blueLightBeams?: THREE.Group;
    headlightGlare?: THREE.Group;
  }>({});

  const partsRef = useRef<{
    leftLens?: THREE.Mesh;
    rightLens?: THREE.Mesh;
    leftCoating?: THREE.Mesh;
    rightCoating?: THREE.Mesh;
    leftRim?: THREE.Mesh;
    rightRim?: THREE.Mesh;
    bridge?: THREE.Mesh;
    leftTemple?: THREE.Group;
    rightTemple?: THREE.Group;
    rootGroup?: THREE.Group;
  }>({});

  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.3, 5.8));
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0.08, y: -0.2 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.copy(targetCameraPos.current);
    cameraRef.current = camera;

    // 3. Renderer with high-performance ACES tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light (Precision Optical Highlight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // Apple Precision Blue Accent Rim
    const blueRimLight = new THREE.DirectionalLight(0x0071e3, 2.5);
    blueRimLight.position.set(-6, 3, 4);
    scene.add(blueRimLight);

    // Warm Sun Simulator Light (activated by UV slider)
    const sunLight = new THREE.DirectionalLight(0xffaa33, 0.0);
    sunLight.position.set(2, 8, 3);
    scene.add(sunLight);

    // Back Silhouette Light
    const backLight = new THREE.DirectionalLight(0x86868b, 2.0);
    backLight.position.set(0, -4, -6);
    scene.add(backLight);

    // 5. Materials
    // Natural Brushed Aerospace Titanium Frame
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1c1e,
      metalness: 0.92,
      roughness: 0.24,
    });

    // 24K Gold Inlay Hinges
    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5c384,
      metalness: 0.96,
      roughness: 0.15,
    });

    // High-Index 1.67 Physical Optical Lens (Transmission + Chromatic Reflection)
    const lensGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      opacity: 0.95,
      transparent: true,
      roughness: 0.02,
      ior: 1.67,
      reflectivity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      emissive: 0x0071e3,
      emissiveIntensity: 0.04,
    });
    materialsRef.current.lensGlass = lensGlassMaterial;

    // Anti-Reflective Molecular Shield (Iridescent green/cyan sheen)
    const coatingMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x30d158,
      transmission: 0.90,
      opacity: 0.45,
      transparent: true,
      roughness: 0.04,
      clearcoat: 1.0,
      emissive: 0x64d2ff,
      emissiveIntensity: 0.15,
    });
    materialsRef.current.coatingShield = coatingMaterial;

    // Medical Silicone Nose Pads
    const siliconeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.82,
      opacity: 0.8,
      transparent: true,
      roughness: 0.3,
    });

    // 6. Geometry Creation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    partsRef.current.rootGroup = rootGroup;

    const lensRadiusX = 1.1;
    const lensRadiusY = 0.82;
    const eyeCenterDist = 1.38;

    // Helper: Oval Aspheric Lens
    function createLensMesh(xOffset: number): THREE.Mesh {
      const shape = new THREE.Shape();
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * lensRadiusX;
        const y = Math.sin(theta) * lensRadiusY;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 4,
      });
      geo.center();
      const mesh = new THREE.Mesh(geo, lensGlassMaterial.clone());
      mesh.position.set(xOffset, 0, 0);
      return mesh;
    }

    // Helper: Anti-Reflective Coating Disc
    function createCoatingMesh(xOffset: number): THREE.Mesh {
      const shape = new THREE.Shape();
      const segments = 48;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * (lensRadiusX - 0.03);
        const y = Math.sin(theta) * (lensRadiusY - 0.03);
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      const geo = new THREE.ShapeGeometry(shape);
      const mesh = new THREE.Mesh(geo, coatingMaterial);
      mesh.position.set(xOffset, 0, 0.06);
      return mesh;
    }

    // Helper: Titanium Rim Frame
    function createRimMesh(xOffset: number): THREE.Mesh {
      const outerShape = new THREE.Shape();
      const rimWidth = 0.08;
      const segments = 64;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * (lensRadiusX + rimWidth);
        const y = Math.sin(theta) * (lensRadiusY + rimWidth);
        if (i === 0) outerShape.moveTo(x, y);
        else outerShape.lineTo(x, y);
      }

      const hole = new THREE.Path();
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * lensRadiusX;
        const y = Math.sin(theta) * lensRadiusY;
        if (i === 0) hole.moveTo(x, y);
        else hole.lineTo(x, y);
      }
      outerShape.holes.push(hole);

      const geo = new THREE.ExtrudeGeometry(outerShape, {
        depth: 0.12,
        bevelEnabled: true,
        bevelThickness: 0.025,
        bevelSize: 0.02,
        bevelSegments: 4,
      });
      geo.center();
      const mesh = new THREE.Mesh(geo, titaniumMaterial);
      mesh.position.set(xOffset, 0, 0);
      return mesh;
    }

    // Add Rims
    const leftRim = createRimMesh(-eyeCenterDist);
    const rightRim = createRimMesh(eyeCenterDist);
    rootGroup.add(leftRim);
    rootGroup.add(rightRim);
    partsRef.current.leftRim = leftRim;
    partsRef.current.rightRim = rightRim;

    // Add Lenses
    const leftLens = createLensMesh(-eyeCenterDist);
    const rightLens = createLensMesh(eyeCenterDist);
    rootGroup.add(leftLens);
    rootGroup.add(rightLens);
    partsRef.current.leftLens = leftLens;
    partsRef.current.rightLens = rightLens;

    // Add AR Coating Layers
    const leftCoating = createCoatingMesh(-eyeCenterDist);
    const rightCoating = createCoatingMesh(eyeCenterDist);
    rootGroup.add(leftCoating);
    rootGroup.add(rightCoating);
    partsRef.current.leftCoating = leftCoating;
    partsRef.current.rightCoating = rightCoating;

    // Nose Bridge Arch
    const bridgeCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-eyeCenterDist + lensRadiusX - 0.02, 0.12, 0),
      new THREE.Vector3(-0.3, 0.46, 0.08),
      new THREE.Vector3(0.3, 0.46, 0.08),
      new THREE.Vector3(eyeCenterDist - lensRadiusX + 0.02, 0.12, 0)
    );
    const bridgeGeo = new THREE.TubeGeometry(bridgeCurve, 28, 0.055, 12, false);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, titaniumMaterial);
    rootGroup.add(bridgeMesh);
    partsRef.current.bridge = bridgeMesh;

    // Silicone Nose Pads
    const padGeo = new THREE.CapsuleGeometry(0.06, 0.14, 8, 16);
    const leftPad = new THREE.Mesh(padGeo, siliconeMaterial);
    leftPad.position.set(-0.38, -0.15, -0.12);
    leftPad.rotation.z = -0.3;
    const rightPad = new THREE.Mesh(padGeo, siliconeMaterial);
    rightPad.position.set(0.38, -0.15, -0.12);
    rightPad.rotation.z = 0.3;
    rootGroup.add(leftPad);
    rootGroup.add(rightPad);

    // Temples (Sub-10g Beta-Titanium Arms)
    function createTempleGroup(isLeft: boolean): THREE.Group {
      const group = new THREE.Group();
      const mult = isLeft ? -1 : 1;

      // Hinge Cylinder with Gold Inlay
      const hinge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 0.14, 16),
        goldAccentMaterial
      );
      hinge.rotation.z = Math.PI / 2;
      group.add(hinge);

      // Ergonomic Contoured Arm
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(mult * 0.05, -0.02, -1.2),
        new THREE.Vector3(mult * 0.08, -0.04, -2.4),
        new THREE.Vector3(mult * 0.09, -0.36, -2.9),
      ]);
      const armMesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 32, 0.038, 12, false),
        titaniumMaterial
      );
      group.add(armMesh);

      // Gold Tip Inset
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 16, 16),
        goldAccentMaterial
      );
      tip.position.set(mult * 0.09, -0.36, -2.9);
      group.add(tip);

      const xPos = mult * (eyeCenterDist + lensRadiusX + 0.02);
      group.position.set(xPos, 0.16, 0.02);
      return group;
    }

    const leftTemple = createTempleGroup(true);
    const rightTemple = createTempleGroup(false);
    rootGroup.add(leftTemple);
    rootGroup.add(rightTemple);
    partsRef.current.leftTemple = leftTemple;
    partsRef.current.rightTemple = rightTemple;

    // Blue-Light High-Energy Ray Simulator
    const blueBeams = new THREE.Group();
    for (let i = -1; i <= 1; i += 2) {
      const beamGeo = new THREE.CylinderGeometry(0.018, 0.018, 3.6, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x64d2ff,
        transparent: true,
        opacity: 0.5,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.rotation.x = Math.PI / 2;
      beam.position.set(i * eyeCenterDist, 0, 1.2);
      blueBeams.add(beam);
    }
    rootGroup.add(blueBeams);
    materialsRef.current.blueLightBeams = blueBeams;

    // 7. Interactive Drag & Rotate
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsAutoRotating(false);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        targetRotation.current.y = nx * 0.45;
        targetRotation.current.x = -ny * 0.25;
        return;
      }
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      targetRotation.current.y += dx * 0.008;
      targetRotation.current.x += dy * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPos.current, 0.06);
      }

      // Smooth rotation interpolation
      if (rootGroup) {
        rootGroup.rotation.y += (targetRotation.current.y - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotation.current.x - rootGroup.rotation.x) * 0.08;

        if (isAutoRotating && !isDragging) {
          rootGroup.rotation.y += delta * 0.18;
          rootGroup.position.y = Math.sin(elapsed * 1.5) * 0.07;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      cameraRef.current.aspect = nw / nh;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      partsRef.current = {};
      materialsRef.current = {};
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isAutoRotating]);

  // Synchronize Exploded Positions
  useEffect(() => {
    const parts = partsRef.current;
    if (!parts.leftLens || !parts.rightLens || !parts.leftTemple || !parts.rightTemple) return;

    const p = explosionProgress;

    parts.leftLens.position.z = p * 1.8;
    parts.rightLens.position.z = p * 1.8;
    parts.leftLens.position.x = -1.38 - p * 0.22;
    parts.rightLens.position.x = 1.38 + p * 0.22;

    if (parts.leftCoating && parts.rightCoating) {
      parts.leftCoating.position.z = p * 2.3 + 0.06;
      parts.rightCoating.position.z = p * 2.3 + 0.06;
      parts.leftCoating.position.x = -1.38 - p * 0.26;
      parts.rightCoating.position.x = 1.38 + p * 0.26;
    }

    parts.leftTemple.position.x = -2.52 - p * 1.2;
    parts.rightTemple.position.x = 2.52 + p * 1.2;
    parts.leftTemple.rotation.y = -p * 0.35;
    parts.rightTemple.rotation.y = p * 0.35;

    if (parts.leftRim && parts.rightRim) {
      parts.leftRim.position.z = p * 0.45;
      parts.rightRim.position.z = p * 0.45;
    }
  }, [explosionProgress]);

  // Synchronize Real-Life Lens Physics (Transitions Sunlight, Blue-Cut & Night Drive)
  useEffect(() => {
    const parts = partsRef.current;
    if (!parts.leftLens || !parts.rightLens) return;

    const leftMat = parts.leftLens.material as THREE.MeshPhysicalMaterial;
    const rightMat = parts.rightLens.material as THREE.MeshPhysicalMaterial;

    const uv = sunlightUV / 100; // 0 (clear indoors) to 1 (full dark sunglasses)

    // Calculate Dynamic Color Tint based on selected Transitions® hue
    let tintColorHex = 0xffffff;
    if (activeTint === 'emerald') {
      // Transitions® Emerald: fades from crystal clear to lush deep racing green
      tintColorHex = uv > 0.05 ? 0x0f382a : 0xf0fdff;
    } else if (activeTint === 'graphite') {
      // Transitions® Graphite Grey: true neutral dark smoke sunglass tint
      tintColorHex = uv > 0.05 ? 0x1a1a1c : 0xffffff;
    } else if (activeTint === 'sapphire') {
      // Transitions® Sapphire: electric blue sunglass tint
      tintColorHex = uv > 0.05 ? 0x0f2a4a : 0xf0f7ff;
    }

    // Adjust Transmission: 0.96 (clear) smoothly drops to 0.20 (sunglasses)
    const currentTransmission = 0.96 - uv * 0.76;
    const currentRoughness = 0.02 + uv * 0.04;

    leftMat.color.setHex(tintColorHex);
    rightMat.color.setHex(tintColorHex);
    leftMat.transmission = currentTransmission;
    rightMat.transmission = currentTransmission;
    leftMat.roughness = currentRoughness;
    rightMat.roughness = currentRoughness;
    leftMat.needsUpdate = true;
    rightMat.needsUpdate = true;

    // Control Blue-Light Ray visibility
    if (materialsRef.current.blueLightBeams) {
      materialsRef.current.blueLightBeams.visible = isBlueCutActive;
    }

    // Control Night Drive Anti-Glare Mode
    if (isNightDriveActive) {
      leftMat.emissive.setHex(0x2997ff);
      leftMat.emissiveIntensity = 0.12;
      rightMat.emissive.setHex(0x2997ff);
      rightMat.emissiveIntensity = 0.12;
    } else {
      leftMat.emissive.setHex(0x0071e3);
      leftMat.emissiveIntensity = 0.04;
      rightMat.emissive.setHex(0x0071e3);
      rightMat.emissiveIntensity = 0.04;
    }
  }, [sunlightUV, activeTint, isBlueCutActive, isNightDriveActive]);

  // Handle Apple-style Presets
  const selectPreset = (preset: ViewPreset) => {
    setActivePreset(preset);
    setIsAutoRotating(false);

    if (preset === 'assembled') {
      setExplosionProgress(0);
      setSunlightUV(0);
      setIsNightDriveActive(false);
      targetCameraPos.current.set(0, 0.3, 5.8);
      targetRotation.current = { x: 0.08, y: -0.2 };
    } else if (preset === 'exploded') {
      setExplosionProgress(1.0);
      targetCameraPos.current.set(0, 0.4, 6.4);
      targetRotation.current = { x: 0.12, y: -0.35 };
    } else if (preset === 'sunlight') {
      setExplosionProgress(0.15);
      setSunlightUV(85); // Auto-demonstrate sunglass tint
      setIsNightDriveActive(false);
      targetCameraPos.current.set(0, 0.2, 5.2);
      targetRotation.current = { x: 0.05, y: 0.15 };
    } else if (preset === 'drivesafe') {
      setExplosionProgress(0.1);
      setSunlightUV(0);
      setIsNightDriveActive(true);
      targetCameraPos.current.set(-1.0, 0.1, 4.6);
      targetRotation.current = { x: 0.05, y: -0.25 };
    }
  };

  return (
    <section id="anatomy-3d" className="relative py-24 bg-black text-apple-text overflow-hidden border-t border-apple-border">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-apple-blue/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Apple Pro Keynote Header: Restrained, Bold, Minimal */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-glass text-apple-blue-light text-xs font-mono uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-apple-blue-light" />
            <span>Interactive Optical Physics</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Realistic Optics.{' '}
            <span className="text-apple-gradient">
              Living Lenses.
            </span>
          </h2>
          <p className="text-apple-subtext text-base sm:text-lg mt-3 font-normal max-w-xl mx-auto">
            Experience real-time Transitions® sunlight darkening, blue-light filtration, and German titanium engineering in motion.
          </p>
        </ScrollReveal>

        {/* 3D Viewport Card */}
        <ScrollReveal variant="scaleIn" className="relative w-full h-[560px] sm:h-[660px] rounded-3xl apple-glass-elevated shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
          {/* Canvas Mount */}
          <div ref={mountRef} className="w-full h-full" />

          {/* Top Apple Preset Switcher Bar */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 z-20">
            <button
              onClick={() => selectPreset('assembled')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activePreset === 'assembled'
                  ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/30'
                  : 'apple-glass text-apple-subtext hover:text-white'
              }`}
            >
              Assembled Frame
            </button>
            <button
              onClick={() => selectPreset('exploded')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activePreset === 'exploded'
                  ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/30'
                  : 'apple-glass text-apple-subtext hover:text-white'
              }`}
            >
              Exploded Anatomy
            </button>
            <button
              onClick={() => selectPreset('sunlight')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activePreset === 'sunlight'
                  ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/30'
                  : 'apple-glass text-apple-subtext hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Sunlight &amp; UV Tint</span>
            </button>
            <button
              onClick={() => selectPreset('drivesafe')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activePreset === 'drivesafe'
                  ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/30'
                  : 'apple-glass text-apple-subtext hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-optic-cyan" />
              <span>Night DriveSafe</span>
            </button>
          </div>

          {/* Auto-Rotate Toggle */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="px-3.5 py-1.5 rounded-full apple-glass text-apple-subtext hover:text-white text-xs font-mono flex items-center gap-1.5"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'text-apple-blue-light animate-spin-slow' : 'text-neutral-500'}`} />
              <span>{isAutoRotating ? 'Auto-Rotate' : 'Paused'}</span>
            </button>
          </div>

          {/* Real-Life Lens Physics Simulator HUD (Floating Glass Overlay) */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 apple-glass-elevated rounded-2xl p-5 shadow-2xl z-20 space-y-4">
            
            {/* Row 1: Real-time Sunlight / UV Photochromic Darkening Slider */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Sun className={`w-4 h-4 ${sunlightUV > 20 ? 'text-amber-400 animate-pulse' : 'text-neutral-400'}`} />
                <div>
                  <span className="text-xs font-semibold text-white block">
                    UV Sunlight Exposure: {sunlightUV}%
                  </span>
                  <span className="text-[11px] text-apple-subtext">
                    {sunlightUV < 15
                      ? 'Clear Indoor Optics (96% Light Transmission)'
                      : sunlightUV < 60
                      ? 'Active Outdoor Tint (Adapting UV Protection)'
                      : 'Deep Category-3 Sunglasses (100% UV400 Blocked)'}
                  </span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="flex items-center gap-3 w-full md:w-72">
                <span className="text-[10px] font-mono text-apple-subtext">INDOOR</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sunlightUV}
                  onChange={(e) => {
                    setSunlightUV(parseInt(e.target.value));
                    setIsAutoRotating(false);
                  }}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-apple-blue"
                />
                <span className="text-[10px] font-mono text-amber-400 font-bold">BRIGHT SUN</span>
              </div>

              {/* Transitions® Tint Color Swatches */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <span className="text-[11px] text-apple-subtext mr-1">Transitions® Tint:</span>
                <button
                  onClick={() => setActiveTint('emerald')}
                  title="Transitions Emerald"
                  className={`w-6 h-6 rounded-full bg-emerald-700 border-2 transition-all ${
                    activeTint === 'emerald' ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-70'
                  }`}
                />
                <button
                  onClick={() => setActiveTint('graphite')}
                  title="Transitions Graphite Grey"
                  className={`w-6 h-6 rounded-full bg-neutral-800 border-2 transition-all ${
                    activeTint === 'graphite' ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-70'
                  }`}
                />
                <button
                  onClick={() => setActiveTint('sapphire')}
                  title="Transitions Sapphire"
                  className={`w-6 h-6 rounded-full bg-blue-800 border-2 transition-all ${
                    activeTint === 'sapphire' ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-70'
                  }`}
                />
              </div>
            </div>

            {/* Row 2: Secondary Physics Toggles (Blue-Cut, DriveSafe, Explode & Book) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                {/* Explode Slider Pill */}
                <div className="flex items-center gap-2 apple-glass px-3 py-1.5 rounded-full">
                  <Layers className="w-3.5 h-3.5 text-apple-blue-light" />
                  <span className="text-xs text-apple-subtext">Explode:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={explosionProgress}
                    onChange={(e) => {
                      setExplosionProgress(parseFloat(e.target.value));
                      setIsAutoRotating(false);
                    }}
                    className="w-20 h-1 bg-neutral-700 rounded appearance-none cursor-pointer accent-apple-blue"
                  />
                  <span className="text-xs font-mono text-white">{Math.round(explosionProgress * 100)}%</span>
                </div>

                {/* Blue-Light Ray Toggle */}
                <button
                  onClick={() => setIsBlueCutActive(!isBlueCutActive)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                    isBlueCutActive
                      ? 'bg-optic-cyan/20 border border-optic-cyan/40 text-optic-cyan'
                      : 'apple-glass text-apple-subtext'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>BlueProtect™ Filter {isBlueCutActive ? 'ON' : 'OFF'}</span>
                </button>

                {/* ZEISS DriveSafe Night Mode Toggle */}
                <button
                  onClick={() => setIsNightDriveActive(!isNightDriveActive)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                    isNightDriveActive
                      ? 'bg-apple-blue/20 border border-apple-blue text-apple-blue-light'
                      : 'apple-glass text-apple-subtext'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>ZEISS DriveSafe {isNightDriveActive ? 'Active' : 'Off'}</span>
                </button>
              </div>

              {/* Book Appointment CTA */}
              <button
                onClick={onOpenBooking}
                className="px-5 py-2 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white font-medium text-xs tracking-wide transition shadow-lg shadow-apple-blue/20 whitespace-nowrap"
              >
                Schedule In-Store Lens Test
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Apple Precision Optical Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <ScrollReveal variant="fadeUp" delay={0.1} className="p-6 rounded-2xl apple-glass-card">
            <span className="text-[11px] font-mono uppercase tracking-wider text-apple-blue-light block mb-1">
              60–70% Optical Revenue
            </span>
            <h3 className="text-lg font-bold text-white mb-1.5">
              Prescription Lens Specialisation
            </h3>
            <p className="text-xs text-apple-subtext leading-relaxed">
              Every lens is surfaced to your exact posture, pupil center, and occupational focal distance.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2} className="p-6 rounded-2xl apple-glass-card">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
              Transitions® GEN S™
            </span>
            <h3 className="text-lg font-bold text-white mb-1.5">
              Instant Dynamic UV Adaptation
            </h3>
            <p className="text-xs text-apple-subtext leading-relaxed">
              Crystal clear indoors, darkening to sunglasses in seconds under bright sunlight with 100% UV400 shield.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.3} className="p-6 rounded-2xl apple-glass-card">
            <span className="text-[11px] font-mono uppercase tracking-wider text-apple-green block mb-1">
              Connected Healthcare
            </span>
            <h3 className="text-lg font-bold text-white mb-1.5">
              Global Eye Hospital Corridor
            </h3>
            <p className="text-xs text-apple-subtext leading-relaxed">
              Ground-floor internal link on KPHB Road No. 1. Direct doctor prescription verification.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
