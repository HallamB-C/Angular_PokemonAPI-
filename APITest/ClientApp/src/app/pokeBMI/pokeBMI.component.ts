import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pokeBMI-component',
  templateUrl: './pokeBMI.component.html'
})
export class PokeBMIComponent {
  title = "Pokemon BMI";
  public pokeID = 1;
  public pokeName = "";
  public pokemon: Pokemon;
  public json = this.getPokemonById(this.pokeID);

  constructor(private http: HttpClient) { }

  getPokemonById(id: number){
    const baseurl = "https://pokeapi.co/api/v2/pokemon/";
    var url = baseurl + id;
    console.log(id);
    return this.http.get<Pokemon>(url).subscribe(res => {
      console.log(res)
      this.pokemon = res;
      this.pokemon.height = res['height'] / 10;
      this.pokemon.weight = res['weight'] / 10;
      this.pokemon.bmi = res['weight'] / (res['height'] * res['height']);
      this.pokemon.bmi < 25 ? this.pokemon.healthy = "Mad small" :
        this.pokemon.bmi < 29 ? this.pokemon.healthy = "Healthy" :
          this.pokemon.bmi < 32 ? this.pokemon.healthy = "Lardsack" :
            this.pokemon.healthy = "Absolute unit";
      console.log(this.pokemon.name);
    });
  }
  getPokemonByName(name: string) {
    const baseurl = "https://pokeapi.co/api/v2/pokemon/";
    var url = baseurl + name;
    console.log(name);
    return this.http.get<Pokemon>(url).subscribe(res => {
      console.log(res)
      this.pokemon = res;
      this.pokemon.height = res['height'] / 10;
      this.pokemon.weight = res['weight'] / 10;
      this.pokemon.bmi = res['weight'] / (res['height'] * res['height']);
      this.pokemon.bmi < 25 ? this.pokemon.healthy = "Underweight" :
        this.pokemon.bmi < 29 ? this.pokemon.healthy = "Healthy" :
          this.pokemon.healthy = "Overweight";
      console.log(this.pokemon.name);
    });
  }
  
  
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  bmi: number;
  healthy: string;
}

//export class Pokemon {
//  public id: number;
//  public name: string;
//  public height: number;
//  public weight: number;


//  constructor(id: number, name: string, height: number, weight: number) {
//    this.id = id;
//    this.name = name;
//    this.height = height;
//    this.weight = weight;
//  }
//}

