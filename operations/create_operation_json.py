# -*- coding: utf-8 -*-

import json
import codecs
import pprint
from xml.dom import minidom
from cjklib.reading import ReadingFactory
f = ReadingFactory()


operations = [
    {
        'patient' : (u'她', 'she', 'ta1', 'left'),
        'donors'  : [(u'妈', 'mother', 'ma1'), 
                    (u'姐', 'older sister', 'jie3'),
                    (u'妹', 'younger sister', 'mei4')]
    },
    {
        'patient' : (u'池', 'pool', 'chi2', 'left'),
        'donors'  : [(u'汤', 'soup', 'tang1'), 
                     (u'沉', 'to sink', 'chen2'), 
                     (u'江', 'river', 'jiang1')]
    },
    {
        'patient' : (u'狗', 'dog', 'gou3', 'left'),
        'donors'  : [(u'猫', 'cat', 'mao1'), 
                     (u'猴', 'monkey', 'hou2'), 
                     (u'狮', 'lion', 'shi1')]
    },
    {
        'patient' : (u'洋', 'ocean', 'yang2', 'right'),
        'donors'  : [(u'样', 'likeness', 'yang4'), 
                     (u'佯', 'to pretend', 'yang2'),
                     (u'烊', 'molten', 'yang2')]
    },
    {
        'patient' : (u'妈', 'mother', 'ma1', 'right'),
        'donors'  : [(u'吗', 'question particle', 'ma'),
                     (u'码', 'a weight', 'ma3'),
                     (u'玛', 'agate', 'ma3')]
    },
    {
        'patient' : (u'请', 'please', 'qing3', 'right'),
        'donors'  : [(u'情', 'emotion', 'qing2'), 
                     (u'晴', 'fine (weather)', 'qing1'),
                     (u'清', 'clear, pure', 'qing1')]
    },
]


def create_component(filename, missing_position=None):

    # read svg file and extract info from top line
    with codecs.open(filename, 'r', 'utf-8') as svg_file:
        svg = svg_file.read()

        doc = minidom.parse(filename)
        
        component = doc.getElementsByTagName('svg')[0].getAttribute('component')
        position =  doc.getElementsByTagName('svg')[0].getAttribute('portion')
        width = float(doc.getElementsByTagName('svg')[0].getAttribute('viewBox').split()[2])

        doc.unlink()
        
        if missing_position is None:  # it's a donor component
            behavior = 'source'
        elif missing_position is True:  # it's the missing component of the patient
            behavior = 'sink'
        else:  # it's a non-missing component of the patient
            behavior = 'static'
        
        return {
            'component': component,
            'svg': svg,
            'width': width,
            'behavior': behavior,
        }


def create_character(char, meaning, pinyin, missing_position='left'):

    # set unicode
    codepoint = char.encode('unicode_escape')[-4:]

    # auto-find Pinyin using cjklib
    pinyin = f.convert(pinyin, 'Pinyin', 'Pinyin', sourceOptions={'toneMarkType': 'numbers', 'missingToneMark': 'fifth'})

    return {
        'char': char,
        'codepoint': codepoint,
        'id': codepoint,
        'meaning': meaning,
        'pinyin': pinyin,
        'components': {
            'left':  create_component('../svg/' + codepoint + '-left-half.svg' , 
                                      None if missing_position is None else missing_position == 'left'),
            'right': create_component('../svg/' + codepoint + '-right-half.svg', 
                                      None if missing_position is None else missing_position == 'right')
        }
    }    


def create_patient(char, meaning, pinyin, missing_position):
    return create_character(char, meaning, pinyin, missing_position=missing_position)


def create_donor(char, meaning, pinyin):
    return create_character(char, meaning, pinyin, missing_position=None)


def create_operation(op_dict):
    return {
        'patient': create_patient(*op_dict['patient']),
        'donors': [create_donor(*op) for op in op_dict['donors']]
    }


operation_objects = list()
for opdict in operations:
    operation_objects.append(create_operation(opdict))
    
#from pprint import pprint
#pprint(operation_objects)

print json.dumps(operation_objects, indent=4, ensure_ascii=False, sort_keys=True).encode('utf8')
