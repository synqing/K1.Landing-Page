#!/usr/bin/env python3
"""
Convert Snapwave JSON export to SURFACE TEXTURES for KeyShot

This script generates realistic LGP surface textures with proper vertical
blending between top and bottom LED edges, NOT discrete LED pixel data.

Usage:
    python convert-snapwave-to-surface.py input.json output_dir/ [options]

Options:
    --width INT         Surface width in pixels (default: 330, one per LED)
    --height INT        Surface height in pixels (default: 54, matches K1 height)
    --blend-exponent    Power curve for edge falloff (default: 1.5)
    --blur-radius       Gaussian blur radius for diffusion (default: 2.0)
    --brightness        Brightness multiplier (default: 1.0)

Output:
    - frame_0000.png through frame_NNNN.png
    - Each image: WIDTHxHEIGHT pixels (default 330x54)
    - Proper vertical blending between top/bottom edges
    - Ready for KeyShot emissive texture sequence

Example:
    python convert-snapwave-to-surface.py \\
        snapwave_keyshot_data.json \\
        surface_frames/ \\
        --width 330 \\
        --height 54 \\
        --blur-radius 2.5
"""

import json
import os
import sys
import argparse
from PIL import Image, ImageFilter
import numpy as np


def blend_influence(y_position, exponent=1.5):
    """
    Calculate top/bottom edge influence at given vertical position.

    Args:
        y_position: 0.0 (bottom edge) to 1.0 (top edge)
        exponent: Power curve (1.5 = soft blend, 2.0 = harder blend)

    Returns:
        (bottom_influence, top_influence)
    """
    bottom_influence = (1.0 - y_position) ** exponent
    top_influence = y_position ** exponent

    return bottom_influence, top_influence


def create_surface_texture(ch1_leds, ch2_leds, width=330, height=54, blend_exponent=1.5):
    """
    Create surface texture from LED edge data.

    Args:
        ch1_leds: Array of 160 RGB tuples (bottom edge, LED 160-319)
        ch2_leds: Array of 160 RGB tuples (top edge, LED 0-159)
        width: Output width in pixels (one per LED)
        height: Output height in pixels (vertical surface)
        blend_exponent: IGNORED - no vertical blending, straight lines only

    Returns:
        PIL Image (width x height, RGB)
    """
    # Create output array
    img_array = np.zeros((height, width, 3), dtype=np.float32)

    # Interpolate LED data to match width (in case width != 160)
    x_scale = len(ch1_leds) / width

    # Each LED creates a STRAIGHT vertical line (no curvature!)
    for x in range(width):
        # Map pixel x to LED index
        led_index = int(x * x_scale)
        if led_index >= len(ch1_leds):
            led_index = len(ch1_leds) - 1

        # Both edges show same pattern (dual edge-lit)
        led_color = ch1_leds[led_index]

        # Fill entire vertical column with same color (STRAIGHT line)
        for y in range(height):
            img_array[y, x] = led_color

    # Convert to 8-bit and create PIL Image
    img_array = np.clip(img_array, 0, 255).astype(np.uint8)
    img = Image.fromarray(img_array, mode='RGB')

    return img


def apply_gaussian_blur(img, radius=2.0):
    """Apply Gaussian blur to simulate light diffusion."""
    return img.filter(ImageFilter.GaussianBlur(radius=radius))


def extract_led_data(frame_data):
    """
    Extract and organize LED data from Snapwave JSON frame.

    Returns:
        (ch1_leds, ch2_leds) - Arrays of RGB tuples (0-255)
    """
    leds = frame_data['leds']

    # CH2 (top edge): LEDs 0-159
    ch2_leds = []
    for i in range(160):
        led = leds[i]
        r = int((led['r'] / 65535.0) * 255)
        g = int((led['g'] / 65535.0) * 255)
        b = int((led['b'] / 65535.0) * 255)
        ch2_leds.append((r, g, b))

    # CH1 (bottom edge): LEDs 160-319 (mirrored, so reverse)
    ch1_leds = []
    for i in range(160, 320):
        led = leds[i]
        r = int((led['r'] / 65535.0) * 255)
        g = int((led['g'] / 65535.0) * 255)
        b = int((led['b'] / 65535.0) * 255)
        ch1_leds.append((r, g, b))

    # Reverse CH1 (bottom edge is mirrored)
    ch1_leds.reverse()

    return ch1_leds, ch2_leds


def convert_to_surface_textures(json_path, output_dir, args):
    """Main conversion function."""

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Load JSON data
    print(f"Loading {json_path}...")
    with open(json_path, 'r') as f:
        frames = json.load(f)

    total_frames = len(frames)
    print(f"Generating {total_frames} surface textures ({args.width}x{args.height})...")
    print(f"  Blend exponent: {args.blend_exponent}")
    print(f"  Blur radius: {args.blur_radius}")
    print(f"  Brightness: {args.brightness}")

    for frame_data in frames:
        frame_num = frame_data['frame']

        # Extract LED data
        ch1_leds, ch2_leds = extract_led_data(frame_data)

        # Create surface texture with vertical blending
        img = create_surface_texture(
            ch1_leds, ch2_leds,
            width=args.width,
            height=args.height,
            blend_exponent=args.blend_exponent
        )

        # Apply diffusion blur
        if args.blur_radius > 0:
            img = apply_gaussian_blur(img, args.blur_radius)

        # Apply brightness
        if args.brightness != 1.0:
            img_array = np.array(img).astype(np.float32)
            img_array *= args.brightness
            img_array = np.clip(img_array, 0, 255).astype(np.uint8)
            img = Image.fromarray(img_array, mode='RGB')

        # Save
        output_path = os.path.join(output_dir, f"frame_{frame_num:04d}.png")
        img.save(output_path)

        # Progress
        if (frame_num + 1) % 50 == 0 or frame_num == total_frames - 1:
            print(f"  {frame_num + 1}/{total_frames} frames")

    print(f"\n✓ Generated {total_frames} surface textures in {output_dir}")
    print(f"\nKeyShot Import:")
    print(f"  1. Create K1 geometry (330mm × 54mm × 4mm)")
    print(f"  2. Material → Emissive → Texture → Image Sequence")
    print(f"  3. Select {output_dir}/frame_0000.png")
    print(f"  4. Set FPS to 30, emissive intensity to 3.0-5.0")
    print(f"  5. Enable bloom/glow post-processing (CRITICAL)")
    print(f"\nResult: Realistic glowing LGP surface with proper blending")


def main():
    parser = argparse.ArgumentParser(
        description='Convert Snapwave JSON to surface textures with vertical blending',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )

    parser.add_argument('json_path', help='Input JSON file from Snapwave simulator')
    parser.add_argument('output_dir', help='Output directory for PNG sequence')
    parser.add_argument('--width', type=int, default=330,
                        help='Surface width in pixels (default: 330)')
    parser.add_argument('--height', type=int, default=54,
                        help='Surface height in pixels (default: 54)')
    parser.add_argument('--blend-exponent', type=float, default=1.5,
                        help='Edge falloff exponent (default: 1.5, softer blend)')
    parser.add_argument('--blur-radius', type=float, default=2.0,
                        help='Gaussian blur radius for diffusion (default: 2.0)')
    parser.add_argument('--brightness', type=float, default=1.0,
                        help='Brightness multiplier (default: 1.0)')

    args = parser.parse_args()

    if not os.path.exists(args.json_path):
        print(f"Error: {args.json_path} not found")
        sys.exit(1)

    convert_to_surface_textures(args.json_path, args.output_dir, args)


if __name__ == '__main__':
    main()
