/*
 * #######################
 * ##### Constructor #####
 * #######################
 */

// Check namespace
Samples.Form.Question = Samples.Form.Question || {};

/**
 * Creates an new form integer question instance.
 *
 * @constructor
 * @param {Samples.Form.Question.Container} container the question container
 */
Samples.Form.Question.Integer = function (container)
{

    // Parent
    Samples.Form.Question.Integer.baseConstructor.call(this);

    /**
     * The question type.
     *
     * @property type
     * @private
     * @type {String}
     */
    this.type = 'integer';

    /*
     * +++++++++++++++++
     * +++ Construct +++
     * +++++++++++++++++
     */

    // Set container
    this.setContainer(container);

};

// Extend class
Samples.Form.Question.extend(Samples.Form.Question.Integer);

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
Samples.Form.Question.Integer.prototype._initialise = function ()
{

    var autoNumericOptions,
        self = this;

    /*
     * ++++++++++++++
     * +++ Inputs +++
     * ++++++++++++++
     */

    // Set inputs
    this.setInputs(this.getContainer().getElement().find('input'));

    // Define auto numeric options
    autoNumericOptions = {
        vMin   : 0,
        vMax   : 99999999,
        aSep   : '.',
        aDec   : ',',
        mRound : 'U',
        wEmpty : 'empty'
    };

    // Check auto numeric initialised
    if (typeof this.getInput(0).data('autoNumeric') === 'object') {
        this.getInput(0).autoNumeric('update', autoNumericOptions);
    } else {
        this.getInput(0).autoNumeric(autoNumericOptions);
    }

    /*
     * +++++++++++++++
     * +++ Plugins +++
     * +++++++++++++++
     */

    // List plugins
    _.each(this.getPlugins(), function (plugin)
    {

        /*
         * Mask
         */

        // Check mask plugin
        if (plugin instanceof Samples.Form.Question.Plugin.Mask) {
            self.getInput(0).mask(plugin.getMask());
        }

        /*
         * Unit
         */

        // Check unit plugin
        else if (plugin instanceof Samples.Form.Question.Plugin.Unit) {

            // Set unit
            self.getInput(0).autoNumeric('update', {
                aSign : ' ' + plugin.getUnit(),
                pSign : 's'
            });

        }

    });

    /*
     * ++++++++++++++++++
     * +++ Validators +++
     * ++++++++++++++++++
     */

    // List validators
    _.each(this.getValidators(), function (validator)
    {

        /*
         * Maximum
         */

        // Check maximum validator
        if (validator instanceof Samples.Form.Question.Validator.Maximum) {

            // Set maximum value
            self.getInput(0).autoNumeric('update', {
                vMax : validator.getMaximum()
            });

        }

        /*
         * Minimum
         */

        // Check minimum validator
        else if (validator instanceof Samples.Form.Question.Validator.Minimum) {

            // Set minimum value
            self.getInput(0).autoNumeric('update', {
                vMin : validator.getMinimum()
            });

        }

    });

};

/*
 * #################
 * ##### Value #####
 * #################
 */

/**
 * Returns the question value.
 *
 * @method getValue
 * @return {Number}
 */
Samples.Form.Question.Integer.prototype.getValue = function ()
{

    var value;

    // Get value
    value = this.getInput(0).autoNumeric('get');

    // Check value
    if (value) {
        value = parseInt(value);
    } else {
        value = 0;
    }

    return value;

};

/**
 * Sets the question value.
 *
 * @method setValue
 * @param {Number} value
 * @return {Samples.Form.Question.Integer}
 */
Samples.Form.Question.Integer.prototype.setValue = function (value)
{

    // Check value is null
    if (value === null) {

        // Set value
        this.getInput(0).val('');

    } else {

        // Set value
        this.getInput(0).autoNumeric('set', value);

    }

    return this;

};