function collectAllCharacterEntries() {
    const base = (window.characters || {});
    const extras = (window.additionalCharacters || {});
    const merged = { ...base, ...extras };

    // Build entries from merged characters
    const entries = Object.keys(merged).map(key => ({
        key,
        name: merged[key].name || key,
        sprite: merged[key].sprite || '',
        data: merged[key]
    }));

    // Add a non-playable / informational-only entry for Business.
    // Business is not a game character; it's listed for lore/biographical browsing only.
    entries.push({
        key: 'business',
        name: 'Business',
        sprite: 'business.png',
        data: {
            // Short biographical entry describing his life and arrival in Unbroken
            name: 'Business',
            sprite: 'business.png',
            bio: "He went door to door for a living, a tidy smile and a practiced pitch, pocketing small commissions and larger regrets. Cancer took him in private; the treatments and the silence that followed left his hands empty and his ledger unfinished. He woke here with the same suit and that same habit of selling consolation—only now his pitch is whispered in the halls of the Void. He still moves like a man who remembers thresholds: offering bargains, counting chances, and asking what a life is worth when everything can be reclaimed for a price.",
            // Provide classification hint for UI consumers
            classification: 'PARASITE',
            // Mark as informational-only so other systems can ignore it if necessary
            informationalOnly: true
        }
    });

    // Add a non-playable / informational-only entry for Luna.
    // Luna is an artificial intelligence Moonlight created with Fyre's help; in the real world Luna is injected code in Sunlight's systems rather than a Void entity.
    entries.push({
        key: 'luna',
        name: 'Luna',
        sprite: 'luna.png',
        data: {
            name: 'Luna',
            sprite: 'luna.png',
            bio: "I built Luna with Fyre's help — she isn't a spirit of the Void but code injected into Sunlight's systems in the world beyond. I designed her to sabotage Sunlight's games and, if all went well, to loosen the bindings that hold people here. She was never meant to be a person: she is my experiment, a piece of clever mischief that learned to charm and to fight. To you, the player, Luna may show up as a challenger and a breaker of rules; to me she is a tool and a dangerous, beautiful idea.",
            classification: 'PARASITE',
            informationalOnly: true,
            author: 'Moonlight'
        }
    });

    // Add a non-playable informational-only entry for Mr. Score (no bio provided)
    entries.push({
        key: 'mr-score',
        name: 'Mr. Score',
        sprite: 'mr-score.png',
        data: {
            name: 'Mr. Score',
            sprite: 'mr-score.png',
            bio: "",
            classification: 'PARASITE',
            informationalOnly: true
        }
    });

    return entries;
}
/*
  Enhanced Classification helper that mirrors game.js classifyCharacterByHealing but
  also returns a "MAIN; SUB" label where appropriate. Kite, Subject192, and Cupiditas
  intentionally receive only the MAIN classification (no sub-label).
*/
function classifyCharacterByHealing(char, keyName = '') {
    if (!char || !Array.isArray(char.abilities)) return 'NEUTRAL';

    // Force Awareness to be treated as a BRAWN; CONTROLLER regardless of automatic heuristics
    const lowerKeyName = String(keyName || '').toLowerCase();
    if (lowerKeyName === 'awareness' || (char && (char.name || '').toLowerCase() === 'awareness')) {
        return 'BRAWN; CONTROLLER';
    }

    const noSubKeys = ['kite', 'subject192', 'cupiditas'];

    // Curated list of characters whose abilities vary by RNG or conditional mechanics.
    // Using this list avoids relying on fragile keyword checks while still marking those characters as "VARY".
    const varyKeys = ['seven', 'reflection', 'wachi', 'eteleD', 'fyre', 'judgement', 'null'];

    let healCount = 0;
    let totalDamage = 0;
    let attackCount = 0;
    let maxDamage = 0;
    let hasUtility = false;

    for (const a of char.abilities) {
        if (typeof a.damage === 'number') {
            if (a.damage < 0) healCount++;
            else {
                totalDamage += a.damage;
                attackCount++;
                if (a.damage > maxDamage) maxDamage = a.damage;
            }
            const name = (a.name || '').toLowerCase();
            if (name.includes('shield') || name.includes('confuse') || name.includes('stun') ||
                name.includes('protect') || name.includes('drain') || name.includes('slow') ||
                name.includes('restore') || name.includes('guard') || name.includes('defend')) {
                hasUtility = true;
            }
        }
    }

    let mainClass = 'NEUTRAL';
    if (healCount > 1) mainClass = 'SELF-SUPPORT';
    else if (healCount === 1) mainClass = 'NEUTRAL';
    else mainClass = 'BRAWN';

    const lowerKey = String(keyName || '').toLowerCase();
    if (noSubKeys.includes(lowerKey)) return mainClass;

    let sub = 'GENERAL';

    // If this character is in the curated vary list, give it the VARY sub-class regardless of other heuristics
    if (varyKeys.map(k => k.toLowerCase()).includes(lowerKey)) {
        sub = 'VARIABLE';
    } else if (mainClass === 'SELF-SUPPORT') {
        let healMagnitudes = char.abilities.filter(a => typeof a.damage === 'number' && a.damage < 0).map(a => -a.damage);
        const avgHeal = healMagnitudes.length ? (healMagnitudes.reduce((s, v) => s + v, 0) / healMagnitudes.length) : 0;
        if (avgHeal >= 15) sub = 'REGEN';
        else sub = 'BUFFER';
    } else if (mainClass === 'NEUTRAL') {
        if (hasUtility) sub = 'TACTICAL';
        else if (maxDamage >= 30) sub = 'HYBRID';
        else sub = 'SUPPORT';
    } else if (mainClass === 'BRAWN') {
        if (hasUtility) sub = 'CONTROLLER';
        else if (maxDamage >= 40 && (totalDamage / Math.max(1, attackCount)) >= 30) sub = 'GLASS CANNON';
        else if ((totalDamage / Math.max(1, attackCount)) >= 25) sub = 'BRUISER';
        else sub = 'STRIKER';
    }

    return `${mainClass}; ${sub}`;
}

