import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  const [zoom, setZoom] = React.useState(1);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors p-2 bg-gray-800 rounded-full"
        aria-label="Закрыть"
      >
        <X size={24} />
      </button>

      <div className="absolute top-4 left-4 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomOut();
          }}
          className="text-white hover:text-orange-500 transition-colors p-2 bg-gray-800 rounded-full"
          aria-label="Уменьшить"
        >
          <ZoomOut size={24} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomIn();
          }}
          className="text-white hover:text-orange-500 transition-colors p-2 bg-gray-800 rounded-full"
          aria-label="Увеличить"
        >
          <ZoomIn size={24} />
        </button>
        <div className="text-white bg-gray-800 rounded-full px-4 py-2 flex items-center">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      <div
        className="max-w-7xl max-h-full overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Увеличенное изображение"
          className="max-w-full h-auto transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
