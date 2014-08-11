/*global jQuery: false*/

// Check namespace
Samples.Form = Samples.Form || {};

/*
 * #######################
 * ##### Constructor #####
 * #######################
 */

/**
 * Creates an new form question instance.
 *
 * @constructor
 */
Samples.Form.Question = function () {

    /**
     * The question registration id.
     *
     * @property _id
     * @protected
     * @type {Number}
     */
    this._id = null;

    /**
     * The question inputs.
     *
     * @property inputs
     * @private
     * @type {Array}
     */
    this.inputs = [];

    /**
     * The question type.
     *
     * @property type
     * @private
     * @type {String}
     */
    this.type = null;

    /**
     * The question container.
     *
     * @property container
     * @private
     * @type {Samples.Form.Question.Container}
     */
    this.container = null;

    /**
     * The question name.
     *
     * @property name
     * @private
     * @type {String}
     */
    this.name = null;

    /**
     * The question on change event listeners.
     *
     * @property onChangeListeners
     * @private
     * @type {Array}
     */
    this.onChangeListeners = [];

    /**
     * The question plugins.
     *
     * @property plugins
     * @private
     * @type {Array}
     */
    this.plugins = [];

    /**
     * The question validators.
     *
     * @property validators
     * @private
     * @type {Array}
     */
    this.validators = [];

    /**
     * Indicates if the question is valid or not.
     *
     * @property isValid
     * @private
     * @type {Boolean}
     */
    this.isValid = null;

};

/*
 * ##################
 * ##### Extend #####
 * ##################
 */

/**
 * Extends the given sub class.
 *
 * @method extend
 * @static
 * @param {Object} value
 */
Samples.Form.Question.extend = function (value) {

    // Define base class
    function Inheritance() {
    }

    // Define base class prototype
    Inheritance.prototype = Samples.Form.Question.prototype;

    // Define sub class prototype
    value.prototype = new Inheritance();

    // Define sub class prototype constructor
    value.prototype.constructor = value;

    // Define sub class base constructor
    value.baseConstructor = Samples.Form.Question;

    // Define sub class super class
    value.superClass = Samples.Form.Question.prototype;

};

/*
 * ##########################
 * ##### Initialisation #####
 * ##########################
 */

/**
 * Initialises the question.
 *
 * @method _initialise
 * @protected
 */
Samples.Form.Question.prototype._initialise = function () {

};

/*
 * ##################
 * ##### Inputs #####
 * ##################
 */

/**
 * Returns the question inputs.
 *
 * @method getInputs
 * @return {Object}
 */
Samples.Form.Question.prototype.getInputs = function () {
    return this.inputs;
};

/**
 * Returns the question input with the given index.
 *
 * @method getInput
 * @param {Number} value the index, defaults to 0
 * @return {jQuery}
 */
Samples.Form.Question.prototype.getInput = function (value) {

    // Check value
    if (_.isUndefined(value)) {
        value = 0;
    }

    return jQuery(this.inputs.get(value));

};

/**
 * Sets the question inputs.
 *
 * @method setInputs
 * @param {Object} value
 * @return {Samples.Form.Question}
 */
Samples.Form.Question.prototype.setInputs = function (value) {

    var self = this;

    // Set inputs
    this.inputs = value;

    // Bind on change event listeners
    value.change(function (e) {

        // Fire on change event
        self.fireOnChangeEvent();

    });

    return this;

};

/*
 * ################
 * ##### Type #####
 * ################
 */

/**
 * Returns the question type.
 *
 * @method getType
 * @return {String}
 */
Samples.Form.Question.prototype.getType = function () {
    return this.type;
};

/*
 * #####################
 * ##### Container #####
 * #####################
 */

/**
 * Returns the question container instance.
 *
 * @method getContainer
 * @return {Samples.Form.Question.Container}
 */
Samples.Form.Question.prototype.getContainer = function () {
    return this.container;
};

/**
 * Sets the question container instance.
 *
 * @method setContainer
 * @param {Samples.Form.Question.Container} value
 * @return {Samples.Form.Question}
 */
Samples.Form.Question.prototype.setContainer = function (value) {

    // Set container
    this.container = value;

    return this;

};

/*
 * ################
 * ##### Name #####
 * ################
 */

/**
 * Returns the question name.
 *
 * @method getName
 * @return {String}
 */
Samples.Form.Question.prototype.getName = function () {
    return this.name;
};

/**
 * Sets the question name.
 *
 * @method setName
 * @param {String} value
 * @return {Samples.Form.Question}
 */
Samples.Form.Question.prototype.setName = function (value) {

    // Set name
    this.name = value;

    return this;

};

