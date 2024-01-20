import React from 'react';
import { Spin } from 'antd';

const Loader = ({ loading }) => (
  <>
    {loading && (
      <div className="loader">
        <Spin size="large" />
        <span style={{marginLeft:'1rem'}}>Fetching data ...</span>
      </div>
    )}
  </>
);

export default Loader;