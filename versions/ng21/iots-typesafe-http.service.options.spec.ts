import { HttpClient } from '@angular/common/http';
import * as iots from 'io-ts';
import { firstValueFrom, Observable, of, Subscriber } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TypesafeHttpService } from './typesafe-http.service';

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

interface HttpClientMock {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  head: ReturnType<typeof vi.fn>;
  options: ReturnType<typeof vi.fn>;
};

describe('TypesafeHttpService', () => {
  let service: TypesafeHttpService;
  let mockHttpClient: HttpClientMock;

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
      head: vi.fn(),
      options: vi.fn(),
    } as unknown as HttpClientMock;
    service = new TypesafeHttpService(mockHttpClient as unknown as HttpClient);
  });

  describe('options(...) method', () => {
    describe('foundational functionality', () => {
      it('should call http.options once', () => {
        // given
        mockHttpClient.options.mockReturnValue(of(SAMPLE_VEHICLE));

        // when
        service.options(API_URL, HTTP_OPTIONS);

        // then
        expect(mockHttpClient.options).toHaveBeenCalledTimes(1);
      });

      it('should call http.options with the correct arguments', () => {
        // given
        mockHttpClient.options.mockReturnValue(of(SAMPLE_VEHICLE));

        // when
        service.options(API_URL, HTTP_OPTIONS);

        // then
        expect(mockHttpClient.options).toHaveBeenCalledWith(API_URL, HTTP_OPTIONS);
      });
    });

    describe('simple call-through functionality', () => {
      it('should return the same value as http.options', async () => {
        // given
        mockHttpClient.options.mockReturnValue(of(SAMPLE_VEHICLE_TITLE));

        // when
        const result = await firstValueFrom(service.options(API_URL, { ...HTTP_OPTIONS, responseType: 'text'}));

        // then
        expect(result).toEqual(SAMPLE_VEHICLE_TITLE);
      });

      it('should propagate error from http.options', async () => {
        // given
        const errorResponse = new Error('Network error');
        mockHttpClient.options.mockReturnValue(
          new Observable((subscriber: Subscriber<unknown>) => {
            subscriber.error(errorResponse);
          })
        );

        // when
        try {
          await firstValueFrom(service.options(API_URL, { ...HTTP_OPTIONS, responseType: 'text'}));
        } catch (error) {
          // then
          expect(error).toBe(errorResponse);
        }
      });
    });

    describe('response validation', () => {
      it('should accept valid response', async () => {
        // given
        mockHttpClient.options.mockReturnValue(of(SAMPLE_VEHICLE));

        // when
        const result = await firstValueFrom(service.options<VehicleType>(API_URL, { ...HTTP_OPTIONS, runtimeType: VEHICLE }));

        // then
        expect(result).toEqual(SAMPLE_VEHICLE);
      });

      it('should reject invalid response', async () => {
        // given
        mockHttpClient.options.mockReturnValue(
          of({ ...SAMPLE_VEHICLE, name: 5 })
        );

        // when
        try {
          await firstValueFrom(service.options<VehicleType>(API_URL, { ...HTTP_OPTIONS, runtimeType: VEHICLE }));
        } catch (error) {
          // then
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  });
});
