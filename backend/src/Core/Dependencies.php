<?php

namespace App\Core;

use DI\Container;
use Predis;
use Symfony\Component\Cache\Adapter\RedisAdapter;

/**
 * Load and setup dependencies into Slim DI Container
 *
 * @package App\Core
 */
final class Dependencies
{
    /**
     * @var Container Slim DI Container
     */
    protected Container $container;

    /**
     * Dependencies constructor
     *
     * @param Container $container Slim DI Container instance
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * Load all dependencies
     */
    public function load()
    {
        $this->loadCache();
    }

    /**
     * Load cache
     */
    public function loadCache()
    {
        $this->container->set('cache', function () {
            $config = [
                'schema' => 'tcp',
                'host' => 'redis',
                'port' => 6379
            ];
            $connection = new Predis\Client($config);
            
            return new RedisAdapter($connection);
        });
    }
}
