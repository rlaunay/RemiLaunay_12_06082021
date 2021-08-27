import React from 'react';
import { Data } from '../../../helpers/dataFormat';

import classes from './KeyData.module.scss';

interface KeyDataProps {
  data: Data;
}

const KeyData: React.FC<KeyDataProps> = ({ data }) => {
  return (
    <li className={classes.keyData}>
      {<data.icon />}
      <div>
        <span>{data.value}</span>
        <span>{data.label}</span>
      </div>
    </li>
  );
};

export default KeyData;
