import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import * as iots from 'io-ts';
import { Observable } from 'rxjs';
import { TypesafeHttpService } from '@peppierre/typesafe-http-iots';

const CHARACTER = iots.type({
  _id: iots.string,
  name: iots.string,
  description: iots.string,
  image: iots.string,
});

type CharacterType = iots.TypeOf<typeof CHARACTER>;

@Component({
  selector: 'app-luke',
  imports: [AsyncPipe],
  templateUrl: './luke.component.html',
  styleUrl: './luke.component.scss'
})
export class LukeComponent {
  private typesafeHttpService: TypesafeHttpService = inject(TypesafeHttpService);

  public character$: Observable<CharacterType> = this.typesafeHttpService.get<CharacterType>(
    CHARACTER,
    'https://starwars-databank-server.vercel.app/api/v1/characters/64292927021f17e13fbc2062'
  );

}
