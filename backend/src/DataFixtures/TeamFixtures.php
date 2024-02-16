<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use App\Entity\Team;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\DataFixtures\GamesFixtures;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker\Factory;
use Faker\Provider\fr_FR\PhoneNumber as FrPhoneNumber;

class TeamFixtures extends Fixture implements DependentFixtureInterface
{
    private $faker;

    public function __construct(
        protected UserPasswordHasherInterface $hasher,
    ) {
        $this->faker = Factory::create();
        $this->faker->addProvider(new FrPhoneNumber($this->faker));
    }

    public function load(ObjectManager $manager)
    {
        $lol = $this->getReference(GamesFixtures::LOL_REFERENCE);
        $rl = $this->getReference(GamesFixtures::RL_REFERENCE);
        $vlr = $this->getReference(GamesFixtures::VLR_REFERENCE);

        $teams = ["Karmine Corp", "G2", "SK", "SKT T1", "Fnatic", "TSM", "Cloud9", "Rogue", "Vitality", "Misfits", "Excel", "MAD Lions"];

        $lat= [
            48.8566, 52.5200, 41.9028, 51.5074, 40.4168, 52.3676, 37.9838, 38.7223, 48.2082, 59.3293, 59.9139,
            55.6761, 50.0755, 52.2297, 47.4979, 53.3498, 50.8503, 60.1695, 45.8150, 44.4268, 42.6977, 46.9480,
            64.1466, 54.6872, 59.4370, 56.9496, 49.6116, 48.1486, 46.0569, 42.5063, 43.7384, 43.9424, 35.1856,
            35.8989, 47.1410, 36.1408, 42.4304, 41.3275, 43.8563, 41.9973, 45.8150, 43.8563, 42.4304, 35.1856,
            35.8989, 47.1410, 36.1408, 43.7384, 42.5063, 46.0569, 48.1486, 49.6116, 56.9496, 59.4370, 54.6872,
            64.1466, 46.9480, 42.6977, 44.4268, 45.8150
        ];

        $lon = [
            2.3522, 13.4050, 12.4964, -0.1278, -3.7038, 4.9041, 23.7275, -9.1393, 16.3738, 18.0686, 10.7522,
            12.5683, 14.4378, 21.0122, 19.0402, -6.2603, 4.3517, 24.9354, 15.9819, 26.1025, 23.3219, 7.4474,
            -21.9426, 25.2797, 24.7536, 24.1052, 6.1319, 17.1077, 14.5058, 1.5218, 7.4246, 12.4578, 33.3823,
            14.5146, 9.5215, -5.3536, 19.2594, 19.8187, 18.4131, 21.4279, 15.9819, 18.4131, 19.2594, 33.3823,
            14.5146, 9.5215, -5.3536, 7.4246, 1.5218, 14.5058, 17.1077, 6.1319, 24.1052, 24.7536, 25.2797,
            -21.9426, 7.4474, 23.3219, 26.1025, 15.9819
        ];
        
        $city = [
            "Paris", "Berlin", "Rome", "Londres", "Madrid", "Amsterdam", "Athènes", "Lisbonne", "Vienne", "Stockholm",
            "Oslo", "Copenhague", "Prague", "Varsovie", "Budapest", "Dublin", "Bruxelles", "Helsinki", "Zagreb", "Bucarest",
            "Sofia", "Berne", "Reykjavik", "Vilnius", "Tallinn", "Riga", "Luxembourg", "Bratislava", "Ljubljana", "Andorre-la-Vieille",
            "Monaco", "San Marino", "Nicosie", "Valetta", "Vaduz", "Gibraltar", "Podgorica", "Tirana", "Sarajevo", "Skopje",
            "Zagreb", "Sarajevo", "Podgorica", "Nicosie", "Valetta", "Vaduz", "Gibraltar", "Monaco", "Andorre-la-Vieille", "Ljubljana",
            "Bratislava", "Luxembourg", "Riga", "Tallinn", "Vilnius", "Reykjavik", "Berne", "Sofia", "Bucarest", "Zagreb"
        ];

        $ii=0;
        
        foreach ($teams as $team) {
            $newTeam = new Team();
            $newTeam->setName($team);
            $newTeam->setIban($this->faker->iban());
            $newTeam->setIsApproved($this->faker->boolean());

            $user = new User();
            $user->setEmail($this->faker->email());
            $user->setUsername($this->faker->userName());
            $user->setFirstName($this->faker->firstName());
            $user->setLastName($this->faker->lastName());
            $user->setDiscord($this->faker->userName() . '#' . $this->faker->randomNumber(4, true));
            $user->setPhone($this->faker->phoneNumber());
            $user->setIsVerified(true);
            $user->setPassword($this->hasher->hashPassword($user, 'password'));
            $user->setOwnedTeam($newTeam);
            $user->setType("manager");

            $newTeam->setManager($user);

            $manager->persist($user);
            for ($i = 0; $i < 5; $i++) {
                $user = new User();
                $user->setEmail($this->faker->email());
                $user->setUsername($this->faker->userName());
                $user->setFirstName($this->faker->firstName());
                $user->setLastName($this->faker->lastName());
                $user->setDiscord($this->faker->userName() . '#' . $this->faker->randomNumber(4, true));
                $user->setPhone($this->faker->phoneNumber());
                $user->setIsVerified(true);
                $user->setPassword($this->hasher->hashPassword($user, 'password'));
                $user->setTeam($newTeam);
                $user->setType("player");
                $user->setAssignedGame($this->faker->randomElement([$lol, $rl, $vlr]));
                $user->setTauxHoraire($this->faker->numberBetween(100, 1000));
                $user->setaddress($city[$ii]);
                $user->setLat($lat[$ii]);
                $user->setLng($lon[$ii]);
                // set the createdAt and updatedAt date for the user
                $user->setCreatedAt($this->faker->dateTimeBetween('-1 months', 'now'));
                $user->setUpdatedAt($this->faker->dateTimeBetween($user->getCreatedAt(), 'now'));

                $newTeam->addBooster($user);
                $manager->persist($user);
                $ii++;
            }
            $newTeam->setCoins(1000);
            $manager->persist($newTeam);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            GamesFixtures::class,
            UserFixtures::class,
        ];
    }
}
