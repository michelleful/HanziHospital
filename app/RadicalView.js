/*
 * RadicalView.js 
 * A view for showing an indiviaul radical,
 * with various behaviors.
 */

var $ = require('jquery');
require('jquery-ui');
require('jquery-ui/themes/ui-lightness/jquery-ui.css');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var RadicalView = Marionette.ItemView.extend({
    className: 'hh-radical',

    template: _.template(''),

    onRender: function() {
        var behavior = this.model.get('behavior');

        // Add image if not a sink.
        if (behavior != 'sink') {
            this.$img = $('<img src="' + this.model.get('src') + '"/>');
            this.$el.append(this.$img);
        }

        // Setup drag-and-drop behavior.
        if (behavior == 'source') {
            this.$img.draggable({
                revert: 'invalid',
                snap: '.hh-radical.sink',
                snapMode: 'inner'
            });
        } else if(behavior == 'sink') {
            this.$el.droppable();
            this.$el.addClass('sink');
        }
    }
});

module.exports = RadicalView;
