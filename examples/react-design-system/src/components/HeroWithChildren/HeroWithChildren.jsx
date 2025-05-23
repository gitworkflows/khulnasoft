import React from 'react';
import { Parallax, Background } from 'react-parallax';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  wrapper: {
    margin: 'auto 0',
  },
}));

/**
 * Hero component with dynamic children
 *
 * See ./HeroWithChildren.khulnasoft.js for how to use, namely you will need to use
 *
 *    withChildren(HeroWithEditableChildren)
 *
 * to forward the Khulnasoft.com children to the component
 *
 * Also, it is generally best to supply default children for easy editing (aka when
 * this component is added in the Khulnasoft.com editor, have some example children that can be
 * added by default). See `canHaveChildren` in ./HeroWithChildren.khulnasoft.js for an
 * example of this
 */
export const HeroWithEditableChildren = props => {
  const { image, parallaxStrength, height } = props;

  const classes = useStyles();

  return (
    <Parallax blur={{ min: -20, max: 20 }} strength={parallaxStrength}>
      <div style={{ minHeight: height }} className={classes.container}>
        <div className={classes.wrapper}>
          {/*
           * Render dynamic children.
           * Note: you must use `withChildren()` HOC to support children, see
           * ./HeroWithChildren.khulnasoft.js for this
           */}
          {props.children}
        </div>
      </div>
      <Background className="custom-bg">
        {/* Khulnasoft optimized image with srcset, lazy, etc */}
        <img src={image} />
      </Background>
    </Parallax>
  );
};