/*
 * #####################
 * ##### Listeners #####
 * #####################
 */

/*
 * ++++++++++++++
 * +++ Change +++
 * ++++++++++++++
 */

/**
 * Returns the question on change event listeners.
 *
 * @method getOnChangeListeners
 * @return {Array}
 */
Samples.Form.Question.prototype.getOnChangeListeners = function () {
    return this.onChangeListeners;
};

/**
 * Adds the given on change event listener.
 *
 * @method addOnChangeListener
 * @param {Function} value the event callback
 * @return {Samples.Form.Question}
 */
Samples.Form.Question.prototype.addOnChangeListener = function (value) {

    // Add listener
    this.onChangeListeners.push(value);

    return this;

};

/**
 * Fires the on change event.
 *
 * @method fireOnChangeEvent
 */
Samples.Form.Question.prototype.fireOnChangeEvent = function () {

    // Fire global on change event
    Samples.Form.Observer.fireOnChangeEvent(this);

    // List on change event listeners
    for (var i = 0; i < this.onChangeListeners.length; i++) {
        this.onChangeListeners[i](this);
    }

};

/*
 * ++++++++++++
 * +++ Show +++
 * ++++++++++++
 */

/**
 * The on pre show event hook.
 *
 * @method _onPreShow
 * @protected
 */
Samples.Form.Question.prototype._onPreShow = function () {

};

/**
 * The on post show event hook.
 *
 * @method _onPostShow
 * @protected
 */
Samples.Form.Question.prototype._onPostShow = function () {

};

/*
 * ++++++++++++
 * +++ Hide +++
 * ++++++++++++
 */

/**
 * The on pre hide event hook.
 *
 * @method _onPreHide
 * @protected
 */
Samples.Form.Question.prototype._onPreHide = function () {

};

/**
 * The on post hide event hook.
 *
 * @method _onPostHide
 * @protected
 */
Samples.Form.Question.prototype._onPostHide = function () {

};

/*
 * ++++++++++++++
 * +++ Delete +++
 * ++++++++++++++
 */

/**
 * The on pre delete event hook.
 *
 * @method _onPreDelete
 * @protected
 */
Samples.Form.Question.prototype._onPreDelete = function () {

};

/**
 * The on post delete event hook.
 *
 * @method _onPostDelete
 * @protected
 */
Samples.Form.Question.prototype._onPostDelete = function () {

};

/*
 * ##################
 * ##### Plugin #####
 * ##################
 */

/**
 * Returns the question plugins.
 *
 * @method getPlugins
 * @return {Array}
 */
Samples.Form.Question.prototype.getPlugins = function () {
    return this.plugins;
};

/**
 * Adds the given question plugin.
 *
 * @method addPlugin
 * @param {Samples.Form.Question.Plugin} value
 * @return {Samples.Form.Question}
 */
Samples.Form.Question.prototype.addPlugin = function (value) {

    // Add plugin
    this.plugins.push(value);

    return this;

};

/*
 * #################
 * ##### Value #####
 * #################
 */

/**
 * Returns the question serialised value.
 *
 * @method getSerialisedValue
 * @return {*}
 */
Samples.Form.Question.prototype.getSerialisedValue = function () {
    return this.getValue();
};

/**
 * Sets the questions serialised value.
 *
 * @method setSerialisedValue
 * @param {*} value
 * @return {Samples.Form.Question}
 */
Samples.Form.Question.prototype.setSerialisedValue = function (value) {

    // Set value
    this.setValue(value);

    return this;

};

/*
 * #####################
 * ##### Validator #####
 * #####################
 */

/**
 * Returns the question validators.
 *
 * @method getValidators
 * @return {Array}
 */
Samples.Form.Question.prototype.getValidators = function () {
    return this.validators;
};

/**
 * Adds the given question validator.
 *
 * @method addValidator
 * @param {Samples.Form.Question.Validator} value
 * @return {Samples.Form.Question}
 */
Samples.Form.Question.prototype.addValidator = function (value) {

    // Add validator
    this.validators.push(value);

    return this;

};

/*
 * ######################
 * ##### Validation #####
 * ######################
 */

/**
 * Checks if the question is valid or not.
 *
 * @method isValid
 * @return {Boolean}
 */
Samples.Form.Question.prototype.isValid = function () {
    return this.isValid;
};

/**
 * Sets the question validation result.
 *
 * @method setIsValid
 * @param {Boolean} value
 * @return {Samples.Form.Question}
 */
Samples.Form.Question.prototype.setIsValid = function (value) {

    // Set is valid
    this.isValid = value;

    return this;

};