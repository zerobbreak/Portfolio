# Apex Legends and Watch Dogs: UI/UX research

Research to inform two portfolio redesign concepts. Compiled 2026-10-06.

## How sourcing went (read first)

- **Primary sources were mostly not reachable.** ea.com Apex news and legend pages returned 404 or timed out. help.ea.com timed out. ArtStation (Cloudflare challenge), uxdesign.cc and GameSpot returned 403. No GDC talk on Apex or Watch Dogs UI turned up in searches.
- **Labels used:**
  - **[Verified]**: the page was fetched, or the fact appeared in search results with a URL.
  - **[Secondary]**: from a fan wiki or a press or community article.
  - **[Unverified]**: from general knowledge of the games or observation of gameplay, with no source checked. A designer should confirm these against screenshots or footage before relying on them.
- **No hex values are official.** No published brand guidelines or fan kit with colour codes was found for either franchise. The hex values in the takeaways are suggested approximations, not sourced values.

---

## 1. Apex Legends (Respawn Entertainment / EA, released 4 Feb 2019)

### 1.1 Who designed the UI (primary-source leads)

- **Brandon Pirruccello: "Apex Legends: In-Game Menu UI Concepts".** Described as visual style development for all in-game menus at launch: https://brandonrp.artstation.com/projects/580Xl1. [Verified that the page exists via search. Content not fetched because ArtStation blocked it.]
- **Brad Allen: "Apex Legends: User interface elements".** Concepts and exploration of UI elements: https://magnethead.artstation.com/projects/oOZ2mL. [Same status as above.]
- **Sprung Studios.** Worked with Respawn on "a refresh of the game menus UX/UI, focusing particularly on the Battle Pass, Legends and Loadout screens", producing documentation and interactive prototypes: https://www.sprungstudios.com/apex-legends/. [Verified]
- **Interface In Game screenshot catalogue.** https://interfaceingame.com/games/apex-legends/ [Verified] It lists these screens:
  - Main Menu, Select Legend, Legends, Champion Squad
  - Ping Menu, Circle Menu
  - Eliminated, Game Over, Match Summary
  - Battle Pass, Apex Packs, Badge, Skins, Weapon Skin, Armory, Store
  - Shield, Replace Weapon, Quick Swap
  
  **Best visual reference.** A designer should browse these screenshots directly.

### 1.2 Legend select screen

**Sourced facts**

- The legend pool appears as a single group of icons. A popular community proposal (about 8,000 upvotes) asked for the icons to be split by class so legends are easier to find and teammates' picks are easier to read: https://www.dexerto.com/apex-legends/simple-apex-legends-ui-change-would-make-choosing-a-legend-way-better-1975627/ [Secondary]
- Sprung Studios' refresh covered the "Legends" screen: https://www.sprungstudios.com/apex-legends/ [Verified]

**Layout from gameplay [Unverified]**

- **Pick order:** squads pick in sequence. A banner across the top shows the three squad slots in pick order, with "1st / 2nd / 3rd" pick numbers and the current picker highlighted.
- **Timer:** a short countdown appears per picker.
- **Portrait grid:** rows of small angled or square portraits, centred along the bottom. Taken legends are greyed out or locked.
- **Selected legend:**
  - A large 3D model fills the centre or left of the screen.
  - The name is set in big condensed uppercase type.
  - A class icon sits with the name.
  - The three abilities are listed with icons.

### 1.3 Classes (Season 16 "Revelry", Feb 2023)

**The five classes [Verified via search results; secondary press]**

- Revelry introduced five classes: Assault, Skirmisher, Recon, Controller and Support.
- Each class has its own perk.
- Sources:
  - https://www.ea.com/games/apex-legends/news/revelry-season-game-updates (official, but it returned 404 when fetched; the short link https://go.ea.com/x8L5Q redirects there)
  - https://esports.gg/news/apex-legends/apex-legends-season-16-unveils-class-rework-no-new-legend-added/

**Class perks at launch, Season 16 [Secondary]**

| Class | Perk at Season 16 launch |
|---|---|
| Assault | Extra ammo per inventory slot; opens a hidden compartment in weapon supply bins |
| Skirmisher | Can reveal the contents of care packages |
| Recon | Scanning a Survey Beacon reveals enemy positions on the map for 30 seconds |
| Controller | Ring Consoles reveal the next ring location |
| Support | Opens hidden compartments in blue supply bins (large heals, Mobile Respawn Beacon and similar items) |

