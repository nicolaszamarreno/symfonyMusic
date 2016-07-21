<?php

namespace FrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Component\HttpFoundation\JsonResponse;

class SearchController extends Controller
{
    /**
     * @Route("/search/{idSearch}", name="search_home")
     */
    public function searchAction($idSearch)
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $em = $this
            ->getDoctrine()
            ->getManager()
        ;

        $searchPlaylist = $em
            ->getRepository('AdminBundle:Playlist')
            ->searchPlaylist($idSearch)
        ;


        $copyPlaylist = $em
            ->getRepository('AdminBundle:Playlist')
            ->findBy(
                array(  "author" => $user,
                    "statut" => false
                )
            )
        ;

        $allPlaylistUser = [];

        foreach($copyPlaylist as $playlist) {
            $copy = array(
                'id'    =>  $playlist->getId(),
                'title'  =>  $playlist->getTitle(),
            );
            array_push($allPlaylistUser, $copy);
        }

        return $this->render("FrontBundle:Search:Search.html.twig", array(
            "wordSearch" => $idSearch, // For API SoundCloud
            "searchPlaylists" => $searchPlaylist, // For search Playlist
            "userPlaylist" => $allPlaylistUser //JSON for Playlist
        ));
    }
}
