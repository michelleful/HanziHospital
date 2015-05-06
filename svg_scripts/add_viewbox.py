"""
Standardises SVG format to include xmlns and use viewbox rather than setting height and width.
"""

import glob
import re
import os

# Want to replace:
# <svg width="353.0" height="1000">
# with:
# <svg viewBox="0 0 353 1000" xmlns="http://www.w3.org/2000/svg">

def replace_svg_def(line):
    # extract out width and height
    width = re.findall('width="(\S+?)"', line)[0]
    height = re.findall('height="(\S+?)"', line)[0]
    
    return '<svg viewBox="0 0 %s %s" xmlns="http://www.w3.org/2000/svg">\n' % (width, height)


def fix_file(filename):
    temp_filename = filename.replace('/svg/', '/svg/tmp-')
    with open(filename, 'r') as f:
        with open(filename.replace('/svg/', '/svg/tmp-'), 'w') as g:
            for line in f:
                if '<svg ' in line:
                    line = replace_svg_def(line)
                g.write(line)
    # replace the file
    os.rename(temp_filename, filename)

for filename in glob.glob('../svg/*.svg'):
    if 'tmp-' not in filename:
        fix_file(filename)
