What is this project?
This program generates a json file for you with the values that you can give it, and the methods you provide it.

**********
How it works:
To generate one json file you have to specify three things at the beginning:
1. a json source file
2. where the program should save it's result
3. how many objects shuold your json file have

the 2nd and third are self explainatory, but as for the source file, you should provide a json file (in any directory)
with the specifications about one object in the final result file. You then give the address of this file to the 'node' 
or 'js' command when you want to run the program.

**********
In the source file you should define two main fields:

1. "options": an optional field, which for now (v1.0.0) only determines which id format should a field have,
and what should the starting id (a number) be. this field is optional and if you don't include it, the program
will take care of it for you.

2. "srcs" : srcs describes what fields each object has and what possible values each of those fileds can have. 
take the following as an example:

	"srcs": {
	
		"country":["Germany","USA","Russia","Iran"],
		"language":["German","English","Russian","Farsi"]
	}

in this example, each object in the final json file, will have two fields, "country" and "language".
The value of each is independant of the other field, and is random, for example an object with
"country" : "Germany" and "language" : "Russian" is possible!

this might not make sense in this particular case, but it certainly does, if you know what you're doing!

**********
Until now everything was just a call from "Math.random" essentially! but it now gets a bit more sophesticated.
Some fileds may require calculations, in those cases , you should tell the program that it uses a function,
and what the function's name and arguments might be.

An example would be the generation of a phone number. It would be painful to include all the possible 10-digit
phone numbers in an array! 

In this case you can simply turn the wanted field in the "srcs" of the source file,
to a nested object with these fields:

a) "generatorFunc" is the name of the function who generates this field (no surprise there!). if you specify this field, 
you should provide a module with the same name in the src/util/ and then export it in the src/util/index.json , so that
it actually exists during the run-time! in src/util/index.js whatever that is exported should exactly match the mentioned 
named in the "generatorFunc" field. for example if it's called "srcs":"phoneNumber" , you should export it like below:

	srcs/util/index.js
	exports.phoneNumber=require("./gen-phone-number");

and note that ONLY FUNCTIONS should be exported in the util/index.js . This ofcourse doesn't mean that you cannot export
object from the module itself (in this case, gen-phone-number.js) but rather that, in the exports object of the util/index.js
the type of the name determined by "generatorFunc" should be a function.

b) "args" : maybe you want to re-use your module, so it's designed so, that dynamically you can give different args to it. Now
these args are all defined by your own hand, when you were writing the module. in other words: these are the args that your module
will receive during the run-time to calculate the wanted field. So it's completely on you, whatever that should happen to them poor args!

in the case of phone number, it can mean producing different phone number format when it comes to US , rather than Germany. To do so,
simply have the args match whatever you want.

To demonstrate the whole thing, here's an example:

	"srcs":{
		"phoneNumber":{

			"generatorFunc":"generatePhoneNumber",
			"args":{"precode":"0049","digitsNum":1}
		}
	}

and then at src/util:

	/src/util/gen-phone-number.js:
	module.exports=function({precode,digitsnum}){ /* do some calculations*/ }
	
now at src/util/index:
	
	/src/util/index.js
	exports.generatePhoneNumber=require('./gen-phone-num');

**********
How about producing a filed based on the value of already produced fields?
well that mechaism is there too! you can add a simple field called "opearteKeys" 
to the corresponding field in the "srcs" in source file (I know, I'm not a master
of naming things...)

Doing so tells the program that this particular field is to be calculated from the fields
that are already produced (sofar) and that means you need to put the current field (the one
who has "operateKeys") in the source file, in lower order.

to escape the complexity, an example would be the email. Say, you're making a json for the 
employees and all of them receive a free email profile when they show up for the job, and their
email has a general format, namely: 
	
	[firstName].[lastName]@[ending]
	
in this case, you cannot simply let the program "guess" what the first and last names are, you 
need to tell it that those fields are already produced, like this:

	"srcs":{
		"email":{
			"oprateKeys":["firstName","lastName"],
			"generatorFunc" : "generateEmail",
			"args":{"ending":"blackhand.nod"}
			
		}
	}

now this way, the program knows that to produce the email field, it needs to pass the generatorFunc
(once again, provided by your own hands!). It also passes the args, so it's quite fluid...

NOTE: ofcourse, the fields in an object are not hirearchical, but as far as the opearteKeys mecahnism
is concerned, please note that I am using a Object.keys() to detemine the keys of "srcs" in the program,
so (for now, at least!) you need to deal with as described.

**********
How to run the program, now?!

You simply open your terminal, assuming you have the node.js, you go to the directory, where you've downloaded
and unpacked this program, and type this command:

	node index.js path_to_the_source_file path_to_the_result_file number_of_objects_to_make

and enjoy the scenery!

Now if you don't want to provide a path, there are default options:
	
	source path = "./files/sources/source.json"
	result file = "./files/results/result.json"
	number = 20

**********
What next?
 
Well, I'm willing to take this project forward, and in the next phases it uses nested db production, which means
you can ...destructure an already produced object, based on another source json file, in the current one.

an example would be : instead of redundently writing all the fields of users-source.json in contancts-source.json,
you should provide a "_destruct"  field in the contacts-source.json and that will do the job.

ofcourse, you may not need all the fields in the nested db, in which case you can provide the names of the wanted
fields in "_destruct".
