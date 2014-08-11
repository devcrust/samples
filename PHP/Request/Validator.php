<?php

namespace Samples\PHP\Request;

use Zend\Mvc;
use Zend\Http;

/**
 * The controller request validator.
 *
 * @package Samples\PHP\Request
 */
trait Validator
{

    use Controller\Error\Handler;
    use Controller\Annotation;

    /**
     * Validates the request and returns the method to use if successful.
     *
     * @param Mvc\MvcEvent       $event      the MVC event
     * @param Http\Request       $request    the HTTP request
     * @param Http\Response      $response   the HTTP response
     * @param AbstractController $controller the controller instance
     *
     * @return string the HTTP method to use
     */
    protected function validateRequest(
        Mvc\MvcEvent $event,
        Http\Request $request,
        Http\Response $response,
        AbstractController $controller
    ) {

        // Get route match
        $routeMatch = $event->getRouteMatch();

        // Check route existence
        if (!$routeMatch) {

            // Update event
            $event->setResult($this->handleError($response, 404, 'Not Found', 1));

            return null;

        }

        // Get action
        $action = $routeMatch->getParam('action', false);

        // Check action existence
        if (!$action) {

            // Update event
            $event->setResult($this->handleError($response, 404, 'Not Found', 2));

            return null;

        }

        // Get related action method
        $method = Mvc\Controller\AbstractActionController::getMethodFromAction($action);

        // Check method existence
        if (!method_exists($this, $method)) {

            // Update event
            $event->setResult($this->handleError($response, 500, 'Internal Server Error', 3));

            return null;

        }

        /*
         * +++++++++++++++++++
         * +++ HTTP Method +++
         * +++++++++++++++++++
         */

        // Get allowed method
        $allowedMethod = $this->getHttpMethodForAction($controller, $method);

        // Check allowed method
        if (!$allowedMethod) {

            // Update event
            $event->setResult(
                $this->handleError($response, 500, 'No acceptable HTTP method defined!', 4)
            );

            return null;

        }

        // Check request method
        if ($request->getMethod() !== $allowedMethod) {

            // Update event
            $event->setResult($this->handleError($response, 405, 'Method Not Allowed', 5));

            return null;

        }

        return $method;

    }
}
