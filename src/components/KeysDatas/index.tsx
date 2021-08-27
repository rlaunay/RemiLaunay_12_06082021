import React from 'react';
import { dataFormat } from '../../helpers/dataFormat';

interface KeyDataProps {
  keydata: { [key: string]: number };
}

/**
 * @param {React.Props<KeyDataProps>}
 * @returns {React.ReactElement}
 */
const KeysDatas: React.FC<KeyDataProps> = (props): React.ReactElement => {
  const data = Object.entries(props.keydata).map(([key, value], index) => {
    console.log(value, key);
  });

  return <div></div>;
};

export default KeysDatas;
