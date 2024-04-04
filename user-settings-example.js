export const settings = {
    // Get from https://developer.qingping.co/personal/permissionApply
    APP_KEY: '',
    APP_SECRET: '',

    quality_index: {
        // 0 - Always show
        // 1 - Show only when something is slightly wrong
        // 2 - Show only when something is wrong
        // 3 - Show only when something is very wrong
        verbosity_level: 1,

        show_sensor_data: true,
        show_emoji_status: true,
        show_text_status: false,
        // Set to false to disable
        show_msg_if_data_not_updated_minutes: 30,
        // Set which sensors to display and in which order
        display_sensors: [
            'co2',
            'humidity',
            'temperature',
            'aqi_worst',
            'aqi_pm25',
            'aqi_pm10',
        ],

    },
}