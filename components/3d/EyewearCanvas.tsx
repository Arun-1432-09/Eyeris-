'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, ShieldCheck, Sparkles, RotateCw, Sun, Moon, Zap, Eye, Check, Sliders } from 'lucide-react';
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
    blueLightBeams?: THREE.Group;
    shadowPlane?: THREE.Mesh;
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
    shadowPlane?: THREE.Mesh;
  }>({});

  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.25, 5.8));
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0.08, y: -0.2 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene in Dark Showroom
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.copy(targetCameraPos.current);
    cameraRef.current = camera;

    // 3. Renderer with ACES tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Dramatic Dark Showroom Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    // Rim Backlight (Accentuates metallic chamfers)
    const rimLight = new THREE.DirectionalLight(0xd8dee8, 2.8);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Soft Bottom Fill Light
    const bottomLight = new THREE.DirectionalLight(0x444444, 1.0);
    bottomLight.position.set(0, -6, 2);
    scene.add(bottomLight);

    // 5. Contact Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6.5, 3.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -1.6, 0);
    scene.add(shadowPlane);
    partsRef.current.shadowPlane = shadowPlane;

    // 6. Materials
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1f22,
      metalness: 0.92,
      roughness: 0.22,
    });

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.96,
      roughness: 0.15,
    });

    const lensGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      opacity: 0.96,
      transparent: true,
      roughness: 0.015,
      ior: 1.67,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });
    materialsRef.current.lensGlass = lensGlassMaterial;

    const coatingMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1b4332,
      transmission: 0.90,
      opacity: 0.4,
      transparent: true,
      roughness: 0.03,
      clearcoat: 1.0,
    });
    materialsRef.current.coatingShield = coatingMaterial;

    const siliconeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.82,
      opacity: 0.75,
      transparent: true,
      roughness: 0.3,
    });

    // 7. Eyewear Parametric Mesh
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    partsRef.current.rootGroup = rootGroup;

    const lensRadiusX = 1.1;
    const lensRadiusY = 0.82;
    const eyeCenterDist = 1.38;

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

    const leftRim = createRimMesh(-eyeCenterDist);
    const rightRim = createRimMesh(eyeCenterDist);
    rootGroup.add(leftRim);
    rootGroup.add(rightRim);
    partsRef.current.leftRim = leftRim;
    partsRef.current.rightRim = rightRim;

    const leftLens = createLensMesh(-eyeCenterDist);
    const rightLens = createLensMesh(eyeCenterDist);
    rootGroup.add(leftLens);
    rootGroup.add(rightLens);
    partsRef.current.leftLens = leftLens;
    partsRef.current.rightLens = rightLens;

    const leftCoating = createCoatingMesh(-eyeCenterDist);
    const rightCoating = createCoatingMesh(eyeCenterDist);
    rootGroup.add(leftCoating);
    rootGroup.add(rightCoating);
    partsRef.current.leftCoating = leftCoating;
    partsRef.current.rightCoating = rightCoating;

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

    const padGeo = new THREE.CapsuleGeometry(0.06, 0.14, 8, 16);
    const leftPad = new THREE.Mesh(padGeo, siliconeMaterial);
    leftPad.position.set(-0.38, -0.15, -0.12);
    leftPad.rotation.z = -0.3;
    const rightPad = new THREE.Mesh(padGeo, siliconeMaterial);
    rightPad.position.set(0.38, -0.15, -0.12);
    rightPad.rotation.z = 0.3;
    rootGroup.add(leftPad);
    rootGroup.add(rightPad);

    function createTempleGroup(isLeft: boolean): THREE.Group {
      const group = new THREE.Group();
      const mult = isLeft ? -1 : 1;

      const hinge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 0.14, 16),
        goldAccentMaterial
      );
      hinge.rotation.z = Math.PI / 2;
      group.add(hinge);

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

    // Subtle blue beams for bluecut
    const blueBeams = new THREE.Group();
    for (let i = -1; i <= 1; i += 2) {
      const beamGeo = new THREE.CylinderGeometry(0.016, 0.016, 3.6, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
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

    // Drag & Interaction
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
        targetRotation.current.y = nx * 0.35;
        targetRotation.current.x = -ny * 0.20;
        return;
      }
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      targetRotation.current.y += dx * 0.007;
      targetRotation.current.x += dy * 0.007;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPos.current, 0.06);
      }

      if (rootGroup) {
        rootGroup.rotation.y += (targetRotation.current.y - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotation.current.x - rootGroup.rotation.x) * 0.08;

        if (isAutoRotating && !isDragging) {
          rootGroup.rotation.y += delta * 0.16;
          rootGroup.position.y = Math.sin(elapsed * 1.4) * 0.06;
          if (partsRef.current.shadowPlane) {
            const scale = 1 - Math.sin(elapsed * 1.4) * 0.04;
            partsRef.current.shadowPlane.scale.set(scale, scale, 1);
          }
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

  // Synchronize Exploded View
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

  // Synchronize Lens Physics (Transitions Sunlight, Blue-Cut & Night Drive)
  useEffect(() => {
    const parts = partsRef.current;
    if (!parts.leftLens || !parts.rightLens) return;

    const leftMat = parts.leftLens.material as THREE.MeshPhysicalMaterial;
    const rightMat = parts.rightLens.material as THREE.MeshPhysicalMaterial;

    const uv = sunlightUV / 100;

    let tintColorHex = 0xffffff;
    if (activeTint === 'graphite') {
      tintColorHex = uv > 0.05 ? 0x1a1a1c : 0xffffff;
    } else if (activeTint === 'emerald') {
      tintColorHex = uv > 0.05 ? 0x0f382a : 0xf2fff8;
    } else if (activeTint === 'amber') {
      tintColorHex = uv > 0.05 ? 0x3d2612 : 0xfffcf5;
    }

    const currentTransmission = 0.96 - uv * 0.78;
    const currentRoughness = 0.015 + uv * 0.04;

    leftMat.color.setHex(tintColorHex);
    rightMat.color.setHex(tintColorHex);
    leftMat.transmission = currentTransmission;
    rightMat.transmission = currentTransmission;
    leftMat.roughness = currentRoughness;
    rightMat.roughness = currentRoughness;
    leftMat.needsUpdate = true;
    rightMat.needsUpdate = true;

    if (materialsRef.current.blueLightBeams) {
      materialsRef.current.blueLightBeams.visible = isBlueCutActive;
    }

    if (isNightDriveActive) {
      leftMat.emissive.setHex(0xd4af37);
      leftMat.emissiveIntensity = 0.08;
      rightMat.emissive.setHex(0xd4af37);
      rightMat.emissiveIntensity = 0.08;
    } else {
      leftMat.emissive.setHex(0x000000);
      leftMat.emissiveIntensity = 0.0;
      rightMat.emissive.setHex(0x000000);
      rightMat.emissiveIntensity = 0.0;
    }
  }, [sunlightUV, activeTint, isBlueCutActive, isNightDriveActive]);

  const selectPreset = (preset: ViewPreset) => {
    setActivePreset(preset);
    setIsAutoRotating(false);

    if (preset === 'assembled') {
      setExplosionProgress(0);
      setSunlightUV(0);
      setIsNightDriveActive(false);
      targetCameraPos.current.set(0, 0.25, 5.8);
      targetRotation.current = { x: 0.08, y: -0.2 };
    } else if (preset === 'exploded') {
      setExplosionProgress(1.0);
      targetCameraPos.current.set(0, 0.35, 6.4);
      targetRotation.current = { x: 0.12, y: -0.35 };
    } else if (preset === 'sunlight') {
      setExplosionProgress(0.12);
      setSunlightUV(85);
      setIsNightDriveActive(false);
      targetCameraPos.current.set(0, 0.2, 5.2);
      targetRotation.current = { x: 0.05, y: 0.15 };
    } else if (preset === 'drivesafe') {
      setExplosionProgress(0.08);
      setSunlightUV(0);
      setIsNightDriveActive(true);
      targetCameraPos.current.set(-0.8, 0.15, 4.8);
      targetRotation.current = { x: 0.05, y: -0.25 };
    }
  };

  return (
    <section id="anatomy-3d" className="py-24 sm:py-36 bg-[#050505] text-white border-b border-[#292929] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12">
          <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#707070] mb-3">
            INTERACTIVE THREE.JS STUDIO
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Anatomy of Precision.{' '}
            <span className="font-light text-[#A1A1A6]">Living Optics.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A6] font-light mt-3 leading-relaxed">
            Inspect the German beta-titanium core and test real-time Transitions® photochromic dye activation under dynamic sunlight.
          </p>
        </ScrollReveal>

        {/* 3D Viewport Card in Dark Showroom Mode */}
        <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl bg-[#101010] border border-[#292929] shadow-luxury-lg overflow-hidden cursor-grab active:cursor-grabbing">
          {/* Canvas Mount */}
          <div ref={mountRef} className="w-full h-full" />

          {/* Top Preset Switcher Bar */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 z-20">
            <button
              onClick={() => selectPreset('assembled')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition ${
                activePreset === 'assembled'
                  ? 'bg-white text-black font-semibold'
                  : 'bg-black/60 backdrop-blur-md border border-[#292929] text-[#A1A1A6] hover:text-white'
              }`}
            >
              Assembled
            </button>
            <button
              onClick={() => selectPreset('exploded')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition ${
                activePreset === 'exploded'
                  ? 'bg-white text-black font-semibold'
                  : 'bg-black/60 backdrop-blur-md border border-[#292929] text-[#A1A1A6] hover:text-white'
              }`}
            >
              Exploded
            </button>
            <button
              onClick={() => selectPreset('sunlight')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition flex items-center gap-1.5 ${
                activePreset === 'sunlight'
                  ? 'bg-white text-black font-semibold'
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
                  ? 'bg-white text-black font-semibold'
                  : 'bg-black/60 backdrop-blur-md border border-[#292929] text-[#A1A1A6] hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-white" />
              <span>DriveSafe</span>
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

          {/* Real-Life Lens Physics Simulator HUD */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#050505]/90 backdrop-blur-2xl border border-[#292929] rounded-2xl p-4 sm:p-5 shadow-2xl z-20 space-y-3">
            
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
                      ? 'Clear Indoor Optics (96% Light Transmission)'
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

                {/* DriveSafe Toggle */}
                <button
                  onClick={() => setIsNightDriveActive(!isNightDriveActive)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition flex items-center gap-1.5 ${
                    isNightDriveActive
                      ? 'bg-white text-black font-semibold'
                      : 'border border-[#292929] text-[#A1A1A6] hover:text-white'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  <span>ZEISS DriveSafe {isNightDriveActive ? 'Active' : 'Off'}</span>
                </button>
              </div>

              {/* Book Appointment CTA */}
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
