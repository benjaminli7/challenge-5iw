<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessHandler
{
    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }


        // Add user data to the token payload
        $data['user'] = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'type' => $user->getType(),
            'roles' => $user->getRoles(),
            'username' => $user->getUsername(),
        ];

        $event->setData($data);
    }
}
