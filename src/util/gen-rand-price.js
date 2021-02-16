const pickRand=require('./pick-random');

module.exports=function({min=0,max}){
	let price=pickRand({min,max});
	if(price-1>=min)
		price--; // so that it would remain in range.
	// for more realism and how it might look on the front-end.
	price+=0.99;
	return price;
};