**Class definitions and current roster [Secondary]**

- Source: https://apexlegends.wiki.gg/wiki/Legends
- Assault: direct combat.
- Skirmisher: mobility into and out of fights.
- Recon: scouting and enemy intel.
- Support: healing, revives and resupply.
- Controller: area denial and traps.
- Each class "features a distinct icon".

| Class | Legends (current wiki roster) |
|---|---|
| Assault | Bangalore, Revenant, Fuse, Mad Maggie, Ballistic |
| Skirmisher | Pathfinder, Wraith, Octane, Horizon, Ash, Alter, Axle |
| Recon | Bloodhound, Crypto, Valkyrie, Seer, Vantage, Sparrow |
| Support | Gibraltar, Lifeline, Mirage, Loba, Newcastle, Conduit |
| Controller | Caustic, Wattson, Rampart, Catalyst |

**Class icons [Unverified]**

- Each class icon is a simple monochrome glyph inside a small badge shape. The exact glyph designs were not verified.
- **Do not copy them.** Draw original glyphs instead.

### 1.4 Abilities

**Structure**

- Every legend has three abilities: a Tactical, a Passive and an Ultimate.
- Example (Wraith):
  - Tactical: Into the Void
  - Passive: Voices from the Void
  - Ultimate: Dimensional Rift
- Source: https://upcomer.com/apex-legends-character-ability-guide/ [Secondary]

**How abilities appear [Unverified]**

- **Default PC keys:**
  - Q for Tactical
  - Z for Ultimate
  - The Passive has no key.
- **In-match HUD:** the Tactical and Ultimate icons sit near the bottom centre.
  - Each shows a radial or vertical cooldown fill.
  - The Ultimate shows a charge percentage.
  - Key labels appear in small boxes under the icons.
- **Legends menu:**
  - Each ability has a square icon, a label ("TACTICAL", "PASSIVE", "ULTIMATE"), its name, and a one- or two-sentence description.
  - The menu also includes a short video preview of the ability.

### 1.5 Banners, trackers, badges and the Champion squad

**Banner structure [Secondary]**

- Source: https://apexlegends.wiki.gg/wiki/Banner
- **Frame:** one per banner. Frames range from Common (simple background) to Mythic (animated).
- **Pose:** one per banner. Rare poses are static; Epic and Mythic poses are dynamic.
- **Badges:** up to 3.
- **Stat trackers:** up to 3. Rare trackers include concept art.
- **Intro quips:** voice lines that play when a legend is introduced as the Champion.

**Champion squad intro**

- "Champion Squad" is a catalogued screen: https://interfaceingame.com/games/apex-legends/ [Verified]
- Appearance [Unverified]:
  - At the start of a match, the previous match's winning squad (the "Champion") is introduced on full-screen banners.
  - Each banner is a tall vertical card showing the legend pose, player name, badges and trackers.
  - The cards slide or wipe in one after another.
  - The text "YOU ARE FIGHTING THE CHAMPION SQUAD" (or similar wording) appears with a kill-leader-style header.

### 1.6 Typography

**Sourced facts**

- The logo or wordmark is a custom, bold, angular display face with condensed-leaning proportions and beveled cuts. There is no confirmed off-the-shelf font behind it.
- The UI uses a "cleaner, more functional" condensed techno sans.
- Source: https://madegooddesigns.com/?p=9862 [Secondary]
- The exact commercial UI typeface is **unverified**. Names that circulate in the community (DIN, Tungsten, Refrigerator Deluxe) were **not** confirmed by any source found.

**Open-licence alternatives**

- The same article suggests Teko, Oswald and Saira Condensed for display text, and Rajdhani for HUD labels.
- Other good Google Fonts options:
  - Barlow Condensed and Barlow Semi Condensed for body and UI text
  - Chakra Petch for a techno-label feel

### 1.7 Colour, shape and motion

**Sourced facts**

- The brand identity is red and white ("fiery red with white logo"): https://logotyp.us/logo/apex-legends/ [Secondary]
- The official red hex is **unverified**.

