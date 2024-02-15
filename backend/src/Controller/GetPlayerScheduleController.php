<?php

namespace App\Controller;

use App\Entity\Schedule;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\TeamRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class GetPlayerScheduleController
{
    public function __construct(
        protected UserRepository $userRepository,
    ) {
    }

    public function __invoke(User $data, Request $request)
    {
        return $data->getCoinGenerated();
    }
}
