#!/usr/bin/env python3
"""
Convert Snapwave JSON export to image sequence for KeyShot

Usage:
    python convert-snapwave-to-images.py snapwave_keyshot_data.json output_dir/

Generates:
    - frame_0000.png, frame_0001.png, etc.
    - Each image: 320x1 pixels (one pixel per LED)
    - Color: RGB values from Snapwave simulation

For KeyShot:
    1. Create emissive material
    2. Apply image sequence as diffuse/emissive texture
    3. Map to light guide geometry
"""

import json
import os
import sys
from PIL import Image
import numpy as np


def convert_json_to_images(json_path, output_dir):
    """Convert Snapwave JSON export to PNG sequence"""

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Load JSON data
    print(f"Loading {json_path}...")
    with open(json_path, 'r') as f:
        frames = json.load(f)

    total_frames = len(frames)
    print(f"Processing {total_frames} frames...")

    for frame_data in frames:
        frame_num = frame_data['frame']
        leds = frame_data['leds']

        # Create image array (320 x 1 pixels)
        img_array = np.zeros((1, 320, 3), dtype=np.uint8)

        for led in leds:
            idx = led['index']
            # Convert from 16-bit (0-65535) to 8-bit (0-255)
            r = int((led['r'] / 65535.0) * 255)
            g = int((led['g'] / 65535.0) * 255)
            b = int((led['b'] / 65535.0) * 255)

            img_array[0, idx] = [r, g, b]

        # Create PIL Image
        img = Image.fromarray(img_array, mode='RGB')

        # Save with zero-padded frame number
        output_path = os.path.join(output_dir, f"frame_{frame_num:04d}.png")
        img.save(output_path)

        # Progress
        if (frame_num + 1) % 50 == 0 or frame_num == total_frames - 1:
            print(f"  {frame_num + 1}/{total_frames} frames")

    print(f"\n✓ Generated {total_frames} images in {output_dir}")
    print(f"\nKeyShot Import:")
    print(f"  1. Create emissive plane (320:1 aspect ratio)")
    print(f"  2. Material → Diffuse → Texture → Image Sequence")
    print(f"  3. Select {output_dir}/frame_0000.png")
    print(f"  4. Set FPS to 30")


def convert_json_to_vertical_strip(json_path, output_path, strip_height=320):
    """
    Convert Snapwave JSON to single vertical strip image

    For scrolling visualization:
    - Width: 320 pixels (one per LED)
    - Height: Number of frames (scrolls over time)
    """

    print(f"Loading {json_path}...")
    with open(json_path, 'r') as f:
        frames = json.load(f)

    total_frames = len(frames)
    print(f"Creating vertical strip ({total_frames}x320)...")

    # Create image array (height = frames, width = 320 LEDs)
    img_array = np.zeros((total_frames, 320, 3), dtype=np.uint8)

    for frame_data in frames:
        frame_num = frame_data['frame']
        leds = frame_data['leds']

        for led in leds:
            idx = led['index']
            r = int((led['r'] / 65535.0) * 255)
            g = int((led['g'] / 65535.0) * 255)
            b = int((led['b'] / 65535.0) * 255)

            img_array[frame_num, idx] = [r, g, b]

        if (frame_num + 1) % 50 == 0:
            print(f"  {frame_num + 1}/{total_frames} frames")

    # Create and save PIL Image
    img = Image.fromarray(img_array, mode='RGB')
    img.save(output_path)

    print(f"\n✓ Saved vertical strip: {output_path}")
    print(f"  Dimensions: {total_frames}px tall × 320px wide")


def convert_json_to_csv(json_path, output_path):
    """
    Convert to CSV for easier scripting in KeyShot Python console

    Format: frame,led,r,g,b,r_norm,g_norm,b_norm
    """

    print(f"Loading {json_path}...")
    with open(json_path, 'r') as f:
        frames = json.load(f)

    total_frames = len(frames)
    print(f"Converting {total_frames} frames to CSV...")

    with open(output_path, 'w') as csvfile:
        csvfile.write("frame,led,r,g,b,r_norm,g_norm,b_norm\n")

        for frame_data in frames:
            frame_num = frame_data['frame']
            leds = frame_data['leds']

            for led in leds:
                csvfile.write(f"{frame_num},{led['index']},{led['r']},{led['g']},{led['b']},"
                             f"{led['r_norm']:.6f},{led['g_norm']:.6f},{led['b_norm']:.6f}\n")

            if (frame_num + 1) % 50 == 0:
                print(f"  {frame_num + 1}/{total_frames} frames")

    print(f"\n✓ Saved CSV: {output_path}")


def main():
    if len(sys.argv) < 3:
        print("Usage:")
        print("  python convert-snapwave-to-images.py input.json output_dir/  # Image sequence")
        print("  python convert-snapwave-to-images.py input.json output.png   # Vertical strip")
        print("  python convert-snapwave-to-images.py input.json output.csv   # CSV format")
        sys.exit(1)

    json_path = sys.argv[1]
    output_path = sys.argv[2]

    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found")
        sys.exit(1)

    # Determine output format
    if output_path.endswith('.csv'):
        convert_json_to_csv(json_path, output_path)
    elif output_path.endswith('.png'):
        convert_json_to_vertical_strip(json_path, output_path)
    elif os.path.isdir(output_path) or output_path.endswith('/'):
        convert_json_to_images(json_path, output_path)
    else:
        print("Error: Output must be .csv, .png, or directory path")
        sys.exit(1)


if __name__ == '__main__':
    main()
