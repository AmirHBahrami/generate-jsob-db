/*
// this module is useless. it's just here for the record...
const selectRandMember=require('select-rand-member');

/* in this meta-module provided: a func to generate a table based on another table
 and specified fields in that table:
 { foreignTable: Object , foreingFields : ['foreignField1','fF2',...] , generatorFunc: function , [agrs] : [possible args] }
 */
/*
// caching the already loaded .json source files.
// this is bc the foreignTable argument is supposed to be the name of a .json file,
// containing the src from another database, and that source should then be loaded,
// and cached for later acceleration of work-spead...
const cached={};


// only gets together a new set of arguments for the generatorFunc and gives them to it...
// what this function returns is only suitable for ONE FILED of ONE OBJECT AT A TIME,
// meaning that only one key of the current object is produced for it.
// NOTE : generatorFunc is in most cases another random generating function which takes in (a) filed(s),and returns a randomly
// selected value from the source of it.
module.exports=function(foreignTableName,foreignFileds,generatorFunc=selectRandMember,args=null){

	// checking if the foreignTable is already read and saved in the cache.
	let foreignTableSource=null;
	for (let c of cached){
		if(c[foreignTableName]){
			foreignTableSource=c;
			break;
		}
	}

	// if not, then require and cache the fucker.
	if(!foreignTableSource){
		foreignTableSource=require(`../files/${foreignTableName}`);
		cached.push(foreignTableSource);
	}

	// if no generatorFunc provided randomly just selects the fields from the foreignTable:
	let selectedRandomly={}
	for(let ff of foreginFileds)
		selectedRandomly[ff]=generatorFunc(foreignTableSource[ff]);

	return selectedRandomly;

};
/**/


module.exports=function(){

	
}
