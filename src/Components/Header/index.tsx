import React, { useState } from "react";
// import admin from "../../assets/publicdomainq-girl_laptop.png";
import admin from "../../assets/images.jpeg"
import Button from "@mui/material/Button";
import { RiMenu2Line } from "react-icons/ri";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const [anchormyacc, setAnchormyacc] = useState<null | HTMLElement>(null);
  const openmyacc = Boolean(anchormyacc);
  const handleClickmyacc = (event: React.MouseEvent<HTMLElement>) => {
    setAnchormyacc(event.currentTarget);
  };
  const handleClosemyacc = () => {
    setAnchormyacc(null);
  };
  return (
    <header className="w-full h-[auto] pl-64 pr-7 bg-[#fff] shadow-md  flex items-center justify-between">
      <div className="part1">
        <Button className="w-[40px] h-[40px] rounded-full min-w-[40px] text-[rgba(0,0,0,0.8)]">
          <RiMenu2Line className="text-[18px] text-[rgba(0,0,0,0.8)]" />
        </Button>
      </div>

      <div className="part2 w-[40%] flex items-center justify-end gap-5">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={1} color="secondary">
            <FaRegBell />
          </StyledBadge>
        </IconButton>

        <div className="relative">
          <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer" onClick={handleClickmyacc}>
            <img src={admin} alt="admin_img" className="w-full h-full object-cover" />
          </div>
          <Menu
            anchorEl={anchormyacc}
            id="account-menu"
            open={openmyacc}
            onClose={handleClosemyacc}
            onClick={handleClosemyacc}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClosemyacc} className="!bg-white">
              <div className="flex items-center gap-3">
                <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer" >
                  <img src={admin} alt="admin_img" className="w-full h-full object-cover" />
                </div>
                <div className="info">
                  <h3 className="text-[16px] font-[500] leading-5">ADMIN</h3>
                  <p className="text-[12px] font-[400] opacity-70">admin@gmail.com</p>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClosemyacc} className="flex items-center gap-3">
              <FaUser className="text-[18px]" /><span className="text-[14px]">Profile</span>
            </MenuItem>
            <MenuItem onClick={handleClosemyacc} className="flex items-center gap-3">
              <FaSignOutAlt className="text-[18px]" /><span className="text-[14px]">Sign Out</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
