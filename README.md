# Qingping Air Monitor Lite Fetcher

Show Qingping Air Monitor Lite (CGDN1) data in your GNOME top bar or inside the terminal.

It has various settings, here how it could look like:

* Default settings: (`'co2','humidity','temperature','aqi_worst'`)
    ![few-sensors-different-status-emoji](/assets/few-sensors-different-status-emoji.png)
    `aqi_worst` display worst result between PM2.5 and PM10 AQIs

* When all `display_sensors` enabled: (`'co2','humidity','temperature','aqi_worst','aqi_pm25','aqi_pm10'`)
    ![all-emoji-verbosity0](/assets/all-emoji-verbosity0.png)

* You can not show or rearrange any of the sensors:
    ![all-except-worst-aqi-verbosity0](/assets/all-except-worst-aqi-verbosity0.png)
    ![few-rearranged-sensors-verbosity0](/assets/few-rearranged-sensors-verbosity0.png)
    ![few-sensors-verbosity0](/assets/few-sensors-verbosity0.png)

* You can enable or disable "emoji status" and "text status" representations
    ![few-sensors-no-emoji](/assets/few-sensors-no-emoji.png "show_emoji_status: false, show_text_status: false")
    ![few-sensors-text-and-emoji](/assets/few-sensors-text-and-emoji.png "show_emoji_status: true, show_text_status: true")
    ![few-sensors-text](/assets/few-sensors-text.png "show_emoji_status: false, show_text_status: true")

* You can set the verbosity level to show only when something goes wrong:
    ![verbosity1](/assets/verbosity1.png)
    If for a long period (default: 30 min) there is no new data from sensors and `verbosity_level != 0` next msg will pop up:
    ![no-data-alert](/assets/no-data-alert.png)
    the rest of the time, as long as everything is normal, nothing will be displayed:
    ![nothing-to-show](/assets/nothing-to-show.png)

## Cold start

1. Connect your Qingping Air Monitor Lite to the Qingping+ App.
2. Register in Qingping+ App.
3. Login to [developer.qingping.co/login](https://developer.qingping.co/login)
4. Clone this repo and go inside it.
5. Install the latest `nodejs` LTS version (tested on `20.12.1`) and run `npm install`
6. Create `settings.json` from example file

    ```bash
    cp user-settings-example.js user-settings.js
    ```

7. Populate credentials in `user-settings.js` with corresponding values from [developer.qingping.co/personal/permissionApply](https://developer.qingping.co/personal/permissionApply)
8. Run `node .`

9. If you'd like to run it as part of the GNOME top bar:
    1. Install [extensions.gnome.org/extension/2932/executor/](https://extensions.gnome.org/extension/2932/executor/)
    2. Set `/full/path/to/node /full/path/to/cloned/repo/` eg:

        ```bash
        /usr/bin/node /home/${USER}/.config/qingping/
        ```

    3. Set a `300`+ seconds (5+ minutes) update interval - Qingping by default updates data not more frequently than once in 15min.
    4. Save settings.  
        Note that you rerun script each time when you save settings.

## Authors

The repository is managed by [MaxymVlasov](https://github.com/MaxymVlasov/).

Shout-outs:

* To the amazing Homey App community, especially [tjaadvd](https://community.homey.app/u/tjaadvd) and [Wout_van_den_Dool](https://community.homey.app/u/Wout_van_den_Dool), which done most of the work figuring out how to get data from obscure Qingping docs in [this thread](https://community.homey.app/t/qingping-air-monitor-lite-homeyscript/44222)

## Notes

It would be great to make it a full-fledged GNOME extension, but after spending a few hours understanding how it could be achieved I choose this "good enough" solution to me. If you'd like to convert to the GNOME extension - I am open to contributions

<!--
## GNOME Extension Local debug

1. Clone repo to `/tmp` folder
2. Symlink `gnome-extension@qingping.co` to your gnome-extension folder

    ```bash
    cd /home/${USER}/.local/share/gnome-shell/extensions/
    ln -s ../../../../../../tmp/qingping-gnome-extension/gnome-extension@qingping.co gnome-extension@qingping.co
    ```

3. For Wayland ([X11 instructions](https://gjs.guide/extensions/development/creating.html#x11-sessions)), run:

    ```bash
    dbus-run-session -- gnome-shell --nested --wayland
    ```

4. Open a terminal inside the **new** session and enable the extension

    ```bash
    gnome-extensions enable gnome-extension@qingping.co
    ```

5. To evaluate new version - stop `dbus-run-session` and repeat step 3.
-->
