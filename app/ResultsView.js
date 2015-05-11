/*
 * ResultsView.js 
 * A view for showing results of an operation.
 */

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('./marionette-shim');


var ResultsView = Marionette.ItemView.extend({
    className: 'hh-results',

    template: _.template(''
        + '<div class="msg"></div>'
        + '<button class="next">&gt;</button>'
        + ''
    ),

    ui: {
        msg: '.msg',
        nextButton: '.next'
    },

    triggers: {
        'click @ui.nextButton': 'next'
    },

    onRender: function() {
        var isCorrect = this.model.get('isCorrect');
        var txt = isCorrect ? 'The sweet spark of life still burns :)' : 'Mortality :(';
        var cssClass = isCorrect ? 'correct' : 'incorrect';
        this.ui.msg.html(txt);
        this.$el.addClass(cssClass);
    },

});

module.exports = ResultsView;
