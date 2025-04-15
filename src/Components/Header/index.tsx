import React, { useState, useContext } from "react";
import admin from "../../assets/images.jpeg";
import Button from "@mui/material/Button";
import { RiMenu2Line } from "react-icons/ri";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { cartifycontext } from "../../Context/Context";
import { signOut } from "firebase/auth";
import { toast ,ToastContainer} from "react-toastify";
import { Popover } from "@mui/material";


import {auth} from "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header: React.FC = () => {
  const cartifyCtx = useContext(cartifycontext);
  const [anchormyacc, setAnchormyacc] = useState<null | HTMLElement>(null);
  const [pop, setPop] = useState<HTMLElement | null>(null);
  const openmyacc = Boolean(anchormyacc);
  const navigate =useNavigate();

  if (!cartifyCtx) {
    throw new Error("cartifycontext must be used within a CartifyProvider");
  }

  const { issidebarOpen, setSidebarOpen } = cartifyCtx;

  const handleClickmyacc = (event: React.MouseEvent<HTMLElement>) => {
    setAnchormyacc(event.currentTarget);
  };
  const handleClosemyacc = () => {
    setAnchormyacc(null);
  };
  const handlelogout=()=>{
    signOut(auth)
    .then(()=>{
      toast.success("You are logged out");
      navigate("/login");
    })
    .catch((error)=>{
      toast.error("Error logging out",error);
    })
  }
  const openpopover=(event: React.MouseEvent<HTMLElement>)=>{
    setPop(event.currentTarget)
  }

  return (
    <header className={`w-full py-2 px-4 sm:px-6 md:px-10 transition-all duration-300 shadow-md bg-white flex items-center justify-between flex-wrap
      ${issidebarOpen ? 'lg:pl-64' : 'lg:pl-10'}`}>
      <ToastContainer/>
      <div className="flex items-center mb-2 sm:mb-0">
        <Button
          className="w-10 h-10 min-w-[40px] rounded-full text-[rgba(0,0,0,0.8)]"
          onClick={() => setSidebarOpen(!issidebarOpen)}
        >
          <RiMenu2Line className="text-[18px]" />
        </Button>
      </div>

      <div className="flex items-center gap-4 sm:gap-5 ml-auto">

      <Popover
            open={Boolean(pop)}
            anchorEl={pop}
            anchorOrigin={{
              vertical:"top",
              horizontal:"right"
            }}
            transformOrigin={{
              vertical:"top",
              horizontal:"right"
            }}
            >
           
        <IconButton aria-label="notifications">
          <StyledBadge badgeContent={1} color="error">
            <FaRegBell />
          </StyledBadge>
        </IconButton>
        </Popover>

        <div className="relative">
          <div
            className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
            onClick={handleClickmyacc}
          >
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
                <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">
                  <img src={admin} alt="admin_img" className="w-full h-full object-cover" />
                </div>
                <div className="info">
                  <h3 className="text-[16px] font-medium leading-5">ADMIN</h3>
                  <p className="text-[12px] text-gray-500">admin123@gmail.com</p>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <Button onClick={()=>navigate("/profile")}>
            <MenuItem onClick={handleClosemyacc} className="flex items-center gap-3">
              <FaUser className="text-[18px]" />
              <span className="text-[14px]">Profile</span>
            </MenuItem>
            </Button>
            <MenuItem onClick={handlelogout} className="flex items-center gap-3">
              <FaSignOutAlt className="text-[18px]" />
              <span className="text-[14px]" >Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
