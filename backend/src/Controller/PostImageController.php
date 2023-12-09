<?php

namespace App\Controller;

use App\Entity\Game;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


class PostImageController
{
    public function __invoke( Request $request): Game
    {
        $game = $request->attributes->get('data');
        if(!$game instanceof Game){
            throw new RuntimeException('Game not found');
        }
        $file = $request->files->get('file');

        $game->setFile($request->files->get('file'));
        $game->setUpdatedAt(new \DateTime());
        return $game;
    }
}
