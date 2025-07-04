'use client';

import { useState } from 'react';
import { Fab } from '@mui/material';
import { MessageCircle, MoveUp, Cog } from 'lucide-react';

const FloatingActionMenu = () => {
      const [open, setOpen] = useState(false);
      const [spinDirection, setSpinDirection] = useState<'cw' | 'ccw'>('cw');
      const radius = 40;

      const actions = [
            {
                  icon: <MoveUp size={17} />,
                  onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                  label: 'Lên đầu trang',
            },
            {
                  icon: <MessageCircle size={17} />,
                  onClick: () => alert('Mở chat hỗ trợ...'),
                  label: 'Tin nhắn hỗ trợ',
            },
      ];

      const handleClick = () => {
            setSpinDirection(open ? 'ccw' : 'cw');
            setOpen(!open);
      };

      return (
            <div className="fixed bottom-6 right-6 z-50">

                  <Fab
                        color="secondary"
                        onClick={handleClick}
                        aria-label="menu"
                        size="small"
                        className="relative z-10 bg-white hover:bg-gray-100 transition-colors duration-200"
                  >
                        <Cog
                              key={open ? 'spin-on' : 'spin-off'}
                              size={18}
                              className={`text-gray-100 ${spinDirection === 'cw' ? 'animate-spin-once-cw' : 'animate-spin-once-ccw'}`}
                        />
                  </Fab>


                  {actions.map((action, i) => {
                        const angle = (Math.PI / 2) * (i / (actions.length - 1));
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                              <Fab
                                    key={i}
                                    size="small"
                                    color="info"
                                    onClick={action.onClick}
                                    title={action.label}
                                    sx={{ boxShadow: 'none' }}
                                    style={{
                                          position: 'absolute',
                                          bottom: 25 + (open ? y : 0),
                                          right: 25 + (open ? x : 0),
                                          transform: open ? 'scale(1)' : 'scale(0)',
                                          opacity: open ? 1 : 0,
                                          pointerEvents: open ? 'auto' : 'none',
                                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                              >
                                    {action.icon}
                              </Fab>
                        );
                  })}
            </div>
      );
};

export default FloatingActionMenu;
