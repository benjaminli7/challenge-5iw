<?php

namespace App\Controller;

use App\Entity\Team;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AddPlayerTeamController
{
    public function __construct(
        protected UserRepository $userRepository,
        protected UserPasswordHasherInterface $hasher,
    ) {
    }

    public function __invoke(Team $data, Request $request, EntityManagerInterface $entityManager)
    {
        $user = new User();
        // $user->setFirstName("John");
        // $user->setLastName("Doe");
        // $user->setEmail("test@test.fr");
        // $plainPassword = "test";

        // $hashedPassword = $this->hasher->hashPassword($user, $plainPassword);
        // $user->setPassword($hashedPassword);

        $entityManager->persist($user);
        $entityManager->flush();
        $data->addBooster($user);

        return $data;
    }
}
