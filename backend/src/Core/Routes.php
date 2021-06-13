<?php

namespace App\Core;

use Slim\App;

/**
 * Register Slim routes into App object
 *
 * @package App\Core
 */
final class Routes
{
    /**
     * @var App App instance
     */
    private App $app;

    /**
     * Routes constructor
     *
     * @param App $app App instance
     */
    public function __construct(App $app)
    {
        $this->app = $app;
    }

    /**
     * Load routes
     */
    public function load()
    {
        $this->app->get('/groups', \App\Controllers\Groups::class . ':get');
    }
}
