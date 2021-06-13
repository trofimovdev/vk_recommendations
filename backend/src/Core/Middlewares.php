<?php

namespace App\Core;

use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Throwable;

/**
 * Register Slim middlewares into App object
 *
 * @package App\Core
 */
final class Middlewares
{
    /**
     * @var App Slim App instance
     */
    private App $app;

    /**
     * Middlewares constructor
     *
     * @param App $app Slim App instance
     */
    public function __construct(App $app)
    {
        $this->app = $app;
    }

    /**
     * Load all middlewares
     */
    public function load()
    {
        $this->loadError();
    }

    /**
     * Load error middleware
     */
    public function loadError()
    {
        $app = $this->app;
        $customErrorHandler = function (ServerRequestInterface $request, Throwable $exception) use ($app) {
            $payload = [
                'success' => false,
                'error_msg' => $exception->getMessage()
            ];

            $code = $exception->getCode() ?? 404;
            $response = $app->getResponseFactory()->createResponse();
            $response->getBody()->write(json_encode($payload));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus($code);
        };
        $errorMiddleware = $this->app->addErrorMiddleware(true, false, false);
        $errorMiddleware->setDefaultErrorHandler($customErrorHandler);
    }
}
