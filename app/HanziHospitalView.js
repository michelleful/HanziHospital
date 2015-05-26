/**
 * HanziHospitalLayoutView.js
 * Main layout for HanziHospital.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');
require('script!zurb-foundation-5/js/foundation/foundation');
require('script!zurb-foundation-5/js/foundation/foundation.reveal');

var OperatingRoomView = require('./OperatingRoomView');
var ResultsView = require('./ResultsView');
var DonorsView = require('./DonorsView');


var HanziHospitalView = Marionette.LayoutView.extend({
    template: _.template(''
        + '<div class="message-region"></div>'
        + '<div class="main-region"></div>'
        + '<div class="donors-region"></div>'
        + ''
    ),

    regions: {
        message: '.message-region',
        main: '.main-region',
        donors: '.donors-region'
    },

    initialize: function() {
        this.curOperation = 0;
    },


    onRender: function() {
        this.renderCurrentOperation();
    },

    renderCurrentOperation() {
        this.renderOperation(this.options.operations[this.curOperation]);
    },

    renderOperation(operation) {
        // Render operating room..
        // @TODO: get data dynamically.
        this.operatingRoomModel = new Backbone.Model({
            patient: operation.patient
        });
        this.operatingRoomView = new OperatingRoomView({
            model: this.operatingRoomModel
        });
        this.operatingRoomView.on('evaluated', this.onEvaluated, this);
        this.getRegion('main').show(this.operatingRoomView);

        // Render donors.
        var donorsCollection = new Backbone.Collection();
        _.each(operation.donors, function(donor) {
            donorsCollection.add(new Backbone.Model(donor));
        });
        var donorsView = new DonorsView({
            collection: donorsCollection
        });
        donorsView.on('donor:selected', this.onDonorSelected, this);
        this.getRegion('donors').show(donorsView);
    },

    onDonorSelected: function(donorModel) {
        this.operatingRoomModel.set('donor', donorModel);
    },

    onEvaluated: function(data) {
        var $dialogEl = $('<div class="reveal-modal" data-reveal></div>');
        var $resultsEl = $('<div class="alert-box"></div>');
        $resultsEl.addClass(data.isCorrect ? 'success' : 'alert');

        var resultsModel = new Backbone.Model(data);
        var resultsView = new ResultsView({model: resultsModel});
        resultsView.$el = $resultsEl;
        $resultsEl.appendTo($dialogEl);
        resultsView.render();

        $dialogEl.appendTo($('body')).foundation('reveal').foundation('reveal', 'open');

        var dfd = new $.Deferred();
        setTimeout(function() {
            $dialogEl.on('closed.reveal-modal', function () {
                $dialogEl.remove();
                dfd.resolve();
            });
            $dialogEl.foundation('reveal', 'close');
        }, 2000);
         
        if (data.isCorrect) {
            dfd.then(() => {
                this.curOperation++;
                if (this.curOperation >= this.options.operations.length) {
                    // @TODO: show level end view.
                    window.location = '/HanziHospital/chapters/0/9';
                } else {
                    this.operatingRoomView.wheelOut().then(() => {
                        this.renderCurrentOperation();
                    });
                }
            });
        }
    },

});

module.exports = HanziHospitalView;
