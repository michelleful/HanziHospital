from __future__ import division
import re
import glob
from PIL import Image

def find_leftmost_point(img_path):
    """
    Finds the position of the leftmost coloured pixel in the image
    """
    img = Image.open(img_path)
    pixels = img.load()

    # we need to go down columns from left to right, find first point that's coloured
    for x in xrange(img.size[0]):
        for y in xrange(img.size[1]):
            if pixels[x,y][3]:  # alpha channel non-transparent
                return x, y


def find_rightmost_point(img_path):
    """
    Finds the position of the rightmost coloured pixel in the image
    """
    img = Image.open(img_path)
    pixels = img.load()

    # we need to go down columns from right to left, find first point that's coloured
    for x in reversed(xrange(img.size[0])):
        for y in xrange(img.size[1]):
            if pixels[x,y][3]:  # alpha channel non-transparent
                return x, y


def find_cut_point(left_img_path, right_img_path):
    """
    Find the best cut point in a left-right character, the midpoint between the 
    left and right components. If they overlap, this is the midpoint between
    their rightmost and leftmost points respectively.
    """
    rightmost_left_point = find_rightmost_point(left_img_path)[0]
    leftmost_right_point = find_leftmost_point(right_img_path)[0]
    return (leftmost_right_point + rightmost_left_point) / 2


def edit_left_svg(svg_file_path, midpoint_x):
    """
    Edit the left component SVG file to reflect the new midpoint
    - change width to midpoint_x
    """
    with open(svg_file_path, 'r') as f:
        doc = f.read()
        new_doc = doc.replace('width="1000"', 'width="%s"' % midpoint_x)

        new_filename = svg_file_path.replace('.svg', '') + '-half.svg'
        with open(new_filename, 'w') as g:
            g.write(new_doc)


def edit_right_svg(svg_file_path, midpoint_x):
    """
    Edit the right component SVG file to reflect the new midpoint
    - change width to 1000 - midpoint_x
    - change all the absolute Move instructions to (M - midpoint)
    """
    with open(svg_file_path, 'r') as f:
        doc = f.read()
        new_doc = doc.replace('width="1000"', 'width="%s"' % (1000 - midpoint_x))
        
        # now do the absolute moves
        old_moves = re.findall('M\s?\d+', new_doc)
        new_moves = ['M' + str(int(m[1:]) - midpoint_x) for m in old_moves]
        
        for old, new in zip(old_moves, new_moves):
            new_doc = new_doc.replace(old, new, 1)

        new_filename = svg_file_path.replace('.svg', '') + '-half.svg'
        with open(new_filename, 'w') as g:
            g.write(new_doc)


def edit_svgs(svg_file_path):
    """
    Given the FULL SVG file, figure out where to cut the pieces
    by measuring the midpoint between the left and right components.
    Edit the -left and -right SVGs accordingly. 
    """
    left_png_file_path = svg_file_path.replace('/svg/', '/png/').replace('.svg', '-left.svg.png')
    right_png_file_path = svg_file_path.replace('/svg/', '/png/').replace('.svg', '-right.svg.png')

    cut_point = find_cut_point(left_png_file_path, right_png_file_path)

    left_svg_file_path = svg_file_path.replace('.svg', '-left.svg')
    right_svg_file_path = svg_file_path.replace('.svg', '-right.svg')

    edit_left_svg(left_svg_file_path, cut_point)
    edit_right_svg(right_svg_file_path, cut_point)
    

full_char_svgs = [filename for filename in glob.glob('../svg/*.svg') if '-' not in filename]
for char in full_char_svgs:
    edit_svgs(char)
