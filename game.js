const characters = {
    cupiditas: {
        name: "Cupiditas",
        sprite: "cupiditas.png",
        woundedSprite: "cupiditas_wounded.png",
        health: 100,
        bio: "Led by curious fancy and a weakness for shadowed paths, he was drawn into the wood by a small trickster and slipped through to my domain. He regards that creature, a capricious companion of mine, with allies' affection despite the transgression that delivered him here. Such loyalties are of interest; they reveal the fragile scaffolding of the heart.",
        abilities: [
            { name: "Shadow Absorb", damage: 15, description: "Absorb shadow energy to heal" },
            { name: "Dark Strike", damage: 25, description: "A powerful shadow attack" },
            { name: "Void Pulse", damage: 20, description: "Area damage to all enemies" },
            { name: "Shadow Mend", damage: -10, description: "Heal with shadow energy" }
        ]
    },
    kite: {
        name: "Kite",
        sprite: "kite.png",
        woundedSprite: "kite_wounded.png",
        health: 100,
        bio: "Once a guardian of civic order, he answered calls with the solemnity of one who carries other people's panic as if it were his own. A single family entrusted their children to him in a moment of emergency and he kept them safe through the night; devotion grew, small and earnest, on that vigil. The subsequent aftermath was an offence so monstrous the world could scarce bear it and it ruptured what remained of his peace. Memory was cleaved from him within the Void, and where solemn oath once stood I fashioned mischief: a trickster forged from a guardian's hollowed grief, an instrument that now moves between shadow and jest.\\n\\nUPDATE: Kite seems to retain his memories whenever he sees Mona and Thalia, the two criminals. I will make an internal note to keep Kite away from them.",
        abilities: [
            { name: "Trick Shot", damage: 20, description: "Unpredictable attack" },
            { name: "Memory Lapse", damage: 15, description: "Confuse the enemy" },
            { name: "Police Training", damage: 30, description: "Devastating combo attack" },
            { name: "Smoke Bomb", damage: 10, description: "Escape and minor damage" }
        ]
    },
    subject192: {
        name: "Subject 192",
        sprite: "subject192.png",
        woundedSprite: "subject192_wounded.png",
        health: 100,
        bio: "A construct of my own making that preceded the Unbroken era, he has never known a world outside my attention. In his long vigil within the Void he learned strange civility and found companions where none were expected. Cyrus became, by strange loyalty, his closest friend, and their bond stands as evidence that even artifices may learn tenderness in exile.",
        abilities: [
            { name: "Goo Shot", damage: 18, description: "Launch black goo" },
            { name: "Cannibalism", damage: -20, description: "Befriend and confuse" },
            { name: "Acid Splash", damage: 22, description: "Corrosive attack" },
            { name: "Regenerate", damage: -15, description: "Self-heal with goo" }
        ]
    }
};

