var methods = require("methods");
var roleFighter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets;
        targets = creep.room.find(FIND_CREEPS, {
            filter: (creep) => {
               return (!creep.my);
            }
        });
        
        if(targets.length > 0){
            var mini = methods.closest(creep,targets);
            var res;
            res = creep.attack(targets[mini]);
            if(res == OK){
                return;
            }else if(res == ERR_NOT_IN_RANGE){
                res = creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffffff'}});
                if(res != ERR_NO_PATH){
                    return;
                }
            }
        }
        
        targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (!structure.my && structure.owner != undefined && structure.structureType != STRUCTURE_ROAD && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_CONTROLLER);
            }
        });
        //console.log(targets.length);
        if(targets.length > 0){
            //console.log("I'm in.");
            var mini = methods.closest(creep,targets);
            var res = creep.attack(targets[mini]);
            if(res == OK)
                return;
            res = creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffffff'}});
            //console.log("res : "+res);
            //console.log("ERR_NO_PATH : "+ERR_NO_PATH);
            //console.log(targets[mini]);
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (!structure.my && (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits);
                }
            });
            var mini = methods.closest(creep,targets);
            creep.attack(targets[mini]);
            creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffffff'}})
            
        }else{
            creep.moveTo(Game.flags["FlagAttack"],{visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

module.exports = roleFighter;