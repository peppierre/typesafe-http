import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { z } from 'zod';
import { Observable } from 'rxjs';
import { TypesafeHttpService } from '@peppierre/typesafe-http-zod';

const VEHICLE = z.object({
  _id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.number(),
});

type VehicleType = z.infer<typeof VEHICLE>;

@Component({
  selector: 'app-at-act',
  imports: [AsyncPipe],
  templateUrl: './at-act.component.html',
  styleUrls: ['./at-act.component.scss'],
  standalone: true,
})
export class AtActComponent {
  private typesafeHttpService: TypesafeHttpService = inject(TypesafeHttpService);

  public vehicle$: Observable<VehicleType> = this.typesafeHttpService.get<VehicleType>(
    VEHICLE,
    'https://starwars-databank-server.vercel.app/api/v1/vehicles/6429291f021f17e13fbc1d43'
  );

}
