import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Clock, CheckCircle, Target, BarChart3, PieChart } from 'lucide-react';
import './AnalyticsPage.css';

// Mock data for analytics
const mockTaskData = [
  { name: 'TODO', value: 12, color: '#ef4444' },
  { name: 'IN_PROGRESS', value: 8, color: '#3b82f6' },
  { name: 'REVIEW', value: 5, color: '#f59e0b' },
  { name: 'DONE', value: 25, color: '#10b981' },
];

const mockTeamPerformance = [
  { name: 'John Doe', completed: 12, inProgress: 3, efficiency: 85 },
  { name: 'Jane Smith', completed: 15, inProgress: 2, efficiency: 92 },
  { name: 'Mike Johnson', completed: 8, inProgress: 4, efficiency: 78 },
  { name: 'Sarah Wilson', completed: 10, inProgress: 1, efficiency: 88 },
];

const mockProjectProgress = [
  { month: 'Jan', completed: 20, planned: 25 },
  { month: 'Feb', completed: 30, planned: 28 },
  { month: 'Mar', completed: 25, planned: 30 },
  { month: 'Apr', completed: 35, planned: 32 },
  { month: 'May', completed: 40, planned: 38 },
  { month: 'Jun', completed: 45, planned: 42 },
];

const mockSkillGaps = [
  { skill: 'React', required: 90, current: 75, gap: 15 },
  { skill: 'Node.js', required: 80, current: 85, gap: -5 },
  { skill: 'Python', required: 70, current: 60, gap: 10 },
  { skill: 'DevOps', required: 85, current: 65, gap: 20 },
  { skill: 'Design', required: 75, current: 80, gap: -5 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendValue?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendValue, color }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className={`text-sm flex items-center mt-1 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {trendValue}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

export const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-gray-200 rounded"></div>
              <div className="h-80 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into team performance and project progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            value={50}
            icon={<Target className="h-6 w-6 text-white" />}
            trend="up"
            trendValue="+12%"
            color="bg-blue-500"
          />
          <StatCard
            title="Completed Tasks"
            value={25}
            icon={<CheckCircle className="h-6 w-6 text-white" />}
            trend="up"
            trendValue="+8%"
            color="bg-green-500"
          />
          <StatCard
            title="Team Members"
            value={4}
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-purple-500"
          />
          <StatCard
            title="Avg. Completion Time"
            value="3.2 days"
            icon={<Clock className="h-6 w-6 text-white" />}
            trend="down"
            trendValue="-15%"
            color="bg-orange-500"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'performance', label: 'Team Performance' },
                { id: 'skills', label: 'Skill Analysis' },
                { id: 'trends', label: 'Trends' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Task Status Distribution */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Status Distribution</h3>
                  <div className="space-y-4">
                    {mockTaskData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                          <span className="font-medium text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Progress */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
                  <div className="space-y-4">
                    {mockProjectProgress.map((item) => (
                      <div key={item.month} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">{item.month}</span>
                          <span className="text-gray-600">{item.completed}/{item.planned}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(item.completed / item.planned) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                {/* Team Performance Chart */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance Metrics</h3>
                  <div className="space-y-4">
                    {mockTeamPerformance.map((member) => (
                      <div key={member.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">{member.name}</span>
                          <span className="text-sm text-gray-600">
                            {member.completed} completed, {member.inProgress} in progress
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">Completed</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${(member.completed / 20) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">In Progress</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(member.inProgress / 10) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Performance Table */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Efficiency</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Team Member
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Completed
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            In Progress
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Efficiency
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockTeamPerformance.map((member) => (
                          <tr key={member.name}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {member.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {member.completed}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {member.inProgress}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <span className={`text-sm font-medium mr-2 ${
                                  member.efficiency >= 90 ? 'text-green-600' :
                                  member.efficiency >= 80 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {member.efficiency}%
                                </span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full efficiency-bar-${member.efficiency >= 90 ? 'high' : member.efficiency >= 80 ? 'medium' : 'low'}`}
                                    style={{ width: `${member.efficiency}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Gap Analysis</h3>
                <div className="space-y-4">
                  {mockSkillGaps.map((skill) => (
                    <div key={skill.skill} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{skill.skill}</span>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-gray-600">Current: {skill.current}%</span>
                            <span className="text-gray-600">Required: {skill.required}%</span>
                            <span className={`font-medium ${
                              skill.gap > 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              Gap: {skill.gap > 0 ? '+' : ''}{skill.gap}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="relative h-2">
                            <div
                              className="absolute h-2 bg-blue-500 rounded-full progress-current"
                              style={{ width: `${skill.current}%` }}
                            />
                            <div
                              className="absolute h-2 border-2 border-red-500 bg-transparent rounded-full progress-required"
                              style={{ 
                                left: `${Math.min(skill.required, 100)}%`,
                                width: '2px',
                                transform: 'translateX(-1px)'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'trends' && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Overall Productivity</p>
                        <p className="text-sm text-gray-600">+15% increase this month</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">92%</p>
                      <p className="text-sm text-gray-500">efficiency rate</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">Task Completion</p>
                      <p className="text-lg font-bold text-blue-600">85%</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">Team Engagement</p>
                      <p className="text-lg font-bold text-purple-600">94%</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg text-center">
                      <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">Goal Achievement</p>
                      <p className="text-lg font-bold text-orange-600">78%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
