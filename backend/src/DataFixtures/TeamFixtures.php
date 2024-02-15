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
                // set the createdAt and updatedAt date for the user
                $user->setCreatedAt($this->faker->dateTimeBetween('-1 months', 'now'));
                $user->setUpdatedAt($this->faker->dateTimeBetween($user->getCreatedAt(), 'now'));

                $newTeam->addBooster($user);
                $manager->persist($user);
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
