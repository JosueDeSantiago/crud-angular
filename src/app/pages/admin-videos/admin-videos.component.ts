import { Component, OnInit } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoServiceService } from 'src/app/services/video-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

const USE_API_BACKEND = environment.USE_API_BACKEND;

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.css'],
})
export class AdminVideosComponent implements OnInit {
  closeResult = '';

  isEditing = false;

  videos: VideoModel[] = [
    {
      id: 1,
      nombre: 'Video 1',
      descripcion: 'Descripción video 1',
      url_video:
        'https://www.youtube.com/watch?v=gAJY80FSFzM&pp=ygUFb3BldGg%3D',
      cant_likes: 99,
      cant_dislikes: 6,
      created_at: '',
      comentarios: [],
    },
    {
      id: 2,
      nombre: 'Video 2',
      descripcion: 'Descripción video 2',
      url_video:
        'https://www.youtube.com/watch?v=gAJY80FSFzM&pp=ygUFb3BldGg%3D',
      cant_likes: 4,
      cant_dislikes: 6,
      created_at: '',
      comentarios: [],
    },
  ];

  // videos: VideoModel[] = [];

  public formularioVideo!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private videoServiceService: VideoServiceService,
    private toastr: ToastrService
  ) {
    this.formularioVideo = this.formBuilder.group({
      id: [0, Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]],
      url_video: ['', [Validators.required]],
      cant_likes: [0, [Validators.required]],
      cant_dislikes: [0, [Validators.required]],
    });

    if (USE_API_BACKEND) {
      this.videos = [];
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      if (USE_API_BACKEND) {
        const videos = await this.videoServiceService.getVideos().toPromise();
        this.videos = videos ? videos : [];
      }
    } catch (error) {
      console.error('Error al obtener videos:', error);
    }
  }

  open(content: any, videoEdit: VideoModel | null = null) {
    if (videoEdit) {
      this.isEditing = true;
      this.formularioVideo.get('id')!.setValue(videoEdit.id);
      this.formularioVideo.get('nombre')!.setValue(videoEdit.nombre);
      this.formularioVideo.get('descripcion')!.setValue(videoEdit.descripcion);
      this.formularioVideo.get('url_video')!.setValue(videoEdit.url_video);

      this.formularioVideo.get('cant_likes')!.setValue(videoEdit.cant_likes);
      this.formularioVideo
        .get('cant_dislikes')!
        .setValue(videoEdit.cant_dislikes);
    } else {
      this.isEditing = false;

      let idNuevoVideo = 0;

      // Encontrar el id más grande
      const maxId = this.videos.reduce(
        (max, video) => (video.id > max ? video.id : max),
        0
      );

      idNuevoVideo = maxId ? maxId + 1 : 1;

      this.formularioVideo.get('id')!.setValue(idNuevoVideo);
      this.formularioVideo.get('nombre')!.setValue('');
      this.formularioVideo.get('descripcion')!.setValue('');
      this.formularioVideo.get('url_video')!.setValue('');

      this.formularioVideo.get('cant_likes')!.setValue(0);
      this.formularioVideo.get('cant_dislikes')!.setValue(0);
    }

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.submitForm();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async submitForm(): Promise<void> {
    console.log('this.formularioVideo: ', this.formularioVideo);
    if (this.formularioVideo.valid) {
      // Lógica de envío del formulario
      console.log(
        'Formulario válido. Enviar datos:',
        this.formularioVideo.value
      );

      if (USE_API_BACKEND) {
        try {
          if (this.isEditing) {
            await this.videoServiceService
              .updateVideo(this.formularioVideo.value)
              .toPromise();
            this.toastr.success('Felicidades', 'Se han guardado los cambios');
          } else {
            await this.videoServiceService
              .createVideo(this.formularioVideo.value)
              .toPromise();
            this.toastr.success('Felicidades', 'Se ha guardado el nuevo video');
          }
          const videos = await this.videoServiceService.getVideos().toPromise();
          this.videos = videos ? videos : [];
        } catch (error) {
          console.error('Error al obtener videos:', error);
          this.toastr.error('Error', 'Ha ocurrido un error');
        }
      } else {
        if (this.isEditing) {
          let objIndex = this.videos.findIndex(
            (videoEdit) => videoEdit.id == this.formularioVideo.value.id
          );
          this.videos[objIndex].nombre = this.formularioVideo.value.nombre;
          this.videos[objIndex].descripcion =
            this.formularioVideo.value.descripcion;
          this.videos[objIndex].url_video =
            this.formularioVideo.value.url_video;
        } else {
          this.videos.push(this.formularioVideo.value);
        }
      }

      this.modalService.dismissAll('');
    } else {
      // Mostrar mensajes de error si el formulario no es válido
      console.log('Formulario inválido. Revise los campos.');
      this.toastr.warning(
        'Formulario inválido',
        'Por favor, completa todos los campos'
      );
    }
  }

  get nombreControl() {
    return this.formularioVideo.get('nombre');
  }

  get descripcionControl() {
    return this.formularioVideo.get('descripcion');
  }

  get urlVideoControl() {
    return this.formularioVideo.get('url_video');
  }

  async onDelete(video: VideoModel): Promise<void> {}
}
