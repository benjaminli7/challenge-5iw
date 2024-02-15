<?php

// declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\DTO\ChangePassword;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Message;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class ChangePasswordController
{
    public function __construct(
        private UserRepository $userRepository,
        protected UserPasswordHasherInterface $hasher,
    ) {}

    public function __invoke(ChangePassword $dto, EntityManagerInterface $entityManager, $token): Response
    {
        $user = $this->userRepository->findOneBy(['resetToken' => $token]);

        if (null === $user) {
            throw new EntityNotFoundException('Token not found');
        }

        try {
            $hashedPassword = $this->hasher->hashPassword($user, $dto->getPassword());
            $user->setPassword($hashedPassword);
            $user->setResetToken(NULL);
            $entityManager->persist($user);
            $entityManager->flush();
            return new Response('Password updated successfully');
        } catch (\Throwable $th) {
            return new Response('Error while changing password');
        }
        
        
    }
}