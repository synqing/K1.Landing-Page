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

### Option A: Emissive Geometry (Recommended)

```
Geometry Setup:
1. Light guide plate: 330mm × 54mm × 4mm box
2. Material: Translucent acrylic (IOR 1.49, slight blue tint)
3. Edge emissive strips: Two thin planes (330mm × 0.5mm) at long edges

Animation Strategy:
1. Create 160 point lights along each edge (320 total)
2. Space lights 2.0625mm apart
3. Animate color/intensity per frame from Snapwave data
4. Let KeyShot's light solver handle diffusion
```

**Pros**:
- Physically accurate light behavior
- KeyShot handles diffusion/scattering
- Clean, realistic result

**Cons**:
- 320 animated lights = slow render
- Complex setup

### Option B: Emissive Texture (Fast Prototyping)

```
Geometry Setup:
1. Light guide plate: 330mm × 54mm × 4mm box
2. Material: Emissive shader with animated texture

Texture Setup:
1. Convert Snapwave JSON to image sequence (320×1 pixels)
2. Map to emissive channel
3. Use UV projection to stretch across edges
4. Animate texture sequence at 30 FPS
```

**Pros**:
- Fast setup, fast render
- Easy iteration
- Good for prototyping

**Cons**:
- Less physically accurate
- Won't capture true light guide behavior

### Option C: Hybrid (Best Quality)

```
1. Use Option A for light sources (320 point lights)
2. Add Option B's texture as supplemental emissive overlay
3. Blend between light solver (realism) and texture (control)
```

---

## Snapwave Simulator → KeyShot Workflow

### Step 1: Generate Animation Data
1. Open `snapwave-simulator.html`
2. **Enable "Mirror Mode"** (critical for dual-edge representation)
3. Adjust chromagram/amplitude for desired pattern
4. Click "Export KeyShot Data"
5. Receive `snapwave_keyshot_data.json`

### Step 2: Convert to KeyShot Format

**Option A: Image Sequence**
```bash
python scripts/convert-snapwave-to-images.py \
    snapwave_keyshot_data.json \
    output_frames/
```
Result: `frame_0000.png` through `frame_0449.png` (320×1 pixels each)

**Option B: CSV for Scripting**
```bash
python scripts/convert-snapwave-to-images.py \
    snapwave_keyshot_data.json \
    animation_data.csv
```
Result: CSV with columns `frame,led,r,g,b,r_norm,g_norm,b_norm`

### Step 3: KeyShot Setup

#### For Image Sequence Method:
```
1. Create K1 geometry (330×54×4mm box)
2. Create emissive material
3. Diffuse → Texture → Type: Image Sequence
4. Select frame_0000.png from output_frames/
5. Set Animation → FPS: 30
6. Set UV mapping: Edge projection
7. Render animation (15s = 450 frames)
```

#### For Light Array Method (Python):
```python
import keyshot

# Load CSV data
frames = load_csv('animation_data.csv')

# Create 320 lights along edges
for i in range(160):
    # Top edge lights
    x = (i / 160.0) * 330  # Position along 330mm edge
    light_top = create_point_light(pos=[x, 54, 2])  # Top edge

    # Bottom edge lights (mirrored)
    light_bottom = create_point_light(pos=[x, 0, 2])  # Bottom edge

    # Keyframe colors from CSV
    for frame in frames:
        if frame['led'] == i:
            set_light_color(light_top, frame, rgb=[...])
        if frame['led'] == i + 160:
            set_light_color(light_bottom, frame, rgb=[...])
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
