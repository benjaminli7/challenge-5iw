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
        $typePlayerParams = ['type' => 'player'];
        $queryParams = $request->query->all();
        $combinedQueryParams = $typePlayerParams + $queryParams;
        $players = $this->userRepository->findBy($combinedQueryParams);
        return $players;
    }
}
