<?php


namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Offer;

class OffersFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $offersData = [
            [
                'name' => 'Starter Pack',
                'coins' => 200,
                'price' => 15,
            ],
            [
                'name' => 'Silver Package',
                'coins' => 500,
                'price' => 30,
            ],
            [
                'name' => 'Gold Package',
                'coins' => 1000,
                'price' => 50,
            ],
            [
                'name' => 'Platinum Package',
                'coins' => 2000,
                'price' => 80,
            ],
            [
                'name' => 'Diamond Package',
                'coins' => 5000,
                'price' => 120,
            ],
        ];

        foreach ($offersData as $offerData) {
            $offer = new Offer();
            $offer->setName($offerData['name']);
            $offer->setCoins($offerData['coins']);
            $offer->setPrice($offerData['price']);
            $manager->persist($offer);
        }

        $manager->flush();
    }
}
