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

        $bookings = array_filter($bookings->toArray(), function($booking) {
            return $booking->getStatus() !== 'canceled';
        });
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
                        'assignedGame' => $booking->getSchedule()->getBooster()->getAssignedGame()->getName(),
                        'team' => $booking->getSchedule()->getBooster()->getTeam()->getName(),
                    ],
                ],
            ];
        }
        usort($newBookingsArr, function ($a, $b) {
            return $a['schedule']['startingDate'] <=> $b['schedule']['startingDate'];
        });

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
