import React from 'react';
import { TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-blue-100 p-2 rounded-full">
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Tax Loss Harvesting</h1>
      </div>
      <p className="text-gray-600 max-w-3xl">
        Optimize your tax liability by strategically selling investments at a loss to offset capital gains.
        Select holdings below to see the potential impact on your tax situation.
      </p>
    </header>
  );
};

export default Header;