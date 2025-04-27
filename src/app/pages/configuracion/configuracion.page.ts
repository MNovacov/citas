import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  permitirBorrarInicio = false;

  constructor(private configuracionService: ConfiguracionService) {}

  async ngOnInit() {
    this.permitirBorrarInicio = await this.configuracionService.obtenerPermitirBorrar();
  }

  async cambiarPreferencia() {
    await this.configuracionService.guardarPermitirBorrar(this.permitirBorrarInicio);
  }
}
