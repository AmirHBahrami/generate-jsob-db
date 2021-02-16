// Note : the operateKeys
// operateKey={name='shit',family='wank'}
module.exports=function({	operateKeys, ending="gmail.com" }){
	let {name,family}=operateKeys;
	name=name.toLowerCase();
	family=family.toLowerCase();
	return name+'.'+family+'@'+ending;
};
