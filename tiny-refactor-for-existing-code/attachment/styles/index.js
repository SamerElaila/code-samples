import { colors } from '../../../../../constants';

// TODO BANNA naming should be consistent, lets make it camelCase only please
export default () => ({
  countsColor: {
    color: colors.LIGHT_BLUE,
  },
  filledBox: {
    fill: '#4C4C4C',
  },
  spanHeader: {
    fontSize: '1.3rem',
    paddingLeft: 10,
    color: '#767676',
    fontWeight: '100',
    textTransform: 'uppercase !important',
  },
  spanHeaderDate: {
    fontSize: '1.3rem',
    fontWeight: '100',
    color: '#767676',
    textTransform: 'uppercase !important',
  },
  collapseHeader: {
    fontWeight: 'bold',
  },
  span: {
    textTransform: 'capitalize',
  },
  title: {
    marginBottom: '0 !important',
  },
});
