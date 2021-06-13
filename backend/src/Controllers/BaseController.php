<?php

namespace App\Controllers;

use DI\Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * Base controller class with functions shared by all API controller implementations
 *
 * @package App\Controllers
 */
abstract class BaseController
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
     * Render a JSON response
     *
     * @param Response $response Slim App Response
     * @param mixed $data
     * @param int|null $code HTTP status code.
     *
     * @return Response
     */
    protected function renderJson(Response $response, mixed $data, int $code = null): Response
    {
        $payload = [
            'success' => true,
            'response' => $data
        ];
        $code = $code ?? 200;
        $response->getBody()->write(json_encode($payload));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($code);
    }

    /**
     * HTTP GET handler
     *
     * @param Request $request
     * @param Response $response
     * @param array $args
     *
     * @return Response
     */
    public abstract function get(Request $request, Response $response, array $args): Response;
}