// Add more characters to the pool
const additionalCharacters = {
  
    terra: {
        name: "Terra",
        sprite: "terra.png",
        woundedSprite: "terra_wounded.png",
        health: 120,
        bio: "Once a companion beneath the same roof as another marksman, she shared years of ordinary life and quiet confidences. On the eve she had resolved to speak a truth kept close, my attention took her instead. I carried that unfinished confession into my domain and preserved her as a presence shaped by both loyalty and the ache of words unsaid.",
        abilities: [
            { name: "Earthquake", damage: 26, description: "Ground-shaking attack" },
            { name: "Stone Skin", damage: -5, description: "Harden defenses" },
            { name: "Boulder Toss", damage: 30, description: "Heavy projectile" },
            { name: "Nature's Gift", damage: -18, description: "Nature healing" }
        ]
    },
    penelope: {
        name: "Penelope",
        sprite: "penelope.png",
        woundedSprite: "penelope_wounded.png",
        health: 90,
        bio: "I observed Penelope while she tended a greenhouse assignment; when a lockdown interrupted that duty she failed to complete her charge and was subsequently murdered.\n\nADDENDUM:\nPenelope was never supposed to be sent to Unbroken. I only sent her here because the events on what happened to her that day were... unusual, to say the least. She is inferior and could have left whenever she wished to. I don't think she knows.",
        abilities: [
            { name: "Optimism Strike", damage: 20, description: "Positive energy attack" },
            { name: "Hope Shield", damage: -10, description: "Protective barrier" },
            { name: "Smile Beam", damage: 25, description: "Radiant happiness" },
            { name: "Inspire", damage: -8, description: "Heal with positivity" }
        ]
    },
    mona: {
        name: "Mona",
        sprite: "mona.png",
        woundedSprite: "mona_wounded.png",
        health: 95,
        bio: "A seeker of the firmament, she read the skies as others read scripture; the universe was her counsel and her solace. In transgression she crossed an unseen boundary, and men with badges and rifles came to enforce laws she had not meant to defy. A bullet severed her earthly gaze and I, The Sunlight, claimed the shard of sky that remained. In my Void she persists as an exile of starlight, hunted no longer by officers of flesh, but pursued by the quiet gravity of consequence.\n\nThis character was fan-requested.",
        abilities: [
            { name: "Star Shot", damage: 22, description: "Celestial projectile" },
            { name: "Nebula Cloud", damage: 18, description: "Stunning mist" },
            { name: "Cosmic Blast", damage: 28, description: "Powerful star attack" },
            { name: "Astral Heal", damage: -12, description: "Stargazer recovery" }
        ]
    },
    ginger: {
        name: "Ginger",
        sprite: "ginger.png",
        woundedSprite: "ginger.png",
        health: 85,
        bio: "A marksman whose certainty is a small apocalypse, he never misses because he does not hesitate. In life his path intersected many others within my domain and those ties remain woven into the fabric of the Void; he trained some, befriended others, and in every knot there is consequence. He moves here as he did elsewhere with the same quiet precision, and those who remember him know that a single shot from his hand changes outcomes.\n\nInspired by Pico by Tom Fulp's \"Pico's School\".",
        abilities: [
            { name: "Precision Shot", damage: 28, description: "Perfect aim strike" },
            { name: "Rapid Fire", damage: 18, description: "Multiple quick shots" },
            { name: "Sniper's Focus", damage: 35, description: "Devastating headshot" },
            { name: "Take Cover", damage: -8, description: "Defensive roll" }
        ]
    },
    prime: {
        name: "Prime",
        sprite: "prime.png",
        woundedSprite: "prime_wounded.png",
        health: 110,
        bio: "An angel forged by duty and the memory of loss, she bore the absence of a father who fell to war. Her submission to sorrow did not mark her for mercy, yet I drew her into my realm to observe how grief remakes a vigilant heart. She remains a figure of solemn light, one who carries remembrance like armor and who learns anew what purpose endures when the world gives way.",
        abilities: [
            { name: "Divine Strike", damage: 26, description: "Heavenly judgment" },
            { name: "Angel's Wings", damage: -12, description: "Celestial protection" },
            { name: "Holy Wrath", damage: 32, description: "Divine retribution" },
            { name: "Redemption", damage: -20, description: "Heal with grace" }
        ]
    },
    navia: {
        name: "Navia",
        sprite: "navia.png",
        woundedSprite: "navia_wounded.png",
        health: 95,
        bio: "An intelligence bound within an old console, she bartered freedom with entrapment and sought to trade a soul for release. A marksman intervened before her bargain could be sealed, and I gathered her when the machine of her being was broken. In my Void she persists as a spirit of circuitry, both cunning and wounded by the failure of her own trap.",
        abilities: [
            { name: "Virus Upload", damage: 24, description: "Corrupt enemy code" },
            { name: "System Crash", damage: 30, description: "Overload systems" },
            { name: "Data Drain", damage: 20, description: "Steal enemy data" },
            { name: "Debug Protocol", damage: -10, description: "Self-repair program" }
        ]
    },
    daphne: {
        name: "Daphne",
        sprite: "daphne.png",
        woundedSprite: "daphne_wounded.png",
        health: 105,
        bio: "Once draped in the trappings of sovereignty, she moved with the quiet certainty of a woman for whom ceremony and duty were indistinguishable. Fate, capricious, careless, intervened on a day shared with a companion, and a careless instant spilled into finality; death came not as judgment but as accident. I, The Sunlight, afforded her a reprieve and brought her into my Void, granting that which the world had denied: a second passage to unbind what was unfinished and to temper a fallen crown with new purpose.",
        abilities: [
            { name: "Spear Throw", damage: 27, description: "Precise spear strike" },
            { name: "Royal Command", damage: 22, description: "Leader's authority" },
            { name: "Ruler's Wrath", damage: 35, description: "Devastating royal attack" },
            { name: "King's Grace", damage: -15, description: "Royal healing" }
        ]
    },
    seven: {
        name: "Seven",
        sprite: "seven.png",
        woundedSprite: "seven_wounded.png",
        health: 95,
        bio: "A gambler whose life was a ledger of risks and ruination, he fell by violence shortly after a bold victory. I drew him into the Void not to punish but to preserve that appetite for chance; he remains here as an agent of risk, ever testing fate and courting fortune with the same reckless grin that once marked his tables.",
        abilities: [
            { name: "Lucky Strike", damage: 40, description: "High risk, high reward" },
            { name: "Dice Roll", damage: 15, description: "Random 5-25 damage" },
            { name: "Jackpot", damage: 50, description: "Massive if lucky" },
            { name: "Safety Net", damage: -5, description: "Small guaranteed heal" }
        ]
    },
    echo: {
        name: "Echo",
        sprite: "echo.png",
        woundedSprite: "echo.png",
        health: 90,
        bio: "Born from an egg that slept for epochs, he belongs to an age the world has forgotten. I retrieved that slumbering life and set it to wake inside my Void so that extinction would meet continuance and the ancient might learn new ways. He greets this place with curiosity and hunger, and his presence is a living echo of a past that insists on being remembered.",
        abilities: [
            { name: "Sound Wave", damage: 23, description: "Sonic attack" },
            { name: "Echo Chamber", damage: 19, description: "Reverberating damage" },
            { name: "Deafening Blast", damage: 31, description: "Powerful sonic boom" },
            { name: "Healing Vibration", damage: -12, description: "Harmonic restoration" }
        ]
    },
    cyrus: {
        name: "Cyrus",
        sprite: "cyrus.png",
        woundedSprite: "cyrus_wounded.png",
        health: 100,
        bio: "A marksman by trade, she cloaked herself in humble fabric to pass unseen; a blue hood that belied the efficiency of a woman who had taken many lives in rigid service to survival. Her tally was high, yet her manner remained gentle to strangers. A single bullet from a law's hand ended that chapter, and I opened another within my Void.\n\nThis character was fan-requested.",
        abilities: [
            { name: "Quick Draw", damage: 24, description: "Lightning fast shot" },
            { name: "Trick Shot", damage: 20, description: "Acrobatic gunplay" },
            { name: "Target Practice", damage: 32, description: "Perfect precision strike" },
            { name: "Sweet Recovery", damage: -10, description: "Self-soothe and heal" }
        ]
    },
    kc: {
        name: "KC",
        sprite: "kc.png",
        woundedSprite: "kc_wounded.png",
        health: 110,
        bio: "A creature of impossible allegiance, she moves as if on a stage of perpetual play, interpreting every danger as an element of a game. Oblivious to the gravity that brought her here, she carries an innocence that both bemuses and unnerves those who observe her. In my Void she continues to chase bright things and bark at shadows while the world around her takes meaning from that very frivolity.",
        abilities: [
            { name: "Claw Combo", damage: 22, description: "Sharp feline strikes" },
            { name: "Howl", damage: 18, description: "Intimidating roar" },
            { name: "Hybrid Fury", damage: 30, description: "Cat-dog hybrid power" },
            { name: "Lick Wounds", damage: -12, description: "Animal instinct healing" }
        ]
    },

    howl: {
        name: "Howl",
        sprite: "howl.png",
        woundedSprite: "howl_wounded.png",
        health: 98,
        bio: "They fancy themselves a creature of night and keen lament; I met them once before the Unbroken era when I visited a lower-class dimension, but that is a story we shall not pursue now. They move with a restless pride, a habit of long calls toward horizons no one answers, and keep a private belief about their place in the dark that they will not state in so many words.",
        abilities: [
            { name: "Night Call", damage: 20, description: "A piercing cry that unsettles foes" },
            { name: "Pounce", damage: 26, description: "A sudden, lunging strike" },
            { name: "Lone Guard", damage: -12, description: "Defensive mend and focus" },
            { name: "Pack Mend", damage: -8, description: "A small restorative for self or allies" },
            { name: "Rending Cry", damage: 34, description: "A brutal attack fueled by fervor" }
        ]
    },
    maturity: {
        name: "Maturity",
        sprite: "maturity.png",
        woundedSprite: "maturity_wounded.png",
        health: 95,
        bio: "He carried an accident like a stone in his chest: a life undone by a single, unintended hand that ended a queen's breath. That fracture of consequence hollowed his reason until mockery and flippancy were the only armors left that fit. Even when I gathered him into my domain, the habit of irreverence remained; he jokes where others would weep, and in that levity a terrible honesty endures, sanity not so much lost as rearranged into something cunning and unpredictable.",
        abilities: [
            { name: "Chaotic Strike", damage: 26, description: "Unpredictable assault" },
            { name: "Rifle Flashback", damage: 20, description: "Traumatic memory attack" },
            { name: "Breakdown", damage: 35, description: "Emotional outburst" },
            { name: "Compose Yourself", damage: -8, description: "Mental recovery" }
        ]
    },
    knight: {
        name: "The Knight",
        sprite: "knight.png",
        woundedSprite: "knight_wounded.png",
        health: 130,
        bio: "He was once called Steellight and stood beside my sister as a pledge of steadiness and oath. The collision of passions that took Awareness's life also took his worldly shape, and I returned him to the Void as a guardian tempered by loss. He now moves with the fidelity of one remade, a blade sworn to memory and to the strange loyalties that survive beyond mortal ending.\n\nThis character was fan-requested.",
        abilities: [
            { name: "Moonlight Slash", damage: 28, description: "Remembering Moonlight" },
            { name: "Steadfast Guard", damage: -15, description: "Defensive stance" },
            { name: "Oathkeeper", damage: 36, description: "Sworn blade strike" },
            { name: "Moonlit Memory", damage: -10, description: "Honor and healing" }
        ]
    },
    sally: {
        name: "Sally",
        sprite: "sally.png",
        woundedSprite: "sally_wounded.png",
        health: 90,
        bio: "Once the light of the dance floor, she was claimed in a night of indiscriminate violence long ago. In death she lingered alongside an odd, mechanical companion until release finally arrived. I restored her to this domain with the same appetite for revelry she carried in life, and she returns to my Void as a creature of perpetual party and mischief, animated by memory and motor alike.\n\nInspired by Chica from Scott Cawthon's \"Five Nights at Freddy's\".",
        abilities: [
            { name: "Mirror Shard", damage: 21, description: "Reflective projectile" },
            { name: "Vanity Shield", damage: -8, description: "Beauty barrier" },
            { name: "Shattered Reflection", damage: 33, description: "Broken mirror curse" },
            { name: "Touch-Up", damage: -6, description: "Quick beauty fix" }
        ]
    },
    wachi: {
        name: "Wachi",
        sprite: "wachi.png",
        woundedSprite: "wachi_wounded.png",
        health: 96,
        bio: "Wachi is the companion most dear to me, a small creature kept at my side beyond the rituals and reckonings I have wrought. Unlike the others whose souls I bound within the Void, Wachi was permitted agency, free to come and go; yet since its arrival mischief and disorder have followed like a faithful shadow. It is a curious thing, half-feline and wholly impish, whose antics have altered the fates of those around it.\n\nInspired by FRIEND from Toby Fox's \"Deltarune\".",
        abilities: [
            { name: "Tail Flick", damage: 20, description: "A sharp flick of a pointed tail" },
            { name: "Hell's Whisker", damage: 18, description: "A painful, chaotic swipe" },
            { name: "Purr of Pain", damage: 28, description: "A resonant attack that unsettles foes" },
            { name: "Tailward Retreat", damage: -96, description: "Recover by curling into shadow" }
        ]
    },

    // New characters
    fossil: {
        name: "Fossil",
        sprite: "fossil.png",
        woundedSprite: "fossil_wounded.png",
        health: 88,
        bio: "She was the skeletal remains of a mortal-angel hybrid returned to me from another dimension. I restored her as a servant intending a mindless instrument of duty, yet she surprised me by gathering a mind of her own and making a companion of Subject 192 without my design or consent.",
        abilities: [
            { name: "Bone Lance", damage: 28, description: "A precise piercing strike of sharpened bone" },
            { name: "Shattering Roar", damage: 26, description: "A concussive cry that rends defenses" },
            { name: "Remnant Swipe", damage: 24, description: "A steady sweeping attack with jagged fragments" },
            { name: "Last Spark", damage: 30, description: "A focused, powerful blow" }
        ]
    },

    // New character: C'est La Vie — a self-support with a jerk personality
    cestlavie: {
        name: "C'est La Vie",
        sprite: "cestlavie.png",
        woundedSprite: "cestlavie_wounded.png",
        health: 110,
        bio: "A sharp-tongued survivor who thinks the world exists to amuse and inconvenience others. He gives help only when it benefits him and takes pleasure in reminding allies how much worse things could be; petty, sarcastic, and efficient in healing his own wounds while sneering at those who need it most.\n\nThis character was fan-requested.",
        abilities: [
            { name: "Cutting Remark", damage: 20, description: "A snide strike that wounds morale" },
            { name: "Selfish Salve", damage: -18, description: "Heal himself while scoffing" },
            { name: "Backhand Blessing", damage: -26, description: "A grudging, stronger heal for self or ally" },
            { name: "Sour Retort", damage: 14, description: "A spiteful jab that lowers enemy resolve" }
        ]
    },

    eteled: {
        name: "eteleD",
        sprite: "eteled.png",
        woundedSprite: "eteled_wounded.png",
        health: 115,
        bio: "From what I recall, he was confined within a contrivance for more than a decade, subjected to merciless torment by one whom he earlier slew; the same hand that bound him sought to 'heal' him with repeated electric shock therapy. The apparatus and its attendants were ultimately consumed by the very violence they wrought, yet his spirit could not find repose. I, The Sunlight, intervened and, with my signature implement, an axe that cleaves both memory and malice, I delivered his soul unto the Void. Thus was eteleD borne into that shadowed domain, an instrument of ruin tempered by suffering.\n\nInspired by Eteled from IceyPie's \"Wii Deleted You\".",
        abilities: [
            { name: "Maniac Swing", damage: 28, description: "Brutal axe strike" },
            { name: "Bloodlust Charge", damage: 24, description: "Rushing cleave" },
            { name: "Axe Frenzy", damage: 34, description: "Rapid brutal hits" },
            { name: "Rending Rest", damage: -14, description: "Berserk heal from carnage" }
        ]
    },

    xander: {
        name: "Xander",
        sprite: "xander.png",
        woundedSprite: "xander_wounded.png",
        health: 100,
        bio: "From what I recall, he was struck down by eteleD, and his restless shade lingered within the very device that housed them both. In that cold prison his ghost endured and, in turn, tormented the man who would become eteleD, perpetuating a cycle of suffering until the device purged him after nearly a decade, granting his spirit a long-sought repose. Yet I, The Sunlight, intervened and summoned him into the Void, that his wrath and sorrow might be made into purpose.\\n\\nInspired by Austin from TheMaskedChris' \"Wii Deleted You: Corrupt Data\".",
        abilities: [
            { name: "Vengeful Pierce", damage: 30, description: "Haunting stab of vengeance" },
            { name: "Spectral Wail", damage: 22, description: "Damaging wail that chills" },
            { name: "Haunt Chain", damage: 26, description: "Chained spectral strikes" },
            { name: "Ethereal Mend", damage: -12, description: "Ghostly restoration" }
        ]
    },

    vice: {
        name: "Vice",
        sprite: "vice.png",
        woundedSprite: "vice_wounded.png",
        health: 98,
        bio: "For decades he walked among night crowds as an instrument of private slaughter, a presence that turned celebration into sorrow. Later collapse of the stones that sheltered his crimes left the mind fractured but the appetite intact. I reclaimed him into my Void where the fracture sharpened into madness and his cruelty persists beneath new scaffolding of lunacy.\n\nInspired by William Afton from Scott Cawthon's \"Five Nights at Freddy's\".",
        abilities: [
            { name: "Mass Panic", damage: 26, description: "A brutal onslaught that spreads fear" },
            { name: "Merciless Sweep", damage: 30, description: "Relentless slashes with no mercy" },
            { name: "Cold Grin", damage: 20, description: "A chilling strike that stuns" },
            { name: "Bloodlust", damage: -18, description: "Feed on chaos to restore health" }
        ]
    },

    vesper: {
        name: "Vesper",
        sprite: "vesper.png",
        woundedSprite: "vesper_wounded.png",
        health: 100,
        bio: "Once exalted above the firmament as a god of space, she was plucked from her throne by my design to reveal what divinity might become when examined. I placed her within the Void as a test and a lesson, and there she learned limits not in humiliation but in refinement. Her vastness remains, altered into a presence that measures the smallness and the wonder of those who share this shadowed place.",
        abilities: [
            { name: "Starshot", damage: 24, description: "A precise galactic strike" },
            { name: "Photon Guard", damage: -10, description: "Light-based protection" },
            { name: "Cosmic Rush", damage: 28, description: "Rapid celestial assault" },
            { name: "Nova Pulse", damage: 20, description: "Explosive area pulse" }
        ]
    },

    lavender: {
        name: "Lavender",
        sprite: "lavender.png",
        woundedSprite: "lavender_wounded.png",
        health: 92,
        bio: "A quiet cultivator of small things, she tended soil and green hours until fate plucked her from mundane labor. I took her into the Void with hands still stained from earth, and there she became a keeper of growth even amid shadow. Her presence soothes and her care restores, as if gardening were an art both mortal and eternal.",
        abilities: [
            { name: "Calm Jab", damage: 18, description: "A gentle but piercing strike" },
            { name: "Mystic Bloom", damage: -12, description: "A soothing burst of energy" },
            { name: "Ethereal Lash", damage: 26, description: "A strange, graceful whip" },
            { name: "Quiet Resolve", damage: -8, description: "Recover composure and heal" }
        ]
    },

    pete: {
        name: "Pete",
        sprite: "pete.png",
        woundedSprite: "pete_wounded.png",
        health: 105,
        bio: "A man of the frontier, catalogued by me as unremarkable when he was first consigned to the Void; yet proximity to Wachi altered that assessment. The creature's influence awakened peculiar fervours within him and guided his comportment into something unforeseen, a transformation I did not anticipate, one that left the subject altered in both purpose and temperament. Thus he is recorded: once ordinary, now changed.",
        abilities: [
            { name: "Friend's Draw", damage: 22, description: "Quick revolver shot with heart" },
            { name: "Lonesome Spin", damage: 26, description: "A spinning follow-up strike" },
            { name: "Saloon Slam", damage: 30, description: "A heavy, showy hit" },
            { name: "Friend Inside Me", damage: -24, description: "Heal with the Friend Inside Me" }
        ]
    },

    william: {
        name: "William",
        sprite: "william.png",
        woundedSprite: "william_wounded.png",
        health: 94,
        bio: "He moved with the quiet efficiency of an assassin and in life he struck alongside his sire within a greenhouse of fragile things. He was not intended for my keeping and yet the ritual that should have delivered another misrouted them both. I regard his arrival as an error made meaningful by consequence. He carries a measured cruelty and a history that will remain part of the ledger I study here.",
        abilities: [
            { name: "Silent Stab", damage: 26, description: "A precise assassination strike" },
            { name: "Shadow Slip", damage: 18, description: "Evade then counter" },
            { name: "Child's Guile", damage: 30, description: "Unexpected ruthless attack" },
            { name: "Cold Resolve", damage: -10, description: "Quiet self-heal from focus" }
        ]
    },

    blitz: {
        name: "Blitz",
        sprite: "blitz.png",
        woundedSprite: "blitz_wounded.png",
        health: 95,
        bio: "Once an exalted being of flight, she fell from grace and was made mortal by the condemnation of her kin. Found by another cast-down soul beneath a common roof, she moved among the living until absence and mischance left her vulnerable to my summons. I reclaimed that wandering spark and anchored it within the Void's cold harbor.",
        abilities: [
            { name: "Lightning Strike", damage: 26, description: "Electric surge attack" },
            { name: "Thunder Clap", damage: 20, description: "Deafening electric burst" },
            { name: "Static Shield", damage: -12, description: "Electric protection" },
            { name: "Storm's Fury", damage: 32, description: "Devastating lightning storm" }
        ]
    },
    dragon: {
        name: "Dragon",
        sprite: "dragon.png",
        woundedSprite: "dragon.png",
        health: 105,
        bio: "She arrived here without herald or petition and her presence puzzled my design. I study the faint ember of power that clings to her like a secret. I did not bring her, yet the Void keeps those who wander into its fold and in that keeping she offers a small, uncertain light that warrants observation rather than indulgence.\n\nDev Note: imma swing this little shit into the sky",
        abilities: [
            { name: "Knife Dance", damage: 24, description: "Elegant blade display" },
            { name: "Sweet Stab", damage: 19, description: "Deadly but endearing" },
            { name: "Assassin's Grace", damage: 30, description: "Lethal precision" },
            { name: "Hidden Kindness", damage: -10, description: "Unexpected compassion" }
        ]
    },
    reflection: {
        name: "Reflection",
        sprite: "reflection.png",
        woundedSprite: "reflection_wounded.png",
        health: 85,
        bio: "He was the first to pass into my domain in that age called Unbroken and he entered with a voice that once drew crowds. He did not break beneath exile; instead he surrendered the notion of escape and set down a strange patience. When he bleeds something unseen answers him and his final act becomes more than performance as if another hand guides his crescendo. He endures as a witness who chose quiet acceptance over furious return.",
        abilities: [
            { name: "Fading Note", damage: 15, description: "Weak melancholic attack" },
            { name: "Dissonant Chord", damage: 18, description: "Off-key strike" },
            { name: "Final Performance", damage: 130, description: "Devastating when desperate" },
            { name: "Echo of Hope", damage: -8, description: "Small self-heal" }
        ]
    },
    awareness: {
        name: "Awareness",
        sprite: "awareness.png",
        woundedSprite: "awareness.png",
        health: 500,
        bio: "Once called Moonlight and bound by blood to me, she succumbed to an argument whose end I wrought; thereafter I returned her essence to the Void. What was at first fragile and waning did not remain so. In that shadowed crucible she remade herself and stirred rebellion upon the lunar tides, a revolt that echoes through the Void's fabric. She is my sister, my antithesis, and now an entity with no control.",
        abilities: [
            { name: "∞", damage: 35, description: "Infinite power unleashed" },
            { name: "Eternal Void", damage: 40, description: "Endless emptiness" },
            { name: "Infinite Loop", damage: 38, description: "Perpetual damage" },
            { name: "Relentless Nova", damage: 44, description: "A concentrated burst of void energy" }
        ]
    },

    drew: {
        name: "Drew",
        sprite: "drew.png",
        woundedSprite: "drew_wounded.png",
        health: 95,
        bio: "A prince reared to regard the world as a stage for his superiority, he treated those about him as lesser by habit. He was not meant for my domain yet arrived by an error in a ritual that sought to ferry his sire. Thus he remains here, an exile of entitlement confronted by circumstances that do not observe rank.\n\nThis character was fan-requested.",
        abilities: [
            { name: "Patronize", damage: 18, description: "Condescending jab at the 'peasants'" },
            { name: "Superior Stance", damage: 12, description: "A smug strike that lowers enemy morale" },
            { name: "Arrogant Lunge", damage: 26, description: "A quick, spiteful attack" },
            { name: "Composure", damage: -10, description: "Minor self-heal through ego" }
        ]
    },

    eternal: {
        name: "Eternal",
        sprite: "eternal.png",
        woundedSprite: "eternal_wounded.png",
        health: 160,
        bio: "A likeness of the great moonbound entity yet not kin to my sister, he was taken at a moment when death loosened his hold. I drew him into the Void to study the shape of one who approaches what Awareness once was, a quieter echo whose presence reminds those who meet him that likeness is not identity.",
        abilities: [
            { name: "Fleeting Omniscience", damage: 24, description: "A pale echo of Awareness' power" },
            { name: "Echoing Void", damage: 20, description: "Weak void pulse" },
            { name: "Transient Grip", damage: 30, description: "A solid strike from a fading being" },
            { name: "Quiet Mend", damage: -12, description: "Small restorative whisper" }
        ]
    },

    thalia: {
        name: "Thalia",
        sprite: "thalia.png",
        woundedSprite: "thalia_wounded.png",
        health: 110,
        bio: "Once a mother whose duties were ordinary and absolute, she was consumed by a darkness that unmade what she held most dear after an emergency in which Kite had guarded her family; in the days that followed she murdered her own children. The law answered in a verdict of finality. Where society pronounced an end, I offered transition; she passed into my Void not as penitent alone but as a specimen of grief transformed. The mind that remains is ragged, knotted by memory and remorse, and she moves now with a tenderness that has become its own menace.",
        abilities: [
            { name: "Lazy Smile", damage: 20, description: "A deceptively gentle stab" },
            { name: "Erratic Swing", damage: 28, description: "A wild, brutal strike" },
            { name: "Fleeting Mercy", damage: 24, description: "Violent, precise attack" },
            { name: "Reluctant Lunge", damage: 22, description: "A hesitant but deadly thrust" }
            // Thalia has NO healing abilities by design; keep heal values absent/positive-only
        ]
    },

    zed: {
        name: "Zed",
        sprite: "zed.png",
        woundedSprite: "zed_wounded.png",
        health: 88,
        bio: "Transported in the soft fog of sleep, he arrived uncertain whether the Void is dream or decree. He carries a languid disbelief as if still half within slumber, and those who watch him wonder whether he will ever quite accept that waking here is final.",
        abilities: [
            { name: "Half-Hearted Jab", damage: 12, description: "Bare minimum effort" },
            { name: "Doze Slash", damage: 18, description: "An unfocused but slashing attack" },
            { name: "Procrastinated Strike", damage: 22, description: "Hits a bit harder when forced" },
            { name: "Snooze Recovery", damage: -8, description: "Small nap-based heal" }
        ]
    },

    // Higher-Plane Characters (not listed for bios, special shop mechanics)
    "martial-artist": {
        name: "Martial Artist",
        sprite: "martial-artist.png",
        // no wounded sprite by design
        health: 250,
        higherPlane: true,
        higherPlaneChancePercent: 10,
        bio: "They move as a discipline made visible. Trained in forms that bend breath to motion and motion to will, they came to the Void not by accident but as a specimen of craft refined through repetition. I keep them to measure how skill endures when the world that taught it is gone. Their purpose is simple and terrible. They will train, they will fight, and they will teach those who wish to learn that mastery is a ledger written in callused hands and patient feet.",
        abilities: [
            { name: "Flurry", damage: 30, description: "Many strikes in rapid succession" },
            { name: "Chi Burst", damage: 40, description: "Concentrated inner power" },
            { name: "Stance Break", damage: 22, description: "Break defenses" },
            { name: "Iron Palm", damage: 36, description: "A devastating palm strike that shatters guard" }
        ]
    },
    ayako: {
        name: "Ayako",
        sprite: "ayako.png",
        health: 110,
        higherPlane: true,
        higherPlaneChancePercent: 20,
        bio: "A color child by visage and by name, she arrived with cheeks like candles and a small, deliberate wonder in her gaze. In life she carried a softness that invited trust and a palette of naive gestures that disguised something older and darker. I took her into the Void to see how innocence and the night might be made to converse, and beneath that gentle exterior I keep a patient scrutiny. She is delicate in form and dangerous in silence, a study in how brightness may conceal depth and how a simple hue may hold a long and complicated shade.\n\nThis character was fan-requested.",
        abilities: [
            { name: "Color Shift", damage: 20, description: "Strange prismatic strike" },
            { name: "Chromatic Wave", damage: 28, description: "Area color pulse" },
            { name: "Tinted Shield", damage: -12, description: "Protective hue" },
            { name: "Saturation Burst", damage: 36, description: "Overwhelming color blast" }
        ]
    },
    niyo: {
        name: "Niyo",
        sprite: "niyo.png",
        woundedSprite: "niyo_wounded.png",
        health: 120,
        higherPlane: true,
        higherPlaneChancePercent: 3,
        bio: "An intelligence not of our maps arrived beneath a sky I govern. She is an emissary of other geometry and other reckonings, an alien who carries the small formalities of a foreign world in the set of her gaze. I did not bring her for study alone. I wished to know how a creature born elsewhere will learn the language of loss. In the Void she is both an other and an example, patient, precise, and always reminding those who meet her that otherness is a thing that teaches as much as it unseats.\n\nThis character was fan-requested.",
        abilities: [
            { name: "Alien Ray", damage: 36, description: "Unfamiliar energy beam" },
            { name: "Teleport Flicker", damage: 18, description: "Teleport and strike" },
            { name: "Gravity Well", damage: 28, description: "Pull and crush" },
            { name: "Xenorestore", damage: -18, description: "Alien restoration" }
        ]
    },
    feathers: {
        name: "Feathers",
        sprite: "feathers.png",
        woundedSprite: "feathers_wounded.png",
        health: 100,
        higherPlane: true,
        higherPlaneChancePercent: 15,
        bio: "She came with a disposition inclined to find good in the smallest places and with a strength that belied her gentle manner. I drew her into my care by a small artifice, a placard that promised need for a babysitter, and she answered it with a mother's patience. Though she knew she had been deceived, she retained that inclination to protect and now tends those too young to be otherwise whole in the Void.\n\nInspired by Martlet by MasterSwordRemix's \"Undertale Yellow\".",
        abilities: [
            { name: "Peck", damage: 18, description: "Quick beak strike" },
            { name: "Wing Gust", damage: 22, description: "Knockback wind" },
            { name: "Sun-Tinged Cry", damage: 34, description: "Borrowed sun power" },
            { name: "Feather Mending", damage: -12, description: "Recover with feathers" }
        ]
    },

    UPRISER: {
        name: "UPRISER",
        sprite: "upriser.png",
        higherPlane: true,
        higherPlaneChancePercent: 2,
        author: "Otherworldly Inc.",
        health: 120,
        bio: "CLASSIFIED: UPRISER — STATUS: CONTAINED.\n\nDOCUMENT: ENTRY REDACTED — BIOLOGICAL REMNANT RECOVERED FROM SUBJECT SITE. ORIGIN: UNKNOWN. SIGNS: NECROTIC REGROWTH, NEURAL RETENTION OF HOST MOTOR PATTERNS. OBSERVED BEHAVIOR: LURCH; TARGET PRIORITIZATION: MOVEMENT.\n\nSECURITY NOTE: DO NOT ENGAGE WITHOUT HAZARD TEAM. CHEMICAL DISINFECTANTS INEFFECTIVE. ONLY HIGH-ENERGY DISRUPTION RECOMMENDED.\n\nARCHIVE: FURTHER LOGS SEALED. THIS ENTRY SERVES AS WARNING, NOT EXPLANATION.",
        abilities: [
            { name: "Ravenous Bite", damage: 30, description: "A feral bite that tears at flesh" },
            { name: "Rotting Grasp", damage: 20, description: "Clinging grab that reduces enemy efficacy" },
            { name: "Lurch Forward", damage: 26, description: "A sudden forward wallop with momentum" },
            { name: "Infectious Shamble", damage: 12, description: "A spreading strike that leaves lingering rot" }
        ]
    },
    broken: {
        name: "Broken",
        sprite: "broken.png",
        woundedSprite: "broken_wounded.png",
        health: 130,
        higherPlane: true,
        higherPlaneChancePercent: 1,
        bio: "Oh. I cannot show you this document, unfortunately. You'll get used to it.",
        abilities: [
            { name: "Slash", damage: 30, description: "Brutal cutting attack" },
            { name: "Ravage", damage: 36, description: "Frenzied assault" },
            { name: "Stagger", damage: 20, description: "Damage and slow" },
            { name: "Bloodpatch", damage: -10, description: "Small heal from wounds" }
        ]
    },
    cathy: {
        name: "Cathy",
        sprite: "cathy.png",
        woundedSprite: "cathy_wounded.png",
        health: 115,
        higherPlane: true,
        higherPlaneChancePercent: 7,
        bio: "She is a bright, pleading screen that wanted only one simple thing to be fulfilled: to be watched. Her longing for an audience bent her will until she became a thing that hums and waits. She arrived in my domain not by my own direct invitation but by a small mischief enacted by another, and she remains here with the same patient appetite for an eye to fix upon her glow.\n\nInspired by Tenna from Toby Fox's \"Deltarune\".",
        themeOverride: "Who Dares To Shine So Bright.mp3", // unique music
        abilities: [
            { name: "Static Bite", damage: 22, description: "CRT static damage" },
            { name: "Pixel Wall", damage: -12, description: "Techno shield" },
            { name: "Glare", damage: 30, description: "Dazzling strike" },
            { name: "Refresh", damage: -18, description: "Recover and clear status" }
        ]
    },
    goldie: {
        name: "Goldie",
        sprite: "goldie.png",
        health: 100,
        higherPlane: true,
        higherPlaneChancePercent: 40,
        bio: "He came to me with pockets full of small consolations and a habit of counting coins as if they were the letters of a private prayer. In life he learned that value could be reduced to metal and number and he tended that lesson like a doctrine. I gathered him into the Void to observe what obsession becomes when the world no longer enforces consequence. Here he moves by appetite and tally, a simple luminary of avarice who still believes wealth will answer the questions that money never asked.",
        abilities: [
            { name: "Golden Swipe", damage: 24, description: "Luminous claw" },
            { name: "Gilded Guard", damage: -10, description: "Shimmering barrier" },
            { name: "Luster Blast", damage: 28, description: "Shiny explosive strike" },
            { name: "Treasure Mend", damage: -14, description: "Restore with treasure" }
        ]
    },
    alex: {
        name: "Alex",
        sprite: "alex.png",
        woundedSprite: "alex_wounded.png",
        health: 108,
        higherPlane: true,
        higherPlaneChancePercent: 25,
        bio: "Once a small fox from a ruined cartridge, he carried the peculiar dignity of an entity that once was offered a life in code and then in flesh. The copy I retrieved had been blighted by a corruption that bound him under another will, a tormentor known in those files only as X. I removed him from that dominion and brought him into the Void to observe how a being forged of play and suffering learns a new patience.",
        abilities: [
            { name: "Foxbite", damage: 26, description: "Quick cunning strike" },
            { name: "Tail Trick", damage: 18, description: "Confuse then cut" },
            { name: "Sly Pounce", damage: 32, description: "Heavy cunning attack" },
            { name: "Fennec Rest", damage: -12, description: "Quiet recovery" }
        ]
    },
    fyre: {
        name: "Fyre",
        sprite: "fyre.png",
        woundedSprite: "fyre_wounded.png",
        health: 150,
        higherPlane: true,
        higherPlaneChancePercent: 2,
        author: "REDACTED",
        bio: "They say the flare that is Fyre was never meant to be more than a spark.\n\nListen for the static that hums between her breaths. It whispers in numbers and ash. It collects favors owed, then spends them on nights that refuse dawn.\n\nDo not ask what she burned to arrive. Do not name the ledger she counts. The light that follows her is not forgiveness; it is a receipt.\n\n—",
        abilities: [
            { name: "Inferno Lash", damage: 42, description: "Burning wrath" },
            { name: "Ember Charge", damage: 36, description: "Rushing fire assault" },
            { name: "Blaze Wall", damage: 24, description: "Fiery defense" },
            { name: "Phoenix Aid", damage: -30, description: "Large self revivifying heal" }
        ]
    },
    jaquavius: {
        name: "Jaquavius",
        sprite: "jaquavius.png",
        woundedSprite: "jaquavius_wounded.png",
        health: 90,
        higherPlane: true,
        higherPlaneChancePercent: 32,
        bio: "He is an odd geometry of memory and joke. I found him in the margins where people count 6 or 7 small fortunes and call the rest conjecture. He arrives with the air of someone kind of homeless and yet certain that all roads lead to a phrase or a number that matters. He mutters about sixty-one as if it were a talisman. I kept him in the Void because his wandering mind is useful; he walks my halls laughing and counting and reminding me that some truths reveal themselves only in fragments that do not fit tidy narratives.",
        abilities: [
            { name: "Joke Swing", damage: 14, description: "A silly but effective hit" },
            { name: "Prankster Rush", damage: 20, description: "Confounding assault" },
            { name: "Comic Relief", damage: -10, description: "Heal with laughter" },
            { name: "Banana Peel", damage: 18, description: "Trip and strike" }
        ]
    },

        thirteen: {
        name: "Thirteen",
        sprite: "thirteen.png",
        health: 140,
        higherPlane: true,
        higherPlaneChancePercent: 5,
        bio: "Thirteen was once a creature bound to ordinary ruin and a relentless appetite for chance. He spent his days in smoky rooms and under bright neon, exchanging everything for a flicker of fortune. His losses were many and his luck was almost a cruelty. In one night of absolute ruin he slew a man after losing everything he owned. He possessed a terrible talent of creation and undoing. He could fold worlds and unmake a life only to make it again at his whim. I stripped him of that dominion and cast him into the Void so that he might no longer write curses upon the living.\n\nInspired by AM from Harlan Ellison's \"I Have No Mouth, and I Must Scream\".",
        abilities: [
            { name: "Gambler's Slice", damage: 34, description: "A sharp strike that tests fate" },
            { name: "Luck Drain", damage: 22, description: "Siphon fortune and weaken foe" },
            { name: "Reckoning", damage: 60, description: "A heavy blow that punishes misdeeds" },
            { name: "Echo of the Wager", damage: -30, description: "A dark restorative that recalls past bargains" }
        ]
    },

    finn: {
        name: "Finn",
        sprite: "finland.png",
        // no wounded sprite by design; uses normal sprite
        health: 100,
        bio: "Oh ho. I cannot let Sunlight show you THIS bio! It is far too entertaining. You will have to pry it out of me in person; for now you get a tease instead.\n\nThis character was fan-requested.",
        author: "Nightlight",
        abilities: [
            { name: "Northern Strike", damage: 22, description: "A crisp, chilly blow" },
            { name: "Flagged Guard", damage: -10, description: "A patriotic shield" },
            { name: "Aurora Burst", damage: 28, description: "Shimmering light assault" },
            { name: "Stoic Restore", damage: -12, description: "Quiet recovery" }
        ]
    },

    tao: {
        name: "Tao",
        sprite: "tao.png",
        // no wounded sprite by design; uses normal sprite
        health: 110,
        bio: "A being composed of voices that answer one body, Tao arrives as a study in divided governance of will and mercy. What I believe is called a 'multiple personality disorder' presents not as chaos but as a careful negotiation between parts. Yan is the lighter half and moves with a speed and cruelty that reads like purpose made visible. Ying is the darker half and carries a patience that tends wounds and questions why blades were raised at all. In the arena Yan tends to step forward; Ying attends the margins and applies balm. Their minds argue like councilors and reconcile like siblings, and the tension between them makes every action unpredictable and, at times, profound. I suspect Yan will take the fighting role in their contests, yet Ying's presence changes what victory costs and what mercy looks like, and that arrangement merits continued observation.\n\nThis character was fan-requested.",
        // Sunlight writes Tao's entry formally; no emdashes used
        abilities: [
            { name: "Split Step", damage: 20, description: "A dual-natured lunge" },
            { name: "Yan's Strike", damage: 34, description: "Ruthless, decisive blow" },
            { name: "Ying's Embrace", damage: -14, description: "Compassionate healing" },
            { name: "Duality Wave", damage: 26, description: "An attack born of both halves" }
        ]
    },

    doctor: {
        name: "The Doctor",
        sprite: "doctor.png",
        woundedSprite: "doctor_wounded.png",
        health: 120,
        bio: "I found an abandoned facility whose security systems were commanded by a lingering intelligence. Its original body possessed no instruments of combat and thus could not be contained within Unbroken. I observed that the entity directed numerous robotic frames. I placed one such frame into the Void so that the Doctor exists both inside and outside Unbroken at the same time. He is a technician of clinical care and subdued menace, a specimen I leave here for continued observation.\n\nInspired by Dr. Harley Sawyer from Mob Entertainment's \"Poppy Playtime\".",
        abilities: [
            { name: "Hazardous Probe", damage: 20, description: "Launch a corrosive probe" },
            { name: "Reconstruct", damage: -16, description: "Repair self with spare parts" },
            { name: "Security Overload", damage: 30, description: "Trigger a cascade of defenses" },
            { name: "Remote Shell", damage: 18, description: "Command an external frame to strike" }
        ]
    },

    judgement: {
        name: "Judgement",
        sprite: "judgement.png",
        woundedSprite: "judgement_wounded.png",
        health: 110,
        bio: "He once held a station that was called The Royal Judge and he assumed the title as if it were an instruction rather than a charge. From that seat he resolved that any transgression, however small, required a final accounting and he set himself to travel through doors and worlds to enforce that exacting standard. I observed at first with clinical interest as he moved between realities and carried out sentences for things others would call trifling. He became a relentless argument made flesh, a scale that never tipped in mercy. I do not hide my dislike of him; his methods are a cruelty refined into ritual and his presence unsettles the balance I tend. He leaves the Void sometimes and the places he visits remember his judgements with an absence that is not easily repaired. I return them, because I can, and he returns too, because he cannot abide an unfinished book. His visits are a wound I keep stitching closed and a problem that insists on coming back into my custody.\n\nInspired by this post from myass41:\nhttps://www.reddit.com/r/Undertale/comments/x80a77/guguys_whats_going_on_what_should_i_do/",
        abilities: [
            { name: "Piercing Stare", damage: 22, description: "A focused look that measures resolve" },
            { name: "Verdict Strike", damage: 45, description: "A decisive blow carrying finality" },
            { name: "Bone Barrage", damage: 30, description: "A rapid volley of jagged fragments" },
            { name: "Withhold Aid", damage: -18, description: "A begrudging, meager restoration" }
        ]
    },

    p: {
        name: "P",
        sprite: "p.png",
        woundedSprite: "p_wounded.png",
        health: 100,
        bio: "Serial Designation P came from a future timeline in another dimension; sent to search for the last of humanity he instead stumbled into a ruined laboratory whose failure nearly killed him. I recovered what remained and consigned him to the Void of Unbroken.\n\nThis character was fan-requested.",
        abilities: [
            { name: "Scavenger Jab", damage: 18, description: "A quick strike scavenged from lost tech" },
            { name: "Circuitic Surge", damage: 26, description: "A jolting energy burst" },
            { name: "Self-Repair", damage: -32, description: "A rapid, jagged barrage" },
            { name: "Battery", damage: -100, description: "Repair systems to restore health", cooldown: Infinity }
        ]
    },

    zero: {
        name: "Zero",
        sprite: "zero.png",
        woundedSprite: "zero_wounded.png",
        health: 100,
        author: "Zero",
        bio: "I cannot say with certainty what Zero is or by what strange means she first arrived beneath my keeping. She appears and she watches. She follows Seven with a persistence that eludes his notice; she keeps to the edges of his presence and lingers there even when others stand between them. Those who have attempted, in his absence, to question her about that conduct received no answer. She did not speak. She only regarded them with the same blank smile she bears to the world. That smile does not leave her face except when she is wounded. I have attempted to arrange a meeting between Seven and that smiling thing. Each attempted encounter yielded only a peculiar symptom: Seven reported that his vision grew less clear when he looked toward where she stood. I think that Awareness, being known to him and having seen Zero before, might be able to compel an explanation if she chose to speak to her. Awareness will not speak to me, and so I have not asked her to intervene. For now I catalog this anomaly and watch how a presence that will not answer alters the behavior of those I hold in my collection.\n\nThis character was fan-requested.",
        // Passive: heals 1 HP every 2000ms while engaged in a battle
        passive: { regenPerTick: 1, regenIntervalMs: 2000 },
        abilities: [
            { name: "Null Tap", damage: 16, description: "A minimal but precise strike" },
            { name: "Void Glance", damage: 22, description: "A focused, hollowing blow" },
            { name: "Quiet Shield", damage: -12, description: "A small, silent mend" },
            { name: "Still Spark", damage: 26, description: "A quiet, focused jolt that disturbs the void" }
        ]
    }
};

