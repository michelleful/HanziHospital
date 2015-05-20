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

    template: _.template('<div class="hh-component-container"></div>'),

    ui: {
        container: '.hh-component-container'
    },

    onRender: function() {

        var behavior = this.options.behavior || this.model.get('behavior');
        this.$el.addClass(behavior);

        // Set spacer svg.
        this.$svg = $(this.model.get('svg'));
        this.$svg.attr('data-component', this.model.get('component'));
        this.$svg.css('opacity', 0);
        this.ui.container.append(this.$svg);

        this.$avatar= this.$svg.clone();
        this.$avatar.addClass('avatar');
        this.$avatar.css({
            'opacity': 1,
            'position': 'absolute',
            'z-index': 10
        });

        if (behavior == 'sink') {
            this.$avatar.css({'opacity': 0});
        }

        this.ui.container.append(this.$avatar);

        // Setup drag-and-drop behavior.
        if (behavior == 'source') {
            this.$residue = this.$avatar.clone();
            this.$residue.addClass('residue');
            this.$residue.css({
                'opacity': .5,
                'position': 'absolute',
                'z-index': 9
            });
            this.ui.container.append(this.$residue);

            this.$avatar.draggable({
                revert: true,
            });
        } else if(behavior == 'sink') {
            var _this = this;

            this.ui.container.droppable({
                hoverClass: 'drop-hover',
                drop: function(event, ui){
                    var $draggable = ui.draggable;

                    var isCorrect = (
                        _this.model.get('component') == $draggable.data('component'));

                    if (isCorrect) {
                        $draggable.fadeTo('slow', 0).promise().then(() => {
                            _this.ui.container.addClass('correct');
                            _this.$avatar.fadeTo('slow', 1).promise().then(function() {
                                setTimeout(function() {
                                    _this.trigger('drop', {isCorrect: isCorrect});
                                }, 500);
                            });
                        });
                    } else {
                        $draggable.parent().addClass('incorrect');
                        setTimeout(function() {
                            _this.trigger('drop', {isCorrect: isCorrect});
                        }, 1000);
                    }
                },
            });
            this.$el.addClass('sink');
        }
    },

});

module.exports = ComponentView;
