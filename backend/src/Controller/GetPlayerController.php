<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ScheduleRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class GetPlayerController
{
    public function __construct(
        protected UserPasswordHasherInterface $hasher,
        protected ScheduleRepository $scheduleRepository,
        protected UserRepository $userRepository
    ) {
    }

    public function __invoke(User $data, Request $request, EntityManagerInterface $entityManager)
    {
        $schedules = $data->getSchedules();
        $newSchedulesArr = [];
        foreach ($schedules as $schedule) {
            $newSchedulesArr[] = [
                'id' => $schedule->getId(),
                'startingDate' => $schedule->getStartingDate(),
                'endingDate' => $schedule->getEndingDate(),
                'status' => $schedule->getStatus(),
                'coinsNeeded' => $schedule->getCoinsNeeded(),
                'client' => $schedule->getBooking() ? [
                    'id' => $schedule->getBooking()->getClient()->getId(),
                    'email' => $schedule->getBooking()->getClient()->getEmail(),
                    'username' => $schedule->getBooking()->getClient()->getUsername(),
                    'discord' => $schedule->getBooking()->getClient()->getDiscord(),
                    'firstName' => $schedule->getBooking()->getClient()->getFirstName(),
                    'lastName' => $schedule->getBooking()->getClient()->getLastName(),
                ] : null,
            ];
        }
        usort($newSchedulesArr, function ($a, $b) {
            return $a['startingDate'] <=> $b['startingDate'];
        });
        $player = [
            'id' => $data->getId(),
            'email' => $data->getEmail(),
            'username' => $data->getUsername(),
            'discord' => $data->getDiscord(),
            'coin_generated' => $data->getCoinGenerated(),
            'schedules' => $newSchedulesArr,
        ];
        return $player;
    }
}
