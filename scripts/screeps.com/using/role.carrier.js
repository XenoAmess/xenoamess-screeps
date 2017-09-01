var methods = require("methods");
var moveFromChest = require("move.fromChest");
var moveToBase = require("move.toBase");

var roleCarrier = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.hits < creep.hitsMax && creep.room != Game.spawns["Spawn1"].room){
            creep.moveTo(Game.spawns["Spawn1"]);
            return;
        }
        if(creep.room.controller.owner != undefined && !creep.room.controller.my){
            creep.moveTo(Game.spawns["Spawn1"]);
            return;
        }
        
        
        
        if(!creep.memory.fromChest && creep.carry.energy == 0) {
            creep.memory.fromChest = true;
            creep.say('🔄 fromChest');
	    }
	    if(creep.memory.fromChest && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.fromChest = false;
	        creep.say('🚧 toBase');
	    }
        
        if(!creep.memory.harvesting) {
            moveToBase.run(creep);
        } else {
            if(creep.room == Game.spawns["Spawn1"].room){
                creep.moveTo(Game.flags["FlagResources"], {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                moveFromChest.run(creep);
            }
        }
        
	}
};

module.exports = roleCarrier;