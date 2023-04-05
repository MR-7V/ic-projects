export const idlFactory = ({ IDL }) => {
  const Transcation = IDL.Record({
    'typeOfTranscation' : IDL.Text,
    'transactionRecipient' : IDL.Text,
    'createdAt' : IDL.Int,
    'descriptionOfTranscation' : IDL.Text,
    'emailAddress' : IDL.Text,
    'phoneNumber' : IDL.Text,
    'amount' : IDL.Nat,
    'transactionID' : IDL.Text,
  });
  return IDL.Service({
    'checkBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'returnTransactions' : IDL.Func([], [IDL.Vec(Transcation)], ['query']),
    'topUp' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        ['oneway'],
      ),
    'viewAllTranscation' : IDL.Func([], [IDL.Nat], ['query']),
    'withdraw' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        ['oneway'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
