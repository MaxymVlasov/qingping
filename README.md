# Qingping Air Monitor Lite Fetcher

## Cold start

1. Connect your Qingping Air Monitor Lite to Qingping+ App.
2. Register in Qingping+ App.
3. Login to [developer.qingping.co/login](https://developer.qingping.co/login)
4. Install latest `nodejs` LTS version (tested on `20.12.1`)
5. Clone this repo and go inside it.
6. Create `settings.json` from example file

    ```bash
    cp settings.json.example settings.json
    ```

7. Populate credentials in `settings.json` with corresponding values from [developer.qingping.co/personal/permissionApply](https://developer.qingping.co/personal/permissionApply)
8. Run `node .`

## Authors

Repository is managed by [MaxymVlasov](https://github.com/MaxymVlasov/).

Shout-outs:

* To amazing Homey App community, especially [tjaadvd](https://community.homey.app/u/tjaadvd) and [Wout_van_den_Dool](https://community.homey.app/u/Wout_van_den_Dool), which done most of work figuring out how to get data from obscure Qingping docs in [this thread](https://community.homey.app/t/qingping-air-monitor-lite-homeyscript/44222)
