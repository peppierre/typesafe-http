import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { z } from 'zod';
import { Observable } from 'rxjs';
import { TypesafeHttpService } from '@peppierre/typesafe-http-zod';

const CHARACTER = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
});

type CharacterType = z.infer<typeof CHARACTER>;

@Component({
  selector: 'app-luke',
  imports: [AsyncPipe],
  templateUrl: './luke.component.html',
  styleUrls: ['./luke.component.scss'],
  standalone: true,
})
export class LukeComponent {
  private typesafeHttpService: TypesafeHttpService = inject(TypesafeHttpService);

  public character$: Observable<CharacterType> = this.typesafeHttpService.get<CharacterType>(
    'https://starwars-databank-server.vercel.app/api/v1/characters/64292927021f17e13fbc2062',
    {
      runtimeType: CHARACTER
    }
  );

}
