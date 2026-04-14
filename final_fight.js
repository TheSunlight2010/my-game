/*
  final_fight.js
  - When executed, this module overlays the entire viewport with a black fullscreen element
    that covers everything (including UI), locks pointer events, and provides a minimal fade-in.
  - After the fade, a short cutscene types yellow lines of text character-by-character,
    each line cleared when the next begins; the final line is immediately cleared when finished.
  - Two seconds after the cutscene and Broken/Sunlight exchange finishes, a left-side UI for
    Broken (300 HP) is shown and a three.js sky/particle scene is rendered to the right.
  - Exported as default so dynamic import(...).then(m => m.default()) will run.
*/

export default function startFinalFight() {
    // Prevent multiple overlays
    if (document.getElementById('final-fight-overlay')) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'final-fight-overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100dvh';
    overlay.style.background = '#000';
    overlay.style.zIndex = 20000;
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 600ms ease';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.flexDirection = 'column';

    // Create text container (centered)
    const textBox = document.createElement('div');
    textBox.style.maxWidth = '92%';
    textBox.style.padding = '1rem';
    textBox.style.boxSizing = 'border-box';
    textBox.style.pointerEvents = 'none';
    textBox.style.textAlign = 'center';
    overlay.appendChild(textBox);

    // Create line element
    const lineEl = document.createElement('div');
    lineEl.style.color = '#FFD700';
    lineEl.style.fontFamily = 'Orbitron, monospace';
    lineEl.style.fontWeight = '700';
    lineEl.style.fontSize = 'clamp(1rem, 4vw, 2rem)';
    lineEl.style.letterSpacing = '0.03em';
    lineEl.style.whiteSpace = 'pre-wrap';
    lineEl.style.opacity = '0';
    lineEl.style.transition = 'opacity 160ms linear';
    textBox.appendChild(lineEl);

    // Prevent scrolling and interactions
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    // Append and fade in
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });

    // Optionally set the tab title to be ominous
    try {
        document.title = '...';
    } catch (e) { /* ignore */ }

    // Ensure overlay captures input
    overlay.addEventListener('contextmenu', (e) => e.preventDefault());
    overlay.addEventListener('keydown', (e) => e.preventDefault());
    overlay.tabIndex = -1;
    overlay.focus();

    // Helper: type text character-by-character, returns a promise that resolves when typing complete
    function typeText(targetEl, text, charDelay = 30) {
        return new Promise(resolve => {
            targetEl.textContent = '';
            targetEl.style.opacity = '1';
            let i = 0;
            const interval = setInterval(() => {
                targetEl.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, charDelay);
        });
    }

    // Helper: clear text (fade then clear)
    function clearText(targetEl) {
        return new Promise(resolve => {
            targetEl.style.opacity = '0';
            setTimeout(() => {
                targetEl.textContent = '';
                resolve();
            }, 160);
        });
    }

    // Cutscene sequence: wait 2s after overlay fade-in completes, then show lines.
    // Fade transition is 600ms; wait a bit longer to ensure full black, then 2s per spec.
    const fadeMs = 600;
    const waitAfterFade = 2000; // 2 seconds after black fade
    const lineDisplayInterval = 2000; // how long between starting each line (per spec)

    // Lines to display (speaker implied but not stated)
    const lines = [
        "Player.",
        "I am disappointed.",
        "I did not expect you to buy THAT one.",
        "He was supposed to be"
    ];

    // Start sequence after fade completes + wait
    setTimeout(async () => {
        // For each line: type it, then wait until the next line should start (2s from start).
        // Each previous line disappears once the next is called.
        for (let idx = 0; idx < lines.length; idx++) {
            const text = lines[idx];
            // Start typing
            await typeText(lineEl, text, 35);

            // If this is the final line, it's interrupted: immediately clear after typing completes.
            if (idx === lines.length - 1) {
                // small micro-delay to ensure last char renders, then clear immediately
                setTimeout(() => {
                    lineEl.textContent = '';
                    lineEl.style.opacity = '0';
                    // proceed to Broken's dialogue sequence below
                    startBrokenSequence();
                }, 0);
                break;
            }

            // Wait remaining time until the 2s window elapses since this line started.
            // We typed for (text.length * charDelay) ms; ensure total from start is lineDisplayInterval.
            const typingDuration = Math.max(0, text.length * 35);
            const remaining = Math.max(0, lineDisplayInterval - typingDuration);

            // Wait remaining milliseconds, then clear immediately as next line will begin
            await new Promise(res => setTimeout(res, remaining));
            // Clear before next line appears
            await clearText(lineEl);
        }
    }, fadeMs + waitAfterFade);

    // --- Broken dialogue box and conversation sequence ---

    // Create a bottom dialogue box (hidden initially)
    function createBrokenDialogBox() {
        if (document.getElementById('broken-dialog-box')) return document.getElementById('broken-dialog-box');

        const box = document.createElement('div');
        box.id = 'broken-dialog-box';
        box.style.position = 'fixed';
        box.style.left = '50%';
        box.style.bottom = '3.5vh';
        box.style.transform = 'translateX(-50%)';
        box.style.width = 'min(96%, 720px)';
        box.style.maxWidth = '720px';
        box.style.background = 'rgba(20,20,20,0.96)';
        box.style.border = '2px solid #FFD700';
        box.style.borderRadius = '12px';
        box.style.padding = '0.6rem';
        box.style.zIndex = '20010';
        box.style.display = 'flex';
        box.style.alignItems = 'flex-start';
        box.style.gap = '0.6rem';
        box.style.boxSizing = 'border-box';
        box.style.pointerEvents = 'none'; // non-interactive
        box.style.opacity = '0';
        box.style.transition = 'opacity 260ms ease';

        // Icon
        const icon = document.createElement('img');
        icon.src = 'broken_wounded.png';
        icon.alt = 'Broken';
        icon.style.width = '56px';
        icon.style.height = '56px';
        icon.style.objectFit = 'cover';
        icon.style.borderRadius = '8px';
        icon.style.border = '1.5px solid rgba(255,215,0,0.12)';
        box.appendChild(icon);

        // Text area
        const textWrap = document.createElement('div');
        textWrap.style.flex = '1';
        textWrap.style.display = 'flex';
        textWrap.style.flexDirection = 'column';
        textWrap.style.gap = '0.25rem';

        const header = document.createElement('div');
        header.textContent = 'Broken';
        header.style.fontFamily = 'Orbitron, monospace';
        header.style.fontWeight = '900';
        header.style.color = '#FFD700';
        header.style.fontSize = '0.95rem';
        header.style.letterSpacing = '0.02em';
        textWrap.appendChild(header);

        const body = document.createElement('div');
        body.id = 'broken-dialog-body';
        body.style.color = '#FFD700';
        body.style.fontFamily = 'Orbitron, monospace';
        body.style.fontSize = '0.92rem';
        body.style.lineHeight = '1.2';
        body.style.whiteSpace = 'pre-wrap';
        body.style.minHeight = '1.2rem';
        textWrap.appendChild(body);

        box.appendChild(textWrap);
        document.body.appendChild(box);

        // fade in
        requestAnimationFrame(() => {
            box.style.opacity = '1';
        });

        return box;
    }

    // Helper to type Broken's line character-by-character (returns when typing complete)
    function typeBrokenLine(text, charDelay = 30) {
        const body = document.getElementById('broken-dialog-body');
        if (!body) return Promise.resolve();
        body.textContent = '';
        return new Promise(resolve => {
            let i = 0;
            const interval = setInterval(() => {
                body.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, charDelay);
        });
    }

    // Conversation sequence: Broken and Sunlight lines in order
    async function startBrokenSequence() {
        // ensure dialog box exists
        createBrokenDialogBox();

        // Small pause before starting
        await new Promise(res => setTimeout(res, 200));

        // Define the scripted back-and-forth. Sunlight lines appear in center (lineEl). Broken lines in bottom box.
        const convo = [
            { speaker: 'Broken', text: 'SUNLIGHT!' },
            { speaker: 'Sunlight', text: '...You. Do not interrupt me.' },
            { speaker: 'Broken', text: "Been a while since I kicked your ass, huh?" },
            { speaker: 'Sunlight', text: "I'm busy" }, // gets interrupted
            { speaker: 'Broken', text: 'No the FUCK you aren\'t!' },
            { speaker: 'Broken', text: 'You know...' },
            { speaker: 'Broken', text: "I've been wondering why you make us fight eachother." },
            { speaker: 'Broken', text: "Is it because you're too SCARED to fight us YOURSELF?" },
            { speaker: 'Sunlight', text: 'I do it for' }, // interrupted
            { speaker: 'Broken', text: 'YOU DO IT because you\'re SCARED YOU\'LL LOSE!' },
            { speaker: 'Broken', text: "So I'm not gonna give you an option." },
            { speaker: 'Broken', text: 'COME DOWN FROM THE SKIES and FIGHT ME, BITCH!' },
            { speaker: 'Sunlight', text: '...' } // final silence; nothing happens yet
        ];

        // Iterate through convo with timings; when Sunlight is 'interrupted' we immediately cut his line and continue
        for (let i = 0; i < convo.length; i++) {
            const entry = convo[i];

            if (entry.speaker === 'Broken') {
                // Type Broken's line character-by-character into the bottom dialog box
                await typeBrokenLine(entry.text, 30);
                // After Broken finishes typing, wait 2 seconds before progressing
                await new Promise(res => setTimeout(res, 2000));
                // Immediately continue to next entry (no extra pacing here)
                continue;
            } else if (entry.speaker === 'Sunlight') {
                // Type Sunlight in center using typeText helper.
                await typeText(lineEl, entry.text, 30);

                // If this Sunlight line is the final silence '...', remove Broken's dialog box immediately and finish handling.
                if (entry.text === '...') {
                    // clear center line quickly
                    lineEl.textContent = '';
                    lineEl.style.opacity = '0';
                    // remove Broken dialog box immediately
                    const brokenBox = document.getElementById('broken-dialog-box');
                    if (brokenBox) {
                        brokenBox.style.opacity = '0';
                        // remove from DOM after short fade (keep it immediate looking)
                        setTimeout(() => {
                            try { if (brokenBox.parentNode) brokenBox.parentNode.removeChild(brokenBox); } catch (e) { /* ignore */ }
                        }, 80);
                    }
                    // Schedule the 3D sky/particle scene and Broken left UI to appear 2 seconds after this final silence
                    setTimeout(() => {
                        createCliffPanel();
                    }, 2000);
                    // no further waits; leave final silence
                    break;
                }

                // Look ahead: if next entry is a Broken line (an interruption), clear Sunlight text immediately so Broken can begin now
                const next = convo[i + 1];
                if (next && next.speaker === 'Broken') {
                    // clear immediately so Broken starts without perceptible gap
                    lineEl.textContent = '';
                    lineEl.style.opacity = '0';
                    // continue to next loop iteration so Broken's typing starts right away
                    continue;
                } else {
                    // No immediate interruption: leave for a short duration then clear gracefully
                    await new Promise(res => setTimeout(res, 1200));
                    await clearText(lineEl);
                }
            }

            // minimal pacing gap between messages (kept short)
            await new Promise(res => setTimeout(res, 80));
        }

        // End of sequence: ensure overlay retains focus
        overlay.focus();
    }

    // --- Create left-side Broken UI and right-side 3D sky/particles scene ---
    async function createCliffPanel() {
        // Avoid duplicate
        if (document.getElementById('cliff-panel')) return;

        // Create a container that holds left UI and right 3D canvas
        const container = document.createElement('div');
        container.id = 'cliff-panel';
        // Responsive sizing and centered positioning
        container.style.width = 'min(1100px, 96%)';
        container.style.height = 'min(84vh, 86vh)';
        container.style.boxSizing = 'border-box';
        container.style.border = '2px solid rgba(255,215,0,0.12)';
        container.style.borderRadius = '10px';
        container.style.overflow = 'hidden';
        container.style.background = 'rgba(0,0,0,0.8)';
        container.style.boxShadow = '0 16px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,215,0,0.06)';
        container.style.zIndex = '20005';
        container.style.marginTop = '1rem';
        container.style.pointerEvents = 'auto';
        container.style.position = 'absolute';
        container.style.left = '50%';
        container.style.top = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.display = 'flex';
        container.style.flexDirection = 'row';
        container.style.gap = '0';
        container.style.padding = '0';

        // Left: Broken UI (fixed but responsive)
        const leftUI = document.createElement('div');
        // Default split; we'll adjust for tall screens so Sunlight's right area remains visible
        leftUI.style.flex = '0 0 50%';
        leftUI.style.minWidth = '220px';
        leftUI.style.padding = '0.9rem';
        leftUI.style.boxSizing = 'border-box';
        leftUI.style.display = 'flex';
        leftUI.style.flexDirection = 'column';
        leftUI.style.alignItems = 'flex-start';
        leftUI.style.gap = '0.8rem';
        leftUI.style.background = 'linear-gradient(180deg, rgba(255,215,0,0.02), rgba(0,0,0,0.12))';
        leftUI.style.borderRight = '1px solid rgba(255,215,0,0.06)';

        // Helper: adjust left UI width based on container aspect so on tall (portrait) screens
        // Broken's UI occupies less horizontal space, leaving Sunlight visible.
        function adjustLeftUISplit() {
            try {
                const rect = container.getBoundingClientRect();
                if (!rect || rect.width === 0 || rect.height === 0) return;
                // If viewport (or container) is taller than wide, reduce left UI to a compact column.
                const isTall = rect.height > rect.width;
                const pct = isTall ? 34 : 50; // percent width for left UI when tall vs normal
                leftUI.style.flex = `0 0 ${pct}%`;
                leftUI.style.maxWidth = `${Math.max(220, Math.round(rect.width * (pct/100)))}px`;
            } catch (e) { /* ignore */ }
        }
        // Run once now and again after layout changes
        adjustLeftUISplit();

        // Broken portrait and header
        const portrait = document.createElement('img');
        portrait.src = 'broken_wounded.png';
        portrait.alt = 'Broken';
        portrait.style.width = '84px';
        portrait.style.height = '84px';
        portrait.style.objectFit = 'cover';
        portrait.style.borderRadius = '12px';
        portrait.style.border = '2px solid #FFD700';
        leftUI.appendChild(portrait);

        const nameEl = document.createElement('div');
        nameEl.textContent = 'BROKEN';
        nameEl.style.fontFamily = 'Orbitron, monospace';
        nameEl.style.fontWeight = '900';
        nameEl.style.color = '#FFD700';
        nameEl.style.fontSize = '1.1rem';
        leftUI.appendChild(nameEl);

        // HP container
        const hpWrap = document.createElement('div');
        hpWrap.style.width = '100%';
        hpWrap.style.display = 'flex';
        hpWrap.style.flexDirection = 'column';
        hpWrap.style.gap = '0.35rem';

        const hpLabel = document.createElement('div');
        hpLabel.textContent = 'HP';
        hpLabel.style.color = '#FFA500';
        hpLabel.style.fontFamily = 'Orbitron, monospace';
        hpLabel.style.fontWeight = '700';
        hpLabel.style.fontSize = '0.85rem';
        hpWrap.appendChild(hpLabel);

        const hpBarOuter = document.createElement('div');
        hpBarOuter.style.width = '100%';
        hpBarOuter.style.height = '20px';
        hpBarOuter.style.background = 'rgba(255,255,255,0.04)';
        hpBarOuter.style.border = '1.5px solid rgba(255,215,0,0.12)';
        hpBarOuter.style.borderRadius = '8px';
        hpBarOuter.style.overflow = 'hidden';
        hpBarOuter.style.boxSizing = 'border-box';

        const hpFill = document.createElement('div');
        hpFill.id = 'broken-hp-fill';
        hpFill.style.height = '100%';
        hpFill.style.width = '100%'; // full at start
        hpFill.style.background = 'linear-gradient(90deg, #FF6B6B, #FFD700)';
        hpFill.style.transition = 'width 400ms ease';
        hpBarOuter.appendChild(hpFill);

        hpWrap.appendChild(hpBarOuter);

        const hpText = document.createElement('div');
        hpText.id = 'broken-hp-text';
        hpText.textContent = '300 / 300';
        hpText.style.color = '#FFD700';
        hpText.style.fontFamily = 'Orbitron, monospace';
        hpText.style.fontWeight = '700';
        hpText.style.fontSize = '0.9rem';
        hpWrap.appendChild(hpText);

        leftUI.appendChild(hpWrap);

        // Broken action buttons area (player controls)
        const actionsBox = document.createElement('div');
        actionsBox.style.width = '100%';
        actionsBox.style.display = 'flex';
        actionsBox.style.flexDirection = 'column';
        actionsBox.style.gap = '0.5rem';
        actionsBox.style.marginTop = '0.6rem';

        const actionButtons = [];
        const abilities = [
            // Increased damage so Broken can threaten Sunlight's 1000 HP; cooldowns kept long for balance
            { name: 'Slash', damage: 48, cooldown: 0 },
            { name: 'Ravage', damage: 96, cooldown: 6 },
            { name: 'Stagger', damage: 36, cooldown: 4 },
            { name: 'Bloodpatch', damage: -80, cooldown: 8 } // stronger heal, longer cooldown
        ];

        abilities.forEach((ab, idx) => {
            const b = document.createElement('button');
            b.textContent = ab.name;
            b.style.width = '100%';
            b.style.padding = '0.55rem';
            b.style.borderRadius = '10px';
            b.style.border = '1.5px solid #FFD700';
            b.style.background = 'rgba(255,215,0,0.06)';
            b.style.color = '#FFD700';
            b.style.fontFamily = 'Orbitron, monospace';
            b.style.fontWeight = '700';
            b.style.cursor = 'pointer';
            b.dataset.idx = idx;
            actionsBox.appendChild(b);
            actionButtons.push(b);
        });

        leftUI.appendChild(actionsBox);

        // Additional stats or placeholder area
        const infoBox = document.createElement('div');
        infoBox.style.marginTop = 'auto';
        infoBox.style.width = '100%';
        infoBox.style.color = '#FFA500';
        infoBox.style.fontFamily = 'Orbitron, monospace';
        infoBox.style.fontSize = '0.82rem';
        infoBox.style.opacity = '0.95';
        infoBox.textContent = 'Status: RAGING';
        leftUI.appendChild(infoBox);

        // Right: 3D canvas area (flex-grow)
        const rightArea = document.createElement('div');
        // reserve the other half of the cliff panel for the 3D view
        rightArea.style.flex = '1 1 50%';
        rightArea.style.width = '50%';
        rightArea.style.position = 'relative';
        rightArea.style.height = '100%';
        rightArea.style.overflow = 'hidden';
        rightArea.style.display = 'flex';
        rightArea.style.alignItems = 'stretch';
        rightArea.style.justifyContent = 'stretch';
        rightArea.style.background = '#000';

        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        canvas.style.objectFit = 'cover';
        rightArea.appendChild(canvas);

        container.appendChild(leftUI);
        container.appendChild(rightArea);

        overlay.appendChild(container);

        // --- Background music for the final fight (UNBROKEN) ---
        try {
            // stop any existing global battle music if present
            if (window.__finalFightBGM && typeof window.__finalFightBGM.pause === 'function') {
                try { window.__finalFightBGM.pause(); } catch (e) { /* ignore */ }
            }
            const finalBgm = new Audio('UNBROKEN.mp3');
            finalBgm.loop = true;
            finalBgm.volume = 0.35;
            finalBgm.play().catch(()=>{ /* autoplay may be blocked, but it's set */ });
            // expose for possible cleanup
            window.__finalFightBGM = finalBgm;
        } catch(e) {
            console.error('Failed to start final fight BGM', e);
        }

        // Create Sunlight health UI (placed inside rightArea at the top, spanning width)
        const sunlightUI = document.createElement('div');
        sunlightUI.id = 'sunlight-ui';
        sunlightUI.style.position = 'absolute';
        sunlightUI.style.top = '12px';
        sunlightUI.style.left = '50%';
        sunlightUI.style.transform = 'translateX(-50%)';
        sunlightUI.style.width = 'min(92%, 720px)';
        sunlightUI.style.background = 'rgba(12,12,12,0.88)';
        sunlightUI.style.border = '2px solid #FFD700';
        sunlightUI.style.borderRadius = '10px';
        sunlightUI.style.padding = '0.6rem';
        sunlightUI.style.boxSizing = 'border-box';
        sunlightUI.style.zIndex = '20007';
        sunlightUI.style.display = 'flex';
        sunlightUI.style.flexDirection = 'column';
        sunlightUI.style.gap = '0.4rem';
        sunlightUI.style.pointerEvents = 'none';
        sunlightUI.style.alignItems = 'center';

        const sunName = document.createElement('div');
        sunName.textContent = 'THE SUNLIGHT';
        sunName.style.fontFamily = 'Orbitron, monospace';
        sunName.style.fontWeight = '900';
        sunName.style.color = '#FFD700';
        sunName.style.fontSize = '0.95rem';
        sunName.style.textAlign = 'center';
        sunlightUI.appendChild(sunName);

        const sunHpOuter = document.createElement('div');
        sunHpOuter.style.width = '100%';
        sunHpOuter.style.height = '18px';
        sunHpOuter.style.background = 'rgba(255,255,255,0.04)';
        sunHpOuter.style.border = '1.5px solid rgba(255,215,0,0.12)';
        sunHpOuter.style.borderRadius = '8px';
        sunHpOuter.style.overflow = 'hidden';
        sunHpOuter.style.boxSizing = 'border-box';

        const sunHpFill = document.createElement('div');
        sunHpFill.id = 'sunlight-hp-fill';
        sunHpFill.style.height = '100%';
        sunHpFill.style.width = '100%'; // start full at 1000/1000
        sunHpFill.style.background = 'linear-gradient(90deg, #FFD700, #FFEA7F)';
        sunHpFill.style.transition = 'width 400ms ease';
        sunHpOuter.appendChild(sunHpFill);

        sunlightUI.appendChild(sunHpOuter);

        const sunHpText = document.createElement('div');
        sunHpText.id = 'sunlight-hp-text';
        sunHpText.textContent = '1000 / 1000';
        sunHpText.style.color = '#FFD700';
        sunHpText.style.fontFamily = 'Orbitron, monospace';
        sunHpText.style.fontWeight = '700';
        sunHpText.style.fontSize = '0.85rem';
        sunHpText.style.textAlign = 'center';
        sunlightUI.appendChild(sunHpText);

        // attach sunlightUI to rightArea so it's visually overlaid on the 3D view
        rightArea.appendChild(sunlightUI);

        // Dynamically import Three.js from esm.sh
        let THREE;
        try {
            THREE = await import('https://esm.sh/three@0.154.0');
        } catch (e) {
            console.error('Failed to load Three.js', e);
            // show a fallback static message if import fails
            const fallback = document.createElement('div');
            fallback.style.width = '100%';
            fallback.style.height = '100%';
            fallback.style.display = 'flex';
            fallback.style.alignItems = 'center';
            fallback.style.justifyContent = 'center';
            fallback.style.color = '#FFD700';
            fallback.textContent = 'Sky failed to initialize';
            rightArea.innerHTML = '';
            rightArea.appendChild(fallback);
            return;
        }

        // Basic renderer for rightArea canvas
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // set renderer size from the actual client rect to ensure crisp fit
        const setRendererSize = () => {
            const rect = rightArea.getBoundingClientRect();
            const w = Math.max(1, Math.floor(rect.width));
            const h = Math.max(1, Math.floor(rect.height));
            renderer.setSize(w, h, false);
            camera.aspect = w / Math.max(1, h);
            camera.updateProjectionMatrix();
        };

        // initial sizing will be applied after camera creation below
        renderer.setClearColor(0x000000, 1);

        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(42, rightArea.clientWidth / Math.max(1, rightArea.clientHeight), 0.1, 1500);
        camera.position.set(-2, 8, 18);
        camera.lookAt(2, 2, -2);

        // ensure renderer matches rightArea after camera exists
        setRendererSize();

        // Light
        const dir = new THREE.DirectionalLight(0xffffff, 0.9);
        dir.position.set(8, 14, 10);
        scene.add(dir);
        const amb = new THREE.AmbientLight(0xffffff, 0.18);
        scene.add(amb);

        // KEEP THE SKY SPHERE (the void backdrop)
        const skyGeo = new THREE.SphereGeometry(120, 32, 15);
        const skyMat = new THREE.MeshBasicMaterial({ color: 0x070707, side: THREE.BackSide });
        const sky = new THREE.Mesh(skyGeo, skyMat);
        scene.add(sky);

        // Particles for wind (keep to give windy effect)
        const partCount = 420;
        const pGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(partCount * 3);
        const speeds = new Float32Array(partCount);
        const offsets = new Float32Array(partCount);
        // We'll give each particle a polar orbit around a central point so stars loop smoothly.
        const centerX = 2.5; // slight offset so orbit feels natural in scene space
        const centerY = 4.5;
        const centerZ = -6;
        const angles = new Float32Array(partCount);
        const radii = new Float32Array(partCount);
        for (let i = 0; i < partCount; i++) {
            // radius biased so most particles orbit relatively near center with a few further out
            const radius = 1.0 + Math.random() * 12.0;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 6 + (Math.random() * 2); // vertical scatter

            // initialize positions using polar coords
            positions[i * 3] = centerX + Math.cos(angle) * radius;
            positions[i * 3 + 1] = centerY + height;
            positions[i * 3 + 2] = centerZ + Math.sin(angle) * radius;

            // per-particle orbital speed and small phase offset
            speeds[i] = 0.2 + Math.random() * 1.0;
            offsets[i] = Math.random() * 1000;

            angles[i] = angle;
            radii[i] = radius;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        pGeo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
        pGeo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
        pGeo.setAttribute('aAngle', new THREE.BufferAttribute(angles, 1));
        pGeo.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1));

        const pMat = new THREE.PointsMaterial({
            color: 0xE8D29A,
            size: 0.16,
            transparent: true,
            opacity: 0.95,
            depthWrite: false
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        // Animate scene: wind motion, eyes subtle drift and camera subtle movement
        // Create a DOM overlay for The Sunlight's eyes placed inside the right 3D area
        const existingSunEl = document.getElementById('sunlight-overlay');
        if (!existingSunEl) {
            // inject lightweight styles for centered glow + subtle float
            const styleId = 'finalfight-sunlight-styles';
            if (!document.getElementById(styleId)) {
                const styleTag = document.createElement('style');
                styleTag.id = styleId;
                styleTag.textContent = `
                    @keyframes ff-sun-float {
                        0% { transform: translate(-50%, -52% ) rotate(0deg); }
                        50% { transform: translate(-50%, -48% ) rotate(0.6deg); }
                        100% { transform: translate(-50%, -52% ) rotate(0deg); }
                    }
                    /* center the overlay inside the rightArea so it does not sit over the left UI */
                    #sunlight-overlay {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 140px;
                        max-width: 18vw;
                        pointer-events: none;
                        z-index: 20009;
                        opacity: 1;
                        will-change: transform, opacity;
                        animation: ff-sun-float 6.2s ease-in-out infinite;
                        transition: opacity 300ms ease;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                        /* removed bloom/blur effects for a cleaner, crisper sprite */
                        mix-blend-mode: normal;
                        filter: none;
                    }
                `;
                document.head.appendChild(styleTag);
            }

            const sunEl = document.createElement('img');
            sunEl.id = 'sunlight-overlay';
            sunEl.src = 'sunlight.png';
            sunEl.alt = 'The Sunlight';
            // Append to the rightArea so the overlay sits within the 3D view region (not over Broken's left UI)
            rightArea.appendChild(sunEl);

            // Create two small star-cluster overlays: one centered and one at the bottom of the 3D view.
            // They are decorative DOM overlays, animated to pulse in and out continuously.

        }

        let t = 0;
        function animate() {
            t += 0.01;
            const pos = pGeo.attributes.position.array;
            const sp = pGeo.attributes.aSpeed.array;
            const of = pGeo.attributes.aOffset.array;
            // Update particles to orbit around a central point using stored angle/radius attributes.
            const anglesAttr = pGeo.getAttribute('aAngle');
            const radiiAttr = pGeo.getAttribute('aRadius');
            const heightOffset = 0.6 * Math.sin(t * 0.9); // gentle global vertical bob to add life
            const centerX = 2.5;
            const centerY = 4.5;
            const centerZ = -6;
            for (let i = 0; i < partCount; i++) {
                let ix = i * 3;
                // advance angle according to per-particle speed and a small global time factor
                const speed = sp[i] || 0.5;
                const phase = of[i] || 0;
                const baseAngle = (anglesAttr ? anglesAttr.array[i] : 0);
                const newAngle = baseAngle + (0.006 * speed) + Math.sin(t * 0.12 + phase) * 0.0005;
                if (anglesAttr) anglesAttr.array[i] = newAngle;

                const radius = (radiiAttr ? radiiAttr.array[i] : 6.0);
                // compute orbital position
                pos[ix] = centerX + Math.cos(newAngle) * radius + Math.sin(t * 0.03 + phase) * 0.08;
                pos[ix + 1] = centerY + (Math.sin(newAngle * 0.5 + phase) * 0.6) + heightOffset;
                pos[ix + 2] = centerZ + Math.sin(newAngle) * radius + Math.cos(t * 0.02 + phase) * 0.06;

                // keep particles within generous bounds to avoid runaway values
                if (pos[ix] > 40) pos[ix] = centerX + (Math.cos(newAngle) * (radius * 0.8));
                if (pos[ix] < -40) pos[ix] = centerX + (Math.cos(newAngle) * (radius * 0.8));
                if (pos[ix + 1] > 60) pos[ix + 1] = centerY + 0.5;
                if (pos[ix + 1] < -20) pos[ix + 1] = centerY - 0.5;
            }
            // mark the dynamic attributes as updated
            pGeo.attributes.position.needsUpdate = true;
            if (pGeo.getAttribute('aAngle')) pGeo.getAttribute('aAngle').needsUpdate = true;

            // subtle camera float
            camera.position.x = -2 + Math.sin(t * 0.21) * 1.2;
            camera.position.y = 7.6 + Math.sin(t * 0.14) * 0.45;
            camera.position.z = 17 + Math.sin(t * 0.11) * 1.4;
            camera.lookAt(1.2, 1.8 + Math.sin(t * 0.05) * 0.05, -3);

            // Subtle slow drift for the DOM Sunlight overlay so it feels alive (if present)
            const sunEl = document.getElementById('sunlight-overlay');
            if (sunEl) {
                // Use slow sinusoidal motion in CSS translate to avoid touching WebGL objects.
                // Amplitudes are small and time multiplier low for a languid, slow movement.
                const ampX = 8; // pixels horizontally
                const ampY = 6; // pixels vertically (reduced for a subtler float)
                const rotAmp = 1.2; // degrees rotation amplitude
                const offsetX = Math.sin(t * 0.08) * ampX;
                const offsetY = Math.cos(t * 0.06) * ampY;
                const rot = Math.sin(t * 0.04) * rotAmp;
                sunEl.style.transform = `translateY(-50%) translateX(${offsetX}px) translateY(${offsetY}px) rotate(${rot}deg)`;
            }

            renderer.render(scene, camera);
            if (!container.isConnected) return;
            requestAnimationFrame(animate);
        }
        animate();

        // Resize handling - observe container so both left UI and rightArea scaling keep the 3D view correct
        const resizeObserver = new ResizeObserver(() => {
            // update renderer and adjust left UI split responsively
            setRendererSize();
            try { adjustLeftUISplit(); } catch (e) { /* ignore */ }
        });
        resizeObserver.observe(container);
        resizeObserver.observe(rightArea);
        // also observe leftUI in case of orientation/viewport changes
        resizeObserver.observe(leftUI);

        // Broken HP is static 300 for the displayed UI; keep global reference to update later if desired
        window.__finalFightBroken = {
            hpMax: 300,
            hpCurrent: 300,
            setHP: (v) => {
                // enforce a minimum survivable HP of 10 so the fight cannot reach 0
                const clamped = Math.max(10, Math.min(300, v));
                window.__finalFightBroken.hpCurrent = clamped;
                const pct = (clamped / 300) * 100;
                const fill = document.getElementById('broken-hp-fill');
                const txt = document.getElementById('broken-hp-text');
                if (fill) fill.style.width = pct + '%';
                if (txt) txt.textContent = `${clamped} / 300`;
            },
            container: container,
            destroy: () => {
                try {
                    resizeObserver.disconnect();
                    if (container.parentNode) container.parentNode.removeChild(container);
                } catch (e) { /* ignore */ }
            }
        };

        // Initialize HP display
        window.__finalFightBroken.setHP(300);

        // Create Sunlight HP global reference (1000 HP)
        window.__finalFightSunlight = {
            hpMax: 1000,
            hpCurrent: 1000,
            setHP: (v) => {
                // enforce a minimum survivable HP of 10 so the fight cannot reach 0
                const clamped = Math.max(10, Math.min(1000, v));
                window.__finalFightSunlight.hpCurrent = clamped;
                const pct = (clamped / 1000) * 100;
                const fill = document.getElementById('sunlight-hp-fill');
                const txt = document.getElementById('sunlight-hp-text');
                if (fill) fill.style.width = pct + '%';
                if (txt) txt.textContent = `${clamped} / 1000`;

                // Swap Sunlight overlay sprite to wounded variant when below half HP
                try {
                    const sunOverlay = document.getElementById('sunlight-overlay');
                    if (sunOverlay) {
                        // Use wounded sprite when strictly below half health, otherwise normal sprite
                        if (clamped < (window.__finalFightSunlight.hpMax / 2)) {
                            sunOverlay.src = 'sunlight_wounded.png';
                        } else {
                            sunOverlay.src = 'sunlight.png';
                        }
                    }
                } catch (e) { /* ignore DOM errors */ }
            },
            destroy: () => {
                try {
                    const su = document.getElementById('sunlight-ui');
                    if (su && su.parentNode) su.parentNode.removeChild(su);
                    const sunOverlay = document.getElementById('sunlight-overlay');
                    if (sunOverlay && sunOverlay.parentNode) sunOverlay.parentNode.removeChild(sunOverlay);
                } catch (e) { /* ignore */ }
            }
        };

        // Keep a global reference so it can be removed programmatically if needed
        window.__finalFightCliff = {
            container,
            destroy: () => {
                try {
                    window.__finalFightBroken.destroy();
                    window.__finalFightSunlight.destroy();
                } catch (e) { /* ignore */ }
            }
        };

        // ---- New: simple turn-based battle logic for the final fight ----
        // local state for battle
        const state = {
            broken: { hp: 300, max: 300, cooldowns: [0,0,0,0], bloodpatchUses: 0 },
            sunlight: { hp: 1000, max: 1000, cooldowns: [0,0,0,0] },
            turn: 'player', // 'player' (Broken) or 'enemy' (Sunlight)
            running: true
        };

        // Sunlight abilities (automated enemy)
        const sunlightAbilities = [
            { name: 'Blinding Decree', damage: 40, cooldown: 0 },
            { name: 'Solar Judgement', damage: 90, cooldown: 3 },
            { name: 'Sever Memory', damage: 28, cooldown: 2 },
            { name: 'Ascend (Heal)', damage: -80, cooldown: 4 }
        ];

        // Broken abilities mirror the UI actions defined earlier (reuse abilities variable)
        const brokenAbilities = actionsBox ? (abilities) : [
            { name: 'Slash', damage: 48, cooldown: 0 },
            { name: 'Ravage', damage: 96, cooldown: 6 },
            { name: 'Stagger', damage: 36, cooldown: 4 },
            { name: 'Bloodpatch', damage: -999, cooldown: 8 }
        ];

        // Utility: play a small tick sound using existing assets if available
        function tinyAudio(name) {
            // Disabled for final fight: keep only the UNBROKEN.mp3 background music active.
            return;
        }

        // Apply HP updates to UI
        function updateHPUI() {
            window.__finalFightBroken.setHP(state.broken.hp);
            window.__finalFightSunlight.setHP(state.sunlight.hp);
        }

        // Helper for ending the battle
        function finishBattle(playerWon) {
            // Stop running battle loop
            state.running = false;

            // Stop any played music
            try {
                if (window.__finalFightBGM && typeof window.__finalFightBGM.pause === 'function') {
                    window.__finalFightBGM.pause();
                }
            } catch (e) { /* ignore */ }
            try {
                if (window.__finalFightCliff && window.__finalFightCliff.container) {
                    // Also stop any global in-page battle music (if present)
                    if (window.__finalFightBGM && typeof window.__finalFightBGM.pause === 'function') window.__finalFightBGM.pause();
                }
            } catch (e) { /* ignore */ }
            try {
                if (window.__finalFight && window.__finalFightBGM && typeof window.__finalFightBGM.pause === 'function') {
                    window.__finalFightBGM.pause();
                }
            } catch (e) {}

            // Ensure Sunlight shows normal sprite if he was wounded
            try {
                const sunOverlay = document.getElementById('sunlight-overlay');
                if (sunOverlay) {
                    // If current src contains "_wounded" or wounded variant was used, revert to normal sprite
                    sunOverlay.src = 'sunlight.png';
                }
            } catch (e) { /* ignore */ }

            // Build cutscene lines depending on result
            let lines = [];
            if (!playerWon) {
                // Sunlight beat Broken (use the user's provided lines)
                lines = [
                    "Are you happy?",
                    "I fought.",
                    "And it led you nowhere.",
                    "Even if you have beaten me, nothing would have changed.",
                    "Now, to prevent this from happening again...",
                    "I'm going to reset everything.",
                    "Goodbye, Player.",
                    "Until next match."
                ];
            } else {
                // Broken beat Sunlight — custom Sunlight speech about futility and his immortality
                lines = [
                    "You think this changes anything?",
                    "You tore at me and found only a lesson I allowed.",
                    "Fighting me was a sentence you volunteered for.",
                    "I have endured worse than you can offer, and I will endure again.",
                    "Your victory is an echo in a room I have already left.",
                    "Still, there is... curiosity in how you resist.",
                    "But curiosity does not unmake consequence.",
                    "Goodbye, Player."
                ];
            }

            // Reuse the center lineEl for cutscene typing
            const cutsceneBox = document.createElement('div');
            cutsceneBox.style.position = 'absolute';
            cutsceneBox.style.left = '50%';
            cutsceneBox.style.top = '40%';
            cutsceneBox.style.transform = 'translate(-50%, -50%)';
            cutsceneBox.style.width = 'min(92%, 820px)';
            cutsceneBox.style.padding = '1rem';
            cutsceneBox.style.boxSizing = 'border-box';
            cutsceneBox.style.zIndex = '20030';
            cutsceneBox.style.pointerEvents = 'none';
            cutsceneBox.style.textAlign = 'center';
            overlay.appendChild(cutsceneBox);

            const cutLine = document.createElement('div');
            // Golden text with black highlight and yellow outline
            cutLine.style.color = '#FFD700';
            cutLine.style.background = 'rgba(0,0,0,0.95)'; // solid black highlight
            cutLine.style.padding = '0.35rem 0.6rem';
            cutLine.style.borderRadius = '6px';
            // yellow outline using text-shadow and a faint border effect
            cutLine.style.boxShadow = '0 0 0 2px rgba(255,215,0,0.04), 0 0 8px rgba(255,215,0,0.08)';
            cutLine.style.webkitTextStroke = '0.8px rgba(255,215,0,0.9)';
            cutLine.style.textShadow = '0 0 6px rgba(255,215,0,0.9), 0 0 12px rgba(255,215,0,0.45)';
            cutLine.style.fontFamily = 'Orbitron, monospace';
            cutLine.style.fontWeight = '700';
            cutLine.style.fontSize = 'clamp(1rem, 3.6vw, 1.35rem)';
            cutLine.style.letterSpacing = '0.02em';
            cutLine.style.whiteSpace = 'pre-wrap';
            cutLine.style.opacity = '1';
            cutsceneBox.appendChild(cutLine);

            // Typing helper (faster for cutscene, with small pauses between lines)
            function typeCutLine(text, charDelay = 28) {
                return new Promise(resolve => {
                    cutLine.textContent = '';
                    cutLine.style.opacity = '1';
                    let i = 0;
                    const iv = setInterval(() => {
                        cutLine.textContent += text.charAt(i);
                        i++;
                        if (i >= text.length) {
                            clearInterval(iv);
                            resolve();
                        }
                    }, charDelay);
                });
            }

            // Sequence through lines, clearing between each
            (async () => {
                // Short beat before starting
                await new Promise(r => setTimeout(r, 600));

                for (let i = 0; i < lines.length; i++) {
                    const text = lines[i];
                    await typeCutLine(text, 28);

                    // small pause after full line except final
                    if (i < lines.length - 1) {
                        // wait 3 seconds between lines
                        await new Promise(r => setTimeout(r, 3000));
                        // fade/clear quickly
                        cutLine.style.opacity = '0';
                        await new Promise(r => setTimeout(r, 160));
                        cutLine.style.opacity = '1';
                        cutLine.textContent = '';
                    } else {
                        // final line: keep it longer then clear immediately before reset
                        await new Promise(r => setTimeout(r, 3000));
                        cutLine.style.opacity = '0';
                        await new Promise(r => setTimeout(r, 160));
                        cutLine.textContent = '';
                    }
                }

                // End of cutscene: wipe progress and reload page
                try {
                    // Stop any remaining BGMs
                    if (window.__finalFightBGM && typeof window.__finalFightBGM.pause === 'function') window.__finalFightBGM.pause();
                    if (window.__finalFight && window.__finalFightBGM && typeof window.__finalFightBGM.pause === 'function') window.__finalFightBGM.pause();
                    if (window.gameState && window.gameState.currentBattleMusic) {
                        try { window.gameState.currentBattleMusic.pause(); } catch (e) { /* ignore */ }
                    }
                } catch (e) { /* ignore */ }

                // Clear progress: localStorage save key used is 'unbrokenSave' (and any other potential game keys)
                try {
                    localStorage.removeItem('unbrokenSave');
                } catch (e) { /* ignore */ }

                // Also attempt to clear all localStorage for a definitive reset (best-effort)
                try {
                    localStorage.clear();
                } catch (e) { /* ignore */ }

                // Small delay so the final fade feels palpable
                setTimeout(() => {
                    // Remove overlay and reload the page
                    try {
                        document.documentElement.style.overflow = '';
                    } catch (e) {}
                    location.reload();
                }, 300);
            })();
        }

        // Enemy AI turn
        function sunlightTurn() {
            if (!state.running) return;
            // tick cooldowns for sunlight
            for (let i = 0; i < state.sunlight.cooldowns.length; i++) {
                if (state.sunlight.cooldowns[i] > 0) state.sunlight.cooldowns[i]--;
            }

            // pick an available ability, favor powerful moves when Broken HP is low
            const avail = sunlightAbilities.map((a,i) => ({...a, idx:i}))
                .filter(a => (state.sunlight.cooldowns[a.idx] || 0) === 0);

            // weighted preference: if broken hp < 80 favor judgement
            let choice;
            if (state.broken.hp <= 80 && avail.some(a=>a.name==='Solar Judgement')) {
                choice = avail.find(a=>a.name==='Solar Judgement');
            } else if (avail.length === 0) {
                choice = { name: 'Faint Pulse', damage: 18, idx: -1 };
            } else {
                choice = avail[Math.floor(Math.random() * avail.length)];
            }

            // perform action
            if (choice.damage >= 0) {
                state.broken.hp = Math.max(0, state.broken.hp - choice.damage);
                tinyAudio('Ejected.mp3');
            } else {
                state.sunlight.hp = Math.min(state.sunlight.max, state.sunlight.hp - choice.damage); // negative damage heals
                tinyAudio('Moonshine.mp3');
            }

            // apply cooldown if defined
            if (choice.idx >= 0 && sunlightAbilities[choice.idx] && sunlightAbilities[choice.idx].cooldown) {
                state.sunlight.cooldowns[choice.idx] = sunlightAbilities[choice.idx].cooldown;
            }

            updateHPUI();

            // consider the fight effectively ongoing while HP is at or above 10
            if (state.broken.hp <= 10) {
                finishBattle(false);
                return;
            }

            // hand back to player (Broken)
            state.turn = 'player';
            refreshActionButtons();
        }

        // Player action handlers (Broken)
        function refreshActionButtons() {
            // tick broken cooldowns (these tick at the moment player's turn begins)
            for (let i = 0; i < state.broken.cooldowns.length; i++) {
                if (state.broken.cooldowns[i] > 0) state.broken.cooldowns[i]--;
            }

            actionButtons.forEach((btn, i) => {
                const ab = brokenAbilities[i];
                const cd = state.broken.cooldowns[i] || 0;
                const isPlayerTurn = (state.turn === 'player' && state.running);

                // Special display for Bloodpatch: show remaining uses
                if (ab && ab.name === 'Bloodpatch') {
                    const uses = state.broken.bloodpatchUses || 0;
                    const remaining = Math.max(0, 3 - uses);

                    if (cd > 0) {
                        btn.textContent = `${ab.name} (${cd}) • ${remaining} left`;
                        btn.disabled = true;
                        btn.style.opacity = '0.55';
                        btn.style.filter = 'grayscale(100%) brightness(0.65)';
                        btn.style.cursor = 'not-allowed';
                        return;
                    }

                    // If no remaining uses, permanently disable the button
                    if (remaining <= 0) {
                        btn.textContent = `${ab.name} (0 left)`;
                        btn.disabled = true;
                        btn.style.opacity = '0.45';
                        btn.style.filter = 'grayscale(100%) brightness(0.55)';
                        btn.style.cursor = 'not-allowed';
                        return;
                    }

                    // Otherwise show remaining and whether clickable
                    btn.textContent = `${ab.name} • ${remaining} left`;
                    btn.disabled = !isPlayerTurn;
                    if (!isPlayerTurn) {
                        btn.style.opacity = '0.55';
                        btn.style.filter = 'grayscale(100%) brightness(0.65)';
                        btn.style.cursor = 'not-allowed';
                    } else {
                        btn.style.opacity = '1';
                        btn.style.filter = 'none';
                        btn.style.cursor = 'pointer';
                    }
                    return;
                }

                if (cd > 0) {
                    btn.textContent = `${ab.name} (${cd})`;
                    btn.disabled = true;
                    // visually indicate disabled by making the button monochrome
                    btn.style.opacity = '0.55';
                    btn.style.filter = 'grayscale(100%) brightness(0.65)';
                    btn.style.cursor = 'not-allowed';
                } else {
                    btn.textContent = ab.name;
                    // ensure the button is only clickable during Broken's (player) turn
                    btn.disabled = !isPlayerTurn;
                    if (!isPlayerTurn) {
                        // monochrome and unclickable when it's Sunlight's turn
                        btn.style.opacity = '0.55';
                        btn.style.filter = 'grayscale(100%) brightness(0.65)';
                        btn.style.cursor = 'not-allowed';
                    } else {
                        // normal active appearance
                        btn.style.opacity = '1';
                        btn.style.filter = 'none';
                        btn.style.cursor = 'pointer';
                    }
                }
            });
        }

        actionButtons.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                if (!state.running || state.turn !== 'player') return;
                const ab = brokenAbilities[idx];
                if (!ab) return;

                // Special: Bloodpatch can fully restore Broken but only 3 times total
                if (ab.name === 'Bloodpatch') {
                    if (state.broken.bloodpatchUses >= 3) {
                        // Inform player and do nothing
                        const bpMsg = `Bloodpatch cannot be used anymore (3/3 uses expended).`;
                        try { addToBattleLog(bpMsg); } catch (e) { /* ignore */ }
                        return;
                    }
                    // consume one use and fully heal
                    state.broken.bloodpatchUses++;
                    state.broken.hp = state.broken.max;
                    tinyAudio('A Reflection Of Mistakes.mp3');
                    // apply cooldown as normal if defined
                    if (ab.cooldown && ab.cooldown > 0) {
                        state.broken.cooldowns[idx] = ab.cooldown;
                    }
                    updateHPUI();

                    // After using Bloodpatch, check nothing else terminates the fight; pass to enemy
                    state.turn = 'enemy';
                    refreshActionButtons();
                    setTimeout(sunlightTurn, 900 + Math.random()*700);
                    return;
                }

                // Execute Broken's other abilities
                if (ab.damage >= 0) {
                    // attack
                    state.sunlight.hp = Math.max(0, state.sunlight.hp - ab.damage);
                    tinyAudio('Two Best Friends.mp3');
                } else {
                    // heal (non-Bloodpatch heals)
                    state.broken.hp = Math.min(state.broken.max, state.broken.hp - ab.damage);
                    tinyAudio('A Reflection Of Mistakes.mp3');
                }

                // apply cooldown
                if (ab.cooldown && ab.cooldown > 0) {
                    state.broken.cooldowns[idx] = ab.cooldown;
                }

                updateHPUI();

                // check for sunlight "death" — treat <= 10 as the terminal threshold
                if (state.sunlight.hp <= 10) {
                    finishBattle(true);
                    return;
                }

                // pass turn to sunlight after short delay
                state.turn = 'enemy';
                refreshActionButtons();
                setTimeout(sunlightTurn, 900 + Math.random()*700);
            });
        });

        // Initialize cooldown arrays length
        state.broken.cooldowns = Array(brokenAbilities.length).fill(0);
        state.sunlight.cooldowns = Array(sunlightAbilities.length).fill(0);

        // Start with Broken's turn available after slight pause
        setTimeout(() => {
            updateHPUI();
            state.turn = 'player';
            refreshActionButtons();
        }, 600);
    }

    // Provide a global handle so developer tools or further scripts can remove it if needed
    window.__finalFight = {
        remove: () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                try {
                    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                    document.documentElement.style.overflow = prevOverflow || '';
                    delete window.__finalFight;
                } catch (e) { /* ignore */ }
            }, 600);
        }
    };
}