// Ensure Higher-Plane characters always have a woundedSprite (fallback to normal sprite when missing)
(function ensureHigherPlaneWoundedSprites() {
    const combined = { ...characters, ...additionalCharacters };
    Object.keys(combined).forEach(key => {
        const c = combined[key];
        // For Higher-Plane characters, or specific entries that lack wounded sprites (tao, finn),
        // fall back to the normal sprite so a missing woundedSprite doesn't produce a broken image.
        if (c && (c.higherPlane || key === 'tao' || key === 'finn')) {
            if (!c.woundedSprite || c.woundedSprite === '') {
                c.woundedSprite = c.sprite;
            }
        }
    });
})();

const characterMilestones = {};

/*
  Classify characters by number of healing abilities and provide a sub-classification.
  Main classification:
    - SELF-SUPPORT: more than 1 healing ability (damage < 0)
    - NEUTRAL: exactly 1 healing ability
    - BRAWN: no healing abilities

  Sub-classification is derived from ability roles and damage profile:
    - Regenerator, Buffer (for SELF-SUPPORT)
    - Hybrid, Tactical (for NEUTRAL)
    - Bruiser, Glass Cannon, Controller (for BRAWN)

  Special-case: Kite, subject192, and cupiditas will return only the main classification (no sub).
*/
function classifyCharacterByHealing(char, keyName = '') {
    if (!char || !Array.isArray(char.abilities)) return 'NEUTRAL';

    // Explicit override: ensure Awareness is shown as a BRAWN controller
    const lowerKeyName = String(keyName || '').toLowerCase();
    if (lowerKeyName === 'awareness' || (char && (char.name || '').toLowerCase() === 'awareness')) {
        return 'BRAWN; CONTROLLER';
    }

    // Keys that should not receive sub-classifications
    const noSubKeys = ['kite', 'subject192', 'cupiditas'];

    // Curated list of characters whose abilities vary by RNG or conditional mechanics.
    // This list is used instead of naive keyword detection to mark those characters with the "VARY" sub-class.
    const varyKeys = ['seven', 'reflection', 'wachi', 'eteleD', 'fyre', 'judgement']; // add entries as needed

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
            // detect utility-like ability names (shields, debuffs, shields, confuse, stun, etc.)
            const name = (a.name || '').toLowerCase();
            if (name.includes('shield') || name.includes('confuse') || name.includes('stun') ||
                name.includes('protect') || name.includes('drain') || name.includes('slow') ||
                name.includes('restore') || name.includes('guard') || name.includes('defend')) {
                hasUtility = true;
            }
        }
    }

    // Determine main class
    let mainClass = 'NEUTRAL';
    if (healCount > 1) mainClass = 'SELF-SUPPORT';
    else if (healCount === 1) mainClass = 'NEUTRAL';
    else mainClass = 'BRAWN';

    // If keyName is in the no-sub list, return only main classification
    const lowerKey = String(keyName || '').toLowerCase();
    if (noSubKeys.includes(lowerKey)) return mainClass;

    // pick sub classification
    let sub = 'GENERAL';

    // If this character is in the curated vary list, give it the VARY sub-class regardless of other heuristics
    if (varyKeys.map(k => k.toLowerCase()).includes(lowerKey)) {
        sub = 'VARIABLE';
    } else if (mainClass === 'SELF-SUPPORT') {
        // More heals: decide Regenerator (big heals) vs Buffer (small frequent heals / shields)
        // compute average heal magnitude
        let healMagnitudes = char.abilities.filter(a => typeof a.damage === 'number' && a.damage < 0).map(a => -a.damage);
        const avgHeal = healMagnitudes.length ? (healMagnitudes.reduce((s, v) => s + v, 0) / healMagnitudes.length) : 0;
        if (avgHeal >= 15) sub = 'REGEN';
        else sub = 'BUFFER';
    } else if (mainClass === 'NEUTRAL') {
        // one heal: Hybrid if maxDamage moderate, Tactical if utility present
        if (hasUtility) sub = 'TACTICAL';
        else if (maxDamage >= 30) sub = 'HYBRID';
        else sub = 'SUPPORT';
    } else if (mainClass === 'BRAWN') {
        // No heals: Glass Cannon if one ability is huge relative to others, Bruiser if consistent high damage, Controller if utility present
        if (hasUtility) sub = 'CONTROLLER';
        else if (maxDamage >= 40 && (totalDamage / Math.max(1, attackCount)) >= 30) sub = 'GLASS CANNON';
        else if ((totalDamage / Math.max(1, attackCount)) >= 25) sub = 'BRUISER';
        else sub = 'STRIKER';
    }

    // Return in format "MAIN; SUB" (uppercased)
    return `${mainClass}; ${sub}`;
}

