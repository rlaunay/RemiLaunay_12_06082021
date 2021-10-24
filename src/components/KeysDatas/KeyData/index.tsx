import React from 'react';
import { FormatedData } from '../../../helpers/dataFormat';

import classes from './KeyData.module.scss';

interface KeyDataProps {
  data: FormatedData;
}

/**
 * @param {React.Props<KeyDataProps>}
 * @returns {React.ReactElement}
 */
const KeyData: React.FC<KeyDataProps> = ({ data }) => {
  return (
    <li className={classes.keyData}>
      <data.icon />
      <div className={classes.values}>
        <span>{data.value}</span>
        <span>{data.label}</span>
      </div>
    </li>
  );
};

export default KeyData;
