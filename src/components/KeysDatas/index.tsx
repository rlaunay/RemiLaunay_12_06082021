import React from 'react';
import KeyData from './KeyData';
import { dataFormat } from '../../helpers/dataFormat';

import classes from './KeysDatas.module.scss';

interface KeyDataProps {
  keydata: { [key: string]: number };
}

/**
 * @param {React.Props<KeyDataProps>}
 * @returns {React.ReactElement}
 */
const KeysDatas: React.FC<KeyDataProps> = (props): React.ReactElement => {
  const data = Object.entries(props.keydata).map(([key, value]) => {
    console.log(value, key);
    const formatted = dataFormat(value, key);

    return <KeyData data={formatted} key={key} />;
  });

  return <ul className={classes.ul}>{data}</ul>;
};

export default KeysDatas;
