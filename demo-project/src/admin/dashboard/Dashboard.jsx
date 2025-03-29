import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from '../components/Sidebar';
import { Table, StatusCell } from '../components/Table';
import { Modal } from '../components/Modal';
import { DynamicForm } from '../forms/Form';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Sample data
  const [services, setServices] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const handleEdit = (id) => {
    let itemToEdit;
    switch (activeSection) {
      case 'services':
        itemToEdit = services.find(item => item.id === id);
        break;
      case 'hospitals':
        itemToEdit = hospitals.find(item => item.id === id);
        break;
      case 'doctors':
        itemToEdit = doctors.find(item => item.id === id);
        break;
      case 'departments':
        itemToEdit = departments.find(item => item.id === id);
        break;
      default:
        return;
    }
    
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (activeSection) {
        case 'services':
          setServices(prev => prev.filter(item => item.id !== id));
          break;
        case 'hospitals':
          setHospitals(prev => prev.filter(item => item.id !== id));
          break;
        case 'doctors':
          setDoctors(prev => prev.filter(item => item.id !== id));
          break;
        case 'departments':
          setDepartments(prev => prev.filter(item => item.id !== id));
          break;
        default:
          return;
      }
    }
  };

  const columns = useMemo(() => ({
    services: [
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
      {
        key: 'primeOptions',
        label: 'Prime Options',
        render: (value) => (
          <div className="flex flex-wrap gap-1">
            {value?.map((option, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium"
              >
                {option}
              </span>
            ))}
          </div>
        ),
      },
      {
        key: 'isActive',
        label: 'Status',
        render: (value) => <StatusCell value={value} />,
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, row) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.id)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              aria-label={`Edit ${row.name}`}
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              aria-label={`Delete ${row.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    hospitals: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'contact', label: 'Contact' },
      { key: 'address', label: 'Address' },
      { key: 'url', label: 'URL' },
      { key: 'description', label: 'Description' },
      {
        key: 'isActive',
        label: 'Status',
        render: (value) => <StatusCell value={value} />,
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, row) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.id)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              aria-label={`Edit ${row.name}`}
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              aria-label={`Delete ${row.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    doctors: [
      { key: 'doctorName', label: 'Doctor Name' },
      { key: 'specialization', label: 'Specialization' },
      { key: 'experience', label: 'Experience (Years)' },
      { key: 'about', label: 'About' },
      {
        key: 'isConsultant',
        label: 'Consultant',
        render: (value) => <StatusCell value={value} />,
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, row) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.id)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              aria-label={`Edit ${row.doctorName}`}
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              aria-label={`Delete ${row.doctorName}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    departments: [
      {
        key: 'departmentName',
        label: 'Department Name',
      },
      { key: 'description', label: 'Description' },
      {
        key: 'isActive',
        label: 'Status',
        render: (value) => <StatusCell value={value} />,
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, row) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.id)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              aria-label={`Edit ${row.departmentName}`}
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              aria-label={`Delete ${row.departmentName}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
  }), [activeSection]);

  const handleSubmit = (data) => {
    if (editingItem) {
      // Update existing item
      switch (activeSection) {
        case 'services':
          setServices(prev => prev.map(item =>
            item.id === editingItem.id ? { ...data, id: editingItem.id } : item
          ));
          break;
        case 'hospitals':
          setHospitals(prev => prev.map(item =>
            item.id === editingItem.id ? { ...data, id: editingItem.id } : item
          ));
          break;
        case 'doctors':
          setDoctors(prev => prev.map(item =>
            item.id === editingItem.id ? { ...data, id: editingItem.id } : item
          ));
          break;
        case 'departments':
          setDepartments(prev => prev.map(item =>
            item.id === editingItem.id ? { ...data, id: editingItem.id } : item
          ));
          break;
        default:
          return;
      }
    } else {
      // Add new item
      const newId = Math.random().toString(36).substr(2, 9);
      const newItem = { ...data, id: newId };

      switch (activeSection) {
        case 'services':
          setServices(prev => [...prev, newItem]);
          break;
        case 'hospitals':
          setHospitals(prev => [...prev, newItem]);
          break;
        case 'doctors':
          setDoctors(prev => [...prev, newItem]);
          break;
        case 'departments':
          setDepartments(prev => [...prev, newItem]);
          break;
        default:
          return;
      }
    }

    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const getData = () => {
    let data = [];
    switch (activeSection) {
      case 'services':
        data = services;
        break;
      case 'hospitals':
        data = hospitals;
        break;
      case 'doctors':
        data = doctors;
        break;
      case 'departments':
        data = departments;
        break;
    }

    if (!searchTerm) return data;

    return data.filter(item => {
      return Object.values(item).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (Array.isArray(value)) {
          return value.some(v => 
            String(v).toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return false;
      });
    });
  };

  if (!activeSection) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar
          activeSection={activeSection || ''}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 ml-72 p-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Otify Admin Panel
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Please select a section from the sidebar to get started
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="flex-1 ml-72 mt-10">
        <div className="fixed top-0 left-72 right-0 bg-white shadow-md z-10">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {activeSection}
            </h1>
            <button
              onClick={handleAddNew}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
              aria-label={`Add new ${activeSection.slice(0, -1)}`}
            >
              <Plus size={20} />
              <span>Add New</span>
            </button>
          </div>
          <div className="px-8 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                aria-label="Search"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="bg-white rounded-xl shadow-lg max-h-[calc(100vh-180px)] overflow-y-auto flex flex-col">
            <Table
              columns={columns[activeSection]}
              data={getData()}
              emptyMessage={`No ${activeSection} found`}
            />
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setEditingItem(null);
            setIsModalOpen(false);
          }}
          title={`${editingItem ? 'Edit' : 'Add New'} ${activeSection.slice(0, -1)}`}
        >
          <DynamicForm
            type={activeSection.slice(0, -1)}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingItem(null);
              setIsModalOpen(false);
            }}
            initialData={editingItem}
          />
        </Modal>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  // Add any props validation if needed
};

export default Dashboard;