**Visual language [Unverified]**

- **Colour:**
  - Dark charcoal or near-black panels with some transparency.
  - Off-white text.
  - Signature red for primary calls to action and highlights.
  - Rarity colours as accents.
- **Shapes:**
  - Panels are slanted, often skewed parallelograms with one or both short edges cut at roughly 10–15°.
  - Tabs have chevron or notched corners.
  - Thin rule lines and small corner brackets.
- **Motion:**
  - Fast, snappy transitions of about 150–300 ms with ease-out.
  - Panels slide in along their skew angle.
  - Elements fill in with horizontal wipes.
  - Number counters tick up.

### 1.8 HUD

**Rarity tiers [Secondary]**

- Common: white
- Rare: blue
- Epic: purple
- Legendary: gold
- Mythic: red
- Iconic: turquoise (cosmetics)
- Sources: https://help.ea.com/hu/articles/apex-legends/crafting-and-currency, https://www.tomsguide.com/us/apex-legends-loot-colors-guide,news-29450.html

**Evo shield tiers [Secondary]**

- White, then Blue, then Purple, then Red.
- Hit-damage numbers take the shield's colour. Once the shield breaks, the numbers turn red or white.
- Source: search summaries; the gamesradar tips page https://www.gamesradar.com/apex-legends-tips was not fetched.

**Hex values**

- No official hex codes were found. **Unverified.**

**Ping system [Secondary]**

- A single button gives a contextual ping. Holding it opens a radial communication wheel, and the character voices the callout.
- Respawn banned voice chat during internal playtests while designing it.
- Sources:
  - https://www.pcgamer.com/au/apex-legends-ping-system-is-a-tiny-miracle-for-fps-teamwork-and-communication/
  - https://uxdesign.cc/apex-legends-ping-system-gaming-ux-done-right-4661cd94954c (403 when fetched)
  - https://www.gfinityesports.com/article/how-the-ping-system-evolved-to-break-barriers-and-redefine-in-game-communication
- "Ping Menu" and "Circle Menu" screens are catalogued at https://interfaceingame.com/games/apex-legends/ [Verified]
- Appearance [Unverified]:
  - A world-space diamond or marker with an icon, label and distance in metres.
  - Enemy pings are red.
  - Item pings show the item name in its rarity colour.

**Kill feed [Unverified]**

- Shown at the top right.
- Each entry reads: attacker name, a weapon or "knocked" or "eliminated" icon, then the victim name.
- Your own squad is highlighted.

**Customisation [Secondary]**

- The HUD offers customisable layouts, element size and opacity, and colourblind modes.
- Source: https://upcomer.com/apex-legends-improves-colorblind-support-promises-crosshair-customization

---

## 2. Watch Dogs (WD1 2014, WD2 2016, Legion 2020; Ubisoft)

### 2.1 ctOS and the Profiler (WD1)

**Sourced facts**

- ctOS gives every NPC a set of personal information, and NPCs are hackable.
- The Profiler lets the player look into NPCs' inner lives. Critics found the generated combinations repetitive.
- Creative director Jonathan Morin called it a way to "pass systemic contextual narrative in the world. You can humanize the people around you."
- Sources:
  - https://www.techradar.com/news/gaming/just-how-next-gen-is-watch-dogs-ubisoft-s-open-world-hacker-s-paradise-1244109
  - https://dsogaming.com/?p=91680
- A design interview with Danny Belanger (WD1 lead gameplay designer): https://huffingtonpost.co.uk/amp/entry/post-7415_b_5199348 (not fetched).
- WD2 brought an updated Profiler: https://www.noobfeed.com/news/watch-dogs-2-will-feature-an-updated-profiler-system [Secondary]

**What a profile card shows [Unverified]**

- A small floating card next to the NPC.
- **Fields:**
  - Name
  - Age
  - Occupation
  - Income (for example "$34,000")
  - One generated fact line (for example "Recently diagnosed with…" or "Donates to animal shelters")
  - A crime-probability or "potential victim" flag in some cases
  - A hackable icon when the NPC carries something to steal (cash or a song)
- **Styling:**
  - White or light-grey thin sans-serif text on a semi-transparent dark strip.
  - A thin connector line runs from the card to the person.
- **Activation:** scanning slows the world slightly while the profiler is up.

