<?php

namespace FrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use AdminBundle\Entity\Playlist;
use FrontBundle\Entity\Music;
use AdminBundle\Form\PlaylistType;

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

        $publishedPlaylist = $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('FrontBundle:Music')
            ->dasboardPlaylist($user, 1)
        ;

        $copyPlaylist = $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('FrontBundle:Music')
            ->dasboardPlaylist($user, 0)
        ;

/*        $publishedPlaylist = $em
            ->getRepository('AdminBundle:Playlist')
            ->findBy(
                array(  "author" => $user,
                        "statut" => true
                )
            )
        ;*/

/*        $copyPlaylist = $em
            ->getRepository('AdminBundle:Playlist')
            ->findBy(
                array(  "author" => $user,
                        "statut" => false
                )
            )
        ;*/

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
    public function popinPlaylistAction(Request $request)
    {
        $playlist = new Playlist();
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $form = $this->get('form.factory')->create(PlaylistType::class, $playlist);

        if ($request->isMethod('POST') && $form->handleRequest($request)->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $playlist->setAuthor($user);

            $em->persist($playlist);
            $em->flush();

            return $this->redirectToRoute('playlist_listing', array('idPlaylist' => $playlist->getId()));
        }

        return $this->render('FrontBundle:Playlist:PlaylistPopin.html.twig', array(
            'form' => $form->createView()
        ));
    }

    /**
     * @Route("/update-playlist", name="playlist_update")
     * @Method({"GET", "POST"})
     */
    public function addMusicPlaylistAction(Request $request)
    {
        // On récupère la data
        $link = $request->request->get('link');
        $title = $request->request->get('titleSong');
        $nbPlaylist = $request->request->get('nbPlaylist');
        
        $em = $this
            ->getDoctrine()
            ->getManager()
        ;

        // On vérifie que c'est une requête
        if ($request->isXMLHttpRequest()) {

            $Playlist = $em
                        ->getRepository('AdminBundle:Playlist')
                        ->find($nbPlaylist)
            ;
            echo $title;
            $music = new Music();
            $music->setTitle($title);
            $music->setLink($link);
            
            $music->addPlaylist($Playlist);
            $em->persist($music);

            $em->flush();

            return new JsonResponse(array("code" => 100, "success" => true, "data" => $title));
            // On converti le tableau
        }

        return new Response('This is not ajax!', 400);
    }
}
