<?php

namespace App\Entity;

use App\Repository\ReviewRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
#[ApiResource]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $rating = null;

    #[ORM\Column(length: 255)]
    private ?string $comment = null;

    #[ORM\Column(length: 20)]
    private ?string $authorType = null;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $client = null;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $booster = null;

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

    public function getAuthorType(): ?string
    {
        return $this->authorType;
    }

    public function setAuthorType(string $authorType): static
    {
        $this->authorType = $authorType;

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

    public function getBooster(): ?User
    {
        return $this->booster;
    }

    public function setBooster(?User $booster): static
    {
        $this->booster = $booster;

        return $this;
    }
}