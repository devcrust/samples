<?php

require_once 'Zend/Application/Resource/ResourceAbstract.php';

/**
 * This class provides an application resource for the redis key/value server.
 *
 * @author  Christoph Rust
 * @package Resource
 * @version 0.1
 */
class Samples_Resource_Redis extends Zend_Application_Resource_ResourceAbstract
{

    /**
     * Initialises the redis resource.
     *
     * @return Redis
     * @throws Samples_Resource_Exception
     */
    public function init()
    {

        /*
         * Options
         */

        // Get options
        $_options = $this->getOptions();

        // Check host existence
        if (!array_key_exists('host', $_options) || !is_string($_options['host']) || empty($_options['host'])) {
            require_once 'Samples/Resource/Exception.php';
            throw new Samples_Resource_Exception('Option "host" not provided or not valid!');
        }

        // Set host
        $host = $_options['host'];

        // Check port existence
        if (array_key_exists('port', $_options) && !is_int($_options['port'])) {
            require_once 'Samples/Resource/Exception.php';
            throw new Samples_Resource_Exception('Option "port" is not valid!');
        }

        // Set port
        $port = (array_key_exists('port', $_options)) ? $_options['port'] : null;

        // Check timeout existence
        if (array_key_exists('timeout', $_options) && !is_float($_options['timeout'])) {
            require_once 'Samples/Resource/Exception.php';
            throw new Samples_Resource_Exception('Option "timeout" is not valid!');
        }

        // Set timeout
        $timeout = (array_key_exists('timeout', $_options)) ? $_options['timeout'] : 0.0;

        /*
         * Process
         */

        // Check redis extension present
        if (!extension_loaded('redis')) {
            require_once 'Samples/Resource/Exception.php';
            throw new Samples_Resource_Exception('PHP extension "redis" not installed or not loaded!');
        }

        // Create redis instance
        $redis = new Redis();

        // Connect to redis server
        $redis->connect($host, $port, $timeout);

        return $redis;

    }

}
