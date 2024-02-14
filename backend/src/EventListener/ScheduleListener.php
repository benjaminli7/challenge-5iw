<?php

namespace App\EventListener;

use App\Entity\Schedule;
use Doctrine\Bundle\DoctrineBundle\EventSubscriber\EventSubscriberInterface;

use Doctrine\Persistence\Event\LifecycleEventArgs;

use Doctrine\ORM\Events;

class ScheduleListener implements EventSubscriberInterface
{
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
        ];
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $schedule = $args->getObject();
        if (!$schedule instanceof Schedule) {
            return;
        }
        $schedule->calculateCoinsNeeded();
    }
}
