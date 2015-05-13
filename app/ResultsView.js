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
        + ''
    ),

    ui: {
        msg: '.msg',
    },

    triggers: {
    },

    onRender: function() {
        var isCorrect = this.model.get('isCorrect');
        var txt = isCorrect ? 'Operation successful!' : 'Try again rookie';
        var cssClass = isCorrect ? 'correct' : 'incorrect';
        this.ui.msg.html(txt);
        this.$el.addClass(cssClass);
    },

});

module.exports = ResultsView;
