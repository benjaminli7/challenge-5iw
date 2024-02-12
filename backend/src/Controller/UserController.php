<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    private Security $security;
    private SerializerInterface $serializer;

    public function __construct(Security $security, SerializerInterface $serializer)
    {
        $this->security = $security;
        $this->serializer = $serializer;
    }

    #[Route('/api/users/me', name: 'current_user', methods: ['GET'])]
    public function currentUser(): JsonResponse
    {
        $user = $this->security->getUser();

        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        $json = $this->serializer->serialize($user, 'json', ['groups' => ['read-user']]);
        return new JsonResponse($json, 200, [], true);
    }
}
