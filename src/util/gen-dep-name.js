const selectRandMember=require('./select-rand-member');
const cache={};

module.exports=function({names}){

	let name=selectRandMember(names);

	if(cache[name]){
		cache[name]++;
		name+=cache[name];
	}

	else
		cache[name]=1;

	return name;
};
