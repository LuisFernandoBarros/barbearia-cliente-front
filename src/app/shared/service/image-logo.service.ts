import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ImageLogoService {

    constructor() { }

    urlLogo(id: string): string {
        return `${environment.API}/barbearia/${id}/logo`;
    }
}