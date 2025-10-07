import React, { useState, useEffect } from 'react';
import './Sidebar.css';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  title?: string;
  width?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  items,
  title = 'Menu',
  width = 320,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
 
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpand(item.id);
    } else if (item.onClick) {
      item.onClick();
      onClose();
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className="menu-item-wrapper">
        <button
          className={`menu-item level-${level} ${hasChildren ? 'has-children' : ''}`}
          onClick={() => handleItemClick(item)}
          style={{ paddingLeft: `${16 + level * 20}px` }}
        >
          {item.icon && <span className="menu-icon">{item.icon}</span>}
          <span className="menu-label">{item.label}</span>
          {hasChildren && (
            <span className={`menu-arrow ${isExpanded ? 'expanded' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          )}
        </button>
        
        {hasChildren && (
          <div className={`submenu ${isExpanded ? 'expanded' : ''}`}>
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>

      <div
        className={`sidebar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />


      <div
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{ width: `${width}px` }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >

        <div className="sidebar-header">
          <h2 className="sidebar-title">{title}</h2>
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>


        <div className="sidebar-content">
          {items.map((item) => renderMenuItem(item))}
        </div>
      </div>
    </>
  );
};


export default function SidebarDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      onClick: () => console.log('Dashboard clicked'),
    },
    {
      id: 'products',
      label: 'Products',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      children: [
        {
          id: 'products-all',
          label: 'All Products',
          onClick: () => console.log('All Products'),
        },
        {
          id: 'products-categories',
          label: 'Categories',
          children: [
            { id: 'cat-electronics', label: 'Electronics', onClick: () => console.log('Electronics') },
            { id: 'cat-clothing', label: 'Clothing', onClick: () => console.log('Clothing') },
            { id: 'cat-food', label: 'Food & Beverages', onClick: () => console.log('Food') },
          ],
        },
        {
          id: 'products-inventory',
          label: 'Inventory',
          onClick: () => console.log('Inventory'),
        },
      ],
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      ),
      children: [
        { id: 'orders-pending', label: 'Pending', onClick: () => console.log('Pending') },
        { id: 'orders-completed', label: 'Completed', onClick: () => console.log('Completed') },
        { id: 'orders-cancelled', label: 'Cancelled', onClick: () => console.log('Cancelled') },
      ],
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      onClick: () => console.log('Customers'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m0-6h6m-6 0H6" />
        </svg>
      ),
      children: [
        { id: 'settings-profile', label: 'Profile', onClick: () => console.log('Profile') },
        { id: 'settings-security', label: 'Security', onClick: () => console.log('Security') },
        { id: 'settings-notifications', label: 'Notifications', onClick: () => console.log('Notifications') },
      ],
    },
  ];

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '24px' }}>Sidebar Menu Demo</h1>
      
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        Open Menu
      </button>

      <div style={{ marginTop: '24px', color: '#6b7280' }}>
        <p>Features:</p>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Slides in from the right</li>
          <li>2-level nested submenus with accordion</li>
          <li>Click backdrop or ESC to close</li>
          <li>Smooth animations</li>
          <li>Icons support</li>
        </ul>
      </div>

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={menuItems}
        title="Navigation"
      />
    </div>
  );
}