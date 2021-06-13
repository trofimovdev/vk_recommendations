<?php

namespace App\Controllers;

use App\Core\Exceptions\FailedToGetGroups;
use App\Models\Group;
use DI\DependencyException;
use DI\NotFoundException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpBadRequestException;

/**
 * @package App\Controllers
 */
final class Groups extends BaseController
{
    /**
     * {@inheritDoc}
     *
     * @throws DependencyException
     * @throws NotFoundException
     * @throws FailedToGetGroups
     * @throws HttpBadRequestException
     */
    public function get(Request $request, Response $response, array $args): Response
    {
        if (
            !array_key_exists('ids', $request->getQueryParams()) ||
            !is_numeric(implode('', array_filter(explode(',', $request->getQueryParams()['ids']))))
        ) {
            throw new HttpBadRequestException($request, 'One of the parameters specified was missing or invalid: ids');
        }

        $ids = explode(',', $request->getQueryParams()['ids']);
        $group = new Group($this->container);

        return $this->renderJson($response, $group->get($ids));
    }
}
