import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webcam-test',
  templateUrl: './webcam-test.component.html',
  styleUrls: ['./webcam-test.component.scss'],
})
export class WebcamTestComponent implements OnInit {

  public cameraStream: any = null;
  btnStart: HTMLElement;
  btnStop: HTMLElement;
  btnCapture: HTMLElement;
  stream: HTMLElement;
  capture: HTMLElement;
  snapshot: HTMLElement;

  constructor() { }

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

      navigator.mediaDevices.getUserMedia({ video: {width:1280,height:720} })
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

    if( null != this.cameraStream ) {
  
      var ctx = this.capture['getContext']( '2d' );
      console.log('ctx',ctx);
      var img = new Image();
  
      ctx.drawImage( this.stream, 0, 0, this.capture['width'], this.capture['height'] );
  
      img.src		= this.capture['toDataURL']( "image/png" );
      img.width	= 240;

      console.log(img.src);
  
      this.snapshot.innerHTML = '';
  
      this.snapshot.appendChild( img );
    }
  }
}
