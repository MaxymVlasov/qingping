# Qingping Air Monitor Lite Fetcher

## Cold start

1. Connect your Qingping Air Monitor Lite to Qingping+ App.
2. Register in Qingping+ App.
3. Login to [developer.qingping.co/login](https://developer.qingping.co/login)
4. Clone this repo and go inside it.
5. Install latest `nodejs` LTS version (tested on `20.12.1`) and run `npm install`
6. Create `settings.json` from example file

    ```bash
    cp user-settings-example.js user-settings.js
    ```

7. Populate credentials in `user-settings.js` with corresponding values from [developer.qingping.co/personal/permissionApply](https://developer.qingping.co/personal/permissionApply)
8. Run `node .`

9. If you;d like to run it as part of Gnome top bar:
    1. Install [extensions.gnome.org/extension/2932/executor/](https://extensions.gnome.org/extension/2932/executor/)
    2. Set `/full/path/to/node /full/path/to/cloned/repo/` eg:

        ```bash
        /usr/bin/node /home/${USER}/.config/qingping/
        ```

    3. Set a `300`+ seconds (5+ minutes) update interval - Qingping by default updates data not frequent than once in 15min.
    4. Save settings

## Authors

Repository is managed by [MaxymVlasov](https://github.com/MaxymVlasov/).

Shout-outs:

* To amazing Homey App community, especially [tjaadvd](https://community.homey.app/u/tjaadvd) and [Wout_van_den_Dool](https://community.homey.app/u/Wout_van_den_Dool), which done most of work figuring out how to get data from obscure Qingping docs in [this thread](https://community.homey.app/t/qingping-air-monitor-lite-homeyscript/44222)