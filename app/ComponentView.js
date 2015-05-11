/*
 * ComponentView.js 
 * A view for showing an indiviaul component,
 * with various behaviors.
 */

var $ = require('jquery');
require('./jquery-ui-shim');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var ComponentView = Marionette.ItemView.extend({
    className: 'hh-component',

    template: _.template(''),

    onRender: function() {
        var behavior = this.model.get('behavior');

        // Set svg.
        this.$svg = $(this.model.get('svg'));
        if (behavior == 'sink') {
            this.$svg.css('opacity', 0);
        }
        this.$el.append(this.$svg);

        // Setup drag-and-drop behavior.
        if (behavior == 'source') {
            this.$svg.draggable({
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
                            _this.trigger('drop', {isCorrect: dropIsCorrect});
                        });
                    });
                },
            });
            this.$el.addClass('sink');
        }
    },

});

module.exports = ComponentView;
