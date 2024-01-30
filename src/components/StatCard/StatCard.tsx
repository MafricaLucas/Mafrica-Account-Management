import React from 'react';
 import '../../App';

type StatCardProps = {
  title: string;
  number: number;
  color: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, number, color }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '30px 20px',
      textAlign: 'center',
      width: '180px'
    }}>
      <h2 style={{
        color: '#414D55',
        fontFamily: 'Montserrat',
        fontSize: '16px',
        fontWeight: 700,
        margin: '0 auto 10px'
      }}>
        {title}
      </h2>
      <p style={{
        color: color,
        fontFamily: 'Montserrat',
        fontSize: '40px',
        fontWeight: 700,
        margin: 0
      }}>
        {number}
      </p>
    </div>
  );
};

export default StatCard;
