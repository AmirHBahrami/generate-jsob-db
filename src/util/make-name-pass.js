const pickRand=require('./pick-random');

// it is to make the primary password before being
// example : amibah17 where :
// ami is the 3 first words (or less) of the name, bah is the same of the family
// 17 is a nunber that has to do with a date. ( either the birth-date or the date of the ongoing year.)
// NOTE:for now it uses the current year
module.exports=function({operateKeys}){

	let {name,family}=operateKeys;
	let first=name.substring(0,name.length>=3?3:name.length).toLowerCase(); // [3] not inclusive
	let last=family.substring(0,family.length>=3?3:family.length).toLowerCase(); // [3] not inclusive

	first+=pickRand({min:11,max:99});
	last+=pickRand({max:9});

	return first+last
};
