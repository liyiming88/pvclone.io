import React, { useState } from 'react';
import Layout from './components/Layout';
import NetWorthChart from './components/NetWorthChart';
import AIAssistant from './components/AIAssistant';
import { 
  ArrowUpRight, 
  PieChart, 
  Activity, 
  FileText, 
  ChevronRight, 
  ArrowRight,
  Download,
  Printer,
  Info
} from 'lucide-react';
import { 
  MOCK_HOLDINGS, 
  MOCK_TRANSACTIONS, 
  MOCK_PERFORMANCE, 
  PLAN_NAME, 
  PLAN_ID 
} from './constants';
import { TabView } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.SUMMARY);

  const totalBalance = MOCK_HOLDINGS.reduce((acc, curr) => acc + curr.balance, 0);
  const totalChange = MOCK_HOLDINGS.reduce((acc, curr) => acc + (curr.balance * (curr.change / 100)), 0);
  const totalChangePercent = (totalChange / totalBalance) * 100;
  
  const vestedBalance = totalBalance * 0.95; // Simulating 95% vesting

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const renderSummaryTab = () => (
    <div className="space-y-6">
      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Balance Card */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wide">Total Balance</h2>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{formatCurrency(totalBalance)}</span>
                <span className={`text-sm font-medium ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  {totalChange >= 0 ? '+' : ''}{formatCurrency(totalChange)} ({totalChangePercent.toFixed(2)}%)
                  {totalChange >= 0 ? <ArrowUpRight className="w-4 h-4 ml-0.5" /> : null}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">As of {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-500">Vested Balance</p>
              <p className="font-semibold text-gray-800">{formatCurrency(vestedBalance)}</p>
            </div>
          </div>
          
          <hr className="border-gray-100 my-4" />
          
          <div className="mb-2 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">Balance History (1 Year)</h3>
            <button className="text-[#5d9632] text-sm font-medium hover:underline">View Details</button>
          </div>
          <NetWorthChart data={MOCK_PERFORMANCE} />
        </div>

        {/* Quick Actions / Rate of Return */}
        <div className="space-y-6">
           {/* ROR Card */}
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wide mb-2">Personal Rate of Return</h3>
              <div className="flex justify-between items-end mb-2">
                <div>
                   <span className="text-2xl font-bold text-gray-900">12.4%</span>
                   <span className="text-xs text-gray-500 ml-2">YTD</span>
                </div>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-[#5d9632] h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-3">From 01/01/2023 to {new Date().toLocaleDateString()}</p>
           </div>

           {/* Quick Links */}
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
               <h3 className="text-sm font-semibold text-gray-700">Quick Links</h3>
             </div>
             <div className="divide-y divide-gray-100">
               {['Change Contributions', 'Change Investments', 'Statements', 'Withdrawals / Loans'].map((link, idx) => (
                 <button key={idx} className="w-full px-4 py-3 text-left text-sm text-[#5d9632] hover:bg-gray-50 flex justify-between items-center group transition-colors">
                   {link}
                   <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#5d9632]" />
                 </button>
               ))}
             </div>
           </div>
        </div>
      </div>

      {/* Asset Class Allocation (Mini) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold text-gray-800">Your Investments</h3>
             <button 
               onClick={() => setActiveTab(TabView.INVESTMENTS)}
               className="text-[#5d9632] text-sm font-medium hover:underline flex items-center"
             >
               View All <ArrowRight className="w-4 h-4 ml-1" />
             </button>
          </div>
          <div className="space-y-4">
            {MOCK_HOLDINGS.slice(0, 3).map((holding) => (
              <div key={holding.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-sm ${
                    holding.assetClass === 'Stock' ? 'bg-blue-500' : 
                    holding.assetClass === 'Bond' ? 'bg-orange-400' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{holding.name}</p>
                    <p className="text-xs text-gray-500">{holding.ticker}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-gray-900">{formatCurrency(holding.balance)}</p>
                  <p className={`text-xs ${holding.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {holding.change > 0 ? '+' : ''}{holding.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <button 
               onClick={() => setActiveTab(TabView.ACTIVITY)}
               className="text-[#5d9632] text-sm font-medium hover:underline flex items-center"
            >
               View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="flow-root">
            <ul className="-mb-8">
              {MOCK_TRANSACTIONS.slice(0, 4).map((transaction, transactionIdx) => (
                <li key={transaction.id}>
                  <div className="relative pb-8">
                    {transactionIdx !== MOCK_TRANSACTIONS.slice(0, 4).length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          transaction.type === 'Contribution' ? 'bg-green-100' : 
                          transaction.type === 'Fee' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          {transaction.type === 'Contribution' ? <ArrowUpRight className="h-4 w-4 text-green-600" /> : 
                           transaction.type === 'Fee' ? <Activity className="h-4 w-4 text-red-600" /> :
                           <FileText className="h-4 w-4 text-gray-500" />}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <span className={transaction.amount > 0 ? 'text-gray-900' : 'text-red-600'}>
                             {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvestmentsTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h2 className="text-xl font-bold text-gray-900">Investments</h2>
           <p className="text-sm text-gray-500 mt-1">Current holdings as of {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors">
              <Printer className="w-4 h-4" /> Print
           </button>
           <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors">
              <Download className="w-4 h-4" /> Download
           </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Ticker</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Class</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {MOCK_HOLDINGS.map((investment) => (
              <tr key={investment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#5d9632] hover:underline cursor-pointer">{investment.name}</span>
                    <span className="text-xs text-gray-500">{investment.ticker}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${investment.assetClass === 'Stock' ? 'bg-blue-100 text-blue-800' : 
                      investment.assetClass === 'Bond' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {investment.assetClass}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {investment.units.toLocaleString(undefined, { minimumFractionDigits: 3 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  ${investment.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={investment.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {investment.change > 0 ? '+' : ''}{investment.change}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                  {formatCurrency(investment.balance)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
             <tr>
               <td colSpan={5} className="px-6 py-4 text-right text-sm font-bold text-gray-900">Total Account Balance:</td>
               <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">{formatCurrency(totalBalance)}</td>
             </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
           <p className="text-sm text-gray-500 mt-1">Activity for the last 90 days</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors">
              <Download className="w-4 h-4" /> Export CSV
           </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {MOCK_TRANSACTIONS.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${transaction.type === 'Contribution' ? 'bg-green-100 text-green-800' : 
                      transaction.type === 'Fee' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {transaction.type}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${transaction.amount > 0 ? 'text-gray-900' : 'text-red-600'}`}>
                   {formatCurrency(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Page Title & Plan Info */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{PLAN_NAME}</h1>
        <p className="text-sm text-gray-500">Plan ID: {PLAN_ID}</p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {Object.values(TabView).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab
                  ? 'border-[#5d9632] text-[#5d9632]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === TabView.SUMMARY && renderSummaryTab()}
        {activeTab === TabView.INVESTMENTS && renderInvestmentsTab()}
        {activeTab === TabView.ACTIVITY && renderActivityTab()}
        {activeTab === TabView.ANALYSIS && (
          <div className="bg-white p-12 text-center rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
             <div className="bg-gray-100 p-4 rounded-full mb-4">
                <PieChart className="w-10 h-10 text-gray-400" />
             </div>
             <h3 className="text-lg font-medium text-gray-900">Portfolio Analysis</h3>
             <p className="text-gray-500 mt-2 max-w-md">Detailed asset allocation visualizations and personalized retirement projection tools are coming soon.</p>
          </div>
        )}
      </div>

      <AIAssistant />
    </Layout>
  );
}

export default App;