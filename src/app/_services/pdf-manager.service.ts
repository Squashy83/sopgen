import { Injectable } from '@angular/core';
import { GenericResponse } from './../models/generic-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PdfManagerService {

  pdfStructure: any;
  private readonly CREATE_SOP_URL = '/createSop';

  constructor(private http: HttpClient) { }

  createPdf(): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.CREATE_SOP_URL, this.pdfStructure).map(data => {
      return data;
    });
  }
}
