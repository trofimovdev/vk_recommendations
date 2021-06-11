<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;

/**
 * Base controller class with functions shared by all API controller implementations
 *
 * @package App\Controllers
 */
abstract class BaseController
{
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
        $payload = json_encode($data);
        $code = $code ?? 200;
        $response->getBody()->write($payload);

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($code);
    }
}
