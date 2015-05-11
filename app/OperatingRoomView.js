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

    onRender: function() {
        this.renderPatient(this.model.get('patient'));
    },

    renderPatient: function(patient) {
        // Render receiver.
        var patientModel = new Backbone.Model(patient);
        var patientView = new CharacterView({model: patientModel});
        this.getRegion('patient').show(patientView);
        patientView.once('drop', this.onDrop, this);
    },

    renderDonor: function(donor) {
        // @TODO: will do this dynamically later after selecting donor.
        var donorModel = new Backbone.Model({});
        var donorView = new CharacterView({model: donorModel});
        this.getRegion('donor').show(donorView);
    },

    onDrop: function(dropData) {
        console.log('OR onDrop', dropData);
        this.trigger('evaluated', dropData);
    }

});

module.exports = OperatingRoomView;
