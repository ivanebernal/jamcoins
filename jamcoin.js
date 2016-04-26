fs = require("fs");
fs.readFile("C-large.in", "utf-8", function(err, data){
	if (err) return console.log(err);
	var output = "Case #1:\n";
	var lines = data.split("\n");
	var N = parseInt(lines[1].split(" ")[0]);
	var J = parseInt(lines[1].split(" ")[1]);
	var num = 2;
	for(var m = 0; m < J; m++){
		var preJamcoin = num.toString(2).split("");
		var jamcoin = new Array(N-preJamcoin.length-2).fill('0').concat(preJamcoin);
		var jamVer;
		while(!(jamVer = isJamcoin(jamcoin))){
            num++;
			preJamcoin = num.toString(2).split("");
			jamcoin = new Array(N-preJamcoin.length-2).fill('0').concat(preJamcoin);
		}


		if(jamcoin.length < N-2){ 
			var a = jamcoin.length+2;
			for(var k= 1; k <= N-a; k++) jamcoin.unshift('0');
		}
        var divisorsArray = jamVer.join(" ");
		var finalJamcoin = jamcoin.join("");
		output += "1" + finalJamcoin + "1 " + divisorsArray + "\n";
        num++;
	}
    
	fs.writeFile("Output.txt", output, function(err){
		if(err) return console.log(err);
		console.log("File was saved!");
	});
});

var isJamcoin = function(number){
	var divisors = [];
	for(var i = 2; i <=10; i++){
        var convertedAndDivided;
		if((convertedAndDivided = convertAndDivide(number, i))) {
            divisors.push(convertedAndDivided);  
        } 
		else divisors.push(null); 
	}
	if(divisors.indexOf(null) === -1) return divisors;
	return null;
}

var convertAndDivide = function(number, base){
	var convertedNumber = 0;
	var divisor = 0;
    var num = number.concat(['1']);
    num.reverse();
	for(var i = 0; i < num.length; i++){
		if(num[i] === '1') convertedNumber += Math.pow(base,i);
	}
	convertedNumber += Math.pow(base,num.length);
	var limit = Math.round(Math.sqrt(convertedNumber));
    for(var i = 2; i < limit; i++){
		if(convertedNumber%i === 0){
			divisor = i;
			break;
		}
		divisor = null;
	}
	return divisor;
}