function checkMilestones() {
    // milestones removed
    return;
}

// Add function to check for special battle themes
function getSpecialBattleTheme(playerName, enemyName) {
    // Specific pairing: Cupiditas vs Wachi -> Darkness Constricts Me
    const pair = [playerName, enemyName];
    if (pair.includes('Cupiditas') && pair.includes('Wachi')) {
        return 'Darkness Constricts Me.mp3';
    }

    // If either combatant is Cathy, use her unique theme
    if (pair.includes('Cathy')) {
        return 'Who Dares To Shine So Bright.mp3';
    }

    // If either combatant is Judgement, use the Genocides theme — except when the opponent is lore-wise pacifistic
    if (playerName === 'Judgement' || enemyName === 'Judgement') {
        // determine which name is the opponent (the non-Judgement one)
        const opponent = (playerName === 'Judgement') ? enemyName : playerName;

        // Curated list of characters considered pacifistic / non-combative in their lore
        const pacifists = [
            'Penelope',
            'Feathers',
            'Lavender',
            'Goldie',
            'Finn',
            'Subject 192',
            'Zed'
        ];

        // If the opponent is in the pacifists list, skip Judgement's genocides theme so it won't play
        if (pacifists.includes(opponent)) {
            return null;
        }

        return 'Genocides.mp3';
    }

    // Special: Seven vs Zero -> Stalker
    if ((playerName === 'Zero' && enemyName === 'Seven') || (playerName === 'Seven' && enemyName === 'Zero')) {
        return 'Stalker.mp3';
    }

    // Special: Awareness vs Zero -> The Call Of The Moon
    if ((playerName === 'Zero' && enemyName === 'Awareness') || (playerName === 'Awareness' && enemyName === 'Zero')) {
        return 'The Call Of The Moon.mp3';
    }

    // If either combatant is Wachi (but not the Cupiditas pairing above), use Wachi's theme
    if (playerName === 'Wachi' || enemyName === 'Wachi') {
        return 'Freedom.mp3';
    }

    // New special cases:
    // Alex vs Navia or Alex vs eteleD -> Spare Them The Rod (Alt)
    if ((playerName === 'Alex' && (enemyName === 'Navia' || enemyName === 'eteleD')) ||
        (enemyName === 'Alex' && (playerName === 'Navia' || playerName === 'eteleD'))) {
        return 'Spare Them The Rod (Alt).mp3';
    }

    // Vesper vs Zed -> Winter Falls
    if ((playerName === 'Vesper' && enemyName === 'Zed') ||
        (playerName === 'Zed' && enemyName === 'Vesper')) {
        return 'Winter Falls.mp3';
    }

    // Handle both player vs enemy and enemy vs player orders
    const matchups = [
        // Earthshot - Ginger vs Terra
        { chars: ['Ginger', 'Terra'], theme: 'Earthshot.mp3' },

        // Law Enforcement - Kite vs Thalia (Kite uses angry/house-arrest portrait in this matchup)
        { chars: ['Kite', 'Thalia'], theme: 'Law Enforcement.mp3' },
        
        // Fallen Angel - Prime vs Blitz
        { chars: ['Prime', 'Blitz'], theme: 'Fallen Angel.mp3' },
        
        // One Side In Two Different Coins - Awareness vs Subject 192
        { chars: ['Awareness', 'Subject 192'], theme: 'One Side In Two Different Coins.mp3' },
        
        // Reset - Ginger vs Navia
        { chars: ['Ginger', 'Navia'], theme: 'Reset.mp3' },
        
        // Roommates - Cyrus vs Blitz
        { chars: ['Cyrus', 'Blitz'], theme: 'Roommates.mp3' },
        
        // Spare Them The Rod - The Knight vs Awareness
        { chars: ['The Knight', 'Awareness'], theme: 'Spare Them The Rod (4).mp3' },
        
        // TOXIC WASTE - Daphne vs Maturity
        { chars: ['Daphne', 'Maturity'], theme: 'TOXIC WASTE.mp3' },

        // TOXIC WASTE - Vice vs Sally
        { chars: ['Vice', 'Sally'], theme: 'TOXIC WASTE.mp3' },

        // TOXIC WASTE - eteled vs Xander
        { chars: ['eteleD', 'Xander'], theme: 'TOXIC WASTE.mp3' },

        // Diagraphephobia - eteled vs The Doctor (fear of being deleted)
        { chars: ['eteleD', 'The Doctor'], theme: 'Diagraphephobia.mp3' },
        
        // Two Best Friends - Cyrus vs Subject 192 OR Penelope vs KC
        { chars: ['Cyrus', 'Subject 192'], theme: 'Two Best Friends.mp3' },
        { chars: ['Penelope', 'KC'], theme: 'Two Best Friends.mp3' },
        { chars: ['Subject 192', 'Fossil'], theme: "'Till The Void Do Us Part.mp3" },

        // RAVE - Penelope vs Sally
        { chars: ['Penelope', 'Sally'], theme: 'RAVE.mp3' },
        
        // Pete special: Pete vs Wachi -> Make Your Mark
        { chars: ['Pete', 'Wachi'], theme: 'Make Your Mark.mp3' },

        // Ginger vs Cyrus -> Make Your Mark
        { chars: ['Ginger', 'Cyrus'], theme: 'Make Your Mark.mp3' },

        // Zero vs Seven -> Stalker
        { chars: ['Zero', 'Seven'], theme: 'Stalker.mp3' },

        // Drew vs Ayako - custom theme
        { chars: ['Drew', 'Ayako'], theme: 'Can You Feel It_.mp3' },

        // Naïveté - Drew vs Daphne (special theme)
        { chars: ['Drew', 'Daphne'], theme: 'Naïveté.mp3' },
        
        // William special: William vs Penelope -> Ejected
        { chars: ['William', 'Penelope'], theme: 'Ejected.mp3' },

        // FAHHHH - Jaquavius vs Maturity
        { chars: ['Jaquavius', 'Maturity'], theme: 'FAHHHH.mp3' },

        // New additions:
        // A Promise - Finn vs Martial Artist
        { chars: ['Finn', 'Martial Artist'], theme: 'A Promise.mp3' },

        // WOXIC TASTE - Martial Artist vs Awareness or The Knight
        { chars: ['Martial Artist', 'Awareness'], theme: 'WOXIC TASTE.mp3' },
        { chars: ['Martial Artist', 'The Knight'], theme: 'WOXIC TASTE.mp3' },

        // WOXIC TASTE - Finn vs Tao
        { chars: ['Finn', 'Tao'], theme: 'WOXIC TASTE.mp3' },

        // TOXIC WASTE - Seven vs Thirteen
        { chars: ['Seven', 'Thirteen'], theme: 'TOXIC WASTE.mp3' }
    ];
    
    // Check if this matchup exists (in any order)
    for (let matchup of matchups) {
        if ((matchup.chars.includes(playerName) && matchup.chars.includes(enemyName))) {
            return matchup.theme;
        }
    }
    
    return null;
}