### 2.2 Hacking UI

**Sourced facts**

- **WD1 hacking minigame:**
  - You rotate nodes to route a blue data stream from a source to an endpoint.
  - Lock icons have arrows on 1 to 4 sides and unlock when every connector is powered.
  - Unlocked locks give new T or elbow pieces that route the signal further.
  - Sources:
    - https://www.honestgamers.com/guides/watch-dogs/4/read/32.html [Secondary]
    - https://primagames.com/?p=29019 [Secondary]
    - https://gameinformer.com/games/watch_dogs/b/ps3/archive/2013/08/13/get-a-closer-look-at-hacking-in-watch-dogs-chicago.aspx [Secondary]
- **WD2 network puzzles:**
  - The node puzzles move into the 3D world. Branching circuits sprawl across rooms and buildings, sometimes needing a drone to see every angle.
  - You rotate junctions so the blue flow reaches the endpoint.
  - Sources:
    - https://easyallies.com/review/watch-dogs-2 [Secondary]
    - https://cheatcc.com/guides/watch-dogs-2-guide-walkthrough/essential-knowledge-12/hack-puzzle-how-to/ [Secondary]
- **Legion tech points:**
  - Tech Points are collectibles spent to unlock gadgets and hacking upgrades.
  - There are 130 locations.
  - Completing a borough's side missions reveals that borough's tech points on the map.
  - Sources:
    - https://shacknews.com/article/121208/how-to-get-more-tech-points-watch-dogs-legion [Secondary]
    - Official Ubisoft guide: https://ubisoft.com/en-au/game/watch-dogs/legion/news-updates/1tl4SsJF94Js0NdlH2Surv/essential-guide-to-gadgets-and-tech-in-watch-dogs-legion (not fetched)
- A hudsandguis write-up of the WD1 hacking UI exists: https://www.hudsandguis.com/home/2013/07/24/watchdogs-hacking-ui (not fetched).

**How hacking looks in play [Unverified]**

- **Hold-to-hack prompt:**
  - Looking at a hackable object shows a small icon with the button glyph and a radial fill that completes while the button is held.
  - Hackable objects are highlighted with a white or cyan outline.
- **Camera hopping:**
  - You jump from CCTV camera to CCTV camera.
  - The view switches to a grainy, desaturated feed with scanlines, timestamp or REC overlays, and a crosshair on the next hackable camera.
- **Phones:**
  - Aiden's (WD1) is a dark, utilitarian smartphone with a tiled app grid.
  - Marcus's (WD2) is a bright, playful phone with app icons in the DedSec meme style. Its apps include ScoutX (photos), Driver SF, music (Song Hunter) and Research.
  - Legion moves this to a radial and menu system per operative.

### 2.3 Visual identity per game

**WD2 / DedSec [Verified via search results]**

- Inspirations range from hacker-culture glitch art and pop culture to late-1940s cartoons. "Bright, neon flourishes" fill DedSec environments and apps.
- Menus and the DedSec HQ are full of "fluorescence, graffiti, 8-bit animations and fictional memes".
- Sources:
  - https://stevivor.com/previews/preview-watch-dogs-2-2/
  - https://www.levelup.com/xbox-one/reviews/watch-dogs-2/
  - https://gamesbeat.com/?p=129826
- Trailers, and reportedly some in-game UI and effects, used After Effects plugins for pixel sorting, retro dithering and data glitches: https://aescripts.com/learn/watch-dogs-2-trailer-cinematic-reveal [Secondary; vendor claim]

**WD2 / DedSec look [Unverified]**

- **Palette:**
  - Hot pink and magenta
  - Cyan and teal
  - Acid yellow and lime
  - White on black
- **Effects:**
  - RGB-split and chromatic aberration
  - Pixel sorting
  - Dithering
  - VHS tracking glitches
- **DedSec logo:** a pixelated, glitchy skull-and-mask mark drawn in a graffiti, sticker style.
- **Boot sequences:** terminal-style text scrolls with glitched type, ending in a logo reveal.
- **Typography:** mixes a clean UI sans with pixel or bitmap fonts and spray-paint lettering.

**WD1 [Unverified]**

