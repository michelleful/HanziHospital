/*
 * DonorsView.js 
 * A view for showing donors.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');


var DonorsView = Marionette.ItemView.extend({
    className: 'hh-donors',
    template: _.template(''
        + 'DONORS!'
        + ''
    ),
});

module.exports = DonorsView;
