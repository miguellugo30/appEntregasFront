import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ResponsePhoto } from 'src/app/core/models/colaboradores';
import { ColaboradoresService } from 'src/app/core/services/colaboradores.service';


@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.scss']
})
export class WebCamComponent implements OnInit {

  public webcamImage!: WebcamImage;
  private trigger: Subject<any> = new Subject();
  private nextWebcam: Subject<any> = new Subject();
  public sysImage: string = '';

  @Output() captureImageEvent = new EventEmitter<string>();

  @Input() id: string;

  public constructor(
    public ColaboradoresService: ColaboradoresService
  ){}


  public ngOnInit(): void {
    console.log(this.id);
    this.getPhoto()
  }

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    this.captureImageEvent.emit(this.sysImage);
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  /**
   * Funcion para obtener la foto de perfil
   */
  public getPhoto(){

    this.ColaboradoresService.getPhoto(this.id).subscribe(
      (data: ResponsePhoto) => {
        if (data.success)
        {
          this.sysImage = data.data;
        } else {
          console.log(data.message);
        }
      },
      (error) => {
        console.log(error);
      }
    )

  }

}
