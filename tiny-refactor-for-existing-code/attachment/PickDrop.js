import React, { Component } from 'react';

export default class PicksDropsBadge extends Component {
  render() {
    const { type, index } = this.props;
    return (
      <React.Fragment>
        <span style={{
          background: '#3176B7',
          padding: '5px 10px',
          borderRadius: '5px',
          color: 'white',
          marginRight: 4,
        }}
        >
          {
          type === 'pick' ? `P${index}` : `D${index}`
        }
        </span>
      </React.Fragment>
    );
  }
}
