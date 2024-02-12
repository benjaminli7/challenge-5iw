<?php
# src/DataFixtures/UserFixtures.php
namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public const ADMIN_USER_REFERENCE = 'admin-user';
    public function __construct(
        protected UserPasswordHasherInterface $hasher,
    ) {
    }

    public function load(ObjectManager $manager)
    {
        // Create an admin user
        $admin = new User();
        $admin->setEmail('admin@admin.fr');
        $admin->setUsername('admin_user');
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setPassword($this->hasher->hashPassword($admin, "admin"));
        $admin->setFirstName('Admin');
        $admin->setLastName('User');
        $admin->setIsVerified(true);
        $admin->setPhone('987654321');
        $admin->setType('manager');
        $admin->setCoins(0);
        $admin->setDiscord('admin_user#5678');
        $admin->setPostal('75000');
        $admin->setaddress('Paris');



        $manager->persist($admin);

        // Create a manager user
        $managerUser = new User();
        $managerUser->setEmail('manager@example.com');
        $managerUser->setUsername('manager_user');
        $managerUser->setRoles(['ROLE_USER']);
        $managerUser->setPassword($this->hasher->hashPassword($managerUser, "manager"));
        $managerUser->setFirstName('Manager');
        $managerUser->setLastName('User');
        $managerUser->setIsVerified(true);
        $managerUser->setPhone('555555555');
        $managerUser->setType('manager');
        $managerUser->setCoins(50);
        $managerUser->setDiscord('manager_user#1234');
        $managerUser->setPostal('75000');
        $managerUser->setaddress('Paris');


        $manager->persist($managerUser);

        // Create an admin user
        $benjamin = new User();
        $benjamin->setEmail('benjamin@enoki-studio.com');
        $benjamin->setUsername('benjaminli');
        $benjamin->setRoles(['ROLE_ADMIN']);
        $benjamin->setPassword($this->hasher->hashPassword($benjamin, "apotoxine"));
        $benjamin->setFirstName('Benjamin');
        $benjamin->setLastName('LI');
        $benjamin->setIsVerified(true);
        $benjamin->setPhone('987654321');
        $benjamin->setType('manager');
        $benjamin->setCoins(0);
        $benjamin->setDiscord('benjaminli#1234');
        $benjamin->setPostal('75000');
        $benjamin->setaddress('Paris');



        $manager->persist($benjamin);

        $manager->flush();

        $this->addReference(self::ADMIN_USER_REFERENCE, $benjamin);
    }
}
