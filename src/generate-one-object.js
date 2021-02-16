const {selectRandMember}=require('./util'); // just for more accessibilty
const util=require('./util'); // v2: in node_modules

// WARNING: obj will be mutated! (part of the plan)
// it can later be turned into some sort of pure reduce function,
// with the production of new state... (like redux)
module.exports=function(srcs,key,obj){

	// this means if the current field is being produced of another field,
	// includes { "operateKey":[keys], "genearortFunc":"func", "args":{...} }
	// [operateKey] field will be passed to the generator, here in the if clausel.
	// NOTE: the src field should be processed earlier in order for this to work,
	// therefore put it higher in the src json
	if(srcs[key].operateKeys){

		//console.log('opKeys');

		let operateKeys={} // passing the already generated keys
		for(let ok of srcs[key].operateKeys)
			operateKeys[ok]=obj[ok]; // evaluating them

		if(!util[srcs[key].generatorFunc]){
			console.log(`forgotten to include in util: ${srcs[key].generatorFunc}`);
			return;
		}

		else
			obj[key]=util[srcs[key].generatorFunc]({ // passing it along with args defined in the src json file
				...srcs[key].args,
				operateKeys
			}); // generatorFunc should be pre-defined in utils

	}

	// this provides a way to add custom functions for generating custom memebers
	else if(srcs[key].generatorFunc){ // else if, bc the both shouldn't co-exist
		//console.log('genFunc');
		obj[key]=util[srcs[key].generatorFunc](srcs[key].args); // generatorFunc should be pre-defined in utils
	}

	else
		obj[key]=selectRandMember(srcs[key]);
	//console.log(obj);
}
