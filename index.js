
/**
 * Dependencies
 */

var Backbone = require('backbone')
  , _ = require('underscore');

/**
 * Export extended view
 */

var View = module.exports = Backbone.View.extend({
  template: '<div></div>'
});

/**
 * Setup, called on initialize
 */

View.prototype.setup = function() {
  this.views = {};
  this.rendered = false;
  this.on('renderedStateChange', function(rendered) {
    this.rendered = rendered;
    this.onRenderedStateChange(rendered);
    
    _.each(this.views, function(view, key) {
      view.trigger('renderedStateChange', rendered);
    });

    if (!rendered) {
      this.undelegateEvents();
    }
  }, this);
  return this;
};

/**
 * Default initialize
 */

View.prototype.initialize = function() {
  this.setup();
  return this;
};

/**
 * Default render
 */

View.prototype.render = function() {
  this.$el.html(this.template);
  return this;
};

/**
 * Empty rendered state change function
 */

View.prototype.onRenderedStateChange = function(rendered) {
  return this;
};

/**
 * Destroy a view
 */

View.prototype.destroy = function() {
  this.trigger('renderedStateChange', false);

  if (this.collection) this.collection.off(null, null, this);
  if (this.model) this.model.off(null, null, this);

  _.each(this.views, function(view) {
    view.destroy();
  });

  this.remove();
};
