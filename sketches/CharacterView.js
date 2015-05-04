/*
 * Pseudocode for character view.
 */

// One idea is to define hanzi views in terms of behaviors.
// There are three main behaviors: source, sink, static.
// When a sink component receives a drag, it would trigger an event.

// A hanzi with both halves being sources.
var source = new HanziView({
    components: {
        left: {
            behavior: 'source',
            charId: '/hanzi/003.svg',
        },
        right: {
            behavior: 'source',
            charId: '/hanzi/004.svg'
        }
    }
});


// A hanzi with one half as a sink, the other half as a a static image.
var target = new HanziView({
    components: {
        left: {
            behavior: 'sink',
            expected: '004.svg',
        },
        right: {
            behavior: 'static',
            charId: '/hanzi/004.svg'
        }
    }
});

target.on('sink:received', function(sinkComponent, sourceComponent) {
    if (sinkComponent.expected == sourceComponent.charId) {
        // Correct :)
    } else {
        // Incorrect :(
    }
});
