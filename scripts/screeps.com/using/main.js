var roles = [];
var roleHarvester = require('role.harvester');
roles['harvester'] = roleHarvester;

var roleUpgrader = require('role.upgrader');
roles['upgrader'] = roleUpgrader;

var roleFighter = require('role.fighter');
roles['fighter'] = roleFighter;

var roleBuilder = require('role.builder');
roles['builder'] = roleBuilder;

var roleHealer = require('role.healer');
roles['healer'] = roleHealer;

var roleReserver = require('role.reserver');
roles['reserver'] = roleReserver;

var superRoleBaseTower = require('superRole.baseTower');

cnt = [];

MIN_HARVESTER = 3;

roomNeedingEnergyCreepsCnt = [];
roomNeedingHealCreeps = [];


roomNeedingChargeTowers = [];
roomNeedingRepairStructures = [];
roomNeedingBuildConstructionSite = [];



enemiesInMyBase = new Array();
ENEMY_IN_MY_BASE = 0


TOWER_NEED_CHARGE_NUM = 0.8;
STRUCTURE_NEED_REPAIR_NUM = 0.8;

RAMPART_HP = 1000;
MEMORY_CLEAR_TIME = 100;


defendBase = function(){
    if(!Memory.structures){
        Memory.structures = {};
    }
    if(
        (
            enemiesInMyBase = Game.spawns["Spawn1"].room.find(FIND_CREEPS, {
                filter: (object) => {
                    return (!object.my);
                }
            })
        ).length > 0) {
        Memory.WAR_MODE = 1;
        ENEMY_IN_MY_BASE = 1;
    }
    if(Game.spawns["Spawn1"].hits < Game.spawns["Spawn1"].hitsMax/2){
        Game.spawns["Spawn1"].room.controller.activateSafeMode();
    }
} 

initLists = function(){
    roomNeedingEnergyCreepsCnt = [];
    for(var name in Game.creeps){
        if(!roomNeedingEnergyCreepsCnt[Game.creeps[name].room]){
            roomNeedingEnergyCreepsCnt[Game.creeps[name].room] = [];
        }
        if(Game.creeps[name].carry.energy < Game.creeps[name].carryCapacity){
            if(!roomNeedingEnergyCreepsCnt[Game.creeps[name].room][Game.creeps[name].memory.role]){
                roomNeedingEnergyCreepsCnt[Game.creeps[name].room][Game.creeps[name].memory.role] = 0;
            }
            roomNeedingEnergyCreepsCnt[Game.creeps[name].room][Game.creeps[name].memory.role]++;
        }
    }
    
    roomNeedingHealCreeps = [];
    for(var name in Game.creeps){
        if(!roomNeedingHealCreeps[Game.creeps[name].room]){
            roomNeedingHealCreeps[Game.creeps[name].room] = new Array();
        }
        if(Game.creeps[name].hits < Game.creeps[name].hitsMax){
            roomNeedingHealCreeps[Game.creeps[name].room].push(Game.creeps[name]);
        }
    }
    
    
    roomNeedingChargeTowers = [];
    for(var name in Game.structures){
        if(Game.structures[name].structureType == STRUCTURE_TOWER && Game.structures[name].energy < Game.structures[name].energyCapacity * TOWER_NEED_CHARGE_NUM){
            if(!roomNeedingChargeTowers[Game.structures[name].room]){
                roomNeedingChargeTowers[Game.structures[name].room] = new Array();
            }
            roomNeedingChargeTowers[Game.structures[name].room].push(Game.structures[name]);
        }
    }
    
    // roomNeedingRepairStructures = [];
    // for(var name in Game.structures){
    //     if((Game.structures[name].structureType == STRUCTURE_RAMPART || Game.structures[name].structureType == STRUCTURE_WALL) && Game.structures[name].hits >= RAMPART_HP){
    //         continue;
    //     }
    //     if(Game.structures[name].hits < Game.structures[name].hitsMax * STRUCTURE_NEED_REPAIR_NUM){
    //         if(!roomNeedingRepairStructures[Game.structures[name].room]){
    //             roomNeedingRepairStructures[Game.structures[name].room] = new Array();
    //         }
    //         roomNeedingRepairStructures[Game.structures[name].room].push(Game.structures[name]);
    //     }
    // }
    
    roomNeedingRepairStructures = [];
    for(var name in Game.rooms){
        targets = Game.rooms[name].find(FIND_STRUCTURES, {
            filter: (object) => {
                if((object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_WALL) && object.hits >= RAMPART_HP){
                    return false;
                }
                if(object.hits < object.hitsMax * STRUCTURE_NEED_REPAIR_NUM){
                    return true;
                }
                return false;
            }
        });
        for(var tname in targets){
            if(!roomNeedingRepairStructures[targets[tname].room]){
                roomNeedingRepairStructures[targets[tname].room] = new Array();
            }
            roomNeedingRepairStructures[targets[tname].room].push(targets[tname]);
        }
    }
    
    roomNeedingBuildConstructionSite = [];
    for(var name in Game.constructionSites){
        if(!roomNeedingBuildConstructionSite[Game.constructionSites[name].room]){
            roomNeedingBuildConstructionSite[Game.constructionSites[name].room] = new Array();
        }
        roomNeedingBuildConstructionSite[Game.constructionSites[name].room].push(Game.constructionSites[name]);
    }
};

