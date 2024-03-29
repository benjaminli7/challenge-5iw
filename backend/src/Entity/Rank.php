<?php

namespace App\Entity;

use App\Repository\RankRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Delete;
use App\Controller\PostImageRankController;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\Entity\Traits\TimestampableTrait;
use Symfony\Component\Validator\Constraints as Assert;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: RankRepository::class)]
#[ApiResource(
    operations: [
        new Post(normalizationContext: ['groups' => ['returned-creation']], denormalizationContext: ['groups' => ['create-rank']], security: 'is_granted("ROLE_ADMIN")', securityMessage: 'Only admins can create Ranks.'),
        new Patch(denormalizationContext: ['groups' => ['update-rank']], security: 'is_granted("ROLE_ADMIN")', securityMessage: 'Only admins can update Ranks.'),
        new Delete(security: 'is_granted("ROLE_ADMIN")', securityMessage: 'Only admins can delete Ranks.'),
        new Post(
            uriTemplate: '/ranks/{id}/image',
            controller: PostImageRankController::class,
            denormalizationContext: ['groups' => ['test-img-rank']],
            normalizationContext: ['groups' => ['read-rank']],
            security: 'is_granted("ROLE_ADMIN")',
            securityMessage: 'Only admins can create ranks.',
            deserialize: false
        ),
    ],
    normalizationContext: ['groups' => ['read-rank']],
)]
class Rank
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-game', 'returned-creation', 'read-rank'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'ranks')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['create-rank'])]
    private ?Game $game = null;

    #[ORM\Column(length: 255)]
    #[Groups(['update-rank', 'read-game', 'create-game', 'read-rank', 'create-rank', 'returned-creation'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $filePath = null;

    #[Groups(['read-game'])]
    private ?string $fileUrl = null;

    #[Vich\UploadableField(mapping: 'rank_image', fileNameProperty: 'filePath')]
    #[Assert\File(
        maxSize: '1024k',
        extensions: ['png', 'jpg', 'jpeg', 'gif'],
        extensionsMessage: 'Please upload a valid image file.',
    )]
    #[Groups(['test-img-rank'])]
    private ?File $file = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): static
    {
        $this->game = $game;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): static
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file = null): static
    {
        $this->file = $file;
        return $this;
    }

    public function getFileUrl(): ?string
    {
        $this->fileUrl = $this->fileUrl ?? $this->getFilePath();
        return $this->fileUrl;
    }

    public function setFileUrl(?string $fileUrl): static
    {
        $this->fileUrl = $fileUrl;

        return $this;
    }
}
