const generateOneObject=require('./generate-one-object');


// to cache the already read db sources
const cachedDBs={}

// each source is { key:'origin' , arr:origins }...
// problem: determining which array is to be the main one,
// whose members are to be all iterated
// though the convention would be the first one
// NOTE: it's still repeatable, meaning that members could occur twice or more...
// NOTE: id_key : id_format+[atcual_id];
module.exports=function generateDB(srcs=[],{id_format='',id_start=1,id_key='_id',limit=10}){

	let i=0;
	let result=[];
	let keys=Object.keys(srcs);

	//console.log(srcs);

	while(i<limit){

		// <--- process of generating one object --->

		let obj={};
		let id=`${id_format}${id_start++}`;
		obj[id_key]=id;

		// should wrap this line in a do while that does it again
		// if it's already happened in the result
		for(let key of keys){


			// generating a recursive DB (the only difference is, it's nested, not in it's own file)
			if(srcs[key].generateDB){

				let dbName=srcs[key].generateDB
				let options= srcs[key].options?srcs[key].options:null;
				let newSrcs=null;

				if(cachedDBs[dbName])
					newSrcs=cachedDBs[dbName];

				else{
					newSrcs=require(`../files/${dbName}`);
					cachedDBs[dbName]=newSrcs;
				}

				// NOTE: newSrcs.srcs !  (newSrcs is stored due to cache mechanism)
				let db=generateDB(newSrcs.srcs,options);
				obj[key]=db;

			}

			/*

					"address":{
						"generateDB":"address",
						"options":{"limit":1}
					},
			*/

			/*
			// not implemented yet:
			// choosing fields,explicitly from a third party json src file.
			// NOTE : the next if clausel makes sure that in case the nested foreignTable has
			// an operateKeys or generatorFunc, it is regarded in the propper manner
			else if(srcs[key].foreignTable && srcs[key].foreignFields){
				let foreignObj={}
				generateOneObject(srcs[key].foreignTable,srcs[key].foreignFields);
				obj[key]=foreignObj;
			}/**/

			else
				generateOneObject(srcs,key,obj);
			/**/

		}
		result.push(obj);
		i++;
	}
	return result;
}
/**/
