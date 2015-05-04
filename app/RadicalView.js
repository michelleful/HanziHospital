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
            this.$img = $('<img draggable="false" src="' + this.model.get('src') + '"/>');
            this.$el.append(this.$img);
        }

        // Setup drag-and-drop behavior.
        if (behavior == 'source') {
            this.$img.draggable({
                revert: 'invalid',
            });
        } else if(behavior == 'sink') {
            var _this = this;

            this.$el.droppable({
                hoverClass: 'drop-hover',

                drop: function(event, ui){
                    var $draggable = $(ui.draggable);

                    // Evaluate result.
                    var dropIsCorrect = (
                        _this.model.get('expected') == $draggable.attr('src'));

                    // Update draggable element.
                    $draggable.fadeOut().promise().then(() => {
                        $(this).append($draggable);
                        $draggable.draggable('destroy');
                        $draggable.css({'top': '', 'left': ''});
                        $draggable.fadeIn().promise().then(() => {
                            _this.trigger('drop', {result: dropIsCorrect});
                        });
                    });
                },
            });
            this.$el.addClass('sink');
        }
    },

});

module.exports = RadicalView;
