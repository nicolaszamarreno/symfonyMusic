<?php

namespace FrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class PlaylistController extends Controller
{
    /**
     * @Route("/playlist", name="playlist_home")
     */
    public function indexAction()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $em = $this
            ->getDoctrine()
            ->getManager()
        ;

        $publishedPlaylist = $em
            ->getRepository('AdminBundle:Playlist')
            ->findBy(
                array(  "author" => $user,
                    "statut" => true
                )
            )
        ;

        return $this->render('FrontBundle:Playlist:Playlist.html.twig', array(
            "publish" => $publishedPlaylist
        ));
    }

    /**
     * @Route("/list/{id}", name="playlist_listing")
     */
    public function listAction()
    {
        return $this->render('FrontBundle:Playlist:PlaylistList.html.twig');
    }
}
