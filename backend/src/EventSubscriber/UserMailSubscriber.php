<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;

final class BookMailSubscriber implements EventSubscriberInterface
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendMail(ViewEvent $event): void
    {
        $book = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$book instanceof Book || Request::METHOD_POST !== $method) {
            return;
        }

        $params = ['param1' => 'foo', 'param2' => 'bar'];
        $json = json_encode(['custom_header_1' => 'custom_value_1']);

        $email = new Email();
        $email
            ->getHeaders()
            ->add(new MetadataHeader('custom', $json))
            ->add(new TagHeader('TagInHeaders1'))
            ->add(new TagHeader('TagInHeaders2'))
            ->addTextHeader('sender.ip', '1.2.3.4')
            ->addTextHeader('templateId', 1)
            ->addParameterizedHeader('params', 'params', $params)
            ->addTextHeader('foo', 'bar')
        ;
    }
}