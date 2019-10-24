import React from 'react';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';

import styles from './styles';
import { CustomIcon } from '../../../../shared/components/CustomIcon';

/**
 * @author Samer
 * @desc Presentational component that contains the attachment header
 */


const Header = ({ documentCount, classes }) => (
    <Typography color="inherit" className={classNames('text-20 sm:text-20 font-bold mb-24', classes.title)}>
        <CustomIcon
            icon="attachment"
            style={{
                marginInlineStart: 5,
                width: '32px',
                heigth: '32px',
            }}
            iconColor={classes.filledBox}
        />
        <span style={{ marginRight: '4px', color: 'rgb(76, 76, 76)' }}>Attachments</span>
        {documentCount > 0
            && (
                <span className={classes.countsColor}>
                    {`(${documentCount})`}
                </span>
            )
        }
    </Typography>
);

export default withStyles(styles)(Header);
