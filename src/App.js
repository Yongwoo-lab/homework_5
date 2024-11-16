import React, { useState, useEffect } from 'react';
import ShowList from './components/Pages/ShowList';
import ModalForm from './components/Pages/ModalForm';

const API_URL = 'https://672b59cd976a834dd026b7d6.mockapi.io/member';

function App() {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [mode, setMode] = useState('add'); // 'add' 또는 'edit'

  // 학생 데이터 가져오기
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('학생 데이터 가져오기 성공:', data);
      setStudents(data);
    } catch (error) {
      console.error('학생 데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 학생 추가 또는 수정
  const handleSave = async (data) => {
    try {
      if (mode === 'add') {
        console.log('추가 요청 데이터:', data);
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`POST error! status: ${response.status}`);
      } else if (mode === 'edit') {
        console.log('수정 요청 데이터:', data);
        const response = await fetch(`${API_URL}/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`PUT error! status: ${response.status}`);
      }
      fetchStudents(); // 데이터 새로 고침
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  // 학생 삭제
  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        console.log(`삭제 요청 ID: ${id}`);
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`DELETE error! status: ${response.status}`);
        fetchStudents(); // 데이터 새로 고침
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">학생 관리 시스템</h1>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#dataModal"
        onClick={() => {
          setMode('add');
          setCurrentStudent(null);
        }}
      >
        학생 추가
      </button>
      <ShowList
        students={students}
        onEditClick={(student) => {
          setMode('edit');
          setCurrentStudent(student);
        }}
        onDeleteClick={handleDelete}
      />
      <ModalForm mode={mode} currentData={currentStudent} onSave={handleSave} />
    </div>
  );
}

export default App;