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
    events: {
        'click .hh-donor': 'onClickDonor'
    },
    template: _.template(''
        + 'DONORS!'
        + '<ul></ul>'
        + ''
    ),
    childView: CharacterView,
    childViewOptions: {
        tagName: 'li',
        className: 'hh-donor'
    },
    childViewContainer: 'ul',

    onClickDonor: function(e){
        var donorId = $(e.currentTarget).data('id');
        var donorModel = this.collection.get(donorId);
        this.trigger('donor:selected', donorModel.toJSON());
    }
});

module.exports = DonorsView;
