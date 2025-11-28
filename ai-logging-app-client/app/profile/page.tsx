import PersonIcon from "@mui/icons-material/Person";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">Profile</h1>
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-2xl font-bold text-zinc-500 dark:text-zinc-400">
            {/* Placeholder avatar */}
            <PersonIcon fontSize="large" />
          </div>
          <div>
            <div className="text-lg font-semibold text-black dark:text-zinc-50">Your Name</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">user@email.com</div>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">Settings</h2>
          <ul className="flex flex-col gap-2">
            <li className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-700 dark:text-zinc-200">Dark Mode</span>
              <button className="bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-full text-xs font-medium cursor-pointer">Toggle</button>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-700 dark:text-zinc-200">Notifications</span>
              <button className="bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-full text-xs font-medium cursor-pointer">Manage</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
