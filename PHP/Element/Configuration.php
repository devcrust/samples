<?php

/**
 * This class provides a parser for the element configuration container.
 *
 * @author   Christoph Rust
 * @category Samples
 * @package  Element
 * @version  0.1
 */
class Samples_Element_Configuration
{

    /**
     * The global element parameters.
     *
     * @var array
     */
    protected $_params = array();

    /**
     * The element namespaces.
     *
     * @var array
     */
    protected $_namespaces = array();

    /**
     * Creates an new instance of Samples_Element_Configuration with the given global element parameters.
     *
     * @param array $value the global element parameters
     *
     * @uses self::setParameters()
     */
    public function __construct(array $value = array())
    {

        // Set global element parameters
        $this->setParameters($value);

    }

    /*
     * #############################
     * ##### Global Parameters #####
     * #############################
     */

    /**
     * Returns the global element parameters.
     *
     * @return array
     * @uses self::$_params
     */
    public function getParameters()
    {
        return array_keys($this->_params);
    }

    /**
     * Checks if the global element parameter with the given name does exist.
     *
     * @param string $value
     *
     * @return boolean
     * @uses self::$_params
     */
    public function hasParameter($value)
    {
        return array_key_exists($value, $this->_params);
    }

    /**
     * Returns the value of the global element parameter with the given name.
     *
     * @param string $value the global element parameter name
     * @param mixed  $default the default value to return if the global element parameter does not exist
     *
     * @return mixed
     * @uses self::hasParameter()
     * @uses self::$_params
     */
    public function getParameter($value, $default = null)
    {

        // Check existence
        if (!$this->hasParameter($value)) {
            return $default;
        }

        return $this->_params[$value];

    }

    /**
     * Sets the global element parameters.
     *
     * @param array $value
     *
     * @return self
     * @uses self::$_params
     */
    public function setParameters($value)
    {

        // Set value
        $this->_params = $value;

        return $this;

    }

    /*
     * ######################
     * ##### Namespaces #####
     * ######################
     */

    /**
     * Returns the registered element namespaces.
     *
     * @return array
     * @uses self::$_namespaces
     */
    public function getNamespaces()
    {
        return array_values($this->_namespaces);
    }

    /**
     * Checks if the element namespace with the given name is registered.
     *
     * @param string $value
     *
     * @return boolean
     * @uses self::$_namespaces
     */
    public function hasNamespace($value)
    {
        return array_key_exists($value, $this->_namespaces);
    }

    /**
     * Returns the element namespace with the given name.
     *
     * @param string $value
     *
     * @return Samples_Element_Configuration_Namespace
     * @uses self::hasNamespace()
     * @uses self::$_namespaces
     * @throws Samples_Element_Exception
     */
    public function getNamespace($value)
    {

        // Check existence
        if (!$this->hasNamespace($value)) {
            require_once 'Samples/Element/Exception.php';
            throw new Samples_Element_Exception(sprintf('Element namespace "%s" is not registered!', $value));
        }

        return $this->_namespaces[$value];

    }

    /**
     * Adds the given element namespace.
     *
     * @param Samples_Element_Configuration_Namespace $value
     *
     * @return self
     * @uses self::hasNamespace()
     * @uses self::$_namespaces
     * @throws Samples_Element_Exception
     */
    public function addNamespace(Samples_Element_Configuration_Namespace $value)
    {

        // Check existence
        if ($this->hasNamespace($value->getNamespace())) {
            require_once 'Samples/Element/Exception.php';
            throw new Samples_Element_Exception(sprintf(
                'Element namespace "%s" is already registered!', $value->getNamespace()
            ));
        }

        // Set container reference
        $value->setContainer($this);

        // Add namespace
        $this->_namespaces[$value->getNamespace()] = $value;

        return $this;

    }

    /**
     * Removes the element namespace with the given name.
     *
     * @param string $value
     *
     * @return self
     * @uses self::hasNamespace()
     * @uses self::$_namespaces
     * @throws Samples_Element_Exception
     */
    public function removeNamespace($value)
    {

        // Check existence
        if (!$this->hasNamespace($value)) {
            require_once 'Samples/Element/Exception.php';
            throw new Samples_Element_Exception(sprintf('Element namespace "%s" is not registered!', $value));
        }

        // Unset container reference
        $this->_namespaces[$value]->setContainer(null);

        // Remove namespace
        unset($this->_namespaces[$value]);

        return $this;

    }

}
