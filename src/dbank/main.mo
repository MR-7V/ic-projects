import Debug "mo:base/Debug";
import Array "mo:base/Array";
import List "mo:base/List";
import Text "mo:base/Text";
import Map "mo:base/HashMap";




actor DBank{
  stable var currentBalance: Nat = 1000;
  //Debug.print(debug_show(currentBalance));
  
  public func topUp(amount: Nat){
    createTranscations(amount, "Credit");
    currentBalance+=amount;
    //Debug.print(debug_show(currentBalance)); 
  };
  
  public func withdraw(amount: Nat){
    let temp_value: Int = currentBalance - amount;
    if(temp_value >= 0){
      createTranscations(amount, "Debit");
      currentBalance-= amount;
      //Debug.print(debug_show(currentBalance));
    }else{
      Debug.print("Insuffficent Balance");
    }
  }; 

  

  public query func checkBalance(): async Nat{
    return currentBalance;
  };

  public type Transcation = {
    typeOfTranscation : Text;
    amount : Nat;
  };

  stable var transcations : List.List<Transcation> = List.nil<Transcation>();

  private func createTranscations(num: Nat,text: Text) {
    let newTranscation : Transcation = {
        typeOfTranscation = text;
        amount = num;
    };
    transcations := List.push(newTranscation, transcations);
    Debug.print(debug_show(transcations));
  };

  // to return type and amount
  //let alltrans = Map.HashMap<Name, Entry>(0, Text.equal, Text.hash);

  //stable var amount : List.List<Nat> = List.nil<Nat>();
  /*public func getTranscation(): {
    for (trans in List.toArray(transcations).vals()) {
      //Debug.print(debug_show(trans.typeOfTranscation,trans.amount));
      alltrans.put(trans.typeOfTranscation,trans.amount);
    };
    return alltrans;
  };*/

  public query func viewAllTranscation():  async Nat{
    for (trans in List.toArray(transcations).vals()) {
      Debug.print(debug_show(trans.amount));
    };
    return currentBalance;
  };

  var amount  : List.List<Nat> = List.nil<Nat>();
  public query func viewAllAmounts(): async List.List<Nat> {
    for (trans in List.toArray(transcations).vals()) {
      amount := List.push(trans.amount, amount);
    };
    return amount;
  };

  public query func temp(): async [Transcation] {
    return List.toArray(transcations);
  }
}

