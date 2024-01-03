import * as web3 from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from '@solana/wallet-adapter-react';
import idl from './sc/idl/smart_contract.json';
import { Program } from "@project-serum/anchor";

// @ts-ignore
const SMART_CONTRACT_ID = new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_SMART_CONTRACT_ID);
const PREFIX_BET = "coinflip_bet";
const PREFIX_CONFIG = "coinflip_config";
const PREFIX_FEE = "coinflip_fee";


export const getConnection = (cluster: string) => {
  if (cluster === "localhost" ) {
    const connection = new web3.Connection(
      'http://localhost:8899',
      'confirmed'
    );
    return connection;

  } else {
    const connection = new web3.Connection(
      // @ts-ignore
      web3.clusterApiUrl(cluster),
      'confirmed'
    );
    return connection;
  }
}


export const getProgram = async (
    cluster: string,
    wallet: AnchorWallet,
    publicKey: anchor.web3.PublicKey
  ) => {

  let provider = new anchor.AnchorProvider(
    getConnection(cluster),
    wallet,
    anchor.AnchorProvider.defaultOptions()
  );
  anchor.setProvider(provider);

  const program = new Program(idl, SMART_CONTRACT_ID, provider);
  return program;
}


export const getBetPda = async (program: anchor.Program<anchor.Idl>, _publicKey: web3.PublicKey) => {
  const [_bet_pda, _bump] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(PREFIX_BET)),
      _publicKey.toBuffer(),
    ],
    SMART_CONTRACT_ID
  );

  return {_bet_pda, _bump};
}

export const getConfigPda = async (program: anchor.Program<anchor.Idl>) => {
  const [_config_pda, _bump] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(PREFIX_CONFIG)),
    ],
    SMART_CONTRACT_ID
  );

  return {_config_pda, _bump};
}

export const getFeePda = async (program: anchor.Program<anchor.Idl>) => {
  const [_fee_pda, _bump] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(PREFIX_FEE)),
    ],
    program.programId
  );

  return {_fee_pda, _bump};
}