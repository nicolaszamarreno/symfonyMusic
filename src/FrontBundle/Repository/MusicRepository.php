<?php

namespace FrontBundle\Repository;

/**
 * MusicRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class MusicRepository extends \Doctrine\ORM\EntityRepository
{
    public function musicPlaylist($idPlaylist) {
        $qb = $this
            ->createQueryBuilder('m')
            ->innerJoin('m.playlist', 'p')
            ->where('p.id = :idPlaylist')
            ->setParameter('idPlaylist', $idPlaylist)
        ;

        return $qb
            ->getQuery()
            ->getResult()
        ;
    }

    public function dasboardPlaylist($idUser, $status) {
        $em = $this->getEntityManager();
        $query = $em->createQuery("
                                    SELECT COUNT(m) AS nb, p.title, u.username, p.id
                                    FROM FrontBundle:Music m
                                    INNER JOIN m.playlist p
                                    INNER JOIN p.author u
                                    WHERE u.username = '{$idUser}'
                                    AND p.statut = '{$status}'
                                    GROUP BY p.id
                                 ");

        return $query->getResult();
    }
}
