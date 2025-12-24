/**
 * Doctor Image Component
 * 
 * Displays the doctor's profile picture with a decorative circular border.
 * It handles image loading errors by falling back to a default placeholder
 * to ensure a consistent UI even if an image is missing.
 */
import React from 'react';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

const DoctorImage = ({ imageUrl, name, colorType }) => {
  // If the imageUrl points to a local file under /public but the file
  // doesn't actually exist, Next will try to optimize and fail (causing
  // the dev-server "not a valid image" errors). Detect that server-side
  // and fall back to a safe placeholder image.
  let validImageUrl = imageUrl;
  try {
    if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
      const rel = imageUrl.replace(/^\//, '');
      const abs = path.join(process.cwd(), 'public', rel);
      if (!fs.existsSync(abs)) {
        // fallback to a neutral placeholder that exists in public/
        validImageUrl = '/logo.png';
      }
    }
  } catch (err) {
    // If file system access fails for any reason, quietly fall back.
    validImageUrl = '/logo.png';
  }

  const outerBorderColor = 'border-gray-200';
  const innerBorderColor = 'border-white';
  
  const topDotColor = 'bg-secondary';
  const bottomDotColor = 'bg-primary';

  return (
    <div className="relative mb-6">
      {/* Top decorative dot */}
      <div 
        className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 ${topDotColor} rounded-full z-30`}
      />
      
      {/* Outer circle border */}
      <div className={`relative w-72 h-72 rounded-full border-[3px] ${outerBorderColor} bg-transparent p-2 flex items-center justify-center`}>
        {/* Inner circle with image */}
        <div className={`relative w-full h-full rounded-full border-[3px] ${innerBorderColor} bg-gray-50 overflow-hidden shadow-md`}>
          {validImageUrl && (
            <Image
              src={validImageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="272px"
            />
          )}
        </div>
      </div>

      {/* Bottom decorative dot */}
      <div 
        className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 ${bottomDotColor} rounded-full z-30`}
      />
    </div>
  );
};

export default DoctorImage;