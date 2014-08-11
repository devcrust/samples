/*global jQuery: false*/

/*
 * ##########################
 * ##### Initialisation #####
 * ##########################
 */

// Bind on document ready event
jQuery(function ()
{

    // Remove no javascript class
    jQuery('html').removeClass('no-js');

    /*
     * ++++++++++++++
     * +++ Select +++
     * ++++++++++++++
     */

    if (jQuery('.select select').length > 0) {

        // List select boxes
        jQuery('.select select').each(function (index, element)
        {

            // Cast element
            element = jQuery(element);

            // Check hidden
            if (element.is(':hidden')) {
                return;
            }

            // Initialise select box
            element.selectbox();

            // Set initialised
            element.parents('.is_form_question').data('select-box-initialised', 'true');

        });

    }

    /*
     * +++++++++++++++
     * +++ Spinner +++
     * +++++++++++++++
     */

    if (jQuery('.is_spinner').length > 0) {
        jQuery('.is_spinner').spinner();
    }

    /*
     * ++++++++++++++
     * +++ Dialog +++
     * ++++++++++++++
     */

    if (jQuery('.is_dialog').length > 0) {
        jQuery('.is_dialog').dialog({
            width : 754,
            modal : true
        });
    }

    /*
     * +++++++++++++++++
     * +++ Accordion +++
     * +++++++++++++++++
     */

    if (jQuery('.is_accordion').length > 0) {
        jQuery('.is_accordion').accordion({
            heightStyle : 'content'
        });
    }

    /*
     * ++++++++++++++++++++++
     * +++ InField Labels +++
     * ++++++++++++++++++++++
     */

    if (jQuery('input, textarea').length > 0) {
        jQuery('input, textarea').placeholder();
    }

    /*
     * +++++++++++++++++
     * +++ Light Box +++
     * +++++++++++++++++
     */

    if (jQuery('a.is_light_box').length > 0) {

        // Bind click handler
        jQuery('a.is_light_box').live('click', function (e)
        {

            // Open light box
            jQuery.fancybox.open({

                type      : 'ajax',
                dataType  : 'html',
                fitToView : true,
                autoSize  : true,
                href      : jQuery(this).data('url'),
                wrapCSS   : 'samples-fancybox'

            });

            // Prevent default
            e.preventDefault();

        });

    }

});