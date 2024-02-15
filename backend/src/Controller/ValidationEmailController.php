<?php


namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\DTO\ValidationEmail;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ValidationEmailController
{
    public function __construct(
        private UserRepository $userRepository,
    ) {}

    public function __invoke( ValidationEmail $dto, EntityManagerInterface $entityManager, $token): Response
    {

        $user = $this->userRepository->findOneBy(['resetToken' => $token]);

        if (null === $user) {
            throw new EntityNotFoundException('Token not found');
        }

        try {
            
            $user->setIsVerified(true);
            $user->setResetToken(NULL);
            $entityManager->persist($user);
            $entityManager->flush();
            return new Response('Account is verified');
        } catch (\Throwable $th) {
            return new Response('Account is unverified');
        }
        
        
    }
}