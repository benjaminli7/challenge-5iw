<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Game;
use App\Entity\Rank;

class GamesFixtures extends Fixture
{
    public const RL_REFERENCE = 'rl-reference';
    public const VLR_REFERENCE = 'vlr-reference';
    public const LOL_REFERENCE = 'lol-reference';
    public function load(ObjectManager $manager)
    {
        $gamesData = [
            [
                'name' => 'Rocket League',
                'ranks' => ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Champion', 'Grand Champion', 'Supersonic Legend'],
            ],
            [
                'name' => 'Valorant',
                'ranks' => ['Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
            ],
            [
                'name' => 'League of Legends',
                'ranks' => ['Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
            ],
            // Add more games as needed
        ];

        foreach ($gamesData as $gameData) {
            $game = new Game();
            $game->setName($gameData['name']);
            $manager->persist($game);

            foreach ($gameData['ranks'] as $rankName) {
                $rank = new Rank();
                $rank->setName($rankName);
                $rank->setGame($game);
                $manager->persist($rank);
            }
        }

        $manager->flush();

        $rocketLeague = $manager->getRepository(Game::class)->findOneBy(['name' => 'Rocket League']);
        $valorant = $manager->getRepository(Game::class)->findOneBy(['name' => 'Valorant']);
        $leagueOfLegends = $manager->getRepository(Game::class)->findOneBy(['name' => 'League of Legends']);

        $this->addReference(self::RL_REFERENCE, $rocketLeague);
        $this->addReference(self::VLR_REFERENCE, $valorant);
        $this->addReference(self::LOL_REFERENCE, $leagueOfLegends);

    }
}
