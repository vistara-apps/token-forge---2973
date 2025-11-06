import React, { useState } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { parseEther, encodeFunctionData } from 'viem';
import { Coins, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const ERC20_BYTECODE = "0x608060405234801561001057600080fd5b506040516108a93803806108a98339818101604052810190610032919061028a565b8383816003908161004391906104f6565b50806004908161005391906104f6565b505050610066338261006d60201b60201c565b50505050506105c8565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036100dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100d390610625565b60405180910390fd5b6100ee600083836101da60201b60201c565b80600260008282546101009190610674565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461015591906106a8565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516101ba91906106dc565b60405180910390a36101d6600083836101df60201b60201c565b5050565b505050565b505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61024b82610202565b810181811067ffffffffffffffff8211171561026a57610269610213565b5b80604052505050565b600061027d6101e4565b90506102898282610242565b919050565b600080600080608085870312156102a8576102a76101ee565b5b600085015167ffffffffffffffff8111156102c6576102c56101f3565b5b6102d2878288016101f8565b945050602085015167ffffffffffffffff8111156102f3576102f26101f3565b5b6102ff878288016101f8565b935050604085015192505060608501519150509295509295909350565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061036757607f821691505b60208210810361037a57610379610320565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026103e27fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826103a5565b6103ec86836103a5565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061043361042e61042984610404565b61040e565b610404565b9050919050565b6000819050919050565b61044d83610418565b6104616104598261043a565b8484546103b2565b825550505050565b600090565b610476610469565b610481818484610444565b505050565b5b818110156104a55761049a60008261046e565b600181019050610487565b5050565b601f8211156104ea576104bb81610380565b6104c484610395565b810160208510156104d3578190505b6104e76104df85610395565b830182610486565b50505b505050565b600082821c905092915050565b600061050d600019846008026104ef565b1980831691505092915050565b600061052683836104fc565b9150826002028217905092915050565b61053f8261031c565b67ffffffffffffffff81111561055857610557610213565b5b610562825461034f565b61056d8282856104a9565b600060209050601f8311600181146105a0576000841561058e578287015190505b610598858261051a565b865550610600565b601f1984166105ae86610380565b60005b828110156105d6578489015182556001820191506020850194506020810190506105b1565b868310156105f357848901516105ef601f8916826104fc565b8355505b6001600288020188555050505b505050505050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600061063f601f83610327565b915061064a82610609565b602082019050919050565b6000602082019050818103600083015261066e81610632565b9050919050565b600061068082610404565b915061068b83610404565b92508282019050808211156106a3576106a2610655565b5b92915050565b60006106b482610404565b91506106bf83610404565b92508282039050818111156106d7576106d6610655565b5b92915050565b6106e681610404565b82525050565b600060208201905061070160008301846106dd565b92915050565b6102d2806107176000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806370a082311161005b57806370a08231146101145780638da5cb5b1461014457806395d89b4114610162578063a9059cbb1461018057610088565b806306fdde031461008d578063095ea7b3146100ab57806318160ddd146100db57806323b872dd146100f9575b600080fd5b6100956101b0565b6040516100a29190610208565b60405180910390f35b6100c560048036038101906100c0919061029a565b610242565b6040516100d291906102f5565b60405180910390f35b6100e3610265565b6040516100f0919061031f565b60405180910390f35b610113600480360381019061010e919061033a565b61026f565b005b61012e6004803603810190610129919061038d565b61029e565b60405161013b919061031f565b60405180910390f35b61014c6102e6565b60405161015991906103c9565b60405180910390f35b61016a6102ec565b6040516101779190610208565b60405180910390f35b61019a6004803603810190610195919061029a565b61037e565b6040516101a791906102f5565b60405180910390f35b6060600380546101bf90610413565b80601f01602080910402602001604051908101604052809291908181526020018280546101eb90610413565b80156102385780601f1061020d57610100808354040283529160200191610238565b820191906000526020600020905b81548152906001019060200180831161021b57829003601f168201915b5050505050905090565b60008061024d6103a1565b905061025a8185856103a9565b600191505092915050565b6000600254905090565b6000806102796103a1565b90506102868582856103bb565b61029185858561044f565b60019150509392505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60055481565b6060600480546102fb90610413565b80601f016020809104026020016040519081016040528092919081815260200182805461032790610413565b80156103745780601f1061034957610100808354040283529160200191610374565b820191906000526020600020905b81548152906001019060200180831161035757829003601f168201915b5050505050905090565b6000806103896103a1565b905061039681858561044f565b600191505092915050565b600033905090565b6103b683838360016104c6565b505050565b60006103c7848461069d565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146104495781811015610439578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161043093929190610453565b60405180910390fd5b610448848484840360006104c6565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036104c15760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016104b891906103c9565b60405180910390fd5b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036105385760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016105309190610453565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036105aa5760006040517f94280d620000000000000000000000000000000000000000000000000000000081526004016105a191906103c9565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610697578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161068e919061031f565b60405180910390a35b50505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561075857808201518184015260208101905061073d565b60008484015250505050565b6000601f19601f8301169050919050565b600061078082610724565b61078a818561072f565b935061079a818560208601610740565b6107a381610764565b840191505092915050565b600060208201905081810360008301526107c88184610775565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610800826107d5565b9050919050565b610810816107f5565b811461081b57600080fd5b50565b60008135905061082d81610807565b92915050565b6000819050919050565b61084681610833565b811461085157600080fd5b50565b6000813590506108638161083d565b92915050565b6000806040838503121561088057610880565b5b600061088e8582860161081e565b925050602061089f85828601610854565b9150509250929050565b60008115159050919050565b6108be816108a9565b82525050565b60006020820190506108d960008301846108b5565b92915050565b6108e881610833565b82525050565b600060208201905061090300008301846108df565b92915050565b60008060006060848603121561092257610921610800565b5b60006109308682870161081e565b93505060206109418682870161081e565b925050604061095286828701610854565b9150509250925092565b60006020828403121561097257610971610800565b5b60006109808482850161081e565b91505092915050565b610992816107f5565b82525050565b60006020820190506109ad6000830184610989565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806109fb57607f821691505b602082108103610a0e57610a0d6109b4565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610a4f82610833565b9150610a5a83610833565b9250828201905080821115610a7257610a71610a14565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000610ab382610833565b9150610abe83610833565b9250828203905081811115610ad657610ad5610a14565b5b9291505056fea26469706673582212208f8a8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e64736f6c63430008130033";

const TokenCreator = ({ onTokenCreated }) => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    decimals: '18',
    initialSupply: ''
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState('');
  const [txHash, setTxHash] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Token name is required';
    }
    
    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Token symbol is required';
    } else if (formData.symbol.length > 11) {
      newErrors.symbol = 'Symbol must be 11 characters or less';
    }
    
    if (!formData.initialSupply || parseFloat(formData.initialSupply) <= 0) {
      newErrors.initialSupply = 'Initial supply must be greater than 0';
    }
    
    const decimals = parseInt(formData.decimals);
    if (decimals < 0 || decimals > 18) {
      newErrors.decimals = 'Decimals must be between 0 and 18';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const createToken = async () => {
    if (!validateForm()) return;
    
    setIsCreating(true);
    setStatus('Preparing transaction...');
    setTxHash('');
    
    try {
      if (!walletClient) {
        throw new Error('Wallet not connected');
      }

      // Calculate initial supply with decimals
      const decimals = parseInt(formData.decimals);
      const supply = parseFloat(formData.initialSupply);
      const initialSupply = BigInt(supply * Math.pow(10, decimals));

      setStatus('Deploying token contract...');

      // Deploy the ERC20 contract
      const hash = await walletClient.deployContract({
        abi: [
          {
            "inputs": [
              {"internalType": "string", "name": "_name", "type": "string"},
              {"internalType": "string", "name": "_symbol", "type": "string"},
              {"internalType": "uint8", "name": "_decimals", "type": "uint8"},
              {"internalType": "uint256", "name": "_initialSupply", "type": "uint256"}
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ],
        bytecode: ERC20_BYTECODE,
        args: [formData.name, formData.symbol, decimals, initialSupply],
      });

      setTxHash(hash);
      setStatus('Waiting for confirmation...');

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      
      if (receipt.status === 'success') {
        setStatus('Token created successfully!');
        
        const tokenData = {
          name: formData.name,
          symbol: formData.symbol,
          decimals: decimals,
          initialSupply: supply,
          contractAddress: receipt.contractAddress,
          txHash: hash,
          createdAt: new Date().toISOString(),
          creator: address
        };
        
        onTokenCreated(tokenData);
        
        // Reset form
        setFormData({
          name: '',
          symbol: '',
          decimals: '18',
          initialSupply: ''
        });
        
        setTimeout(() => {
          setStatus('');
          setTxHash('');
        }, 5000);
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error creating token:', error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="glass-effect rounded-2xl p-6 lg:p-8 animate-fade-in-up">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center animate-pulse-glow shadow-lg">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Create ERC20 Token</h2>
            <p className="text-blue-200">Deploy your custom token on Base Sepolia testnet</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Token Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., My Awesome Token"
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.name ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Token Symbol *
              </label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                placeholder="e.g., MAT"
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.symbol ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {errors.symbol && <p className="text-red-400 text-sm mt-1">{errors.symbol}</p>}
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Decimals
              </label>
              <input
                type="number"
                name="decimals"
                value={formData.decimals}
                onChange={handleInputChange}
                placeholder="18"
                min="0"
                max="18"
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.decimals ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {errors.decimals && <p className="text-red-400 text-sm mt-1">{errors.decimals}</p>}
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Initial Supply *
              </label>
              <input
                type="number"
                name="initialSupply"
                value={formData.initialSupply}
                onChange={handleInputChange}
                placeholder="1000000"
                min="0"
                step="any"
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.initialSupply ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {errors.initialSupply && <p className="text-red-400 text-sm mt-1">{errors.initialSupply}</p>}
            </div>
          </div>

          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Token Preview</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-200">Name:</span>
                  <span className="text-white font-medium">{formData.name || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Symbol:</span>
                  <span className="text-white font-medium">{formData.symbol || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Decimals:</span>
                  <span className="text-white font-medium">{formData.decimals || '18'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Supply:</span>
                  <span className="text-white font-medium">{formData.initialSupply ? parseFloat(formData.initialSupply).toLocaleString() : '—'}</span>
                </div>
              </div>
            </div>

            {status && (
              <div className={`p-4 rounded-xl border animate-fade-in-up ${
                status.includes('Error') 
                  ? 'bg-red-500/20 border-red-500/50 text-red-200' 
                  : status.includes('successfully')
                  ? 'bg-green-500/20 border-green-500/50 text-green-200'
                  : 'bg-blue-500/20 border-blue-500/50 text-blue-200'
              }`}>
                <div className="flex items-center space-x-2">
                  {status.includes('Error') ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : status.includes('successfully') ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  <span className="font-medium">{status}</span>
                </div>
                {txHash && (
                  <a
                    href={`https://sepolia.basescan.org/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline hover:text-white transition-colors mt-2 inline-block"
                  >
                    View transaction
                  </a>
                )}
              </div>
            )}

            <button
              onClick={createToken}
              disabled={isCreating || !address}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                isCreating
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isCreating ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Token...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>Create Token</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCreator;