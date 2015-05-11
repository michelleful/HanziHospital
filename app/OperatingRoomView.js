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
        + '<div class="patient-region gurney"></div>'
        + '<div class="donor-region gurney"></div>'
        + ''
    ),

    regions: {
        patient: '.patient-region',
        donor: '.donor-region'
    },

    modelEvents: {
        'change:donor': 'onDonorChange'
    },

    onRender: function() {
        this.renderPatient(this.model.get('patient'));

        if (this.model.get('donor')) {
            this.renderDonor(this.model.get('donor'));
        }
    },

    renderPatient: function(patient) {
        // Render receiver.
        var patientModel = new Backbone.Model(patient);
        var patientView = new CharacterView({model: patientModel});
        this.getRegion('patient').show(patientView);
        patientView.once('drop', this.onDrop, this);
    },

    renderDonor: function(donor, opts) {
        opts = _.extend({fadeIn: true}, opts);
        var donorModel = new Backbone.Model(donor);
        var donorView = new CharacterView({model: donorModel});
        if (opts.fadeIn) {
            donorView.$el.css('opacity', .5);
        }
        this.getRegion('donor').show(donorView);
        donorView.$el.fadeTo('short', 1);
    },

    onDonorChange: function() {
        this.renderDonor(this.model.get('donor'));
    },

    onDrop: function(dropData) {
        this.trigger('evaluated', dropData);
    }

});

module.exports = OperatingRoomView;
