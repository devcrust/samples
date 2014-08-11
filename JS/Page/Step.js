/*global jQuery: false*/

/*
 * ########################
 * ##### Page :: Step #####
 * ########################
 */

// Check step namespace
Samples.Page.Step = Samples.Page.Step || {};

/*
 * +++++++++++++++++
 * +++ Container +++
 * +++++++++++++++++
 */

/**
 * Returns the container.
 *
 * @method getContainer
 * @static
 * @return {jQuery}
 */
Samples.Page.Step.getContainer = function () {
    return jQuery('div#samples_page_step');
};

/*
 * ++++++++++++++++
 * +++ Activity +++
 * ++++++++++++++++
 */

/**
 * Enables the result container activity indicator.
 *
 * @method enableResultActivity
 * @static
 */
Samples.Page.Step.enableActivity = function () {

    // Check activity
    if (jQuery('#samples_page_step_activity').lenght > 0) {
        return;
    }

    var container,
        form,
        overlay,
        position;

    // Get container
    container = Samples.Page.Step.getContainer();

    // Get form
    form = container.find('form');

    // Get position
    position = form.position();

    // Create overlay
    overlay = jQuery('<div id="samples_page_step_activity" class="activity_overlay">&nbsp;</div>').css({

        position: 'absolute',

        width: form.width() + 10,
        height: form.height(),

        top: position.top,
        left: position.left,

        'background': 'url(/img/layout/overlay_activity.png)'

    });

    // Add overlay
    form.after(overlay);

};

/*
 * ++++++++++++
 * +++ Form +++
 * ++++++++++++
 */

/**
 * The comparison step form id.
 *
 * @property formId
 * @static
 * @private
 * @type {String}
 */
Samples.Page.Step.formId = null;

/**
 * Returns the comparison step form id.
 *
 * @method getFormId
 * @static
 * @return {String}
 */
Samples.Page.Step.getFormId = function () {
    return Samples.Page.Step.formId;
};

/**
 * Updates the form with the given parts.
 *
 * @method update
 * @static
 * @param {Object} value
 */
Samples.Page.Step.updateForm = function (value) {

    // Check form id existence
    if (!_.has(value, 'form_id')) {
        value.form_id = Samples.Page.Step.getFormId();
    }

    // Update form
    Samples.Form.update(value);

};

/*
 * ++++++++++++++++++
 * +++ Validation +++
 * ++++++++++++++++++
 */

/**
 * The comparison step page validators.
 *
 * @property validators
 * @static
 * @private
 * @type {Array}
 */
Samples.Page.Step.validators = [];

/**
 * Adds the given comparison step page validator.
 *
 * @method addValidator
 * @static
 * @param {Function} value
 */
Samples.Page.Step.addValidator = function (value) {

    // Add validator
    Samples.Page.Step.validators.push(value);

};

/**
 * Validates the comparison step page.
 *
 * @method isValid
 * @static
 * @param {Boolean} markErrors indicates if errors should be displayed or not
 * @return {Boolean}
 */
Samples.Page.Step.isValid = function (markErrors) {

    var errorElement = null,
        validationResult = [];

    // Validate
    _.each(Samples.Page.Step.validators, function (validator) {

        var result;

        // Validate
        result = validator(markErrors);

        // Check result
        if (result === true) {
            validationResult.push(true);
        } else {

            // Check error element
            if (_.isString(result) && _.isNull(errorElement)) {
                errorElement = result;
            }

            // Add validation result
            validationResult.push(false);

        }

    });

    // Check validation result
    if (_.contains(validationResult, false)) {

        // Check mark errors
        if (markErrors && _.isString(errorElement)) {

            // Set window location hash
            window.location.hash = errorElement;

        }

        return false;

    }

    return true;

};

/*
 * ##########################
 * ##### Initialisation #####
 * ##########################
 */

// Bind on document ready event handler
jQuery(function () {

    var container = Samples.Page.Step.getContainer(),
        validationHandler,
        urlProductName,
        tracking;

    // Check container existence
    if (Samples.Page.Step.getContainer().length === 0) {
        return;
    }

    /*
     * +++++++++++++++
     * +++ Form ID +++
     * +++++++++++++++
     */

    // Set form id
    Samples.Page.Step.formId = container.data('form-id');

    /*
     * ++++++++++++++
     * +++ Socket +++
     * ++++++++++++++
     */

    // Initialise form socket
    Samples.Form.initialiseSocket(Samples.Page.Step.getFormId());

    /*
     * ++++++++++++++
     * +++ Events +++
     * ++++++++++++++
     */

    // Define validation handler
    validationHandler = function (markErrors, action, step) {

        return function handler(e) {

            var form = container.find('form'),
                button = container.find('.is_next_action'),
                intervalId;

            /*
             * Active Events
             */

            // Check active socket events
            if (Samples.Form.hasSocketActiveEvents()) {

                // Enable activity
                if (markErrors) {
                    Samples.Page.Step.enableActivity();
                }

                // Set interval
                intervalId = window.setInterval((function () {

                    // Check active socket events
                    if (Samples.Form.hasSocketActiveEvents()) {
                        return;
                    }

                    // Clear interval
                    window.clearInterval(intervalId);

                    // Disable activity
                    if (markErrors) {
                        Samples.Page.Step.disableActivity();
                    }

                    // Validate
                    handler(e);

                }), 250);

            } else {

                /*
                 * Validation
                 */

                // Validate page
                if (Samples.Page.Step.isValid(markErrors)) {

                    // Check action
                    if (action) {

                        // Show activity
                        Samples.Page.Step.enableActivity();

                        // Check "next" step
                        if (step === 'next') {
                            window.location.href = form.attr('action');
                        }

                        // Check "previous" step
                        else if (step === 'previous') {
                            window.location.href = form.data('previous-url');
                        }

                    }

                }

            }

            // Prevent default
            if (e instanceof jQuery.Event) {
                e.preventDefault();
            }

        };

    };

    // Bind on form update event listener
    Samples.Form.Observer.addOnUpdateListener(validationHandler(false));

    // Bind on submit event listener
    Samples.Page.Step.getContainer().find('form').submit(validationHandler(true));

    // Bind on click event listener
    Samples.Page.Step.getContainer().find('.is_next_action').click(validationHandler(true, true, 'next'));

    // Bind on click event handler
    Samples.Page.Step.getContainer().find('.is_previous_action').click(function (e) {

        var form;

        // Get form
        form = Samples.Page.Step.getContainer().find('form');

        // Redirect
        window.location.href = form.data('previous-url');

        // Prevent default
        e.preventDefault();

    });

});