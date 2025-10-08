// Header Component
const Header = () => {
  return (
    <div className="bg-white border-b border-neutral-br-secondary px-8 py-4 flex items-center justify-between">
      <div className="text-sm text-gray-600" />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <span className="text-sm font-medium">John Doe</span>
      </div>
    </div>
  );
};
export default Header;
