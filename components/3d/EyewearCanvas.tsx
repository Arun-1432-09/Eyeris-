'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCw, Sun, Moon, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface EyewearCanvasProps {
  onOpenBooking: () => void;
}

type ViewPreset = 'assembled' | 'exploded' | 'sunlight' | 'drivesafe';
type TransitionsTint = 'graphite' | 'emerald' | 'amber';

export const EyewearCanvas: React.FC<EyewearCanvasProps> = ({ onOpenBooking }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Interactive Simulator State
  const [explosionProgress, setExplosionProgress] = useState<number>(0);
  const [activePreset, setActivePreset] = useState<ViewPreset>('assembled');
  const [sunlightUV, setSunlightUV] = useState<number>(0); // 0% (Indoors) to 100% (Direct UV Sun)
  const [activeTint, setActiveTint] = useState<TransitionsTint>('graphite');
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
    titaniumCore?: THREE.MeshStandardMaterial;
    acetateRims?: THREE.MeshPhysicalMaterial;
  }>({});

  const partsRef = useRef<{
    leftLens?: THREE.Mesh;
    rightLens?: THREE.Mesh;
    leftRim?: THREE.Mesh;
    rightRim?: THREE.Mesh;
    bridge?: THREE.Mesh;
    leftTemple?: THREE.Group;
    rightTemple?: THREE.Group;
    rootGroup?: THREE.Group;
    shadowPlane?: THREE.Mesh;
  }>({});

  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.2, 5.4));
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0.08, y: -0.2 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene in High-Contrast Luxury Dark Showroom
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with Natural FOV
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.copy(targetCameraPos.current);
    cameraRef.current = camera;

    // 3. Renderer with ACES Filmic Tone Mapping
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

    // 4. Dramatic Studio Overhead & Rim Spotlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Overhead Spotlight
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(4, 8, 5);
    scene.add(keyLight);

    // Rim Backlight (Accentuates acetate bevels and metallic chamfers)
    const rimLight = new THREE.DirectionalLight(0xd8dee8, 3.0);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Subtle Ground Fill Light
    const fillLight = new THREE.DirectionalLight(0x333333, 1.2);
    fillLight.position.set(0, -6, 2);
    scene.add(fillLight);

    // 5. Soft Ground Contact Shadow on Dark Reflective Pedestal
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(128, 128, 15, 128, 128, 125);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
      gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6.8, 3.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -1.65, 0);
    scene.add(shadowPlane);
    partsRef.current.shadowPlane = shadowPlane;

    // 6. Photorealistic Physical Materials
    // Hand-Polished Italian Cellulosic Acetate
    const acetateMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0c0c0e,
      roughness: 0.08,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.9,
    });
    materialsRef.current.acetateRims = acetateMaterial;

    // Medical-Grade Beta-Titanium Bridge & Core
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x242428,
      metalness: 0.95,
      roughness: 0.2,
    });
    materialsRef.current.titaniumCore = titaniumMaterial;

    // 18K Gold Plated Precision 5-Barrel Hinges
    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.98,
      roughness: 0.12,
    });

    // 1.67 High-Index Optical Glass with Multi-Layer Anti-Reflective Coating
    const lensGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.98,
      opacity: 0.98,
      transparent: true,
      roughness: 0.01,
      ior: 1.67,
      reflectivity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.015,
      thickness: 1.4,
    });
    materialsRef.current.lensGlass = lensGlassMaterial;

    // 7. Sculpted Anatomical Eyewear Model
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    partsRef.current.rootGroup = rootGroup;

    // Wayfarer / Geometric Rims with Hand-Finished Bevels
    const createBeveledRim = (xOffset: number) => {
      const outerShape = new THREE.Shape();
      const w = 1.35;
      const h = 0.98;
      const r = 0.32;
      
      // Sculpted outer rim with gentle browline curve
      outerShape.moveTo(-w + r, -h);
      outerShape.lineTo(w - r, -h);
      outerShape.quadraticCurveTo(w, -h, w, -h + r);
      outerShape.lineTo(w + 0.08, h - r);
      outerShape.quadraticCurveTo(w + 0.08, h, w - r, h);
      outerShape.lineTo(-w + r, h + 0.04);
      outerShape.quadraticCurveTo(-w, h + 0.04, -w, h - r);
      outerShape.lineTo(-w, -h + r);
      outerShape.quadraticCurveTo(-w, -h, -w + r, -h);

      // Inner Lens Aperture
      const hole = new THREE.Path();
      const ih = 0.84;
      const iw = 1.20;
      const ir = 0.26;
      hole.moveTo(-iw + ir, -ih);
      hole.lineTo(iw - ir, -ih);
      hole.quadraticCurveTo(iw, -ih, iw, -ih + ir);
      hole.lineTo(iw, ih - ir);
      hole.quadraticCurveTo(iw, ih, iw - ir, ih);
      hole.lineTo(-iw + ir, ih);
      hole.quadraticCurveTo(-iw, ih, -iw, ih - ir);
      hole.lineTo(-iw, -ih + ir);
      hole.quadraticCurveTo(-iw, -ih, -iw + ir, -ih);
      outerShape.holes.push(hole);

      const extrudeSettings = {
        depth: 0.16,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 1,
        bevelSize: 0.035,
        bevelThickness: 0.035,
      };

      const geo = new THREE.ExtrudeGeometry(outerShape, extrudeSettings);
      geo.center();
      const mesh = new THREE.Mesh(geo, acetateMaterial);
      mesh.position.set(xOffset, 0, 0);

      // Add silver front rivets (Signature icon rivets)
      const rivetGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16);
      rivetGeo.rotateX(Math.PI / 2);
      const rivetMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.95, roughness: 0.1 });
      const rivet1 = new THREE.Mesh(rivetGeo, rivetMat);
      rivet1.position.set(xOffset > 0 ? 1.25 : -1.25, 0.72, 0.1);
      mesh.add(rivet1);

      return mesh;
    };

    const leftRim = createBeveledRim(-1.6);
    const rightRim = createBeveledRim(1.6);
    partsRef.current.leftRim = leftRim;
    partsRef.current.rightRim = rightRim;
    rootGroup.add(leftRim);
    rootGroup.add(rightRim);

    // Anatomical Keyhole Titanium Bridge
    const bridgeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.48, 0.22, 0),
      new THREE.Vector3(-0.25, 0.38, 0.03),
      new THREE.Vector3(0, 0.44, 0.05),
      new THREE.Vector3(0.25, 0.38, 0.03),
      new THREE.Vector3(0.48, 0.22, 0),
    ]);
    const bridgeGeo = new THREE.TubeGeometry(bridgeCurve, 24, 0.055, 12, false);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, titaniumMaterial);
    partsRef.current.bridge = bridgeMesh;
    rootGroup.add(bridgeMesh);

    // High-Index 1.67 Aspheric Lenses
    const createAsphericLens = (xOffset: number) => {
      const lensGeo = new THREE.CylinderGeometry(1.22, 1.22, 0.09, 36);
      lensGeo.rotateX(Math.PI / 2);
      lensGeo.scale(1.0, 0.75, 1.0);
      const mesh = new THREE.Mesh(lensGeo, lensGlassMaterial.clone());
      mesh.position.set(xOffset, 0, 0);
      return mesh;
    };

    const leftLens = createAsphericLens(-1.6);
    const rightLens = createAsphericLens(1.6);
    partsRef.current.leftLens = leftLens;
    partsRef.current.rightLens = rightLens;
    rootGroup.add(leftLens);
    rootGroup.add(rightLens);

    // Beveled Temples with 18k Gold Hinges
    const createTemple = (isLeft: boolean) => {
      const templeGroup = new THREE.Group();

      // Precision 5-barrel hinge block
      const hingeGeo = new THREE.BoxGeometry(0.12, 0.16, 0.16);
      const hinge = new THREE.Mesh(hingeGeo, goldAccentMaterial);
      templeGroup.add(hinge);

      // Sculpted Temple Arm
      const armShape = new THREE.Shape();
      armShape.moveTo(0, 0.06);
      armShape.lineTo(2.7, 0.05);
      armShape.quadraticCurveTo(3.1, -0.28, 3.35, -0.65);
      armShape.lineTo(3.35, -0.75);
      armShape.quadraticCurveTo(3.05, -0.35, 2.65, -0.04);
      armShape.lineTo(0, -0.06);
      armShape.closePath();

      const armExtrude = new THREE.ExtrudeGeometry(armShape, { depth: 0.045, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 3 });
      armExtrude.rotateY(Math.PI / 2);
      const arm = new THREE.Mesh(armExtrude, acetateMaterial);
      arm.position.set(0, 0, 0);
      templeGroup.add(arm);

      // Gold Core-Wire Accent inside temple
      const coreGeo = new THREE.CylinderGeometry(0.012, 0.012, 2.5, 8);
      coreGeo.rotateZ(Math.PI / 2);
      const core = new THREE.Mesh(coreGeo, goldAccentMaterial);
      core.position.set(0.02, 0, 1.25);
      templeGroup.add(core);

      templeGroup.position.set(isLeft ? -2.95 : 2.95, 0.22, 0);
      templeGroup.rotation.y = isLeft ? 1.48 : -1.48;
      return templeGroup;
    };

    const leftTemple = createTemple(true);
    const rightTemple = createTemple(false);
    partsRef.current.leftTemple = leftTemple;
    partsRef.current.rightTemple = rightTemple;
    rootGroup.add(leftTemple);
    rootGroup.add(rightTemple);

    // Mouse Interaction
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      setIsAutoRotating(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotation.current.y += deltaX * 0.007;
      targetRotation.current.x = Math.max(-0.55, Math.min(0.55, targetRotation.current.x + deltaY * 0.007));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 60 FPS Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animateLoop = () => {
      animationFrameId = requestAnimationFrame(animateLoop);
      const delta = clock.getDelta();

      if (rootGroup) {
        if (isAutoRotating) {
          targetRotation.current.y += delta * 0.32;
        }

        rootGroup.rotation.y += (targetRotation.current.y - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotation.current.x - rootGroup.rotation.x) * 0.08;

        camera.position.lerp(targetCameraPos.current, 0.05);
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animateLoop();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isAutoRotating]);

  // Handle Explode Animation Updates
  useEffect(() => {
    const parts = partsRef.current;
    if (!parts.leftRim || !parts.rightRim || !parts.leftLens || !parts.rightLens || !parts.leftTemple || !parts.rightTemple || !parts.bridge) return;

    const d = explosionProgress;
    parts.leftRim.position.x = -1.6 - d * 1.35;
    parts.rightRim.position.x = 1.6 + d * 1.35;
    parts.bridge.position.y = 0 + d * 0.9;
    parts.leftLens.position.z = 0 + d * 2.0;
    parts.rightLens.position.z = 0 + d * 2.0;
    parts.leftTemple.position.x = -2.95 - d * 1.6;
    parts.rightTemple.position.x = 2.95 + d * 1.6;
  }, [explosionProgress]);

  // Handle Photochromic Transitions® Real-Time Dye Darkening
  useEffect(() => {
    const leftLens = partsRef.current.leftLens;
    const rightLens = partsRef.current.rightLens;
    if (!leftLens || !rightLens) return;

    const leftMat = leftLens.material as THREE.MeshPhysicalMaterial;
    const rightMat = rightLens.material as THREE.MeshPhysicalMaterial;
    if (!leftMat || !rightMat) return;

    const uv = sunlightUV / 100;
    let tintColorHex = 0xffffff;

    if (activeTint === 'graphite') {
      tintColorHex = uv > 0.05 ? 0x141414 : 0xfcfcfc;
    } else if (activeTint === 'emerald') {
      tintColorHex = uv > 0.05 ? 0x0a291e : 0xf2faf5;
    } else if (activeTint === 'amber') {
      tintColorHex = uv > 0.05 ? 0x331e0c : 0xfdfbf7;
    }

    const currentTransmission = 0.98 - uv * 0.82;
    const currentRoughness = 0.01 + uv * 0.04;

    leftMat.color.setHex(tintColorHex);
    rightMat.color.setHex(tintColorHex);
    leftMat.transmission = currentTransmission;
    rightMat.transmission = currentTransmission;
    leftMat.roughness = currentRoughness;
    rightMat.roughness = currentRoughness;

    // BlueProtect subtle violet-blue reflection coating
    if (isBlueCutActive) {
      leftMat.reflectivity = 0.95;
      rightMat.reflectivity = 0.95;
      leftMat.clearcoat = 1.0;
      rightMat.clearcoat = 1.0;
    }

    leftMat.needsUpdate = true;
    rightMat.needsUpdate = true;
  }, [sunlightUV, activeTint, isBlueCutActive]);

  const selectPreset = (preset: ViewPreset) => {
    setActivePreset(preset);
    setIsAutoRotating(false);

    if (preset === 'assembled') {
      setExplosionProgress(0);
      setSunlightUV(0);
      targetCameraPos.current.set(0, 0.2, 5.4);
      targetRotation.current = { x: 0.08, y: -0.2 };
    } else if (preset === 'exploded') {
      setExplosionProgress(1.0);
      targetCameraPos.current.set(0, 0.35, 6.2);
      targetRotation.current = { x: 0.12, y: -0.32 };
    } else if (preset === 'sunlight') {
      setExplosionProgress(0.08);
      setSunlightUV(85);
      targetCameraPos.current.set(0, 0.18, 5.0);
      targetRotation.current = { x: 0.05, y: 0.18 };
    } else if (preset === 'drivesafe') {
      setExplosionProgress(0.04);
      setSunlightUV(0);
      targetCameraPos.current.set(-0.6, 0.15, 4.8);
      targetRotation.current = { x: 0.05, y: -0.25 };
    }
  };

  return (
    <section id="anatomy-3d" className="py-24 sm:py-36 bg-[#050505] text-white border-b border-[#292929] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#707070] mb-3">
            INTERACTIVE THREE.JS STUDIO
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Anatomy of Precision.{' '}
            <span className="font-light text-[#A1A1A6]">Living Optics.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A6] font-light mt-4 leading-relaxed">
            Inspect the hand-polished Italian acetate, German beta-titanium core, and test real-time Transitions® photochromic dye activation under dynamic sunlight.
          </p>
        </ScrollReveal>

        {/* 3D Viewport Card in Luxury Dark Showroom */}
        <div className="relative w-full h-[540px] sm:h-[640px] rounded-3xl bg-[#101010] border border-[#292929] shadow-luxury-lg overflow-hidden cursor-grab active:cursor-grabbing">
          {/* Canvas Mount */}
          <div ref={mountRef} className="w-full h-full" />

          {/* Top Preset Switcher Bar */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 z-20">
            <button
              onClick={() => selectPreset('assembled')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition ${
                activePreset === 'assembled'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-black/60 backdrop-blur-md border border-[#292929] text-[#A1A1A6] hover:text-white'
              }`}
            >
              Assembled
            </button>
            <button
              onClick={() => selectPreset('exploded')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition ${
                activePreset === 'exploded'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-black/60 backdrop-blur-md border border-[#292929] text-[#A1A1A6] hover:text-white'
              }`}
            >
              Exploded Assembly
            </button>
            <button
              onClick={() => selectPreset('sunlight')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition flex items-center gap-1.5 ${
                activePreset === 'sunlight'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-black/60 backdrop-blur-md border border-[#292929] text-[#A1A1A6] hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Sunlight Tint</span>
            </button>
            <button
              onClick={() => selectPreset('drivesafe')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition flex items-center gap-1.5 ${
                activePreset === 'drivesafe'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-black/60 backdrop-blur-md border border-[#292929] text-[#A1A1A6] hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-white" />
              <span>ZEISS DriveSafe</span>
            </button>
          </div>

          {/* Auto-Rotate Toggle */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#292929] text-[#A1A1A6] hover:text-white text-xs font-mono flex items-center gap-1.5"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'text-white animate-spin-slow' : 'text-[#707070]'}`} />
              <span>{isAutoRotating ? 'Auto-Rotate' : 'Paused'}</span>
            </button>
          </div>

          {/* Floating Interactive Callout Badges when Exploded */}
          {explosionProgress > 0.4 && (
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-8 sm:p-12 animate-in fade-in duration-300">
              {/* Callout 1: Aspheric Lens */}
              <div className="self-center bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-[11px] font-mono text-white shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>1.67 Aspheric High-Index Optical Glass with Multi-Layer AR</span>
              </div>

              {/* Callout 2 & 3: Bridge & Acetate Rim */}
              <div className="flex justify-between w-full max-w-2xl mx-auto">
                <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1 text-[10px] font-mono text-[#A1A1A6]">
                  Hand-Polished Italian Acetate
                </div>
                <div className="bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 rounded-full px-3.5 py-1 text-[10px] font-mono text-[#D4AF37]">
                  German Beta-Titanium Core
                </div>
                <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1 text-[10px] font-mono text-[#A1A1A6]">
                  18K Gold 5-Barrel Spring Hinge
                </div>
              </div>
            </div>
          )}

          {/* Real-Life Lens Physics Simulator HUD */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#050505]/92 backdrop-blur-2xl border border-[#292929] rounded-2xl p-4 sm:p-5 shadow-2xl z-20 space-y-3">
            
            {/* Row 1: UV Sunlight Slider */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-3 border-b border-[#292929]">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Sun className={`w-4 h-4 ${sunlightUV > 20 ? 'text-[#D4AF37] animate-pulse' : 'text-[#707070]'}`} />
                <div>
                  <span className="text-xs font-mono font-bold text-white block">
                    UV Sunlight Intensity: {sunlightUV}%
                  </span>
                  <span className="text-[10px] font-mono text-[#A1A1A6]">
                    {sunlightUV < 15
                      ? 'Clear Indoor Optics (98% Light Transmission)'
                      : sunlightUV < 60
                      ? 'Active Outdoor Transitions® Dye Darkening'
                      : 'Deep Category-3 Sunglasses (100% UV400 Defense)'}
                  </span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="flex items-center gap-3 w-full md:w-72">
                <span className="text-[10px] font-mono text-[#707070]">INDOOR</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sunlightUV}
                  onChange={(e) => {
                    setSunlightUV(parseInt(e.target.value));
                    setIsAutoRotating(false);
                  }}
                  className="w-full h-1 bg-[#292929] rounded appearance-none cursor-pointer accent-white"
                />
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold">100% UV</span>
              </div>

              {/* Transitions® Shade Swatches */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <span className="text-[10px] font-mono text-[#707070] mr-1">Shade:</span>
                <button
                  onClick={() => setActiveTint('graphite')}
                  title="Graphite Grey"
                  className={`w-5 h-5 rounded-full bg-neutral-900 border transition ${activeTint === 'graphite' ? 'border-white ring-2 ring-white/40' : 'border-neutral-700'}`}
                />
                <button
                  onClick={() => setActiveTint('emerald')}
                  title="Emerald Green"
                  className={`w-5 h-5 rounded-full bg-emerald-950 border transition ${activeTint === 'emerald' ? 'border-white ring-2 ring-emerald-500/40' : 'border-neutral-700'}`}
                />
                <button
                  onClick={() => setActiveTint('amber')}
                  title="Amber Brown"
                  className={`w-5 h-5 rounded-full bg-amber-950 border transition ${activeTint === 'amber' ? 'border-white ring-2 ring-amber-500/40' : 'border-neutral-700'}`}
                />
              </div>
            </div>

            {/* Row 2: Secondary Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                {/* Explode Slider */}
                <div className="flex items-center gap-2 bg-[#101010] border border-[#292929] px-3 py-1.5 rounded-full">
                  <Layers className="w-3.5 h-3.5 text-white" />
                  <span className="text-[11px] font-mono text-[#A1A1A6]">Explode:</span>
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
                    className="w-20 h-1 bg-[#292929] rounded appearance-none cursor-pointer accent-white"
                  />
                  <span className="text-[11px] font-mono text-white">{Math.round(explosionProgress * 100)}%</span>
                </div>

                {/* Blue-Cut Toggle */}
                <button
                  onClick={() => setIsBlueCutActive(!isBlueCutActive)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition flex items-center gap-1.5 ${
                    isBlueCutActive
                      ? 'bg-white text-black font-semibold'
                      : 'border border-[#292929] text-[#A1A1A6] hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>BlueProtect™ Filter {isBlueCutActive ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {/* Book In-Store Lens Test CTA */}
              <button
                onClick={onOpenBooking}
                className="px-5 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs tracking-wider transition shadow-sm whitespace-nowrap"
              >
                SCHEDULE IN-STORE LENS TEST
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
