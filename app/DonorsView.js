/*
 * DonorsView.js 
 * A view for showing donors.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var CharacterView = require('./CharacterView');


var DonorsView = Marionette.CompositeView.extend({
    className: 'hh-donors',
    template: _.template(''
        + 'DONORS!'
        + '<ul></ul>'
        + ''
    ),
    childView: CharacterView,
    childViewOptions: {
        tagName: 'li'
    },
    childViewContainer: 'ul'
});

module.exports = DonorsView;
