<?php

require_once 'Zend/Application/Resource/ResourceAbstract.php';

/**
 * This class provides an application resource for the google client.
 *
 * @author     Christoph Rust
 * @package    Resource
 * @subpackage Google\Client
 * @version    0.1
 */
class Samples_Resource_Google_Client extends Zend_Application_Resource_ResourceAbstract
{

    /**
     * Initialises the google client resource.
     *
     * @return Zend_Gdata_HttpClient
     * @throws Samples_Resource_Exception
     */
    public function init()
    {

        /*
         * Options
         */

        // Get options
        $_options = $this->getOptions();

        // Check email existence
        if (!array_key_exists('email', $_options) || !is_string($_options['email']) || empty($_options['email'])) {
            require_once 'Samples/Resource/Exception.php';
            throw new Samples_Resource_Exception('Option "email" was not provided or is not valid!');
        }

        // Set email
        $email = $_options['email'];

        // Check password existence
        if (!array_key_exists('password', $_options) || !is_string($_options['password'])
            || empty($_options['password'])
        ) {
            require_once 'Samples/Application/Resource/Exception.php';
            throw new FC24_Resource_Exception('Option "password" was not provided or is not valid!');
        }

        // Set password
        $password = $_options['password'];

        /*
         * Process
         */

        try {

            require_once 'Zend/Gdata/ClientLogin.php';

            // Create client login instance
            $instance = Zend_Gdata_ClientLogin::getHttpClient(
                $email, $password, Zend_Gdata_Spreadsheets::AUTH_SERVICE_NAME
            );

            return $instance;

        } catch (Exception $e) {
            require_once 'Samples/Resource/Exception.php';
            throw new Samples_Resource_Exception('Unable to create google client login!', null, $e);
        }

    }

}
