import Logo from './Logo';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import BalanceDisplay from './BalanceDisplay';
import UserAvatar from './UserAvatar';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-border-primary">
      <div className="flex items-center justify-between h-20 px-6 lg:px-12">
        {/* Left Section: Logo */}
        <Logo />

        {/* Center Section: Search Bar + Nav Links */}
        <div className="flex items-center gap-8 flex-1 mx-8">
          <SearchBar />
          <NavLinks />
        </div>

        {/* Right Section: Balance, Avatar, Theme Toggle */}
        <div className="flex items-center gap-4">
          <BalanceDisplay />
          <UserAvatar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
