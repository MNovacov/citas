import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  constructor(private sqliteService: SqliteService) {}

  async inicializar() {
    await this.sqliteService.openDB();
  }

  async agregarCita(cita: { frase: string; autor: string }) {
    await this.sqliteService.addCita(cita.frase, cita.autor);
  }

  async eliminarCita(cita: { frase: string; autor: string }) {
    await this.sqliteService.deleteCita(cita.frase, cita.autor);
  }

  async obtenerTodasLasCitas(): Promise<{ frase: string; autor: string }[]> {
    return await this.sqliteService.getCitas();
  }

  async obtenerCitaAleatoria(): Promise<{ frase: string; autor: string }> {
    const citas = await this.obtenerTodasLasCitas();
    if (citas.length === 0) {
      return { frase: 'No hay citas disponibles.', autor: '' };
    }
    const index = Math.floor(Math.random() * citas.length);
    return citas[index];
  }
}
