
export const aqi = {
    aqi_category: {
        50: {
            text: 'Good',
            emoji: '🟩',
            verbosity_level: 0,
        },
        100: {
            text: 'Moderate',
            emoji: '🟨🟨',
            verbosity_level: 1,
        },
        150: {
            text: 'Unhealthy for Sensitive Groups',
            emoji: '🟧🟧🟧',
            verbosity_level: 2,

        },
        200: {
            text: 'Unhealthy',
            emoji: '🟥🟥🟥🟥',
            verbosity_level: 3,
        },
        300: {
            text: 'Very Unhealthy',
            emoji: '🟪🟪🟪🟪🟪',
            verbosity_level: 3,

        },
        9999999999999: {
            text: 'Hazardous',
            emoji: '🟫🟫🟫🟫🟫🟫',
            verbosity_level: 3,
        },
    },
    pm25: {
        12.0: {
            aqi_high: 50,
            aqi_low: 0,
            pollutant_high: 12.0,
            pollutant_low: 0.0,
        },
        35.4: {
            aqi_high: 100,
            aqi_low: 51,
            pollutant_high: 35.4,
            pollutant_low: 12.1,
        },
        55.4: {
            aqi_high: 150,
            aqi_low: 101,
            pollutant_high: 55.4,
            pollutant_low: 35.5,
        },
        150.4: {
            aqi_high: 200,
            aqi_low: 151,
            pollutant_high: 150.4,
            pollutant_low: 55.5,
        },
        250.4: {
            aqi_high: 300,
            aqi_low: 201,
            pollutant_high: 250.4,
            pollutant_low: 150.5,
        },
        350.4: {
            aqi_high: 400,
            aqi_low: 301,
            pollutant_high: 350.4,
            pollutant_low: 250.5,
        },
        500.4: {
            aqi_high: 500,
            aqi_low: 401,
            pollutant_high: 500.4,
            pollutant_low: 350.5,
        },
    },
    pm10: {
        54: {
            aqi_high: 50,
            aqi_low: 0,
            pollutant_high: 54,
            pollutant_low: 0,
        },
        154: {
            aqi_high: 100,
            aqi_low: 51,
            pollutant_high: 154,
            pollutant_low: 55,
        },
        254: {
            aqi_high: 150,
            aqi_low: 101,
            pollutant_high: 254,
            pollutant_low: 155,
        },
        354: {
            aqi_high: 200,
            aqi_low: 151,
            pollutant_high: 354,
            pollutant_low: 255,
        },
        424: {
            aqi_high: 300,
            aqi_low: 201,
            pollutant_high: 424,
            pollutant_low: 355,
        },
        504: {
            aqi_high: 301,
            aqi_low: 400,
            pollutant_high: 504,
            pollutant_low: 425,
        },
        604: {
            aqi_high: 500,
            aqi_low: 401,
            pollutant_high: 604,
            pollutant_low: 505,
        },
    },
}

export const pseudoQI = {
    co2: {
        300: {
            text: 'Unrealistic data. Please check the sensor.',
            emoji: '🟥🟥🟥🟥',
            verbosity_level: 2,
        },
        900: {
            text: 'Good',
            emoji: '🟩',
            verbosity_level: 0,
        },
        1400: {
            text: 'Slightly High for Sensitive Groups',
            emoji: '🟨🟨',
            verbosity_level: 1,
        },
        2000: {
            text: 'Slightly High',
            emoji: '🟧🟧🟧',
            verbosity_level: 3,
        },
        3000: {
            text: 'High',
            emoji: '🟥🟥🟥🟥',
            verbosity_level: 3,
        },
        9999999999999: {
            text: 'Very High',
            emoji: '🟪🟪🟪🟪🟪',
            verbosity_level: 3,
        },
    },
    humidity: {
        30: {
            text: 'Very Dry',
            emoji: '🟥🟥🟥🟥',
            verbosity_level: 3,
        },
        40: {
            text: 'Dry',
            emoji: '🟧🟧🟧',
            verbosity_level: 2,
        },
        45: {
            text: 'Slighly Dry',
            emoji: '🟨🟨',
            verbosity_level: 1,
        },
        60: {
            text: 'Comfortable',
            emoji: '🟩',
            verbosity_level: 0,
        },
        65: {
            text: 'Slighly Humid',
            emoji: '🟦🟦',
            verbosity_level: 1,
        },
        70: {
            text: 'Humid',
            emoji: '🟦🟦🟦',
            verbosity_level: 2,

        },
        100: {
            text: 'Very Humid',
            emoji: '🟦🟦🟦🟦',
            verbosity_level: 3,
        },
    },
    temperature: {
        10: {
            text: 'Very Cold',
            emoji: '🟦🟦🟦🟦',
            verbosity_level: 3,
        },
        18: {
            text: 'Cold',
            emoji: '🟦🟦🟦',
            verbosity_level: 2,
        },
        21: {
            text: 'Slighly Cold',
            emoji: '🟦🟦',
            verbosity_level: 1,
        },
        24: {
            text: 'Comfortable',
            emoji: '🟩',
            verbosity_level: 0,
        },
        26: {
            text: 'Slighly Hot',
            emoji: '🟨🟨',
            verbosity_level: 1,
        },
        30: {
            text: 'Hot',
            emoji: '🟧🟧🟧',
            verbosity_level: 2,
        },
        35: {
            text: 'Very Hot',
            emoji: '🟥🟥🟥🟥',
            verbosity_level: 3,
        },
    },
}

export const msg_format = {
    co2: {
        before: 'CO₂',
        after: ' ',
    },
    humidity: {
        before: '💧',
        after: '% ',
    },
    temperature: {
        before: '🌡️',
        after: '°C ',
    },
    aqi_worst: {
        before: '💨AQI',
        after: ' ',
    },
    aqi_pm25: {
        before: '💨AQI PM2.5',
        after: ' ',
    },
    aqi_pm10: {
        before: '💨AQI PM10',
        after: ' ',
    },

}