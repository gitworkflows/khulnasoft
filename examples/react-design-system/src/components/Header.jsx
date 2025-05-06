import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import khulnasoft, { KhulnasoftComponent, KhulnasoftContent } from '@khulnasoft.com/react';
import { Cart } from './Cart';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    padding: 20,
  },
  link: {
    color: '#555',
    margin: '0 10px',
  },
  logo: {
    margin: '0 auto',
    letterSpacing: 2,
    fontWeight: 600,
  },
}));

export const Header = () => {
  // Show the cart by default when editing in Khulnasoft
  const [showCart, setShowCart] = useState(khulnasoft.editingModel === 'cart-content');
  const classes = useStyles();
  return (
    <div>
      <KhulnasoftComponent model="announcement-bar" />
      <div className={classes.header}>
        <KhulnasoftContent modelName="header-nav-links">
          {(data, loading) => (
            <div style={{ display: 'flex' }}>
              {data?.links?.map((item, index) => (
                <div key={index} style={{ marginRight: 15 }}>
                  <Link to={item.link}>{item.text}</Link>
                </div>
              ))}
            </div>
          )}
        </KhulnasoftContent>

        <Link to="/" className={classes.logo}>
          SHOPAHOLIC
        </Link>
        <a
          className={classes.link}
          onClick={() => {
            setShowCart(!showCart);
          }}
        >
          Cart
        </a>

        <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}>
          <Cart />
        </Drawer>
      </div>
    </div>
  );
};
