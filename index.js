/*
 * run this module by giving the command "node index.js" along with these parameters in the same
 * order as shown here: source file, result file, number of wanted rows (objects) to be produced
 * NOTE: the src file shold be located in files/ directory , but you only need to type the name
 * on the console when giving it as an argument , And it should not have .json as the argument
 */

 /**
	* v1.2.0:
	* -The next level is: to include a complete part of a database in another: for example contacts.json
	* specifies many fileds, which are similar to those of users.json, in this next level, contacts.json
	* will be able to address "_destructure":{"includeExtraDataBase":"users"} to produce an object, like
	* {...user, [the rest of contacts-db]}. The mechanism is like inheritence in a badly written SQL schema!
	* -Also will use specialised libraries to work with arguments so you wouldn't have to give all the console
	* arguments in an ordered manner (rather via flags)
 */

const fs=require('fs');
const generateDB=require('./src/generateDB');

// TODO: replace the seperator characters with path.sep
const source=require(`${process.argv[2]?process.argv[2]:'./files/sources/source'}.json`);
const resFile=`${process.argv[3]?process.argv[3]:'./files/results/result'}.json`;
const number=process.argv[4]?Math.round(Number(process.argv[4])):20;

// always test what you have given as input!
//console.log(`source:${source}\nresFile:${resFile}\nnumber:${number}`);

let res=generateDB(source.srcs,{...source.options?source.options:null,limit:number});
let json=JSON.stringify(res,null,'\t');

// to test before writing (you can disable the writing and instead uncomment the next
// line to preview what has been produced)
//console.log(json)

fs.writeFile(resFile,json,(err,_)=>{
	if(err)
		console.log(err);
	else // can be later dependent on a flag (-v || --verbose)
		console.log(`written in ${resFile}`);
});
/**/
