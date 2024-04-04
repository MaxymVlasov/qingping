async function main() {

  const params = new URLSearchParams();

  params.append('grant_type', 'client_credentials');
  params.append('scope', 'device_full_access');

  // Get from https://developer.qingping.co/personal/permissionApply
  const client_id = process.env.APP_KEY // 'FILL_IN_APPKEY';
  const client_secret = process.env.APP_SECRET // 'FILL_IN_APPSECRET';
  const credentials = Buffer.from(client_id + ':' + client_secret).toString('base64');

  var result = await fetch("https://oauth.cleargrass.com/oauth2/token", {
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + credentials,
    },
    body: params,
  });

  if (!result.ok)   throw new Error(result.statusText);

  const body = await result.json();

  console.log(body)

  var access_token = body.access_token;

  await tag("qingping_access_token", access_token);

  // get device data

  var result = await fetch("https://apis.cleargrass.com/v1/apis/devices?timestamp=" + Date.now().toString(), {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + access_token,
    },
  });

  if (!result.ok)   throw new Error(result.statusText);

  const body2 = await result.json();

  var data = body2.devices[0].data

  console.log(data)

  var {timestamp,temperature,humidity,  co2,pm25, pm10} = data;

  console.log(timestamp,temperature,humidity,  co2,pm25, pm10);

  await tag("qingping_timestamp", timestamp.value);
  await tag("qingping_temperature", temperature.value);
  await tag("qingping_humidity", humidity.value);
  await tag("qingping_co2", co2.value);
  await tag("qingping_pm25", pm25.value);
  await tag("qingping_pm10", pm10.value);
}

main()