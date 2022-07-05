//
// 
//   /$$$$$$$                                        
//  | $$__  $$                                       
//  | $$  \ $$ /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$ 
//  | $$$$$$$/|____  $$ /$$__  $$ /$$__  $$ /$$__  $$
//  | $$____/  /$$$$$$$| $$  \ $$| $$$$$$$$| $$  \__/
//  | $$      /$$__  $$| $$  | $$| $$_____/| $$      
//  | $$     |  $$$$$$$| $$$$$$$/|  $$$$$$$| $$      
//  |__/      \_______/| $$____/  \_______/|__/      
//                     | $$                          
//                     | $$                          
//                     |__/  
// 
//  A program to decouple your SOL from your wallet.
// 
//  Program by Kristian Quirapas
// 

// TODO: Replace expects() and unwraps() to handlers
// TODO: Remove transaction fee
// TODO: Make hash more secure by introducing hashing algorithm + randomness
// TODO: Upgrade code to an entire seedphrase

// Where Instructions are processed
mod entrypoint;

// Where Instruction DATA is (de)serialized
mod instruction;

// Where custom errors reside
mod error;

// Where utils / helper functions reside
mod processor;

// Where program state variables are kept
// and state is (de)serialized
mod state;
