import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {

  public cameraStream: any = null;
  btnStart: HTMLElement;
  btnStop: HTMLElement;
  btnCapture: HTMLElement;
  stream: HTMLElement;
  capture: HTMLElement;
  snapshot: HTMLElement;
  photo: string;

  public student = {
    name: '',
    details: {
      department: '',
      classname: '',
      contact: '',
      parentcontact: ''
    },
    photo:''
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.btnStart = document.getElementById("btn-start");
    this.btnStop = document.getElementById("btn-stop");
    this.btnCapture = document.getElementById("btn-capture");

    // The stream & capture
    this.stream = document.getElementById("stream");
    this.capture = document.getElementById("capture");
    this.snapshot = document.getElementById("snapshot");

    var mediaSupport = 'mediaDevices' in navigator;

    console.log(mediaSupport);

    if (mediaSupport && null == this.cameraStream) {

      navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
        .then((mediaStream) => {

          this.cameraStream = mediaStream;

          this.stream['srcObject'] = mediaStream;

          this.stream['play']();
        })
        .catch((err) => {

          console.log("Unable to access camera: " + err);
        });

    }
  }

  public captureSnapshot() {

    console.log('capturing snapshot');

    if (null != this.cameraStream) {

      var ctx = this.capture['getContext']('2d');
      console.log('ctx', ctx);
      var img = new Image();

      ctx.drawImage(this.stream, 0, 0, this.capture['width'], this.capture['height']);

      img.src = this.capture['toDataURL']("image/png");
      img.width = 240;

      console.log(img.src);
      this.student.photo = img.src;
      let index = this.student.photo.indexOf(',');
      if (index > 0) {
        this.student.photo = this.student.photo.substring(index + 1);
      }

      this.snapshot.innerHTML = '';

      this.snapshot.appendChild(img);
    }
  }

  public onAddStudent() {
    
    this.http.post(ServiceContext.BASE_URL + '/adduser', this.student).subscribe((response) => {
      console.log('response', response);
    }, (error) => {
      console.log('error', error);
    });
  }
}
