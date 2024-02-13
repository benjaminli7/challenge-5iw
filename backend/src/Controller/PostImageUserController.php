<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use RuntimeException;


class PostImageUserController
{
    public function __invoke(Request $request): User
    {
        $user = $request->attributes->get('data');
        if (!$user instanceof User) {
            throw new RuntimeException('user not found');
        }
        $file = $request->files->get('file');
        $user->setFile($request->files->get('file'));
        $user->setUpdatedAt(new \DateTime());

        // dd($user);
        return $user;
    }
}
