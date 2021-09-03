import { FC } from 'react';
import CaloriesIco from '../components/Icon/CaloriesIco';
import GlucideIco from '../components/Icon/GlucideIco';
import LipideIco from '../components/Icon/LipideIco';
import ProteinIco from '../components/Icon/ProteinIco';

const data: {
  [key: string]: {
    name: string;
    unite: string;
    icon: FC;
  };
} = {
  calorieCount: {
    name: 'Calories',
    unite: 'kCal',
    icon: CaloriesIco,
  },
  proteinCount: {
    name: 'Proteines',
    unite: 'g',
    icon: ProteinIco,
  },
  carbohydrateCount: {
    name: 'Glucides',
    unite: 'g',
    icon: GlucideIco,
  },
  lipidCount: {
    name: 'Lipides',
    unite: 'g',
    icon: LipideIco,
  },
};

export type Data = {
  value: string;
  icon: FC;
  label: string;
};

export const dataFormat = (value: number, unite: string): Data => {
  const valueFormtted = numberWithCommas(value);
  return {
    value: `${valueFormtted}${data[unite].unite}`,
    icon: data[unite].icon,
    label: data[unite].name,
  };
};

function numberWithCommas(nb: number) {
  return nb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
