import { Edit3 } from 'lucide-react';
import { STUDIO_BASE_URL } from './sanityClient';

export const EditButton = ({ type, id, className = '' }: { type: string; id?: string; className?: string }) => {
  const showEdit = typeof window !== 'undefined' && 
    (window.location.search.includes('edit=true') || window.location.hostname === 'localhost');
  
  if (!showEdit) return null;
  
  const url = id 
    ? `${STUDIO_BASE_URL}/structure/${type};${id}`
    : `${STUDIO_BASE_URL}/structure/${type}`;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-700 transition-colors ${className}`}
      title="Edit in Sanity"
    >
      <Edit3 className="w-3 h-3" />
      Edit
    </a>
  );
};

export const FloatingEditButton = ({ type, id, label }: { type: string; id?: string; label: string }) => {
  const showEdit = typeof window !== 'undefined' && 
    (window.location.search.includes('edit=true') || window.location.hostname === 'localhost');
  
  if (!showEdit) return null;
  
  const url = id 
    ? `${STUDIO_BASE_URL}/structure/${type};${id}`
    : `${STUDIO_BASE_URL}/structure/${type}`;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-24 right-4 z-50 flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
    >
      <Edit3 className="w-4 h-4" />
      {label}
    </a>
  );
};
