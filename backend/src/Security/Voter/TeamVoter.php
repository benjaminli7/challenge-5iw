<?php
// api/src/Security/Voter/BookVoter.php

namespace App\Security\Voter;

use App\Entity\Team;
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
        $supportsAttribute = in_array($attribute, ['TEAM_CREATE', 'TEAM_READ_ALL']);
        $supportsSubject = $subject instanceof Team;

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
        $user = $token->getUser();
        switch ($attribute) {
            case 'TEAM_CREATE':
                if ($user->getType() === 'manager' || $this->security->isGranted('ROLE_ADMIN')) {
                    return true;
                }
                break;
            case 'TEAM_READ_ALL':
                if ($user->getType() === 'client' || $this->security->isGranted('ROLE_ADMIN')) {
                    return true;
                }
                break;
        }

        return false;
    }
}
