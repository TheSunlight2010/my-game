
(function () {
    // Ensure DOM readiness and gameState availability
    function $(sel) { return document.querySelector(sel); }

    // Create container for effect badges
    function ensureContainer() {
        let container = document.getElementById('effect-badges');
        if (!container) {
            container = document.createElement('div');
            container.id = 'effect-badges';
            container.style.position = 'absolute';
            container.style.inset = '0';
            container.style.pointerEvents = 'none';
            container.style.zIndex = 1200;
            document.body.appendChild(container);

            // Basic styles appended so we don't require CSS edits
            const style = document.createElement('style');
            style.id = 'effect-badges-styles';
            style.textContent = `
                .effect-badge {
                    position: absolute;
                    min-width: 72px;
                    max-width: 220px;
                    padding: 6px 8px;
                    border-radius: 8px;
                    font-family: Orbitron, monospace;
                    font-weight: 800;
                    font-size: 0.78rem;
                    color: #FFF;
                    background: linear-gradient(90deg,#c93 0%,#a33 100%);
                    box-shadow: 0 6px 18px rgba(0,0,0,0.6), inset 0 0 8px rgba(255,255,255,0.04);
                    pointer-events: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    /* position to the right by default: translateX(8px) keeps it slightly offset */
                    transform: translate(8px, -50%);
                    transition: opacity 220ms ease, transform 220ms ease;
                    opacity: 0;
                    white-space: nowrap;
                }
                .effect-badge.show {
                    opacity: 1;
                    transform: translate(10px, -50%);
                }
                .effect-badge .label {
                    margin-right: 6px;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                }
                .effect-badge .count {
                    background: rgba(255,255,255,0.08);
                    padding: 2px 6px;
                    border-radius: 999px;
                    font-size: 0.72rem;
                    color: #FFF;
                }
                .effect-badge.bleeding {
                    background: linear-gradient(90deg,#ff5b5b 0%, #c62828 100%);
                    box-shadow: 0 8px 20px rgba(198,40,40,0.28), inset 0 0 10px rgba(255,160,160,0.04);
                }
                .effect-badge.karma {
                    background: linear-gradient(90deg,#ff4dbb 0%, #c4009f 100%);
                    box-shadow: 0 10px 24px rgba(196,40,150,0.28), inset 0 0 12px rgba(255,150,230,0.06);
                }
            `;
            document.head.appendChild(style);
        }
        return container;
    }

    function createBadge(id) {
        const container = ensureContainer();
        let el = document.getElementById(id);
        if (!el) {
            el = document.createElement('div');
            el.className = 'effect-badge';
            el.id = id;
            el.innerHTML = `<span class="label"></span><span class="count"></span>`;
            container.appendChild(el);
        }
        return el;
    }

    function updateBadge(badgeEl, { label, count, visible, rect, type }) {
        if (!badgeEl) return;
        const lbl = badgeEl.querySelector('.label');
        const cnt = badgeEl.querySelector('.count');
        if (lbl) lbl.textContent = label || '';
        if (cnt) cnt.textContent = (typeof count === 'number') ? count : (count || '');
        // adjust classes based on type
        badgeEl.classList.remove('bleeding', 'karma');
        if (type === 'bleeding') badgeEl.classList.add('bleeding');
        if (type === 'karma') badgeEl.classList.add('karma');

        if (visible) {
            badgeEl.classList.add('show');
            badgeEl.style.opacity = '1';
            if (rect) {
                // position to the right of the sprite, vertically centered on sprite
                const x = rect.right + 8; // 8px gap to the right
                const y = rect.top + rect.height / 2;
                // place the badge's left at x and vertically center by using translateY(-50%)
                badgeEl.style.left = `${Math.round(x)}px`;
                badgeEl.style.top = `${Math.round(y)}px`;
                badgeEl.style.transform = 'translate(10px, -50%)';
            }
        } else {
            badgeEl.classList.remove('show');
            badgeEl.style.opacity = '0';
            // keep element in DOM for reuse
        }
    }

    // Main loop: poll gameState and update badges accordingly
    let running = false;
    function startLoop() {
        if (running) return;
        running = true;
        const playerBadge = createBadge('effect-badge-player');
        const enemyBadge = createBadge('effect-badge-enemy');

        const tick = () => {
            try {
                const gs = window.gameState || null;
                // Determine sprite elements for positioning
                const pSprite = $('#player-sprite');
                const eSprite = $('#enemy-sprite');

                // PLAYER: BLEEDING
                const pBleed = gs && gs.bleeds && gs.bleeds.player && gs.bleeds.player.active;
                if (pBleed) {
                    const b = gs.bleeds.player;
                    const rect = pSprite ? pSprite.getBoundingClientRect() : null;
                    updateBadge(playerBadge, {
                        label: 'Bleeding',
                        count: b.totalRemaining || b.accumulated || 0,
                        visible: true,
                        rect: rect,
                        type: 'bleeding'
                    });
                } else {
                    // If no bleed, ensure we hide the badge unless KARMA exists
                    updateBadge(playerBadge, { visible: false });
                }

                // PLAYER: KARMA
                const pKarma = gs && gs.karmas && gs.karmas.player && gs.karmas.player.active;
                if (pKarma) {
                    const k = gs.karmas.player;
                    const rect = pSprite ? pSprite.getBoundingClientRect() : null;
                    // display total remaining to apply (total - accumulated) if available
                    const remaining = (typeof k.total === 'number' && typeof k.accumulated === 'number') ? Math.max(0, k.total - k.accumulated) : (k.total || 0);
                    updateBadge(playerBadge, {
                        label: 'KARMA',
                        count: remaining,
                        visible: true,
                        rect: rect,
                        type: 'karma'
                    });
                } else {
                    // if KARMA not active and BLEEDING also not active, hide
                    const pBleedCheck = gs && gs.bleeds && gs.bleeds.player && gs.bleeds.player.active;
                    if (!pBleedCheck) updateBadge(playerBadge, { visible: false });
                }

                // ENEMY: BLEEDING
                const eBleed = gs && gs.bleeds && gs.bleeds.enemy && gs.bleeds.enemy.active;
                if (eBleed) {
                    const b = gs.bleeds.enemy;
                    const rect = eSprite ? eSprite.getBoundingClientRect() : null;
                    updateBadge(enemyBadge, {
                        label: 'Bleeding',
                        count: b.totalRemaining || b.accumulated || 0,
                        visible: true,
                        rect: rect,
                        type: 'bleeding'
                    });
                } else {
                    updateBadge(enemyBadge, { visible: false });
                }

                // ENEMY: KARMA
                const eKarma = gs && gs.karmas && gs.karmas.enemy && gs.karmas.enemy.active;
                if (eKarma) {
                    const k = gs.karmas.enemy;
                    const rect = eSprite ? eSprite.getBoundingClientRect() : null;
                    const remaining = (typeof k.total === 'number' && typeof k.accumulated === 'number') ? Math.max(0, k.total - k.accumulated) : (k.total || 0);
                    updateBadge(enemyBadge, {
                        label: 'KARMA',
                        count: remaining,
                        visible: true,
                        rect: rect,
                        type: 'karma'
                    });
                } else {
                    const eBleedCheck = gs && gs.bleeds && gs.bleeds.enemy && gs.bleeds.enemy.active;
                    if (!eBleedCheck) updateBadge(enemyBadge, { visible: false });
                }

                // Also toggle health-bar visual class for karma so CSS magenta bar shows
                try {
                    const playerHealthBarContainer = document.querySelector('.player-section .health-bar');
                    const enemyHealthBarContainer = document.querySelector('.enemy-section .health-bar');
                    if (playerHealthBarContainer) {
                        if (pKarma) playerHealthBarContainer.classList.add('karma');
                        else playerHealthBarContainer.classList.remove('karma');
                    }
                    if (enemyHealthBarContainer) {
                        if (eKarma) enemyHealthBarContainer.classList.add('karma');
                        else enemyHealthBarContainer.classList.remove('karma');
                    }
                } catch (err) {
                    // ignore UI errors
                }

            } catch (e) {
                // swallow errors to keep polling
                console.error('effectshow tick error', e);
            } finally {
                // schedule next
                if (running) setTimeout(tick, 300);
            }
        };
        tick();
    }

    // Stop loop helper (exposed for debugging)
    function stopLoop() { running = false; }

    // Start once DOM is ready (battle screen may appear later but badges simply stay hidden until needed)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startLoop);
    } else {
        startLoop();
    }

    // Expose for debugging
    window.__effectShow = {
        start: startLoop,
        stop: stopLoop
    };
})();