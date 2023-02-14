import type { Principal } from '@dfinity/principal';
export type List = [] | [[bigint, List]];
export interface Transcation { 'typeOfTranscation' : string, 'amount' : bigint }
export interface _SERVICE {
  'checkBalance' : () => Promise<bigint>,
  'temp' : () => Promise<Array<Transcation>>,
  'topUp' : (arg_0: bigint) => Promise<undefined>,
  'viewAllAmounts' : () => Promise<List>,
  'viewAllTranscation' : () => Promise<bigint>,
  'withdraw' : (arg_0: bigint) => Promise<undefined>,
}