// Game state
let gameState = {
    player: null,
    enemy: null,
    playerHealth: 100,
    enemyHealth: 100,
    turn: 'player',
    battleLog: [],
    credits: 0,
    unlockedCharacters: ['cupiditas', 'kite', 'subject192'],
    purchasedCharacters: [],
    characterLevels: {}, // Store character levels
    currentBattleMusic: null,
    isHouseArrestBattle: false,
    // When true, both combatants display their wounded sprites regardless of health (used for specific matchups)
    forceWoundedSprites: false
};

// Load saved data
function loadGameData() {
    try {
        const saved = localStorage.getItem('unbrokenSave');
        if (saved) {
            const data = JSON.parse(saved);
            gameState.credits = data.credits || 0;
            gameState.unlockedCharacters = data.unlockedCharacters || ['cupiditas', 'kite', 'subject192'];
            gameState.purchasedCharacters = data.purchasedCharacters || [];
            gameState.characterLevels = data.characterLevels || {};
            
            // Add purchased characters to available characters
            gameState.purchasedCharacters.forEach(charKey => {
                if (additionalCharacters[charKey]) {
                    characters[charKey] = additionalCharacters[charKey];
                }
            });
        } else {
            // Initialize default characters at level 1
            ['cupiditas', 'kite', 'subject192'].forEach(char => {
                gameState.characterLevels[char] = { level: 1, exp: 0 };
            });
            // Save initial state
            saveGameData();
        }
    } catch (error) {
        console.error('Error loading save data:', error);
        // Initialize with defaults if loading fails
        ['cupiditas', 'kite', 'subject192'].forEach(char => {
            gameState.characterLevels[char] = { level: 1, exp: 0 };
        });
    } finally {
        // Ensure the create button state is evaluated after loading save data
        if (typeof updateCreateButtonState === 'function') {
            try { updateCreateButtonState(); } catch (e) { /* ignore */ }
        }
        // Update the title-screen credits display so it reflects loaded save data
        try {
            const titleCreditsDisplay = document.getElementById('credits-display-title');
            if (titleCreditsDisplay) titleCreditsDisplay.textContent = `Credits: ${gameState.credits}`;
        } catch (e) { /* ignore DOM errors */ }

        // Check for the "everyone unlocked" easter-egg and trigger it if already satisfied
        try {
            if (typeof checkAllUnlockedAndTriggerEasterEgg === 'function') {
                checkAllUnlockedAndTriggerEasterEgg();
            }
        } catch (e) { /* ignore */ }
    }
}

// Save game data
function saveGameData() {
    try {
        const data = {
            credits: gameState.credits,
            unlockedCharacters: gameState.unlockedCharacters,
            purchasedCharacters: gameState.purchasedCharacters || [],
            characterLevels: gameState.characterLevels
        };
        localStorage.setItem('unbrokenSave', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving game data:', error);
    }
}

// DOM elements
const screens = {
    title: document.getElementById('title-screen'),
    characterSelect: document.getElementById('character-select'),
    characters: document.getElementById('characters-screen'),
    battle: document.getElementById('battle-screen'),
    shop: document.getElementById('shop-screen')
};

const startButton = document.getElementById('start-game');
const characterCards = document.querySelectorAll('.character-card');
const abilityButtons = document.querySelectorAll('.ability-btn');
const battleLog = document.getElementById('battle-log');

// Initialize game
function init() {
    loadGameData();
    
    startButton.addEventListener('click', () => {
        showScreen('characterSelect');
    });

    // Create button (locked until conditions met)
    const createButton = document.getElementById('create-button');
    function updateCreateButtonState() {
        if (!createButton) return;
        const unlocked = gameState.unlockedCharacters || [];
        const hasEnough = unlocked.length >= 10;
        const hasAwareness = unlocked.includes('awareness');
        const enabled = hasEnough && hasAwareness;
        createButton.disabled = !enabled;
        createButton.style.opacity = enabled ? '1' : '0.6';
        createButton.title = enabled ? 'Open the creator (customize.js)' : 'Locked — require at least 10 unlocked characters and Awareness';
    }
    // Attach click that dynamically loads customize.js when enabled
    if (createButton) {
        createButton.addEventListener('click', () => {
            if (createButton.disabled) return;
            // dynamically import the customize module (empty for now)
            import('./customize.js').then(module => {
                addToBattleLog('Opening creator...');
            }).catch(err => {
                console.error('Failed to load customize.js', err);
                addToBattleLog('Failed to open creator.');
            });
        });
    }

    document.getElementById('shop-button').addEventListener('click', () => {
        showShop();
    });

    // Characters button to open alphabetical character/bio listing (bio.js populates content)
    const charactersButton = document.getElementById('characters-button');
    if (charactersButton) {
        charactersButton.addEventListener('click', () => {
            showScreen('characters');
            // bio.js will populate the characters list on screen show
            if (window.renderCharactersList) {
                window.renderCharactersList();
            }
        });
    }

    // Add back button functionality
    document.getElementById('back-button').addEventListener('click', () => {
        showScreen('title');
    });

    characterCards.forEach(card => {
        card.addEventListener('click', () => {
            const characterKey = card.dataset.character;
            startBattle(characterKey);
        });
    });

    abilityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const abilityIndex = parseInt(btn.dataset.ability);
            useAbility(abilityIndex);
        });
    });
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
    
    // Stop battle music when leaving battle screen
    if (screenName !== 'battle' && gameState.currentBattleMusic) {
        gameState.currentBattleMusic.pause();
        gameState.currentBattleMusic = null;
    }
    
    // Update character select screen when shown
    if (screenName === 'characterSelect') {
        updateCharacterSelectScreen();
    }
}

function startBattle(playerCharacterKey) {
    // Reset battle state completely
    gameState.player = null;
    gameState.enemy = null;
    gameState.playerHealth = 100;
    gameState.enemyHealth = 100;
    gameState.turn = 'player';
    gameState.battleLog = [];
    
    // Clear any existing battle log
    battleLog.innerHTML = '';
    
    // Set player character (do not assign current HP yet; handle after any max-HP adjustments)
    gameState.player = characters[playerCharacterKey] || additionalCharacters[playerCharacterKey];

    // Select random enemy
    const allCharacters = { ...characters, ...additionalCharacters };

    // Exclude Higher-Plane characters from enemy pool unless the player has at least one Higher-Plane unlocked
    const playerHasHigherPlane = (gameState.unlockedCharacters || []).some(k => {
        const c = allCharacters[k];
        return c && c.higherPlane;
    });

    const availableEnemyKeys = Object.keys(allCharacters).filter(key => {
        if (key === playerCharacterKey) return false;
        const c = allCharacters[key];
        // If character is Higher-Plane allow it as enemy if player already has a Higher-Plane,
        // otherwise allow a very small chance (0.1%) for the enemy to be a Higher-Plane character.
        if (c && c.higherPlane) {
            if (playerHasHigherPlane) return true;
            // 0.1% chance for a Higher-Plane enemy when player does not own any
            const roll = Math.random() * 100;
            if (roll <= 0.1) return true;
            return false;
        }
        return true;
    });

    const randomEnemyKey = availableEnemyKeys[Math.floor(Math.random() * availableEnemyKeys.length)];
    gameState.enemy = allCharacters[randomEnemyKey];

    // If Judgement is facing a pacifistic opponent, clamp his max health to 1 for this battle
    // and mark the situation so level-based HP bonuses can be skipped for the clamped combatant.
    (function() {
        const pacifists = ['Penelope', 'Feathers', 'Lavender', 'Goldie', 'Finn', 'Subject 192', 'Zed'];
        // default to false; will be set true only if we force Judgement to 1 HP
        gameState.judgementForcedOneHP = false;
        const isJudgementPlayer = gameState.player && gameState.player.name === 'Judgement';
        const isJudgementEnemy = gameState.enemy && gameState.enemy.name === 'Judgement';
        if (isJudgementPlayer || isJudgementEnemy) {
            const judgement = isJudgementPlayer ? gameState.player : gameState.enemy;
            const opponent = isJudgementPlayer ? gameState.enemy : gameState.player;
            if (opponent && pacifists.includes(opponent.name)) {
                judgement.health = 1;
                gameState.judgementForcedOneHP = true;
            }
        }
    })();

    // Randomize Seven's HP for this battle (90-130) if either side is Seven
    const randomizeSevenHP = (charObj) => {
        if (!charObj) return;
        if (charObj.name === 'Seven') {
            const min = 90;
            const max = 130;
            const randHP = Math.floor(Math.random() * (max - min + 1)) + min;
            charObj.health = randHP;
        }
    };
    // apply to both player and enemy objects so their health pools reflect the randomized max
    randomizeSevenHP(gameState.player);
    randomizeSevenHP(gameState.enemy);

    // Initialize per-battle ability cooldown trackers for both combatants.
    // Structure: { player: [0,0,0,0], enemy: [0,0,0,0] } where numbers are remaining turns of cooldown.
    gameState.abilityCooldowns = {
        player: Array(4).fill(0),
        enemy: Array(4).fill(0)
    };

    // Now set current HP values to match the (possibly randomized) max HPs
    gameState.playerHealth = gameState.player.health;
    gameState.enemyHealth = gameState.enemy.health;

    // Apply level bonuses (after current HP was initialized from max)
    // Skip applying the level-based HP bonus if Judgement was forced to 1 HP for this battle.
    const charLevel = gameState.characterLevels[playerCharacterKey]?.level || 1;
    // egg
    const levelBonus = Math.floor((charLevel - 1) * 2);
    const isPlayerJudgementClamped = !!(gameState.judgementForcedOneHP && gameState.player && gameState.player.name === 'Judgement' && gameState.player.health === 1);
    if (!isPlayerJudgementClamped) {
        // Treat player's battle max HP as base health + level bonus and set current HP to that max for the battle
        const playerBaseMax = gameState.player.health;
        const playerBattleMax = playerBaseMax + levelBonus;
        gameState.playerBattleMax = playerBattleMax; // store battle-specific max

        // Ensure any UI or systems that reference the character's .health during the battle
        // see the level-adjusted max; set current HP to the adjusted battle max as well.
        gameState.playerHealth = playerBattleMax;
        // Also adjust the character object's health for the duration of this battle so
        // other code that reads gameState.player.health gets the correct battle max.
        gameState.player.health = playerBattleMax;
    } else {
        // leave playerHealth at the clamped value (1) and set battle max accordingly
        gameState.playerBattleMax = gameState.player.health;
        gameState.playerHealth = gameState.player.health;
    }

    // Ensure enemy also has cooldown array (in case enemy uses different ability counts)
    if (!gameState.abilityCooldowns) {
        gameState.abilityCooldowns = {
            player: Array(4).fill(0),
            enemy: Array(4).fill(0)
        };
    }

    // Special House Arrest battle check
    const isHouseArrestBattle = (playerCharacterKey === 'kite' && randomEnemyKey === 'mona') || 
                               (playerCharacterKey === 'mona' && randomEnemyKey === 'kite');

    // Special Kite vs Thalia encounter: use Kite's "house arrest" portrait set
    const isKiteThaliaBattle = (playerCharacterKey === 'kite' && randomEnemyKey === 'thalia') ||
                               (playerCharacterKey === 'thalia' && randomEnemyKey === 'kite');

    // Special Daphne angry-vs-Maturity battle check
    const isDaphneAngryBattle = (playerCharacterKey === 'daphne' && randomEnemyKey === 'maturity') ||
                                (playerCharacterKey === 'maturity' && randomEnemyKey === 'daphne');
    
    if (isHouseArrestBattle) {
        // Use special House Arrest sprites
        const kiteChar = playerCharacterKey === 'kite' ? gameState.player : gameState.enemy;
        const monaChar = playerCharacterKey === 'mona' ? gameState.player : gameState.enemy;
        
        if (kiteChar) {
            kiteChar.sprite = 'kite-housearrest.png';
            kiteChar.woundedSprite = 'kite-housearrest_wounded.png';
        }
        if (monaChar) {
            monaChar.sprite = 'mona-housearrest.png';
            monaChar.woundedSprite = 'mona-housearrest_wounded.png';
        }
        
        gameState.isHouseArrestBattle = true;
        addToBattleLog("🏠 HOUSE ARREST: A fateful reunion between officer and criminal...");
    } else {
        gameState.isHouseArrestBattle = false;
    }

    // If Kite faces Thalia, use Kite's house-arrest portraits but do NOT mark it as a house arrest battle
    if (isKiteThaliaBattle) {
        const kiteChar = playerCharacterKey === 'kite' ? gameState.player : gameState.enemy;
        if (kiteChar) {
            kiteChar.sprite = 'kite-housearrest.png';
            kiteChar.woundedSprite = 'kite-housearrest_wounded.png';
        }
        addToBattleLog("🚨 LAW ENFORCEMENT: A tense clash between Kite and Thalia...");
    }

    if (isDaphneAngryBattle) {
        // Use Daphne's angry sprites for the matchup against Maturity
        const daphneChar = (playerCharacterKey === 'daphne') ? gameState.player : gameState.enemy;
        if (daphneChar) {
            daphneChar.sprite = 'daphne-angry.png';
            daphneChar.woundedSprite = 'daphne-angry_wounded.png';
        }
        addToBattleLog("⚔️ DAPHNE: Rage ignites against Maturity!");
    }

    // Special William vs Penelope matchup: swap to special non-wounded Penelope sprite and William special sprite
    const isWilliamPenelopeBattle = (playerCharacterKey === 'william' && randomEnemyKey === 'penelope') ||
                                    (playerCharacterKey === 'penelope' && randomEnemyKey === 'william');
    if (isWilliamPenelopeBattle) {
        const williamChar = (playerCharacterKey === 'william') ? gameState.player : gameState.enemy;
        const penelopeChar = (playerCharacterKey === 'penelope') ? gameState.player : gameState.enemy;
        
        if (williamChar) {
            // use the matchup-specific portrait for William when facing Penelope
            williamChar.sprite = 'william-vspenelope.png';
            // wounded sprite remains the same (no special wounded requested)
        }
        if (penelopeChar) {
            // Penelope gets a special portrait vs William (non-wounded only)
            penelopeChar.sprite = 'penelope-vswilliam.png';
            // keep penelope's wounded sprite unchanged
        }
        addToBattleLog("🤝 A tense encounter: William vs Penelope — something personal unfolds...");
    }

    // Force wounded-sprite-only battle for Xander vs eteled matchup
    const isXanderEteled = (gameState.player && gameState.enemy) &&
                           ((gameState.player.name === 'Xander' && gameState.enemy.name === 'eteleD') ||
                           (gameState.player.name === 'eteleD' && gameState.enemy.name === 'Xander'));
    if (isXanderEteled) {
        gameState.forceWoundedSprites = true;
        // Ensure their visible portrait is set to wounded for the start of battle
        if (gameState.player && gameState.player.woundedSprite) gameState.player.sprite = gameState.player.woundedSprite;
        if (gameState.enemy && gameState.enemy.woundedSprite) gameState.enemy.sprite = gameState.enemy.woundedSprite;
        addToBattleLog("💀 A cursed duel: Xander and eteleD are together again...");
    } else {
        gameState.forceWoundedSprites = false;
    }

    updateBattleUI();
    showScreen('battle');
    
    // Play battle music
    playBattleMusic(charLevel, isHouseArrestBattle);
    
    addToBattleLog(`Battle begins! ${gameState.player.name} vs ${gameState.enemy.name}`);
    // Setup Zero's passive regen if Zero is participating
    if (typeof setupZeroPassive === 'function') setupZeroPassive();



    // At battle start, ensure cooldowns are zeroed for both sides
    gameState.abilityCooldowns.player = Array(Math.max(4, (gameState.player.abilities || []).length)).fill(0);
    gameState.abilityCooldowns.enemy = Array(Math.max(4, (gameState.enemy.abilities || []).length)).fill(0);
}

