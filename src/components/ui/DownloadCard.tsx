import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface DownloadLink {
  name: string;
  url: string;
  recommended?: boolean;
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
            className={`text-sm py-2 px-3 rounded-md transition-all duration-300 flex items-center gap-2 ${
              link.recommended !== false
                ? 'bg-green-500/20 text-green-300 border border-green-500/40 hover:bg-green-500/30 hover:border-green-500'
                : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 hover:border-red-500'
            }`}
          >
            {link.recommended !== false ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
      <span className="text-xs text-gray-500">{os}</span>
    </div>
  );
};

export default DownloadCard;
