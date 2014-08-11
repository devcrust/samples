<?php

/**
 * This class provides a element factory.
 *
 * @author   Christoph Rust
 * @category Samples
 * @package  Element
 * @version  0.1
 */
class Samples_Element_Factory
{

    /**
     * Creates an new instance of Samples_Element_Abstract.
     *
     * @param Samples_Element_Configuration_Element $element the element configuration instance
     * @param Samples_Element_Dispatcher            $dispatcher the element dispatcher instance
     * @param Zend_View_Abstract                    $view the view instance
     *
     * @return Samples_Element_Abstract
     * @throws Samples_Element_Exception
     */
    public static function factory(
        Samples_Element_Configuration_Element $element, Samples_Element_Dispatcher $dispatcher, Zend_View_Abstract $view
    ) {

        // Check element assembled
        if (!$element->isAssembled()) {
            require_once 'Samples/Element/Exception.php';
            throw new Samples_Element_Exception(sprintf('Element "%s" is not assembled!', $element->getId()));
        }

        /*
         * Path
         */

        // Get element path
        $elementPath = $element->getPath();

        // Check element path existence
        if (!is_file($elementPath) || !is_readable($elementPath)) {
            require_once 'Samples/Element/Exception.php';
            throw new Samples_Element_Exception(sprintf(
                'Element file "%s" does not exist or is not readable for element "%s"!', $elementPath,
                $element->getId()
            ));
        }

        require_once $elementPath;

        /*
         * Class
         */

        // Get element class
        $elementClass = $element->getClass();

        // Check parent class
        if (!is_subclass_of($elementClass, 'Samples_Element_Abstract')) {
            require_once 'Samples/Element/Exception.php';
            throw new Samples_Element_Exception(sprintf(
                'Element class "%s" is not a subclass of Samples_Element_Abstract!', $elementClass
            ));
        }

        /*
         * View
         */

        // Clone view
        $elementView = clone $view;

        // Clear view parameters
        $elementView->clearVars();

        // Clear script paths
        $elementView->setScriptPath(null);

        // Get element view path
        $elementViewPath = $element->getViewPath();

        // Check view path existence
        if (!is_dir($elementViewPath) || !is_readable($elementViewPath)) {
            require_once 'Samples/Element/Exception.php';
            throw new Samples_Element_Exception(sprintf(
                'Element view path "%s" does not exist or is not readable for element "%s"!',
                $elementViewPath, $element->getId()
            ));
        }

        // Add view script path
        $elementView->addScriptPath($elementViewPath);

        /*
        * Instance
        */

        try {

            // Create element instance
            $elementInstance = new $elementClass($dispatcher, $element, $elementView);

            return $elementInstance;

        } catch (Exception $e) {
            require_once 'Samples/Element/Exception.php';
            throw new Samples_Element_Exception(sprintf(
                'Unable to factory element "%s"!', $element->getId()
            ), null, $e);
        }

    }

}
