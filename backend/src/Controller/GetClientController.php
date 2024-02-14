<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ScheduleRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class GetClientController
{
    public function __construct(
        protected UserPasswordHasherInterface $hasher,
        protected ScheduleRepository $scheduleRepository,
        protected UserRepository $userRepository
    ) {
    }

    public function __invoke(User $data, Request $request, EntityManagerInterface $entityManager)
    {
        $bookings = $data->getBookings();
        $newBookingsArr = [];
        foreach($bookings as $booking) {
            $newBookingsArr[] = [
                'id' => $booking->getId(),
                'status' => $booking->getStatus(),
                'schedule' => [
                    'id' => $booking->getSchedule()->getId(),
                    'startingDate' => $booking->getSchedule()->getStartingDate(),
                    'endingDate' => $booking->getSchedule()->getEndingDate(),
                    'status' => $booking->getSchedule()->getStatus(),
                    'coinsNeeded' => $booking->getSchedule()->getCoinsNeeded(),
                    'booster' => [
                        'id' => $booking->getSchedule()->getBooster()->getId(),
                        'username' => $booking->getSchedule()->getBooster()->getUsername(),
                        'discord' => $booking->getSchedule()->getBooster()->getDiscord(),
                    ],
                ],
            ];
        }

        $client = [
            'id' => $data->getId(),
            'email' => $data->getEmail(),
            'username' => $data->getUsername(),
            'coins' => $data->getCoins(),
            'bookings' => $newBookingsArr,
        ];
        return $client;
    }
}
