import React, { useState, useEffect } from 'react';

function ModalForm({ mode, currentData, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    hometown: '',
    major: '',
    email: '',
  });

  // 모달 상태 초기화
  useEffect(() => {
    if (mode === 'edit' && currentData) {
      console.log('수정 모드 초기화 데이터:', currentData);
      setFormData(currentData); // 수정 모드 데이터 설정
    } else {
      console.log('추가 모드 초기화');
      setFormData({ id: '', name: '', hometown: '', major: '', email: '' }); // 추가 모드 초기화
    }
  }, [mode, currentData]);

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 데이터 저장 처리
  const handleSubmit = () => {
    if (!formData.name || !formData.hometown || !formData.major || !formData.email) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    console.log('전송 데이터:', formData);
    onSave(formData); // 부모(App.js)로 데이터 전달
    document.querySelector('#dataModal .btn-close').click(); // 모달 닫기
  };

  return (
    <div
      className="modal fade"
      id="dataModal"
      tabIndex="-1"
      aria-labelledby="dataModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="dataModalLabel">
              {mode === 'edit' ? '학생 수정' : '학생 추가'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input
              name="name"
              className="form-control mb-2"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="hometown"
              className="form-control mb-2"
              placeholder="Hometown"
              value={formData.hometown}
              onChange={handleChange}
            />
            <input
              name="major"
              className="form-control mb-2"
              placeholder="Major"
              value={formData.major}
              onChange={handleChange}
            />
            <input
              name="email"
              className="form-control mb-2"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              닫기
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              {mode === 'edit' ? '수정' : '추가'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalForm;