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

        $('.hh-donor.ghosted').fadeTo('short', 1);

        var $selectedDonor = $(e.currentTarget);
        $selectedDonor.fadeTo('short', .5).promise().then(() => {
            $selectedDonor.addClass('ghosted');
            var donorId = $selectedDonor.data('id');
            var donorModel = this.collection.get(donorId);
            this.trigger('donor:selected', donorModel.toJSON());
        });
    }
});

module.exports = DonorsView;