- Restrained ctOS greys, white and soft blue.
- Thin geometric sans-serif.
- Wireframe outlines and data-line overlays (cables drawn between hackable objects).
- A cold, surveillance-state feel.

**Legion [Unverified]**

- A London palette of desaturated greys with DedSec accents: neon pink and teal glitch elements, plus Union-flag-inspired graphic cut-ups.
- Stencil and punk-collage aesthetics.
- Operative recruitment uses a profiler-style card (name, job, traits, perks), so any NPC becomes a "playable character card".

### 2.4 City map [Unverified]

- **Structure:** the map is split into districts (WD1: Chicago areas such as The Loop and Pawnee; WD2: SF Bay Area; Legion: London boroughs).
- **ctOS towers / control centres:**
  - In WD1, a district's map is only partly revealed until its ctOS tower is hacked.
  - In Legion, borough "liberation" changes the map's state.
- **Overlay style:** dark top-down vector map, thin road lines, icon pins for collectibles and activities, and filter toggles.
- **Legion:** each borough's map reflects its tech points once the borough mission is done (see the Shacknews link above).

### 2.5 Typography

- No official font names were found for any Watch Dogs title. **Unverified.**
- Open-licence alternatives:
  - WD1 / ctOS: **Rajdhani**, **Titillium Web** or **Exo 2** for the thin, technical feel. **Share Tech Mono** or **JetBrains Mono** for data readouts.
  - WD2 / DedSec: **Press Start 2P**, **VT323** or **Silkscreen** for pixel or bitmap type. **Space Grotesk** or **Rubik** for clean UI text. **Permanent Marker** or **Rubik Glitch** for graffiti and glitch headings, used sparingly.

---

## 3. Gaps and how to fill them

- Get past the ArtStation Cloudflare block in a real browser and read the Pirruccello and Brad Allen case studies. They are the best primary sources for Apex menu style.
- Retry the official Revelry page later: https://www.ea.com/games/apex-legends/news/revelry-season-game-updates
- Use https://interfaceingame.com/games/apex-legends/ and Watch Dogs entries on the same site to sample real colours from screenshots with an eyedropper.
- No official hex values or fonts were confirmed for either franchise.

---

## Design takeaways for the portfolio

Take the **structure and interaction patterns**, not trademarked assets.

- Do not use the Apex logo, class icons, DedSec skull or mask, ctOS logo, or game fonts.
- Draw original glyphs.
- Use the Google Fonts alternatives listed above.
- The hex values below are original suggestions, not official values.

### Apex concept: "Choose your project" legend select

**Information architecture**

- **Projects are legends.** The landing page is a select screen.
  - A bottom row or grid of angled project portraits.
  - A large hero area with a 3D model or screenshot carousel of the selected project.
  - The project name in huge condensed uppercase.
- **Project classes.** Map project types to five classes with original icons:
  - Assault: production apps
  - Skirmisher: fast prototypes and hackathons
  - Recon: data and analytics
  - Support: tooling, libraries and developer experience
  - Controller: infrastructure, backend and systems
  
  Offer group-by-class filtering. This mirrors the community request in Dexerto's article.
- **Abilities become features.** Each project shows three ability slots:
  - **Passive:** the always-on quality (for example "Offline-first", "Accessible").
  - **Tactical [Q]:** the core feature or the key interaction.
  - **Ultimate [Z]:** the standout technical achievement.
  
  Each slot has an icon, a label, a name and a one- or two-line description. A cooldown-style radial ring can encode something like complexity.
- **The banner is the project summary card:**
  - A frame tinted by rarity for project maturity or impact: Common for experiments, through to Legendary and Mythic for flagship work.
  - **Up to 3 badges:** awards, hackathon wins, certifications.
  - **Up to 3 stat trackers:** stars, users, Lighthouse score, lines shipped.
- **"Squad" slots** at the top show three pinned or featured projects, numbered 1, 2 and 3 like pick order. A playful countdown timer is optional.
- **Champion squad intro.** On first visit, play a short sequence that wipes in three tall banner cards for the top projects. Make it skippable and respect `prefers-reduced-motion`.

**Visual system**

- **Palette (suggested, not official):**
  - Near-black base `#121316`
  - Panel `#1E2026` at 85–90% opacity
  - Off-white text `#E9E6E1`
  - Signature red accent `#D5302F`
  - Rarity ramp: white `#E6E6E6`, blue `#3E8EDE`, purple `#9B4FD6`, gold `#E7B53B`, red `#D9413B`
