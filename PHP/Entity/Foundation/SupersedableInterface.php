<?php

namespace Samples\PHP\Entity\Foundation;

use DateTime;

/**
 * The supersedable entity functionality interface.
 *
 * @package Samples\PHP\Entity\Foundation
 */
interface SupersedableInterface
{

    /**
     * Returns the valid from date.
     *
     * @return DateTime
     */
    public function getDateFrom();

    /**
     * Sets the valid from date.
     *
     * @param DateTime $value
     *
     * @return self
     */
    public function setDateFrom(DateTime $value);

    /**
     * Returns the valid to date.
     *
     * @return DateTime
     */
    public function getDateTo();

    /**
     * Sets the valid to date.
     *
     * @param DateTime $value
     *
     * @return self
     */
    public function setDateTo(DateTime $value);
}
