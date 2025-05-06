import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KhulnasoftComponent } from '@khulnasoft.com/react';

const useStyles = makeStyles(theme => ({
  cart: {
    padding: 20,
    width: 300,
  },
  noItemsMessage: {
    padding: 20,
    color: '#888',
    textAlign: 'center',
  },
}));

export function Cart() {
  const classes = useStyles();
  return (
    <div className={classes.cart}>
      <div className={classes.noItemsMessage}>You have no items in your cart</div>
      <KhulnasoftComponent model="cart-content" />
    </div>
  );
}
