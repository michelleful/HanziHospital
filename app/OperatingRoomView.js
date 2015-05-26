/**
 * OperatingRoomLayoutView.js
 * Layout for operating room.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');
require('jquery-ui');

var CharacterView = require('./CharacterView');

var OperatingRoomView = Marionette.LayoutView.extend({
    className: 'hh-operating-room',
    template: _.template(''
        + '<div class="gurney patient"><div class="gurney-top"><div class="label">Patient</div></div><div class="gurney-bottom"><div class="patient-region gurney-content"></div></div></div>'
        + '<div class="gurney donor"><div class="gurney-top"><div class="label">Donor</div></div><div class="gurney-bottom"><div class="donor-region gurney-content"></div></div></div>'
        + ''
    ),

    regions: {
        patient: '.patient-region',
        donor: '.donor-region'
    },

    ui: {
        patientGurney: '.patient .gurney-bottom',
        donorGurney: '.donor .gurney-bottom',
    },

    modelEvents: {
        'change:donor': 'onDonorChange'
    },

    onRender: function() {
        this.renderPatient(this.model.get('patient'));

        if (this.model.get('donor')) {
            this.renderDonor(this.model.get('donor'));
        } else {
            var BlankView = Marionette.ItemView.extend({
                template: _.template(""
                    + "<p><b>Click</b> a donor below, then <b>drag</b> part of it to do a transplant!</p>"
                )
            });
            this.getRegion('donor').show(new BlankView());
            this.toggleGurney('donor', {slideIn: {direction: 'right'}});
        }
    },

    toggleGurney: function(gurneyId, opts) {
        var $gurney = this.ui[gurneyId + 'Gurney'];
        var promises = [];

        var effectDefaults = {duration: 'slow'};

        if (opts.fadeIn) {
            $gurney.css('opacity', .5);
            promises.push($gurney.fadeTo('short', 1).promise());
        }

        if (opts.slideIn) {
            $gurney.css('display', 'none');
            promises.push($gurney.show('slide', _.extend(effectDefaults, opts.slideIn)));
        }

        if (opts.slideOut) {
            $gurney.css('display', 'none');
            promises.push($gurney.hide('slide', _.extend(effectDefaults, opts.slideOut)));
        }

        return $.when.apply($, promises);
    },

    renderPatient: function(patient) {
        // Render receiver.
        var patientModel = new Backbone.Model(patient);
        var patientView = new CharacterView({model: patientModel});
        this.getRegion('patient').show(patientView);
        patientView.on('drop', this.onDrop, this);
        return this.toggleGurney('patient', {slideIn: {direction: 'left'}});
    },

    renderDonor: function(donor, opts) {
        var donorModel = new Backbone.Model(donor);
        var donorView = new CharacterView({model: donorModel});
        this.getRegion('donor').show(donorView);
        return this.toggleGurney('donor', {slideIn: {direction: 'right'}});
    },

    onDonorChange: function() {
        this.renderDonor(this.model.get('donor'));
    },

    onDrop: function(dropData) {
        this.trigger('evaluated', dropData);
    },

});

module.exports = OperatingRoomView;
