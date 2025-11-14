# K1-Lightwave Hardware Specifications for 3D Rendering

**Critical reference for KeyShot/Blender animation setup**

---

## Physical Dimensions

```
Light Guide Plate (LGP):
- Length: 330mm
- Width: 54mm
- Thickness: ~3-5mm (acrylic/PMMA)
- Edge type: Polished (for total internal reflection)

LED PCBs (×2):
- LED type: WS2812 2020 (2.0mm × 2.0mm)
- LEDs per strip: 160
- Total LEDs: 320
- Spacing: 330mm ÷ 160 = 2.0625mm center-to-center
- Mounting: Along the two long edges (330mm sides)
```

---

## LED Topology

```
Top View of K1:

     0  1  2  3  4  5  ... 158 159   ← LED Strip 1 (Top Edge)
    ┌─────────────────────────────┐
    │                             │
    │   330mm × 54mm LGP          │  ← Light diffuses inward
    │                             │
    └─────────────────────────────┘
    159 158 157 ... 3  2  1  0      ← LED Strip 2 (Bottom Edge, mirrored)

Coordinate System:
- X-axis: 330mm (length)
- Y-axis: 54mm (width)
- Z-axis: 3-5mm (thickness)

LED Indexing (in firmware):
- LED 0-159:   Top edge (left to right)
- LED 160-319: Bottom edge (right to left, mirrored)
```

---

## Dual Edge-Lit Light Guide Physics

### How It Works

```
Side View (cross-section):

LED → │░░░░░░░░░░░░░░░│ ← Acrylic LGP
      │    Light       │    (total internal reflection)
      │    diffuses    │
      │    through     │
      │    volume      │
LED → │░░░░░░░░░░░░░░░│

Result: Even, diffused glow with ZERO hotspots
```

### Light Behavior
1. **LEDs emit into edge** (polished acrylic surface)
2. **Total internal reflection** keeps light bouncing inside
3. **Microscopic surface texture** scatters light outward
4. **Dual edges** create symmetric, even illumination

### Why This Matters for Rendering
- **Not an LED strip**: Don't render individual LED dots
- **Volume illumination**: Render as emissive volume/plane
- **Edge sources**: Place point/area lights at edges, not on surface
- **Diffusion**: Use translucent/subsurface scattering material

---

## KeyShot Rendering Strategy

### ⚠️ CRITICAL: What Users Actually See

**Users DO NOT see individual LED dots.**

The K1 is a **glowing frosted surface** - like Apple Magic Keyboard backlight or Audi ambient lighting. Light enters at hidden edges, diffuses through the acrylic volume, and creates unified surface illumination.

**Visual Perception**:
- Frosted, semi-translucent surface (NOT glossy)
- Soft, diffused glow (NOT discrete LED pixels)
- Vertical gradient: edges slightly brighter, center slightly softer
- Additive blending: top and bottom lights blend in middle ~20% zone
- Motion appears as "surface flow" (like water ripples or light blooms)

**DO NOT RENDER**: 320 visible LED dots, matrix displays, or pixel grids

**DO RENDER**: Unified glowing plane with bloom/glow post-processing

---

### Recommended Approach: Volumetric Emissive Surface

**Geometry Setup**:
```
1. Main LGP: 330mm × 54mm × 4mm acrylic box
2. Hidden edge emitters: Two thin planes (330mm × 0.5mm) at top/bottom edges
   - Position: Flush with LGP edges, NOT visible to camera
   - Purpose: Light source only (camera never sees these)
```

**Material: Frosted Acrylic**
```
Base Material:
- Type: Translucent/Dielectric
- Color: Very slight blue tint (RGB: 250, 252, 255)
- IOR: 1.49 (PMMA acrylic)
- Roughness: 0.3-0.4 (CRITICAL: frosted, NOT polished)
- Transparency: 85-95%

Surface Treatment:
- Front/back faces: Slight roughness (simulates extraction features)
- Edge faces: Polished (0.0 roughness)

Subsurface Scattering:
- Enable: Yes
- Scatter distance: 5-8mm (creates vertical blending)
- Scatter color: White with hint of blue
- Density: Low (0.1-0.2)
```

**Animation Strategy**:

**Method 1: Emissive Texture Sequence (Recommended for Speed)**
```
1. Convert Snapwave JSON to vertical gradient images:
   - Input: 320 LED values per frame
   - Process: Apply vertical blending algorithm (see below)
   - Output: 330px × 54px images (one per frame)

2. Apply to LGP emissive channel:
   - Map texture to front face
   - Emissive intensity: 2.0-5.0 (adjust for desired glow)
   - Animate sequence at 30 FPS

3. Post-processing:
   - Bloom/glow: ESSENTIAL (strength 1.5-2.0)
   - Blur radius: 0.4-0.6
   - Threshold: 0.85
```

**Method 2: Volumetric Light Sources (Most Accurate)**
```
1. Create hidden edge light arrays:
   - Top edge: 160 area lights (2mm × 2mm each)
   - Bottom edge: 160 area lights (mirrored)
   - Position: Inside edge emitter planes (not visible to camera)

2. Animate light colors from Snapwave data:
   - Import LED values per frame
   - Map to light color/intensity
   - Let KeyShot's light solver handle diffusion

3. Rendering:
   - Samples: 1024+ (critical for subsurface scattering)
   - Ray bounces: 16+ (light needs to scatter through volume)
   - Caustics: Optional (adds realism but slower)
```

**Method 3: Hybrid (Best Quality + Control)**
```
1. Use Method 2 for physical accuracy (volumetric lights)
2. Add Method 1 as supplemental emissive overlay (5-10% contribution)
3. Blend:
   - 90% physical light solver (realism)
   - 10% emissive texture (ensures exact pattern fidelity)
```

---

### Vertical Blending Algorithm

**CRITICAL**: Top and bottom LED edges don't create distinct zones. They blend additively in the middle.

**Influence Distribution**:
```
Vertical Position (0.0 = bottom, 1.0 = top):

Top Edge Influence:    Bottom Edge Influence:
    1.0 ┤ ████              0.0 ┤
    0.8 ┤ ████              0.2 ┤ ░░
    0.6 ┤ ████              0.4 ┤ ░░░
    0.4 ┤ ▓▓░░  ← BLEND    0.6 ┤ ░░░░
    0.2 ┤ ░░                0.8 ┤ ████
    0.0 ┤                   1.0 ┤ ████
        └────────                └────────
     Bottom   Top            Bottom   Top
```

**Blending Formula** (for texture generation):
```python
def calculate_surface_color(y_position, top_color, bottom_color):
    """
    y_position: 0.0 (bottom edge) to 1.0 (top edge)
    top_color: RGB from CH2 (top edge LEDs)
    bottom_color: RGB from CH1 (bottom edge LEDs)
    """
    # Brightness falloff from edges (power curve creates soft blend)
    bottom_influence = (1.0 - y_position) ** 1.5
    top_influence = y_position ** 1.5

    # Additive blending
    r = bottom_color.r * bottom_influence + top_color.r * top_influence
    g = bottom_color.g * bottom_influence + top_color.g * top_influence
    b = bottom_color.b * bottom_influence + top_color.b * top_influence

    return RGB(r, g, b)
```

**Zone Breakdown**:
- **Top ~40%**: Top edge dominant (80-100% top, 0-20% bottom)
- **Middle ~20%**: Additive blend zone (40-60% each)
- **Bottom ~40%**: Bottom edge dominant (80-100% bottom, 0-20% top)

**NO hard horizontal lines** - all transitions are smooth gradients

---

### Post-Processing: Bloom/Glow is MANDATORY

Without bloom, the LGP looks like a dull plastic panel. With bloom, it becomes a glowing surface.

**KeyShot Post-Processing**:
```
Enable Bloom/Glow:
- Strength: 1.5-2.5 (adjust to taste)
- Radius: 0.4-0.8 (wider = softer glow)
- Threshold: 0.7-0.9 (only bright areas glow)

Optional Enhancements:
- Lens effects: Subtle (0.1-0.2 strength)
- Chromatic aberration: Disabled (looks artificial)
- Vignette: Subtle edge darkening (0.05-0.1)
```

**In Blender/After Effects**:
```
Compositor/Effect Chain:
1. Base render (LGP with emissive)
2. Gaussian Blur (radius 20-40px at 1080p)
3. Add blend mode (composite over base)
4. Opacity: 40-60%
5. Levels adjustment (brighten slightly)
```

---

## Snapwave Simulator → KeyShot Workflow

