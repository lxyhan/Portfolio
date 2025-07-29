import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  src?: string; // Optional for videos since they'll use external
  thumbnail?: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  tags?: string[];
  external?: string; // Video URL (YouTube, Vimeo, etc.)
  // Camera metadata
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  // Video metadata (auto-extracted or manual)
  duration?: string;
  resolution?: string;
  fps?: string;
}

// Helper functions for video URL processing
const getVideoId = (url: string): string | null => {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  if (youtubeMatch) return youtubeMatch[1];
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return vimeoMatch[1];
  
  return null;
};

const getVideoThumbnail = (url: string): string => {
  const videoId = getVideoId(url);
  if (!videoId) return '';
  
  // YouTube thumbnail
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  
  // Vimeo thumbnail (would need API call in real implementation)
  if (url.includes('vimeo.com')) {
    return `https://vumbnail.com/${videoId}.jpg`;
  }
  
  return '';
};

const getEmbedUrl = (url: string): string => {
  const videoId = getVideoId(url);
  if (!videoId) return url;
  
  // YouTube embed
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Vimeo embed
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
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button onClick={onClose} className="hover:text-gray-900 transition-colors">
            Gallery
          </button>
          <span>/</span>
          <span className="text-gray-900">{item.title}</span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to grid
        </button>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-center mb-4">
          {item.type === 'photo' ? (
            <img
              src={item.src}
              alt={item.title}
              className="max-w-full h-auto object-contain"
              loading="lazy"
            />
          ) : (
            <div className="w-full aspect-video max-w-2xl">
              <iframe
                src={getEmbedUrl(item.external || '')}
                className="w-full h-full"
                allowFullScreen
                title={item.title}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-3 overflow-y-auto">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
            {item.description && (
              <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
            )}
          </div>
          
          {(item.date || item.location || item.camera || item.lens || item.duration || item.resolution) && (
            <div className="pt-2 border-t border-gray-200">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1">
                {item.date && (
                  <>
                    <dt className="text-xs text-gray-500">Date</dt>
                    <dd className="text-xs text-gray-900">{item.date}</dd>
                  </>
                )}
                {item.location && (
                  <>
                    <dt className="text-xs text-gray-500">Location</dt>
                    <dd className="text-xs text-gray-900">{item.location}</dd>
                  </>
                )}
                {item.camera && (
                  <>
                    <dt className="text-xs text-gray-500">Camera</dt>
                    <dd className="text-xs text-gray-900">{item.camera}</dd>
                  </>
                )}
                {item.lens && (
                  <>
                    <dt className="text-xs text-gray-500">Lens</dt>
                    <dd className="text-xs text-gray-900">{item.lens}</dd>
                  </>
                )}
                {item.duration && (
                  <>
                    <dt className="text-xs text-gray-500">Duration</dt>
                    <dd className="text-xs text-gray-900">{item.duration}</dd>
                  </>
                )}
                {item.resolution && (
                  <>
                    <dt className="text-xs text-gray-500">Resolution</dt>
                    <dd className="text-xs text-gray-900">{item.resolution}</dd>
                  </>
                )}
              </dl>
            </div>
          )}
          
          {(item.focalLength || item.aperture || item.shutterSpeed || item.iso || item.fps) && (
            <div className="pt-2 border-t border-gray-200">
              <dt className="text-xs text-gray-500 mb-1">Technical</dt>
              <dd className="text-xs text-gray-900 space-y-0.5">
                {item.focalLength && <div>{item.focalLength}</div>}
                {item.aperture && <div>{item.aperture}</div>}
                {item.shutterSpeed && <div>{item.shutterSpeed}</div>}
                {item.iso && <div>{item.iso}</div>}
                {item.fps && <div>{item.fps}</div>}
              </dd>
            </div>
          )}
          
          {item.tags && item.tags.length > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <dt className="text-xs text-gray-500 mb-1">Tags</dt>
              <dd className="text-xs text-gray-900">
                {item.tags.join(', ')}
              </dd>
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
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onClick }) => {
  const thumbnailSrc = item.type === 'video' && item.external 
    ? item.thumbnail || getVideoThumbnail(item.external)
    : item.thumbnail || item.src;

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="aspect-square bg-gray-100 relative mb-1">
        <img
          src={thumbnailSrc}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA3NUgxMjVWMTI1SDc1Vjc1WiIgZmlsbD0iI0Q1RDdEQSIvPgo8L3N2Zz4K';
          }}
        />
        
        {item.type === 'video' && (
          <div className="absolute bottom-1 right-1">
            <Play className="w-3 h-3 text-white drop-shadow-lg" />
          </div>
        )}
        
        {item.external && (
          <div className="absolute top-1 right-1">
            <ExternalLink className="w-2.5 h-2.5 text-white drop-shadow-lg" />
          </div>
        )}
      </div>
      
      <div className="space-y-0">
        <h4 className="text-xs font-medium text-gray-900 leading-tight">{item.title}</h4>
        <div className="text-[10px] text-gray-500">
          {item.date && <div>{item.date}</div>}
          {item.location && <div>{item.location}</div>}
        </div>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');

  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'photo',
      src: '/gallery/Crosswalk.png',
      title: 'i look to you and i see nothing',
      description: 'My view from living at CampusOne in Summer 2024.',
      date: 'June 2024',
      location: 'College and Spadina',
      camera: 'Canon EOS Rebel T4',
      lens: 'RF 24-70mm f/2.8L IS USM',
      focalLength: '125mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/60s',
      iso: 'ISO 800',
      tags: ['Street Photography']
    },
    {
      id: '2',
      type: 'video',
      title: 'Polaris',
      description: 'Dual-player computer vision fitness game demonstration showcasing real-time pose detection and collaborative gameplay mechanics.',
      date: 'July 2025',
      location: 'Hack the 6ix, filmed in 57 St. Joseph Street',
      external: 'https://youtu.be/PGPgzu2f-0Y', // Auto-generates thumbnail
      duration: '2:34',
      resolution: '4K',
      fps: '60fps',
      tags: ['game', 'fitness', 'computer vision', 'multiplayer']
    },
    {
      id: '3',
      type: 'photo',
      src: '/gallery/Tired.png',
      title: '"if you can do this, you can do anything!"',
      description: 'Running to the finish line at my first Ironman 70.3 in Muskoka, pushing a 4:30 min / km pace at the last 3k. I look like I am melting.',
      date: 'July 2025',
      location: 'Huntsville, Ontario',
      camera: 'Sony A7 IV',
      lens: '85mm f/1.4 GM',
      focalLength: '85mm',
      aperture: 'f/2.0',
      shutterSpeed: '1/125s',
      iso: 'ISO 400',
      tags: ['team', 'hackathon', 'award', 'celebration']
    },
    {
      id: '4',
      type: 'photo',
      src: '/gallery/Milton.JPG',
      title: 'blue gulfport',
      description: 'racing my first duathlon in Milton. swim was cancelled due to the temp',
      date: 'November 2024',
      location: 'Kelso Conservation Area',
      camera: 'Fujifilm X-T5',
      lens: 'XF 23mm f/1.4 R LM WR',
      focalLength: '23mm',
      aperture: 'f/1.8',
      shutterSpeed: '1/80s',
      iso: 'ISO 1600',
      tags: ['government', 'presentation', 'municipal', 'deployment']
    },
    {
      id: '5',
      type: 'video',
      title: 'Conductor AI Demo',
      description: 'AI workflow orchestrator demonstration featuring 3D avatar guidance and distributed microservices architecture.',
      date: 'December 2024',
      location: 'SpurHacks',
      external: 'https://youtu.be/V2578vWWx10', // Auto-generates thumbnail
      duration: '1:47',
      resolution: '1080p',
      fps: '24fps',
      tags: ['AI', 'automation', 'microservices', 'workflow']
    },
    {
      id: '6',
      type: 'photo',
      src: '/gallery/Viewing.HEIC',
      title: '2 cool 4 skool',
      description: 'No clue what I was thinking. ',
      date: 'January 2025',
      camera: 'Canon EOS R6 Mark II',
      lens: 'RF 16-35mm f/2.8L IS USM',
      focalLength: '24mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/30s',
      iso: 'ISO 3200',
      tags: ['workspace', 'development', 'setup', 'programming']
    }
  ];

  const filteredItems = mediaItems.filter(item => 
    filter === 'all' || item.type === filter
  );

  return (
    <section className="w-full h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-lg font-medium text-gray-900 mb-1">Gallery</h2>
        <p className="text-sm text-gray-600 mb-4">
          A collection of digital and film photography / footage from my life.
        </p>
        
        <div className="flex text-xs text-gray-600 border-b border-gray-200">
          {(['all', 'photo', 'video'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`pb-2 px-0 mr-6 transition-colors ${
                filter === filterType
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'hover:text-gray-900'
              }`}
            >
              {filterType === 'all' ? 'All' : filterType === 'photo' ? 'Photos' : 'Videos'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 1px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 1px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.15);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
          }
        `}</style>
        
        {selectedItem ? (
          <MediaModal
            item={selectedItem}
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredItems.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
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