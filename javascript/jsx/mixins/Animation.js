var dynamics = require("dynamics.js");
import clone from "reducers/Util.js";
var React = require("react");

export var Animation = {};

Animation.init = function(opts) {
    opts = opts || {};

    this._animStates = opts.animStates || {};
    this._animationDefinitions = opts.animationDefinitions || {};
};

Animation.addAnimation = function(name, anim) {
    this._animationDefinitions[name] = anim;
};

Animation.addAnimationState = function(name, state) {
    this._animStates[name] = state;
};





Animation.animateNode = function(el, state, animation, callback) {
    var finalAnim = clone(this._animationDefinitions[animation]);
    if (callback) {
        finalAnim.complete = callback;
    }

    dynamics.animate(el, this._animStates[state], finalAnim);
};

Animation.setNodeAnimState = function(el, state) {
    dynamics.css(React.findDOMNode(this), this._animStates[state]);
};

Animation.animateNodeBetween = function(el, from, to, animation, callback) {
    this.setNodeAnimState(el, from);
    this.animateNode(el, to, animation, callback);
};






Animation.setAnimState = function(state) {
    this.setNodeAnimState(React.findDOMNode(this), state);
};

Animation.animateBetween = function(from, to, animation, callback) {
    this.animateNodeBetween(React.findDOMNode(this), from, to, animation, callback);
};

Animation.animate = function(state, animation, callback) {
    this.animateNode(React.findDOMNode(this), state, animation, callback);
};






Animation.setChildAnimState = function(selector, state) {
    this.setNodeAnimState($(React.findDOMNode(this)).find(selector)[0], state);
};

Animation.animateChildBetween = function(selector, from, to, animation, callback) {
    this.animateNodeBetween($(React.findDOMNode(this)).find(selector)[0], from, to, animation, callback);
};

Animation.animateChild = function(selector, state, animation, callback) {
    this.animateNode($(React.findDOMNode(this)).find(selector)[0], state, animation, callback);
};



