# Typesafe Http for Angular + io-ts

## Prerequisites

Before adding this package to your Angular app, please consider followings:

1. Expected Angular version is `16+`
1. `io-ts` library must be a dependency of your app:

   `npm install io-ts fp-ts`

## Installation

To install package into you Angular app, use the regular command:

`npm install @peppierre/typesafe-http-iots`

## Usage

Bootstrap your application by including service provider, like:

```Typescript

bootstrapApplication(
   AppComponent,
   {
      providers: [
         provideHttpClient(
            withInterceptorsFromDi()
         ),
         provideTypesafeHttp(),
     ]
   }
).catch(
   (err) => console.error(err)
);
```

**NOTE** that `HttpClient` must be included and it must be placed ahead of `provideTypesafeHttp()`.

Define your types:

```Typescript
import * as iots from 'io-ts';

export const VEHICLE = iots.type({
  _id: iots.number,
  name: iots.string,
  description: iots.string,
  image: iots.number,
});

export type VehicleType = iots.TypeOf<typeof VEHICLE>;
```

And use it, e.g. in a component:

```Typescript
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TypesafeHttpService } from '@peppierre/typesafe-http-iots';

@Component({
  selector: 'app-vehicle',
  templateUrl: './at-act.component.html',
  styleUrl: './at-act.component.scss'
})
export class VehiclaeComponent {
  private typesafeHttpService: TypesafeHttpService = inject(TypesafeHttpService);

  public vehicle$: Observable<VehicleType> = this.typesafeHttpService.get<VehicleType>(
    'https://starwars-databank-server.vercel.app/api/v1/vehicles/6429291f021f17e13fbc1d43',
    {
      runtimeType: VEHICLE
    }
  );

}
```

## API description

Service's API is similar to `HttpClient`'s API with following changes:

- arguments of wrapped method can be used in the same order but shifted right
- first argument would be an IO-TS runtime type (aka Decoder)

Here's a comparision of `HttpClient` and `TypesafeHttpService` examples for `get(...)` method explained:

```Typescript
// HttpClient variant
this.http.get<VehicleType>(
   'https://starwars-databank-server.vercel.app/api/v1/vehicles/6429291f021f17e13fbc1d43'
);    
```

```Typescript
// TypesafeHttpService variant
this.typesafeHttpService.get<VehicleType>(
   'https://starwars-databank-server.vercel.app/api/v1/vehicles/6429291f021f17e13fbc1d43',
    {
      runtimeType: VEHICLE
    }
);    
```

Other supported methods follow the same pattern. See supported methods below.

## Limitations

Here's a summary about which methods (and their overloads) are covered in `TypesafeHttpService`.

| HttpClient | Typesafe Http |
| :- | :-: |
| `get(...)` | covered |
| `post(...)` | covered |
| `put(...)` | covered |
| `patch(...)` | covered |
| `delete(...)` | covered |
| `head(...)` | covered |
| `options(...)` | covered |
| `request(...)` | N/A |
| `jsonp(...)` | N/A |
