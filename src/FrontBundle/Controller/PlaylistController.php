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

        $copyPlaylist = $em
            ->getRepository('AdminBundle:Playlist')
            ->findBy(
                array(  "author" => $user,
                        "statut" => false
                )
            )
        ;

        return $this->render('FrontBundle:Playlist:Playlist.html.twig', array(
            "publishs"   => $publishedPlaylist,
            "copys"      => $copyPlaylist
        ));
    }

    /**
     * @Route("/playlist/{idPlaylist}", name="playlist_listing")
     */
    public function listAction($idPlaylist)
    {

        $listMusic = $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('FrontBundle:Music')
            ->musicPlaylist($idPlaylist)
        ;

        $describePlaylist = $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('AdminBundle:Playlist')
            ->authorPlaylist($idPlaylist)
        ;

        return $this->render('FrontBundle:Playlist:PlaylistList.html.twig', array(
            "lists" => $listMusic,
            "describe"=> $describePlaylist
        ));
    }
}
