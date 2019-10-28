'use strict';

function tvin(player, values) {
  const sourcePlayerName = values[0];
  let tvinSourcePlayer = player;

  if (sourcePlayerName) {
    tvinSourcePlayer = player.system.getPlayer(decodeURIComponent(sourcePlayerName));
  }

  if (!tvinSourcePlayer) {
    return Promise.reject(new Error(`Could not find player ${sourcePlayerName}`));
  }

  const uri = `x-sonos-htastream:${tvinSourcePlayer.uuid}:spdif`

  return player.coordinator.setAVTransport(uri)
    .then(() => player.coordinator.play());
}

module.exports = function (api) {
  api.registerAction('tvin', tvin);
}
