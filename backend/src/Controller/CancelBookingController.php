<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Repository\ScheduleRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class CancelBookingController
{
    public function __construct(
        protected ScheduleRepository $scheduleRepository,
    ) {
    }

    public function __invoke(Booking $data, Request $request, EntityManagerInterface $entityManager)
    {
        $schedule = $data->getSchedule();
        $booster = $schedule->getBooster();

        $booster->setCoinGenerated($booster->getCoinGenerated() - $schedule->getCoinsNeeded());
        $boosterTeam = $booster->getTeam();
        $boosterTeam->setCoins($boosterTeam->getCoins() - $schedule->getCoinsNeeded());

        $client = $data->getClient();
        $client->setCoins($client->getCoins() + $schedule->getCoinsNeeded());
        $data->getSchedule()->setStatus('available');
        $entityManager->remove($data);
        return $data;
    }
}
