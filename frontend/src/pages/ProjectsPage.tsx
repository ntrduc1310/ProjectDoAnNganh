import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import type { Project } from '../types'; // Thêm 'type' keyword cho clarity
import { Plus } from 'lucide-react';

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/projects')
            .then(response => setProjects(response.data))
            .catch(error => console.error("Lỗi khi lấy dự án:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center">Đang tải...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Dự án của bạn</h1>
                <button className="flex items-center bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} className="mr-2" />
                    Tạo Dự Án Mới
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <Link to={`/project/${project.id}`} key={project.id} className="block p-6 bg-dark-secondary rounded-xl shadow-lg hover:ring-2 hover:ring-brand-blue transition-all">
                        <h3 className="text-xl font-bold text-white">{project.name}</h3>
                        <p className="mt-2 text-gray-400 text-sm">{project.description}</p>
                        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Quản lý: {project.manager.fullName}</span>
                            {/* Avatar group placeholder */}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;