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
  if(item==='AssasinIcon') return <AssasinIcon />;
  if(item==='CircusIcon') return <CircusIcon />;
  if(item==='DevilIcon') return <DevilIcon />;
  if(item==='GhostIcon') return <GhostIcon />;
  if(item==='KnightIcon') return <KnightIcon />;
  if(item==='ManIcon') return <ManIcon />;
  if(item==='PrincessIcon') return <PrincessIcon />;
  if(item==='QueenIcon') return <QueenIcon />;
  if(item==='SantaIcon') return <SantaIcon />;
  if(item==='AlienIcon') return <AlienIcon />;
  if(item==='FairyIcon') return <FairyIcon />;
  if(item==='DefaultIcon') return <DefaultIcon />;

};

//NOTE: forwardRef 사용
const ProfileIcon = forwardRef(({ className, onClick ,profileImage}, ref) => {
  const me = useMe();

  return (
    <div className={cx(className)} onClick={onClick} ref={ref}>
      {profileImage && icon(profileImage)}
      {!profileImage && ( me?.profileImage ? icon(me?.profileImage) : <DefaultIcon />)}
    </div>
  );
});

export default ProfileIcon;
