<?php

namespace App\Normalizer;

use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Exception\CircularReferenceException;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Symfony\Component\Serializer\Exception\LogicException;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use App\Entity\Game;

use Vich\UploaderBundle\Storage\StorageInterface;


class GameNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface

{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED_NORMALIZER = 'AppPostNormalizerAlreadyCalled';

    public function __construct(private StorageInterface $storage)
    {
    }

    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {
        return !isset($context[self::ALREADY_CALLED_NORMALIZER]) && $data instanceof Game;
    }

    public function normalize($object, string $format = null, array $context = []): array
    {
        $object->setFileUrl($this->storage->resolveUri($object, 'file'));
        $context[self::ALREADY_CALLED_NORMALIZER] = true;

        // also set the ranks file url
        foreach ($object->getRanks() as $rank) {
            $rank->setFileUrl($this->storage->resolveUri($rank, 'file'));
        }
        // dd($this->normalizer->normalize($object, $format, $context));

        return $this->normalizer->normalize($object, $format, $context);
    }
}
