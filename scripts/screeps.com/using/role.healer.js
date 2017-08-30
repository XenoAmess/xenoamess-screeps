var methods = require("methods");
var roleHealer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = roomNeedingHealCreeps[creep.room];
        if(targets.length > 0){
            var mini = methods.closest(creep,targets);
            var res;
            res = creep.heal(targets[mini]);
            if(res == OK){
            }else if(res == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[mini], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }else{
            creep.moveTo(Game.flags["FlagAttack"],{visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

module.exports = roleHealer;