<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @implements PasswordUpgraderInterface<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }
    public function getMonthVerifiedPlayers(): array
    {
        $startOfMonth = new \DateTime('first day of this month 00:00:00');
        $endOfMonth = new \DateTime('last day of this month 23:59:59');

        return $this->createQueryBuilder('u')
            ->andWhere('u.type = :userType')
            ->andWhere('u.isVerified = :isVerified')
            ->andWhere('u.createdAt >= :startOfMonth AND u.createdAt <= :endOfMonth')
            ->setParameter('userType', 'player')
            ->setParameter('isVerified', true)
            ->setParameter('startOfMonth', $startOfMonth)
            ->setParameter('endOfMonth', $endOfMonth)
            ->getQuery()
            ->getResult();
    }
    public function getLastMonthVerifiedPlayers(): array
    {
        $startOfLastMonth = new \DateTime('first day of last month 00:00:00');
        $endOfLastMonth = new \DateTime('last day of last month 23:59:59');

        return $this->createQueryBuilder('u')
            ->andWhere('u.type = :userType')
            ->andWhere('u.isVerified = :isVerified')
            ->andWhere('u.createdAt >= :startOfLastMonth AND u.createdAt <= :endOfLastMonth')
            ->setParameter('userType', 'player')
            ->setParameter('isVerified', true)
            ->setParameter('startOfLastMonth', $startOfLastMonth)
            ->setParameter('endOfLastMonth', $endOfLastMonth)
            ->getQuery()
            ->getResult();
    }
    public function getMonthVerifiedUsersCount(): int
    {
        $startOfMonth = new \DateTime('first day of this month 00:00:00');
        $endOfMonth = new \DateTime('last day of this month 23:59:59');
        // Assuming $startOfMonth and $endOfMonth are correctly defined as the first and last moments of the current month
        return (int) $this->createQueryBuilder('u')
            ->select('COUNT(u.id)')
            ->where('u.type = :type')
            ->andWhere('u.isVerified = :isVerified')
            ->andWhere('u.createdAt >= :startOfMonth AND u.createdAt <= :endOfMonth')
            ->setParameter('type', 'user') // Adjust if necessary
            ->setParameter('isVerified', true)
            ->setParameter('startOfMonth', $startOfMonth)
            ->setParameter('endOfMonth', $endOfMonth)
            ->getQuery()
            ->getSingleScalarResult();
    }

    //    /**
    //     * @return User[] Returns an array of User objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?User
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

    public function findAllPlayersInApprovedTeam(): array
    {
        return $this->createQueryBuilder('u')
            ->join('u.team', 't')
            ->andWhere('u.type = :userType')
            ->andWhere('t.isApproved = :isApproved')
            ->setParameter('userType', 'player')
            ->setParameter('isApproved', true)
            ->getQuery()
            ->getResult();
    }
}
