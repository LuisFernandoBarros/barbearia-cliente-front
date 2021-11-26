import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ExtractMessageService {

    constructor() { }

    extractMessageFromError(err: any, msgDefault: string): string {
        if (err.error != null && err.error != undefined) {
            if (err.error.mensagem != null && err.error.mensagem != undefined) {
                return err.error.mensagem
            }
        }
        return msgDefault;
    }
}