<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Game;
use App\Entity\Rank;

class GamesFixtures extends Fixture
{
    public const LOL_REFERENCE = 'lol';
    public function load(ObjectManager $manager)
    {
        // Create Valorant game
        $valorant = new Game();
        $valorant->setName('Valorant');
        $valorant->setColor('#ff4500'); // You can choose a different color
        $manager->persist($valorant);

        // Create Valorant ranks
        $valorantRanks = ['Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'];
        foreach ($valorantRanks as $rankName) {
            $rank = new Rank();
            $rank->setName($rankName);
            $rank->setGame($valorant);
            $manager->persist($rank);
        }

        // Create League of Legends game
        $lol = new Game();
        $lol->setName('League of Legends');
        $lol->setColor('#1e90ff'); // You can choose a different color
        $manager->persist($lol);

        // Create League of Legends ranks
        $lolRanks = ['Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'];
        foreach ($lolRanks as $rankName) {
            $rank = new Rank();
            $rank->setName($rankName);
            $rank->setGame($lol);
            $manager->persist($rank);
        }

        $manager->flush();

        $this->addReference(self::LOL_REFERENCE, $lol);
    }
}