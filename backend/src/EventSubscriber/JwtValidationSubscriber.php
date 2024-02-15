<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTAuthenticatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class JwtValidationSubscriber implements EventSubscriberInterface
{
    public function onJwtAuthenticated(JWTAuthenticatedEvent $event)
    {
        $user = $event->getToken()->getUser();

        if (!$user->isIsVerified()) {
            throw new \Exception('Votre compte n\'est pas vérifié.', 403);
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            JWTAuthenticatedEvent::class => 'onJwtAuthenticated',
        ];
    }
}