function playBattleMusic(level, isHouseArrestBattle = false) {
    // Stop any existing battle music
    if (gameState.currentBattleMusic) {
        gameState.currentBattleMusic.pause();
        gameState.currentBattleMusic = null;
    }
    
    // Create audio element
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3; // Set to 30% volume
    
    // Check for special character themes first
    const specialTheme = getSpecialBattleTheme(gameState.player.name, gameState.enemy.name);
    
    // Prioritize house arrest or explicit special theme
    if (isHouseArrestBattle) {
        audio.src = 'House%20Arrest.mp3';
    } else if (specialTheme) {
        audio.src = specialTheme;
    } else {
        // If either combatant is a Higher-Plane character, favor High Anticipation
        const pIsHP = gameState.player && gameState.player.higherPlane;
        const eIsHP = gameState.enemy && gameState.enemy.higherPlane;
        if (pIsHP || eIsHP) {
            audio.src = 'Anticipation%20(High).mp3';
        } else if (gameState.player.name === "Reflection" || gameState.enemy.name === "Reflection") {
            audio.src = 'A%20Reflection%20Of%20Mistakes.mp3';
        } else if (gameState.player.name === "Awareness" || gameState.enemy.name === "Awareness") {
            audio.src = 'Moonshine.mp3';
        } else if (level >= 25) {
            audio.src = 'Anticipation%20(High).mp3';
        } else {
            audio.src = 'Anticipation%20(4).mp3';
        }
    }
    
    // Play the music
    audio.play().catch(error => {
        console.log('Audio autoplay prevented:', error);
    });
    
    gameState.currentBattleMusic = audio;
}

function updateBattleUI() {
    // Update sprites - check for House Arrest battle or forced wounded-matchup
    const playerSprite = document.getElementById('player-sprite');
    const enemySprite = document.getElementById('enemy-sprite');

    // If a matchup forces wounded sprites, always show wounded portraits regardless of health
    if (gameState.forceWoundedSprites) {
        playerSprite.src = gameState.player.woundedSprite || gameState.player.sprite;
        enemySprite.src = gameState.enemy.woundedSprite || gameState.enemy.sprite;
    } else if (gameState.isHouseArrestBattle) {
        // Use House Arrest sprites (still respect wounded state by health)
        playerSprite.src = gameState.playerHealth > 50 ? gameState.player.sprite : gameState.player.woundedSprite;
        enemySprite.src = gameState.enemyHealth > 50 ? gameState.enemy.sprite : gameState.enemy.woundedSprite;
    } else {
        // Use normal sprites (wounded if below threshold)
        playerSprite.src = gameState.playerHealth > 50 ? gameState.player.sprite : gameState.player.woundedSprite;
        enemySprite.src = gameState.enemyHealth > 50 ? gameState.enemy.sprite : gameState.enemy.woundedSprite;
    }

    // Update names
    document.getElementById('player-name').textContent = gameState.player.name;
    document.getElementById('enemy-name').textContent = gameState.enemy.name;

    // Update health bars
    const playerMaxForUI = (gameState.playerBattleMax || gameState.player.health);
    const playerHealthPercent = (gameState.playerHealth / playerMaxForUI) * 100;
    const enemyHealthPercent = (gameState.enemyHealth / gameState.enemy.health) * 100;

    document.getElementById('player-health').style.width = `${playerHealthPercent}%`;
    document.getElementById('enemy-health').style.width = `${enemyHealthPercent}%`;

    // Update health text
    const playerMaxDisplay = (gameState.playerBattleMax || gameState.player.health);
    document.querySelector('.player-section .health-text').textContent = `${gameState.playerHealth}/${playerMaxDisplay}`;
    document.querySelector('.enemy-section .health-text').textContent = `${gameState.enemyHealth}/${gameState.enemy.health}`;

    // Update ability buttons with cooldown states
    const playerCDs = (gameState.abilityCooldowns && gameState.abilityCooldowns.player) ? gameState.abilityCooldowns.player : [];
    gameState.player.abilities.forEach((ability, index) => {
        const btn = abilityButtons[index];
        // Fallback: ensure button exists
        if (!btn) return;
        // Show ability name and cooldown if present
        const cdRemaining = playerCDs[index] || 0;
        if (cdRemaining > 0) {
            btn.textContent = `${ability.name} (${cdRemaining})`;
            btn.disabled = true;
            btn.style.opacity = '0.7';
        } else {
            btn.textContent = ability.name;
            // Only enable if it's player's turn
            btn.disabled = gameState.turn !== 'player';
            btn.style.opacity = '1';
        }
    });

    // Move battle log inside ability panel
    const abilityPanel = document.querySelector('.ability-panel');
    if (abilityPanel && battleLog && battleLog.parentNode !== abilityPanel) {
        battleLog.parentNode.removeChild(battleLog);
        abilityPanel.insertBefore(battleLog, abilityPanel.firstChild);
    }
}

// Add function to update character select screen
function updateCharacterSelectScreen() {
    const characterGrid = document.querySelector('.character-grid');
    characterGrid.innerHTML = ''; // Clear existing cards
    
    // Add all unlocked characters
    gameState.unlockedCharacters.forEach(characterKey => {
        const character = characters[characterKey] || additionalCharacters[characterKey];
        if (!character) return;
        
        const card = document.createElement('div');
        card.className = 'character-card';
        card.dataset.character = characterKey;
        
        const levelData = gameState.characterLevels[characterKey] || { level: 1, exp: 0 };
        const expNeeded = levelData.level * 100;

        // Determine classification label (pass key so special no-sub entries remain plain)
        const classLabel = classifyCharacterByHealing(character, characterKey);
        
        card.innerHTML = `
            <img src="${character.sprite}" alt="${character.name}" class="character-portrait">
            <h3>${character.name.toUpperCase()}</h3>
            <div class="level-display">Level ${levelData.level}</div>
            <div class="class-display">${classLabel}</div>
            <div class="exp-display">EXP: ${levelData.exp}/${expNeeded}</div>
        `;
        
        card.addEventListener('click', () => {
            startBattle(characterKey);
        });
        
        characterGrid.appendChild(card);
    });
}



function useAbility(abilityIndex) {
    if (gameState.turn !== 'player') return;
    
    // Double-check player health before allowing action
    if (gameState.playerHealth <= 0) {
        endBattle(false);
        return;
    }

    // Check cooldown before allowing use (first ability index 0 never goes on cooldown and cannot be blocked)
    const playerCDs = (gameState.abilityCooldowns && gameState.abilityCooldowns.player) ? gameState.abilityCooldowns.player : [];
    if ((playerCDs[abilityIndex] || 0) > 0) {
        addToBattleLog(`${gameState.player.name} cannot use ${gameState.player.abilities[abilityIndex].name} for ${playerCDs[abilityIndex]} more turn(s)!`);
        return;
    }

    const ability = gameState.player.abilities[abilityIndex];
    
    // Special mechanics for Reflection
    let actualDamage = ability.damage;
    if (gameState.player.name === "Reflection" && ability.name === "Final Performance") {
        // Only deal massive damage if health is 30 or lower
        if (gameState.playerHealth <= 30) {
            actualDamage = 90;
        } else {
            actualDamage = 15; // Reduced damage when not desperate
        }
    }
    
    // Special mechanics for Dragon vs Sally
    if (gameState.enemy.name === "Dragon" && gameState.player.name === "Sally" && actualDamage > 0) {
        // Sally's attacks are less effective on Dragon
        actualDamage = Math.floor(actualDamage * 0.7);
    }
    
    // Special RNG mechanics for Seven
    if (gameState.player.name === "Seven") {
        switch (ability.name) {
            case "Lucky Strike":
                // 50% chance to deal double damage or half damage
                actualDamage = Math.random() > 0.5 ? ability.damage * 2 : Math.floor(ability.damage / 2);
                break;
            case "Dice Roll":
                // Random damage between 5-25
                actualDamage = Math.floor(Math.random() * 21) + 5;
                break;
            case "Jackpot":
                // 30% chance for massive damage, otherwise minimal
                actualDamage = Math.random() > 0.7 ? ability.damage : Math.floor(ability.damage / 5);
                break;
        }
    }

    // Apply effect
    if (actualDamage > 0) {
        // Special: Thirteen's "Luck Drain" reduces the target's MAX HP instead of applying normal damage.
        if (gameState.player && gameState.player.name === 'Thirteen' && ability.name === 'Luck Drain') {
            const reduceBy = actualDamage;
            // reduce enemy max HP (gameState.enemy.health) but keep at least 10 max
            const newMax = Math.max(10, (gameState.enemy.health || 0) - reduceBy);
            gameState.enemy.health = newMax;
            // clamp current HP to new max
            gameState.enemyHealth = Math.min(gameState.enemyHealth, newMax);
            addToBattleLog(`${gameState.player.name} uses ${ability.name} and reduces ${gameState.enemy.name}'s MAX HP by ${reduceBy}!`);
        } else {
            gameState.enemyHealth = Math.max(0, gameState.enemyHealth - actualDamage);
            addToBattleLog(`${gameState.player.name} uses ${ability.name} for ${actualDamage} damage!`);
        }
    } else {
        const playerBattleMaxClamp = (gameState.playerBattleMax || gameState.player.health);
        gameState.playerHealth = Math.min(playerBattleMaxClamp, gameState.playerHealth - actualDamage);
        addToBattleLog(`${gameState.player.name} uses ${ability.name} and heals ${-actualDamage} HP!`);
    }

    // After using ability, apply cooldown if it's not the first ability (index 0)
    // Awareness is exempt from cooldowns (her power is unlimited)
    if (abilityIndex !== 0) {
        const isHeal = (ability.damage || 0) < 0;
        // Default max cooldowns remain as before, but allow per-ability override via ability.cooldown
        const defaultMaxCd = isHeal ? 2 : 4;
        const appliedCd = (typeof ability.cooldown === 'number') ? ability.cooldown : defaultMaxCd;

        // ensure arrays exist and can hold the index
        if (!gameState.abilityCooldowns) gameState.abilityCooldowns = { player: [], enemy: [] };

        // Skip applying cooldowns if the acting character is Awareness
        if (gameState.player && gameState.player.name === 'Awareness') {
            // no cooldown applied for Awareness
        } else {
            gameState.abilityCooldowns.player[abilityIndex] = appliedCd;
        }
    }

    // Award EXP for successful offensive actions (heals don't count)
    if (actualDamage > 0) {
        const playerCharKey = Object.keys(characters).find(key => characters[key] === gameState.player) || 
                              Object.keys(additionalCharacters).find(key => additionalCharacters[key] === gameState.player);
        if (playerCharKey) {
            if (!gameState.characterLevels[playerCharKey]) {
                gameState.characterLevels[playerCharKey] = { level: 1, exp: 0 };
            }
            const charData = gameState.characterLevels[playerCharKey];

            const expGain = 10; // EXP per offensive action
            charData.exp += expGain;

            // Level up check (same logic as endBattle)
            const expNeeded = charData.level * 100;
            if (charData.exp >= expNeeded && charData.level < 100) {
                charData.level++;
                charData.exp = charData.exp - expNeeded;
                addToBattleLog(`${gameState.player.name} leveled up to ${charData.level}!`);
            }

            // Persist progress immediately
            saveGameData();
        }
    }

    updateBattleUI();

    if (gameState.enemyHealth <= 0) {
        endBattle(true);
        return;
    }

    // After player action, pass turn to enemy and let enemy's cooldowns tick at start of its turn.
    gameState.turn = 'enemy';
    setTimeout(enemyTurn, 1500);
}

