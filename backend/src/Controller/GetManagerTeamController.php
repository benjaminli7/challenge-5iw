<?php

namespace App\Controller;

use App\Entity\Team;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\TeamRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class GetManagerTeamController
{
    public function __construct(
        protected UserRepository $userRepository,
    ) {
    }

    public function __invoke(User $data, Request $request)
    {
        $team = $data->getOwnedTeam();
        if (!$team) {
            // return json with a message
            $response = new JsonResponse(['errorMessage' => 'You do not own a team.'], 200);
            return $response;
        }

        return $team;
    }
}
