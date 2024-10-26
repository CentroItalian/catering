import Link from 'next/link'
import React from 'react'
import type { IconType } from 'react-icons';

interface FooterSocialIconProps {
  icon: IconType;
  url: string;
  bgColor: string;
}

const FooterSocialIcon: React.FC<FooterSocialIconProps> = ({ icon: SocialIcon, url, bgColor }) => {
  return (
    <Link href={url}>
      <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[${bgColor}]`}>
        <SocialIcon className="text-3xl cursor-pointer" />
      </div>
    </Link>
  );
};

export default FooterSocialIcon;