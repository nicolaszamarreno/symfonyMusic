<?php

namespace FrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class SearchController extends Controller
{
    /**
     * @Route("/search/{idSearch}", name="search_home")
     */
    public function searchAction($idSearch)
    {
        $searchPlaylist = $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('AdminBundle:Playlist')
            ->searchPlaylist($idSearch)
        ;

        return $this->render("FrontBundle:Search:Search.html.twig", array(
            "wordSearch" => $idSearch,
            "searchPlaylists" => $searchPlaylist
        ));
    }
}
