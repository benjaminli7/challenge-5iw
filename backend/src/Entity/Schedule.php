<?php

namespace App\Entity;

use App\Repository\ScheduleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use App\Controller\GetPlayerScheduleController;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(denormalizationContext: ['groups' => ['write-schedule']]),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['read-schedule']],
)]
#[UniqueEntity(
    fields: ['startingDate', 'endingDate'],
    message: 'This schedule already exists.',
)]
class Schedule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-schedule', 'read-player-schedule'])]
    private ?int $id = null;

    #[Groups(['read-schedule', 'write-schedule', 'read-player-schedule'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, unique: true)]
    private ?\DateTimeInterface $startingDate = null;

    #[Groups(['read-schedule', 'write-schedule', 'read-player-schedule'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, unique: true)]
    private ?\DateTimeInterface $endingDate = null;

    #[ORM\OneToOne(mappedBy: 'schedule', cascade: ['persist', 'remove'])]
    private ?Booking $booking = null;

    #[Groups(['read-schedule', 'write-schedule', 'read-player-schedule'])]
    #[ORM\ManyToOne(inversedBy: 'schedules')]
    private ?User $booster = null;

    #[Groups(['read-schedule', 'write-schedule', 'read-player-schedule'])]
    #[ORM\Column(length: 50)]
    private ?string $status = null;

    public function __construct()
    {
        $this->status = "available";
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartingDate(): ?\DateTimeInterface
    {
        return $this->startingDate;
    }

    public function setStartingDate(\DateTimeInterface $startingDate): static
    {
        $this->startingDate = $startingDate;

        return $this;
    }

    public function getEndingDate(): ?\DateTimeInterface
    {
        return $this->endingDate;
    }

    public function setEndingDate(\DateTimeInterface $endingDate): static
    {
        $this->endingDate = $endingDate;

        return $this;
    }

    public function getBooking(): ?Booking
    {
        return $this->booking;
    }

    public function setBooking(?Booking $booking): static
    {
        // unset the owning side of the relation if necessary
        if ($booking === null && $this->booking !== null) {
            $this->booking->setSchedule(null);
        }

        // set the owning side of the relation if necessary
        if ($booking !== null && $booking->getSchedule() !== $this) {
            $booking->setSchedule($this);
        }

        $this->booking = $booking;

        return $this;
    }

    public function getBooster(): ?User
    {
        return $this->booster;
    }

    public function setBooster(?User $booster): static
    {
        $this->booster = $booster;

        return $this;
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
}
