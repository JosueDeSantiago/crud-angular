import { Component } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.css'],
})
export class AdminVideosComponent {
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

  public formularioVideo!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.formularioVideo = this.formBuilder.group({
      id: [0, Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]],
      url_video: ['', [Validators.required]],
    });
  }

  open(content: any, videoEdit: VideoModel | null = null) {
    if (videoEdit) {
      this.isEditing = true;
      this.formularioVideo.get('id')!.setValue(videoEdit.id);
      this.formularioVideo.get('nombre')!.setValue(videoEdit.nombre);
      this.formularioVideo.get('descripcion')!.setValue(videoEdit.descripcion);
      this.formularioVideo.get('url_video')!.setValue(videoEdit.url_video);
    } else {
      this.isEditing = false;
      this.formularioVideo.get('id')!.setValue(this.videos.length + 1);
      this.formularioVideo.get('nombre')!.setValue('');
      this.formularioVideo.get('descripcion')!.setValue('');
      this.formularioVideo.get('url_video')!.setValue('');
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

  submitForm() {
    console.log('this.formularioVideo: ', this.formularioVideo);
    if (this.formularioVideo.valid) {
      // Lógica de envío del formulario
      console.log(
        'Formulario válido. Enviar datos:',
        this.formularioVideo.value
      );

      if (this.isEditing) {
        let objIndex = this.videos.findIndex(
          (videoEdit) => videoEdit.id == this.formularioVideo.value.id
        );
        this.videos[objIndex].nombre = this.formularioVideo.value.nombre;
        this.videos[objIndex].descripcion =
          this.formularioVideo.value.descripcion;
        this.videos[objIndex].url_video = this.formularioVideo.value.url_video;
      } else {
        this.videos.push(this.formularioVideo.value);
      }

      this.modalService.dismissAll('');
    } else {
      // Mostrar mensajes de error si el formulario no es válido
      console.log('Formulario inválido. Revise los campos.');
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
}
