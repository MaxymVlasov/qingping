'use strict'

import { settings } from './user-settings.js'
import { aqi, pseudoQI, msg_format } from './app-settings.js'

import { createRequire } from "module";
const require = createRequire(import.meta.url);
var _ = require('lodash');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function autorizeInQingpingCloud() {
    const params = new URLSearchParams()

    params.append('grant_type', 'client_credentials')
    params.append('scope', 'device_full_access')

    // Get from https://developer.qingping.co/personal/permissionApply
    const client_id = settings.APP_KEY
    const client_secret = settings.APP_SECRET
    const credentials = Buffer.from(client_id + ':' + client_secret).toString('base64')

    const result = await fetch("https://oauth.cleargrass.com/oauth2/token", {
        method: 'post',
        headers: {
            'Authorization': 'Basic ' + credentials,
        },
        body: params,
    })
    if (!result.ok) {
        throw new Error(result.statusText)
    }

    // Useful fields:
    // access_token - Access Token used to make Open API call
    // expires_in - Remaining effective time in seconds. Note: nerd to check with timestamp, as this value not updated.
    return await result.json()
}

async function getDeviceData(access_token) {
    const result = await fetch("https://apis.cleargrass.com/v1/apis/devices?timestamp=" + Date.now().toString(), {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
    })

    if (!result.ok) {
        throw new Error(result.statusText)
    }

    const body = await result.json()
    let data = body.devices[0].data

    if (data.humidity.value == 99999 && data.temperature.value == 99999) {
        console.log("Data is broken, retrying...")
        await sleep(5000) // 5 seconds
        return getDeviceData(access_token)
    }

    return data
}

function calculateAQI(sensor, concentration, _aqi = aqi) {
    /*
    * Calculate Air Quality Index.
    *
    * Calculations based on:
    * https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf
    *
    * Args:
    *    aqi: (MappingProxyType[str, dict]) Nested dictionary with values for AQI calculation.
    *    sensor: (str) Sensor name for which it will AQI count.
    *    concentration: (float) Raw data from sensor.
    *
    * Returns:
    *    int: Air Quality Index value.
    */

    let aqi_value

    for (let upper_bound in _aqi[sensor]) {
        if (concentration < parseFloat(upper_bound)) {
            let _ = _aqi[sensor][upper_bound];
            aqi_value = (
                (_['aqi_high'] - _['aqi_low'])
                / (_['pollutant_high'] - _['pollutant_low'])
                * (concentration - _['pollutant_low'])
                + _['aqi_low']
            );
            break;
        }
    }
    return Math.round(aqi_value);
}

function calculateData(raw_data) {

    const getAqiCategory = (aqi_value) => aqi.aqi_category[
        Object.keys(aqi.aqi_category).find(key => Number(key) > aqi_value)
    ]

    const getPseudoQICategory = (sensor, pseudoQI_value) => pseudoQI[sensor][
        Object.keys(pseudoQI[sensor]).find(key => Number(key) > pseudoQI_value)
    ]

    let data = {
        // better time
        minutes_ago: Math.floor((Date.now() - raw_data.timestamp.value * 1000) / 60000),
        // Pseudo Quality Index
        co2: getPseudoQICategory('co2', raw_data.co2.value),
        humidity: getPseudoQICategory('humidity', raw_data.humidity.value),
        temperature: getPseudoQICategory('temperature', raw_data.temperature.value),

        // AQI
        aqi_pm25: { value: calculateAQI('pm25', raw_data.pm25.value) },
        aqi_pm10: { value: calculateAQI('pm10', raw_data.pm10.value) },
        aqi_worst: { value: null },
    }
    data.aqi_worst.value = Math.max(data.aqi_pm25.value, data.aqi_pm10.value)

    data = _.merge(data, {
        aqi_pm25: getAqiCategory(data.aqi_pm25.value),
        aqi_pm10: getAqiCategory(data.aqi_pm10.value),
        aqi_worst: getAqiCategory(data.aqi_worst.value),
    })

    return data
}

async function main() {
    const { access_token } = await autorizeInQingpingCloud()

    const raw_data = await getDeviceData(access_token)

    const calculated_data = calculateData(raw_data)

    const data = _.merge(calculated_data, raw_data)

    let msg = ''
    let stg = settings.quality_index

    for (let sensor of stg.display_sensors) {
        if (! stg.show_sensor_data && ! stg.show_emoji_status && ! stg.show_text_status) {
            continue
        }

        if (data[sensor].verbosity_level < stg.verbosity_level) {
            continue
        }

        msg += msg_format[sensor].before
            + (stg.show_emoji_status ? data[sensor].emoji : '')
            + (stg.show_text_status ? data[sensor].text : '')
            + (stg.show_sensor_data ? data[sensor].value : '')
            + msg_format[sensor].after
    }

    if (msg != '') {
        console.log(`${msg}(>${data.minutes_ago}min ago)`)

    } else if (data.minutes_ago > stg.show_msg_if_data_not_updated_minutes) {
        console.log(`No data for >${data.minutes_ago}min`)
    }
}

await main()
