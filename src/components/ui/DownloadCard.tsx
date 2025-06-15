import React from 'react';

interface DownloadLink {
  name: string;
  url: string;
}

interface DownloadCardProps {
  title: string;
  icon: React.ReactNode;
  description: DownloadLink[];
  os: string;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ 
  title, 
  icon, 
  description, 
  os 
}) => {
  return (
    <div className="download-card group">
      <div className="mb-4 text-orange-500">{icon}</div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <div className="flex flex-col gap-2 mb-4">
        {description.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-orange-500 transition-colors text-sm py-1 px-3 rounded-md bg-gray-700/50 hover:bg-gray-700 flex items-center justify-center"
          >
            {link.name}
          </a>
        ))}
      </div>
      <span className="text-xs text-gray-500">{os}</span>
    </div>
  );
};

export default DownloadCard;