import { Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypesafeHttpService } from './typesafe-http.service';

export function provideTypesafeHttp(): Provider {
  return {
    provide: TypesafeHttpService,
    useClass: TypesafeHttpService,
    deps: [HttpClient],
  };
}
