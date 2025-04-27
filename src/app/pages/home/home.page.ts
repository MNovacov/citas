import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CitasService } from '../../services/citas.service';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule], 
  providers: [CitasService, ConfiguracionService],
})
export class HomePage implements OnInit {
  citaActual!: { frase: string; autor: string };
  permitirBorrar = false;

  constructor(
    private citasService: CitasService,
    private configuracionService: ConfiguracionService
  ) {}

  async ngOnInit() {
    await this.citasService.inicializar();
    await this.cargarCita();
    this.permitirBorrar = await this.configuracionService.obtenerPermitirBorrar();
  }
  
  async cargarCita() {
    this.citaActual = await this.citasService.obtenerCitaAleatoria();
  }

  async borrarCita() {
    if (this.citaActual) {
      await this.citasService.eliminarCita(this.citaActual);
      await this.cargarCita();
    }
  }
}
