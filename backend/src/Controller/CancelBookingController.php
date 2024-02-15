<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Repository\ScheduleRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Message;
use Symfony\Component\Mime\Email;

class CancelBookingController
{
    public function __construct(
        protected ScheduleRepository $scheduleRepository,
        protected MailerInterface $mailer,
    ) {
        $this->mailer = $mailer;
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

        $start = $schedule->getStartingDate();
        $startDay = $start->format('d-m-Y');
        $startHour = $start->format('H:i');

        $emailContent = "Bonjour,\n\n La réservation du $startDay à $startHour  a été annulée";
        $email = (new Email())
        ->from('game.elevate@gmail.com')
        ->to($booster->getEmail())
        ->subject('Réservation annulée')
        ->text($emailContent);

        $this->mailer->send($email);

        return $data;
    }
}
