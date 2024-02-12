<?php

namespace App\Normalizer;

use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Exception\CircularReferenceException;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Symfony\Component\Serializer\Exception\LogicException;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use App\Entity\Team;

use Vich\UploaderBundle\Storage\StorageInterface;


class TeamNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface

{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED_NORMALIZER = 'AppPostNormalizerAlreadyCalled';

    public function __construct(private StorageInterface $storage)
    {
    }

    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {
        return !isset($context[self::ALREADY_CALLED_NORMALIZER]) && $data instanceof Team;
    }

    public function normalize($object, string $format = null, array $context = []): array
    {
        $object->setFileUrl($this->storage->resolveUri($object, 'file'));
        foreach ($object->getBoosters() as $booster) {
            $booster->setFileUrl($this->storage->resolveUri($booster, 'file'));
        }
        $context[self::ALREADY_CALLED_NORMALIZER] = true;

        return $this->normalizer->normalize($object, $format, $context);
    }
}
