// @desc    Register new user
// @route   /api/users
// @access  Public
export function registerUser(
  req: any,
  res: {
    status: any;
    send: (arg0: string) => void;
  }
) {
  const { name, email, password } = req.body;

  //validation

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  res.send('Register Route');
}

// @desc    Login
// @route   /api/users/login
// @access  Public
export function loginUser(req: any, res: { send: (arg0: string) => void }) {
  res.send('Login Route');
}
