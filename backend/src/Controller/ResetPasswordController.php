<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\DTO\ResetPassword;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Api\SMTPApi;
use SendinBlue\Client\Model\SendSmtpEmail;
use SendinBlue\Client\Model\SendSmtpEmailSender;

#[AsController]
class ResetPasswordController
{
    public function __construct(
        protected MailerInterface $mailer,
        protected UserRepository $userRepository,
    )
    {
    }

    public function __invoke(ResetPassword $dto)
    {
        $user = $this->userRepository->findOneBy(['email' => $dto->getEmail()]);

        if (null === $user) {
            throw new EntityNotFoundException('Email not found');
        }

        // Configurer l'email pour Sendinblue
        $emailSender = new SendSmtpEmailSender(['name' => 'Your Name', 'email' => 'your_email@example.com']);
        $email = new SendSmtpEmail([
            'to' => [['email' => $user->getEmail()]],
            'subject' => 'Password Reset',
            'htmlContent' => 'Your password reset email content goes here.',
            'sender' => $emailSender,
        ]);

        // Envoyer l'email via l'API Sendinblue
        $this->sendEmailViaSendinblue($email);

        return $user;
    }

    protected function sendEmailViaSendinblue(SendSmtpEmail $email): void
    {
        $configuration = Configuration::getDefaultConfiguration()->setApiKey('api-key', $_ENV['MAILER_DSN']);
        $apiInstance = new SMTPApi(null, $configuration);

        try {
            $result = $apiInstance->sendTransacEmail($email);
            // Gérer la réponse de l'API Sendinblue
            // ...
        } catch (\Exception $e) {
            // Gérer les exceptions
            throw new \RuntimeException('Failed to send email via Sendinblue: ' . $e->getMessage());
        }
    }
}