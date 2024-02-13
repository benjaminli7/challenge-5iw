<?php

namespace App\Controller;

use App\Entity\Team;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class ApproveTeamController
{
    public function __construct()
    {
    }

    public function __invoke(Team $data, Request $request, EntityManagerInterface $entityManager)
    {
        $data->setIsApproved(true);
        return $data;
    }
}
