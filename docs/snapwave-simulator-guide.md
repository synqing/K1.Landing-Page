# Snapwave Simulator Usage Guide

**Location**: `/snapwave-simulator.html`

**Purpose**: Interactive real-time simulator of the exact Snapwave algorithm from LightwaveOS, enabling visualization testing and KeyShot animation data export.

---

## Quick Start

1. **Open in browser**: `snapwave-simulator.html`
2. **Adjust chromagram sliders**: Control the 12 musical notes (C through B)
3. **Adjust amplitude**: Control the overall energy level
4. **Watch visualization**: Real-time 320 LED strip display
5. **Export data**: Click "Export KeyShot Data" when you find a pattern you like

---

## Controls

### Chromagram Sliders (12 Notes)
- **C, C#, D, D#, E, F, F#, G, G#, A, A#, B**
- Range: 0.00 to 1.00
- Note threshold: 0.1 (notes below this don't contribute to motion)
- Each note contributes with different phase offset (creates interference patterns)

### Amplitude
- **Peak Level**: 0.00 to 1.00
- Controls overall energy/brightness
- Affects trail fade rate (higher = faster fade)

### Presets
- **C Major Chord**: C + E + G (pleasant, rhythmic motion)
- **Diminished 7th**: C + D# + F# + A (tense, rapid oscillation)
- **Full Chromatic**: All 12 notes active (maximum chaos)
- **Single Note (C)**: Pure sine wave at 0.159 Hz
- **Single Note (A)**: Rapid oscillation at 0.875 Hz
- **Reset All**: Clear all notes and amplitude

### Playback
- **Pause/Play**: Freeze/resume animation
- **Reset**: Clear time counter and LED buffer

### Export Options
- **Mirror Mode**: Enable to mirror top half to bottom (160 LEDs per edge)
- **Export KeyShot Data**: Generate 15-second JSON animation file

---

## Understanding the Visualization

### The Display
- **Horizontal axis**: 320 individual LEDs (or 160 per edge if mirrored)
- **Vertical axis**: Time (scrolling upwards)
- **Newest dot**: Bottom row
- **Trails**: Fade based on amplitude (louder = shorter trails)

### The Motion
- **Oscillation**: Time-based sine wave synthesis from active chromagram notes
- **Position**: -1 (left) to +1 (right), mapped to LED 0-319
- **Snap**: Hyperbolic tangent creates characteristic "snappy" limiting

### Stats Display
- **Time**: Elapsed milliseconds since reset
- **Frame**: Total frames rendered
- **Position**: Current LED index (0-319)
- **Oscillation**: Raw oscillation value before amplitude scaling

---

## How the Algorithm Works

### 1. Time-Based Oscillation
```
For each active note (chromagram > 0.1):
    oscillation += note_value × sin(time × 0.001 × (1.0 + note_index × 0.5))
```

**Key characteristics**:
- Each note has different frequency (phase offset)
- C (note 0): 0.159 Hz
- A (note 9): 0.875 Hz
- Multiple notes create interference patterns

### 2. Hyperbolic Tangent Normalization
```
oscillation = tanh(oscillation × 2.0)
```

**Creates**:
- "Snap" effect when oscillation is large
- Smooth motion when oscillation is small
- Natural motion boundaries at ±1.0

### 3. Amplitude Modulation
```
final_position = oscillation × smoothed_amplitude × 0.7
```

**98% smoothing** on amplitude (very slow response)

### 4. Color Synthesis
- Each chromagram note maps to hue (C=0°, C#=30°, D=60°, etc.)
- Active notes (>0.05 after squaring) contribute to final color
- Colors mixed additively, normalized by total magnitude

### 5. Dynamic Trails
- Fade factor: `1.0 - (0.1 × amplitude)`
- Louder audio = faster fade = shorter trails
- Silence = slow fade = long, smooth trails

---

## Export Format

### JSON Structure
```json
[
  {
    "frame": 0,
    "time": 0.0,
    "leds": [
      {
        "index": 0,
        "r": 12345,
        "g": 23456,
        "b": 34567,
        "r_norm": 0.188,
        "g_norm": 0.358,
        "b_norm": 0.527
      },
      ...
    ]
  },
  ...
]
```

### Export Settings
- **Duration**: 15 seconds
- **Frame rate**: 30 FPS
- **Total frames**: 450
- **LEDs per frame**: 320 (or 160 if mirrored)
- **Color space**: RGB16 (0-65535) + normalized (0-1)

### File Size
- Typical: 15-25 MB (depending on activity)
- Format: Uncompressed JSON

---

## KeyShot Import Workflow

### Option A: Per-LED Animation
1. Create 320 emissive sphere objects in KeyShot
2. Write Python script to read JSON and keyframe each sphere's emissive color
3. Import script into KeyShot Python console

### Option B: Texture-Based Animation
1. Convert LED data to vertical texture strips (320px × 1px per frame)
2. Create image sequence (frame_0000.png, frame_0001.png, etc.)
3. Apply sequence to emissive plane in KeyShot
4. Use UV mapping to position LEDs correctly

### Option C: Light Array
1. Create 320 point lights in Blender/C4D
2. Bake LED colors to light intensity/color keyframes
3. Import baked scene into KeyShot

**Recommendation**: Option B is fastest for prototyping

---

## Musical Scenarios to Test

### Single Notes (Simple Motion)
- **C (0.159 Hz)**: Slow, smooth sine wave
- **E (0.477 Hz)**: Medium speed oscillation
- **A (0.875 Hz)**: Rapid oscillation

### Intervals (Interference Patterns)
- **C + E (Major 3rd)**: Pleasant 3:1 beat pattern
- **C + G (Perfect 5th)**: Stable 1.5:1 ratio
- **C + F# (Tritone)**: Tense 4:1 rapid oscillation

### Chords (Complex Motion)
- **C Major (C+E+G)**: Harmonious, rhythmic
- **C Dim7 (C+D#+F#+A)**: Chaotic, energetic
- **Full Chromatic**: Maximum complexity

### Amplitude Effects
- **Low (0.2)**: Long, smooth trails
- **Medium (0.5)**: Balanced energy
- **High (0.9)**: Short, staccato bursts

---

## Optimization Tips

### For Hero Video (15s loop)
1. Choose musical scenario (e.g., C Major chord)
2. Set amplitude to 0.7 (energetic but not chaotic)
3. Enable mirror mode
4. Export data
5. Render at 1080p or 4K in KeyShot
6. Compress to H.264 <5MB

### For Showcase Loops (5-10s)
1. Use single note or simple interval
2. Higher amplitude (0.8-0.9) for dramatic motion
3. Export shorter duration (modify export function)
4. Render at 720p for faster iteration

### For Music-Reactive Demo
1. Use actual chromagram data from audio analysis
2. Match amplitude envelope to audio waveform
3. Export longer duration (30s+)

---

## Troubleshooting

### "Motion is too slow"
- Increase note values (try 0.8-1.0)
- Use higher-frequency notes (A, A#, B)
- Increase amplitude

### "Motion is too chaotic"
- Use fewer notes (1-3 instead of 12)
- Lower note values (0.3-0.5)
- Use lower-frequency notes (C, D, E)

### "Trails are too short/long"
- Adjust amplitude (higher = shorter trails)
- Modify `max_fade_reduction` in code (currently 0.10)

### "Colors are too dim"
- Increase note values (brightness comes from chromagram)
- Increase `PHOTONS` multiplier in code (currently 1.0)

### "Export file is too large"
- Reduce duration (modify export function)
- Lower frame rate (30 → 24 FPS)
- Post-process JSON with compression

---

## Next Steps

1. **Test presets**: Click through all presets to understand behavior
2. **Create custom patterns**: Adjust individual notes to find interesting interference
3. **Export test data**: Generate a 15s loop for KeyShot testing
4. **Iterate**: Refine chromagram/amplitude based on rendered results
5. **Scale up**: Once workflow is proven, generate multiple variations

---

## Technical Notes

### Exact Algorithm Fidelity
This simulator implements the **exact** Snapwave algorithm from `/src/lightshow_modes.h:1393`, including:
- Time-based oscillation with per-note phase offsets
- Hyperbolic tangent normalization
- 98% amplitude smoothing
- Dynamic trail fading
- Chromagram color synthesis
- Mirror mode support

### Performance
- Runs at 60 FPS in browser
- Capable of real-time parameter adjustment
- Export pre-calculation handles 450 frames in <1 second

### Browser Compatibility
- Tested: Chrome, Firefox, Safari, Edge
- Requires: ES6 JavaScript support, Canvas API
- No external dependencies

---

## Questions?

- Algorithm details: See `/docs/snapwave-deep-technical-analysis.md`
- Original implementation: `/src/lightshow_modes.h:1393`
- KeyShot workflow: Experiment with texture-based approach first
