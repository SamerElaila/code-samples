export default () => ({
  attachmentWrapper: {
    '& .relative': {
      marginBottom: '0 !important',
    },
  },
  icon: {
    margin: '3px',
    padding: '0px',
  },
  link: {
    color: '#4c4c4c !important',
    textDecoration: 'underline !important',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    textTransform: 'none !important',
    fontFamily: 'Roboto',
    fontSize: '15px',
    fontWeight: '400',
    padding: '0',
  },
  linkSpan: {
    display: 'inline-block',
    width: '80px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  table: {
    maxWidth: 400,
  },
  tableCell: {
    padding: '0px !important',
  },
  replaceBtn: {
    color: '#FA6400',
    height: '25px',
    width: '63px',
    border: '1px solid #FA6400',
    borderRadius: '17.5px',
    padding: '2px',
    fontSize: '11px',
    textTransform: 'capitalize',
  },
  emptyState: {
    color: '#BDBDBD',
    fontSize: 12,
  },
  hoverModal: {
    position: 'absolute',
    height: 100,
    width: 300,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
    width: '100%',
  },
  row: {
    marginBottom: 14,
  },
  dropWrapper: {
    padding: '11.5px 0',
    borderTop: '1px dashed #BDBDBD',
  },
  dropHeader: {
    fontSize: 10,
    color: '#767676',
    display: 'flex',
    flex: 1,
  },
});
