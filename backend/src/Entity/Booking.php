<?php

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\BookingRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\AddBookingController;
use App\Controller\CancelBookingController;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\TimestampableTrait;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;


#[ORM\Entity(repositoryClass: BookingRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['read-booking']], security: 'is_granted("ROLE_ADMIN")'),
        new Post(uriTemplate: "/bookings/new", controller: AddBookingController::class, denormalizationContext: ['groups' => ['create-booking']], securityPostDenormalize: 'is_granted("ROLE_ADMIN") or user.getType() == "client"', securityPostDenormalizeMessage: 'You can only create bookings for yourself.'),
        new Patch(denormalizationContext: ['groups' => ['update-booking']], security: 'is_granted("ROLE_ADMIN")'),
        new Delete(controller: CancelBookingController::class, denormalizationContext: ['groups' => ['cancel-booking']], uriTemplate: "/bookings/{id}/cancel", security: 'is_granted("ROLE_ADMIN") or object.getClient() == user')
        ]
)]
#[ApiFilter(DateFilter::class, properties: ['createdAt'])]

class Booking
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-client', 'cancel-booking', 'read-booking'])]
    private ?int $id = null;

    #[Groups(['read-client', 'cancel-booking', 'read-booking'])]
    #[ORM\Column(length: 50)]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    private ?User $client = null;

    #[Groups(['read-client', 'read-booking'])]
    #[ORM\OneToOne(inversedBy: 'booking')]
    private ?Schedule $schedule = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Review $review = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getClient(): ?User
    {
        return $this->client;
    }

    public function setClient(?User $client): static
    {
        $this->client = $client;

        return $this;
    }

    public function getSchedule(): ?Schedule
    {
        return $this->schedule;
    }

    public function setSchedule(?Schedule $schedule): static
    {
        $this->schedule = $schedule;

        return $this;
    }

    public function getReview(): ?Review
    {
        return $this->review;
    }

    public function setReview(?Review $review): static
    {
        $this->review = $review;

        return $this;
    }
}
