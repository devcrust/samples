<?php

namespace Samples\PHP\Entity;

/**
 * The location entity.
 *
 * @package Samples\PHP\Entity
 */
class Location implements Foundation\EntityInterface, Foundation\SupersedableInterface
{

    use Foundation\Supersedable;

    /**
     * The location primary key.
     *
     * @var integer
     */
    private $id;

    /**
     * The location type.
     *
     * @var string
     */
    private $type;

    /**
     * The location related address.
     *
     * @var Address
     */
    private $address;

    /**
     * The location name.
     *
     * @var string
     */
    private $name;

    /**
     * The location road.
     *
     * @var string
     */
    private $road;

    /**
     * The location town or village.
     *
     * @var string
     */
    private $town;

    /**
     * The location county.
     *
     * @var string
     */
    private $county;

    /**
     * The location direction.
     *
     * @var string
     */
    private $direction;

    /*
     * ++++++++++
     * +++ ID +++
     * ++++++++++
     */

    /**
     * Returns the location primary key.
     *
     * @return integer
     * @uses self::$id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Sets the location primary key.
     *
     * @param integer $value
     *
     * @return self
     * @uses self::$id
     */
    public function setId($value)
    {
        // Set value
        $this->id = $value;

        return $this;
    }

    /*
     * ++++++++++++
     * +++ Type +++
     * ++++++++++++
     */

    /**
     * Returns the location type.
     *
     * @return string
     * @uses self::$type
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Sets the location type.
     *
     * @param string $value
     *
     * @return self
     * @uses self::$type
     */
    public function setType($value)
    {
        // Set value
        $this->type = $value;

        return $this;
    }

    /*
     * +++++++++++++++
     * +++ Address +++
     * +++++++++++++++
     */

    /**
     * Returns the location related address.
     *
     * @return Address
     * @uses self::$address
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Sets the location related address.
     *
     * @param Address $value
     *
     * @return self
     * @uses self::$address
     */
    public function setAddress(Address $value)
    {
        // Set value
        $this->address = $value;

        return $this;
    }

    /*
     * ++++++++++++
     * +++ Name +++
     * ++++++++++++
     */

    /**
     * Returns the location name.
     *
     * @return string
     * @uses self::$name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Sets the location name.
     *
     * @param string $value
     *
     * @return self
     * @uses self::$name
     */
    public function setName($value)
    {
        // Set value
        $this->name = $value;

        return $this;
    }

    /*
     * ++++++++++++
     * +++ Road +++
     * ++++++++++++
     */

    /**
     * Returns the location road.
     *
     * @return string
     * @uses self::$road
     */
    public function getRoad()
    {
        return $this->road;
    }

    /**
     * Sets the location road.
     *
     * @param string $value
     *
     * @return self
     * @uses self::$road
     */
    public function setRoad($value)
    {
        // Set value
        $this->road = $value;

        return $this;
    }

    /*
     * ++++++++++++
     * +++ Town +++
     * ++++++++++++
     */

    /**
     * Returns the location town.
     *
     * @return string
     * @uses self::$town
     */
    public function getTown()
    {
        return $this->town;
    }

    /**
     * Sets the location town.
     *
     * @param string $value
     *
     * @return self
     * @uses self::$town
     */
    public function setTown($value)
    {
        // Set value
        $this->town = $value;

        return $this;
    }

    /*
     * ++++++++++++++
     * +++ County +++
     * ++++++++++++++
     */

    /**
     * Returns the location county.
     *
     * @return string
     * @uses self::$county
     */
    public function getCounty()
    {
        return $this->county;
    }

    /**
     * Sets the location county.
     *
     * @param string $value
     *
     * @return self
     * @uses self::$county
     */
    public function setCounty($value)
    {
        // Set value
        $this->county = $value;

        return $this;
    }

    /*
     * +++++++++++++++++
     * +++ Direction +++
     * +++++++++++++++++
     */

    /**
     * Returns the location direction.
     *
     * @return string
     * @uses self::$direction
     */
    public function getDirection()
    {
        return $this->direction;
    }

    /**
     * Sets the location direction.
     *
     * @param string $value
     *
     * @return self
     * @uses self::$direction
     */
    public function setDirection($value)
    {
        // Set value
        $this->direction = $value;

        return $this;
    }
}
