const getHeader = () => {
    // const token = localStorage.getItem('userToken');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE5ODE2MTQ4ZmEwZjMwZDBiYjEwZDkiLCJlbWFpbCI6ImhvYW5nYmluaG10YTk5QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1NTY5NDUxOSwiZXhwIjoxNjU1NzgwOTE5fQ.S5PFFoa6HE0ifcgQz3Tpgx2VqAxBWHde-U1kKrIBZYU";
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

module.exports = { getHeader };