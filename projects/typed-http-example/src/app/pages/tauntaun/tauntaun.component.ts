import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import * as iots from 'io-ts';
import { Observable } from 'rxjs';
import { TypesafeHttpService } from '@peppierre/typesafe-http-iots';

const SPECIES = iots.type({
  _id: iots.string,
  name: iots.string,
  description: iots.string,
  image: iots.string,
});

type SpeciesType = iots.TypeOf<typeof SPECIES>;

@Component({
  selector: 'app-tauntaun',
  imports: [AsyncPipe],
  templateUrl: './tauntaun.component.html',
  styleUrl: './tauntaun.component.scss'
})
export class TauntaunComponent {
  private typesafeHttpService: TypesafeHttpService = inject(TypesafeHttpService);

  public species$: Observable<SpeciesType> = this.typesafeHttpService.get<SpeciesType>(
    SPECIES,
    'https://starwars-databank-server.vercel.app/api/v1/creatures/640b2f06b6a2a8104f0a0dad'
  );

}
