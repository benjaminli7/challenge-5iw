<?php

namespace App\Controller;

use App\Entity\Rank;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use RuntimeException;


class PostImageRankController
{
    public function __invoke(Request $request): Rank
    {
        $rank = $request->attributes->get('data');
        if (!$rank instanceof Rank) {
            throw new RuntimeException('Rank not found');
        }
        $file = $request->files->get('file');
        $rank->setFile($request->files->get('file'));
        $rank->setUpdatedAt(new \DateTime());
        //dd($rank);
        return $rank;
    }
    
}
