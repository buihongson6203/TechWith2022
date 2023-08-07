import './Login.css'
function Login() {
  return (
    <div>
      <div class="container-register">
        <div class="arrow">
        </div>
        <div class="login">Login</div>
        <div>
          <div class="input-login">
            <label class="title" for="email">
              Email
            </label>
            <input
              id="email"
              class="input"
              type="text"
              placeholder="Your email or phone"
            />
          </div>
          <div class="input-login">
            <label class="title" for="password">
              Password
            </label>
            <input
              id="password"
              class="input"
              type="password"
              placeholder="Password"
            />
            <i class="fa-regular fa-eye"></i>
          </div>
        </div>
        <div class="forgot-password">Forgot password?</div>
        <a>
          <div class="btn-login-wrapper">
            <button class="btn-login">Login</button>
          </div>
        </a>
        <div class="reminder">
          Don’t have an account?
          <a>
            <span class="return">Sign Up</span>
          </a>
        </div>
        <div class="sign-in">
          <div class="thanh-ngang"></div>
          <div class="instruct"> sign in with</div>
          <div class="thanh-ngang"></div>
        </div>
      </div>
    </div>
  );
}
export default Login;
