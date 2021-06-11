<?php

namespace App\Core;

use Slim\App;
use Slim\Factory\AppFactory;

/**
 * Load and setup Slim
 *
 * @package App
 */
final class Bootstrap
{
    /**
     * @var App App instance
     */
    protected App $app;

    /**
     * @var Routes Routes instance
     */
    protected Routes $routes;

    /**
     * Bootstrap constructor
     */
    public function __construct()
    {
        $this->app = AppFactory::create();
    }

    /**
     * Setup and run
     */
    public function run()
    {
        $this->loadRoutes();
        $this->app->run();
    }

    /**
     * Register routes
     */
    protected function loadRoutes()
    {
        $this->routes = new Routes($this->app);
        $this->routes->loadRoutes();
    }
}
