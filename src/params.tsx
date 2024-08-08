export function getChannelName(): string {
    const channelName = new URLSearchParams(document.location.search).get('channelName');

    if (!channelName) {
        throw "Unknown channel name";
    }

    return channelName;
}
