import { afterEach, describe, expect, it, vi } from 'vitest';
import { SingaporeWeatherClient } from './weather.js';

describe('SingaporeWeatherClient two-hour forecast', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('selects the forecast condition for the nearest area', () => {
    const client = new SingaporeWeatherClient();
    const snapshot = client.snapshotFromPayload(
      {
        code: 0,
        data: {
          area_metadata: [
            { name: 'Bishan', label_location: { latitude: 1.35, longitude: 103.84 } },
            { name: 'Bedok', label_location: { latitude: 1.32, longitude: 103.92 } },
          ],
          items: [
            {
              update_timestamp: '2026-09-07T10:00:00+08:00',
              valid_period: { text: '10.00 am to 12.00 pm' },
              forecasts: [
                { area: 'Bishan', forecast: 'Partly Cloudy' },
                { area: 'Bedok', forecast: 'Fair' },
              ],
            },
          ],
        },
      },
      1.351,
      103.841,
    );

    expect(snapshot).toMatchObject({
      condition: 'Partly Cloudy',
      area: 'Bishan',
      observed_at: '2026-09-07T10:00:00+08:00',
      valid_period_text: '10.00 am to 12.00 pm',
    });
  });

  it('combines the two-hour forecast with the nearest metric readings', async () => {
    const responses: Record<string, unknown> = {
      'two-hr-forecast': {
        code: 0,
        data: {
          area_metadata: [{ name: 'Bishan', label_location: { latitude: 1.35, longitude: 103.84 } }],
          items: [{
            update_timestamp: '2026-09-07T10:00:00+08:00',
            forecasts: [{ area: 'Bishan', forecast: 'Fair' }],
          }],
        },
      },
      'air-temperature': readingPayload('30.1'),
      'relative-humidity': readingPayload('78'),
      rainfall: readingPayload('0.4'),
      'wind-speed': readingPayload('8'),
      'wind-direction': readingPayload('135'),
      uv: { code: 0, data: { records: [{ updatedTimestamp: '2026-09-07T10:00:00+08:00', index: [{ value: '6' }] }] } },
      psi: airQualityPayload('42'),
      pm25: airQualityPayload('9'),
      'twenty-four-hr-forecast': {
        code: 0,
        data: {
          records: [{
            updatedTimestamp: '2026-09-07T10:03:00+08:00',
            general: { temperature: { low: 25, high: 32 } },
            periods: [{
              timePeriod: { text: '10.00 am to 12.00 pm' },
              regions: { central: { text: 'Fair' } },
            }],
          }],
        },
      },
      '4-day-weather-forecast': {
        code: 0,
        items: [{
          update_timestamp: '2026-09-07T10:04:00+08:00',
          forecasts: [{
            date: '2026-09-07',
            forecast: 'Fair',
            temperature: { low: 25, high: 32 },
          }],
        }],
      },
    };

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const endpoint = new URL(String(input)).pathname.split('/').pop() as string;
      return new Response(JSON.stringify(responses[endpoint]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    const snapshot = await new SingaporeWeatherClient().getCurrentWeather(1.351, 103.841);

    expect(snapshot).toMatchObject({
      condition: 'Fair',
      area: 'Bishan',
      temperature_c: 30.1,
      humidity_percent: 78,
      rainfall_mm: 0.4,
      wind_speed_knots: 8,
      wind_direction_degrees: 135,
      uv_index: 6,
      psi_twenty_four_hourly: 42,
      pm25_one_hourly: 9,
      air_quality_region: 'central',
      forecast_low_c: 25,
      forecast_high_c: 32,
      forecast_periods: [{ label: '10.00 am to 12.00 pm', forecast: 'Fair' }],
      daily_forecast: [{
        date: '2026-09-07',
        forecast: 'Fair',
        temperature_low_c: 25,
        temperature_high_c: 32,
      }],
    });
    expect(fetchMock).toHaveBeenCalledTimes(11);
  });
});

function readingPayload(value: string) {
  return {
    code: 0,
    data: {
      stations: [{ id: 'S1', location: { latitude: 1.35, longitude: 103.84 } }],
      readings: [{ timestamp: '2026-09-07T10:01:00+08:00', data: [{ stationId: 'S1', value }] }],
    },
  };
}

function airQualityPayload(value: string) {
  const readingType = value === '42' ? 'psi_twenty_four_hourly' : 'pm25_one_hourly';
  return {
    code: 0,
    data: {
      regionMetadata: [{ name: 'central', labelLocation: { latitude: 1.35, longitude: 103.84 } }],
      items: [{
        updatedTimestamp: '2026-09-07T10:02:00+08:00',
        readings: { [readingType]: { central: value } },
      }],
    },
  };
}
