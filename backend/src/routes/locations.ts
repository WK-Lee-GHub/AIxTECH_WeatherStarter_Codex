import type { Router } from 'express';
import { Router as createRouter } from 'express';
import {
  createLocation,
  deleteLocation,
  getLocation,
  listLocations,
  updateWeather,
} from '../db.js';
import { SingaporeWeatherClient, WeatherProviderError, type WeatherSnapshot } from '../weather.js';
import { logger } from '../logger.js';

export interface WeatherClient {
  getCurrentWeather(latitude: number, longitude: number): Promise<WeatherSnapshot>;
}

interface LocationsRouterOptions {
  weatherClient?: WeatherClient;
}

export function createLocationsRouter(options: LocationsRouterOptions = {}): Router {
  const router: Router = createRouter();
  const weatherClient =
    options.weatherClient ?? new SingaporeWeatherClient({ apiKey: process.env.WEATHER_API_KEY });

  router.get('/locations', async (_request, response, next) => {
    try {
      response.json({ locations: await listLocations() });
    } catch (error) {
      next(error);
    }
  });

  router.post('/locations', async (request, response, next) => {
    try {
      const latitude = Number(request.body?.latitude);
      const longitude = Number(request.body?.longitude);

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        response.status(422).json({ detail: 'latitude and longitude are required' });
        return;
      }
      if (!(1.1 <= latitude && latitude <= 1.5 && 103.6 <= longitude && longitude <= 104.1)) {
        response.status(422).json({
          detail: 'Coordinates must be within Singapore (lat 1.1-1.5, lon 103.6-104.1)',
        });
        return;
      }

      const location = await createLocation(latitude, longitude);

      try {
        const snapshot = await weatherClient.getCurrentWeather(
          location.latitude,
          location.longitude,
        );
        const updated = await updateWeather(location.id, snapshot);
        response.status(201).json(updated ?? location);
      } catch (error) {
        if (!(error instanceof WeatherProviderError)) throw error;
        logger.warn(
          { err: error, locationId: location.id },
          'weather refresh failed after location create',
        );
        response.status(201).json(location);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'DuplicateLocationError') {
        logger.warn({ err: error }, 'duplicate location rejected');
        response.status(409).json({ detail: error.message });
        return;
      }
      next(error);
    }
  });

  router.get('/locations/:locationId', async (request, response, next) => {
    try {
      const location = await getLocation(Number(request.params.locationId));
      if (!location) {
        response.status(404).json({ detail: 'Location not found' });
        return;
      }
      response.json(location);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/locations/:locationId', async (request, response, next) => {
    try {
      const location = await deleteLocation(Number(request.params.locationId));
      if (!location) {
        response.status(404).json({ detail: 'Location not found' });
        return;
      }
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  router.post('/locations/:locationId/refresh', async (request, response, next) => {
    try {
      const locationId = Number(request.params.locationId);
      const location = await getLocation(locationId);
      if (!location) {
        response.status(404).json({ detail: 'Location not found' });
        return;
      }

      const snapshot = await weatherClient.getCurrentWeather(location.latitude, location.longitude);
      const updated = await updateWeather(
        locationId,
        mergeWeatherPreservingFailedMetrics(location.weather, snapshot),
      );
      response.json(updated);
    } catch (error) {
      if (error instanceof WeatherProviderError) {
        response.status(502).json({ detail: error.message });
        return;
      }
      next(error);
    }
  });

  return router;
}

function mergeWeatherPreservingFailedMetrics(
  previous: WeatherSnapshot,
  next: WeatherSnapshot,
): WeatherSnapshot {
  const failed = new Set(next.failed_metrics ?? []);
  if (failed.has('two-hr-forecast')) return previous;

  return {
    ...next,
    condition: failed.has('two-hr-forecast') ? previous.condition : next.condition,
    area: failed.has('two-hr-forecast') ? previous.area : next.area,
    valid_period_text: failed.has('two-hr-forecast')
      ? previous.valid_period_text
      : next.valid_period_text,
    temperature_c: failed.has('air-temperature') ? previous.temperature_c : next.temperature_c,
    humidity_percent: failed.has('relative-humidity')
      ? previous.humidity_percent
      : next.humidity_percent,
    rainfall_mm: failed.has('rainfall') ? previous.rainfall_mm : next.rainfall_mm,
    wind_speed_knots: failed.has('wind-speed') ? previous.wind_speed_knots : next.wind_speed_knots,
    wind_direction_degrees: failed.has('wind-direction')
      ? previous.wind_direction_degrees
      : next.wind_direction_degrees,
    uv_index: failed.has('uv') ? previous.uv_index : next.uv_index,
    forecast_low_c: failed.has('twenty-four-hr-forecast')
      ? previous.forecast_low_c
      : next.forecast_low_c,
    forecast_high_c: failed.has('twenty-four-hr-forecast')
      ? previous.forecast_high_c
      : next.forecast_high_c,
    forecast_periods: failed.has('twenty-four-hr-forecast')
      ? previous.forecast_periods
      : next.forecast_periods,
    daily_forecast: failed.has('four-day-forecast')
      ? previous.daily_forecast
      : next.daily_forecast,
    psi_twenty_four_hourly: failed.has('air-quality')
      ? previous.psi_twenty_four_hourly
      : next.psi_twenty_four_hourly,
    pm25_one_hourly: failed.has('air-quality') ? previous.pm25_one_hourly : next.pm25_one_hourly,
    air_quality_region: failed.has('air-quality')
      ? previous.air_quality_region
      : next.air_quality_region,
  };
}
