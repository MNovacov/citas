import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private readonly clavePermitirBorrar = 'permitir_borrar';

  constructor() {}

  async guardarPermitirBorrar(valor: boolean) {
    await Preferences.set({
      key: this.clavePermitirBorrar,
      value: JSON.stringify(valor),
    });
  }

  async obtenerPermitirBorrar(): Promise<boolean> {
    const { value } = await Preferences.get({ key: this.clavePermitirBorrar });
    return value ? JSON.parse(value) : false;
  }
}