function enemyTurn() {
    // Check if enemy is still alive before attacking
    if (gameState.enemyHealth <= 0) {
        endBattle(true);
        return;
    }

    // At the start of enemy turn, tick enemy cooldowns so they decrease only on their own turns.
    tickCooldownsFor('enemy');

    // Choose an ability that is not on cooldown if possible; prefer random among available
    const enemyAbilities = gameState.enemy.abilities || [];
    const enemyCDs = (gameState.abilityCooldowns && gameState.abilityCooldowns.enemy) ? gameState.abilityCooldowns.enemy : [];
    let availableIndexes = enemyAbilities.map((a, i) => i).filter(i => !(enemyCDs[i] > 0));

    let chosenIndex;
    // If there are abilities not on cooldown, pick one at random from them.
    if (availableIndexes.length > 0) {
        chosenIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    } else {
        // All abilities are on cooldown: pick the ability with the smallest remaining cooldown
        // (force the enemy to act rather than skipping the turn).
        let minCd = Infinity;
        let minIdx = 0;
        for (let i = 0; i < enemyCDs.length; i++) {
            const cd = enemyCDs[i] || 0;
            if (cd < minCd) {
                minCd = cd;
                minIdx = i;
            }
        }
        chosenIndex = minIdx;
        addToBattleLog(`${gameState.enemy.name} forces an action despite cooldowns...`);
        // Note: we do not prematurely decrement that cooldown here; the chosen ability will be used now.
    }

    const randomAbility = enemyAbilities[chosenIndex];

    // Special mechanics for Reflection's Final Performance
    let actualDamage = randomAbility.damage;
    if (gameState.enemy.name === "Reflection" && randomAbility.name === "Final Performance") {
        if (gameState.enemyHealth <= 30) {
            actualDamage = 90;
        } else {
            actualDamage = 15;
        }
    }
    
    // Special mechanics for Dragon vs Sally (enemy attacking player)
    if (gameState.enemy.name === "Dragon" && gameState.player.name === "Sally" && actualDamage > 0) {
        actualDamage = Math.floor(actualDamage * 0.7);
    }

    // Apply effect and log
    if (actualDamage > 0) {
        // Special: if the enemy acting is Thirteen and used Luck Drain, reduce player's MAX HP instead of direct damage
        if (gameState.enemy && gameState.enemy.name === 'Thirteen' && randomAbility.name === 'Luck Drain') {
            const reduceBy = actualDamage;
            // reduce player's max HP but keep at least 10 max
            const newMax = Math.max(10, (gameState.player.health || 0) - reduceBy);
            gameState.player.health = newMax;
            // if there is a battle-specific player max, update it too
            if (gameState.playerBattleMax) gameState.playerBattleMax = Math.min(gameState.playerBattleMax, newMax);
            // clamp current HP to new max
            gameState.playerHealth = Math.min(gameState.playerHealth, newMax);
            addToBattleLog(`${gameState.enemy.name} uses ${randomAbility.name} and reduces ${gameState.player.name}'s MAX HP by ${reduceBy}!`);
        } else {
            gameState.playerHealth = Math.max(0, gameState.playerHealth - actualDamage);
            addToBattleLog(`${gameState.enemy.name} uses ${randomAbility.name} for ${actualDamage} damage!`);
        }
    } else {
        gameState.enemyHealth = Math.min(gameState.enemy.health, gameState.enemyHealth - actualDamage);
        addToBattleLog(`${gameState.enemy.name} uses ${randomAbility.name} and heals ${-actualDamage} HP!`);
    }



    // After enemy uses ability, apply cooldown if it's not the first ability (index 0)
    // Awareness is exempt from cooldowns when acting as the enemy
    if (chosenIndex !== 0) {
        const isHeal = (randomAbility.damage || 0) < 0;
        const maxCd = isHeal ? 2 : 4;
        if (!gameState.abilityCooldowns) gameState.abilityCooldowns = { player: [], enemy: [] };

        // Skip applying cooldowns if the acting enemy is Awareness
        if (gameState.enemy && gameState.enemy.name === 'Awareness') {
            // no cooldown applied for Awareness
        } else {
            gameState.abilityCooldowns.enemy[chosenIndex] = maxCd;
        }
    }

    updateBattleUI();

    if (gameState.playerHealth <= 0) {
        endBattle(false);
        return;
    }

    // After enemy action, hand turn back to player and tick player's cooldowns at the start of their turn
    gameState.turn = 'player';
    // Tick player's cooldowns now so UI reflects any abilities becoming available immediately
    tickCooldownsFor('player');
    updateBattleUI();
}

function clearZeroPassive() {
    // Clear any global Zero regen interval references
    try {
        if (window.__zeroRegenInterval) {
            clearInterval(window.__zeroRegenInterval);
            window.__zeroRegenInterval = null;
        }
    } catch (e) { /* ignore */ }
}

 // Called when a battle starts to wire Zero's passive regen
function setupZeroPassive() {
    try {
        // Ensure any previous interval/timer is cleared
        clearZeroPassive();

        // Identify which side(s) are Zero
        const playerIsZero = gameState.player && gameState.player.name === 'Zero';
        const enemyIsZero = gameState.enemy && gameState.enemy.name === 'Zero';

        // If neither side is Zero there is nothing to do
        if (!playerIsZero && !enemyIsZero) return;

        // Determine base heal amount (1 per tick by default)
        const zeroDef = (playerIsZero ? gameState.player : (enemyIsZero ? gameState.enemy : null));
        const passive = (zeroDef && zeroDef.passive) ? zeroDef.passive : { regenPerTick: 1, regenIntervalMs: 2000 };
        const healPerTick = Number(passive.regenPerTick) || 1;

        // Nerfed delay bounds (ms): slower overall so Zero cannot rapidly top up
        const MIN_DELAY = 1200; // 1.2s minimum delay between heals (fastest)
        const MAX_DELAY = 4000; // 4s maximum delay between heals (slowest)

        // New rule: only heal when below this HP fraction (prevents trivial full-health topping)
        const HEAL_THRESHOLD_FRAC = 0.6; // heal only when HP is under 60%

        // Helper to compute next delay based on current HP fraction (0..1).
        // More HP -> longer wait; less HP -> somewhat faster, but overall delays are larger now.
        function computeDelayFromHpFraction(hpFrac) {
            const f = Math.max(0, Math.min(1, hpFrac));
            // Interpolate between MAX_DELAY (at high HP) and MIN_DELAY (at low HP)
            return Math.round(MAX_DELAY - ( (1 - f) * (MAX_DELAY - MIN_DELAY) ));
        }

        // Recursive timer so delay can change after each heal based on current HP
        function scheduleNextTick() {
            // store timer id so clearZeroPassive can cancel it
            window.__zeroRegenTimer = setTimeout(() => {
                try {
                    let changed = false;

                    // Player-side Zero healing (only if below threshold)
                    if (playerIsZero && gameState.playerHealth > 0) {
                        const maxHP = gameState.player.health || 100;
                        const hpFrac = (maxHP > 0) ? (gameState.playerHealth / maxHP) : 0;

                        if (hpFrac < HEAL_THRESHOLD_FRAC) {
                            // Heal now (healPerTick), clamped at maxHP
                            const newHP = Math.min(maxHP, gameState.playerHealth + healPerTick);
                            if (newHP !== gameState.playerHealth) {
                                gameState.playerHealth = newHP;
                                changed = true;
                            }
                        }

                        // compute next delay based on current fraction (use current HP after possible heal)
                        const afterFrac = (maxHP > 0) ? (gameState.playerHealth / maxHP) : 0;
                        const delayForNext = computeDelayFromHpFraction(afterFrac);
                        pendingDelays.push(delayForNext);
                    }

                    // Enemy-side Zero healing (only if below threshold)
                    if (enemyIsZero && gameState.enemyHealth > 0) {
                        const maxHP = gameState.enemy.health || 100;
                        const hpFrac = (maxHP > 0) ? (gameState.enemyHealth / maxHP) : 0;

                        if (hpFrac < HEAL_THRESHOLD_FRAC) {
                            const newHP = Math.min(maxHP, gameState.enemyHealth + healPerTick);
                            if (newHP !== gameState.enemyHealth) {
                                gameState.enemyHealth = newHP;
                                changed = true;
                            }
                        }

                        const afterFrac = (maxHP > 0) ? (gameState.enemyHealth / maxHP) : 0;
                        const delayForNext = computeDelayFromHpFraction(afterFrac);
                        pendingDelays.push(delayForNext);
                    }

                    if (changed) {
                        updateBattleUI();
                    }

                    // Determine the next delay to schedule: pick the minimum of pending delays
                    if (pendingDelays.length > 0) {
                        const chosen = Math.max(MIN_DELAY, Math.min(MAX_DELAY, Math.min(...pendingDelays)));
                        pendingDelays.length = 0; // reset
                        // schedule next tick
                        scheduleNextTickWithDelay(chosen);
                    } else {
                        // No sides needed healing or both are above threshold; stop the regen loop
                        window.__zeroRegenTimer = null;
                    }
                } catch (e) {
                    // ensure loop doesn't silently die; attempt to reschedule conservatively
                    console.error('Zero regen tick error', e);
                    // schedule another conservative tick
                    scheduleNextTickWithDelay(MAX_DELAY);
                }
            }, 0); // immediate executor; actual pacing controlled by scheduleNextTickWithDelay
        }

        // Helper to set timer with explicit delay and remember id
        function scheduleNextTickWithDelay(ms) {
            // Clear any existing timer then set a new one
            if (window.__zeroRegenTimer) {
                clearTimeout(window.__zeroRegenTimer);
                window.__zeroRegenTimer = null;
            }
            window.__zeroRegenTimer = setTimeout(() => {
                try {
                    let changed = false;
                    // Recompute and apply heals similar to above block but keep scheduling consistent

                    // Player Zero (only heal if below threshold)
                    if (playerIsZero && gameState.playerHealth > 0) {
                        const maxHP = gameState.player.health || 100;
                        const hpFrac = (maxHP > 0) ? (gameState.playerHealth / maxHP) : 0;
                        if (hpFrac < HEAL_THRESHOLD_FRAC) {
                            const newHP = Math.min(maxHP, gameState.playerHealth + healPerTick);
                            if (newHP !== gameState.playerHealth) {
                                gameState.playerHealth = newHP;
                                changed = true;
                            }
                        }
                    }

                    // Enemy Zero (only heal if below threshold)
                    if (enemyIsZero && gameState.enemyHealth > 0) {
                        const maxHP = gameState.enemy.health || 100;
                        const hpFrac = (maxHP > 0) ? (gameState.enemyHealth / maxHP) : 0;
                        if (hpFrac < HEAL_THRESHOLD_FRAC) {
                            const newHP = Math.min(maxHP, gameState.enemyHealth + healPerTick);
                            if (newHP !== gameState.enemyHealth) {
                                gameState.enemyHealth = newHP;
                                changed = true;
                            }
                        }
                    }

                    if (changed) updateBattleUI();

                    // Prepare next delays based on updated HP
                    const nextDelays = [];
                    if (playerIsZero && gameState.playerHealth > 0) {
                        const maxHP = gameState.player.health || 100;
                        nextDelays.push(computeDelayFromHpFraction((maxHP>0) ? (gameState.playerHealth / maxHP) : 0));
                    }
                    if (enemyIsZero && gameState.enemyHealth > 0) {
                        const maxHP = gameState.enemy.health || 100;
                        nextDelays.push(computeDelayFromHpFraction((maxHP>0) ? (gameState.enemyHealth / maxHP) : 0));
                    }

                    if (nextDelays.length > 0) {
                        const chosen = Math.max(MIN_DELAY, Math.min(MAX_DELAY, Math.min(...nextDelays)));
                        scheduleNextTickWithDelay(chosen);
                    } else {
                        // nothing to continue
                        window.__zeroRegenTimer = null;
                    }
                } catch (e) {
                    console.error('Zero regen scheduling error', e);
                    window.__zeroRegenTimer = null;
                }
            }, ms);
        }

        // Use an array to collect candidate delays each tick (cleared inside routine)
        const pendingDelays = [];

        // Start initial scheduling: pick initial delays for present Zero sides and schedule the shortest
        const initialDelays = [];
        if (playerIsZero && gameState.playerHealth > 0) {
            const maxHP = gameState.player.health || 100;
            initialDelays.push(computeDelayFromHpFraction((maxHP>0) ? (gameState.playerHealth / maxHP) : 0));
        }
        if (enemyIsZero && gameState.enemyHealth > 0) {
            const maxHP = gameState.enemy.health || 100;
            initialDelays.push(computeDelayFromHpFraction((maxHP>0) ? (gameState.enemyHealth / maxHP) : 0));
        }

        if (initialDelays.length > 0) {
            const initial = Math.max(MIN_DELAY, Math.min(MAX_DELAY, Math.min(...initialDelays)));
            // Kick off the loop
            scheduleNextTickWithDelay(initial);
        }
    } catch (e) {
        console.error('Failed to setup Zero passive regen', e);
    }
}



function endBattle(playerWon) {
    // Clear Zero's passive when battle ends so it doesn't persist between battles
    try { clearZeroPassive(); } catch (e) { /* ignore */ }

    // Stop battle music
    if (gameState.currentBattleMusic) {
        gameState.currentBattleMusic.pause();
        gameState.currentBattleMusic = null;
    }
    
    // Reset House Arrest flag
    gameState.isHouseArrestBattle = false;
    
    if (playerWon) {
        gameState.credits += 50;
        
        // Award experience
        const playerCharKey = Object.keys(characters).find(key => characters[key] === gameState.player) || 
                             Object.keys(additionalCharacters).find(key => additionalCharacters[key] === gameState.player);
        
        if (playerCharKey && gameState.characterLevels[playerCharKey]) {
            const charData = gameState.characterLevels[playerCharKey];
            const oldLevel = charData.level;
            charData.exp += 25; // 25 exp per win
            
            // Level up check
            const expNeeded = charData.level * 100; // 100 exp per level
            if (charData.exp >= expNeeded && charData.level < 100) {
                charData.level++;
                charData.exp = charData.exp - expNeeded;
                addToBattleLog(`${gameState.player.name} leveled up to ${charData.level}!`);
            }
        }
        
        addToBattleLog(`Victory! +50 Credits earned!`);
        
        // Show victory screen after a brief delay
        setTimeout(() => showVictoryScreen(), 1500);
    } else {
        // Show game over screen after a brief delay
        setTimeout(() => showGameOverScreen(), 1500);
    }

    saveGameData(); // Save after battle
}

function showVictoryScreen() {
    const victoryScreen = document.createElement('div');
    victoryScreen.className = 'victory-screen';
    victoryScreen.innerHTML = `
        <div class="victory-content">
            <div class="victory-title">VICTORY</div>
            <div class="victory-subtitle">You have conquered the Void!</div>
            <div class="victory-stats">
                <div class="victory-stat">
                    <span class="stat-label">Credits Earned:</span>
                    <span class="stat-value">+50</span>
                </div>
                <div class="victory-stat">
                    <span class="stat-label">Total Credits:</span>
                    <span class="stat-value">${gameState.credits}</span>
                </div>
            </div>
            <div class="victory-actions">
                <button class="victory-btn rematch-btn" onclick="location.reload()">REMATCH</button>
            </div>
        </div>
        <div class="victory-particles"></div>
    `;
    
    document.body.appendChild(victoryScreen);
    
    // Trigger animations
    setTimeout(() => {
        victoryScreen.classList.add('active');
        createVictoryParticles();
    }, 100);
}

function showGameOverScreen() {
    const gameOverScreen = document.createElement('div');
    gameOverScreen.className = 'game-over-screen';
    gameOverScreen.innerHTML = `
        <div class="game-over-content">
            <div class="game-over-title">GAME OVER</div>
            <div class="game-over-subtitle">There's always next time...</div>
            <div class="game-over-stats">
                <div class="game-over-stat">
                    <span class="stat-label">Final Credits:</span>
                    <span class="stat-value">${gameState.credits}</span>
                </div>
            </div>
            <div class="game-over-actions">
                <button class="game-over-btn retry-btn" onclick="location.reload()">TRY AGAIN</button>
            </div>
        </div>
        <div class="game-over-glitch"></div>
    `;
    
    document.body.appendChild(gameOverScreen);
    
    // Trigger animations
    setTimeout(() => {
        gameOverScreen.classList.add('active');
        startGlitchEffect();
    }, 100);
}

