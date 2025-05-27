"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { AnchorProvider, Program, web3, utils, BN, Idl } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, createTransferInstruction, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAccount } from "@solana/spl-token";
import idl from "@/idl/ico.json";

const programId = new PublicKey("6bP8naQHdkrEdkDijFoXgncfkVM6hPrFz5bF14rN935D");
const icoMint = new PublicKey("E2ZmtZeiPNDL3sySfsPzpChnEyXSybanacv2aRLZc8Gy");
const admin = new PublicKey("AiodGxgpJ5MAiHShEW3EFceCtzcggiyMVjQFuW5JrCpm");
const USDC = new PublicKey("Br5vt8fRsPRZuMYUtpEqbmvPzzjh5LJ13pybr8UUKfVU");
const USDT = new PublicKey("8FMmJhzvbgVDSRfjxDqkQGXQUsqmBRqtfoqmQq6EeFzs");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Presale = ({ dict }: { dict: any }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [selectedCurrency, setSelectedCurrency] = useState("SOL");
  const [payAmount, setPayAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(10);
  const [prices, setPrices] = useState({ SOL: 0, USDC: 1, USDT: 1 });
  const { publicKey, connected, sendTransaction, signTransaction, wallet, signAllTransactions } = useWallet();
  const { connection } = useConnection();

  const [loading, setLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState<{
    success: boolean;
    signature?: string;
    amount?: number;
    balance?: number;
    currency?: string;
  } | null>(null);

  const getProgram = () => {
    try {
      const provider = getProvider();
      if (!provider) {
        console.error("Provider not available");
        return null;
      }

      // Validate IDL structure before trying to use it
      if (!idl || typeof idl !== 'object') {
        console.error("Invalid IDL format: IDL is not an object");
        return null;
      }

      if (!idl.instructions || !Array.isArray(idl.instructions)) {
        console.error("Invalid IDL format: missing instructions array");
        return null;
      }

      // Check for required methods we're using
      const hasBuyTokens = idl.instructions.some((instr: any) => instr.name === 'buyTokens');
      const hasBuyTokensWithUsdc = idl.instructions.some((instr: any) => instr.name === 'buyTokensWithUsdc');
      const hasBuyTokensWithUsdt = idl.instructions.some((instr: any) => instr.name === 'buyTokensWithUsdt');

      if (!hasBuyTokens) {
        console.warn("IDL missing buyTokens instruction");
      }

      if (!hasBuyTokensWithUsdc) {
        console.warn("IDL missing buyTokensWithUsdc instruction");
      }

      if (!hasBuyTokensWithUsdt) {
        console.warn("IDL missing buyTokensWithUsdt instruction");
      }

      console.log("Creating program with IDL:", idl);
      idl.metadata = idl.metadata || {};
      idl.metadata.address = programId; // this is the PublicKey string
          const program = new Program(idl as Idl, provider);
          console.log("Program ID:", program.programId.toString());
      return program;
    } catch (error) {
      console.error("Error creating program:", error);
      return null;
    }
  };

  const getProvider = () => {
    if (!connection || !publicKey) return null;
    const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
    return provider;
  };

  useEffect(() => {
    const targetDate = new Date("2025-04-30T00:00:00Z").getTime();

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdown);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(countdown); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana,usd-coin,tether&vs_currencies=usd"
        );
        const data = await response.json();
        setPrices({
          SOL: data.solana.usd,
          USDC: data["usd-coin"].usd,
          USDT: data.tether.usd,
        });
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  const handleBuyNow = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet.");
      return;
    }
  
    setLoading(true);
    try {
      const program = getProgram();
      if (!program) {
        throw new Error("Program not available.");
      }
        
      // 1. Check and create user ATA if it doesn't exist
      const userAta = await getAssociatedTokenAddress(icoMint, publicKey);
      const userAtaInfo = await connection.getAccountInfo(userAta);
      
      if (!userAtaInfo) {
        console.log("Creating user token account...");
        const ataIx = createAssociatedTokenAccountInstruction(
          publicKey,
          userAta,
          publicKey,
          icoMint
        );
  
        const createUserAtaTx = new Transaction().add(ataIx);
        createUserAtaTx.feePayer = publicKey;
        createUserAtaTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  
        const signedTx = await signTransaction!(createUserAtaTx);
        const sig = await connection.sendRawTransaction(signedTx.serialize());
        await connection.confirmTransaction(sig, 'confirmed');
        console.log("User token account created:", sig);
      }
  
      // 2. IMPORTANT: The Data PDA is tied to the ADMIN, not the user
      const [dataPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), admin.toBuffer()],
        programId
      );
      
      // Simple PDA derivation - using only the token mint as seed
      const [icoPDA, icoBump] = PublicKey.findProgramAddressSync(
        [icoMint.toBuffer()],
        programId,
      );
      const icoAtaForIcoProgram = await getAssociatedTokenAddress(
        icoMint,
        icoPDA,
        true // because PDAs are off-curve
      );
      const ataInfo = await connection.getAccountInfo(icoAtaForIcoProgram);
      if (!ataInfo) {
        const ataIx = createAssociatedTokenAccountInstruction(
          publicKey,   // payer
          icoAtaForIcoProgram,      // ATA address
          icoPDA,                   // owner (PDA)
          icoMint                   // token mint
        );
      
        const tx = new Transaction().add(ataIx);
        tx.feePayer = publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      
        // const sig = await connection.sendTransaction(tx, [publicKey]);
        const signedBuyTx = await signTransaction!(tx);
        const sig = await connection.sendRawTransaction(signedBuyTx.serialize());
        await connection.confirmTransaction(sig, "confirmed");
  
        console.log("✅ ICO PDA's ATA created:", sig);
      } else {
        console.log("✅ ICO PDA's ATA already exists");
      }
      
// console.log("On-chain owner:", ataInfo.owner.toBase58());
      
      const correctIcoAta = await getAccount(
        connection,
        icoAtaForIcoProgram,
        undefined,
        TOKEN_PROGRAM_ID
      );
      
      console.log("Correct ATA Owner:", correctIcoAta.owner.toBase58());
      
      console.log("Derived ICO PDA:", icoPDA.toString());
      const [expectedVault, bump] = PublicKey.findProgramAddressSync(
        [icoMint.toBuffer()],
        programId
      );
      console.log("✅ Expected vault PDA:", expectedVault.toString());
      
      const tokenAmount = new BN(receiveAmount);
      console.log("Buying tokens:", tokenAmount.toString());
      console.log("Selected currency:", selectedCurrency);
      
      // First, clear any previous transaction result
      setTransactionResult(null);
      
      if (selectedCurrency === "SOL") {
        // Pay with SOL
        console.log("Buying tokens with SOL using the following accounts:");
        console.log("- ico_ata_for_ico_program:", icoPDA.toString());
        console.log("- data:", dataPDA.toString());
        console.log("- ico_mint:", icoMint.toString());
        console.log("- ico_ata_for_user:", userAta.toString());
        console.log("- user:", publicKey.toString());
        console.log("- admin:", admin.toString());
        console.log("- bump:", icoBump);
        
        try {
          // Using snake_case account names and standard PDA
          const buyTx = await program.methods
            .buyTokens(icoBump, tokenAmount)
            .accountsStrict({
              icoAtaForIcoProgram: icoPDA,
              icoPda: icoPDA,
              data: dataPDA,
              icoMint: icoMint,
              icoAtaForUser: userAta,
              user: publicKey,
              admin,
              tokenProgram: TOKEN_PROGRAM_ID,
              systemProgram: SystemProgram.programId,
            })
            .transaction();
      
          buyTx.feePayer = publicKey;
          buyTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      
          const signedBuyTx = await signTransaction!(buyTx);
          const buySig = await connection.sendRawTransaction(signedBuyTx.serialize());
          await connection.confirmTransaction(buySig, 'confirmed');
          
          // Get updated token balance
          const tokenBalance = await connection.getTokenAccountBalance(userAta);
          
          console.log("buyTokens with SOL transaction successful:", buySig);
          
          // Set transaction result with signature and balance
          setTransactionResult({
            success: true,
            signature: buySig,
            amount: receiveAmount,
            balance: tokenBalance.value.uiAmount || 0,
            currency: "SOL"
          });
          console.log("Set transaction result for SOL:", {
            success: true,
            signature: buySig,
            amount: receiveAmount,
            balance: tokenBalance.value.uiAmount || 0,
            currency: "SOL"
          });
        } catch (error) {
          console.error("Error creating buyTokens transaction:", error);
          throw error;
        }
      } 
      else if (selectedCurrency === "USDC" || selectedCurrency === "USDT") {
        console.log("Buying tokens with USDC or USDT");
        // Get the correct stablecoin mint based on selection
        const stablecoinMintAddress = selectedCurrency === "USDC" 
          ? USDC // USDC address
          : USDT; // USDT address
        
        // 1. Check if user has the stablecoin account, create if not exists
        const userStablecoinAta = await getAssociatedTokenAddress(stablecoinMintAddress, publicKey);
        if (!await connection.getAccountInfo(userStablecoinAta)) {
          console.log(`Creating user ${selectedCurrency} account...`);
          const ataIx = createAssociatedTokenAccountInstruction(
            publicKey,
            userStablecoinAta,
            publicKey,
            stablecoinMintAddress
          );
          
          const createStablecoinTx = new Transaction().add(ataIx);
          createStablecoinTx.feePayer = publicKey;
          createStablecoinTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
          
          const signedTx = await signTransaction!(createStablecoinTx);
          const sig = await connection.sendRawTransaction(signedTx.serialize());
          await connection.confirmTransaction(sig, 'confirmed');
          console.log(`User ${selectedCurrency} account created:`, sig);
        }
        
        // 2. Check if admin has the stablecoin account, create if not exists
        const adminStablecoinAta = await getAssociatedTokenAddress(stablecoinMintAddress, admin);
        if (!await connection.getAccountInfo(adminStablecoinAta)) {
          console.log(`Admin's ${selectedCurrency} account doesn't exist yet`);
          // We can't create it for them if we're not the admin, but we can show a helpful message
          alert(`The admin doesn't have a ${selectedCurrency} account set up yet. Please contact the admin or try another payment method.`);
          setLoading(false);
          return;
        }
        
        // 3. Check if user has enough balance
        try {
          const stablecoinBalance = await connection.getTokenAccountBalance(userStablecoinAta);
          const stablecoinNeeded = receiveAmount * 0.000125; // $0.000125 per token
          
          if (!stablecoinBalance.value.uiAmount || stablecoinBalance.value.uiAmount < stablecoinNeeded) {
            alert(`Not enough ${selectedCurrency}. You need ${stablecoinNeeded} ${selectedCurrency} but only have ${stablecoinBalance.value.uiAmount || 0}.`);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error(`Error checking ${selectedCurrency} balance:`, error);
          alert(`Error checking your ${selectedCurrency} balance. Please try again later.`);
          setLoading(false);
          return;
        }
        
        // 4. Execute the transaction with USDC or USDT
        console.log("Creating transaction with the following accounts:");
        console.log("- ico_ata_for_ico_program:", icoPDA.toString());
        console.log("- data:", dataPDA.toString());
        console.log("- ico_mint:", icoMint.toString());
        console.log("- ico_ata_for_user:", userAta.toString());
        console.log("- stablecoin_mint:", stablecoinMintAddress.toString());
        console.log("- user_stablecoin_account:", userStablecoinAta.toString());
        console.log("- admin_stablecoin_account:", adminStablecoinAta.toString());
        console.log("- user:", publicKey.toString());
        console.log("- admin:", admin.toString());
        console.log("- bump:", icoBump);
        
        try {
          const method = selectedCurrency === "USDC" 
            ? program.methods.buyTokensWithUsdc(icoBump, tokenAmount)
            : program.methods.buyTokensWithUsdt(icoBump, tokenAmount);
          
          const buyTx = await method
            .accountsStrict({
              icoAtaForIcoProgram: icoPDA,
              icoPda: icoPDA,
              data: dataPDA,
              icoMint: icoMint,
              icoAtaForUser: userAta,
              stablecoinMint: stablecoinMintAddress,
              userStablecoinAccount: userStablecoinAta,
              adminStablecoinAccount: adminStablecoinAta,
              user: publicKey,
              admin,
              tokenProgram: TOKEN_PROGRAM_ID,
              associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
              systemProgram: SystemProgram.programId,
              rent: SYSVAR_RENT_PUBKEY,
            })
            .transaction();
          
          buyTx.feePayer = publicKey;
          buyTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
          
          const signedBuyTx = await signTransaction!(buyTx);
          const buySig = await connection.sendRawTransaction(signedBuyTx.serialize());
          await connection.confirmTransaction(buySig, 'confirmed');
          
          // Get updated token balance after purchase
          const tokenBalance = await connection.getTokenAccountBalance(userAta);
          
          console.log(`buyTokens with ${selectedCurrency} transaction successful:`, buySig);
          
          // Set transaction result
          setTransactionResult({
            success: true,
            signature: buySig,
            amount: receiveAmount,
            balance: tokenBalance.value.uiAmount || 0,
            currency: selectedCurrency
          });
          console.log("Set transaction result for stablecoin:", {
            success: true,
            signature: buySig,
            amount: receiveAmount,
            balance: tokenBalance.value.uiAmount || 0,
            currency: selectedCurrency
          });
        } catch (error) {
          console.error(`Error creating buyTokensWith${selectedCurrency} transaction:`, error);
          throw error;
        }
      }
    } catch (err) {
      console.error("Transaction failed", err);
      alert("Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setPayAmount(amount);

    let usdAmount = 0;
    if (selectedCurrency === "SOL") {
      usdAmount = amount * prices.SOL;
    } else if (selectedCurrency === "USDC") {
      usdAmount = amount * prices.USDC;
    } else if (selectedCurrency === "USDT") {
      usdAmount = amount * prices.USDT;
    }

    setReceiveAmount(usdAmount / 0.001); // Assuming 1 $WFT = 0.001 USD
  };

  // Add a function to close the transaction result popup
  const closeTransactionResult = () => {
    console.log("Closing transaction result popup");
    setTransactionResult(null);
  };

  return (
    <div className="pt-5 bg-gray-100">
      {/* Transaction Success Popup */}
      {transactionResult && transactionResult.success && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl" style={{ maxWidth: '90%' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-green-600">Transaction Successful!</h3>
              <button
                onClick={closeTransactionResult}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <p className="text-green-600 font-semibold mb-2">
                You've purchased {transactionResult.amount} tokens with {transactionResult.currency}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Your new token balance: <span className="font-semibold">{transactionResult.balance}</span> tokens
              </p>
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Transaction Signature:</p>
                <div className="bg-gray-100 p-2 rounded overflow-auto text-xs font-mono break-all">
                  {transactionResult.signature}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeTransactionResult}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex justify-center items-center bg-gray-100 pb-10">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          {/* Title */}
          <h1 className="text-center text-2xl font-bold text-orange-600">
            {dict.presale?.title || "Buy Before the Price Rises!"}
          </h1>

          {/* Timer Section */}
          <div className="flex justify-between items-center mt-6 text-lg font-semibold text-gray-700">
            <div className="flex flex-col items-center">
              <div>{timeLeft.days}</div>
              <span className="text-sm text-gray-500">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <div>{timeLeft.hours}</div>
              <span className="text-sm text-gray-500">Hrs</span>
            </div>
            <div className="flex flex-col items-center">
              <div>{timeLeft.minutes}</div>
              <span className="text-sm text-gray-500">Min</span>
            </div>
            <div className="flex flex-col items-center">
              <div>{timeLeft.seconds}</div>
              <span className="text-sm text-gray-500">Sec</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            {dict.presale?.countdownText || "UNTIL NEXT PRICE INCREASE"}
          </p>

          {/* Pricing Section */}
          <div className="mt-6 text-sm text-gray-700">
            <p className="flex justify-between">
              <span>{dict.presale?.wftPriceLabel || "1 $WFT:"}</span>{" "}
              <span className="font-bold">$0.00012500 USD</span>
            </p>
            <p className="flex justify-between">
              <span>{dict.presale?.currentPriceLabel || "Current Price:"}</span>{" "}
              <span className="font-bold">$0.00012500 USD</span>
            </p>
            <p className="flex justify-between">
              <span>{dict.presale?.afterPriceLabel || "After Price:"}</span>{" "}
              <span className="font-bold">$0.00015000 USD</span>
            </p>
            <div className="relative w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="absolute top-0 left-0 h-2 rounded-full bg-orange-600"
                style={{ width: "80%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {dict.presale?.raisedLabel || "Over $473177/$600000 USD raised!"}
            </p>
          </div>

          {/* Buy Section */}
          <div className="mt-6">
            <h3 className="text-center font-medium text-gray-800">
              {dict.presale?.buyNow || "Buy $WFT Now"}
            </h3>

            {/* Payment Icons */}
            <div className="flex justify-center gap-20 mt-4">
              <Image
                src="/Sol.png"
                alt="SOL"
                width={50}
                height={50}
                className={`w-8 h-8 cursor-pointer ${selectedCurrency === "SOL" ? "ring-2 ring-orange-600" : ""
                  }`}
                onClick={() => setSelectedCurrency("SOL")}
              />
              <Image
                src="/USDC.svg"
                alt="USDC"
                width={32}
                height={32}
                className={`w-8 h-8 cursor-pointer ${selectedCurrency === "USDC" ? "ring-2 ring-orange-600" : ""
                  }`}
                onClick={() => setSelectedCurrency("USDC")}
              />
              <Image
                src="/USDT.svg"
                alt="USDT"
                width={32}
                height={32}
                className={`w-8 h-8 cursor-pointer ${selectedCurrency === "USDT" ? "ring-2 ring-orange-600" : ""}`}
                onClick={() => setSelectedCurrency("USDT")}
              />
            </div>

            {/* Input Fields */}
            <div className="mt-4 space-y-3">
              <input
                type="number"
                placeholder={`${dict.presale?.payWith || "Pay with"} ${selectedCurrency}`}
                className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                value={payAmount}
                onChange={handlePayAmountChange}
              />
              <input
                type="number"
                placeholder={dict.presale?.receive || "Receive $Well Fit"}
                className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                value={receiveAmount}
                readOnly
              />
            </div>

            {/* Connect Wallet and Buy Button */}
            <div className="flex justify-between items-center mt-4 gap-1">
              <WalletMultiButton className="flex-1 bg-orange-600 text-white py-3 rounded-md text-sm font-medium hover:bg-orange-700">
                {connected
                  ? dict.presale?.walletConnected || "Wallet Connected"
                  : dict.presale?.connectWallet || "Connect Wallet"}
              </WalletMultiButton>
              <button
                onClick={handleBuyNow}
                disabled={!connected || loading}
                className={`flex-1 bg-orange-600 text-white py-3 rounded-md text-sm font-medium hover:bg-orange-700 ${connected && !loading ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              >
                {loading ? "Processing..." : connected ? "Buy Now" : "Buy Now"}
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              {dict.presale?.howToBuy || "How to buy?"}{" "}
              <a href="#" className="text-orange-600 underline">
                {dict.presale?.clickHere || "(Click Here)"}
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-8">
            {dict.presale?.footerText || "Your TMT token presale"}
          </p>
        </div>
      </div>

      <Footer dict={dict} />
    </div>
  );
};

export default Presale;