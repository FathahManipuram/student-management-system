
async function a(op){
	let max = 3;
    for (let i = 0; i <= max; i++) {
      try{
		await op()
		return 

	  }catch(err){

		console.log("attemp failed: ", err.message, "i: ",i)

		console.log("Trying attempt", i);

 await new Promise((resolve)=>{
	  setTimeout(() => {
      console.log("Timer finished for i= ", i);
	  resolve()
    }, 1000 * i);
 })

	  }
    }
}


a(()=> {
	throw new Error("null")
	//console.log("resolved")
})
