
export default function startDean(onReload = false) {
    // Prevent multiple runs
    if (document.getElementById('dean-overlay')) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'dean-overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100dvh';
    overlay.style.background = '#000';
    overlay.style.zIndex = 26000;
    overlay.style.pointerEvents = 'auto';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.flexDirection = 'column';
    overlay.style.transition = 'opacity 480ms ease';
    overlay.style.opacity = '0';

    const textEl = document.createElement('div');
    textEl.style.color = '#FFD700';
    textEl.style.fontFamily = 'Orbitron, monospace';
    textEl.style.fontWeight = '800';
    textEl.style.fontSize = 'clamp(1rem, 4.5vw, 2rem)';
    textEl.style.textAlign = 'center';
    textEl.style.whiteSpace = 'pre-wrap';
    textEl.style.opacity = '0';
    overlay.appendChild(textEl);

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.style.opacity = '1');

    function typeText(el, text, delay = 36) {
        return new Promise(resolve => {
            el.textContent = '';
            el.style.opacity = '1';
            let i = 0;
            const iv = setInterval(() => {
                el.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(iv);
                    resolve();
                }
            }, delay);
        });
    }

    function clearText(el) {
        return new Promise(res => {
            el.style.opacity = '0';
            setTimeout(() => { el.textContent = ''; res(); }, 140);
        });
    }

    // Dialogue variants
    const normalLines = [
        '...Hello, Player.',
        'I notice you keep gambling.',
        "Even though you have every character you can get from there.",
        'Are you looking for secrets or something?',
        '...well, I did not program this game for \"easter eggs\".',
        'But I suppose you\'ve earned atleast SOMETHING...'
    ];

    const reloadLines = [
        'Welcome back.'
    ];

    // Helper to create the alternate-styled fight UI (Player 100 HP vs Dean 1000 HP)
    function startDeanFight() {
        // Prevent duplicate fight
        if (document.getElementById('dean-fight')) return;

        // Create container that visually differs from normal battle
        const fight = document.createElement('div');
        fight.id = 'dean-fight';
        fight.style.position = 'fixed';
        fight.style.inset = '0';
        fight.style.zIndex = 27000;
        fight.style.display = 'flex';
        fight.style.alignItems = 'stretch';
        fight.style.justifyContent = 'center';
        fight.style.background = '#060606';
        fight.style.pointerEvents = 'auto';
        fight.style.flexDirection = 'column';
        fight.style.padding = '2vh';
        fight.style.boxSizing = 'border-box';

        // Animated background canvas
        const bg = document.createElement('canvas');
        bg.id = 'dean-bg';
        bg.style.position = 'absolute';
        bg.style.left = '0';
        bg.style.top = '0';
        bg.style.width = '100%';
        bg.style.height = '100%';
        bg.style.zIndex = '27001';
        bg.style.pointerEvents = 'none';
        fight.appendChild(bg);

        // Foreground UI panel
        const panel = document.createElement('div');
        panel.style.position = 'relative';
        panel.style.zIndex = '27002';
        panel.style.margin = 'auto';
        panel.style.width = 'min(920px, 96%)';
        panel.style.maxWidth = '1100px';
        panel.style.maxHeight = '88vh';            /* ensure the panel never exceeds viewport height */
        panel.style.height = 'auto';
        panel.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.85))';
        panel.style.border = '2px solid rgba(255,215,0,0.08)';
        panel.style.borderRadius = '12px';
        panel.style.display = 'flex';
        panel.style.flexDirection = 'row';
        panel.style.overflow = 'auto';              /* allow internal scrolling if needed on small screens */
        panel.style.boxSizing = 'border-box';
        fight.appendChild(panel);

        // Left column: player box
        const left = document.createElement('div');
        left.style.width = '38%';
        left.style.padding = '1rem';
        left.style.boxSizing = 'border-box';
        left.style.display = 'flex';
        left.style.flexDirection = 'column';
        left.style.gap = '0.6rem';
        left.style.alignItems = 'center';
        left.style.justifyContent = 'flex-start';
        panel.appendChild(left);

        const playerLabel = document.createElement('div');
        playerLabel.textContent = 'PLAYER';
        playerLabel.style.color = '#FFD700';
        playerLabel.style.fontFamily = 'Orbitron, monospace';
        playerLabel.style.fontWeight = '900';
        playerLabel.style.letterSpacing = '0.06em';
        playerLabel.style.fontSize = '1rem';
        left.appendChild(playerLabel);

        const playerPortrait = document.createElement('img');
        playerPortrait.src = 'player.png';
        playerPortrait.alt = 'Player';
        playerPortrait.style.width = '84px';
        playerPortrait.style.height = '84px';
        playerPortrait.style.objectFit = 'cover';
        playerPortrait.style.border = '2px solid #FFD700';
        playerPortrait.style.borderRadius = '10px';
        left.appendChild(playerPortrait);

        const pHpOuter = document.createElement('div');
        pHpOuter.style.width = '100%';
        pHpOuter.style.marginTop = '0.6rem';
        pHpOuter.style.boxSizing = 'border-box';
        const pLabel = document.createElement('div');
        pLabel.textContent = 'HP';
        pLabel.style.color = '#FFA500';
        pLabel.style.fontWeight = '700';
        pLabel.style.fontFamily = 'Orbitron, monospace';
        pLabel.style.fontSize = '0.85rem';
        pHpOuter.appendChild(pLabel);
        const pBar = document.createElement('div');
        pBar.style.width = '100%';
        pBar.style.height = '18px';
        pBar.style.background = 'rgba(255,255,255,0.04)';
        pBar.style.border = '1.5px solid rgba(255,215,0,0.08)';
        pBar.style.borderRadius = '8px';
        pBar.style.overflow = 'hidden';
        const pFill = document.createElement('div');
        pFill.id = 'dean-player-fill';
        pFill.style.height = '100%';
        pFill.style.width = '100%';
        pFill.style.background = 'linear-gradient(90deg,#FFD700,#FF8C00)';
        pFill.style.transition = 'width 360ms ease';
        pBar.appendChild(pFill);
        pHpOuter.appendChild(pBar);
        const pText = document.createElement('div');
        pText.id = 'dean-player-text';
        pText.textContent = '100 / 100';
        pText.style.color = '#FFD700';
        pText.style.fontWeight = '700';
        pText.style.marginTop = '0.4rem';
        pHpOuter.appendChild(pText);
        left.appendChild(pHpOuter);

        // Player action buttons
        const actionsWrap = document.createElement('div');
        actionsWrap.style.width = '100%';
        actionsWrap.style.marginTop = 'auto';
        actionsWrap.style.display = 'grid';
        actionsWrap.style.gridTemplateColumns = '1fr 1fr';
        actionsWrap.style.gap = '0.5rem';
        left.appendChild(actionsWrap);

        const atkBtn = document.createElement('button');
        atkBtn.textContent = 'ATTACK';
        atkBtn.className = 'game-button';
        atkBtn.style.width = '100%';
        atkBtn.style.padding = '0.6rem';
        actionsWrap.appendChild(atkBtn);

        const healBtn = document.createElement('button');
        healBtn.textContent = 'HEAL';
        healBtn.className = 'game-button';
        healBtn.style.width = '100%';
        healBtn.style.padding = '0.6rem';
        actionsWrap.appendChild(healBtn);

        // Middle column: center info / log
        const middle = document.createElement('div');
        middle.style.width = '24%';
        middle.style.display = 'flex';
        middle.style.flexDirection = 'column';
        middle.style.alignItems = 'center';
        middle.style.justifyContent = 'flex-start';
        middle.style.padding = '1rem';
        middle.style.boxSizing = 'border-box';
        panel.appendChild(middle);

        const vsLabel = document.createElement('div');
        vsLabel.textContent = 'VS';
        vsLabel.style.color = '#FFD700';
        vsLabel.style.fontFamily = 'Orbitron, monospace';
        vsLabel.style.fontWeight = '900';
        vsLabel.style.fontSize = '1.25rem';
        vsLabel.style.marginTop = '0.6rem';
        middle.appendChild(vsLabel);

        const log = document.createElement('div');
        log.id = 'dean-log';
        log.style.marginTop = '1rem';
        log.style.color = '#FFD700';
        log.style.fontFamily = 'Orbitron, monospace';
        log.style.fontSize = '0.92rem';
        log.style.textAlign = 'center';
        log.style.minHeight = '120px';
        log.style.display = 'flex';
        log.style.alignItems = 'center';
        log.style.justifyContent = 'center';
        log.textContent = 'The Dean watches...';
        middle.appendChild(log);

        // Right column: Dean box (big)
        const right = document.createElement('div');
        right.style.flex = '1';
        right.style.padding = '1rem';
        right.style.boxSizing = 'border-box';
        right.style.display = 'flex';
        right.style.flexDirection = 'column';
        right.style.gap = '0.6rem';
        right.style.alignItems = 'center';
        right.style.justifyContent = 'flex-start';
        panel.appendChild(right);

        const deanLabel = document.createElement('div');
        deanLabel.textContent = 'DEAN';
        deanLabel.style.color = '#FFD700';
        deanLabel.style.fontFamily = 'Orbitron, monospace';
        deanLabel.style.fontWeight = '900';
        deanLabel.style.letterSpacing = '0.06em';
        deanLabel.style.fontSize = '1.05rem';
        right.appendChild(deanLabel);

        const deanPortrait = document.createElement('img');
        // Prefer a dean-specific sprite if available; fall back to the Sunlight sprite if it fails to load.
        deanPortrait.alt = 'Dean';
        deanPortrait.id = 'dean-portrait';
        // Match player's portrait size exactly (84x84)
        deanPortrait.style.width = '84px';
        deanPortrait.style.height = '84px';
        deanPortrait.style.objectFit = 'cover';
        deanPortrait.style.border = '2px solid #FFD700';
        deanPortrait.style.borderRadius = '10px';
        // Primary and wounded sources
        deanPortrait.dataset.normalSrc = 'dean.png';
        deanPortrait.dataset.woundedSrc = 'dean_wounded.png';
        // Try dean.png first; if it doesn't exist, keep dean.png as a safe fallback.
        deanPortrait.src = deanPortrait.dataset.normalSrc;
        deanPortrait.onerror = () => {
            // Prevent recursive onerror loops
            deanPortrait.onerror = null;
            // Prefer the wounded variant as the first fallback, then the normal as a final fallback.
            const wounded = deanPortrait.dataset.woundedSrc || deanPortrait.dataset.normalSrc;
            deanPortrait.src = wounded;
            // If the wounded asset also fails to load, ensure we finally fall back to the normal sprite.
            setTimeout(() => {
                try {
                    // If the image hasn't successfully loaded, force the normal src as last resort.
                    if (!deanPortrait.complete || deanPortrait.naturalWidth === 0) {
                        deanPortrait.src = deanPortrait.dataset.normalSrc;
                    }
                } catch (e) {
                    // silent fallback
                    deanPortrait.src = deanPortrait.dataset.normalSrc;
                }
            }, 300);
        };
        right.appendChild(deanPortrait);

        const dHpOuter = document.createElement('div');
        dHpOuter.style.width = '100%';
        dHpOuter.style.marginTop = '0.6rem';
        const dLabel = document.createElement('div');
        dLabel.textContent = 'HP';
        dLabel.style.color = '#FFA500';
        dLabel.style.fontWeight = '700';
        dLabel.style.fontFamily = 'Orbitron, monospace';
        dLabel.style.fontSize = '0.85rem';
        dHpOuter.appendChild(dLabel);
        const dBar = document.createElement('div');
        dBar.style.width = '100%';
        dBar.style.height = '18px';
        dBar.style.background = 'rgba(255,255,255,0.04)';
        dBar.style.border = '1.5px solid rgba(255,215,0,0.08)';
        dBar.style.borderRadius = '8px';
        dBar.style.overflow = 'hidden';
        const dFill = document.createElement('div');
        dFill.id = 'dean-dean-fill';
        dFill.style.height = '100%';
        dFill.style.width = '100%';
        dFill.style.background = 'linear-gradient(90deg,#FF6B6B,#FFCC00)';
        dFill.style.transition = 'width 360ms ease';
        dBar.appendChild(dFill);
        dHpOuter.appendChild(dBar);
        const dText = document.createElement('div');
        dText.id = 'dean-dean-text';
        dText.textContent = '1000 / 1000';
        dText.style.color = '#FFD700';
        dText.style.fontWeight = '700';
        dText.style.marginTop = '0.4rem';
        dHpOuter.appendChild(dText);
        right.appendChild(dHpOuter);



        // Start Dean fight background music (simplified final-fight style)
        try {
            if (window.__deanBGM && typeof window.__deanBGM.pause === 'function') {
                try { window.__deanBGM.pause(); } catch (e) { /* ignore */ }
            }
            const deanBgm = new Audio("You Can't Hold Onto Me Forever.mp3");
            deanBgm.loop = true;
            deanBgm.volume = 0.35;
            deanBgm.play().catch(() => { /* autoplay may be blocked; will play on user interaction */ });
            window.__deanBGM = deanBgm;
        } catch (e) {
            console.error('Failed to start Dean BGM', e);
        }

        // Append fight overlay to document
        document.body.appendChild(fight);

        // Setup animated background (simple particle bands)
        const canvas = bg;
        const ctx = canvas.getContext('2d');
        function resizeCanvas() {
            const w = Math.floor(window.innerWidth * devicePixelRatio);
            const h = Math.floor(window.innerHeight * devicePixelRatio);
            canvas.width = w;
            canvas.height = h;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Build particle layers
        const layers = [];
        for (let L = 0; L < 5; L++) {
            const count = 40 + L * 20;
            const particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: 0.5 + Math.random() * (1.5 + L * 0.4),
                    speed: 0.2 + L * 0.1 + Math.random() * 0.5,
                    hue: 40 + L * 8 + Math.random() * 20,
                    alpha: 0.08 + Math.random() * 0.18
                });
            }
            layers.push(particles);
        }

        let bgT = 0;
        function renderBg() {
            bgT += 0.008;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // subtle radial vignette
            const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            g.addColorStop(0, 'rgba(6,6,6,0.75)');
            g.addColorStop(1, 'rgba(0,0,0,0.95)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let li = 0; li < layers.length; li++) {
                const pts = layers[li];
                for (let p of pts) {
                    p.x += Math.cos(bgT * (0.6 + li * 0.1) + p.size) * p.speed;
                    p.y += Math.sin(bgT * (0.4 + li * 0.07) + p.size * 0.3) * (p.speed * 0.4);
                    // wrap
                    if (p.x < -20) p.x = canvas.width + 20;
                    if (p.x > canvas.width + 20) p.x = -20;
                    if (p.y < -20) p.y = canvas.height + 20;
                    if (p.y > canvas.height + 20) p.y = -20;

                    ctx.beginPath();
                    ctx.fillStyle = `hsla(${p.hue},60%,60%,${p.alpha})`;
                    ctx.arc(p.x, p.y, p.size * devicePixelRatio, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // animated sweeping band
            const bandY = (Math.sin(bgT * 0.6) * 0.45 + 0.5) * canvas.height;
            const bandH = Math.max(80 * devicePixelRatio, canvas.height * 0.08);
            const bandGrad = ctx.createLinearGradient(0, bandY - bandH, 0, bandY + bandH);
            bandGrad.addColorStop(0, 'rgba(255,215,0,0)');
            bandGrad.addColorStop(0.3, 'rgba(255,215,0,0.03)');
            bandGrad.addColorStop(0.5, 'rgba(255,215,0,0.06)');
            bandGrad.addColorStop(0.7, 'rgba(255,215,0,0.03)');
            bandGrad.addColorStop(1, 'rgba(255,215,0,0)');
            ctx.fillStyle = bandGrad;
            ctx.fillRect(0, bandY - bandH, canvas.width, bandH * 2);

            requestAnimationFrame(renderBg);
        }
        renderBg();

        // Battle state
        const state = {
            playerHP: 120,
            playerMax: 120,
            deanHP: 1000,
            deanMax: 1000,
            playerTurn: true,
            disabled: false
        };

        function updateUI() {
            const pPct = Math.max(0, Math.min(100, (state.playerHP / state.playerMax) * 100));
            const dPct = Math.max(0, Math.min(100, (state.deanHP / state.deanMax) * 100));
            pFill.style.width = pPct + '%';
            pText.textContent = `${state.playerHP} / ${state.playerMax}`;
            dFill.style.width = dPct + '%';
            dText.textContent = `${state.deanHP} / ${state.deanMax}`;

            // Swap Dean's portrait to wounded variant when below half HP (fallback to normal if wounded asset missing)
            try {
                const dp = document.getElementById('dean-portrait') || deanPortrait;
                if (dp) {
                    const normal = dp.dataset.normalSrc || 'dean.png';
                    const wounded = dp.dataset.woundedSrc || 'dean_wounded.png';
                    if (state.deanHP < (state.deanMax / 2)) {
                        if (dp.src && !dp.src.endsWith(wounded)) dp.src = wounded;
                    } else {
                        if (dp.src && !dp.src.endsWith(normal)) dp.src = normal;
                    }
                }
            } catch (e) {
                // ignore portrait swap errors
            }
        }

        function appendLog(msg) {
            log.textContent = msg;
        }

        // Enemy AI: Dean replies after a short delay
        async function deanAct() {
            if (state.deanHP <= 0 || state.playerHP <= 0) return;

            // One-time midfight Dean taunt when below 50% HP (played just before Dean's turn)
            if (!state.__deanHalfDialogueShown && state.deanHP < (state.deanMax / 2)) {
                state.__deanHalfDialogueShown = true;

                // Build a Dean-branded modal with portrait + typed dialogue (safer visual cue this is Dean speaking)
                const halfModal = document.createElement('div');
                halfModal.id = 'dean-half-dialogue';
                halfModal.style.position = 'fixed';
                halfModal.style.left = '0';
                halfModal.style.top = '0';
                halfModal.style.width = '100%';
                halfModal.style.height = '100dvh';
                halfModal.style.zIndex = '29000';
                halfModal.style.display = 'flex';
                halfModal.style.alignItems = 'center';
                halfModal.style.justifyContent = 'center';
                halfModal.style.background = 'rgba(0,0,0,0.85)';
                halfModal.style.pointerEvents = 'auto';
                halfModal.style.fontFamily = 'Orbitron, monospace';
                halfModal.style.padding = '1rem';
                halfModal.style.boxSizing = 'border-box';

                // container box (darker panel to contrast with Sunlight's yellow/black style)
                const container = document.createElement('div');
                container.style.display = 'flex';
                container.style.flexDirection = 'row';
                container.style.alignItems = 'center';
                container.style.gap = '0.8rem';
                container.style.background = 'linear-gradient(180deg, rgba(12,12,12,0.98), rgba(6,6,6,0.98))';
                container.style.border = '2px solid rgba(255,120,60,0.06)';
                container.style.borderRadius = '12px';
                container.style.padding = '0.8rem';
                container.style.maxWidth = '760px';
                container.style.width = 'min(96%,760px)';
                container.style.boxSizing = 'border-box';
                halfModal.appendChild(container);

                // portrait column
                const portraitWrap = document.createElement('div');
                portraitWrap.style.flex = '0 0 84px';
                portraitWrap.style.display = 'flex';
                portraitWrap.style.flexDirection = 'column';
                portraitWrap.style.alignItems = 'center';
                portraitWrap.style.gap = '0.4rem';
                container.appendChild(portraitWrap);

                const portrait = document.createElement('img');
                portrait.src = 'dean_wounded.png';
                portrait.alt = 'Dean';
                portrait.style.width = '84px';
                portrait.style.height = '84px';
                portrait.style.objectFit = 'cover';
                portrait.style.borderRadius = '10px';
                portrait.style.border = '2px solid rgba(255,120,60,0.12)';
                portraitWrap.appendChild(portrait);

                const who = document.createElement('div');
                who.textContent = 'DEAN';
                who.style.color = '#FF8C42';
                who.style.fontWeight = '900';
                who.style.fontSize = '0.78rem';
                who.style.letterSpacing = '0.06em';
                portraitWrap.appendChild(who);

                // text column
                const textCol = document.createElement('div');
                textCol.style.flex = '1';
                textCol.style.display = 'flex';
                textCol.style.flexDirection = 'column';
                textCol.style.gap = '0.25rem';
                textCol.style.boxSizing = 'border-box';
                container.appendChild(textCol);

                const lineEl = document.createElement('div');
                lineEl.style.color = '#E8E8E8'; // pale text to avoid Sunlight's yellow styling association
                lineEl.style.fontWeight = '700';
                lineEl.style.fontSize = '1rem';
                lineEl.style.minHeight = '2.2rem';
                lineEl.style.whiteSpace = 'pre-wrap';
                lineEl.style.letterSpacing = '0.02em';
                lineEl.style.lineHeight = '1.2';
                textCol.appendChild(lineEl);

                // small caption or context hint (optional subtle tone)
                const hint = document.createElement('div');
                hint.textContent = 'i hope you like algebra';
                hint.style.color = '#B57A4A';
                hint.style.fontSize = '0.78rem';
                hint.style.fontWeight = '700';
                hint.style.opacity = '0.95';
                textCol.appendChild(hint);

                document.body.appendChild(halfModal);

                // typing helper (local to this modal)
                function typeTextLocal(el, text, delay = 36) {
                    return new Promise(resolve => {
                        el.textContent = '';
                        el.style.opacity = '1';
                        let i = 0;
                        const iv = setInterval(() => {
                            el.textContent += text.charAt(i);
                            i++;
                            if (i >= text.length) {
                                clearInterval(iv);
                                resolve();
                            }
                        }, delay);
                    });
                }

                // show both lines in sequence, with brief pauses, then remove modal
                try {
                    await typeTextLocal(lineEl, "Wow, you're good at this...", 36);
                    await new Promise(r => setTimeout(r, 700));
                    // clear then show next
                    lineEl.style.opacity = '0';
                    await new Promise(r => setTimeout(r, 140));
                    lineEl.style.opacity = '1';
                    await typeTextLocal(lineEl, "I'll have to step it up a bit!", 36);
                    await new Promise(r => setTimeout(r, 700));
                } catch (e) {
                    // fallback to battle log if something goes wrong
                    appendLog("Wow, you're good at this...");
                    await new Promise(r => setTimeout(r, 700));
                    appendLog("I'll have to step it up a bit!");
                    await new Promise(r => setTimeout(r, 500));
                } finally {
                    try { if (halfModal.parentNode) halfModal.parentNode.removeChild(halfModal); } catch (e) {}
                }
            }

            // Randomly choose between trivia minigame, a timed "connect wires" minigame, or a new blocks-order minigame
            {
                const choiceRoll = Math.random(); // 0..1
                // split chances: wires ~25%, who-is ~25%, blocks ~25%, trivia ~25%
                const useWires = choiceRoll < 0.25;
                const useWhoIs = choiceRoll >= 0.25 && choiceRoll < 0.5;
                const useBlocks = choiceRoll >= 0.5 && choiceRoll < 0.75;
                // otherwise trivia

                // --- Wire Connect Minigame (timed matching pairs) ---
                async function startWireMinigame() {
                    // build modal container
                    const modal = document.createElement('div');
                    modal.id = 'dean-wires';
                    modal.style.position = 'fixed';
                    modal.style.left = '0';
                    modal.style.top = '0';
                    modal.style.width = '100%';
                    modal.style.maxHeight = '100dvh';
                    modal.style.zIndex = '28000';
                    modal.style.display = 'flex';
                    modal.style.alignItems = 'center';
                    modal.style.justifyContent = 'center';
                    modal.style.background = 'rgba(0,0,0,0.9)';
                    modal.style.pointerEvents = 'auto';
                    modal.style.color = '#FFD700';
                    modal.style.fontFamily = 'Orbitron, monospace';
                    modal.style.flexDirection = 'column';
                    modal.style.gap = '0.8rem';
                    modal.style.padding = '1rem';
                    modal.style.boxSizing = 'border-box';
                    modal.style.overflowY = 'auto'; /* allow internal scrolling on small screens */

                    const box = document.createElement('div');
                    box.style.background = 'rgba(10,10,10,0.98)';
                    box.style.border = '2px solid #FFD700';
                    box.style.borderRadius = '12px';
                    box.style.padding = '1rem';
                    box.style.maxWidth = '820px';
                    box.style.width = 'min(96%,820px)';
                    box.style.textAlign = 'center';
                    box.style.boxSizing = 'border-box';
                    modal.appendChild(box);

                    const title = document.createElement('div');
                    title.textContent = "DEAN'S WIRE TASK";
                    title.style.fontWeight = '900';
                    title.style.marginBottom = '0.6rem';
                    box.appendChild(title);

                    const desc = document.createElement('div');
                    desc.textContent = 'Connect matching wires left→right before time runs out.';
                    desc.style.color = '#FFA500';
                    desc.style.marginBottom = '0.6rem';
                    box.appendChild(desc);

                    // Setup wire columns
                    const cols = document.createElement('div');
                    cols.style.display = 'flex';
                    cols.style.gap = '1rem';
                    cols.style.justifyContent = 'center';
                    cols.style.alignItems = 'flex-start';
                    cols.style.marginTop = '0.6rem';
                    box.appendChild(cols);

                    const leftCol = document.createElement('div');
                    const rightCol = document.createElement('div');
                    [leftCol, rightCol].forEach(c => {
                        c.style.display = 'flex';
                        c.style.flexDirection = 'column';
                        c.style.gap = '0.6rem';
                        c.style.minWidth = '160px';
                        c.style.alignItems = 'center';
                    });
                    cols.appendChild(leftCol);
                    cols.appendChild(rightCol);

                    // choose 4 colors from a palette
                    const palette = ['#FF6B6B','#FFD166','#6BCB77','#4D96FF','#C674FF','#FF9EC4'];
                    // shuffle and pick 4
                    const shuffled = palette.slice().sort(()=>Math.random()-0.5).slice(0,4);
                    // left order: shuffled, right order: shuffled but shuffled again (we will map by color)
                    const leftOrder = shuffled.slice();
                    const rightOrder = shuffled.slice().sort(()=>Math.random()-0.5);

                    // display left buttons (select source) and right targets
                    const leftButtons = [];
                    const rightButtons = [];
                    leftOrder.forEach((col, i) => {
                        const b = document.createElement('button');
                        b.style.width = '120px';
                        b.style.padding = '0.5rem';
                        b.style.borderRadius = '8px';
                        b.style.border = '2px solid rgba(255,255,255,0.06)';
                        b.style.background = col;
                        b.style.cursor = 'pointer';
                        b.textContent = `Wire ${i+1}`;
                        b.style.fontWeight = '800';
                        b.style.color = '#000';
                        b.dataset.color = col;
                        leftCol.appendChild(b);
                        leftButtons.push(b);
                    });
                    rightOrder.forEach((col, i) => {
                        const t = document.createElement('button');
                        t.style.width = '120px';
                        t.style.padding = '0.5rem';
                        t.style.borderRadius = '8px';
                        t.style.border = '2px dashed rgba(255,255,255,0.06)';
                        // If Dean is wounded (below half HP) use a dull/desaturated version of the target color, otherwise use the color
                        try {
                            const deanHalf = (typeof state !== 'undefined' && state.deanHP !== undefined && state.deanMax !== undefined)
                                ? (state.deanHP < (state.deanMax / 2))
                                : false;
                            if (deanHalf) {
                                // produce a muted/dull color by blending the original color with mid-gray (#8c8c8c)
                                // supports hex like #RRGGBB; fallback to plain gray if parsing fails
                                function hexToRgb(h) {
                                    const hex = String(h || '').replace('#','').trim();
                                    if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
                                    return {
                                        r: parseInt(hex.slice(0,2),16),
                                        g: parseInt(hex.slice(2,4),16),
                                        b: parseInt(hex.slice(4,6),16)
                                    };
                                }
                                function rgbToHex(r,g,b) {
                                    return '#' + [r,g,b].map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
                                }
                                const base = hexToRgb(col);
                                if (base) {
                                    const gray = { r: 140, g: 140, b: 140 }; // #8c8c8c
                                    // blend 60% base color + 40% gray for a dulled look
                                    const blend = {
                                        r: base.r * 0.6 + gray.r * 0.4,
                                        g: base.g * 0.6 + gray.g * 0.4,
                                        b: base.b * 0.6 + gray.b * 0.4
                                    };
                                    t.style.background = rgbToHex(blend.r, blend.g, blend.b);
                                } else {
                                    // fallback: slightly dim gray
                                    t.style.background = '#9a9a9a';
                                }
                            } else {
                                t.style.background = col;
                            }
                        } catch (e) {
                            t.style.background = col;
                        }
                        t.style.cursor = 'pointer';
                        t.textContent = `Target ${i+1}`;
                        t.style.fontWeight = '800';
                        // ensure target buttons always use black text for readability
                        t.style.color = '#000';
                        t.dataset.color = col; // this is the color that should match (logical color stored, visual may be gray)
                        rightCol.appendChild(t);
                        rightButtons.push(t);
                    });

                    // status and timer
                    const status = document.createElement('div');
                    status.style.marginTop = '0.6rem';
                    status.style.color = '#FFD700';
                    status.textContent = 'Match all wires!';
                    box.appendChild(status);

                    const timerEl = document.createElement('div');
                    timerEl.style.marginTop = '0.4rem';
                    timerEl.style.color = '#FFA500';
                    timerEl.textContent = 'Time: 8s';
                    box.appendChild(timerEl);

                    document.body.appendChild(modal);

                    // game state
                    let selectedColor = null;
                    let remainingPairs = leftButtons.length;
                    // map targets by index; when matched, disable
                    const matchedTargets = new Set();

                    function clearModalSuccess(success, dmgIfFail = 25) {
                        try { if (modal.parentNode) modal.parentNode.removeChild(modal); } catch (e) {}
                        if (!success) {
                            state.playerHP = Math.max(0, state.playerHP - dmgIfFail);
                            appendLog(`Wire task failed! You lose ${dmgIfFail} HP.`);
                            updateUI();
                            if (state.playerHP <= 0) {
                                appendLog('You were crushed by the Dean.');
                                endFight(false);
                                return;
                            }
                        } else {
                            appendLog('Wires connected! You avoid Dean\'s strike.');
                        }
                        state.playerTurn = true;
                        state.disabled = false;
                        atkBtn.disabled = false;
                        healBtn.disabled = false;
                    }

                    // Wire interaction: click left selects a source color; clicking a right target attempts to match
                    leftButtons.forEach(lb => {
                        lb.addEventListener('click', () => {
                            if (state.disabled === false && state.playerTurn === false) {
                                // disallow when not in Dean minigame; but we control state elsewhere
                            }
                            selectedColor = lb.dataset.color;
                            // indicate selection visually
                            leftButtons.forEach(x => x.style.outline = 'none');
                            lb.style.outline = '3px solid rgba(255,255,255,0.12)';
                            status.textContent = 'Now click the matching target.';
                        });
                    });
                    rightButtons.forEach((rb, ri) => {
                        rb.addEventListener('click', () => {
                            if (!selectedColor) {
                                status.textContent = 'Select a source wire first.';
                                return;
                            }
                            // if this target already matched, ignore
                            if (matchedTargets.has(ri)) return;

                            const targetColor = rb.dataset.color;
                            if (targetColor === selectedColor) {
                                // success for this pair
                                matchedTargets.add(ri);
                                // disable matching left button visually (find left button with that color)
                                const leftBtn = leftButtons.find(x => x.dataset.color === selectedColor && !x.disabled);
                                if (leftBtn) {
                                    leftBtn.disabled = true;
                                    leftBtn.style.opacity = '0.35';
                                    leftBtn.style.filter = 'grayscale(100%) brightness(0.65)';
                                }
                                rb.disabled = true;
                                // make the target visually dim to match the left wire's disabled appearance
                                rb.style.background = selectedColor;
                                rb.style.color = '#000';
                                rb.style.opacity = '0.35';
                                rb.style.filter = 'grayscale(100%) brightness(0.65)';
                                rb.style.border = '1.5px solid rgba(255,215,0,0.06)';
                                remainingPairs--;
                                status.textContent = `Matched! ${remainingPairs} left.`;
                                selectedColor = null;
                                leftButtons.forEach(x => x.style.outline = 'none');

                                if (remainingPairs <= 0) {
                                    // success: remove modal and hand control back
                                    clearTimeout(wireTimerId);
                                    clearModalSuccess(true);
                                }
                            } else {
                                // mismatch penalty: immediate small damage and continue
                                const dmg = 8;
                                state.playerHP = Math.max(0, state.playerHP - dmg);
                                status.textContent = `Wrong connection! -${dmg} HP.`;
                                updateUI();
                                if (state.playerHP <= 0) {
                                    clearTimeout(wireTimerId);
                                    clearModalSuccess(false);
                                    return;
                                }
                            }
                        });
                    });

                    // Timer behavior (8 seconds total)
                    let timeLeft = 8;
                    timerEl.textContent = `Time: ${timeLeft}s`;
                    const wireTimerId = setInterval(() => {
                        timeLeft--;
                        timerEl.textContent = `Time: ${timeLeft}s`;
                        if (timeLeft <= 0) {
                            clearInterval(wireTimerId);
                            // if not all matched, apply penalty and end
                            if (remainingPairs > 0) {
                                clearModalSuccess(false, 25);
                            }
                        }
                    }, 1000);

                    // ensure minigame can be canceled/cleanup if fight ends externally
                    // (no explicit handler needed here, but keep references)
                }

                // --- New: Ordered Blocks Minigame (click items in sequence; numeric or alphabetical when Dean is wounded) ---
                function startBlocksMinigame() {
                    const modal = document.createElement('div');
                    modal.id = 'dean-blocks';
                    modal.style.position = 'fixed';
                    modal.style.left = '0';
                    modal.style.top = '0';
                    modal.style.width = '100%';
                    modal.style.maxHeight = '100dvh';
                    modal.style.zIndex = '28000';
                    modal.style.display = 'flex';
                    modal.style.alignItems = 'center';
                    modal.style.justifyContent = 'center';
                    modal.style.background = 'rgba(0,0,0,0.92)';
                    modal.style.pointerEvents = 'auto';
                    modal.style.color = '#FFD700';
                    modal.style.fontFamily = 'Orbitron, monospace';
                    modal.style.flexDirection = 'column';
                    modal.style.gap = '0.6rem';
                    modal.style.padding = '1rem';
                    modal.style.boxSizing = 'border-box';
                    modal.style.overflowY = 'auto'; /* fit on small viewports */

                    const panel = document.createElement('div');
                    panel.style.background = 'rgba(10,10,10,0.98)';
                    panel.style.border = '2px solid #FFD700';
                    panel.style.borderRadius = '12px';
                    panel.style.padding = '0.8rem';
                    panel.style.maxWidth = '820px';
                    panel.style.width = 'min(96%,820px)';
                    panel.style.textAlign = 'center';
                    panel.style.boxSizing = 'border-box';
                    modal.appendChild(panel);

                    const title = document.createElement('div');
                    title.style.fontWeight = '900';
                    title.style.marginBottom = '0.6rem';
                    panel.appendChild(title);

                    const desc = document.createElement('div');
                    desc.style.color = '#FFA500';
                    desc.style.marginBottom = '0.6rem';
                    panel.appendChild(desc);

                    const grid = document.createElement('div');
                    grid.style.display = 'grid';
                    grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
                    grid.style.gridTemplateRows = 'repeat(2, 1fr)';
                    grid.style.gap = '0.5rem';
                    grid.style.marginTop = '0.6rem';
                    panel.appendChild(grid);

                    // Determine whether Dean is wounded (<50% HP)
                    const deanWounded = (typeof state !== 'undefined' && state.deanHP !== undefined && state.deanMax !== undefined)
                        ? (state.deanHP < (state.deanMax / 2))
                        : false;

                    // Game variables
                    let nextExpected = 1;
                    let finished = false;
                    let timerId = null;
                    let timeLimit = deanWounded ? 18 : 12; // more time for images but higher difficulty by order requirement
                    let tiles = [];

                    if (!deanWounded) {
                        // Classic numbered tiles (1..10 shuffled)
                        title.textContent = "DEAN'S ORDERED BLOCKS";
                        desc.textContent = 'Click the tiles in order from 1 → 10. Finish before time runs out.';
                        const numbers = Array.from({length:10}, (_,i) => i+1);
                        const shuffled = numbers.slice().sort(()=>Math.random()-0.5);
                        shuffled.forEach(n => {
                            const btn = document.createElement('button');
                            btn.style.padding = '0.6rem';
                            btn.style.borderRadius = '8px';
                            btn.style.border = '2px solid rgba(255,215,0,0.12)';
                            btn.style.background = 'rgba(255,215,0,0.06)';
                            btn.style.cursor = 'pointer';
                            btn.style.fontWeight = '900';
                            btn.style.color = '#FFD700';
                            btn.style.fontSize = '1rem';
                            btn.textContent = String(n);
                            btn.dataset.value = String(n);
                            grid.appendChild(btn);
                            tiles.push(btn);
                        });
                    } else {
                        // Wounded Dean: pick 10 random characters (images + names) and require alphabetical ordering
                        title.textContent = "DEAN'S CHALLENGE — ALPHABETIZE";
                        desc.textContent = 'Click the portraits in alphabetical order by name. This is harder.';

                        // Gather available character entries
                        const allDefs = { ...(window.characters || {}), ...(window.additionalCharacters || {}) };
                        const keys = Object.keys(allDefs).filter(k => !!allDefs[k]);

                        // If fewer than 10 characters available, fall back to numbers
                        let chosenEntries = [];
                        if (keys.length < 10) {
                            // fallback: generate numbered tiles as above
                            const numbers = Array.from({length:10}, (_,i) => i+1);
                            const shuffled = numbers.slice().sort(()=>Math.random()-0.5);
                            shuffled.forEach(n => {
                                const btn = document.createElement('button');
                                btn.style.padding = '0.6rem';
                                btn.style.borderRadius = '8px';
                                btn.style.border = '2px solid rgba(255,215,0,0.12)';
                                btn.style.background = 'rgba(255,215,0,0.06)';
                                btn.style.cursor = 'pointer';
                                btn.style.fontWeight = '900';
                                btn.style.color = '#FFD700';
                                btn.style.fontSize = '1rem';
                                btn.textContent = String(n);
                                btn.dataset.value = String(n);
                                grid.appendChild(btn);
                                tiles.push(btn);
                            });
                        } else {
                            // pick 10 unique random keys
                            const shuffledKeys = keys.slice().sort(()=>Math.random()-0.5);
                            const pickKeys = shuffledKeys.slice(0, 10);
                            // Build entries with display names and sprite src
                            const entries = pickKeys.map(k => {
                                const def = allDefs[k] || {};
                                return {
                                    key: k,
                                    name: def.name || k,
                                    sprite: def.sprite || `${k}.png`
                                };
                            });

                            // Determine correct alphabetical order by name (case-insensitive)
                            const sortedNames = entries.slice().sort((a,b) => {
                                const an = String(a.name || '').toLowerCase();
                                const bn = String(b.name || '').toLowerCase();
                                if (an < bn) return -1;
                                if (an > bn) return 1;
                                return 0;
                            }).map(e => e.name);

                            // We will assign each tile a label (the name) but shuffle positions
                            const shuffledEntries = entries.slice().sort(()=>Math.random()-0.5);

                            shuffledEntries.forEach(ent => {
                                const btn = document.createElement('button');
                                btn.style.padding = '0.35rem';
                                btn.style.borderRadius = '8px';
                                btn.style.border = '1.5px solid rgba(255,215,0,0.12)';
                                btn.style.background = 'rgba(0,0,0,0.6)';
                                btn.style.cursor = 'pointer';
                                btn.style.color = '#FFD700';
                                btn.style.display = 'flex';
                                btn.style.flexDirection = 'column';
                                btn.style.alignItems = 'center';
                                btn.style.justifyContent = 'center';
                                btn.style.gap = '6px';
                                btn.style.minHeight = '64px';
                                btn.style.padding = '0.4rem';

                                // portrait
                                const img = document.createElement('img');
                                img.src = ent.sprite;
                                img.alt = ent.name;
                                img.style.width = '56px';
                                img.style.height = '56px';
                                img.style.objectFit = 'cover';
                                img.style.borderRadius = '8px';
                                img.style.border = '2px solid rgba(255,215,0,0.06)';
                                img.onerror = () => { img.src = 'player.png'; };

                                const nameEl = document.createElement('div');
                                nameEl.textContent = ent.name;
                                nameEl.style.fontSize = '0.72rem';
                                nameEl.style.fontWeight = '900';
                                nameEl.style.color = '#FFD700';
                                nameEl.style.whiteSpace = 'nowrap';
                                nameEl.style.overflow = 'hidden';
                                nameEl.style.textOverflow = 'ellipsis';
                                nameEl.style.maxWidth = '96%';

                                btn.appendChild(img);
                                btn.appendChild(nameEl);

                                // store the name and the alphabetical index for validation
                                btn.dataset.name = ent.name;
                                btn.dataset.alphaIndex = String(sortedNames.indexOf(ent.name) + 1); // 1-based
                                grid.appendChild(btn);
                                tiles.push(btn);
                            });
                        }
                    }

                    // status and timer
                    const status = document.createElement('div');
                    status.style.marginTop = '0.6rem';
                    status.style.color = '#FFD700';
                    status.textContent = deanWounded ? ':)' : 'Next: 1';
                    panel.appendChild(status);

                    const timerEl = document.createElement('div');
                    timerEl.style.marginTop = '0.4rem';
                    timerEl.style.color = '#FFA500';
                    timerEl.textContent = `Time: ${timeLimit}s`;
                    panel.appendChild(timerEl);

                    document.body.appendChild(modal);

                    function clearModalSuccess(success) {
                        try { if (modal.parentNode) modal.parentNode.removeChild(modal); } catch (e) {}
                        if (!success) {
                            const dmg = 20;
                            state.playerHP = Math.max(0, state.playerHP - dmg);
                            appendLog(`Blocks failed! You lose ${dmg} HP.`);
                            updateUI();
                            if (state.playerHP <= 0) {
                                appendLog('You were crushed by the Dean.');
                                endFight(false);
                                return;
                            }
                        } else {
                            appendLog(deanWounded ? 'You alphabetized the portraits correctly and avoided Dean\'s strike.' : 'You ordered the blocks correctly and avoided Dean\'s strike.');
                        }
                        state.playerTurn = true;
                        state.disabled = false;
                        atkBtn.disabled = false;
                        healBtn.disabled = false;
                    }

                    // Interaction logic
                    tiles.forEach(btn => {
                        btn.addEventListener('click', () => {
                            if (finished) return;
                            if (!deanWounded) {
                                const val = Number(btn.dataset.value);
                                if (val === nextExpected) {
                                    btn.disabled = true;
                                    btn.style.opacity = '0.45';
                                    btn.style.filter = 'grayscale(60%)';
                                    nextExpected++;
                                    status.textContent = `Next: ${nextExpected <= 10 ? nextExpected : 'Done'}`;
                                    if (nextExpected > 10) {
                                        finished = true;
                                        clearInterval(timerId);
                                        clearModalSuccess(true);
                                    }
                                } else {
                                    const pen = 5;
                                    state.playerHP = Math.max(0, state.playerHP - pen);
                                    appendLog(`Wrong tile! -${pen} HP penalty.`);
                                    updateUI();
                                    if (state.playerHP <= 0) {
                                        finished = true;
                                        clearInterval(timerId);
                                        clearModalSuccess(false);
                                    }
                                }
                            } else {
                                // alphabetical mode: each button has data-alpha-index (1..10)
                                const alphaIdx = Number(btn.dataset.alphaIndex || '0');
                                if (alphaIdx === nextExpected) {
                                    btn.disabled = true;
                                    btn.style.opacity = '0.45';
                                    btn.style.filter = 'grayscale(60%)';
                                    nextExpected++;
                                    // keep the wounded-mode status minimal (a smile) rather than revealing the next order
                                    // show next as letter internally but do not expose it to the player in this mode
                                    const nextLabel = (nextExpected <= 26) ? String.fromCharCode(64 + nextExpected) : nextExpected;
                                    status.textContent = ':)';
                                    if (nextExpected > 10) {
                                        finished = true;
                                        clearInterval(timerId);
                                        clearModalSuccess(true);
                                    }
                                } else {
                                    // wrong click harsher penalty for wounded mode
                                    const pen = 8;
                                    state.playerHP = Math.max(0, state.playerHP - pen);
                                    appendLog(`Wrong portrait! -${pen} HP penalty.`);
                                    updateUI();
                                    if (state.playerHP <= 0) {
                                        finished = true;
                                        clearInterval(timerId);
                                        clearModalSuccess(false);
                                    }
                                }
                            }
                        });
                    });

                    // Timer countdown
                    let timer = timeLimit;
                    timerEl.textContent = `Time: ${timer}s`;
                    timerId = setInterval(() => {
                        timer--;
                        timerEl.textContent = `Time: ${timer}s`;
                        if (timer <= 0) {
                            clearInterval(timerId);
                            if (!finished) {
                                clearModalSuccess(false);
                                finished = true;
                            }
                        }
                    }, 1000);

                    // Ensure minigame cleans up if battle ends externally (no explicit handler required)
                }

                if (useWires) {
                    // start wire minigame and return so async flow handles turn resumption
                    startWireMinigame();
                    return;
                }

                // If the roll selected the ordered blocks minigame, start it
                if (useBlocks) {
                    startBlocksMinigame();
                    return;
                }

                // --- "Which character is [name]?" minigame ---
                function startWhoIsMinigame() {
                    // gather character entries (keys) from global tables, exclude Dean itself
                    const allDefs = { ...(window.characters || {}), ...(window.additionalCharacters || {}) };
                    const entries = Object.keys(allDefs)
                        .filter(k => {
                            const name = (allDefs[k] && allDefs[k].name) ? String(allDefs[k].name).toLowerCase() : '';
                            return name !== 'dean';
                        });

                    if (entries.length === 0) return;

                    // pick a target key at random
                    const targetKey = entries[Math.floor(Math.random() * entries.length)];
                    const targetName = (allDefs[targetKey] && allDefs[targetKey].name) ? allDefs[targetKey].name : targetKey;

                    // determine number of options: 3 normally, 5 if Dean is below half HP
                    const optionsCount = (state.deanHP < (state.deanMax / 2)) ? 5 : 3;

                    // build unique option keys including the correct one
                    const options = new Set();
                    options.add(targetKey);
                    while (options.size < optionsCount) {
                        const pick = entries[Math.floor(Math.random() * entries.length)];
                        options.add(pick);
                    }
                    const optsArr = Array.from(options).sort(() => Math.random() - 0.5);

                    // modal UI
                    const modal = document.createElement('div');
                    modal.id = 'dean-whois';
                    modal.style.position = 'fixed';
                    modal.style.left = '0';
                    modal.style.top = '0';
                    modal.style.width = '100%';
                    modal.style.maxHeight = '100dvh';
                    modal.style.zIndex = '28000';
                    modal.style.display = 'flex';
                    modal.style.alignItems = 'center';
                    modal.style.justifyContent = 'center';
                    modal.style.background = 'rgba(0,0,0,0.9)';
                    modal.style.pointerEvents = 'auto';
                    modal.style.color = '#FFD700';
                    modal.style.fontFamily = 'Orbitron, monospace';
                    modal.style.flexDirection = 'column';
                    modal.style.gap = '0.8rem';
                    modal.style.padding = '1rem';
                    modal.style.boxSizing = 'border-box';
                    modal.style.overflowY = 'auto'; /* ensure modal content can scroll */

                    const box = document.createElement('div');
                    box.style.background = 'rgba(10,10,10,0.98)';
                    box.style.border = '2px solid #FFD700';
                    box.style.borderRadius = '12px';
                    box.style.padding = '1rem';
                    box.style.maxWidth = '720px';
                    box.style.width = 'min(96%,720px)';
                    box.style.textAlign = 'center';
                    box.style.boxSizing = 'border-box';

                    const title = document.createElement('div');
                    title.textContent = `WHICH PORTRAIT IS "${targetName}"?`;
                    title.style.fontWeight = '900';
                    title.style.marginBottom = '0.6rem';
                    title.style.color = '#FFD700';
                    box.appendChild(title);

                    const instr = document.createElement('div');
                    instr.textContent = 'Tap the portrait that matches the name.';
                    instr.style.color = '#FFA500';
                    instr.style.marginBottom = '0.6rem';
                    box.appendChild(instr);

                    const optsWrap = document.createElement('div');
                    optsWrap.style.display = 'grid';
                    // make layout responsive: prefer 3 columns but allow flow
                    const cols = optionsCount <= 3 ? Math.min(3, optionsCount) : 3;
                    optsWrap.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
                    optsWrap.style.gap = '0.6rem';
                    optsWrap.style.marginTop = '0.6rem';

                    // create option buttons showing images instead of names
                    optsArr.forEach(optKey => {
                        const def = allDefs[optKey] || {};
                        const imgSrc = def.sprite || `${optKey}.png`;
                        const btn = document.createElement('button');
                        btn.className = 'game-button';
                        btn.style.padding = '0.35rem';
                        btn.style.minWidth = '88px';
                        btn.style.height = '108px';
                        btn.style.display = 'flex';
                        btn.style.alignItems = 'center';
                        btn.style.justifyContent = 'center';
                        btn.style.flexDirection = 'column';
                        btn.style.gap = '6px';
                        btn.style.background = 'rgba(255,215,0,0.04)';
                        btn.style.border = '1.5px solid #FFD700';
                        btn.style.cursor = 'pointer';
                        btn.style.color = '#FFD700';
                        btn.dataset.key = optKey;

                        const img = document.createElement('img');
                        img.src = imgSrc;
                        img.alt = def.name || optKey;
                        img.style.width = '72px';
                        img.style.height = '72px';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '8px';
                        img.style.border = '1.5px solid rgba(255,215,0,0.12)';
                        // graceful fallback if image fails
                        img.onerror = () => { img.src = 'player.png'; };

                        // optional small caption hidden visually for accessibility (screen readers)
                        const caption = document.createElement('div');
                        caption.textContent = def.name || optKey;
                        caption.style.fontSize = '0.65rem';
                        caption.style.color = '#FFD700';
                        caption.style.opacity = '0';
                        caption.style.height = '0';
                        caption.style.overflow = 'hidden';

                        btn.appendChild(img);
                        btn.appendChild(caption);

                        btn.addEventListener('click', () => {
                            try {
                                // ensure the pending timer is cancelled so the timeout cannot still fire after a choice
                                if (typeof timerId !== 'undefined' && timerId !== null) clearInterval(timerId);
                            } catch (e) { /* ignore */ }
                            try { if (modal.parentNode) modal.parentNode.removeChild(modal); } catch (e) {}
                            const pickedKey = btn.dataset.key;
                            if (pickedKey === targetKey) {
                                appendLog(`Correct! You answered Dean's question.`);
                            } else {
                                const dmg = 30;
                                state.playerHP = Math.max(0, state.playerHP - dmg);
                                appendLog(`Wrong! Dean punishes you for being mistaken (-${dmg} HP).`);
                                updateUI();
                                if (state.playerHP <= 0) {
                                    appendLog('You were crushed by the Dean.');
                                    endFight(false);
                                    return;
                                }
                            }
                            // hand control back to player
                            state.playerTurn = true;
                            state.disabled = false;
                            atkBtn.disabled = false;
                            healBtn.disabled = false;
                        });

                        optsWrap.appendChild(btn);
                    });

                    box.appendChild(optsWrap);

                    // optional timer for added tension
                    const timerEl = document.createElement('div');
                    timerEl.textContent = 'Time left: 6s';
                    timerEl.style.marginTop = '0.6rem';
                    timerEl.style.color = '#FFD700';
                    box.appendChild(timerEl);

                    modal.appendChild(box);
                    document.body.appendChild(modal);

                    let timeLeft = 6;
                    const timerId = setInterval(() => {
                        timeLeft--;
                        timerEl.textContent = `Time left: ${timeLeft}s`;
                        if (timeLeft <= 0) {
                            clearInterval(timerId);
                            try { if (modal.parentNode) modal.parentNode.removeChild(modal); } catch (e) {}
                            const dmg = 20;
                            state.playerHP = Math.max(0, state.playerHP - dmg);
                            appendLog(`Time expired! Dean lashes out (-${dmg} HP).`);
                            updateUI();
                            if (state.playerHP <= 0) {
                                appendLog('You were crushed by the Dean.');
                                endFight(false);
                                return;
                            }
                            state.playerTurn = true;
                            state.disabled = false;
                            atkBtn.disabled = false;
                            healBtn.disabled = false;
                        }
                    }, 1000);
                }

                if (useWhoIs) {
                    // start "Which character is [name]?" minigame
                    startWhoIsMinigame();
                    return;
                }

                // --- Fallback to trivia minigame if neither wires nor who-is chosen ---
                // Trivia minigame: multiple-choice math questions (generated randomly)
                function generateMathQuestion() {
                    // If Dean is wounded (below half HP), produce algebra-style "this + x = this" (or variants)
                    const deanWounded = (typeof state !== 'undefined' && state.deanHP !== undefined && state.deanMax !== undefined)
                        ? (state.deanHP < (state.deanMax / 2))
                        : false;

                    if (deanWounded) {
                        // produce a short algebra problem where the player finds x
                        // variants: A + x = B, A - x = B, x - A = B, A * x = B (small), A ÷ x = B (small)
                        const variants = ['A + x = B', 'A - x = B', 'x - A = B', 'A * x = B', 'A ÷ x = B'];
                        const variant = variants[Math.floor(Math.random() * variants.length)];

                        let A, B, x, question, answer;
                        switch (variant) {
                            case 'A + x = B':
                                A = Math.floor(Math.random() * 40) + 1;
                                x = Math.floor(Math.random() * 40) + 0;
                                B = A + x;
                                question = `${A} + x = ${B}. Find x.`;
                                answer = String(x);
                                break;
                            case 'A - x = B':
                                A = Math.floor(Math.random() * 80) + 10;
                                x = Math.floor(Math.random() * 30) + 0;
                                B = A - x;
                                question = `${A} - x = ${B}. Find x.`;
                                answer = String(x);
                                break;
                            case 'x - A = B':
                                A = Math.floor(Math.random() * 40) + 1;
                                x = Math.floor(Math.random() * 60) + A; // ensure x >= A
                                B = x - A;
                                question = `x - ${A} = ${B}. Find x.`;
                                answer = String(x);
                                break;
                            case 'A * x = B':
                                A = Math.floor(Math.random() * 8) + 2; // small multiplier
                                // use 'y' for multiplication variant to avoid confusion with other 'x' uses
                                const y = Math.floor(Math.random() * 12) + 1;
                                B = A * y;
                                question = `${A} × y = ${B}. Find y.`;
                                answer = String(y);
                                break;
                            case 'A ÷ x = B':
                                x = Math.floor(Math.random() * 8) + 1;
                                B = Math.floor(Math.random() * 12) + 1;
                                A = x * B;
                                question = `${A} ÷ x = ${B}. Find x.`;
                                answer = String(x);
                                break;
                            default:
                                // fallback to simple addition
                                A = Math.floor(Math.random() * 20) + 1;
                                x = Math.floor(Math.random() * 20) + 1;
                                B = A + x;
                                question = `${A} + x = ${B}. Find x.`;
                                answer = String(x);
                                break;
                        }

                        // Build three distractors near the correct answer
                        const correctNum = Number(answer);
                        const distractors = new Set();
                        while (distractors.size < 3) {
                            const offset = Math.floor((Math.random() * 9) - 4); // -4..+4
                            const candidate = correctNum + offset;
                            if (candidate === correctNum || candidate < -50) continue;
                            distractors.add(String(candidate));
                        }
                        const options = [String(correctNum), ...Array.from(distractors)];
                        // shuffle
                        for (let i = options.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [options[i], options[j]] = [options[j], options[i]];
                        }
                        return { q: question, answer: String(correctNum), options };
                    }

                    // Default (non-wounded) simple arithmetic fallback (original behavior)
                    const ops = ['+', '-', '×', '÷'];
                    const op = ops[Math.floor(Math.random() * ops.length)];
                    let a, b, question, answer;
                    switch (op) {
                        case '+':
                            a = Math.floor(Math.random() * 50) + 1;
                            b = Math.floor(Math.random() * 50) + 1;
                            answer = String(a + b);
                            question = `${a} + ${b} = ?`;
                            break;
                        case '-':
                            a = Math.floor(Math.random() * 80) + 10;
                            b = Math.floor(Math.random() * 40) + 1;
                            // ensure non-negative
                            if (b > a) [a, b] = [b, a];
                            answer = String(a - b);
                            question = `${a} - ${b} = ?`;
                            break;
                        case '×':
                            a = Math.floor(Math.random() * 12) + 2;
                            b = Math.floor(Math.random() * 12) + 2;
                            answer = String(a * b);
                            question = `${a} × ${b} = ?`;
                            break;
                        case '÷':
                            b = Math.floor(Math.random() * 12) + 2;
                            const multiplier = Math.floor(Math.random() * 12) + 2;
                            a = b * multiplier; // ensure integer division
                            answer = String(multiplier);
                            question = `${a} ÷ ${b} = ?`;
                            break;
                    }

                    // create distractors by small deviations and shuffle
                    const correctNum = Number(answer);
                    const distractors = new Set();
                    while (distractors.size < 3) {
                        const offset = Math.floor((Math.random() * 9) - 4); // -4..+4
                        let candidate = correctNum + offset;
                        if (candidate === correctNum || candidate < -50) continue;
                        distractors.add(String(candidate));
                    }
                    const options = [answer, ...Array.from(distractors)];
                    for (let i = options.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [options[i], options[j]] = [options[j], options[i]];
                    }
                    return { q: question, answer: answer, options };
                }

                const pick = generateMathQuestion();

                // Build multiple-choice modal
                const modal = document.createElement('div');
                modal.id = 'dean-trivia';
                modal.style.position = 'fixed';
                modal.style.left = '0';
                modal.style.top = '0';
                modal.style.width = '100%';
                modal.style.maxHeight = '100dvh';
                modal.style.zIndex = '28000';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.background = 'rgba(0,0,0,0.85)';
                modal.style.pointerEvents = 'auto';
                modal.style.color = '#FFD700';
                modal.style.fontFamily = 'Orbitron, monospace';
                modal.style.flexDirection = 'column';
                modal.style.gap = '0.8rem';
                modal.style.padding = '1rem';
                modal.style.boxSizing = 'border-box';
                modal.style.overflowY = 'auto'; /* keep modal inside viewport with scrolling */

                const box = document.createElement('div');
                box.style.background = 'rgba(10,10,10,0.98)';
                box.style.border = '2px solid #FFD700';
                box.style.borderRadius = '12px';
                box.style.padding = '1rem';
                box.style.maxWidth = '720px';
                box.style.width = 'min(96%,720px)';
                box.style.textAlign = 'center';
                box.style.boxSizing = 'border-box';

                const prompt = document.createElement('div');
                prompt.textContent = 'DEAN\'S TRIVIA CHALLENGE';
                prompt.style.fontWeight = '900';
                prompt.style.marginBottom = '0.6rem';
                box.appendChild(prompt);

                const questionEl = document.createElement('div');
                questionEl.textContent = pick.q;
                questionEl.style.color = '#FFA500';
                questionEl.style.marginBottom = '0.8rem';
                questionEl.style.fontSize = '0.95rem';
                box.appendChild(questionEl);

                // Build options (use pick.options which contains the correct answer + distractors)
                const options = Array.isArray(pick.options) ? pick.options.slice() : [String(pick.answer)];
                // Ensure at least 3 options by adding nearby numeric distractors if necessary
                while (options.length < 3) {
                    const base = Number(pick.answer) || 0;
                    const offset = (Math.floor(Math.random() * 9) - 4) || 1; // -4..+4, avoid 0
                    const candidate = String(base + offset);
                    if (!options.includes(candidate)) options.push(candidate);
                }
                // shuffle options
                for (let i = options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [options[i], options[j]] = [options[j], options[i]];
                }

                const optsWrap = document.createElement('div');
                optsWrap.style.display = 'grid';
                optsWrap.style.gridTemplateColumns = '1fr 1fr';
                optsWrap.style.gap = '0.5rem';
                optsWrap.style.marginTop = '0.5rem';

                // Create button for each option
                options.forEach(optText => {
                    const ob = document.createElement('button');
                    ob.className = 'game-button';
                    ob.textContent = optText;
                    ob.style.padding = '0.55rem';
                    ob.style.minWidth = '110px';
                    ob.style.fontWeight = '800';
                    ob.style.background = 'rgba(255,215,0,0.06)';
                    ob.style.border = '1.5px solid #FFD700';
                    ob.style.color = '#FFD700';
                    ob.style.cursor = 'pointer';
                    ob.addEventListener('click', () => {
                        // evaluate immediately
                        clearInterval(timerId);
                        try { if (modal.parentNode) modal.parentNode.removeChild(modal); } catch (e) {}
                        const normalizedPicked = String(optText || '').trim().toLowerCase().replace(/[^a-z0-9\-]/g,'');
                        const normalizedAnswer = String(pick.answer || '').trim().toLowerCase().replace(/[^a-z0-9\-]/g,'');
                        const isCorrect = normalizedPicked === normalizedAnswer;
                        if (isCorrect) {
                            appendLog('Correct! You avoid Dean\'s strike.');
                        } else {
                            const dmg = 25;
                            state.playerHP = Math.max(0, state.playerHP - dmg);
                            appendLog(`Wrong answer! You lose ${dmg} HP.`);
                            updateUI();
                            if (state.playerHP <= 0) {
                                appendLog('You were crushed by the Dean.');
                                endFight(false);
                                return;
                            }
                        }
                        // hand control back to player
                        state.playerTurn = true;
                        state.disabled = false;
                        atkBtn.disabled = false;
                        healBtn.disabled = false;
                    });
                    optsWrap.appendChild(ob);
                });

                box.appendChild(optsWrap);

                const timerEl = document.createElement('div');
                timerEl.textContent = 'Time left: 5s';
                timerEl.style.marginTop = '0.6rem';
                timerEl.style.color = '#FFD700';
                timerEl.style.fontWeight = '800';
                box.appendChild(timerEl);

                modal.appendChild(box);
                document.body.appendChild(modal);

                let timeLeft = 5;
                timerEl.textContent = `Time left: ${timeLeft}s`;
                const timerId = setInterval(() => {
                    timeLeft--;
                    timerEl.textContent = `Time left: ${timeLeft}s`;
                    if (timeLeft <= 0) {
                        clearInterval(timerId);
                        // Timeout: player loses 10 HP
                        try { if (modal.parentNode) modal.parentNode.removeChild(modal); } catch (e) {}
                        const dmg = 10;
                        state.playerHP = Math.max(0, state.playerHP - dmg);
                        appendLog(`Time expired! You lose ${dmg} HP.`);
                        updateUI();
                        if (state.playerHP <= 0) {
                            appendLog('You were crushed by the Dean.');
                            endFight(false);
                            return;
                        }
                        // return control to player
                        state.playerTurn = true;
                        state.disabled = false;
                        atkBtn.disabled = false;
                        healBtn.disabled = false;
                    }
                }, 1000);

                // leave function so the minigame handles damage and turn flow asynchronously
                return;
            }

            // Check for player defeat
            if (state.playerHP <= 0) {
                appendLog('You were crushed by the Dean.');
                endFight(false);
                return;
            }
            // Hand back to player
            state.playerTurn = true;
            state.disabled = false;
            atkBtn.disabled = false;
            healBtn.disabled = false;
        }

        // Player actions
        atkBtn.addEventListener('click', () => {
            if (!state.playerTurn || state.disabled) return;
            state.disabled = true;
            // player attack deals 18-28 damage (buffed)
            const dmg = 18 + Math.floor(Math.random() * 11);
            state.deanHP = Math.max(0, state.deanHP - dmg);
            appendLog(`You hit Dean for ${dmg}!`);
            updateUI();

            if (state.deanHP <= 0) {
                appendLog('Dean has been defeated.');
                endFight(true);
                return;
            }
            // pass to dean after short delay
            state.playerTurn = false;
            atkBtn.disabled = true;
            healBtn.disabled = true;
            setTimeout(deanAct, 900 + Math.random() * 700);
        });

        healBtn.addEventListener('click', () => {
            try {
                // guard: only allow when it's player's turn and not disabled
                if (!state.playerTurn || state.disabled) return;

                // mark input disabled to prevent double clicks
                state.disabled = true;

                // heal for 24-36 but capped to max (buffed)
                const heal = 24 + Math.floor(Math.random() * 13);
                state.playerHP = Math.min(state.playerMax, state.playerHP + heal);

                // log and update UI immediately
                appendLog(`You restore ${heal} HP.`);
                updateUI();

                // prepare to hand control to Dean
                state.playerTurn = false;
                atkBtn.disabled = true;
                healBtn.disabled = true;

                // schedule Dean's response; wrap in try so any error re-enables controls
                setTimeout(() => {
                    try {
                        deanAct();
                    } catch (err) {
                        console.error('deanAct failed after heal:', err);
                        // safely restore player control if enemy action fails
                        state.playerTurn = true;
                        state.disabled = false;
                        atkBtn.disabled = false;
                        healBtn.disabled = false;
                    }
                }, 900 + Math.random() * 700);
            } catch (e) {
                console.error('Heal button handler error', e);
                // ensure controls are re-enabled on unexpected errors
                state.playerTurn = true;
                state.disabled = false;
                atkBtn.disabled = false;
                healBtn.disabled = false;
            }
        });



        function cleanup() {
            try {
                window.removeEventListener('resize', resizeCanvas);
            } catch (e) {}
            try { if (fight.parentNode) fight.parentNode.removeChild(fight); } catch (e) {}
            try { if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); } catch (e) {}
            // stop Dean BGM if playing
            try {
                if (window.__deanBGM && typeof window.__deanBGM.pause === 'function') {
                    window.__deanBGM.pause();
                    window.__deanBGM = null;
                }
            } catch (e) { /* ignore */ }
        }

        function endFight(playerWon, silentClose = false) {
            // stop background loop by removing canvas listeners via resize removal and letting RAF cease when element removed
            if (!silentClose) {
                if (playerWon) {
                    appendLog('You stood up to the Dean — something trembles.');
                } else {
                    appendLog('The Dean remains undefeated.');
                }
            }

            // If the player lost, present a black Sunlight monologue cutscene and persist a deanPending flag in save.
            if (!playerWon) {
                try {
                    // persist deanPending in the game's saved data so the dean sequence remains marked across reloads
                    let save = {};
                    try {
                        save = JSON.parse(localStorage.getItem('unbrokenSave') || '{}');
                    } catch (e) {
                        save = {};
                    }
                    save.deanPending = true;
                    localStorage.setItem('unbrokenSave', JSON.stringify(save));
                } catch (e) { /* ignore persistence errors */ }

                // Create a full-screen black overlay for the cutscene
                const cut = document.createElement('div');
                cut.id = 'dean-gameover-cutscene';
                cut.style.position = 'fixed';
                cut.style.inset = '0';
                cut.style.background = '#000';
                cut.style.zIndex = 30000;
                cut.style.display = 'flex';
                cut.style.alignItems = 'center';
                cut.style.justifyContent = 'center';
                cut.style.flexDirection = 'column';
                cut.style.pointerEvents = 'auto';

                const txt = document.createElement('div');
                txt.style.color = '#FFD700';
                txt.style.fontFamily = 'Orbitron, monospace';
                txt.style.fontWeight = '900';
                txt.style.fontSize = 'clamp(1rem, 4vw, 2rem)';
                txt.style.textAlign = 'center';
                txt.style.whiteSpace = 'pre-wrap';
                txt.style.maxWidth = '92%';
                txt.style.padding = '1rem';
                cut.appendChild(txt);

                document.body.appendChild(cut);

                // Choose one of five monologues
                const monologues = [
                    "You fell where so many before you have faltered.\nThis need not be final — press RETRY when you're ready to try again.",
                    "A quiet end, perhaps, but endings here can be retried; reload and take another turn.",
                    "They called it fate; I call it curation. Still, you are free to attempt it again — hit RETRY to return.",
                    "Resistance leaves marks, not finality. You may return and fight again whenever you choose.",
                    "I remember your attempt. It mattered enough that you can attempt it once more — press RETRY."
                ];
                const chosen = monologues[Math.floor(Math.random() * monologues.length)];

                // Type the chosen monologue character-by-character, then leave the screen black (do not remove)
                (async () => {
                    try {
                        // small lead-in pause so the fade to black feels deliberate
                        await new Promise(r => setTimeout(r, 420));
                        // type
                        txt.textContent = '';
                        for (let i = 0; i < chosen.length; i++) {
                            txt.textContent += chosen.charAt(i);
                            await new Promise(r => setTimeout(r, 36));
                        }
                    } catch (e) {
                        // fallback: show the monologue immediately if typing fails
                        txt.textContent = chosen;
                    } finally {
                        // leave overlay in place (persist cutscene on screen); stop other dean UI
                        // Do NOT call cleanup() here because we want the cutscene overlay to remain.
                        // Add a visible "RETRY" button below the monologue so the player can retry (reload).
                        try {
                            const retryBtn = document.createElement('button');
                            retryBtn.textContent = 'RETRY';
                            retryBtn.className = 'game-button';
                            // simple styling so it sits nicely under the text
                            retryBtn.style.marginTop = '1rem';
                            retryBtn.style.padding = '0.5rem 0.9rem';
                            retryBtn.style.zIndex = '30001';
                            retryBtn.addEventListener('click', () => {
                                // reload the page to retry; this will also reset overlays and re-run startup logic
                                try { location.reload(); } catch (e) { /* ignore */ }
                            });
                            // Give Up button: clear deanPending then reload
                            const giveUpBtn = document.createElement('button');
                            giveUpBtn.textContent = 'GIVE UP';
                            giveUpBtn.className = 'game-button';
                            giveUpBtn.style.marginTop = '0.6rem';
                            giveUpBtn.style.padding = '0.45rem 0.8rem';
                            giveUpBtn.style.zIndex = '30001';
                            giveUpBtn.style.background = 'linear-gradient(45deg,#FF6B6B,#C62828)';
                            giveUpBtn.addEventListener('click', () => {
                                try {
                                    // clear the deanPending flag from the persisted save if present
                                    const raw = localStorage.getItem('unbrokenSave');
                                    if (raw) {
                                        const obj = JSON.parse(raw);
                                        if (obj && obj.deanPending) {
                                            delete obj.deanPending;
                                            // also clear deanRolls so repeat triggers are reset
                                            if ('deanRolls' in obj) delete obj.deanRolls;
                                            localStorage.setItem('unbrokenSave', JSON.stringify(obj));
                                        }
                                    }
                                } catch (e) { /* ignore */ }
                                // remove overlay and reload to a clean state
                                try {
                                    if (cut && cut.parentNode) cut.parentNode.removeChild(cut);
                                } catch (e) {}
                                try { location.reload(); } catch (e) {}
                            });
                            // append the buttons under the typed text
                            cut.appendChild(retryBtn);
                            cut.appendChild(giveUpBtn);
                        } catch (e) {
                            // if any error creating the button happens, silently ignore and leave the overlay
                            console.error('Failed to create retry button', e);
                        }
                        // do not remove the overlay; persist deanPending remains set so other systems can detect it
                    }
                })();

                return; // do not proceed to normal cleanup timeout
            }

            // If the player defeated Dean, show a short Sunlight cutscene then clear progress and reload
            if (playerWon) {
                // create full-screen black overlay that will persist
                const cut = document.createElement('div');
                cut.id = 'dean-victory-cutscene';
                cut.style.position = 'fixed';
                cut.style.inset = '0';
                cut.style.background = '#000';
                cut.style.zIndex = 30000;
                cut.style.display = 'flex';
                cut.style.flexDirection = 'column';
                cut.style.alignItems = 'center';
                cut.style.justifyContent = 'center';
                cut.style.pointerEvents = 'auto';

                const txt = document.createElement('div');
                txt.style.color = '#FFD700';
                txt.style.fontFamily = 'Orbitron, monospace';
                txt.style.fontWeight = '900';
                txt.style.fontSize = 'clamp(1rem, 4vw, 2rem)';
                txt.style.textAlign = 'center';
                txt.style.whiteSpace = 'pre-wrap';
                txt.style.maxWidth = '92%';
                txt.style.padding = '1rem';
                cut.appendChild(txt);

                document.body.appendChild(cut);

                // Sunlight final monologue lines (deterministic short sequence)
                const lines = [
                    "So you have broken the pattern.",
                    "You climbed and struck; for a moment, I felt the world tip.",
                    "It was...unfortunate for you, but instructive for me.",
                    "All things end. Some end in quiet, some end with noise.",
                    "This is one of those quiet endings.",
                  "No, I'm lying to you.",
                  "Goodbye."
                ];

                (async () => {
                    try {
                        await new Promise(r => setTimeout(r, 420));
                        txt.textContent = '';
                        for (let i = 0; i < lines.length; i++) {
                            const line = lines[i];
                            for (let c = 0; c < line.length; c++) {
                                txt.textContent += line.charAt(c);
                                await new Promise(r => setTimeout(r, 36));
                            }
                            // short pause between lines
                            await new Promise(r => setTimeout(r, 900));
                            // clear for the next line
                            txt.style.opacity = '0';
                            await new Promise(r => setTimeout(r, 140));
                            txt.style.opacity = '1';
                            txt.textContent = '';
                        }
                    } catch (e) {
                        // fallback: show combined text if typing fails
                        txt.textContent = lines.join('\n');
                    } finally {
                        // After cutscene, wipe progress and reload
                        try {
                            // best-effort save wipe
                            localStorage.removeItem('unbrokenSave');
                            // attempt to also clear localStorage completely (best-effort)
                            try { localStorage.clear(); } catch(e) { /* ignore */ }
                        } catch (e) { /* ignore */ }

                        // small pause before reloading so the final typed message is perceived
                        setTimeout(() => {
                            try { location.reload(); } catch (e) { /* ignore */ }
                        }, 600);
                    }
                })();

                return;
            }

            // brief pause then cleanup for non-player-loss outcomes (shouldn't reach here)
            setTimeout(() => {
                cleanup();
            }, 1400);
        }

        // Start UI with initial values
        updateUI();
        atkBtn.disabled = false;
        healBtn.disabled = false;
        state.playerTurn = true;
        appendLog('A cold presence fills the room...');

        // Safety: ensure focus and pointer capture so mobile won't dismiss it accidentally
        try { atkBtn.focus(); } catch (e) {}

        // The fight intentionally has no music started here (per spec).
    }

    (async () => {
        try {
            const lines = onReload ? reloadLines : normalLines;
            // small delay so the fade in feels settled
            await new Promise(r => setTimeout(r, 420));

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                await typeText(textEl, line, 40);
                // On reload variant, keep it brief then clear; otherwise allow the longer cadence
                if (onReload) {
                    await new Promise(r => setTimeout(r, 900));
                    await clearText(textEl);
                } else {
                    await new Promise(r => setTimeout(r, 1800));
                    await clearText(textEl);
                }
            }

            // After the normal sequence, leave the screen black (do not remove overlay).
            // For the reload variant, also leave it black so the game shows the dean message immediately.
            // NOTE: intentionally DO NOT clear the persisted deanPending flag here.
            // The flag must remain set after the dialogue finishes so other systems
            // (or subsequent reloads) can detect that the dean sequence occurred.

            // Two seconds after the dialogue ends, launch the alternate-styled Dean fight.
            setTimeout(() => {
                try {
                    startDeanFight();
                } catch (e) {
                    console.error('Failed to start Dean fight', e);
                }
            }, 2000);

        } catch (e) {
            console.error('Dean sequence error', e);
        }
    })();
            }
