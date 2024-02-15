<?php

namespace App\Entity;

use App\Repository\ReviewRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\TimestampableTrait;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\AddReviewScheduleController;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: ReviewRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            controller: AddReviewScheduleController::class,
            denormalizationContext: ['groups' => ['write-review']],
            // normalizationContext: ['groups' => ['read-review']]
        ),

        // new Post(
        //     uriTemplate: '/schedules/{id}/review',
        //     normalizationContext: ['groups' => ['read-schedule-created']],
        //     denormalizationContext: ['groups' => ['write-schedule']],
        //     controller: AddReviewScheduleController::class,
        //     //check if the user is the owner of the schedule"
        //     security: "is_granted('ROLE_USER') and object.getBooster() == user"
        // ),

    ],
)]

class Review
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Assert\Range(min: 1, max: 5)]
    #[Groups(['write-review', 'read-player'])]
    private ?int $rating = null;

    #[ORM\Column(length: 255)]
    #[Groups(['write-review', 'read-player'])]
    private ?string $comment = null;


    #[ORM\OneToOne(targetEntity: Schedule::class, inversedBy: 'review')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['write-review'])]
    private ?Schedule $schedule = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(int $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }
    public function getSchedule(): ?Schedule
    {
        return $this->schedule;
    }

    public function setSchedule(?Schedule $schedule): self
    {
        $this->schedule = $schedule;
        return $this;
    }
}
