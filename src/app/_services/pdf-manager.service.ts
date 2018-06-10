import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PdfCreateResponse } from '../models/pdfCreate-response';

@Injectable()
export class PdfManagerService {

  pdfStructure: any;
  private readonly CREATE_SOP_URL = '/sopgen/createSop';

  constructor(private http: HttpClient) { }

  createPdf(): Observable<PdfCreateResponse> {
    return this.http.post<PdfCreateResponse>(this.CREATE_SOP_URL, this.pdfStructure).map(data => {
      return data;
    });
  }
}
