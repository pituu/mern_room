import React from "react";
const API_URL="https://golden-rooms.onrender.com";

function Navbar() {
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = '/login';
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/">
          Golden Rooms
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <i className="fa fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav ml-auto">
            {localStorage.getItem("currentUser") ? (
              <div class="dropdown mr-5">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
</svg>{" "}
                  {JSON.parse(localStorage.getItem("currentUser")).data.name}
                </button>
                <div
                  class="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <a class="dropdown-item" href="/profile">
                    Profile
                  </a>
                  <a class="dropdown-item" href="#" onClick={logout}>
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <>
                <li class="nav-item active">
                  <a class="nav-link" href="register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
