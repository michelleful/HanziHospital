# -*- coding: utf-8 -*-

import codecs
from xml.dom import minidom

# parse SVG file and extract a dictionary of codepoints to paths
svg_file = 'UKaiCN.svg'
doc = minidom.parse(svg_file)
unicode_to_path = {glyph.getAttribute('glyph-name'): glyph.getAttribute('d') for glyph in doc.getElementsByTagName('glyph')}
doc.unlink()

characters_to_extract = [
    u'妈', u'姐', u'妹', u'她',
    u'江', u'沉', u'池', u'汤',
    u'狗', u'猫', u'狮', u'猴',
    u'清', u'情', u'晴', u'请', 
    u'样', u'洋', u'佯', u'烊',
           u'码', u'吗', u'玛',
]

for char in characters_to_extract:
    codepoint = char.encode('unicode_escape')[-4:]
    glyph_name = 'uni' + codepoint.upper()
    
    try:
        # get path
        path = unicode_to_path[glyph_name]
    except KeyError:
        print "Could not find codepoint %s for character %s" % (codepoint, char)
    else:    

        # build new svg file
        with codecs.open('%s.svg' % codepoint, 'w', 'utf-8') as f:
            f.write(
'''    
<svg width="1000" height="1000">
    <g transform="translate(0,900)">
    <g transform="scale(1,-1)">
        <path char="%s" portion="whole" d="%s"></path>
    </g>
    </g>
</svg>
''' % (char, path)
            )