- **Shapes:**
  - Skewed parallelogram panels, for example `transform: skewX(-12deg)` with unskewed content or `clip-path` polygons.
  - Notched corners and chevron tabs.
  - Thin 1px dividers.
- **Motion:**
  - Fast ease-out of 150–250 ms.
  - Panels slide along the skew axis and fill with horizontal wipes.
  - Number counters roll up.
  - Use a hover lift with a red underline sweep.
- **Fonts:**
  - Teko, Saira Condensed or Barlow Condensed for headings.
  - Rajdhani or Barlow for UI text.
  - Show key-cap labels in small boxed monospace.

**Interaction**

- Arrow keys or WASD move through the grid. Enter "locks in" a project, with a lock-in flash and a whoosh, then opens the case study.

### Watch Dogs concept: "Hack the city"

**Information architecture**

- **The portfolio is a city map.**
  - A dark top-down vector or 3D city.
  - **Districts** are skill areas: Frontend, Backend, Mobile, ML, DevOps.
  - **Buildings or nodes** are projects.
  - Thin data lines connect related projects.
- **ctOS tower per district.** Districts start "encrypted": greyed out with hidden labels. "Hacking" a district's tower reveals its project nodes, like the WD1 tower reveal and Legion liberation.
- **Profiler on hover.** Pointing at a building or an "NPC" (a tech or skill avatar) shows a floating profiler card with a connector line:
  - Name: the project
  - Occupation: its role or category
  - Income: impact, such as users or performance gains
  - A random fact: a fun trivia line about the build
- **Hold-to-hack.** Hackable nodes show a radial-fill prompt. Holding for about 600 ms, or a long-press on touch, "hacks" the node.
  - Always provide an instant click or keyboard alternative for accessibility.
- **Unlock minigame (optional and skippable).** A small grid puzzle where you rotate pipe or elbow tiles to route a signal from source to the project's lock. This mirrors the WD1 mechanic described above.
  - Keep it 1–2 moves long.
  - Always offer a "bypass" button.
- **Camera hop.** Jump between featured projects through a CCTV-style transition: scanlines, a REC timestamp, a desaturated flash, then the case study.
- **Phone overlay.** A smartphone-shaped menu with app tiles: About, Contact, CV, Skills, Socials. This echoes Marcus's phone apps.
- **Tech points.** Collectible tokens hidden across the map unlock extras such as a résumé download, easter eggs or a dark/glitch theme. Show progress per district.

**Visual system (pick one era or use theme switching)**

- **ctOS / WD1 mode:**
  - Colours: graphite `#14171A`, steel grey `#5A6470`, white `#F2F4F5`, cool blue `#4FA3D9`.
  - Thin geometric type such as Rajdhani or Titillium Web.
  - Wireframe outlines.
- **DedSec / WD2 mode:**
  - Colours: black `#0B0B0F`, hot pink `#FF2E88`, cyan `#20E3F0`, acid yellow `#F5F33B`, white.
  - Glitch effects:
    - RGB-split text shadows, for example `text-shadow: 2px 0 #ff2e88, -2px 0 #20e3f0`
    - Clip-path slice glitches
    - Dither or pixel-sort textures
    - Sticker-style decals
  - Fonts: VT323 or Silkscreen for pixel accents, Space Grotesk for body text.
  - Design an original mascot or logo instead of the DedSec mask.
- **Legion mode:**
  - Desaturated London greys plus teal and pink accents.
  - Stencil and collage textures.
  - Recruitable "operative" cards for collaborators or testimonials.
- **Boot sequence:**
  - On load, a 1–2 s terminal text scroll ("establishing uplink…") with glitch frames, then the map fades in.
  - Make it skippable, show it once per session, and remove it under `prefers-reduced-motion`.

**Shared guardrails for both concepts**

- Every gamified gate (lock-in, hack, minigame) needs a direct, accessible path to the content: keyboard focus states, screen-reader labels and a plain project list view.
- Keep motion short.
- Avoid flashing faster than 3 times per second, especially with glitch effects.
- Lazy-load heavy 3D assets and offer a 2D fallback.
