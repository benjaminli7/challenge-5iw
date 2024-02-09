<?php
// api/src/Security/Voter/BookVoter.php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class TeamVoter extends Voter
{
    private $security = null;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject): bool
    {
        $supportsAttribute = in_array($attribute, ['TEAM_CREATE']);
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
        $user = $this->security->getUser();
        var_dump($user);
        switch ($attribute) {
            case 'TEAM_CREATE':
                if ($subject->getType() === 'manager' || $this->security->isGranted('ROLE_ADMIN')) {
                    return true;
                }
                break;
        }

        return false;
    }
}
