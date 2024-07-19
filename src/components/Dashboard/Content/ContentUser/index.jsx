import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, destroyUser } from '../../../../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Error from '../../../Error'; // Import komponen Error
import Loading from '../../../Loading'; // Import komponen Loading
import styles from './ContentUser.module.css'


const ContentUser = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Tambahkan state untuk loading
  const [modalOpen, setModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setData(response.data);
        setLoading(false); // Set loading menjadi false setelah data dimuat
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handlePerPageChange = async (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    try {
      await destroyUser(userIdToDelete);
      const newData = data.filter(user => user.id !== userIdToDelete);
      setData(newData);
      toastr.success('User deleted successfully');
      setModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleModalOpen = (userId) => {
    setUserIdToDelete(userId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setUserIdToDelete(null);
  };

  const filteredData = data.filter(item => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredData.length);

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black mb-4">Dashboard</h1>
        <Link to="/users/create">
          <button className="px-2 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl mb-4">Tambah User</button>
        </Link>
        <div className="flex justify-between mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-1 mr-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="text-gray-500 text-sm">Showing {startIndex + 1} - {endIndex} of {filteredData.length} results</span>
          </div>
          <div>
            <select
              className="border rounded-md px-3 py-1 ml-2"
              value={perPage}
              onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>
        </div>
        {/* Gunakan logika kondisional untuk menampilkan Loading saat loading */}
        {loading ? (
          <Loading />
        ) : filteredData.length === 0 ? (
          <Error />
        ) : (
          <div className="overflow-x-auto">
            <table className={`${styles.tableContainerTable} min-w-full bg-white overflow-x-auto`}>        
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(startIndex, endIndex).map(row => (
                  <tr key={row.id}>
                    <td className="text-left py-3 px-4">{row.id}</td>
                    <td className="text-left py-3 px-4">{row.name}</td>
                    <td className="text-left py-3 px-4">{row.email}</td>
                    <td className="text-left py-3 px-4">{row.role}</td>
                    <td className="text-left py-3 px-4">
                      <Link to={`/users/${row.id}/edit`}>
                        <button className='mr-2 text-blue-500'>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </Link>
                      <button className="text-red-500" onClick={() => handleModalOpen(row.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        )}
        <div className="flex justify-center mt-4">
          <button
            className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex === filteredData.length || filteredData.length === 0}
          >
            Next
          </button>
        </div>
      </main>

      {/* Modal Pop-up */}
      {modalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-gray-300 rounded-md mr-4" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleDelete}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentUser;
