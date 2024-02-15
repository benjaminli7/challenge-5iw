<?php

namespace App\Controller;

use App\Entity\Team;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;



class ApproveTeamController
{
    public function __construct(
        protected MailerInterface $mailer,

    ) {
        $this->mailer = $mailer;
    }

    public function __invoke(Team $data, Request $request, EntityManagerInterface $entityManager)
    {
        $data->setIsApproved(true);
        $emailContent = "Bonjour,\n\nVotre équipe " . $data->getName() . " a été approuvée par l'administrateur.\n Vous pouvez maintenant gérer votre équipe depuis votre espace personnel.\n\nBienvenu dans la grande famille Game Elevate ! \n\n\n L'équipe Game Elevate.";
        $manager = $data->manager;
        $email = (new Email())
            ->from('game.elevate@gmail.com')
            ->to($manager->getEmail())
            ->subject('🎉 Félicitation votre équipe est approuvé 🎉')
            ->text($emailContent);

        $this->mailer->send($email);

        return $data;
    }
}
