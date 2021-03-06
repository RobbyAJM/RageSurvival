"use strict";
var Bones = require("./libs/skeleton.js")
console.log(Bones.SKEL_R_Hand);
console.log(Bones.SKEL_L_Hand);
console.log = function(...a) {
    a = a.map(function(e) {
        return JSON.stringify(e);
    })
    mp.gui.chat.push("DeBuG:" + a.join(" "))
};
mp.lerp = function(a, b, n) {
    return (1 - n) * a + n * b;
}
require("./libs/attachments.js")
require("./libs/weapon_attachments.js")
/*Register Attachments for Player Animatiuons etc TODO*/
mp.attachmentMngr.register("mining", "prop_tool_pickaxe", Bones.SKEL_R_Hand, new mp.Vector3(0.085, -0.3, 0), new mp.Vector3(-90, 0, 0));
mp.attachmentMngr.register("lumberjack", "w_me_hatchet", Bones.SKEL_R_Hand, new mp.Vector3(0.085, -0.05, 0), new mp.Vector3(-90, 0, 0));
mp.attachmentMngr.register("drink_beer", "prop_cs_beer_bot_03", Bones.SKEL_L_Hand, new mp.Vector3(0.1, -0.03, 0.025), new mp.Vector3(-90, 30, 0));
mp.attachmentMngr.register("eat_burger", "prop_cs_burger_01", Bones.SKEL_L_Hand, new mp.Vector3(0.15, 0.025, 0.025), new mp.Vector3(170, 40, 0));
require("./vector.js")
mp.rpc = require("./libs/rage-rpc.min.js");
mp.isValid = function(val) {
    return val != null && val != undefined && val != "";
}
mp.gui.chat.enabled = false;
mp.gui.execute("const _enableChatInput = enableChatInput;enableChatInput = (enable) => { mp.trigger('chatEnabled', enable); _enableChatInput(enable) };");
mp.events.add('chatEnabled', (isEnabled) => {
    mp.gui.chat.enabled = isEnabled;
});
mp.game.graphics.setBlackout(true);
mp.canCrouch = true;
mp.gameplayCam = mp.cameras.new('gameplay');
mp.defaultCam = mp.cameras.new('default');
mp.localPlayer = mp.players.local;

mp.Player.prototype.getPosition = function() {
    return mp.vector(this.position);
}
mp.localPlayer.getPos = function() {
    return mp.vector(this.position);
}
mp.ui = {};
mp.ui.ready = false;
mp.gameplayCam.setAffectsAiming(true);
require("./animations.js")
require("./vegetation.js")
require("./ped.js")
require("./object.js")
require("./interface.js")
require("./crops.js")
require("./player.js")
require("./scaleforms/index.js")
require("./crouch.js")
require("./items.js")
require("./crafting.js")
require("./zombies.js")
require("./gathering.js")
require("./building.js")
require("./login.js")
require("./combat.js")
require("./character_creator.js")
require("./vehicles.js")
require("./storage.js")
require("./weather.js")
var natives = require("./natives.js")
var CEFNotification = require("./browser.js").notification;
mp.events.add("Notifications:New", (notification_data) => {
    CEFNotification.call("notify", notification_data)
})
mp.events.add("Player:WanderDuration", (ms) => {
    console.log("GO WANDER");
    let p = mp.players.local.position;
    mp.players.local.taskWanderStandard(10, 10);
    setTimeout(function() {
        mp.players.local.clearTasksImmediately();
    }, ms)
});
mp.events.add('Player:ShowUI', () => {
    mp.ui.ready = true;
});
mp.events.add('Player:HideUI', () => {
    mp.ui.ready = true;
});
mp.events.add('Player:Collision', (enable) => {
    if (enable == true) {
        mp.vehicles.forEach(vehicle => {
            if (mp.players.local.vehicle) {
                mp.players.local.vehicle.setNoCollision(vehicle.handle, true);
                natives.SET_ENTITY_NO_COLLISION_ENTITY(mp.players.local.vehicle, vehicle, true)
                natives.SET_ENTITY_NO_COLLISION_ENTITY(vehicle, mp.players.local.vehicle, true)
            }
            vehicle.setAlpha(255);
        });
    } else {
        mp.vehicles.forEach(vehicle => {
            if (mp.players.local.vehicle) {
                mp.players.local.vehicle.setNoCollision(vehicle.handle, false);
                natives.SET_ENTITY_NO_COLLISION_ENTITY(vehicle, mp.players.local.vehicle, false)
                natives.SET_ENTITY_NO_COLLISION_ENTITY(mp.players.local.vehicle, vehicle, false)
            }
            vehicle.setAlpha(150);
        });
    }
});