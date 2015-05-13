/**
 * HanziHospitalLayoutView.js
 * Main layout for HanziHospital.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var OperatingRoomView = require('./OperatingRoomView');
var ResultsView = require('./ResultsView');
var DonorsView = require('./DonorsView');

//@TODO: remove this!
var DUMMY_SRC = 'http://lorempixel.com/200/200/';


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
        console.log('HHV:onEvaluated', data);
        var resultsModel = new Backbone.Model(data);
        var resultsView = new ResultsView({model: resultsModel});
        //this.getRegion('message').show(resultsView);
        var $dialog = $('<div class="results-dialog"></div>');
        resultsView.$el = $dialog;
        resultsView.render();
        $dialog.dialog({
            autoOpen: true,
            show: {
                duration: 1000
            },
            hide: {
                duration: 1000
            }
        });

        var dfd = new $.Deferred();
        setTimeout(function() {
            $dialog.dialog('close');
            dfd.resolve();
        }, 2000);
         
        if (data.isCorrect) {
            dfd.then(() => {
                this.curOperation++;
                if (this.curOperation >= this.options.operations.length) {
                    // @TODO: show level end view.
                    window.location = '/HanziHospital/chapters/0/9';
                } else {
                    this.renderCurrentOperation();
                }
            });
        }
    },

});

module.exports = HanziHospitalView;
