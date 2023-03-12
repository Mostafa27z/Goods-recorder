let local = JSON.parse(localStorage.getItem("goods")) || [];
let val = document.querySelectorAll(".num");
let sumbit = document.querySelector("form");
let g = 0;
let name = document.querySelector("#name");
let data = document.querySelector("tbody");

	for (var i = 0; i < val.length-2; i++) {
		val[i].addEventListener("keyup", ()=>{
			

			val[4].value =Math.round( +val[0].value *  ( +val[1].value / 100) + +val[0].value  - +val[0].value * (+val[2].value / 100) + +val[3].value);
			
		})
	}

function dis() {
	data.innerHTML = "";
	for (var i = 0; i < local.length; i++) {
	
	data.innerHTML += `<td>${i+1}</td>
			<td>${local[i].name}</td>
			<td>${local[i].price}</td>
			<td>${local[i].tax}</td>
			<td>${local[i].dis}</td>
			<td>${local[i].trans}</td>
			<td>${local[i].total}</td>
			<td>${local[i].date}</td>
			<td class="ed"><button>Edit</button></td>
			<td class="del"><button>Del</button></td>`
	}
	let del = document.querySelectorAll(".del");
let ed = document.querySelectorAll(".ed");


ed.forEach((e,j) =>{
	e.addEventListener("click", ()=>{
		
			document.querySelector("#sub").value="Update";
			val[5].style.display="none";
			name.value = local[j].name;
			val[0].value = local[j].price;
			val[1].value = local[j].tax;
			val[2].value = local[j].dis;
			val[3].value = local[j].trans;
			val[4].value = local[j].total;
			g = j;
	})
})
	del.forEach((d,i) => {
	d.addEventListener("click" ,() => {
		local.splice(i,1);
		localStorage.setItem("goods", JSON.stringify(local));
		dis();
	
	});
});
	
}
dis();
sumbit.addEventListener("submit", (e)=>{
	let date = new Date();
	let d = `${+date.getFullYear()} / ${date.getMonth() + 1} / ${+date.getDate()}`
	e.preventDefault();
if (document.querySelector("#sub").value == "Submit") {
	let z= true;

	for (var i = 0; i < val.length; i++) {
		if(val[i].value){

		}
		else{
			z= false;
			break;
		}
	}
	if (z && name.value){
		let good = {
			name : name.value,
			price : val[0].value,
			tax: val[1].value,
			dis : val[2].value,
			trans: val[3].value,
			total: val[4].value,
			date : d
		}
		for (var i = 0; i < val[5].value; i++) {
			local.push(good);
		}
		localStorage.setItem("goods", JSON.stringify(local));
		dis();
		e.target.reset();
	}

	else{
		alert("complete the inputs");
	}
	}
	else{
		let edit = {
			name : name.value,
			price : val[0].value,
			tax: val[1].value,
			dis : val[2].value,
			trans: val[3].value,
			total: val[4].value,
			date : d
		}
		local[g] = edit;
		document.querySelector("#sub").value = "Submit";
			val[5].style.display="inline-block";
			localStorage.setItem("goods", JSON.stringify(local));
		dis();
		e.target.reset();
	}
	
});
