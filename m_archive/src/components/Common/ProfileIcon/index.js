import React, { forwardRef } from 'react';
import { useMe } from '../../../hooks';
import {
  AngelIcon,
  AssasinIcon,
  CircusIcon,
  DevilIcon,
  GhostIcon,
  KnightIcon,
  ManIcon,
  PrincessIcon,
  QueenIcon,
  SantaIcon,
  AlienIcon,
  FairyIcon,
  DefaultIcon,
} from '../../../assets/profileIcon';
import cx from 'classnames';

const icon = (item) => {
  if(item==='AngelIcon') return <AngelIcon />;
  else if(item==='AssasinIcon') return <AssasinIcon />;
  else if(item==='CircusIcon') return <CircusIcon />;
  else if(item==='DevilIcon') return <DevilIcon />;
  else if(item==='GhostIcon') return <GhostIcon />;
  else if(item==='KnightIcon') return <KnightIcon />;
  else if(item==='ManIcon') return <ManIcon />;
  else if(item==='PrincessIcon') return <PrincessIcon />;
  else if(item==='QueenIcon') return <QueenIcon />;
  else if(item==='SantaIcon') return <SantaIcon />;
  else if(item==='AlienIcon') return <AlienIcon />;
  else if(item==='FairyIcon') return <FairyIcon />;
  else if(item==='DefaultIcon') return <DefaultIcon />;
  else return <DefaultIcon />;
};

//NOTE: forwardRef 사용
const ProfileIcon = forwardRef(({ className, onClick ,profileImage,user}, ref) => {
  const me = useMe();

  return (
    <span className={cx(className)} onClick={onClick} ref={ref}>
      {profileImage && icon(profileImage)}
      {!profileImage && ( user?.profileImage ? icon(user?.profileImage) : <DefaultIcon />)}
    </span>
  );
});

export default ProfileIcon;
