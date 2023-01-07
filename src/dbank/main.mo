import Debug "mo:base/Debug";

actor DBank{
  stable var currentBalance: Nat = 1000;
  //currentBalance := 100;
  Debug.print(debug_show(currentBalance));
  
  public func topUp(amount: Nat){
    currentBalance+=amount;
    Debug.print(debug_show(currentBalance));
  };
  
  public func withdraw(amount: Nat){
    let temp_value: Int = currentBalance - amount;
    if(temp_value >= 0){
      currentBalance-= amount;
      Debug.print(debug_show(currentBalance));
    }else{
      Debug.print("Insuffficent Balance");
    }
  }; 

  public query func checkBalance(): async Nat{
    return currentBalance;
  }
}
