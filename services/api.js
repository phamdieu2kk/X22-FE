const findUserByEmail = (email) => {
    return usersData.find((user) => user.email === email);
  };
  
  const updateProfile = (data) => {
    const { email, address, sex, birthday } = data;
  
    // Kiểm tra xem người dùng có tồn tại không
    const user = findUserByEmail(email);
    if (!user) {
      // Nếu người dùng không tồn tại, trả về lỗi
      return { success: false, message: 'Không tìm thấy người dùng.' };
    }
  
    // Cập nhật thông tin cá nhân
    user.address = address || user.address;
    user.sex = sex || user.sex;
    user.birthday = birthday || user.birthday;
  
    // Trả về kết quả thành công
    return { success: true, message: 'Cập nhật thành công', user };
  };
  
  export { updateProfile };