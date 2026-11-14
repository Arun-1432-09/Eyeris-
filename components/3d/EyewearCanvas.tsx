'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, ShieldCheck, Sparkles, RotateCw, Eye, Check, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface EyewearCanvasProps {
  onOpenBooking: () => void;
}

type ViewPreset = 'assembled' | 'exploded' | 'lens' | 'temples';

export const EyewearCanvas: React.FC<EyewearCanvasProps> = ({ onOpenBooking }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [explosionProgress, setExplosionProgress] = useState<number>(0.2);
  const [activePreset, setActivePreset] = useState<ViewPreset>('assembled');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const partsRef = useRef<{
    leftLens?: THREE.Mesh;
    rightLens?: THREE.Mesh;
    leftCoating?: THREE.Mesh;
    rightCoating?: THREE.Mesh;
    leftRim?: THREE.Mesh;
    rightRim?: THREE.Mesh;
    bridge?: THREE.Mesh;
    leftNosePad?: THREE.Mesh;
    rightNosePad?: THREE.Mesh;
    leftTemple?: THREE.Group;
    rightTemple?: THREE.Group;
    rootGroup?: THREE.Group;
    lightBeams?: THREE.Group;
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
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.copy(targetCameraPos.current);
    cameraRef.current = camera;

    // 3. Renderer with high-end tone mapping & antialias
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light (Eyeris Teal Rim)
    const keyLight = new THREE.DirectionalLight(0x00c49f, 3.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    // Warm Accent Light (Champagne Gold highlight)
    const goldLight = new THREE.DirectionalLight(0xd4af37, 2.4);
    goldLight.position.set(-6, 4, 4);
    scene.add(goldLight);

    // Top Specular Light
    const topLight = new THREE.DirectionalLight(0xffffff, 2.2);
    topLight.position.set(0, 9, 3);
    scene.add(topLight);

    // Back Rim (Optic Blue silhouette)
    const backLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    backLight.position.set(0, -4, -6);
    scene.add(backLight);

    // 5. Materials
    // Matte Midnight Titanium Frame
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x14171d,
      metalness: 0.94,
      roughness: 0.22,
    });

    // 24K Champagne Gold Accents & Hinges
    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.98,
      roughness: 0.14,
    });

    // High-Index 1.67 Physical Lens (Glass transmission + chromatic reflection)
    const lensGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf0fdff,
      transmission: 0.96,
      opacity: 0.92,
      transparent: true,
      roughness: 0.02,
      ior: 1.67,
      reflectivity: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      emissive: 0x00c49f,
      emissiveIntensity: 0.08,
    });

    // Anti-Reflective Molecular Coating Shield (Semi-transparent iridescent sheen)
    const coatingMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00c49f,
      transmission: 0.88,
      opacity: 0.65,
      transparent: true,
      roughness: 0.06,
      clearcoat: 1.0,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.2,
    });

    // Medical Silicone Nose Pads
    const siliconeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.8,
      transparent: true,
      roughness: 0.35,
    });

    // 6. Geometry Creation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    partsRef.current.rootGroup = rootGroup;

    const lensRadiusX = 1.08;
    const lensRadiusY = 0.82;
    const eyeCenterDist = 1.38;

    // Helper: Oval Lens
    function createLensMesh(xOffset: number): THREE.Mesh {
      const shape = new THREE.Shape();
      const segments = 56;
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
        const x = Math.cos(theta) * (lensRadiusX - 0.04);
        const y = Math.sin(theta) * (lensRadiusY - 0.04);
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      const geo = new THREE.ShapeGeometry(shape);
      const mesh = new THREE.Mesh(geo, coatingMaterial);
      mesh.position.set(xOffset, 0, 0.06);
      return mesh;
    }

    // Helper: Rim Frame
    function createRimMesh(xOffset: number): THREE.Mesh {
      const outerShape = new THREE.Shape();
      const rimWidth = 0.08;
      const segments = 56;

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
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
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

    // Add Anti-Reflective Coating Layers
    const leftCoating = createCoatingMesh(-eyeCenterDist);
    const rightCoating = createCoatingMesh(eyeCenterDist);
    rootGroup.add(leftCoating);
    rootGroup.add(rightCoating);
    partsRef.current.leftCoating = leftCoating;
    partsRef.current.rightCoating = rightCoating;

    // Bridge Arch
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
    partsRef.current.leftNosePad = leftPad;
    partsRef.current.rightNosePad = rightPad;

    // Temples (Sub-10g Ergonomic Beta-Titanium Arms)
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

      // Ergonomic Curved Arm
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

    // Laser Light Beams (Anti-Reflective Dispersion rays)
    const beams = new THREE.Group();
    for (let i = -1; i <= 1; i += 2) {
      const beamGeo = new THREE.CylinderGeometry(0.015, 0.015, 3.2, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.rotation.x = Math.PI / 2;
      beam.position.set(i * eyeCenterDist, 0, 0.8);
      beams.add(beam);
    }
    rootGroup.add(beams);
    partsRef.current.lightBeams = beams;

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
          rootGroup.rotation.y += delta * 0.2;
          rootGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
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

    // Lenses fly forward along Z
    parts.leftLens.position.z = p * 1.8;
    parts.rightLens.position.z = p * 1.8;
    parts.leftLens.position.x = -1.38 - p * 0.22;
    parts.rightLens.position.x = 1.38 + p * 0.22;

    // Anti-Reflective Coating floats further in front of lenses
    if (parts.leftCoating && parts.rightCoating) {
      parts.leftCoating.position.z = p * 2.3 + 0.06;
      parts.rightCoating.position.z = p * 2.3 + 0.06;
      parts.leftCoating.position.x = -1.38 - p * 0.26;
      parts.rightCoating.position.x = 1.38 + p * 0.26;
    }

    // Temples slide outward & flex
    parts.leftTemple.position.x = -2.52 - p * 1.2;
    parts.rightTemple.position.x = 2.52 + p * 1.2;
    parts.leftTemple.rotation.y = -p * 0.35;
    parts.rightTemple.rotation.y = p * 0.35;

    // Rims drift slightly forward
    if (parts.leftRim && parts.rightRim) {
      parts.leftRim.position.z = p * 0.45;
      parts.rightRim.position.z = p * 0.45;
    }

    // Light rays expand
    if (parts.lightBeams && parts.lightBeams.children.length >= 2) {
      parts.lightBeams.scale.set(1 + p * 0.5, 1 + p * 0.8, 1);
    }
  }, [explosionProgress]);

  // Handle Preset Views
  const selectPreset = (preset: ViewPreset) => {
    setActivePreset(preset);
    setIsAutoRotating(false);

    if (preset === 'assembled') {
      setExplosionProgress(0);
      targetCameraPos.current.set(0, 0.3, 5.8);
      targetRotation.current = { x: 0.08, y: -0.2 };
    } else if (preset === 'exploded') {
      setExplosionProgress(1.0);
      targetCameraPos.current.set(0, 0.4, 6.4);
      targetRotation.current = { x: 0.12, y: -0.35 };
    } else if (preset === 'lens') {
      setExplosionProgress(0.75);
      targetCameraPos.current.set(-1.2, 0.1, 4.0);
      targetRotation.current = { x: 0.05, y: -0.15 };
    } else if (preset === 'temples') {
      setExplosionProgress(0.35);
      targetCameraPos.current.set(2.4, 0.2, 4.5);
      targetRotation.current = { x: 0.1, y: 1.1 };
    }
  };

  return (
    <section id="anatomy-3d" className="relative py-20 bg-background text-white overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header: Short, Clear, Minimal */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-brand-400" />
            <span>Interactive 3D Anatomy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            The Science Behind{' '}
            <span className="bg-gradient-to-r from-brand-300 to-optic-blue bg-clip-text text-transparent">
              Precision Eyewear.
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            60–70% of optical performance lives in the lens. Drag to rotate and explore the layers.
          </p>
        </ScrollReveal>

        {/* 3D Viewport Card */}
        <ScrollReveal variant="scaleIn" className="relative w-full h-[520px] sm:h-[600px] rounded-3xl bg-surface/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
          {/* Canvas Mount */}
          <div ref={mountRef} className="w-full h-full" />

          {/* Preset Buttons HUD */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 z-20">
            <button
              onClick={() => selectPreset('assembled')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activePreset === 'assembled'
                  ? 'bg-brand-400 text-slate-950 font-bold shadow-lg shadow-brand-400/20'
                  : 'bg-surface-raised/80 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              Assembled Frame
            </button>
            <button
              onClick={() => selectPreset('exploded')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activePreset === 'exploded'
                  ? 'bg-brand-400 text-slate-950 font-bold shadow-lg shadow-brand-400/20'
                  : 'bg-surface-raised/80 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              Exploded Anatomy
            </button>
            <button
              onClick={() => selectPreset('lens')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activePreset === 'lens'
                  ? 'bg-brand-400 text-slate-950 font-bold shadow-lg shadow-brand-400/20'
                  : 'bg-surface-raised/80 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              Lens Coating Shield
            </button>
            <button
              onClick={() => selectPreset('temples')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activePreset === 'temples'
                  ? 'bg-brand-400 text-slate-950 font-bold shadow-lg shadow-brand-400/20'
                  : 'bg-surface-raised/80 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              Titanium Flex Arms
            </button>
          </div>

          {/* Quick Rotation / Auto-play Toggle */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="px-3 py-1.5 rounded-xl bg-surface-raised/80 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 backdrop-blur-md"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'text-brand-400 animate-spin-slow' : 'text-neutral-500'}`} />
              <span>{isAutoRotating ? 'Auto-Rotate ON' : 'Paused'}</span>
            </button>
          </div>

          {/* Bottom Slider & Action Bar */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 bg-surface-raised/90 border border-white/10 backdrop-blur-xl rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl z-20">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-mono uppercase text-brand-300 tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <Layers className="w-4 h-4 text-brand-400" />
                <span>Explode: {Math.round(explosionProgress * 100)}%</span>
              </span>
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
                className="w-full sm:w-56 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-400"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-[11px] text-neutral-400 hidden md:inline">
                Drag to rotate 360° • Pinch to inspect
              </span>
              <button
                onClick={onOpenBooking}
                className="text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-300 to-brand-400 hover:from-brand-200 hover:to-brand-300 px-4 py-2 rounded-xl transition shadow-[0_0_20px_rgba(0,196,159,0.3)] whitespace-nowrap"
              >
                Book Lens Fitting
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Key Takeaway Stats — Short, Simple & Clear */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <ScrollReveal variant="fadeUp" delay={0.1} className="p-5 rounded-2xl bg-surface/60 border border-white/5 hover:border-brand-500/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-serif">60–70% Lens Specialisation</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We calibrate lenses to your exact working posture, screen distance, and prescription power.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2} className="p-5 rounded-2xl bg-surface/60 border border-white/5 hover:border-gold-400/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center text-gold-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-serif">Curated International Brands</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Authentic Ray-Ban, Oakley, Prada &amp; Stepper Titanium at practical Hyderabad price points.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.3} className="p-5 rounded-2xl bg-surface/60 border border-white/5 hover:border-optic-blue/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-optic-blue/10 flex items-center justify-center text-optic-blue">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-serif">Hospital-Connected Care</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Direct ground-floor link to Global Eye Hospital. Transition seamlessly from doctor Rx to custom eyewear.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
