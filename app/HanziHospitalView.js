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
        + '<div class="main-region"></div>'
        + '<div class="donors-region"></div>'
        + ''
    ),

    regions: {
        main: '.main-region',
        donors: '.donors-region'
    },

    onRender: function() {

        // Render operating room..
        // @TODO: get data dynamically.
        var operatingRoomModel = new Backbone.Model({});
        var operatingRoomView = new OperatingRoomView({
            model: operatingRoomModel
        });
        operatingRoomView.on('evaluated', this.onEvaluated, this);
        this.getRegion('main').show(operatingRoomView);

        // Render donors.
        var donorsCollection = new Backbone.Collection([
            new Backbone.Model({
                components: {
                    left: {
                        behavior: 'static',
                        src: DUMMY_SRC,
                    },
                    right: {
                        behavior: 'static',
                        src: DUMMY_SRC,
                    }
                }
            }),
            new Backbone.Model({
                components: {
                    left: {
                        behavior: 'static',
                        src: DUMMY_SRC,
                    },
                    right: {
                        behavior: 'static',
                        src: DUMMY_SRC,
                    }
                }
            }),
        ]);
        var donorsView = new DonorsView({
            collection: donorsCollection
        });
        this.getRegion('donors').show(donorsView);


    },

    onEvaluated: function(data) {
        console.log('HHV:onEvaluated', data);
        var resultsModel = new Backbone.Model(data);
        var resultsView = new ResultsView({model: resultsModel});
        this.getRegion('main').show(resultsView);
    },

});

module.exports = HanziHospitalView;
