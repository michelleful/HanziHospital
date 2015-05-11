`operations.json` gives a complete specification of 'operations', which are single 'exercises' in which the player 'heals' an injured character by 'transplanting' components from 'donor' characters.

`operations.json` is a list of dictionaries, each of which has two fields:
- 'patient' (dictionary)
- 'donors' (a list of dictionaries).

Each character dictionary has these fields:
- character (UTF-8)
- codepoint (Unicode codepoint, string)
- meaning
- pinyin (UTF-8)
- components

Each component has these fields:
- component (UTF-8), replaces 'accepts' in our original specification - EVERY component specifies what it accepts regardless of whether it's missing or not
- svg string, with xmlns and viewBox set
- behavior
  - if character is a patient and this is the missing component, set to 'sink'
  - if character is a patient and this is the non-missing component, set to 'static'
  - if character is a donor, set to 'source'


