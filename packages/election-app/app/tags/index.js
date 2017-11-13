// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FaceIcon from 'material-ui-icons/Face';
import grey from 'material-ui/colors/grey';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
  svgIcon: {
    color: grey[800],
  },
  row: {
    display: 'flex',
    justifyContent: 'left',
    height: 50,
    overflowX: "scroll",
  },
});

const Chips = props => {
  const { classes, tags } = props;

  const tagComponents = tags.map(t => {
    const { _id: id, name } = t;
    return <Chip key={id} label={name} className={classes.chip} />;
  });

  return (
    <div className={classes.row}>
      {tagComponents}
    </div>
  );
};

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);
