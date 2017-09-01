var methods = require("methods");
var moveTransportEnergy = {
    run : function(creep) {
        //console.log(creep.memory.lastRepairTarget);
        //console.log(nowTarget);
        var nowTarget = Game.getObjectById(creep.memory.lastTransportEnergyTarget);
        
        if(creep.memory.lastTransportEnergyTarget && nowTarget){
	        if(nowTarget.room == creep.room && nowTarget.energy < nowTarget.energyCapacity){
	            creep.moveTo(nowTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.transfer(nowTarget, RESOURCE_ENERGY);
                return;
	        }else{
	            creep.memory.lastTransportEnergyTarget = null;
	        }
        }
        
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.my && (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || (structure.structureType == STRUCTURE_STORAGE && !DO_NOT_PUT_ENERGY_IN_STORAGE) || structure.structureType == STRUCTURE_CONTAINER) &&
                        (structure.energy < structure.energyCapacity || (structure.storeCapacity && _.sum(structure.store) < structure.storeCapacity) );
                }
        });
        if(targets.length > 0) {
            var mini = methods.closest(creep,targets);
            
            creep.memory.lastTransportEnergyTarget = targets[mini].id;
            if(creep.transfer(targets[mini], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }else{
            creep.moveTo(Game.spawns["Spawn1"], {visualizePathStyle: {stroke: '#ffffff'}});
            
            
            // var targets = creep.room.find(FIND_CREEPS, {
            //     filter: (creep) => {
            //         return creep.my && (creep.carry.energy < creep.carryCapacity);
            //     }
            // });
            // var mini = methods.closest(creep,targets);
            // var res = creep.transfer(targets[mini], RESOURCE_ENERGY)
            // if(res != OK){
            //     creep.moveTo(Game.spawns["Spawn1"], {visualizePathStyle: {stroke: '#ffffff'}});
            // }
        }
    }
}
module.exports = moveTransportEnergy;