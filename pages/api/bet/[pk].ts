// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import * as anchor from "@project-serum/anchor";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { SmartContract } from "../../../lib/sc/types/smart_contract";
import idl from '../../../lib/sc/idl/smart_contract.json';
import * as web3 from "@solana/web3.js";
import bs58 from 'bs58';
import {
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import base58 from "bs58";

import { 
    getConnection,
    getProgram,
    getBetPda,
    getConfigPda,
    getFeePda
  } from '../../../lib/utils';

// @ts-ignore
const SMART_CONTRACT_ID = new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_SMART_CONTRACT_ID);
// @ts-ignore
const PAYER = web3.Keypair.fromSecretKey(bs58.decode(process.env.PAYER_SECRET));
// @ts-ignore
const CLUSTER = process.env.NEXT_PUBLIC_NODE_CLUSTER as string;
const wallet = new anchor.Wallet(PAYER);


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const _publicKey = req.query.pk as string;

    console.log('_publicKey')
    console.log(_publicKey)

    if (!_publicKey) {
        res.status(500).send({message: "public key is required"});
        return;
    }

    let publicKey = new web3.PublicKey(base58.decode(_publicKey));

    const program = await getProgram(CLUSTER, wallet, publicKey);
    if (!program) {
      console.error('Could not connect to the program');
      return null;
    }

    const _connection = program.provider.connection;

    const { _bet_pda, _bump } = await getBetPda(program, publicKey);
    const { _config_pda } = await getConfigPda(program);

    // call the smartcontract to initialize the bet
    // and make the deposit all in one transaction
    const tx = new web3.Transaction();

    try {
        tx.add(
            program.instruction.finalizeBet({
            accounts: {
                player: publicKey,
                master: PAYER.publicKey,
                betAccount: _bet_pda,
                configAccount: _config_pda,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            },
            signers: [PAYER],
            })
        );
        await web3.sendAndConfirmTransaction(_connection, tx, [PAYER]);

        res.status(200).send({sucess: 'success'})
    } catch (e) {
        res.status(200).send({error: 'Could`t finalize the bet'})
    }
}

export default handler;