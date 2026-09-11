import { Sidebar } from './Sidebar';
import { Hero } from './Hero';
import { ThemeSelector } from './ThemeSelector';

export function Layout() {
  return (
    <div className="weather-app flex h-full min-h-screen w-full" data-theme="apple">
      <Sidebar />
      <Hero />
      <ThemeSelector />
    </div>
  );
}
