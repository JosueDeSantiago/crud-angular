import { SafeResourceUrl } from '@angular/platform-browser';
import { ComentarioModel } from './comentario.model';

export interface VideoModel {
  id: number;
  nombre: string;
  descripcion: string;
  url_video: string;
  id_video_youtube?: string;
  iframeUrl?: SafeResourceUrl;
  cant_likes: number;
  cant_dislikes: number;

  created_at: string;

  // Relación
  comentarios: ComentarioModel[];
}
