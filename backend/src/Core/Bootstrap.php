<?php

namespace App\Core;

use Slim\App;
use DI\Container;
use Slim\Factory\AppFactory;

/**
 * Load and setup Slim
 *
 * @package App\Core
 */
final class Bootstrap
{
    /**
     * @var App App instance
     */
    protected App $app;

    /**
     * @var Container Slim DI Container
     */
    protected Container $container;

    /**
     * @var Routes Routes instance
     */
    protected Routes $routes;

    /**
     * @var Dependencies Dependencies instance
     */
    protected Dependencies $dependencies;

    /**
     * @var Middlewares Middlewares instance
     */
    protected Middlewares $middlewares;

    /**
     * Bootstrap constructor
     */
    public function __construct()
    {
        $this->container = new Container();
        AppFactory::setContainer($this->container);
        $this->app = AppFactory::create();
    }

    /**
     * Setup and run
     */
    public function run()
    {
        $this->loadDependencies();
        $this->loadMiddlewares();
        $this->loadRoutes();
        $this->app->run();
    }

    /**
     * Register routes
     */
    protected function loadRoutes()
    {
        $this->routes = new Routes($this->app);
        $this->routes->load();
    }

    /**
     * Register dependencies
     */
    protected function loadDependencies()
    {
        $this->dependencies = new Dependencies($this->container);
        $this->dependencies->load();
    }

    /**
     * Register middlewares
     */
    protected function loadMiddlewares()
    {
        $this->middlewares = new Middlewares($this->app);
        $this->middlewares->load();
    }
}
