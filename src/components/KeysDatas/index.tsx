import KeyData from './KeyData';
import { dataFormat } from '../../helpers/dataFormat';

import classes from './KeysDatas.module.scss';

interface KeysDataProps {
  keydata: { [key: string]: number };
}

/**
 * @param {React.Props<KeysDataProps>}
 * @returns {React.ReactElement}
 */
const KeysDatas: React.FC<KeysDataProps> = (props): React.ReactElement => {
  const data = Object.entries(props.keydata).map(([key, value]) => {
    const formatted = dataFormat(value, key);

    return <KeyData data={formatted} key={key} />;
  });

  return <ul className={classes.ul}>{data}</ul>;
};

export default KeysDatas;
