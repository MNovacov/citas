import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-gestion-citas',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [FormBuilder],
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
})
export class GestionCitasPage implements OnInit {
  citas: { frase: string; autor: string }[] = [];
  citaForm: FormGroup;

  constructor(private citasService: CitasService, private fb: FormBuilder) {
    this.citaForm = this.fb.group({
      frase: ['', [Validators.required, Validators.minLength(5)]],
      autor: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  async ngOnInit() {
    await this.cargarCitas();
  }

  async cargarCitas() {
    this.citas = await this.citasService.obtenerTodasLasCitas();
  }

  async agregarCita() {
    if (this.citaForm.valid) {
      await this.citasService.agregarCita(this.citaForm.value);
      this.citaForm.reset();
      await this.cargarCitas();
    }
  }

  async eliminarCita(cita: { frase: string; autor: string }) {
    await this.citasService.eliminarCita(cita);
    await this.cargarCitas();
  }
}
