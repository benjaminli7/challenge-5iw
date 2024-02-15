<?php

namespace App\Controller;

use App\Entity\Review;
use App\Entity\Schedule;
use Symfony\Component\HttpFoundation\Request;
// use scheduleRepository;
use App\Repository\ScheduleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;




class AddReviewScheduleController
{

    public function __construct(
        protected ScheduleRepository $scheduleRepository,
    ) {
    }
    public function __invoke(Review $data, Request $request, EntityManagerInterface $entityManager): Response
    {
        // get the user from the request token
        $review = new Review();

        $review->setRating($data->getRating());
        $review->setComment($data->getComment());
        $review->setSchedule($data->getSchedule());

        $entityManager->persist($review);
        $entityManager->flush();
        // flush the entity
        return new Response('Review added', Response::HTTP_CREATED);
    }
}
