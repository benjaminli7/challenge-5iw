<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use RuntimeException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Message;
use Symfony\Component\Mime\Email;


class PostUserController

{
    public function __construct(
        protected MailerInterface $mailer,
    )
    {
        $this->mailer = $mailer;
    }
    public function __invoke(Request $request,  User $user): User
    {
        $token = bin2hex(random_bytes(32));
        $user->setResetToken($token);
        $link = $this->getParameter('LINK');
        $emailContent = "Bonjour,\n\nPour valider votre compte, veuillez cliquer sur le lien suivant : $link/validation?token=$token";
        $email = (new Email())
        ->from('game.elevate@gmail.com')
        ->to($user->getEmail())
        ->subject('Validation de votre compte GameElevate')
        ->text($emailContent);


        // // Envoyer l'e-mail via le service Symfony Mailer
        $this->mailer->send($email);

        // dd($user);
        return $user;
    }
}
