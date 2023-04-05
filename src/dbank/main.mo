import Debug "mo:base/Debug";
import Array "mo:base/Array";
import List "mo:base/List";
import Text "mo:base/Text";
import Map "mo:base/HashMap";
import Time "mo:base/Time";
import Random "mo:base/Random";
import Blob "mo:base/Blob";

actor DBank {
  stable var currentBalance : Nat = 1000;
  stable var transcations : List.List<Transcation> = List.nil<Transcation>();

  //Transcation declaration
  public type Transcation = {
    transactionID : Text;
    typeOfTranscation : Text;
    amount : Nat;
    createdAt : Int;
    descriptionOfTranscation : Text;
    transactionRecipient : Text;
    phoneNumber : Text;
    emailAddress : Text;
  };

  //creates new transcaation
  private func createTranscations(num : Nat, text : Text, id : Text, description : Text, donorName : Text, phone : Text, email : Text) {
    let newTranscation : Transcation = {
      transactionID = id;
      typeOfTranscation = text;
      amount = num;
      createdAt = Time.now();
      descriptionOfTranscation = description;
      transactionRecipient = donorName;
      phoneNumber = phone;
      emailAddress = email;
    };
    transcations := List.push(newTranscation, transcations);
    Debug.print(debug_show (Time.now()));
  };

  //Function to Add fund
  public func topUp(amount : Nat, transactionID : Text, donorName : Text, phone : Text, email : Text, descriptionOfTranscation : Text) {
    createTranscations(amount, "Credit", transactionID, descriptionOfTranscation, donorName, phone, email);
    currentBalance += amount;
    Debug.print(debug_show (currentBalance));
  };

  //Fucntion to Transfer fund

  public func withdraw(amount : Nat, transactionID : Text, receiverName : Text, phone : Text, email : Text, descriptionOfTranscation : Text) {
    let temp_value : Int = currentBalance - amount;
    if (temp_value >= 0) {
      createTranscations(amount, "Debit", transactionID, descriptionOfTranscation, receiverName, phone, email);
      currentBalance -= amount;
      //Debug.print(debug_show(currentBalance));
    } else {
      Debug.print("Insuffficent Balance");
    };
  };

  //To check Balance
  public query func checkBalance() : async Nat {
    return currentBalance;
  };

  //to console all transcations on terminal.
  public query func viewAllTranscation() : async Nat {
    for (trans in List.toArray(transcations).vals()) {
      Debug.print(debug_show (trans.amount));
    };
    return currentBalance;
  };

  //To return all trasactions into list format
  public query func returnTransactions() : async [Transcation] {
    Debug.print(debug_show (List.toArray(transcations)));
    return List.toArray(transcations);
  };

};
