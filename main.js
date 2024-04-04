'use strict'

import settings from './settings.json' assert { type: 'json' }

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

    // Useful fields: access_token, expires_in
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
    const data = body.devices[0].data

    return {
        timestamp: data.timestamp.value,
        temperature: data.temperature.value,
        humidity: data.humidity.value,
        co2: data.co2.value,
        pm25: data.pm25.value,
        pm10: data.pm10.value,
    }
}

async function main() {
    const { access_token } = await autorizeInQingpingCloud()

    const data = await getDeviceData(access_token)

    console.log(data)
}

main()