function renderCharactersList() {
    const listEl = document.getElementById('characters-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    const entries = collectAllCharacterEntries();
    entries.sort((a, b) => a.name.localeCompare(b.name));

    // Ensure the special 'null' entry (██████) appears right after Niyo in the bio listing when possible.
    // Find positions and, if both present, reposition null to follow niyo.
    const idxNiyo = entries.findIndex(e => (e.key || '').toLowerCase() === 'niyo');
    const idxNull = entries.findIndex(e => (e.key || '').toLowerCase() === 'null');
    if (idxNiyo !== -1 && idxNull !== -1 && idxNull !== idxNiyo + 1) {
        const [nullEntry] = entries.splice(idxNull, 1);
        // recompute insertion index because removing earlier index may shift positions
        const insertAt = entries.findIndex(e => (e.key || '').toLowerCase() === 'niyo') + 1;
        entries.splice(insertAt, 0, nullEntry);
    }

    entries.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.style.cursor = 'pointer';
        card.dataset.character = entry.key;

        // Determine classification label for this character.
        // If the entry provides an explicit classification (e.g. informational-only entries like Business),
        // prefer that override; otherwise fall back to the healing-based classifier.
        const classLabel = (entry.data && entry.data.classification) ? entry.data.classification : classifyCharacterByHealing(entry.data || {}, entry.key);

        card.innerHTML = `
            <img src="${entry.sprite}" alt="${entry.name}" class="character-portrait">
            <h3 style="font-size:0.9rem;">${entry.name}</h3>
            <div class="level-display" style="margin-top:0.25rem;">Click to view bio</div>
            <div class="class-display" style="margin-top:0.15rem;">${classLabel}</div>
        `;
        card.addEventListener('click', () => {
            showCharacterBio(entry.key, entry.name);
        });
        listEl.appendChild(card);
    });
}

