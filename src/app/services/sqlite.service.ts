import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private citasKey = 'citasGuardadas';

  constructor() {}

  async openDB(): Promise<void> {
    const citasExistentes = await this.getCitas();
    if (citasExistentes.length === 0) {
      await this.insertarCitasIniciales();
    }
  }

  async getCitas(): Promise<{ frase: string; autor: string }[]> {
    const { value } = await Preferences.get({ key: this.citasKey });
    return value ? JSON.parse(value) : [];
  }

  async addCita(frase: string, autor: string): Promise<void> {
    const citas = await this.getCitas();
    citas.push({ frase, autor });
    await Preferences.set({ key: this.citasKey, value: JSON.stringify(citas) });
  }

  async deleteCita(frase: string, autor: string): Promise<void> {
    let citas = await this.getCitas();
    citas = citas.filter(c => !(c.frase === frase && c.autor === autor));
    await Preferences.set({ key: this.citasKey, value: JSON.stringify(citas) });
  }

  private async insertarCitasIniciales(): Promise<void> {
    const citas = [
      { frase: 'La vida es aquello que te pasa mientras estás ocupado haciendo otros planes.', autor: 'John Lennon' },
      { frase: 'El conocimiento es poder.', autor: 'Francis Bacon' },
      { frase: 'Lo importante no es lo que miras, sino lo que ves.', autor: 'Henry David Thoreau' },
      { frase: 'El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.', autor: 'Ralph Waldo Emerson' },
      { frase: 'Las personas no son recordadas por el número de veces que fracasan, sino por el número de veces que tienen éxito.', autor: 'Thomas Edison' },
      { frase: 'Ningún viento es bueno para el barco que no sabe adónde va.', autor: 'Séneca' }
    ];
    await Preferences.set({ key: this.citasKey, value: JSON.stringify(citas) });
  }
}
