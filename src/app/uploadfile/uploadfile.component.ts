import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit{
public mssaage!:string;
public progress!:number;

@Output() public onUploadFinished =new EventEmitter();
constructor(private http:HttpClient){

}
  ngOnInit(): void {
  }
  //@ts-ignore
  public uploadFile = (files) => {
    if (files.length === 0) return;
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
  
    this.http
    .post("http://localhost:7011/api/upload", formData, { reportProgress: true, observe: 'events' })
    .subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.progress = Math.round(100 * (event.loaded / event.total));
          }
        } else if (event.type === HttpEventType.Response) {
          this.mssaage = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      (error) => {
        console.error('Error occurred:', error);
        this.mssaage = 'Upload failed. Please try again.';
      }
    );
    }  
  





}
