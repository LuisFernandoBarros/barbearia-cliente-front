import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { Barbearia } from '../../shared/model/barbearia';

@Injectable({ providedIn: 'root' })
export class BarbeariaService {

    private baseUrl = environment.API;

    constructor(private httpClient: HttpClient) {

    }

    get(barbeariaId: string): Observable<Barbearia> {
        return this.httpClient.get<Barbearia>(`${this.baseUrl}/agendamento-cliente/barbearia/${barbeariaId}/`);
    }

   
}