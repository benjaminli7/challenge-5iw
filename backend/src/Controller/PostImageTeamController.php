<?php

namespace App\Controller;

use App\Entity\Team;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use RuntimeException;


class PostImageTeamController
{
    public function __invoke(Request $request): Team
    {
        $team = $request->attributes->get('data');
        if (!$team instanceof Team) {
            throw new RuntimeException('team not found');
        }
        $file = $request->files->get('file');
        $team->setFile($request->files->get('file'));
        $team->setUpdatedAt(new \DateTime());
        //dd($team);
        return $team;
    }
}
