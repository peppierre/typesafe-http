import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { z } from 'zod';
import { Observable } from 'rxjs';
import { TypesafeHttpService } from '@peppierre/typesafe-http-zod';

const SPECIES = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
});

type SpeciesType = z.infer<typeof SPECIES>;

@Component({
  selector: 'app-tauntaun',
  imports: [AsyncPipe],
  templateUrl: './tauntaun.component.html',
  styleUrls: ['./tauntaun.component.scss'],
  standalone: true,
})
export class TauntaunComponent {
  private typesafeHttpService: TypesafeHttpService = inject(TypesafeHttpService);

  public species$: Observable<SpeciesType> = this.typesafeHttpService.get<SpeciesType>(
    'https://starwars-databank-server.vercel.app/api/v1/creatures/640b2f06b6a2a8104f0a0dad',
    {
      runtimeType: SPECIES
    }
  );
}
