const pickRand=require('./pick-random');

// NOTE : year_max should be updated, but a methodic approach would be better.
// NOTE : day_max is set to 30, since not everymonth has a 31st day.
module.exports=function({year_min=1970,year_max=2022,month_min=0,month_max=11,day_min=0,day_max=30}){

	let y=pickRand({min:year_min,max:year_max});
	let m=pickRand({min:month_min,max:month_max});
	let d=pickRand({min:day_min,max:day_max});

	return new Date(y,m,d);

};
