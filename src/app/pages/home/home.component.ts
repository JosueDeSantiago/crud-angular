import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoModel } from 'src/app/models/video.model';
import { VideoServiceService } from 'src/app/services/video-service.service';

let apiLoaded = false;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /*
  videos: VideoModel[] = [
    {
      id: 1,
      nombre: 'Video 1',
      descripcion: 'Descripción video 1',
      url_video:
        'https://www.youtube.com/watch?v=gAJY80FSFzM&pp=ygUFb3BldGg%3D',
      cant_likes: 0,
      cant_dislikes: 0,
      created_at: '',
      comentarios: [],
    },
    {
      id: 2,
      nombre: 'Video 2',
      descripcion: 'Descripción video 2',
      url_video: 'https://www.youtube.com/watch?v=mtBlV9Lb_aM',
      cant_likes: 0,
      cant_dislikes: 0,
      created_at: '',
      comentarios: [],
    },
    {
      id: 3,
      nombre: 'Video 3',
      descripcion: 'Descripción video 3',
      url_video:
        'https://www.youtube.com/watch?v=X6rMnH_5x6I&source_ve_path=Mjg2NTgsMjM4NTE&feature=emb_title',
      cant_likes: 0,
      cant_dislikes: 0,
      created_at: '',
      comentarios: [],
    },
    {
      id: 4,
      nombre: 'Video 4',
      descripcion: 'Descripción video 4',
      url_video:
        'https://www.youtube.com/watch?v=X6rMnH_5x6I&source_ve_path=Mjg2NTgsMjM4NTE&feature=emb_title',
      cant_likes: 0,
      cant_dislikes: 0,
      created_at: '',
      comentarios: [],
    },
    {
      id: 5,
      nombre: 'Video 5',
      descripcion: 'Descripción video 5',
      url_video: 'https://www.youtube.com/watch?v=iqrMFNMgVS0',
      cant_likes: 0,
      cant_dislikes: 0,
      created_at: '',
      comentarios: [],
    },
  ];

  */

  videos: VideoModel[] = [];

  // private apiLoaded = false;

  @Input() videoId: string = 'ENJumhoaW2s';

  constructor(
    private sanitizer: DomSanitizer,
    private videoServiceService: VideoServiceService
  ) {
    this.videos = [];
  }

  async ngOnInit(): Promise<void> {
    /*
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
    */

    try {
      const videos = await this.videoServiceService.getVideos().toPromise();
      this.videos = videos ? videos : [];

      this.videos.forEach((video) => {
        if (video.url_video) {
          /*
          video.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://www.youtube.com/embed/ENJumhoaW2s?showinfo=0&enablejsapi=1&origin=http://127.0.0.1:4201'
          );
          */

          // video.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url_video);

          video.id_video_youtube = this.extractVideoId(video.url_video);

          console.log('video.id_video_youtube: ', video.id_video_youtube);

          video.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://www.youtube.com/embed/' + video.id_video_youtube
          );

          console.log('video.iframeUrl: ', video.iframeUrl);
        }
      });
    } catch (error) {
      console.error('Error al obtener videos:', error);
    }
  }

  extractVideoId(url: string): string {
    // Extraer el ID del video de la URL
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    // videoIdMatch[1] contendrá el ID del video si la regex coincide
    return videoIdMatch ? videoIdMatch[1] : '';
  }
}
