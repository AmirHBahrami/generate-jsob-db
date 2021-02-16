// picks a random number (with range)
module.exports=function({min=0,max}){
	let num=Math.floor((max-min)*Math.random())+min;
	return num;
};