buildCreeps = function(){
        for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    for(var name in roles){
        cnt[name] = 0;
    }
    for(var name in Game.creeps){
        cnt[Game.creeps[name].memory.role]++; 
    }
    

    console.log("now I have:");
    for(var name in cnt){
        console.log( name + ":" + cnt[name]);
    }
    console.log(new Date());
    
    if(cnt["harvester"] < MIN_HARVESTER){
        Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'harvester' + parseInt(Math.random() * 8999 + 1000), {role: 'harvester'});
    }else{
        if(Memory.WAR_MODE && cnt["healer"] < cnt["fighter"]/3-1){
            Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL], 'healer' + parseInt(Math.random() * 8999 + 1000), {role: 'healer'});
        } else 
        if(Memory.WAR_MODE && cnt["fighter"] < cnt["harvester"]){
            Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,ATTACK,MOVE,MOVE], 'fighter' + parseInt(Math.random() * 8999 + 1000), {role: 'fighter'});
            //Game.spawns['Spawn1'].createCreep([ATTACK,ATTACK,ATTACK,MOVE], 'fighter' + parseInt(Math.random() * 899 + 100), {role: 'fighter'});
        } else if(cnt["builder"] < 5 && cnt["builder"] < cnt["harvester"]/2 + 2){
            Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'builder' + parseInt(Math.random() * 8999 + 1000), {role: 'builder'});
            //Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], 'builder' + parseInt(Math.random() * 899 + 100), {role: 'builder'});
        } else if(cnt["upgrader"] < 10 && cnt["upgrader"] < cnt["harvester"]){
            Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],'upgrader' + parseInt(Math.random() * 8999 + 1000), {role: 'upgrader'});
            //Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE],'upgrader' + parseInt(Math.random() * 899 + 100), {role: 'upgrader'});
        } else{
            Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'harvester' + parseInt(Math.random() * 8999 + 1000), {role: 'harvester'});
            //Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], 'harvester' + parseInt(Math.random() * 899 + 100), {role: 'harvester'});
        }
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
};

runCreeps = function(){

        
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roles[creep.memory.role].run(creep);
    }
    
    for(var name in Game.structures){
        var structure = Game.structures[name];
        if(structure.structureType == STRUCTURE_TOWER){
            if(structure.hits < structure.hitsMax / 2){
                Game.spawns["Spawn1"].room.controller.activateSafeMode();
            }
            superRoleBaseTower.run(structure);
        }
        //structure.memory.role;
    }
};

//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------


module.exports.loop = function () {
    if(!Memory.CLEAR_TIME){
        Memory.CLEAR_TIME = 1;
    }
    if(Memory.CLEAR_TIME > MEMORY_CLEAR_TIME){
        Memory.CLEAR_TIME = 0;
    }
    Memory.CLEAR_TIME++;
    defendBase()
    initLists();
    buildCreeps();
    runCreeps();
}