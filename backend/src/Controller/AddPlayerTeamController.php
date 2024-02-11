<?php

namespace App\Controller;

use App\Entity\Team;
use App\Entity\User;
use App\Repository\GameRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AddPlayerTeamController
{
    public function __construct(
        protected GameRepository $gameRepository,
        protected UserPasswordHasherInterface $hasher,
    ) {
    }

    public function __invoke(Team $data, Request $request, EntityManagerInterface $entityManager)
    {
        $values = json_decode($request->getContent(), true);
        $game = $this->gameRepository->findOneBy(['id' => $values["assignedGame"]]);

        $plainPassword = $values["plainPassword"];

        $player = new User();
        $player->setAssignedGame($game);
        $player->setDiscord($values["discord"]);
        $player->setEmail($values["email"]);
        $player->setFirstName($values["firstName"]);
        $player->setLastName($values["lastName"]);
        $player->setUsername($values["username"]);

        $hashedPassword = $this->hasher->hashPassword($player, $plainPassword);
        $player->setPassword($hashedPassword);
        $player->setTeam($data);
        $player->setType("player");

        $entityManager->persist($player);
        $entityManager->flush();
        $data->addBooster($player);

        return $data;
    }
}
