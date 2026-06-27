import { profileData } from '../data/profile';
import { Camera, GitBranch, Briefcase, Mail } from 'lucide-react';

const socialLinks = [
  { href: profileData.instagram, icon: Camera, label: 'Instagram' },
  { href: profileData.github, icon: GitBranch, label: 'GitHub' },
  { href: profileData.linkedin, icon: Briefcase, label: 'LinkedIn' },
  { href: `mailto:${profileData.email}`, icon: Mail, label: 'Email' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
        <div>
          <p className="text-lg font-bold text-white tracking-tight">
            {profileData.name}
          </p>
          <p className="text-sm text-gray-400 mt-1">{profileData.role}</p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-accent-light hover:border-accent-light/30 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          &copy; {year} {profileData.name}. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
