<?php

namespace FrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Component\HttpFoundation\Request;
use AdminBundle\Entity\Playlist;
use AdminBundle\Form\PlaylistType;
use AdminBundle\Form\AdvertType;

class PlaylistController extends Controller
{
    /**
     * @Route("/playlist", name="playlist_home")
     */
    public function authorAction()
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

    /**
     * @Route("/creation-playlist", name="playlist_create")
     */
    public function createPlaylistAction(Request $request)
    {
        $playlist = new Playlist();
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $form   = $this->get('form.factory')->create(PlaylistType::class, $playlist);

        if ($request->isMethod('POST') && $form->handleRequest($request)->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $playlist->setAuthor($user);

            $em->persist($playlist);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Votre playlist est bien enregistré');

            return $this->redirectToRoute('playlist_listing', array('idPlaylist' => $playlist->getId()));
        }

        return $this->render('FrontBundle:Playlist:PlaylistCreate.html.twig', array(
            'form' => $form->createView()
        ));
    }

    /**
     * @Route("/update-playlist", name="playlist_update")
     */
    public function addMusicPlaylist()
    {
        $request = $this->container->get('request');
        $data1 = $request->query->get('data1');
        $data2 = $request->query->get('data2');

        $response = array("code" => 100, "success" => true);
        //you can return result as JSON
        return new Response(json_encode($response));
    }
}
