<?php
// api/src/Security/Voter/BookVoter.php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    private $security = null;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject): bool
    {
        $supportsAttribute = in_array($attribute, ['PLAYER_READ']);
        $supportsSubject = $subject instanceof User;

        return $supportsAttribute && $supportsSubject;
    }

    /**
     * @param string $attribute
     * @param User $subject
     * @param TokenInterface $token
     * @return bool
     */
    protected function voteOnAttribute($attribute, $subject, TokenInterface $token): bool
    {
        switch ($attribute) {
            case 'PLAYER_READ':
                // if ($this->security->isGranted('ROLE_MANAGER')) {
                //     return true;
                // }
                // if ($subject->getType() === 'manager' || $this->security->isGranted('ROLE_ADMIN')) {
                //     return true;
                // }

                // if($subject->getType() === 'player' && $this->security->getUser() === $subject){
                //     return true;
                // }


                break;

        }

        return false;
    }
}
