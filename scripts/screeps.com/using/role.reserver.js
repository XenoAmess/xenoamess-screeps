var methods = require("methods");
var roleReserver = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.hits < creep.hitsMax && creep.room != Game.spawns["Spawn1"].room){
            creep.moveTo(Game.spawns["Spawn1"]);
            return;
        }
        if(Memory.WAR_MODE && creep.room.controller.owner != undefined && !creep.room.controller.my){
            creep.moveTo(Game.spawns["Spawn1"]);
            return;
        }
        
        if(creep.room == Game.flags["FlagReserve"].room && !creep.room.controller.my){
            creep.reserveController(creep.room.controller);
            creep.signController(creep.room.controller , "Sorry But I need this room.Don't take it please.Or you are my enemy.");
            creep.moveTo(creep.room.controller);
        }else{
            creep.moveTo(Game.flags["FlagReserve"],{visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

module.exports = roleReserver;