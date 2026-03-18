import { TypesafeHttpService } from './typesafe-http.service';
import { HttpClient } from '@angular/common/http';
import * as iots from 'io-ts';
import { Observable, of } from 'rxjs';

const API_URL = 'https://api.example.com/data';
const HTTP_OPTIONS: object = {
  observe: 'body',
  responseType: 'json'
};

const VEHICLE = iots.type({
  id: iots.number,
  name: iots.string,
  image: iots.string,
});

type VehicleType = iots.TypeOf<typeof VEHICLE>;

const SAMPLE_VEHICLE: VehicleType = {
  id: 1,
  name: 'AT-ACT',
  image: 'https://example.com/at-act.jpg',
};
const SAMPLE_VEHICLE_TITLE = 'AT-ACT';

describe('TypesafeHttpService', () => {
  let service: TypesafeHttpService;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      head: jest.fn(),
      options: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;
    service = new TypesafeHttpService(mockHttpClient as unknown as HttpClient);
  });

  describe('patch(...) method', () => {
    describe('foundational functionality', () => {
      it('should call http.patch once', () => {
        // given
        mockHttpClient.patch.mockReturnValue(of(SAMPLE_VEHICLE));

        // when
        service.patch(API_URL, null, HTTP_OPTIONS);

        // then
        expect(mockHttpClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should call http.patch with the correct arguments', () => {
        // given
        mockHttpClient.patch.mockReturnValue(of(SAMPLE_VEHICLE));

        // when
        service.patch(API_URL, null, HTTP_OPTIONS);

        // then
        expect(mockHttpClient.patch).toHaveBeenCalledWith(API_URL, null, HTTP_OPTIONS);
      });
    });

    describe('simple call-through functionality', () => {
      it('should return the same value as http.patch', (done) => {
        // given
        mockHttpClient.patch.mockReturnValue(of(SAMPLE_VEHICLE_TITLE));

        // when
        service.patch(API_URL, null, { ...HTTP_OPTIONS, responseType: 'text'}).subscribe((response) => {
          // then
          expect(response).toEqual(SAMPLE_VEHICLE_TITLE);
          done();
        });
      });

      it('should propagate error from http.patch', (done) => {
        // given
        const errorResponse = new Error('Network error');
        mockHttpClient.patch.mockReturnValue(
          new Observable((subscriber) => {
            subscriber.error(errorResponse);
          })
        );

        // when
        service.patch(API_URL, null, { ...HTTP_OPTIONS, responseType: 'text'}).subscribe({
          next: () => {
            // then
            // This block should not be executed
            expect(true).toBe(false);
            done();
          },
          error: (error) => {
            // then
            expect(error).toBe(errorResponse);
            done();
          },
        });
      });
    });

    describe('response validation', () => {
      it('should accept valid response', (done) => {
        // given
        mockHttpClient.patch.mockReturnValue(of(SAMPLE_VEHICLE));

        // when
        service
          .patch<VehicleType>(API_URL, null, { ...HTTP_OPTIONS, runtimeType: VEHICLE })
          .subscribe((response) => {
            // then
            expect(response).toEqual(SAMPLE_VEHICLE);
            done();
          });
      });

      it('should reject invalid response', () => {
        // given
        mockHttpClient.patch.mockReturnValue(
          of({ ...SAMPLE_VEHICLE, name: 5 })
        );

        // when
        try {
          service.patch<VehicleType>(API_URL, null, { ...HTTP_OPTIONS, runtimeType: VEHICLE }).subscribe();
        } catch (error) {
          // then
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  });
});
