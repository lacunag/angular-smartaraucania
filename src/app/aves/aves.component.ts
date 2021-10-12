import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-aves',
  templateUrl: './aves.component.html',
  styleUrls: ['./aves.component.css']
})
export class AvesComponent implements OnInit {

  private urlapi = 'https://aves.ninjas.cl/api/birds';
  cargando: boolean = false;
  inputBusqueda: string = '';
  aves: any = '';
  avesFiltradas: any = '';
  hola: any = '';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getAves();
  }

  getAves() {
    this.cargando = true;
    const url = this.urlapi;
    this.httpClient
      .get(url)
      .subscribe(apiData => (
        this.aves = apiData,
        this.avesFiltradas = this.aves,
        this.cargando = false
      ));
  }

  inputCambiado(event: any){

    if(!event.target.value){
      this.getAves();
    }
    this.inputBusqueda = event.target.value;
  }

  buscarAve() {
    console.log('buscando ave...', this.inputBusqueda);
    this.avesFiltradas = this.aves.filter(
      (  
        ave: { name: { spanish: string; }; }
      ) => ave.name.spanish.toLowerCase().includes(this.inputBusqueda)
    );
  }

  detalle(click:any){
    console.log(click);
  }


}
