<?php

namespace App\Models;

use DI\Container;

/**
 * Base model class with functions shared by all model implementations
 *
 * @package App\Models
 */
abstract class BaseModel
{
    /**
     * @var Container Slim DI Container
     */
    protected Container $container;

    /**
     * Model constructor
     *
     * @param Container $container Slim DI Container instance
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }
}
