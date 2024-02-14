<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Repository\ScheduleRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AddBookingController
{
    public function __construct(
        protected UserPasswordHasherInterface $hasher,
        protected ScheduleRepository $scheduleRepository,
        protected UserRepository $userRepository
    ) {
    }

    public function __invoke(Booking $data, Request $request, EntityManagerInterface $entityManager)
    {
        $values = json_decode($request->getContent(), true);

        $scheduleId = $values['schedule'];
        $schedule = $this->scheduleRepository->find($scheduleId);
        $userId = $values['user'];
        $user = $this->userRepository->find($userId);

        $booster = $schedule->getBooster();

        if($user === null) {
            throw new \Exception('User not found');
        }
        if($schedule === null) {
            throw new \Exception('Schedule not found');
        }
        if($schedule->getCoinsNeeded() > $user->getCoins()) {
            throw new \Exception('Not enough coins');
        }

        if($schedule->getBooking() !== null) {
            throw new \Exception('This schedule is already booked');
        }
        if($schedule->getStatus() !== 'available') {
            throw new \Exception('This schedule is not available');
        }

        $data->setClient($user);
        $data->setSchedule($schedule);
        $data->setStatus('pending');

        $user->setCoins($user->getCoins() - $schedule->getCoinsNeeded());
        $boosterTeam = $booster->getTeam();
        $boosterTeam->setCoins($boosterTeam->getCoins() + $schedule->getCoinsNeeded());
        $booster->setCoinGenerated($booster->getCoinGenerated() + $schedule->getCoinsNeeded());
        $schedule->setStatus('booked');

        return $data;
    }
}
