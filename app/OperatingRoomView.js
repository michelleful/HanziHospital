/**
 * OperatingRoomLayoutView.js
 * Layout for operating room.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var CharacterView = require('./CharacterView');

//@TODO: remove this!
var DUMMY_SRC = 'http://lorempixel.com/200/200/';


var OperatingRoomView = Marionette.LayoutView.extend({
    className: 'hh-operating-room',
    template: _.template(''
        + '<div class="receiver-region gurney"></div>'
        + '<div class="donor-region gurney"></div>'
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
        receiverView.once('drop', this.onDrop, this);

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
    },

    onDrop: function(dropData) {
        console.log('OR onDrop', dropData);
        this.trigger('evaluated', dropData);
    }

});

module.exports = OperatingRoomView;
