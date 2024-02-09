<?php

namespace App\Tests\Entity;

use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function testUserCanBeCreated(): void
    {
        $user = new User();
        $this->assertInstanceOf(User::class, $user);
    }

    public function testUserEmail(): void
    {
        $user = new User();
        $email = 'test@example.com';
        $user->setEmail($email);

        $this->assertEquals($email, $user->getEmail());
    }

    public function testUserRoles(): void
    {
        $user = new User();
        $roles = ['ROLE_USER', 'ROLE_ADMIN'];
        $user->setRoles($roles);

        $this->assertEquals($roles, $user->getRoles());
    }
    // test password 
    public function testUserPassword(): void
    {
        $user = new User();
        $password = 'password';
        $user->setPassword($password);
        // check if password is correct
        $this->assertEquals($password, $user->getPassword());
    }
    // test username
    public function testUserNames(): void
    {
        $user = new User();
        $username = 'username';
        $user->setFirstName($username);
        $user->setLastName($username);

        $this->assertEquals($username, $user->getFirstName());
        $this->assertEquals($username, $user->getLastName());
    }
}
