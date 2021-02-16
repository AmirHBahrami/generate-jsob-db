const genRandDate=require('./gen-rand-date');

// NOTE that this module is used to make a date string! in a MySQL-friendly format.
module.exports=function({year_min=1970,year_max=2022,month_min=0,month_max=11,day_min=0,day_max=30}){

	let dateObj=genRandDate({year_min,year_max,month_min,month_max,day_min,day_max});
	let monthStr=dateObj.getMonth()+1;
	let dayStr=dateObj.getDate()
	
	if(monthStr<10) monthStr='0'+monthStr;
	if(dayStr<10) dayStr='0'+dayStr;

	let dateStr=`${dateObj.getFullYear()}-${monthStr}-${dayStr}`;

	return dateStr;
}
