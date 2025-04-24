import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import * as iots from 'io-ts';
import { Observable } from 'rxjs';
import { TypesafeHttpService } from 'typesafe-http';

const VEHICLE = iots.type({
  _id: iots.number,
  name: iots.string,
  description: iots.string,
  image: iots.number,
});

type VehicleType = iots.TypeOf<typeof VEHICLE>;

@Component({
  selector: 'app-at-act',
  imports: [AsyncPipe],
  templateUrl: './at-act.component.html',
  styleUrl: './at-act.component.scss'
})
export class AtActComponent {
  private typesafeHttpService: TypesafeHttpService = inject(TypesafeHttpService);

  public vehicle$: Observable<VehicleType> = this.typesafeHttpService.get<VehicleType>(
    VEHICLE,
    'https://starwars-databank-server.vercel.app/api/v1/vehicles/6429291f021f17e13fbc1d43'
  );

}
