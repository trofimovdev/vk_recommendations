<?php

namespace App\Models;

use App\Core\Exceptions\FailedToGetGroups;
use DI\NotFoundException;
use DI\DependencyException;
use Exception;
use VK\Client\VKApiClient;
use VK\Client\Enums\VKLanguage;

/**
 * Group model
 *
 * @package App\Models
 */
final class Group extends BaseModel
{
    const CACHE_PREFIX = 'g';
    const CACHE_TTL = 600;

    /**
     * Get groups data from API
     *
     * @param array $ids Group ids
     * @param int $try Try number
     *
     * @return array
     *
     * @throws NotFoundException
     * @throws FailedToGetGroups
     * @throws DependencyException
     */
    public function getFromAPI(array $ids, int $try = 0): array
    {
        try {
            $vk = new VKApiClient(getenv('VK_API_VERSION'), VKLanguage::RUSSIAN);
            $data = $vk->groups()->getById(getenv('VK_API_TOKEN'), [
                'group_ids' => $ids,
                'fields' => ['photo_100', 'country', 'city', 'members_count'],
            ]);
        } catch (Exception) {
            if ($try === 5) {
                throw new FailedToGetGroups('Failed to get groups from API', 502);
            }
            return $this->getFromAPI($ids, $try + 1);
        }

        $cache = $this->container->get('cache');
        $result = [];
        foreach ($data as $group) {
            $group = (array)$group;
            $groupId = (string)$group['id'];
            unset($group['id']);
            $result[$groupId] = $group;

            $item = $cache->getItem(self::CACHE_PREFIX . $groupId);
            $item->set($group);
            $item->expiresAfter(self::CACHE_TTL);
            $cache->save($item);
        }

        return $result;
    }

    /**
     * Get groups
     *
     * @param array $ids Group ids
     *
     * @return array
     *
     * @throws DependencyException
     * @throws NotFoundException
     * @throws FailedToGetGroups
     */
    public function get(array $ids): array
    {
        $cache = $this->container->get('cache');
        $result = [];
        $missing = [];

        foreach ($ids as $id) {
            $id = (string)$id;
            $item = $cache->getItem(self::CACHE_PREFIX . $id);
            if (!$item->isHit()) {
                $missing[] = $id;
                continue;
            }
            $result[$id] = $item->get();
        }

        if ($missing) {
            $result = $result + $this->getFromAPI($missing);
        }

        return $result;
    }
}
