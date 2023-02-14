export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Transcation = IDL.Record({
    'typeOfTranscation' : IDL.Text,
    'amount' : IDL.Nat,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Nat, List)));
  return IDL.Service({
    'checkBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'temp' : IDL.Func([], [IDL.Vec(Transcation)], ['query']),
    'topUp' : IDL.Func([IDL.Nat], [], ['oneway']),
    'viewAllAmounts' : IDL.Func([], [List], ['query']),
    'viewAllTranscation' : IDL.Func([], [IDL.Nat], ['query']),
    'withdraw' : IDL.Func([IDL.Nat], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
