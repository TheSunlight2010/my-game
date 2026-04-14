/*
  business.js
  Exposes openBusiness() to present a modal with ROLL and INSTRUCTIONS.
  ROLL costs 5 credits, computes success chance using:
    chance% = (health + strongestAttack + strongestHeal) / 6
  (evaluated per-candidate and averaged into an overall chance); if roll succeeds,
  picks one non-higher-plane character you don't already have (weighted by that score),
  unlocks it locally (gameState.unlockedCharacters + characters pool), saves, and updates UI.
  INSTRUCTIONS shows Business' sassy-but-kind explanation.
*/

export function openBusiness() {
    // avoid duplicate modal
    if (document.getElementById('business-modal')) return;

    const overlay = document.createElement('div');
    overlay.id = 'business-modal';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'rgba(0,0,0,0.8)';
    overlay.style.zIndex = '15000';
    overlay.style.padding = '1rem';
    overlay.style.boxSizing = 'border-box';

    const panel = document.createElement('div');
    panel.style.width = 'min(680px, 96%)';
    panel.style.maxWidth = '720px';
    panel.style.background = 'rgba(255,215,0,0.04)';
    panel.style.border = '2px solid #FFD700';
    panel.style.borderRadius = '12px';
    panel.style.padding = '1rem';
    panel.style.boxSizing = 'border-box';
    panel.style.color = '#FFD700';
    panel.style.fontFamily = 'Orbitron, monospace';
    panel.style.display = 'flex';
    panel.style.flexDirection = 'column';
    panel.style.gap = '0.8rem';

    panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.6rem;">
            <div style="display:flex;gap:0.6rem;align-items:center;">
                <img src="business.png" alt="Business" style="width:56px;height:56px;border-radius:10px;border:2px solid #FFD700;object-fit:cover;">
                <div>
                    <div style="font-weight:900;color:#FFD700;font-size:1.05rem;">Business</div>
                    <div style="color:#FFA500;font-size:0.85rem;">Business' Business </div>
                </div>
            </div>
            <div style="display:flex;gap:0.5rem;">
                <button id="business-close" style="background:linear-gradient(45deg,#FFD700,#FFA500);border:none;padding:0.45rem 0.8rem;border-radius:8px;cursor:pointer;">CLOSE</button>
            </div>
        </div>
        <div id="business-body" style="min-height:88px;color:#FFD700;line-height:1.25;">
            <div style="font-weight:700;margin-bottom:0.5rem;">Welcome. I'm Business.</div>
            <div id="business-instruction-text" style="color:#FFD700;opacity:0.92;">
                Press ROLL (5 credits) to try your luck at getting a character you don't already have (Higher-Plane characters excluded). Or press INSTRUCTIONS to hear me explain things.
            </div>
        </div>
        <div style="display:flex;gap:0.6rem;align-items:center;justify-content:center;">
            <button id="business-roll" class="game-button" style="min-width:140px;padding:0.6rem 0.9rem;">ROLL (5)</button>
            <button id="business-instructions" class="game-button" style="min-width:140px;padding:0.6rem 0.9rem;background:transparent;border:1.5px solid #FFD700;color:#FFD700;">INSTRUCTIONS</button>
        </div>
        <div id="business-feedback" style="min-height:48px;color:#FFD700;font-weight:700;display:flex;align-items:center;justify-content:center;"></div>
    `;

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Close handler
    document.getElementById('business-close').addEventListener('click', () => {
        overlay.remove();
    });

    // Instructions button: playful, sassy but kind
    document.getElementById('business-instructions').addEventListener('click', () => {
        const txt = [
            "Alright sweetie — here's how this little scheme works:",
            "1) It costs 5 credits to roll.",
            "2) Higher-Plane characters are NOT included.",
            "3) If you already own every eligible character, there's nothing to win.",
            "4) On success, you'll receive one new eligible character; on failure, nothing happens — try again if you like.",
            "Go on — spend your credits. I'm rooting for you (a little)."
        ];
        const el = document.getElementById('business-instruction-text');
        el.innerHTML = txt.map((l,i) => `<div style="${i===0?'font-weight:800;margin-bottom:0.35rem;':''}">${l}</div>`).join('');
    });

    // Roll logic
    document.getElementById('business-roll').addEventListener('click', () => {
        const feedback = document.getElementById('business-feedback');
        feedback.textContent = '';

        try {
            // Prefer the global gameState when available; otherwise fall back to any persisted save.
            // We'll ensure window.gameState exists so the rest of the logic can rely on it.
            if (!window.gameState) {
                try {
                    const parsed = JSON.parse(localStorage.getItem('unbrokenSave') || '{}');
                    window.gameState = parsed || {};
                } catch (e) {
                    window.gameState = window.gameState || {};
                }
            }
            if ((window.gameState.credits || 0) < 5) {
                feedback.textContent = 'You need 5 credits to roll.';
                return;
            }

            // Gather candidate characters: from combined tables, exclude higher-plane and ones already unlocked
            const allDefs = { ...(window.characters || {}), ...(window.additionalCharacters || {}) };
            const unlocked = window.gameState.unlockedCharacters || [];
            const candidates = [];

            Object.keys(allDefs).forEach(k => {
                const def = allDefs[k];
                if (!def) return;
                // explicit skip: the special 'null' character cannot be won from Business
                if (k === 'null') return;
                // skip higher-plane
                if (def.higherPlane) return;
                // skip ones already unlocked
                if (unlocked.includes(k)) return;
                // ensure has health and abilities to compute metrics
                const health = Number(def.health || 100);
                // compute strongest attack and strongest heal (heals are negative damage values)
                let strongestAttack = 0;
                let strongestHeal = 0;
                if (Array.isArray(def.abilities)) {
                    def.abilities.forEach(a => {
                        const d = Number(a.damage || 0);
                        if (d > strongestAttack) strongestAttack = d;
                        if (d < 0 && Math.abs(d) > strongestHeal) strongestHeal = Math.abs(d);
                    });
                }
                // push candidate along with its score
                const score = health + strongestAttack + strongestHeal;
                candidates.push({ key: k, def, health, strongestAttack, strongestHeal, score });
            });

            if (candidates.length === 0) {
                // No eligible characters remain — increment a hidden counter that can trigger the "dean" easter-egg.
                window.gameState = window.gameState || {};
                window.gameState.deanRolls = (window.gameState.deanRolls || 0) + 1;

                // Persist the counter so reloads keep the state
                try {
                    if (typeof saveGameData === 'function') {
                        saveGameData();
                    } else {
                        localStorage.setItem('unbrokenSave', JSON.stringify({
                            credits: window.gameState.credits,
                            unlockedCharacters: window.gameState.unlockedCharacters || [],
                            purchasedCharacters: window.gameState.purchasedCharacters || [],
                            characterLevels: window.gameState.characterLevels || {},
                            // preserve deanRolls explicitly for older save-shapes
                            deanRolls: window.gameState.deanRolls
                        }));
                    }
                } catch (e) { /* ignore */ }

                // Provide mild feedback and show progress toward the hidden trigger
              const rolls = window.gameState.deanRolls || 0;
                feedback.textContent = 'No eligible characters remain to be won.';

                // If the player persisted 8 times beyond exhaustion, trigger dean.js and mark a pending flag
                if (rolls >= 8) {
                    // mark that dean sequence should occur (also ensure it's only set once)
                    window.gameState.deanPending = true;
                    // persist deanPending
                    try {
                        if (typeof saveGameData === 'function') saveGameData();
                        else {
                            const cur = JSON.parse(localStorage.getItem('unbrokenSave') || '{}');
                            cur.deanRolls = window.gameState.deanRolls;
                            cur.deanPending = true;
                            localStorage.setItem('unbrokenSave', JSON.stringify(cur));
                        }
                    } catch (e) { /* ignore */ }

                    // Attempt to load and start dean.js immediately
                    import('./dean.js').then(mod => {
                        try {
                            if (typeof mod.default === 'function') mod.default(false);
                        } catch (e) { console.error('Failed to run dean sequence:', e); }
                    }).catch(err => {
                        console.error('Failed to load dean.js', err);
                    });

                    feedback.textContent = 'Something answered...';
                }
                return;
            }

            // Deduct cost immediately
            window.gameState.credits -= 5;

            // Try to use the game's save/update helpers if available; otherwise persist directly and update credits UI.
            if (typeof saveGameData === 'function') {
                try { saveGameData(); } catch (e) { /* ignore */ }
            } else {
                try {
                    localStorage.setItem('unbrokenSave', JSON.stringify({
                        credits: window.gameState.credits,
                        unlockedCharacters: window.gameState.unlockedCharacters || [],
                        purchasedCharacters: window.gameState.purchasedCharacters || [],
                        characterLevels: window.gameState.characterLevels || {}
                    }));
                } catch (e) { /* ignore */ }
            }

            if (typeof updateShopUI === 'function') {
                try { updateShopUI(); } catch (e) { /* ignore */ }
            } else {
                const titleCredits = document.getElementById('credits-display-title');
                const shopCredits = document.getElementById('credits-display');
                if (titleCredits) titleCredits.textContent = `Credits: ${window.gameState.credits}`;
                if (shopCredits) shopCredits.textContent = `Credits: ${window.gameState.credits}`;
            }

            // Show small temporary UI change to indicate deduction
            const titleCredits = document.getElementById('credits-display-title');
            const shopCredits = document.getElementById('credits-display');
            if (titleCredits) titleCredits.textContent = `Credits: ${window.gameState.credits}`;
            if (shopCredits) shopCredits.textContent = `Credits: ${window.gameState.credits}`;

            // Compute per-candidate "chance contribution": (health + strongestAttack + strongestHeal) / 6
            // We'll compute an overall chance by averaging those candidate chances and clamp between 2% and 85%
            const candidateChances = candidates.map(c => (c.score / 6));
            const avgChance = candidateChances.reduce((s, v) => s + v, 0) / candidateChances.length;
            // Clamp sensible bounds
            const chance = Math.max(2, Math.min(85, avgChance));

            // Roll random
            const roll = Math.random() * 100;

            // 65% of the time get nothing-ish is approximated by the formula naturally; no extra forced 65%
            if (roll >= chance) {
                feedback.textContent = `No luck this time.`;
                return;
            }

            // Success branch: pick one candidate weighted by its score (higher score -> more likely)
            const totalWeight = candidates.reduce((s, c) => s + Math.max(1, c.score), 0);
            let pick = Math.random() * totalWeight;
            let chosen = candidates[0];
            for (let c of candidates) {
                pick -= Math.max(1, c.score);
                if (pick <= 0) {
                    chosen = c;
                    break;
                }
            }

            // Unlock locally: push to unlockedCharacters and add to characters pool if it's in additionalCharacters
            if (!window.gameState.unlockedCharacters.includes(chosen.key)) {
                window.gameState.unlockedCharacters.push(chosen.key);
            }
            // if it's in additionalCharacters, ensure characters table gains it so selection works elsewhere
            if ((window.additionalCharacters || {})[chosen.key]) {
                window.characters = window.characters || {};
                window.characters[chosen.key] = window.additionalCharacters[chosen.key];
            }

            // initialize level if needed
            window.gameState.characterLevels = window.gameState.characterLevels || {};
            if (!window.gameState.characterLevels[chosen.key]) {
                window.gameState.characterLevels[chosen.key] = { level: 1, exp: 0 };
            }

            // save (use helper if available; otherwise persist directly), update shop/characters UI
            if (typeof saveGameData === 'function') {
                try { saveGameData(); } catch (e) { /* ignore */ }
            } else {
                try {
                    localStorage.setItem('unbrokenSave', JSON.stringify({
                        credits: window.gameState.credits,
                        unlockedCharacters: window.gameState.unlockedCharacters || [],
                        purchasedCharacters: window.gameState.purchasedCharacters || [],
                        characterLevels: window.gameState.characterLevels || {}
                    }));
                } catch (e) { /* ignore */ }
            }

            if (typeof updateShopUI === 'function') {
                try { updateShopUI(); } catch (e) { /* ignore */ }
            } else {
                const titleCredits = document.getElementById('credits-display-title');
                const shopCredits = document.getElementById('credits-display');
                if (titleCredits) titleCredits.textContent = `Credits: ${window.gameState.credits}`;
                if (shopCredits) shopCredits.textContent = `Credits: ${window.gameState.credits}`;
            }

            if (typeof window.renderCharactersList === 'function') window.renderCharactersList();

            // Reset any accumulated dean-roll counter on a successful unlock
            try {
                window.gameState.deanRolls = 0;
                window.gameState.deanPending = false;
                if (typeof saveGameData === 'function') saveGameData();
                else {
                    const cur = JSON.parse(localStorage.getItem('unbrokenSave') || '{}');
                    cur.deanRolls = 0;
                    cur.deanPending = false;
                    localStorage.setItem('unbrokenSave', JSON.stringify(cur));
                }
            } catch (e) { /* ignore */ }

            feedback.textContent = `Success! You got ${chosen.def.name || chosen.key.toUpperCase()} — added to your characters.`;
        } catch (err) {
            console.error('Business roll error', err);
            const feedback = document.getElementById('business-feedback');
            if (feedback) feedback.textContent = 'Something went wrong.';
        }
    });
}