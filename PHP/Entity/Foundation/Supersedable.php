<?php

namespace Samples\PHP\Entity\Foundation;

use DateTime;

/**
 * The supersedable entity functionality.
 *
 * @package Samples\PHP\Entity\Foundation
 */
trait Supersedable
{

    /**
     * The valid from date.
     *
     * @var DateTime
     */
    private $dateFrom;

    /**
     * The valid to date.
     *
     * @var DateTime
     */
    private $dateTo;

    /**
     * Returns the valid from date.
     *
     * @return DateTime
     * @uses self::$dateFrom
     */
    public function getDateFrom()
    {
        return $this->dateFrom;
    }

    /**
     * Sets the valid from date.
     *
     * @param DateTime $value
     *
     * @return self
     * @uses self::$dateFrom
     */
    public function setDateFrom(DateTime $value)
    {
        // Set value
        $this->dateFrom = $value;

        return $this;
    }

    /**
     * Returns the valid to date.
     *
     * @return DateTime
     * @uses self::$dateTo
     */
    public function getDateTo()
    {
        return $this->dateTo;
    }

    /**
     * Sets the valid to date.
     *
     * @param DateTime $value
     *
     * @return self
     * @uses self::$dateTo
     */
    public function setDateTo(DateTime $value)
    {
        // Set value
        $this->dateTo = $value;

        return $this;
    }
}
