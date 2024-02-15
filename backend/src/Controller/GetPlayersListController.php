<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class GetPlayersListController
{
    public function __construct(
        protected UserRepository $userRepository,

    ) {
    }

    public function __invoke(Request $request, EntityManagerInterface $entityManager)
    {
        $queryParams = $request->query->all();
        $players = $this->userRepository->findAllPlayersInApprovedTeam();
        $filteredPlayers = $this->filterPlayers($players, $queryParams);
        return $filteredPlayers;
    }

    private function filterPlayers(array $players, array $queryParams)
    {
        $filteredPlayers = [];
        if (empty($queryParams)) {
            return $players;
        }
        if (empty($queryParams["team"]) && empty($queryParams["game"])) {
            return $players;
        }
        foreach ($players as $player) {
            if (!empty($queryParams["team"]) && !empty($queryParams["game"])) {
                if ($player->getTeam()->getId() == $queryParams["team"] && $player->getAssignedGame()->getId() == $queryParams["game"]) {
                    $filteredPlayers[] = $player;
                }
            }
            if (!empty($queryParams["team"]) && empty($queryParams["game"])) {
                if ($player->getTeam()->getId() == $queryParams["team"]) {
                    $filteredPlayers[] = $player;
                }
            }
            if (empty($queryParams["team"]) && !empty($queryParams["game"])) {
                if ($player->getAssignedGame()->getId() == $queryParams["game"]) {
                    $filteredPlayers[] = $player;
                }
            }
        }
        return $filteredPlayers;
    }
}
