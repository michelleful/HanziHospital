/**
 * HanziHospitalLayoutView.js
 * Main layout for HanziHospital.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var CharacterView = require('./CharacterView');

//@TODO: remove this!
var DUMMY_SRC = 'http://lorempixel.com/200/200/';


var HanziHospitalLayoutView = Marionette.LayoutView.extend({
    template: _.template(''
        + '<div class="receiver-region"></div>'
        + '<div class="donor-region"></div>'
        + ''
    ),

    regions: {
        receiver: '.receiver-region',
        donor: '.donor-region'
    },

    onRender: function() {

        // Render receiver.
        var receiverModel = new Backbone.Model({
            radicals: {
                left: {
                    behavior: 'sink',
                },
                right: {
                    behavior: 'static',
                    // @TODO: get from data.
                    src: DUMMY_SRC,
                }
            }
        });
        var receiverView = new CharacterView({model: receiverModel});
        this.getRegion('receiver').show(receiverView);

        // Render donor.
        // @TODO: will do this dynamically later after selecting donor.
        var donorModel = new Backbone.Model({
            radicals: {
                left: {
                    behavior: 'source',
                    // @TODO: get from data.
                    src: DUMMY_SRC,
                },
                right: {
                    behavior: 'source',
                    // @TODO: get from data.
                    src: DUMMY_SRC,
                }
            }
        });
        var donorView = new CharacterView({model: donorModel});
        this.getRegion('donor').show(donorView);

    }

});

module.exports = HanziHospitalLayoutView;
