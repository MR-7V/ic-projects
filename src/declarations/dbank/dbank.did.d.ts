import type { Principal } from '@dfinity/principal';
export interface Transcation {
  'typeOfTranscation' : string,
  'transactionRecipient' : string,
  'createdAt' : bigint,
  'descriptionOfTranscation' : string,
  'emailAddress' : string,
  'phoneNumber' : string,
  'amount' : bigint,
  'transactionID' : string,
}
export interface _SERVICE {
  'checkBalance' : () => Promise<bigint>,
  'returnTransactions' : () => Promise<Array<Transcation>>,
  'topUp' : (
      arg_0: bigint,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: string,
      arg_5: string,
    ) => Promise<undefined>,
  'viewAllTranscation' : () => Promise<bigint>,
  'withdraw' : (
      arg_0: bigint,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: string,
      arg_5: string,
    ) => Promise<undefined>,
}
