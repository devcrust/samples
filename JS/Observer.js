/*
 * ####################
 * ##### Observer #####
 * ####################
 */

// Check namespace
Samples = Samples || {};

/**
 * The observer.
 */
Samples.Observer = {

    /**
     * The observer on question create event listeners.
     *
     * @property onCreateListeners
     * @private
     * @static
     * @type {Array}
     */
    onCreateListeners: [],

    /**
     * The observer on question change event listeners.
     *
     * @property onChangeListeners
     * @private
     * @static
     * @type {Array}
     */
    onChangeListeners: [],

    /**
     * The observer on form update event listeners.
     *
     * @property onUpdateListeners
     * @private
     * @static
     * @type {Array}
     */
    onUpdateListeners: [],

    /**
     * The observer on question delete event listeners.
     *
     * @property onDeleteListeners
     * @private
     * @static
     * @type {Array}
     */
    onDeleteListeners: [],

    /**
     * Indicates if the on ready event has already been fired.
     *
     * @property onReadyFired
     * @private
     * @static
     * @type {Boolean}
     */
    onReadyFired: false,

    /**
     * The observer on form ready event listeners.
     *
     * @property onReadyListeners
     * @private
     * @static
     * @type {Array}
     */
    onReadyListeners: [],

    /*
     * ++++++++++++++
     * +++ Create +++
     * ++++++++++++++
     */

    /**
     * Returns the observer on question create event listeners.
     *
     * @method getOnCreateListeners
     * @static
     * @return {Array}
     */
    getOnCreateListeners: function () {
        return Samples.Form.Observer.onCreateListeners;
    },

    /**
     * Adds the given observer on question create event listener.
     *
     * @method addOnCreateListener
     * @static
     * @param {Function} value the event callback
     */
    addOnCreateListener: function (value) {

        // Add listener
        Samples.Form.Observer.onCreateListeners.push(value);

    },

    /**
     * Fires the observer on question create event with the given form question.
     *
     * @method fireOnCreateEvent
     * @static
     * @param {Samples.Form.Question} value the new form question
     */
    fireOnCreateEvent: function (value) {

        // List on create event listeners
        _.each(Samples.Form.Observer.onCreateListeners, function (listener) {

            // Callback
            listener(value);

        });

    },

    /*
     * ++++++++++++++
     * +++ Change +++
     * ++++++++++++++
     */

    /**
     * Returns the observer on question change event listeners.
     *
     * @method getOnChangeListeners
     * @static
     * @return {Array}
     */
    getOnChangeListeners: function () {
        return Samples.Form.Observer.onChangeListeners;
    },

    /**
     * Adds the given observer on question change event listener.
     *
     * @method addOnChangeListener
     * @static
     * @param {Function} value the event callback
     */
    addOnChangeListener: function (value) {

        // Add listener
        Samples.Form.Observer.onChangeListeners.push(value);

    },

    /**
     * Fires the observer on question change event with the given form question.
     *
     * @method fireOnChangeEvent
     * @static
     * @param {Samples.Form.Question} value the new form question
     */
    fireOnChangeEvent: function (value) {

        // List on change event listeners
        _.each(Samples.Form.Observer.onChangeListeners, function (listener) {

            // Callback
            listener(value);

        });

    },

    /*
     * ++++++++++++++
     * +++ Update +++
     * ++++++++++++++
     */

    /**
     * Returns the observer on form update event listeners.
     *
     * @method getOnUpdateListeners
     * @static
     * @return {Array}
     */
    getOnUpdateListeners: function () {
        return Samples.Form.Observer.onUpdateListeners;
    },

    /**
     * Adds the given observer on form update event listener.
     *
     * @method addOnUpdateListener
     * @static
     * @param {Function} value the event callback
     */
    addOnUpdateListener: function (value) {

        // Add listener
        Samples.Form.Observer.onUpdateListeners.push(value);

    },

    /**
     * Fires the observer on form update event with the given form question.
     *
     * @method fireOnUpdateEvent
     * @static
     * @param {Object} value the new form
     * @param {Boolean} initial indicates if this is the initial update
     */
    fireOnUpdateEvent: function (value, initial) {

        // Check initial update
        initial = (_.isBoolean(initial)) ? initial : false;

        // List on update event listeners
        _.each(Samples.Form.Observer.onUpdateListeners, function (listener) {

            // Callback
            listener(value, initial);

        });

    },

    /*
     * ++++++++++++++
     * +++ Delete +++
     * ++++++++++++++
     */

    /**
     * Returns the observer on question delete event listeners.
     *
     * @method getOnDeleteListeners
     * @static
     * @return {Array}
     */
    getOnDeleteListeners: function () {
        return Samples.Form.Observer.onDeleteListeners;
    },

    /**
     * Adds the given observer on question delete event listener.
     *
     * @method addOnDeleteListener
     * @static
     * @param {Function} value the event callback
     */
    addOnDeleteListener: function (value) {

        // Add listener
        Samples.Form.Observer.onDeleteListeners.push(value);

    },

    /**
     * Fires the observer on question delete event with the given form question.
     *
     * @method fireOnDeleteEvent
     * @static
     * @param {Samples.Form.Question} value the deprecated form question
     */
    fireOnDeleteEvent: function (value) {

        // List on delete event listeners
        _.each(Samples.Form.Observer.onDeleteListeners, function (listener) {

            // Callback
            listener(value);

        });

    },

    /*
     * ++++++++++++
     * +++ Read +++
     * ++++++++++++
     */

    /**
     * Returns the observer on form ready event listeners.
     *
     * @method getOnReadyListeners
     * @static
     * @return {Array}
     */
    getOnReadyListeners: function () {
        return Samples.Form.Observer.onReadyListeners;
    },

    /**
     * Adds the given observer on form ready event listener.
     *
     * @method addOnReadyListener
     * @static
     * @param {Function} value the event callback
     */
    addOnReadyListener: function (value) {

        // Check on ready event already fired
        if (Samples.Form.Observer.onReadyFired) {
            value();
        }

        // Add listener
        Samples.Form.Observer.onReadyListeners.push(value);

    },

    /**
     * Fires the observer on form ready event.
     *
     * @method fireOnReadyEvent
     * @static
     */
    fireOnReadyEvent: function () {

        // Set on ready event already fired
        Samples.Form.Observer.onReadyFired = true;

        // List on ready event listeners
        _.each(Samples.Form.Observer.onReadyListeners, function (listener) {

            // Callback
            listener();

        });

    }

};