<?php

namespace App\Controller;

use App\Entity\Team;
use App\Entity\User;
use App\Repository\GameRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Message;
use Symfony\Component\Mime\Email;

class AddPlayerTeamController
{
    public function __construct(
        protected MailerInterface $mailer,
        protected GameRepository $gameRepository,
        protected UserPasswordHasherInterface $hasher,
    ) {
        $this->mailer = $mailer;
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
        $player->setTauxHoraire($values["tauxHoraire"]);
        $player->setaddress($values["address"]);
        $player->setLng($values["lng"]);
        $player->setLat($values["lat"]);
        $player->setIsVerified(true);

        $entityManager->persist($player);
        $entityManager->flush();
        $data->addBooster($player);
        $teamName = $data->getName();
        $playerEmail = $player->getEmail();

        $emailContent = "Bonjour,\n\n Votre compte a été crée pour l'équipe $teamName\n\n Voici vos identifiants:\n\n Email: $playerEmail \n\n Mot de passe: $plainPassword";
        $email = (new Email())
        ->from('game.elevate@gmail.com')
        ->to($playerEmail)
        ->subject('Nouveau compte')
        ->text($emailContent);

        // Envoyer l'e-mail via le service Symfony Mailer
        $this->mailer->send($email);
        return $data;
    }
}
