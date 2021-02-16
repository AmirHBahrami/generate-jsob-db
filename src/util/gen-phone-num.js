const pickRandNum=require('./pick-random');

// makes a random phone number out of two part "precode","digitsNum"
// NOTE: returns a string for better manipulation
// NOTE: uses pick-random
module.exports=function({precode='0049',digitsNum=10}){
	let res=precode;
	while(digitsNum>0){
		res+=pickRandNum({min:0,max:10,isPrice:false});
		digitsNum--;
	}
	return res;
};
