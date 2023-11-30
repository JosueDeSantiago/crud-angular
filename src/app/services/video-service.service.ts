import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { VideoModel } from '../models/video.model';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  constructor(private http: HttpClient) {}

  getVideos(): Observable<VideoModel[]> {
    // Configura los parámetros de la solicitud
    const params = new HttpParams().set('accion', 'R');

    console.log('Entra a get videos');

    // Realiza la solicitud HTTP
    return this.http
      .get<VideoModel[]>(`${API_URL}/videos`, { params })
      .pipe(catchError(this.handleError));
  }

  createVideo(video: VideoModel): Observable<VideoModel[]> {
    // Configura los parámetros de la solicitud
    const params = new HttpParams()
      .set('accion', 'C')
      .set('id', video.id)
      .set('url_video', video.url_video)
      .set('nombre', video.nombre)
      .set('descripcion', video.descripcion)
      .set('cant_likes', video.cant_likes)
      .set('cant_dislikes', video.cant_dislikes);

    console.log('Entra a create videos');

    // Realiza la solicitud HTTP
    return this.http
      .get<VideoModel[]>(`${API_URL}/videos`, { params })
      .pipe(catchError(this.handleError));
  }

  updateVideo(video: VideoModel): Observable<VideoModel[]> {
    // Configura los parámetros de la solicitud
    const params = new HttpParams()
      .set('accion', 'U')
      .set('id', video.id)
      .set('url_video', video.url_video)
      .set('nombre', video.nombre)
      .set('descripcion', video.descripcion)
      .set('cant_likes', video.cant_likes)
      .set('cant_dislikes', video.cant_dislikes);

    console.log('Entra a update videos');

    // Realiza la solicitud HTTP
    return this.http
      .get<VideoModel[]>(`${API_URL}/videos`, { params })
      .pipe(catchError(this.handleError));
  }

  deleteVideo(video_id: number): Observable<VideoModel[]> {
    // Configura los parámetros de la solicitud
    const params = new HttpParams().set('accion', 'D').set('id', video_id);

    console.log('Entra a delete videos');

    // Realiza la solicitud HTTP
    return this.http
      .get<VideoModel[]>(`${API_URL}/videos`, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 500) {
      // Puedes realizar acciones específicas para manejar errores 500 aquí
      console.error('Error interno del servidor:', error.error);
    } else {
      console.error('Error desconocido:', error);
    }

    // Retorna un observable con un mensaje de error genérico
    return throwError(
      'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.'
    );
  }
}
