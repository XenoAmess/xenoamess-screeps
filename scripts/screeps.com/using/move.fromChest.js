var methods = require("methods");

var moveFromChest = {
    run : function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES , {
            filter: (object) => {
                return (object.structureType == STRUCTURE_CONTAINER && object.store[RESOURCE_ENERGY] > 0);
            }
        });
        if(targets.length){
            var mini = methods.closest(targets);
            if(creep.withdraw(targets[mini],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }else{
            if(creep.room != Game.flags["FlagResources"].room){
                creep.moveTo(Game.flags["FlagResources"]);
            }else{
                creep.moveTo(Game.spawns["Spawn1"]);
            }
            
        }
    }
}
module.exports = moveFromChest;