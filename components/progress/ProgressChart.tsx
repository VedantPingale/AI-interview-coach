
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { InterviewSession } from '../../types';

interface ProgressChartProps {
  data: InterviewSession[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const getOverallScore = (report: InterviewSession['report']) => {
    if (!report.scores || report.scores.length === 0) return 0;
    const total = report.scores.reduce((acc, s) => acc + s.score, 0);
    return parseFloat((total / report.scores.length).toFixed(1));
  };
  
  const chartData = data.map((session, index) => ({
    name: `Session ${index + 1}`,
    date: session.date,
    specialization: session.specialization,
    'Overall Score': getOverallScore(session.report),
    ...session.report.scores.reduce((acc, score) => ({ ...acc, [score.metric]: score.score }), {})
  }));

  const metrics = data.length > 0 ? data[0].report.scores.map(s => s.metric) : [];
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="name" stroke="#A0AEC0" />
          <YAxis domain={[0, 10]} stroke="#A0AEC0" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }}
            labelStyle={{ color: '#F7B500' }}
          />
          <Legend wrapperStyle={{ color: '#E2E8F0' }} />
          <Line type="monotone" dataKey="Overall Score" stroke="#F7B500" strokeWidth={3} activeDot={{ r: 8 }} />
          {metrics.map((metric, index) => (
             <Line key={metric} type="monotone" dataKey={metric} stroke={colors[index % colors.length]} strokeDasharray="5 5" />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
