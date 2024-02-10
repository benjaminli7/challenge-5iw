<?php

namespace App\Controller;

use App\Entity\Team;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\TeamRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


class CreateTeamController
{
    public function __construct(
        protected UserRepository $userRepository,
    ) {
    }

    public function __invoke(Team $data, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        // dd($data["name"]);

        return $data;
    }
}
