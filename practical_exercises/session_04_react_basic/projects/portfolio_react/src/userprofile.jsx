import './App.css'


function User() {

    return (
        <>
            <div className="profile">
                <h1>Hồ sơ cá nhân</h1>
                <img src="photo.jpg" alt="Ảnh đại diện" />
                    <table>
                        <tr>
                            <td>Họ tên:</td>
                            <td>Minh</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>minh@example.com</td>
                        </tr>
                    </table>
            </div>
        </>
    )

}

export default User


