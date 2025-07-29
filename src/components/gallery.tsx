import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  src?: string;
  thumbnail?: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  tags?: string[];
  external?: string;
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  duration?: string;
  resolution?: string;
  fps?: string;
}

const getVideoId = (url: string): string | null => {
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  if (youtubeMatch) return youtubeMatch[1];
  
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return vimeoMatch[1];
  
  return null;
};

const getVideoThumbnail = (url: string): string => {
  const videoId = getVideoId(url);
  if (!videoId) return '';
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  
  if (url.includes('vimeo.com')) {
    return `https://vumbnail.com/${videoId}.jpg`;
  }
  
  return '';
};

const getEmbedUrl = (url: string): string => {
  const videoId = getVideoId(url);
  if (!videoId) return url;
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  if (url.includes('vimeo.com')) {
    return `https://player.vimeo.com/video/${videoId}`;
  }
  
  return url;
};

interface MediaModalProps {
  item: MediaItem;
  isOpen: boolean;
  onClose: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
          <button onClick={onClose} className="hover:text-gray-900 transition-colors">
            Index
          </button>
          <span>/</span>
          <span className="text-gray-900 font-serif">{item.title}</span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-center mb-3">
          {item.type === 'photo' ? (
            <img
              src={item.src}
              alt={item.title}
              className="max-w-full h-auto object-contain"
              loading="lazy"
            />
          ) : (
            <div className="w-full aspect-video">
              <iframe
                src={getEmbedUrl(item.external || '')}
                className="w-full h-full"
                allowFullScreen
                title={item.title}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2 overflow-y-auto text-xs">
          <div>
            <h3 className="font-medium text-gray-900 font-serif">{item.title}</h3>
            {item.description && (
              <p className="text-gray-600 font-serif mt-1">{item.description}</p>
            )}
          </div>
          
          {/* Dense technical grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2 border-t border-gray-100">
            {item.camera && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-mono text-[10px]">CAMERA</span>
                <span className="text-gray-900 font-mono text-[10px]">{item.camera}</span>
              </div>
            )}
            {item.focalLength && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-mono text-[10px]">FOCAL</span>
                <span className="text-gray-900 font-mono text-[10px]">{item.focalLength}</span>
              </div>
            )}
            {item.aperture && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-mono text-[10px]">APERTURE</span>
                <span className="text-gray-900 font-mono text-[10px]">{item.aperture.replace('f/', 'ƒ/')}</span>
              </div>
            )}
            {item.shutterSpeed && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-mono text-[10px]">SHUTTER</span>
                <span className="text-gray-900 font-mono text-[10px]">{item.shutterSpeed}</span>
              </div>
            )}
            {item.iso && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-mono text-[10px]">ISO</span>
                <span className="text-gray-900 font-mono text-[10px]">{item.iso}</span>
              </div>
            )}
            {item.location && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-mono text-[10px]">LOCATION</span>
                <span className="text-gray-900 font-serif text-[10px]">{item.location}</span>
              </div>
            )}
            {item.date && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-mono text-[10px]">DATE</span>
                <span className="text-gray-900 font-serif text-[10px]">{item.date}</span>
              </div>
            )}
            {item.lens && (
              <div className="flex justify-between col-span-2">
                <span className="text-gray-500 font-mono text-[10px]">LENS</span>
                <span className="text-gray-900 font-mono text-[10px]">{item.lens}</span>
              </div>
            )}
          </div>
          
          {item.tags && item.tags.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500 font-mono text-[10px]">TAGS</span>
                <span className="text-gray-900 font-mono text-[10px]">{item.tags.join(', ')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface MediaCardProps {
  item: MediaItem;
  onClick: () => void;
  index: number;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const thumbnailSrc = item.type === 'video' && item.external 
    ? item.thumbnail || getVideoThumbnail(item.external)
    : item.thumbnail || item.src;

  // Keep full camera name, don't truncate
  const technicalSpecs = [
    item.camera, // Full camera name
    item.focalLength,
    item.aperture?.replace('f/', 'ƒ/')
  ].filter(Boolean);

  const secondLineSpecs = [
    item.shutterSpeed,
    item.iso?.replace('ISO ', '')
  ].filter(Boolean);

  return (
    <div 
      className="group cursor-pointer mb-3"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-3">
        {/* Bigger image without numbers */}
        <div className="w-20 h-20 bg-gray-100 relative flex-shrink-0 overflow-hidden rounded">
          <img
            src={thumbnailSrc}
            alt={item.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA3NUgxMjVWMTI1SDc1Vjc1WiIgZmlsbD0iI0Q1RDdEQSIvPgo8L3N2Zz4K';
            }}
          />
          
          {item.type === 'video' && (
            <div className="absolute bottom-1 right-1">
              <Play className="w-2.5 h-2.5 text-white drop-shadow-sm" />
            </div>
          )}
          
          {item.external && (
            <div className="absolute top-1 right-1">
              <ExternalLink className="w-2 h-2 text-white drop-shadow-sm" />
            </div>
          )}
        </div>
        
        {/* Dense information */}
        <div className="flex-1 min-w-0 space-y-0.5">
          <h4 className="text-xs font-medium text-gray-900 leading-tight font-serif line-clamp-1">
            {item.title}
          </h4>
          
          {/* First line: Camera, focal length, aperture */}
          <div className="text-[9px] text-gray-600 font-mono leading-tight">
            {technicalSpecs.join(' • ')}
          </div>
          
          {/* Second line: Shutter speed, ISO */}
          {secondLineSpecs.length > 0 && (
            <div className="text-[9px] text-gray-500 font-mono leading-tight">
              {secondLineSpecs.join(' • ')}
            </div>
          )}
          
          {/* Location/Date in minimal format */}
          {(item.location || item.date) && (
            <div className="text-[8px] text-gray-400 font-serif leading-tight">
              {[item.location?.split(',')[0], item.date?.split(' ')[0]].filter(Boolean).join(' • ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const scrollbarStyles = `
    .gallery-scrollbar::-webkit-scrollbar {
      width: 0.5px;
    }
    .gallery-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .gallery-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.02);
      border-radius: 0px;
    }
    .gallery-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .gallery-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.02) transparent;
    }
  `;

  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'photo',
      src: '/gallery/Tired.png',
      title: 'Muskoka Ironman 70.3',
      description: 'Running to the finish line at my first Ironman 70.3 in Muskoka, pushing a 4:30 min / km pace at the last 3k. I look like I am melting.',
      date: 'July 2025',
      location: 'Huntsville, Ontario',
      camera: 'Sony A7 IV',
      lens: '85mm f/1.4 GM',
      focalLength: '85mm',
      aperture: 'f/2.0',
      shutterSpeed: '1/125s',
      iso: 'ISO 400',
      tags: ['endurance', 'triathlon', 'documentary']
    },
    {
      id: '2',
      type: 'photo',
      src: '/gallery/muskoka-bike.JPG',
      title: 'Huntsville 90km Bike',
      description: 'Grinding through the 90km bike segment in torrential rain. The hills were unforgiving but the views made every climb worth it.',
      date: 'July 2025',
      location: 'Huntsville, Ontario',
      camera: 'Sony A7 IV',
      lens: '24-70mm f/2.8 GM',
      focalLength: '35mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/250s',
      iso: 'ISO 320',
      tags: ['cycling', 'triathlon', 'landscape']
    },
    {
      id: '3',
      type: 'photo',
      src: '/gallery/muskoka-run2.JPG',
      title: 'Muskoka Ironman 70.3',
      description: 'Mile 10 of the half marathon. This is when the mental game really begins and your legs start questioning life choices.',
      date: 'July 2025',
      location: 'Huntsville, Ontario',
      camera: 'Canon EOS R6 Mark II',
      lens: 'RF 70-200mm f/2.8L IS USM',
      focalLength: '135mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/500s',
      iso: 'ISO 200',
      tags: ['running', 'triathlon', 'action']
    },
    {
      id: '4',
      type: 'photo',
      src: '/gallery/milton-run2.JPG',
      title: 'Milton Duathlon Sprint',
      description: 'The final 2k sprint at Milton Duathlon. That moment when you realize you still have gas in the tank after the bike leg.',
      date: 'November 2024',
      location: 'Kelso Conservation Area',
      camera: 'Fujifilm X-T5',
      lens: 'XF 56mm f/1.2 R',
      focalLength: '56mm',
      aperture: 'f/1.4',
      shutterSpeed: '1/320s',
      iso: 'ISO 800',
      tags: ['running', 'duathlon', 'finish']
    },
    {
      id: '5',
      type: 'photo',
      src: '/gallery/fairylake.png',
      title: 'Fairy Lake 1.9km Swim',
      description: 'Open water swimming in January because apparently I enjoy suffering. The water was 4°C and my wetsuit was my lifeline.',
      date: 'January 2025',
      location: 'Newmarket, Ontario',
      camera: 'Canon EOS R6 Mark II',
      lens: 'RF 16-35mm f/2.8L IS USM',
      focalLength: '24mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/30s',
      iso: 'ISO 3200',
      tags: ['swimming', 'winter', 'endurance']
    },
    {
      id: '6',
      type: 'photo',
      src: '/gallery/milton.png',
      title: 'Milton Duathlon T2',
      description: 'Racing my first duathlon in Milton. Swim was cancelled due to temperature, turning it into a run-bike-run format.',
      date: 'November 2024',
      location: 'Kelso Conservation Area',
      camera: 'Fujifilm X-T5',
      lens: 'XF 23mm f/1.4 R LM WR',
      focalLength: '23mm',
      aperture: 'f/1.8',
      shutterSpeed: '1/80s',
      iso: 'ISO 1600',
      tags: ['duathlon', 'cycling', 'documentary']
    },
    {
      id: '7',
      type: 'photo',
      src: '/gallery/tcs-waterfront.HEIC',
      title: 'TCS Waterfront Marathon 2024',
      description: 'Mile 20 along the lakeshore. The wall hits different when you can see the CN Tower but still have 10k to go.',
      date: 'October 2024',
      location: 'Toronto Harbourfront',
      camera: 'Sony A7 IV',
      lens: '85mm f/1.4 GM',
      focalLength: '85mm',
      aperture: 'f/1.8',
      shutterSpeed: '1/160s',
      iso: 'ISO 500',
      tags: ['marathon', 'toronto', 'lakefront']
    },
    {
      id: '9',
      type: 'photo',
      src: '/gallery/pullup-training.jpg',
      title: 'AC Summer 2024',
      description: 'Grinding out reps at AC. Started at zero pull-ups, now working toward 20 consecutive. The journey of building functional strength.',
      date: 'March 2024',
      location: 'Athletic Center',
      camera: 'Iphone 15 Pro Max',
      lens: '35mm f/1.4 GM',
      focalLength: '35mm',
      aperture: 'f/2.0',
      shutterSpeed: '1/125s',
      iso: 'ISO 400',
      tags: ['strength', 'training', 'calisthenics']
    },
    {
      id: '10',
      type: 'photo',
      src: '/gallery/beltline.HEIC',
      title: 'Beltline Trail Run',
      description: 'Good memories, good people',
      date: 'October 2024',
      location: 'Toronto, Ontario',
      camera: 'Iphone 15 pro max',
      lens: '35mm f/2 R WR',
      focalLength: '35mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/60s',
      iso: 'ISO 800',
      tags: ['marathon', 'first', 'debut']
    },
    {
        id: '8',
        type: 'photo',
        src: '/gallery/toronto-may-2025.jpeg',
        title: 'Toronto May Marathon 2025',
        description: 'Personal best attempt. The months of training finally coming together on race day.',
        date: 'May 2025',
        location: 'Toronto, Ontario',
        camera: 'Canon EOS R6 Mark II',
        lens: 'RF 50mm f/1.2L USM',
        focalLength: '50mm',
        aperture: 'f/1.6',
        shutterSpeed: '1/200s',
        iso: 'ISO 250',
        tags: ['marathon', 'pb', 'celebration']
      }
  ];

  return (
    <section className="w-full h-full flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      
      {/* Minimal header */}
      <div className="mb-3 flex-shrink-0">
        <h2 className="text-sm font-medium text-gray-900 mb-1 font-serif">Gallery</h2>
        <div className="text-[10px] text-gray-500 font-mono">
          {mediaItems.length} entries
        </div>
      </div>

      <div className="flex-1 overflow-y-auto gallery-scrollbar">
        <style jsx>{`
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
        
        {selectedItem ? (
          <MediaModal
            item={selectedItem}
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        ) : (
          <div>
            {mediaItems.map((item, index) => (
              <MediaCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;