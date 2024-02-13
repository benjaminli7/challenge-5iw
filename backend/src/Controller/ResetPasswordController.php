<?php

// declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\DTO\ResetPassword;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Message;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\ORM\EntityManagerInterface;

#[AsController]
class ResetPasswordController
{       

    public function __construct(
        protected MailerInterface $mailer,
        protected UserRepository $userRepository,
        protected UrlGeneratorInterface $urlGenerator
    )
    {
        $this->mailer = $mailer;
        $this->urlGenerator = $urlGenerator;
    }

    public function __invoke(ResetPassword $dto, EntityManagerInterface $entityManager)
    {
        $user = $this->userRepository->findOneBy(['email' => $dto->getEmail()]);

        if (null === $user) {
            throw new EntityNotFoundException('email not found');
        }
        $token = $this->generateToken();

        $user->setResetToken($token);
        $entityManager->persist($user);
        $entityManager->flush();

        $emailContent = "Bonjour,\n\nPour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant : http://localhost:3000/changePassword?token=$token";
        $email = (new Email())
        ->from('game.elevate@gmail.com')
        ->to($user->getEmail())
        ->subject('Renouvellement de mot de passe')
        ->text($emailContent);


        // Envoyer l'e-mail via le service Symfony Mailer
        $this->mailer->send($email);

        return new Response('E-mail envoyé avec succès');
    }
    private function generateToken()
    {
        // Implémentez ici la logique pour générer un token sécurisé
        return bin2hex(random_bytes(32));
    }
}