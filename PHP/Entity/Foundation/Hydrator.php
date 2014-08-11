<?php

namespace Samples\PHP\Entity\Foundation;

use Zend\Stdlib\Hydrator\HydratorInterface;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * The entity hydrator.
 *
 * @package Samples\PHP\Entity\Foundation
 */
class Hydrator implements HydratorInterface
{

    /**
     * The datetime format to use.
     *
     * @var string
     */
    const DATETIME_FORMAT = \DateTime::ISO8601;

    /**
     * Extract values from an object.
     *
     * @param object $object
     *
     * @return array
     */
    public function extract($object)
    {

        $result = array();

        // Create reflection instance
        $reflection = new \ReflectionObject($object);

        // List object methods
        foreach ($reflection->getMethods(\ReflectionMethod::IS_PUBLIC) as $method) {

            $property = null;

            // Check method
            if (strpos($method->getName(), 'get') === 0 || strpos($method->getName(), 'has') === 0) {
                $property = lcfirst(substr($method->getName(), 3));
            } elseif (strpos($method->getName(), 'is') === 0) {
                $property = lcfirst(substr($method->getName(), 2));
            }

            // Check property
            if (!$property) {
                continue;
            }

            // Get value
            $value = $method->invoke($object);

            // Check value
            if ($value instanceof EntityInterface) {
                $value = $this->extract($value);
            } elseif ($value instanceof \DateTime) {
                $value = $value->format(self::DATETIME_FORMAT);
            } elseif ($value instanceof ArrayCollection) {
                $value = $this->extractCollection($value);
            }

            // Add to result
            $result[$property] = $value;

        }

        return $result;

    }

    /**
     * Extracts values from an object collection.
     *
     * @param ArrayCollection $values
     *
     * @return array
     */
    public function extractCollection(ArrayCollection $values)
    {

        $result = array();

        // List collection
        foreach ($values as $value) {
            array_push($result, $this->extract($value));
        }

        return $result;

    }

    /**
     * Hydrate $object with the provided $data.
     *
     * @param array  $data
     * @param object $object
     *
     * @return object
     */
    public function hydrate(array $data, $object)
    {

        // Create reflection instance
        $reflection = new \ReflectionObject($object);

        // List object method
        foreach ($reflection->getMethods(\ReflectionMethod::IS_PUBLIC) as $method) {

            $property = null;

            // Check method
            if (strpos($method->getName(), 'set') === 0) {
                $property = lcfirst(substr($method->getName(), 3));
            }

            // Check property
            if (!$property) {
                continue;
            }

            // Check property existence
            if (array_key_exists($property, $data)) {

                // Set value
                $value = $data[$property];

                // Get parameter
                $parameter = $method->getParameters()[0];

                // Get parameter class
                $parameterClass = $parameter->getClass();

                // Check is object
                if ($parameterClass) {

                    // Check is null
                    if (is_null($value)) {

                        // Set reset method
                        $resetMethod = 'reset' . ucfirst($property);

                        // Check reset method exists
                        if (method_exists($object, $resetMethod)) {
                            call_user_func(array($object, $resetMethod));
                        }

                    } else {

                        // Check argument
                        if ($parameterClass->implementsInterface(
                            'Samples\PHP\Entity\Foundation\EntityInterface'
                        )
                        ) {
                            $value = $this->hydrate($value, $parameterClass->newInstance());
                        } elseif ($parameterClass->getName() === 'DateTime') {
                            $value = \DateTime::createFromFormat(self::DATETIME_FORMAT, $value);
                        }

                        // Set value
                        $method->invoke($object, $value);

                    }

                } else {
                    $method->invoke($object, $value);
                }

            }

        }

        return $object;

    }
}