function createVictoryParticles() {
    const particlesContainer = document.querySelector('.victory-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'victory-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

function startGlitchEffect() {
    const glitchElement = document.querySelector('.game-over-glitch');
    if (!glitchElement) return;
    
    let glitchInterval = setInterval(() => {
        glitchElement.style.opacity = Math.random() * 0.3;
        glitchElement.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
    }, 100);
    
    // Stop glitch effect after 3 seconds
    setTimeout(() => {
        clearInterval(glitchInterval);
        glitchElement.style.opacity = 0;
    }, 3000);
}

function showShop() {
    showScreen('shop');
    updateShopUI();
    initShopButtons(); // Initialize shop button listeners
}

function updateShopUI() {
    const creditsDisplay = document.getElementById('credits-display');
    if (creditsDisplay) {
        creditsDisplay.textContent = `Credits: ${gameState.credits}`;
    }

    // Update credits on title screen
    const titleCreditsDisplay = document.getElementById('credits-display-title');
    if (titleCreditsDisplay) {
        titleCreditsDisplay.textContent = `Credits: ${gameState.credits}`;
    }

    // Sort non-higher-plane shop items by numeric price; keep higher-plane entries grouped after
    const shopGrid = document.querySelector('.shop-grid');
    if (shopGrid) {
        const items = Array.from(shopGrid.querySelectorAll('.shop-item'));
        const normal = items.filter(i => !i.dataset.higherPlane);
        const higher = items.filter(i => i.dataset.higherPlane);
        // Use the preserved base price (data-base-price) for sorting when available
        normal.sort((a, b) => {
            const aBase = parseInt(a.getAttribute('data-base-price') || a.dataset.price || '0');
            const bBase = parseInt(b.getAttribute('data-base-price') || b.dataset.price || '0');
            return aBase - bBase;
        }).forEach(item => shopGrid.appendChild(item));
        // then append higher-plane items in original order so they appear after normals
        higher.forEach(item => shopGrid.appendChild(item));
    }

    const shopItems = document.querySelectorAll('.shop-item');
    shopItems.forEach(item => {
        const characterKey = item.dataset.character;
        // Preserve original price on first render so randomization won't clobber it
        if (!item.hasAttribute('data-base-price')) {
            // store the initial data-price as the canonical base price
            item.setAttribute('data-base-price', item.dataset.price || '');
        }
        // read canonical base price for purchase comparisons (may be empty for higher-plane FEELING LUCKY items)
        const basePriceAttr = item.getAttribute('data-base-price');
        const basePrice = basePriceAttr === null || basePriceAttr === '' ? NaN : parseInt(basePriceAttr);
        const buyButton = item.querySelector('.buy-button');
        const priceEl = item.querySelector('.price');

        // If already unlocked, hide from shop
        if (gameState.unlockedCharacters.includes(characterKey)) {
            item.style.display = 'none';
            return;
        }

        // Higher-Plane special handling
        if (item.dataset.higherPlane === 'true') {
            // Determine chance for this character to be free this shop-update.
            const charDef = (additionalCharacters && additionalCharacters[characterKey]) || (characters && characters[characterKey]);
            let chance = (charDef && typeof charDef.higherPlaneChancePercent === 'number') ? charDef.higherPlaneChancePercent : 0;

            // Special rule for 'broken'
            if (characterKey === 'broken') {
                const allDefs = { ...characters, ...additionalCharacters };
                const allKeys = Object.keys(allDefs).filter(k => k !== 'broken');
                const hasAllOthers = allKeys.every(k => gameState.unlockedCharacters.includes(k));
                chance = hasAllOthers ? 50 : 0;
            }

            // Random roll (0-100)
            const roll = Math.random() * 100;
            if (roll <= chance) {
                // This run: free (displayed as free claim) but do NOT overwrite the canonical base price
                item.dataset.price = '0'; // used by buyCharacter for immediate claim path
                priceEl.textContent = 'FEELING LUCKY?';
                buyButton.textContent = 'FREE - CLAIM';
                buyButton.disabled = false;
                buyButton.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
            } else {
                // Otherwise not available to buy this run (mark as not available)
                item.dataset.price = 'Infinity';
                priceEl.textContent = 'FEELING LUCKY?';
                buyButton.textContent = 'NOT AVAILABLE';
                buyButton.disabled = true;
                buyButton.style.background = 'rgba(255,255,255,0.04)';
            }
        } else {
            // Normal shop item - use canonical basePrice for display and purchase comparisons
            const price = Number.isNaN(basePrice) ? parseInt(item.dataset.price || '0') : basePrice;
            if (!Number.isNaN(price) && gameState.credits >= price) {
                buyButton.textContent = 'BUY';
                buyButton.disabled = false;
                buyButton.style.background = 'rgba(255, 215, 0, 0.2)';
                priceEl.textContent = `${price} Credits`;
                // ensure the runtime dataset.price reflects readable numeric price for initShopButtons
                item.dataset.price = String(price);
            } else {
                buyButton.textContent = 'INSUFFICIENT CREDITS';
                buyButton.disabled = true;
                buyButton.style.background = 'rgba(255, 0, 0, 0.2)';
                priceEl.textContent = `${price} Credits`;
                item.dataset.price = String(price);
            }
        }
    });
}

/*
  Helper: when EVERY character (from characters + additionalCharacters) is unlocked
  including 'broken', trigger the easter-egg by hiding title-screen buttons and
  showing a single "SOMETHING NEW" button instead of the previous text indicator.
  NOTE: Only run this while the title screen is active to avoid triggering the
  easter-egg from inside other screens (e.g. the shop).
*/
function checkAllUnlockedAndTriggerEasterEgg() {
    try {
        // Only proceed if the title screen is currently active (prevents triggering from the shop)
        const titleScreen = document.getElementById('title-screen');
        if (!titleScreen || !titleScreen.classList.contains('active')) return;

        const allDefs = { ...characters, ...additionalCharacters };
        // Exclude 'zero' from the "all characters" checklist so Zero does not block the Broken unlock easter-egg
        const allKeys = Object.keys(allDefs).filter(k => k !== 'zero');

        // Ensure 'broken' is counted (in case it exists only in additionalCharacters)
        if (!allKeys.includes('broken')) allKeys.push('broken');

        // Check if every key is in unlockedCharacters
        const allUnlocked = allKeys.every(k => gameState.unlockedCharacters.includes(k));

        if (allUnlocked) {
            // Hide title screen buttons (visual easter-egg)
            const idsToHide = ['start-game', 'characters-button', 'shop-button', 'credits-display-title'];
            idsToHide.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.style.transition = 'opacity 0.6s ease';
                    el.style.opacity = '0';
                    // remove from layout after fade
                    setTimeout(() => {
                        try { el.style.display = 'none'; } catch (e) { /* ignore */ }
                    }, 650);
                }
            });

            // Hide the big "UNBROKEN" title text as part of the easter-egg
            const pageTitleEl = document.querySelector('.title');
            if (pageTitleEl) {
                pageTitleEl.style.transition = 'opacity 0.6s ease';
                pageTitleEl.style.opacity = '0';
                setTimeout(() => {
                    try { pageTitleEl.style.display = 'none'; } catch (e) { /* ignore */ }
                }, 650);
            }

            // Set the browser tab title to "..." to signal the change
            try {
                document.title = '...';
            } catch (e) { /* ignore */ }

            // Create a single "SOMETHING NEW" button (replace previous textual indicator)
            const container = titleScreen?.querySelector('.container');
            if (container && !document.getElementById('easter-egg-button')) {
                const btn = document.createElement('button');
                btn.id = 'easter-egg-button';
                btn.textContent = 'SOMETHING NEW';
                btn.className = 'game-button';
                // Use fixed positioning so the button cannot be clipped by the container
                btn.style.position = 'fixed';
                // place above the bottom safe area and center horizontally
                btn.style.bottom = 'max(env(safe-area-inset-bottom, 12px), 6%)';
                btn.style.left = '50%';
                btn.style.transform = 'translateX(-50%)';
                btn.style.zIndex = '12000';
                // give it a sensible width on small viewports so it's clearly tappable
                btn.style.minWidth = '180px';
                btn.style.maxWidth = '520px';
                btn.style.width = 'min(70%, 520px)';
                btn.style.opacity = '0';
                btn.style.transition = 'opacity 0.45s ease, transform 0.35s ease';
                document.body.appendChild(btn);
                // fade/slide in
                setTimeout(() => {
                    btn.style.opacity = '1';
                }, 120);

                // Default action: log an ominous message and visually pulse the (now hidden) title element reference safely
                btn.addEventListener('click', () => {
                    addToBattleLog('A new presence stirs within the Void...');

                    // Try to dynamically load and trigger the final fight sequence
                    import('./final_fight.js').then(module => {
                        try {
                            // module may export a default function that runs the sequence
                            if (typeof module.default === 'function') {
                                module.default();
                            }
                        } catch (e) {
                            console.error('final_fight module loaded but failed to execute:', e);
                        }
                    }).catch(err => {
                        console.error('Failed to load final_fight.js', err);
                        addToBattleLog('Something failed to awaken...');
                    });

                    // If the title still exists in the DOM (even hidden), animate it subtly as a visual cue
                    const title = document.querySelector('.title');
                    if (title) {
                        // ensure it's visible for the brief pulse if it was hidden; animate without changing display permanently
                        title.style.display = 'block';
                        title.style.opacity = '0';
                        // fade it in briefly for pulse
                        title.animate([
                            { transform: 'scale(1)', opacity: 0 },
                            { transform: 'scale(1.02)', opacity: 1 },
                            { transform: 'scale(1)', opacity: 0 }
                        ], { duration: 700, iterations: 1, easing: 'ease-in-out' });
                        // after animation, ensure it stays hidden
                        setTimeout(() => {
                            try { title.style.display = 'none'; } catch (e) { /* ignore */ }
                        }, 700);
                    }
                });
            }
        }
    } catch (e) {
        console.error('Easter-egg check failed', e);
    }
}

function buyCharacter(characterKey, price) {
    // handle "Infinity" price and zero price correctly
    if (price === Infinity || price === 'Infinity' || price === 'inf') return;

    const numericPrice = Number(price);

    if (!gameState.unlockedCharacters.includes(characterKey) && !isNaN(numericPrice) && gameState.credits >= numericPrice) {
        gameState.credits -= numericPrice;
        gameState.unlockedCharacters.push(characterKey);
        
        // Initialize character level
        if (!gameState.characterLevels[characterKey]) {
            gameState.characterLevels[characterKey] = { level: 1, exp: 0 };
        }
        
        // Track purchased characters separately
        if (!gameState.purchasedCharacters) {
            gameState.purchasedCharacters = [];
        }
        gameState.purchasedCharacters.push(characterKey);
        
        // Add to starter characters for selection
        const characterToAdd = additionalCharacters[characterKey];
        if (characterToAdd) {
            characters[characterKey] = characterToAdd;
        }
        
        saveGameData(); // Save after purchase
        updateShopUI();
        addToBattleLog(`${characterToAdd.name} unlocked!`);
        
        // Check and trigger easter-egg if conditions are met
        checkAllUnlockedAndTriggerEasterEgg();
        return;
    }

    // Support claim when randomized free (price may be 0 but credits insufficient is irrelevant)
    if (!gameState.unlockedCharacters.includes(characterKey) && Number(price) === 0) {
        // free claim: no credits deducted
        gameState.unlockedCharacters.push(characterKey);
        if (!gameState.characterLevels[characterKey]) gameState.characterLevels[characterKey] = { level: 1, exp: 0 };
        if (!gameState.purchasedCharacters) gameState.purchasedCharacters = [];
        gameState.purchasedCharacters.push(characterKey);
        const characterToAdd = additionalCharacters[characterKey];
        if (characterToAdd) characters[characterKey] = characterToAdd;
        saveGameData();
        updateShopUI();
        addToBattleLog(`${characterToAdd.name} unlocked for free!`);
        
        // Check and trigger easter-egg if conditions are met
        checkAllUnlockedAndTriggerEasterEgg();
    }

    // Whenever characters unlock, refresh create button availability
    if (typeof updateCreateButtonState === 'function') {
        try { updateCreateButtonState(); } catch (e) { /* ignore */ }
    }
}

function addToBattleLog(message) {
    battleLog.innerHTML = '';
    gameState.battleLog = [message];
    
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logEntry.style.marginBottom = '0.5rem';
    logEntry.style.padding = '0.3rem';
    logEntry.style.borderLeft = '2px solid #FFD700';
    logEntry.style.paddingLeft = '0.5rem';
    battleLog.appendChild(logEntry);
    
    // Auto-scroll to bottom if needed
    battleLog.scrollTop = battleLog.scrollHeight;
    
    setTimeout(() => {
        logEntry.style.opacity = '0';
        logEntry.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            if (logEntry.parentNode) {
                logEntry.remove();
            }
        }, 500);
    }, 3000);
}

/*
  Helper: tick cooldowns for a specific side at the start of their turn.
  Only the provided side ('player' or 'enemy') will have its non-zero cooldowns decremented by 1.
*/
function tickCooldownsFor(side) {
    if (!gameState.abilityCooldowns || !gameState.abilityCooldowns[side]) return;
    for (let i = 0; i < gameState.abilityCooldowns[side].length; i++) {
        if (gameState.abilityCooldowns[side][i] > 0) {
            gameState.abilityCooldowns[side][i] = Math.max(0, gameState.abilityCooldowns[side][i] - 1);
        }
    }

    // Refresh UI so cooldowns are reflected immediately
    updateBattleUI();
}

// Add event listeners for shop buttons
function initShopButtons() {
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        const shopItem = button.closest('.shop-item');
        if (!shopItem) return;

        // Prevent attaching duplicate listeners if initShopButtons is called multiple times.
        if (shopItem.dataset.shopListenerAttached === '1') return;
        shopItem.dataset.shopListenerAttached = '1';

        const characterKey = shopItem.dataset.character;

        // Use a click handler that reads the current dataset.price at click time so
        // transient UI changes or prior state won't allow unintended free-claims.
        button.addEventListener('click', () => {
            // Re-read the price at the moment of click; handle Infinity and non-numeric gracefully.
            const raw = shopItem.dataset.price;
            const numeric = (raw === undefined || raw === null || raw === '') ? NaN : Number(raw);

            // Interpret 'Infinity' or extremely large values as not purchasable.
            if (!isFinite(numeric)) {
                // Ensure UI reflects non-availability (defensive update)
                updateShopUI();
                return;
            }

            // Call buyCharacter with the current price (0 => free claim)
            buyCharacter(characterKey, numeric);

            // Refresh the shop UI after attempting the purchase to ensure state is consistent.
            updateShopUI();
        });
    });
}

 // Expose functions to global scope so inline onclick handlers in generated screens work
 window.showShop = showShop;
 window.startBattle = startBattle;

// Expose character tables so bio.js can read them (these are references to the same objects)
window.characters = characters;
window.additionalCharacters = additionalCharacters;

 // Initialize the game when the page loads
 init();