import { TypesafeHttpService } from './typesafe-http.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { z } from 'zod';

const API_URL = 'https://api.example.com/data';
const HTTP_OPTIONS: object = {
  headers: { 'Content-Type': 'application/json' },
};

const VEHICLE = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
});

type VehicleType = z.infer<typeof VEHICLE>;

const SAMPLE_VEHICLE: VehicleType = {
  id: 1,
  name: 'AT-ACT',
  image: 'https://example.com/at-act.jpg',
};

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

  describe('get(...) method', () => {
    it('should call http.get once', () => {
      // given
      mockHttpClient.get.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.get<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should call http.get with the correct arguments', () => {
      // given
      mockHttpClient.get.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.get<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.get).toHaveBeenCalledWith(API_URL, HTTP_OPTIONS);
    });

    it('should accept valid response', (done) => {
      // given
      mockHttpClient.get.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service
        .get<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS)
        .subscribe((response) => {
          // then
          expect(response).toEqual(SAMPLE_VEHICLE);
          done();
        });
    });

    it('should reject invalid response', () => {
      // given
      mockHttpClient.get.mockReturnValue(
        of({ ...SAMPLE_VEHICLE, name: 5 })
      );

      // when
      try {
        service.get<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS).subscribe();
      } catch (error) {
        // then
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('post(...) method', () => {
    
    it('should call http.post once', () => {
      // given
      mockHttpClient.post.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.post<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.post).toHaveBeenCalledTimes(1);
    });

    it('should call http.post with the correct arguments', () => {
      // given
      mockHttpClient.post.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.post<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.post).toHaveBeenCalledWith(API_URL, null, HTTP_OPTIONS);
    });

    it('should accept valid response', (done) => {
      // given
      mockHttpClient.post.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service
        .post<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS)
        .subscribe((response) => {
          // then
          expect(response).toEqual(SAMPLE_VEHICLE);
          done();
        });
    });

    it('should reject invalid response', () => {
      // given
      mockHttpClient.post.mockReturnValue(
        of({ ...SAMPLE_VEHICLE, name: 5 })
      );

      // when
      try {
        service.post<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS).subscribe();
      } catch (error) {
        // then
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('put(...) method', () => {
    
    it('should call http.put once', () => {
      // given
      mockHttpClient.put.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.put<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.put).toHaveBeenCalledTimes(1);
    });

    it('should call http.put with the correct arguments', () => {
      // given
      mockHttpClient.put.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.put<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.put).toHaveBeenCalledWith(API_URL, null, HTTP_OPTIONS);
    });

    it('should accept valid response', (done) => {
      // given
      mockHttpClient.put.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service
        .put<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS)
        .subscribe((response) => {
          // then
          expect(response).toEqual(SAMPLE_VEHICLE);
          done();
        });
    });

    it('should reject invalid response', () => {
      // given
      mockHttpClient.put.mockReturnValue(
        of({ ...SAMPLE_VEHICLE, name: 5 })
      );

      // when
      try {
        service.put<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS).subscribe();
      } catch (error) {
        // then
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('patch(...) method', () => {
    
    it('should call http.patch once', () => {
      // given
      mockHttpClient.patch.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.patch<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.patch).toHaveBeenCalledTimes(1);
    });

    it('should call http.patch with the correct arguments', () => {
      // given
      mockHttpClient.patch.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.patch<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.patch).toHaveBeenCalledWith(API_URL, null, HTTP_OPTIONS);
    });

    it('should accept valid response', (done) => {
      // given
      mockHttpClient.patch.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service
        .patch<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS)
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
        service.patch<VehicleType>(VEHICLE, API_URL, null, HTTP_OPTIONS).subscribe();
      } catch (error) {
        // then
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('delete(...) method', () => {
    it('should call http.delete once', () => {
      // given
      mockHttpClient.delete.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.delete<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.delete).toHaveBeenCalledTimes(1);
    });

    it('should call http.delete with the correct arguments', () => {
      // given
      mockHttpClient.delete.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.delete<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.delete).toHaveBeenCalledWith(API_URL, HTTP_OPTIONS);
    });

    it('should accept valid response', (done) => {
      // given
      mockHttpClient.delete.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service
        .delete<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS)
        .subscribe((response) => {
          // then
          expect(response).toEqual(SAMPLE_VEHICLE);
          done();
        });
    });

    it('should reject invalid response', () => {
      // given
      mockHttpClient.delete.mockReturnValue(
        of({ ...SAMPLE_VEHICLE, name: 5 })
      );

      // when
      try {
        service.delete<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS).subscribe();
      } catch (error) {
        // then
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('head(...) method', () => {
    it('should call http.head once', () => {
      // given
      mockHttpClient.head.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.head<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.head).toHaveBeenCalledTimes(1);
    });

    it('should call http.head with the correct arguments', () => {
      // given
      mockHttpClient.head.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.head<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.head).toHaveBeenCalledWith(API_URL, HTTP_OPTIONS);
    });

    it('should accept valid response', (done) => {
      // given
      mockHttpClient.head.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service
        .head<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS)
        .subscribe((response) => {
          // then
          expect(response).toEqual(SAMPLE_VEHICLE);
          done();
        });
    });

    it('should reject invalid response', () => {
      // given
      mockHttpClient.head.mockReturnValue(
        of({ ...SAMPLE_VEHICLE, name: 5 })
      );

      // when
      try {
        service.head<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS).subscribe();
      } catch (error) {
        // then
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('options(...) method', () => {
    it('should call http.options once', () => {
      // given
      mockHttpClient.options.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.options<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.options).toHaveBeenCalledTimes(1);
    });

    it('should call http.options with the correct arguments', () => {
      // given
      mockHttpClient.options.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service.options<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS);

      // then
      expect(mockHttpClient.options).toHaveBeenCalledWith(API_URL, HTTP_OPTIONS);
    });

    it('should accept valid response', (done) => {
      // given
      mockHttpClient.options.mockReturnValue(of(SAMPLE_VEHICLE));

      // when
      service
        .options<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS)
        .subscribe((response) => {
          // then
          expect(response).toEqual(SAMPLE_VEHICLE);
          done();
        });
    });

    it('should reject invalid response', () => {
      // given
      mockHttpClient.options.mockReturnValue(
        of({ ...SAMPLE_VEHICLE, name: 5 })
      );

      // when
      try {
        service.options<VehicleType>(VEHICLE, API_URL, HTTP_OPTIONS).subscribe();
      } catch (error) {
        // then
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
