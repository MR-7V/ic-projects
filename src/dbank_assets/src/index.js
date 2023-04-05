import { dbank } from "../../declarations/dbank";


function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="message">${message}</div>
    <button class="close">&times;</button>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);

  const closeButton = notification.querySelector('.close');
  closeButton.addEventListener('click', () => {
    notification.remove();
  });
}



async function getTransactionData(){
  let allTransactionsData = await dbank.returnTransactions();
  PopulateTable(allTransactionsData)
  return allTransactionsData
}


async function PopulateTable(transactionList) {

  var myTable = document.getElementById("transactions-table");
  const tbody = myTable.querySelector('tbody');
  tbody.innerHTML = '';
        
  transactionList.forEach(transaction => {
    const row = document.createElement('tr');
    const createdAt=  convertTime(transaction.createdAt)
    row.innerHTML = `
      <td>${transaction.transactionID}</td>
      <td>${transaction.typeOfTranscation}</td>
      <td>${transaction.descriptionOfTranscation}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.transactionRecipient}</td>
      <td>${transaction.emailAddress}</td>
      <td>${transaction.phoneNumber}</td>
      <td>${createdAt}</td>
    `;
    tbody.appendChild(row);
  });
}

async function filterTable(input) {
  let transactions=await getTransactionData();
  const filteredData = transactions.filter(transaction => transaction.transactionRecipient.toLowerCase().includes(input.value.toLowerCase()));
  PopulateTable(filteredData);
}


const selectElement = document.getElementById("filter");



selectElement.addEventListener("change", async() => {
  const selectedValue = selectElement.value;
  let transactions=await getTransactionData();
  console.log("Selected value:", selectedValue);
  if( selectedValue==='All'){
    PopulateTable(transactions)
    return 
  }
  
  const filteredData = transactions.filter(transaction => transaction.typeOfTranscation.toLowerCase().includes(selectedValue.toLowerCase()));
  console.log(filteredData)
  PopulateTable(filteredData)
});


const filterInput = document.querySelector('.filter-input');
   // Add event listener to filter input
filterInput.addEventListener('input', () => filterTable(filterInput));







getTransactionData();



//convert time 

 function convertTime(timestamp) {
  const newdate=(BigInt(timestamp)/1000000n)
  const date = new Date(Number(newdate));
  const options = { timeZone: 'Asia/Kolkata', hour12: true };
  const localTimeString = date.toLocaleString('en-IN', options);
  console.log(localTimeString);
  return localTimeString;
}

const update =async() =>{
  //update();
  const currentAmount = await dbank.checkBalance();
  // const data=document.getElementsByClassName=
  // document.getElementById("value").innerText = currentAmount;
  const data=document.getElementsByClassName("current-amount")
  for (const element of data) {
    element.innerText = currentAmount;
  }
}

window.addEventListener("load", async function() {
  //console.log("Finished loading");
  update();
});




document.getElementById("add-amount").addEventListener("submit",async function(event){
  event.preventDefault()
console.log("add amount");
  const button = event.target.querySelector("#submit-btn");
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const donorName = document.getElementById("input-name").value;
  const email = document.getElementById("input-email").value;
  const phoneNo = document.getElementById("input-phone").value;
  const description=document.getElementById("input-description").value;
  const id=crypto.randomUUID()
  button.setAttribute("disabled",true);

    //topUp(amount : Nat, transactionID : Text, donorName : Text, phone : Text, email : Text, descriptionOfTranscation : Text)
    await dbank.topUp(inputAmount,id,donorName,phoneNo,email,description); 
    update();

    const message=`amount added$ :${inputAmount}`
    showNotification(message)

    document.getElementById("input-amount").value = "";
    document.getElementById("input-email").value = "";
    document.getElementById("input-phone").value = "";
    document.getElementById("input-description").value = "";
    document.getElementById("input-name").value="";
  button.removeAttribute("disabled");
});




document.getElementById("send-amount").addEventListener("submit",async function(event){
  event.preventDefault()
  const button = event.target.querySelector("#transfer-btn");
  const transferAmount =parseInt( document.getElementById("transfer-amount").value);
  const reciverName = document.getElementById("receiver-name").value;
  const email = document.getElementById("receiver-email").value;
  const desc = document.getElementById("transfer-description").value;
  const phoneNo = document.getElementById("receiver-phone").value;
  button.removeAttribute("disabled");
  const id = crypto.randomUUID()
  button.setAttribute("disabled",true);
    await dbank.withdraw(transferAmount, id, reciverName, phoneNo, email, desc);
    update();
    const message=`amount transfered$ :${transferAmount}`
    showNotification(message)
    document.getElementById("transfer-amount").value = "";
    document.getElementById("receiver-name").value = "";
    document.getElementById("receiver-email").value = "";
    document.getElementById("transfer-description").value = "";
    document.getElementById("receiver-phone").value="";
    
  button.removeAttribute("disabled");


  
});







