/**
 * 🍃 Three.js 3D Leaf Physics & Tea Salon Simulation Engine
 * Specially crafted for Hania's English Afternoon Tea Salon
 */

(function () {
  'use strict';

  // Global namespace for tea salon physics
  window.TeaPhysics = {
    ambientRunning: true,
    ambientLeafCount: 38,
    ambientType: 'mix',
    labRunning: true,
    labLeafCount: 45,
    labGravity: 0.08,
    labWind: 0.03,
    labVortexActive: false,
    toggleAmbient: null,
    scatterLab: null,
    swirlLab: null,
    changeLabLeafType: null,
    setGravity: null,
    setWind: null
  };

  // Helper: Create 3D Leaf Geometry with authentic natural curvature
  function createCurvedLeafGeometry(width, length, curlFactor) {
    const shape = new THREE.Shape();
    // Start at stem
    shape.moveTo(0, -length / 2);
    // Right curve with leaf belly
    shape.bezierCurveTo(width / 2, -length / 4, width, length / 4, 0, length / 2);
    // Left curve back to stem
    shape.bezierCurveTo(-width, length / 4, -width / 2, -length / 4, 0, -length / 2);

    const extrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();

    // Bend vertices along Z axis for realistic 3D curl
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Parabolic curvature across width and gentle twist along length
      const zCurvature = -curlFactor * (1 - (x * x) / (width * width)) + Math.sin((y / length) * Math.PI) * 0.15;
      pos.setZ(i, pos.getZ(i) + zCurvature);
    }
    geom.computeVertexNormals();
    return geom;
  }

  // Helper: Create 3D Rose Petal Geometry
  function createPetalGeometry(radius) {
    const shape = new THREE.Shape();
    shape.moveTo(0, -radius);
    shape.bezierCurveTo(radius * 1.1, -radius * 0.5, radius * 1.3, radius * 0.8, 0, radius);
    shape.bezierCurveTo(-radius * 1.3, radius * 0.8, -radius * 1.1, -radius * 0.5, 0, -radius);

    const geom = new THREE.ShapeGeometry(shape, 12);
    geom.center();
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const distFromCenter = Math.sqrt(x * x + y * y);
      const zCup = Math.sin((distFromCenter / radius) * Math.PI * 0.7) * 0.35;
      pos.setZ(i, pos.getZ(i) + zCup);
    }
    geom.computeVertexNormals();
    return geom;
  }

  // Materials palette
  const materials = {
    teaGreen: new THREE.MeshStandardMaterial({
      color: 0x4f8746,
      roughness: 0.45,
      metalness: 0.1,
      side: THREE.DoubleSide
    }),
    matchaLight: new THREE.MeshStandardMaterial({
      color: 0x76a76c,
      roughness: 0.5,
      metalness: 0.05,
      side: THREE.DoubleSide
    }),
    rosePetal: new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.6,
      metalness: 0.05,
      side: THREE.DoubleSide
    }),
    roseBlush: new THREE.MeshStandardMaterial({
      color: 0xfda4af,
      roughness: 0.55,
      metalness: 0.08,
      side: THREE.DoubleSide
    }),
    goldenJasmine: new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.45,
      side: THREE.DoubleSide
    }),
    earlGrey: new THREE.MeshStandardMaterial({
      color: 0x784428,
      roughness: 0.7,
      metalness: 0.05,
      side: THREE.DoubleSide
    })
  };

  /* ==========================================================================
     1. Ambient Full-Screen 3D Falling Leaves Simulation
     ========================================================================== */
  function initAmbientLeaves() {
    const container = document.getElementById('leafCanvasContainer');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7fa, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff1f2, 1.0);
    sunLight.position.set(10, 20, 15);
    scene.add(sunLight);

    const pinkFill = new THREE.PointLight(0xf472b6, 1.2, 50);
    pinkFill.position.set(-10, -5, 10);
    scene.add(pinkFill);

    // Leaf physics instances
    const leaves = [];
    const leafGeoms = [
      createCurvedLeafGeometry(0.7, 1.5, 0.25),
      createCurvedLeafGeometry(0.5, 1.2, 0.2),
      createPetalGeometry(0.65)
    ];

    const matKeys = ['teaGreen', 'matchaLight', 'rosePetal', 'roseBlush', 'goldenJasmine'];

    function createAmbientLeaf(initialY) {
      const geom = leafGeoms[Math.floor(Math.random() * leafGeoms.length)];
      const mat = materials[matKeys[Math.floor(Math.random() * matKeys.length)]];
      const mesh = new THREE.Mesh(geom, mat);

      const x = (Math.random() - 0.5) * 36;
      const y = initialY !== undefined ? initialY : 18 + Math.random() * 10;
      const z = (Math.random() - 0.5) * 16;
      mesh.position.set(x, y, z);

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      const scale = 0.55 + Math.random() * 0.45;
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);

      return {
        mesh: mesh,
        vx: (Math.random() - 0.5) * 0.02,
        vy: -(0.018 + Math.random() * 0.025),
        vz: (Math.random() - 0.5) * 0.02,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.03,
        rotSpeedZ: (Math.random() - 0.5) * 0.015,
        flutterPhase: Math.random() * Math.PI * 2,
        flutterFreq: 1.2 + Math.random() * 1.5,
        flutterAmp: 0.015 + Math.random() * 0.02,
        mass: 0.8 + Math.random() * 0.4
      };
    }

    // Spawn initial pool distributed across screen
    for (let i = 0; i < window.TeaPhysics.ambientLeafCount; i++) {
      leaves.push(createAmbientLeaf(-15 + Math.random() * 32));
    }

    // Mouse interactive wind disturbance
    const mouse = { x: 0, y: 0, prevX: 0, prevY: 0, speedX: 0, speedY: 0 };
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.speedX = (nx - mouse.prevX) * 0.5;
      mouse.speedY = (ny - mouse.prevY) * 0.5;
      mouse.x = nx * 16;
      mouse.y = ny * 10;
      mouse.prevX = nx;
      mouse.prevY = ny;
    });

    // Click creates a gentle floral swirl burst
    window.addEventListener('click', (e) => {
      if (!window.TeaPhysics.ambientRunning) return;
      const clickX = ((e.clientX / window.innerWidth) * 2 - 1) * 16;
      const clickY = (-(e.clientY / window.innerHeight) * 2 + 1) * 10;
      leaves.forEach((l) => {
        const dx = l.mesh.position.x - clickX;
        const dy = l.mesh.position.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 8) {
          const force = (8 - dist) * 0.035;
          l.vx += (dx / dist) * force;
          l.vy += (dy / dist) * force + 0.04;
          l.rotSpeedX += (Math.random() - 0.5) * 0.15;
          l.rotSpeedY += (Math.random() - 0.5) * 0.15;
        }
      });
    });

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (!window.TeaPhysics.ambientRunning) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      leaves.forEach((l) => {
        // Aerodynamic fluttering oscillation
        l.flutterPhase += l.flutterFreq * delta;
        const flutterX = Math.sin(l.flutterPhase) * l.flutterAmp;
        const flutterZ = Math.cos(l.flutterPhase * 0.8) * l.flutterAmp;

        // Apply velocities with damping & air resistance
        l.mesh.position.x += l.vx + flutterX;
        l.mesh.position.y += l.vy;
        l.mesh.position.z += l.vz + flutterZ;

        l.mesh.rotation.x += l.rotSpeedX;
        l.mesh.rotation.y += l.rotSpeedY;
        l.mesh.rotation.z += l.rotSpeedZ;

        // Mouse wind wake interaction
        const mdx = l.mesh.position.x - mouse.x;
        const mdy = l.mesh.position.y - mouse.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < 25) {
          const mDist = Math.sqrt(mDistSq);
          const push = (5 - mDist) * 0.006;
          l.vx += (mdx / mDist) * push + mouse.speedX * 0.05;
          l.vy += (mdy / mDist) * push + mouse.speedY * 0.05;
        }

        // Gentle drag returns to terminal velocity
        l.vx *= 0.985;
        l.vz *= 0.985;
        if (l.vy < -0.05) l.vy *= 0.98;

        // Recycle leaf if it falls below bottom
        if (l.mesh.position.y < -16) {
          l.mesh.position.y = 16 + Math.random() * 4;
          l.mesh.position.x = (Math.random() - 0.5) * 36;
          l.mesh.position.z = (Math.random() - 0.5) * 16;
          l.vy = -(0.018 + Math.random() * 0.025);
          l.vx = (Math.random() - 0.5) * 0.02;
        }
      });

      renderer.render(scene, camera);
    }
    animate();

    window.TeaPhysics.toggleAmbient = function (enable) {
      if (enable !== undefined) {
        window.TeaPhysics.ambientRunning = enable;
      } else {
        window.TeaPhysics.ambientRunning = !window.TeaPhysics.ambientRunning;
      }
      container.style.display = window.TeaPhysics.ambientRunning ? 'block' : 'none';
      return window.TeaPhysics.ambientRunning;
    };
  }

  /* ==========================================================================
     2. Interactive 3D Physics Tea Salon Lab (Teacup & Physics Playground)
     ========================================================================== */
  function initInteractiveTeaLab() {
    const canvas = document.getElementById('labCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const width = canvas.parentElement.clientWidth || 600;
    const height = 440;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfff5f8);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Elegant English Tea Lights
    const ambient = new THREE.AmbientLight(0xfff0f5, 1.4);
    scene.add(ambient);

    const mainLight = new THREE.SpotLight(0xffffff, 1.8, 30, Math.PI / 4, 0.3);
    mainLight.position.set(6, 12, 8);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const warmChandelier = new THREE.PointLight(0xfef08a, 1.2, 20);
    warmChandelier.position.set(-5, 4, 4);
    scene.add(warmChandelier);

    const roseGlow = new THREE.PointLight(0xf472b6, 1.5, 15);
    roseGlow.position.set(0, 2, -4);
    scene.add(roseGlow);

    // Table / Porcelain Platter Base
    const tableGeom = new THREE.CylinderGeometry(6, 6.2, 0.4, 48);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1
    });
    const table = new THREE.Mesh(tableGeom, tableMat);
    table.position.y = -1.2;
    table.receiveShadow = true;
    scene.add(table);

    // Gold rim around saucer
    const goldRimGeom = new THREE.TorusGeometry(6.05, 0.08, 16, 48);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25
    });
    const goldRim = new THREE.Mesh(goldRimGeom, goldMat);
    goldRim.rotation.x = Math.PI / 2;
    goldRim.position.y = -1.0;
    scene.add(goldRim);

    // 3D Bone China Teacup
    const cupGroup = new THREE.Group();

    // Cup body
    const cupPoints = [];
    cupPoints.push(new THREE.Vector2(0.9, 0));
    cupPoints.push(new THREE.Vector2(1.1, 0.1));
    cupPoints.push(new THREE.Vector2(1.4, 0.6));
    cupPoints.push(new THREE.Vector2(1.85, 1.5));
    cupPoints.push(new THREE.Vector2(2.1, 2.3));
    cupPoints.push(new THREE.Vector2(2.0, 2.3));
    cupPoints.push(new THREE.Vector2(1.7, 1.4));
    cupPoints.push(new THREE.Vector2(1.2, 0.5));
    cupPoints.push(new THREE.Vector2(0.8, 0.1));
    cupPoints.push(new THREE.Vector2(0, 0.1));

    const cupGeom = new THREE.LatheGeometry(cupPoints, 40);
    const porcelainMat = new THREE.MeshStandardMaterial({
      color: 0xfffaf5,
      roughness: 0.15,
      metalness: 0.05
    });
    const cupMesh = new THREE.Mesh(cupGeom, porcelainMat);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    cupGroup.add(cupMesh);

    // Cup Gold Rim
    const cupRimGeom = new THREE.TorusGeometry(2.05, 0.06, 16, 40);
    const cupRim = new THREE.Mesh(cupRimGeom, goldMat);
    cupRim.rotation.x = Math.PI / 2;
    cupRim.position.y = 2.3;
    cupGroup.add(cupRim);

    // Cup Handle
    const handleGeom = new THREE.TorusGeometry(0.85, 0.12, 16, 28, Math.PI * 1.1);
    const handle = new THREE.Mesh(handleGeom, porcelainMat);
    handle.position.set(1.9, 1.25, 0);
    handle.rotation.z = -Math.PI / 5;
    cupGroup.add(handle);

    // Tea Liquid Surface inside cup
    const teaSurfaceGeom = new THREE.CylinderGeometry(1.85, 1.6, 0.08, 32);
    const teaLiquidMat = new THREE.MeshPhysicalMaterial({
      color: 0x92400e,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 1.2,
      opacity: 0.95,
      transparent: true
    });
    const teaSurface = new THREE.Mesh(teaSurfaceGeom, teaLiquidMat);
    teaSurface.position.y = 1.65;
    cupGroup.add(teaSurface);

    cupGroup.position.set(0, -1.0, 0);
    scene.add(cupGroup);

    // Physics Leaves in the Lab
    const labLeaves = [];
    const leafGeomLab = createCurvedLeafGeometry(0.5, 1.1, 0.3);
    const petalGeomLab = createPetalGeometry(0.55);

    function spawnLabLeaf(type, posX, posY, posZ) {
      let geom = type === 'rose' ? petalGeomLab : leafGeomLab;
      let mat;
      if (type === 'rose') mat = materials.rosePetal;
      else if (type === 'jasmine') mat = materials.goldenJasmine;
      else if (type === 'earlgrey') mat = materials.earlGrey;
      else mat = materials.teaGreen;

      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;

      const px = posX !== undefined ? posX : (Math.random() - 0.5) * 6;
      const py = posY !== undefined ? posY : 2.5 + Math.random() * 4;
      const pz = posZ !== undefined ? posZ : (Math.random() - 0.5) * 6;
      mesh.position.set(px, py, pz);

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      const scale = 0.5 + Math.random() * 0.4;
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);

      return {
        mesh: mesh,
        vx: (Math.random() - 0.5) * 0.06,
        vy: 0.02 + Math.random() * 0.04,
        vz: (Math.random() - 0.5) * 0.06,
        rx: (Math.random() - 0.5) * 0.08,
        ry: (Math.random() - 0.5) * 0.08,
        rz: (Math.random() - 0.5) * 0.08,
        type: type,
        mass: 0.7 + Math.random() * 0.5
      };
    }

    // Populate initial lab leaves
    const types = ['tea', 'rose', 'jasmine', 'earlgrey'];
    for (let i = 0; i < window.TeaPhysics.labLeafCount; i++) {
      const type = types[i % types.length];
      labLeaves.push(spawnLabLeaf(type));
    }

    // Interactive Drag / Orbit rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      // Scatter impulse on click
      applyImpulseAt(e.clientX, e.clientY, 0.15);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        scene.rotation.y += deltaX * 0.008;
        camera.position.y = Math.max(2, Math.min(10, camera.position.y - deltaY * 0.02));
        camera.lookAt(0, 0.5, 0);
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    });

    function applyImpulseAt(screenX, screenY, strength) {
      const rect = canvas.getBoundingClientRect();
      const clickX = ((screenX - rect.left) / rect.width) * 2 - 1;
      const clickY = -((screenY - rect.top) / rect.height) * 2 + 1;
      const worldX = clickX * 4;
      const worldY = clickY * 3 + 1;

      labLeaves.forEach((l) => {
        const dx = l.mesh.position.x - worldX;
        const dy = l.mesh.position.y - worldY;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
        const impulse = strength / dist;
        l.vx += (dx / dist) * impulse;
        l.vy += Math.abs(dy / dist) * impulse + 0.08;
        l.rx += (Math.random() - 0.5) * 0.3;
        l.ry += (Math.random() - 0.5) * 0.3;
      });
    }

    // Public Controls for the Lab
    window.TeaPhysics.scatterLab = function () {
      labLeaves.forEach((l) => {
        l.vx = (Math.random() - 0.5) * 0.35;
        l.vy = 0.15 + Math.random() * 0.25;
        l.vz = (Math.random() - 0.5) * 0.35;
        l.rx = (Math.random() - 0.5) * 0.4;
        l.ry = (Math.random() - 0.5) * 0.4;
      });
    };

    window.TeaPhysics.swirlLab = function () {
      window.TeaPhysics.labVortexActive = !window.TeaPhysics.labVortexActive;
      return window.TeaPhysics.labVortexActive;
    };

    window.TeaPhysics.setGravity = function (val) {
      window.TeaPhysics.labGravity = parseFloat(val);
    };

    window.TeaPhysics.setWind = function (val) {
      window.TeaPhysics.labWind = parseFloat(val);
    };

    window.TeaPhysics.changeLabLeafType = function (newType) {
      labLeaves.forEach((l) => {
        scene.remove(l.mesh);
      });
      labLeaves.length = 0;
      for (let i = 0; i < window.TeaPhysics.labLeafCount; i++) {
        const t = newType === 'all' ? types[i % types.length] : newType;
        labLeaves.push(spawnLabLeaf(t));
      }
    };

    // Resize handler
    window.addEventListener('resize', () => {
      const newWidth = canvas.parentElement.clientWidth || 600;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    });

    // Animation Loop
    let labClock = new THREE.Clock();
    function animateLab() {
      requestAnimationFrame(animateLab);
      const delta = labClock.getDelta();
      const time = labClock.getElapsedTime();

      // Gentle rotation of the whole cup showcase
      cupGroup.rotation.y += 0.003;

      labLeaves.forEach((l) => {
        // Vortex / Whirlwind Force
        if (window.TeaPhysics.labVortexActive) {
          const radius = Math.sqrt(l.mesh.position.x * l.mesh.position.x + l.mesh.position.z * l.mesh.position.z);
          const angle = Math.atan2(l.mesh.position.z, l.mesh.position.x);
          const swirlSpeed = 2.8 / (radius + 0.8);

          // Tangential swirl
          l.vx += -Math.sin(angle) * swirlSpeed * delta;
          l.vz += Math.cos(angle) * swirlSpeed * delta;

          // Pull gently toward cup center
          l.vx += -Math.cos(angle) * 0.03;
          l.vz += -Math.sin(angle) * 0.03;

          // Gentle upward tea cyclone suction
          if (l.mesh.position.y < 3.5) {
            l.vy += 0.03;
          }
        } else {
          // Standard gravity & wind
          l.vy -= window.TeaPhysics.labGravity * delta * 2;
          l.vx += Math.sin(time * 1.5 + l.mesh.position.y) * window.TeaPhysics.labWind * delta;
        }

        // Apply velocities
        l.mesh.position.x += l.vx;
        l.mesh.position.y += l.vy;
        l.mesh.position.z += l.vz;

        // Tumble rotations
        l.mesh.rotation.x += l.rx;
        l.mesh.rotation.y += l.ry;
        l.mesh.rotation.z += l.rz;

        // Air drag
        l.vx *= 0.97;
        l.vy *= 0.97;
        l.vz *= 0.97;
        l.rx *= 0.98;
        l.ry *= 0.98;

        // Collision with table plane
        if (l.mesh.position.y < -0.9) {
          l.mesh.position.y = -0.9;
          l.vy = -l.vy * 0.35; // gentle bounce
          l.vx *= 0.8;
          l.vz *= 0.8;

          // If fallen outside saucer bounds, respawn at top
          const distSq = l.mesh.position.x * l.mesh.position.x + l.mesh.position.z * l.mesh.position.z;
          if (distSq > 36 || Math.abs(l.vy) < 0.005) {
            if (Math.random() < 0.03) {
              l.mesh.position.y = 4.5 + Math.random() * 3;
              l.mesh.position.x = (Math.random() - 0.5) * 4;
              l.mesh.position.z = (Math.random() - 0.5) * 4;
              l.vy = 0.02;
            }
          }
        }

        // Ceiling boundary
        if (l.mesh.position.y > 8) {
          l.vy = -0.05;
        }
      });

      renderer.render(scene, camera);
    }
    animateLab();
  }

  // Initialize both when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAmbientLeaves();
      initInteractiveTeaLab();
    });
  } else {
    initAmbientLeaves();
    initInteractiveTeaLab();
  }
})();
