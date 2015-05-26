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
        + '<div class="gurney patient" style="visibility: hidden;"><div class="gurney-top"><div class="label">Patient</div></div><div class="gurney-bottom"><div class="patient-region gurney-content"></div></div></div>'
        + '<div class="gurney donor" style="visibility: hidden;"><div class="gurney-top"><div class="label">Donor</div></div><div class="gurney-bottom"><div class="donor-region gurney-content"></div></div></div>'
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
        setTimeout(() => {
            var patientPromise = this.renderPatient(this.model.get('patient'));

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
            this.$el.find('.gurney').css('visibility', 'visible');
        }, 200);
    },

    toggleGurney: function(gurneyId, opts) {
        var $gurney = this.ui[gurneyId + 'Gurney'];
        var promises = [];

        var effectDefaults = {duration: 800};

        if (opts.fadeIn) {
            $gurney.css('opacity', .01);
            promises.push($gurney.fadeTo(effectDefaults.duration, 1).promise());
        }

        if (opts.slideIn) {
            $gurney.css('display', 'none');
            promises.push($gurney.show('slide', _.extend(effectDefaults, opts.slideIn)));
        }

        if (opts.slideOut) {
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

    wheelOut: function() {
        var promises = [];
        promises.push(this.toggleGurney('patient', {slideOut: {direction: 'left'}}));
        promises.push(this.toggleGurney('donor', {slideOut: {direction: 'right'}}));
        return $.when.apply($, promises);
    }

});

module.exports = OperatingRoomView;
