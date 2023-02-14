import { dbank } from "../../declarations/dbank";



window.addEventListener("load", async function() {
  //console.log("Finished loading");
  //update();
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = currentAmount;
});

document.querySelector("form").addEventListener("submit",async function(event){
  //console.log("submitted");

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled",true);

  if (document.getElementById("input-amount").value.length != 0){
    await dbank.topUp(inputAmount);
    document.getElementById("input-amount").value = "";
  }
  else if (document.getElementById("withdrawal-amount").value.length != 0){
    await dbank.withdraw(outputAmount);
    document.getElementById("withdrawal-amount").value = "";
  }

  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = currentAmount;

  button.removeAttribute("disabled");
});

