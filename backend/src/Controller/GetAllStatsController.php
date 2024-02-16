<?php

namespace App\Controller;

use App\Entity\Team;


use App\Repository\GameRepository;
use App\Repository\UserRepository;
use App\Repository\TeamRepository;
use App\Repository\BookingRepository;
use App\Repository\ReviewRepository;
use App\Repository\GameUserRepository;


use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class GetAllStatsController
{
    public function __construct(
        protected GameRepository $gameRepository,
        protected UserRepository $userRepository,
        protected TeamRepository $teamRepository,
        protected BookingRepository $bookingRepository,
        protected ReviewRepository $reviewRepository,
    ) {
    }

    public function __invoke(Request $request, EntityManagerInterface $entityManager)
    {
        $approvedTeams = $this->teamRepository->findAllApprovedTeams();
        $findAllPlayersInApprovedTeams = $this->userRepository->findAllPlayersInApprovedTeam();


        $stats['cards']["teams"] = array(
            'title' => "Total Teams",
            'amount' =>  count($approvedTeams),
            'details' => "Total teams created and approved",
        );
        $stats['cards']['players'] =
            [
                'title' => "Total Players",
                'amount' => count($findAllPlayersInApprovedTeams),
                'details' => "Total players in approved teams",
            ];
        $reviews = $this->reviewRepository->findAll();
        //[{1: 2O, 2: 0, 3: 2, 4: 0, 5: 40}] // if 0 reviews has a rating of 2 put 0

        $ratings = array_fill(1, 5, 0);
        foreach ($reviews as $review) {
            $ratings[$review->getRating()]++;
        }


        $stats['ratings'] = $ratings;

        $stats['currentMonthVerifiedPlayers'] = $this->getCurrentMonthVerifiedPlayers();
        $stats['lastMonthVerifiedPlayers'] = $this->getLastMonthVerifiedPlayers();

        $stats['cards']['currentMonthVerifiedUsers'] = array(
            'title' => "Total Users",
            'amount' => $this->userRepository->getMonthVerifiedUsersCount(),
            'details' => "Total users created and verified this month",
        );
        $stats['cards']['currentMonthBookings'] = array(
            'title' => "Total Bookings",
            'amount' => $this->bookingRepository->getMonthBookings(),
            'details' => "Total bookings made this month",
        );
        $mostRentable = $this->teamRepository->getMostRentableTeam();
        $stats['cards']['mostRentableTeam'] = array(
            'title' => $mostRentable[0]['name'] . " is the most rentable team this month",
            'amount' => $mostRentable[0]['coins'],
            'details' => "Most rentable team this month",
        );
        $stats['cards']['allTimeEarnings'] = array(
            'title' => "All Time Earnings",
            'amount' => $this->getAllTimeEarningsCount(),
            'details' => "Total earnings from all teams",
        );
        $stats['cards']['allTimeWithdrawn'] = array(
            'title' => "All Time Withdrawn",
            'amount' => $this->getAllTimeWithdrawnCount(),
            'details' => "Total withdrawn from all teams",
        );
        $stats['cards']['allTimeReviews'] = array(
            'title' => "All Time Reviews",
            'amount' => $this->getAllTimeReviewsCount(),
            'details' => "Total reviews from all teams",
        );
        $stats['cards']['mostCommonGame'] = array(
            'title' => "Most Common Game",
            'amount' => $this->getMostCommonGame(),
            'details' => "Most common game played by users",
        );


        return $stats;
    }
    public function getCurrentMonthVerifiedPlayers(): array
    {
        // Get the verified players from the repository
        $currentMonthVerifiedPlayers = $this->userRepository->getMonthVerifiedPlayers();

        // Initialize an array to store counts for each day of the month
        $countsByDay = array_fill(1, 31, 0);

        // Iterate through the players and count them by day
        foreach ($currentMonthVerifiedPlayers as $player) {
            $dayOfMonth = (int)$player->getCreatedAt()->format('d');
            $countsByDay[$dayOfMonth]++;
        }

        return $countsByDay;
    }
    public function getLastMonthVerifiedPlayers(): array
    {
        // Get the verified players from the repository
        $lastMonthVerifiedPlayers = $this->userRepository->getLastMonthVerifiedPlayers();

        // Initialize an array to store counts for each day of the month
        $countsByDay = array_fill(1, 31, 0);

        // Iterate through the players and count them by day
        foreach ($lastMonthVerifiedPlayers as $player) {
            $dayOfMonth = (int)$player->getCreatedAt()->format('d');
            $countsByDay[$dayOfMonth]++;
        }

        return $countsByDay;
    }
    public function getAllTimeEarningsCount(): int
    {
        $allTimeEarnings = 0;
        $teams = $this->teamRepository->findAll();
        foreach ($teams as $team) {
            $allTimeEarnings += $team->getCoins();
        }
        return $allTimeEarnings;
    }
    public function getAllTimeWithdrawnCount(): int
    {
        $allTimeWithdrawn = 0;
        $teams = $this->teamRepository->findAll();
        foreach ($teams as $team) {
            $allTimeWithdrawn += $team->getWithDrawnedCoins();
        }
        return $allTimeWithdrawn;
    }
    public function getAllTimeReviewsCount(): int
    {
        $allTimeReviews = 0;
        $reviews = $this->reviewRepository->findAll();
        foreach ($reviews as $review) {
            $allTimeReviews += $review->getRating();
        }
        return $allTimeReviews;
    }

    public function getMostCommonGame(): string
    {
        $players = $this->userRepository->findAllPlayersInApprovedTeam();
        $games = array();
        foreach ($players as $player) {
            $game = $player->getAssignedGame()->getName();
            if (array_key_exists($game, $games)) {
                $games[$game]++;
            } else {
                $games[$game] = 1;
            }
        }
        arsort($games);
        return array_key_first($games);
    }
}