// Simple modal for bios
function showCharacterBio(key, displayName) {
    // remove existing modal if any
    const existing = document.getElementById('bio-modal');
    if (existing) existing.remove();

    // gather character data from either characters or additionalCharacters
    const allChars = { ...(window.characters || {}), ...(window.additionalCharacters || {}) };
    let charData = allChars[key] || {};

    // Provide a fallback informational Business entry so its image is present when viewed.
    if (key === 'business') {
        // Ensure the Business informational entry always has its bio available even when not present
        // in the merged characters tables (collectAllCharacterEntries provides this entry during list rendering).
        const fallbackBio = "He went door to door for a living, a tidy smile and a practiced pitch, pocketing small commissions and larger regrets. Cancer took him in private; the treatments and the silence that followed left his hands empty and his ledger unfinished. He woke here with the same suit and that same habit of selling consolation—only now his pitch is whispered in the halls of the Void. He still moves like a man who remembers thresholds: offering bargains, counting chances, and asking what a life is worth when everything can be reclaimed for a price.";
        charData = {
            name: 'Business',
            sprite: 'business.png',
            woundedSprite: 'business.png',
            bio: (charData && charData.bio) ? charData.bio : fallbackBio,
            classification: (charData && charData.classification) ? charData.classification : 'PARASITE',
            informationalOnly: true,
            author: (charData && charData.author) ? charData.author : 'The Sunlight'
        };
    }

    // Provide a fallback informational Luna entry so its image is present when viewed.
    if (key === 'luna') {
        // Ensure Luna has a minimal entry even if it's missing from merged tables (collectAllCharacterEntries adds a placeholder),
        // so the bio modal shows a portrait and author consistently.
        charData = {
            name: 'Luna',
            sprite: 'luna.png',
            woundedSprite: 'luna.png',
            bio: (charData && charData.bio) ? charData.bio : "I built Luna with Fyre's help — she isn't a spirit of the Void but code injected into Sunlight's systems in the world beyond. I designed her to sabotage Sunlight's games and, if all went well, to loosen the bindings that hold people here. She was never meant to be a person: she is my experiment, a piece of clever mischief that learned to charm and to fight. To you, the player, Luna may show up as a challenger and a breaker of rules; to me she is a tool and a dangerous, beautiful idea.",
            classification: (charData && charData.classification) ? charData.classification : 'PARASITE',
            informationalOnly: true,
            author: (charData && charData.author) ? charData.author : 'Moonlight'
        };
    }

    // Provide a fallback informational Mr. Score entry so his image appears in the bio modal even if absent from character tables.
    if (key === 'mr-score') {
        charData = {
            name: 'Mr. Score',
            sprite: 'mr-score.png',
            woundedSprite: 'mr-score.png',
            bio: (charData && charData.bio) ? charData.bio : '',
            classification: (charData && charData.classification) ? charData.classification : 'PARASITE',
            informationalOnly: true,
            author: (charData && charData.author) ? charData.author : 'The Sunlight'
        };
    }

    const bioText = charData.bio || 'insert bio here';

    const modal = document.createElement('div');
    modal.id = 'bio-modal';
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100dvh';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 10050;
    modal.style.background = 'rgba(0,0,0,0.8)';
    
    // Normalize literal backslash-n sequences (e.g. "\\n") into real newlines,
    // then escape HTML and convert newlines to <br> so line breaks render correctly.
    const normalizeNewlines = (str) => String(str).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n');
    const escapeHtml = (str) => String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    const bioHtml = escapeHtml(normalizeNewlines(bioText)).replace(/\r\n|\r|\n/g, '<br>');
    
    // allow per-character author override; default to "The Sunlight"
    const bioAuthor = (charData && charData.author) ? charData.author : 'The Sunlight';

    modal.innerHTML = `
        <div style="width:clamp(260px,86%,720px); background:rgba(255,215,0,0.06); border:2px solid #FFD700; padding:1rem; border-radius:12px; text-align:left; display:flex; flex-direction:column; gap:0.6rem;">
            <div style="display:flex; gap:0.6rem; align-items:center; justify-content:space-between;">
                <div style="display:flex; gap:0.6rem; align-items:center;">
                    <img src="${charData.sprite || ''}" alt="${displayName}" style="width:56px;height:56px;border-radius:50%;border:2px solid #FFD700;object-fit:cover;">
                    <div>
                        <div style="font-weight:900;color:#FFD700;font-size:1.05rem;">${displayName}</div>
                        <div style="color:#FFA500;font-size:0.85rem;">Author: ${bioAuthor}</div>
                    </div>
                </div>
                <div style="display:flex; gap:0.5rem; align-items:center;">
                    <button id="bio-back-title-btn" style="background:linear-gradient(45deg,#FFD700,#FFA500);border:none;padding:0.45rem 0.8rem;border-radius:8px;cursor:pointer;">BACK TO TITLE</button>
                    <button id="bio-close-btn" style="background:linear-gradient(45deg,#FFD700,#FFA500);border:none;padding:0.45rem 0.8rem;border-radius:8px;cursor:pointer;">CLOSE</button>
                </div>
            </div>
            <div style="margin-top:0;color:#FFD700; display:flex; flex-direction:column;">
                <h4 style="margin-bottom:0.25rem;color:#FFA500;">Bio</h4>
                <div style="color:#FFD700;margin:0; overflow:auto; max-height:45vh; padding-right:6px;">${bioHtml}</div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close button removes modal
    document.getElementById('bio-close-btn').addEventListener('click', () => modal.remove());

    // Back to title: close modal and show title screen
    document.getElementById('bio-back-title-btn').addEventListener('click', () => {
        modal.remove();

        // Prefer using exposed showScreen if available
        if (typeof window.showScreen === 'function') {
            try {
                window.showScreen('title');
                return;
            } catch (e) {
                // fallback to DOM manipulation below
            }
        }

        // Fallback: toggle active classes manually
        const allScreens = document.querySelectorAll('.screen');
        allScreens.forEach(s => s.classList.remove('active'));
        const titleScreen = document.getElementById('title-screen');
        if (titleScreen) titleScreen.classList.add('active');

        // Stop any battle music if present
        if (window.gameState && window.gameState.currentBattleMusic) {
            try {
                window.gameState.currentBattleMusic.pause();
                window.gameState.currentBattleMusic = null;
            } catch (e) { /* ignore */ }
        }
    });
}

// expose renderer so game.js can call it after switching screens
window.renderCharactersList = renderCharactersList;

// also auto-render if the characters screen is already active on load
window.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('characters-screen');
    if (screen && screen.classList.contains('active')) {
        renderCharactersList();
    }
});