### Step 1: Generate Animation Data
1. Open `snapwave-simulator.html`
2. **Enable "Mirror Mode"** (critical for dual-edge representation)
3. Adjust chromagram/amplitude for desired pattern
4. Click "Export KeyShot Data"
5. Receive `snapwave_keyshot_data.json` (raw LED data)

### Step 2: Convert to Surface Textures (NEW - Proper Method)

**⚠️ UPDATED**: Convert raw LED data to **surface textures** with vertical blending.

**Option A: Surface Texture Sequence (Recommended)**
```bash
python scripts/convert-snapwave-to-surface.py \
    snapwave_keyshot_data.json \
    output_surface_frames/ \
    --width 330 \
    --height 54 \
    --blend-exponent 1.5
```
Result: `frame_0000.png` through `frame_0449.png` (330×54 pixels each)
- **330px width**: One pixel per LED (horizontal axis)
- **54px height**: Vertical surface with proper blending
- **Blending**: Top/bottom edges blended with power curve (y^1.5)

**Option B: Raw LED Data (Legacy - For Debugging Only)**
```bash
python scripts/convert-snapwave-to-images.py \
    snapwave_keyshot_data.json \
    output_frames/
```
Result: `frame_0000.png` (320×1 pixels) - shows discrete LED values
⚠️ **NOT recommended for final renders** (doesn't show surface diffusion)

**Option C: CSV for Custom Scripting**
```bash
python scripts/convert-snapwave-to-images.py \
    snapwave_keyshot_data.json \
    animation_data.csv
```
Result: CSV with columns `frame,led,r,g,b,r_norm,g_norm,b_norm`

### Step 3: KeyShot Setup (Surface Texture Method)

#### Recommended Workflow:
```
1. Create K1 geometry:
   - Main LGP: 330mm × 54mm × 4mm box
   - Material: Frosted acrylic (see Material Properties section)

2. Apply surface texture sequence:
   - Emissive → Texture → Type: Image Sequence
   - Select: output_surface_frames/frame_0000.png
   - Mapping: Planar (front face)
   - Scale: Fit to face (330mm × 54mm)
   - Emissive intensity: 3.0-5.0

3. Animation settings:
   - FPS: 30
   - Duration: 15 seconds (450 frames)
   - Loop: Enabled

4. Render settings:
   - Samples: 1024+
   - Bloom/glow: MANDATORY (strength 1.5-2.0)
   - Resolution: 1920×1080 (hero video)

5. Output:
   - Format: H.264 MP4
   - Target size: <5MB (for web)
```

#### Alternative: Volumetric Light Method (Most Accurate, Slower)
```
Use scripts/generate-keyshot-lights.py to create light array:

python scripts/generate-keyshot-lights.py \
    animation_data.csv \
    keyshot_light_script.py

Then import into KeyShot Python console to create 320 animated lights.
See Method 2 in "Recommended Approach" section above.
```

---

## Understanding Mirror Mode in Simulator

When **Mirror Mode is enabled** in `snapwave-simulator.html`:

```
Visual Display:
┌───────────────────────┐
│ ░░░░▓▓▓░░░░          │ ← Top half (LEDs 0-159, Top edge)
│ ────────────────────  │ ← Mirror line
│ ░░░░▓▓▓░░░░          │ ← Bottom half (LEDs 160-319, Bottom edge)
└───────────────────────┘

This represents:
- Top section: Light from top edge of K1
- Bottom section: Light from bottom edge of K1 (mirrored pattern)
- Scrolling direction: Time axis (newest at bottom)
```

**Why mirror?**
- Snapwave's algorithm already mirrors the pattern via `mirror_image_downwards()`
- Top 160 LEDs set the pattern
- Bottom 160 LEDs copy it (creates symmetric dual-edge effect)
- Matches actual K1 hardware behavior

---

## Material Properties for Acrylic LGP

### KeyShot Material Setup

```
Material: Translucent Acrylic
- Type: Solid
- Color: Very slight blue tint (RGB: 250, 252, 255)
- Transparency: 95%
- IOR (Index of Refraction): 1.49
- Roughness: 0.02 (very smooth)
- Subsurface Scattering:
  - Enabled: Yes
  - Scatter Distance: 5mm
  - Scatter Color: White with hint of blue
  - Density: Low (0.1-0.2)

Edge Treatment:
- Edges: Polished (0.0 roughness)
- No edge chamfer (sharp 90° edges)
```

### Blender Material Setup

```
Shader Nodes:
1. Principled BSDF:
   - Base Color: (0.98, 0.99, 1.0)
   - Metallic: 0.0
   - Roughness: 0.02
   - IOR: 1.49
   - Transmission: 0.95

2. Subsurface Scattering:
   - Method: Random Walk
   - Scale: 0.005 (5mm in meters)
   - Radius: (1.0, 1.0, 1.0)

3. Volume Scatter (optional):
   - Density: 0.01
   - Anisotropy: 0.0
```

---

## Camera Angles for Hero Video

### Recommended Shots

**1. Front View (Primary)**
```
Camera: Orthographic or slight perspective
Position: Centered on K1, facing front
Distance: ~500mm from subject
FOV: 35-50mm equivalent
Shows: Full LED pattern, dual-edge symmetry
```

**2. 3/4 View (Depth)**
```
Camera: 45° angle from corner
Position: Slightly elevated (~20° above horizontal)
Shows: Thickness, edge lighting sources, 3D form
```

**3. Close-up Edge Detail**
```
Camera: Macro focus on one edge
Position: Side view, focused on LED edge
Shows: Individual LED animation, light entering edge
```

**4. Under Monitor Context**
```
Camera: Wide shot with desk setup
Position: Eye level, monitor visible above
Shows: K1 in actual use case, ambient glow
```

---

## Animation Tips for Snapwave

### For Maximum Visual Impact

**Chromagram Settings**:
- Use 2-4 notes (not all 12) for cleaner patterns
- Major chords (C+E+G) create harmonious motion
- Single notes show pure oscillation
- Dim7 chords create energetic chaos

**Amplitude Settings**:
- 0.6-0.8 for balanced energy
- 0.9+ for dramatic, staccato motion
- <0.5 for smooth, ambient flow

**Duration**:
- Hero video: 15s loop (perfect for landing page autoplay)
- Showcase: 5s tight loops (pattern detail)
- Demo reel: 30s with variety (show range)

### Rendering Settings

**Quality (KeyShot)**:
- Samples: 1024+ per pixel
- Ray bounces: 16+ (for subsurface scattering)
- Resolution: 1920×1080 (hero), 3840×2160 (if needed)
- Format: H.264, 30 FPS, <5MB final file

**Post-Processing**:
- Slight glow/bloom (emulate light diffusion)
- Color grade to match K1 brand palette
- Compress to target file size

---

## Common Rendering Mistakes to Avoid

❌ **Don't**: Render LEDs as visible dots on the surface
✓ **Do**: Render as edge light sources with volume diffusion

❌ **Don't**: Use flat emissive material on LGP surface
✓ **Do**: Use translucent material with subsurface scattering

❌ **Don't**: Ignore the dual-edge nature (show only one edge)
✓ **Do**: Mirror pattern or show both edges lit

❌ **Don't**: Export without mirror mode enabled
✓ **Do**: Enable mirror mode in simulator for accurate dual-edge data

❌ **Don't**: Render at 60 FPS (bloats file size)
✓ **Do**: 30 FPS is perfect for web delivery

---

## Quick Reference: Export Checklist

Before clicking "Export KeyShot Data":

- [ ] Mirror mode: **Enabled** (for dual-edge)
- [ ] Chromagram: Set to desired musical pattern
- [ ] Amplitude: 0.6-0.8 for balanced motion
- [ ] Playback: Running for 5+ seconds (verify pattern looks good)
- [ ] Export: Generates `snapwave_keyshot_data.json`

After export:

- [ ] Convert to image sequence OR CSV
- [ ] Import into KeyShot
- [ ] Set up K1 geometry (330×54×4mm)
- [ ] Apply emissive/translucent material
- [ ] Render test frame (verify colors/brightness)
- [ ] Render full animation
- [ ] Compress to <5MB for web

---

## Next Steps

1. Open `snapwave-simulator.html` in browser
2. Test presets with mirror mode enabled
3. Find pattern you like (C Major chord is a good start)
4. Export data
5. Follow KeyShot setup guide above
6. Render test frame
7. Iterate on material/lighting
8. Render final hero video

**Goal**: 15-second looping video showing Snapwave pattern on dual edge-lit K1 hardware, <5MB, ready for landing page hero section.
