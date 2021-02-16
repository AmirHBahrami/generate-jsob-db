// used to pick a random provided value for the
// current key of an object in an interation
module.exports=function(arr){
	return arr[Math.floor(arr.length*Math.random())];
}
