import ComfyJS from "comfy.js";

function listenToChat(channelName) {
    ComfyJS.Init(channelName);

    ComfyJS.onCommand = (user, command, message, flags, extra) => {
        if (!flags.broadcaster && !flags.mod) {
            return;
        }

        // TODO start compass

        // TODO set timer to end compass if duration set

        // TODO end compass manually

        // TODO terminate compass
    };

    ComfyJS.onCheer = ( user, message, bits, flags, extra ) => {
        // TODO parse direction from message
    }
}
