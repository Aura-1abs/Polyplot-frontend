'use client';

import { useState } from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import BalanceDisplay from './BalanceDisplay';
import UserAvatar from './UserAvatar';
import ThemeToggle from './ThemeToggle';
import WalletModal from '../auth/WalletModal';
import DepositModal from '../deposit/DepositModal';

export default function Navigation() {
  // TODO: 后续替换为真实的用户登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const handleOpenWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const handleCloseWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // 注意：不需要在这里关闭弹窗，WalletModal 会在动画完成后自动处理
  };

  const handleDeposit = () => {
    setIsDepositModalOpen(true);
  };

  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('User logged out');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-border-primary">
        <div className="flex items-center justify-between h-20 px-6 lg:px-12">
          {/* Left Section: Logo */}
          <Logo />

          {/* Center Section: Search Bar */}
          <div className="flex items-center flex-1 mx-8">
            <SearchBar />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <>
                {/* Logged In State */}
                <NavLinks />
                <BalanceDisplay onDeposit={handleDeposit} />
                <UserAvatar onLogout={handleLogout} />
              </>
            ) : (
              <>
                {/* Logged Out State */}
                {/* Log In Button */}
                <button
                  onClick={handleOpenWalletModal}
                  className="text-text-primary hover:text-long transition-colors font-semibold px-6 py-2.5"
                >
                  Log In
                </button>

                {/* Sign Up Button */}
                <button
                  onClick={handleOpenWalletModal}
                  className="bg-long hover:bg-long-hover text-black font-bold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Theme Toggle - Always Visible */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Wallet Modal - Outside header for proper centering */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={handleCloseWalletModal}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={handleCloseDepositModal}
        balance={0}
      />
    </>
  );
}
