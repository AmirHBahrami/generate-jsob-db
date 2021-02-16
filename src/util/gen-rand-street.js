const selectRandMember=require('./select-rand-member');
const pickRandom=require('./pick-random');

module.exports=function({numbers,names}){
	let street=`${pickRandom(numbers)},${selectRandMember(names)} str.`;
}
