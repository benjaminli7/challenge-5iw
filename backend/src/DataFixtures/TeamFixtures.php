<?php
# src/DataFixtures/UserFixtures.php
namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use App\Entity\Team;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\DataFixtures\UserFixtures;
use App\DataFixtures\GamesFixtures;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class TeamFixtures extends Fixture implements DependentFixtureInterface
{
    public function __construct(
        protected UserPasswordHasherInterface $hasher,
    ) {
    }

    public function load(ObjectManager $manager)
    {
        $benjamin = $this->getReference(UserFixtures::ADMIN_USER_REFERENCE);
        $lol = $this->getReference(GamesFixtures::LOL_REFERENCE);

        // Create a team with a manager
        $team = new Team();
        $team->setName('SKT T1');
        $team->setCoins(100);
        $team->setIsApproved(true);
        $team->setIban('NL30RABO4789170233');
        $team->setManager($benjamin);

        $manager->persist($team);

        // Create a booster user
        $boosterUser = new User();
        $boosterUser->setEmail('faker@faker.fr');
        $boosterUser->setUsername('Faker');
        $boosterUser->setRoles(['ROLE_USER']);
        $boosterUser->setPassword($this->hasher->hashPassword($boosterUser, "faker"));
        $boosterUser->setFirstName('Lee');
        $boosterUser->setLastName('Sang-hyeok');
        $boosterUser->setIsVerified(true);
        $boosterUser->setPhone('111111111');
        $boosterUser->setType('player');
        $boosterUser->setCoins(25);
        $boosterUser->setDiscord('faker#1234');
        $boosterUser->setAssignedGame($lol);

        $manager->persist($boosterUser);

        $team->addBooster($boosterUser);

        $benjamin->setOwnedTeam($team);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
            GamesFixtures::class
        ];
    }
}
