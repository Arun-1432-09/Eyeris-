'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Layers, ShieldCheck, Sparkles, RotateCw, ZoomIn } from 'lucide-react';

interface EyewearCanvasProps {
  onOpenBooking: () => void;
}

export const EyewearCanvas: React.FC<EyewearCanvasProps> = ({ onOpenBooking }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [explosionProgress, setExplosionProgress] = useState<number>(0);
  const [activeAnnotation, setActiveAnnotation] = useState<string>('all');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const partsRef = useRef<{
    leftLens?: THREE.Mesh;
    rightLens?: THREE.Mesh;
    leftRim?: THREE.Mesh;
    rightRim?: THREE.Mesh;
    bridge?: THREE.Mesh;
    leftTemple?: THREE.Group;
    rightTemple?: THREE.Group;
    rootGroup?: THREE.Group;
    lensRays?: THREE.Group;
  }>({});

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 6.2);

    // 3. Renderer with antialiasing and alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0x00c49f, 2.5); // Signature Eyeris teal rim
    mainKeyLight.position.set(4, 5, 5);
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8); // Cool optic blue fill
    fillLight.position.set(-5, 3, 3);
    scene.add(fillLight);

    const topSoftLight = new THREE.DirectionalLight(0xffffff, 2.0);
    topSoftLight.position.set(0, 8, 2);
    scene.add(topSoftLight);

    const backRimLight = new THREE.DirectionalLight(0xa855f7, 2.2); // Luxury purple backlight
    backRimLight.position.set(0, -3, -5);
    scene.add(backRimLight);

    // 5. Build High-Fidelity Parametric Eyewear Model
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    partsRef.current.rootGroup = rootGroup;

    // Materials
    // Frame: Midnight Matte Titanium
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      metalness: 0.92,
      roughness: 0.22,
    });

    // Gold / Rose Accent Hinges & Screws
    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
    });

    // Precision Optical Lens Material: Physical glass with AR Coating sheen
    const lensMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0f7fa,
      transmission: 0.94,
      opacity: 0.92,
      transparent: true,
      roughness: 0.04,
      ior: 1.67, // High-index optical lens IOR
      reflectivity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: 0x00c49f,
      emissiveIntensity: 0.06,
    });

    const lensRadiusX = 1.05;
    const lensRadiusY = 0.78;
    const lensThickness = 0.08;

    // Helper to create curved oval lens geometry
    function createLensMesh(xOffset: number): THREE.Mesh {
      // Curved shape
      const shape = new THREE.Shape();
      const segments = 48;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * lensRadiusX;
        const y = Math.sin(theta) * lensRadiusY;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }

      const extrudeSettings = {
        steps: 2,
        depth: lensThickness,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 4,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();
      const mesh = new THREE.Mesh(geometry, lensMaterial.clone());
      mesh.position.set(xOffset, 0, 0);
      return mesh;
    }

    // Helper to create matching rim frame
    function createRimMesh(xOffset: number): THREE.Mesh {
      const outerShape = new THREE.Shape();
      const rimWidth = 0.07;
      const segments = 48;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * (lensRadiusX + rimWidth);
        const y = Math.sin(theta) * (lensRadiusY + rimWidth);
        if (i === 0) outerShape.moveTo(x, y);
        else outerShape.lineTo(x, y);
      }

      const holePath = new THREE.Path();
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * lensRadiusX;
        const y = Math.sin(theta) * lensRadiusY;
        if (i === 0) holePath.moveTo(x, y);
        else holePath.lineTo(x, y);
      }
      outerShape.holes.push(holePath);

      const geometry = new THREE.ExtrudeGeometry(outerShape, {
        depth: 0.12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
      });
      geometry.center();
      const mesh = new THREE.Mesh(geometry, frameMaterial);
      mesh.position.set(xOffset, 0, 0);
      return mesh;
    }

    const eyeCenterDistance = 1.35;

    // Create Left & Right Rims
    const leftRim = createRimMesh(-eyeCenterDistance);
    const rightRim = createRimMesh(eyeCenterDistance);
    rootGroup.add(leftRim);
    rootGroup.add(rightRim);
    partsRef.current.leftRim = leftRim;
    partsRef.current.rightRim = rightRim;

    // Create Left & Right Lenses
    const leftLens = createLensMesh(-eyeCenterDistance);
    const rightLens = createLensMesh(eyeCenterDistance);
    rootGroup.add(leftLens);
    rootGroup.add(rightLens);
    partsRef.current.leftLens = leftLens;
    partsRef.current.rightLens = rightLens;

    // Nose Bridge (Central Arch)
    const bridgeCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-eyeCenterDistance + lensRadiusX - 0.02, 0.1, 0),
      new THREE.Vector3(-0.3, 0.45, 0.08),
      new THREE.Vector3(0.3, 0.45, 0.08),
      new THREE.Vector3(eyeCenterDistance - lensRadiusX + 0.02, 0.1, 0)
    );
    const bridgeGeo = new THREE.TubeGeometry(bridgeCurve, 24, 0.05, 12, false);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, frameMaterial);
    rootGroup.add(bridgeMesh);
    partsRef.current.bridge = bridgeMesh;

    // Helper to create Temples (Arms) with hinges
    function createTempleGroup(isLeft: boolean): THREE.Group {
      const group = new THREE.Group();
      const sideMultiplier = isLeft ? -1 : 1;

      // Hinge Block
      const hingeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.12, 16);
      const hinge = new THREE.Mesh(hingeGeo, goldAccentMaterial);
      hinge.rotation.z = Math.PI / 2;
      group.add(hinge);

      // Temple Arm Curve
      const templeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(sideMultiplier * 0.04, -0.02, -1.2),
        new THREE.Vector3(sideMultiplier * 0.06, -0.05, -2.4),
        new THREE.Vector3(sideMultiplier * 0.08, -0.35, -2.85), // Ear contour drop
      ]);
      const armGeo = new THREE.TubeGeometry(templeCurve, 32, 0.035, 12, false);
      const armMesh = new THREE.Mesh(armGeo, frameMaterial);
      group.add(armMesh);

      // Gold Accent Temple Tip
      const tipGeo = new THREE.SphereGeometry(0.05, 16, 16);
      const tip = new THREE.Mesh(tipGeo, goldAccentMaterial);
      tip.position.set(sideMultiplier * 0.08, -0.35, -2.85);
      group.add(tip);

      // Position temple at outer edge of rim
      const xAnchor = sideMultiplier * (eyeCenterDistance + lensRadiusX + 0.02);
      group.position.set(xAnchor, 0.15, 0.02);
      return group;
    }

    const leftTemple = createTempleGroup(true);
    const rightTemple = createTempleGroup(false);
    rootGroup.add(leftTemple);
    rootGroup.add(rightTemple);
    partsRef.current.leftTemple = leftTemple;
    partsRef.current.rightTemple = rightTemple;

    // Blue-Light Refractive Beams passing through lenses
    const lensRaysGroup = new THREE.Group();
    for (let i = -1; i <= 1; i += 2) {
      const rayGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.4, 8);
      const rayMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35,
      });
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.rotation.x = Math.PI / 2;
      ray.position.set(i * eyeCenterDistance, 0, 0.5);
      lensRaysGroup.add(ray);
    }
    rootGroup.add(lensRaysGroup);
    partsRef.current.lensRays = lensRaysGroup;

    // 6. Interaction: Mouse Drag and Tilt
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.08;
    let targetRotationY = -0.3;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Subtle hover tilt
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        targetRotationY = nx * 0.45;
        targetRotationX = -ny * 0.3;
        return;
      }
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      targetRotationY += deltaX * 0.009;
      targetRotationX += deltaY * 0.009;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // 7. Scroll Listener to sync explosion progress with scroll position
    const handleWindowScroll = () => {
      const section = document.getElementById('anatomy-3d');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far section has scrolled through viewport
      const totalDist = rect.height + windowHeight;
      const currentProgress = (windowHeight - rect.top) / totalDist;
      const clamped = Math.max(0, Math.min(1, currentProgress));
      
      // Update progress state
      setExplosionProgress(clamped);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation interpolation
      if (rootGroup) {
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.07;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.07;

        // Gentle floating breathing animation if idle
        if (!isDragging && !isInteracting) {
          rootGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleWindowScroll);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      partsRef.current = {};
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  // Sync Exploded Positions based on explosionProgress
  useEffect(() => {
    const parts = partsRef.current;
    if (!parts.leftLens || !parts.rightLens || !parts.leftTemple || !parts.rightTemple) return;

    const p = explosionProgress; // 0 to 1

    // Lenses fly forward along Z and slightly outward
    parts.leftLens.position.z = p * 1.8;
    parts.rightLens.position.z = p * 1.8;
    parts.leftLens.position.x = -1.35 - p * 0.25;
    parts.rightLens.position.x = 1.35 + p * 0.25;

    // Temples slide outward along X and pivot
    parts.leftTemple.position.x = -2.45 - p * 1.1;
    parts.rightTemple.position.x = 2.45 + p * 1.1;
    parts.leftTemple.rotation.y = -p * 0.35;
    parts.rightTemple.rotation.y = p * 0.35;

    // Rims drift slightly forward
    if (parts.leftRim && parts.rightRim) {
      parts.leftRim.position.z = p * 0.4;
      parts.rightRim.position.z = p * 0.4;
    }

    // Light rays expand
    if (parts.lensRays) {
      parts.lensRays.scale.set(1 + p * 0.5, 1 + p * 0.8, 1);
      (parts.lensRays.children[0] as THREE.Mesh).position.z = 0.5 + p * 0.8;
      (parts.lensRays.children[1] as THREE.Mesh).position.z = 0.5 + p * 0.8;
    }
  }, [explosionProgress]);

  return (
    <section id="anatomy-3d" className="relative min-h-[110vh] bg-background text-white overflow-hidden py-16 sm:py-24 border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-optic-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-brand-400" />
            <span>Interactive 3D Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-4">
            The <span className="bg-gradient-to-r from-white via-brand-200 to-brand-400 bg-clip-text text-transparent">Anatomy of Vision</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            At Eyeris, frames and lenses are engineered as one cohesive medical and stylistic instrument. 
            Scroll or drag to explode the frame into its clinical optical elements.
          </p>
        </div>

        {/* 3D Canvas Viewport */}
        <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl bg-surface/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
          {/* Canvas Mount */}
          <div ref={mountRef} className="w-full h-full" />

          {/* Interactive HUD Overlay */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-2 pointer-events-none">
            <span className="text-[11px] font-mono tracking-wider text-brand-300 uppercase bg-surface-raised/90 border border-brand-500/30 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-brand-400 animate-spin-slow" />
              <span>Interactive 3D • Drag to Tilt / Rotate</span>
            </span>
          </div>

          {/* Micro Exploded Legend Badges */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col gap-2.5 max-w-[280px]">
            <div 
              className={`p-3 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                activeAnnotation === 'lens' || explosionProgress > 0.4
                  ? 'bg-brand-950/80 border-brand-400/60 shadow-[0_0_20px_rgba(0,196,159,0.25)]'
                  : 'bg-surface/60 border-white/10 opacity-75 hover:opacity-100'
              }`}
              onClick={() => setActiveAnnotation('lens')}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse"></span>
                <span className="text-xs font-bold text-white font-display">Aspheric 1.67 Lenses</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-snug">
                German multi-coat anti-glare with high-frequency blue-violet absorption. 60–70% of optical clarity.
              </p>
            </div>

            <div 
              className={`p-3 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                activeAnnotation === 'frame' || (explosionProgress > 0.2 && explosionProgress <= 0.6)
                  ? 'bg-surface-raised border-gold-400/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-surface/60 border-white/10 opacity-75 hover:opacity-100'
              }`}
              onClick={() => setActiveAnnotation('frame')}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-400"></span>
                <span className="text-xs font-bold text-white font-display">Beta-Titanium Temples</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-snug">
                Surgical-grade memory titanium. Ultra-light &lt;9.8 grams with zero pressure on temporal arteries.
              </p>
            </div>

            <div 
              className={`p-3 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                activeAnnotation === 'hospital' || explosionProgress > 0.7
                  ? 'bg-optic-blue/20 border-optic-blue/60 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                  : 'bg-surface/60 border-white/10 opacity-75 hover:opacity-100'
              }`}
              onClick={() => setActiveAnnotation('hospital')}
            >
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-optic-blue" />
                <span className="text-xs font-bold text-white font-display">Global Eye Hospital Rx</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-snug">
                Focal power aligned directly from doctor examination through ground-floor interconnected clinic.
              </p>
            </div>
          </div>

          {/* Bottom Interactive Explosion Slider Bar */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-12 sm:right-12 bg-surface-raised/95 border border-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-mono uppercase text-brand-300 tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <Layers className="w-4 h-4 text-brand-400" />
                <span>Explode View: {Math.round(explosionProgress * 100)}%</span>
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explosionProgress}
                onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
                className="w-full sm:w-64 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-400"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setExplosionProgress(explosionProgress > 0.5 ? 0 : 1)}
                className="text-xs font-medium text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition bg-surface"
              >
                {explosionProgress > 0.5 ? 'Reassemble Frame' : 'Full Exploded View'}
              </button>
              <button
                onClick={onOpenBooking}
                className="text-xs font-semibold text-slate-950 bg-brand-400 hover:bg-brand-300 px-4 py-2 rounded-xl transition shadow-[0_0_20px_rgba(0,196,159,0.3)] whitespace-nowrap"
              >
                Book Lens Fitting
              </button>
            </div>
          </div>
        </div>

        {/* 3 Bottom Callout Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-brand-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">60–70% Lens Specialisation</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We calibrate lenses based on your exact working posture, screen distance, and prescription power rather than selling mass off-the-shelf plastic.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-gold-400/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">Curated International Frames</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Ray-Ban, Oakley, Prada, Stepper Titanium, and Tommy Hilfiger under one roof at practical Hyderabad price points (₹5,000 to ₹15,000+).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-optic-blue/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-optic-blue/10 border border-optic-blue/20 flex items-center justify-center text-optic-blue mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">Hospital-Connected Precision</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Direct ground-floor link to Global Eye Hospital. Transition seamlessly from doctor consultation to custom eyewear dispensing in minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
