/*
 * ResultsView.js 
 * A view for showing results of an operation.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');


var ResultsView = Marionette.ItemView.extend({
    className: 'hh-results',

    template: _.template(''),

    onRender: function() {
        var isCorrect = this.model.get('isCorrect');
        var txt = isCorrect ? 'The sweet spark of life still burns :)' : 'Mortality :(';
        var cssClass = isCorrect ? 'correct' : 'incorrect';
        this.$el.html(txt);
        this.$el.addClass(cssClass);
    },

});

module.exports = ResultsView;
